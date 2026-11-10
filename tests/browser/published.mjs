import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base=process.env.RELEASE_BASE_URL || 'http://localhost:3004';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await mkdir('test-results',{recursive:true});
try {
 for(const width of [320,360,390,768,1024,1440]) {
  await page.setViewportSize({width,height:900});
  await page.goto(`${base}/discover`);
  await page.locator('.discovery-tile').first().waitFor();
  assert.equal(await page.locator('.discovery-tile').count(),15);
  await page.getByRole('button').filter({hasText:'What Do People Think of Me?'}).click();
  assert.equal(await page.locator('.answer-summary').count(),0);
  await page.getByRole('button',{name:/A About 1 in 4/}).click();
  await page.getByText('Now you know a little more.',{exact:true}).waitFor();
  assert.match(await page.locator('.answer-summary').innerText(),/C · About 3 in 4/);
  await page.getByText(/73.5% of teenage respondents agreed/).waitFor();
  await page.getByText('About the data',{exact:false}).click();
  await page.getByText(/original report has not been independently checked/).waitFor();
  assert.ok((await page.locator('body').innerText()).includes('subgroup size'));
  assert.ok(!(await page.locator('body').innerText()).includes('Source pending'));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal(await page.locator('.answer-summary p').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)),15);
  if([390,1440].includes(width)) await page.screenshot({path:`test-results/published-quiz-${width}.png`,fullPage:true});
  await page.goto(`${base}/discover`);
  await page.getByRole('button').filter({hasText:'A Crying Toddler. An Unexpected Response.'}).click();
  await page.getByRole('button',{name:/A Took out toys/}).click();
  assert.equal(await page.locator('.result').count(),0);
  await page.getByRole('button',{name:/Reveal what happened/}).click();
  await page.getByText('THE STORY AS SHARED',{exact:true}).waitFor();
  await page.getByText(/Adapted from a personal account shared on Reddit/).waitFor();
  assert.equal(await page.locator('.answer-summary').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 }
 for(const route of ['/preview','/preview?batch=reddit-01','/preview?batch=statistics-01']) assert.equal((await page.request.get(base+route)).status(),404);
 const html=await(await page.request.get(`${base}/discover`)).text();
 for(const internal of ['editorNotes','evidenceText','background_reference_forQuiz.xlsx','Sheet1!A15'])assert.ok(!html.includes(internal),`Leaked ${internal}`);
 assert.deepEqual(errors,[]);
 console.log('Published QA passed: 15 items, 6 widths, Quiz explanation/data scope, unscored Reveal, internal evidence stripped, production previews blocked.');
} finally {await browser.close();}
