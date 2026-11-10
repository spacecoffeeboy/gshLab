import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
try {
 const page=await browser.newPage();
 await page.addInitScript(()=>{
  for(const key of ['localStorage','sessionStorage'])Object.defineProperty(window,key,{get(){throw Error('Progress must be memory-only');}});
 });
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(`${process.env.VISIT_BASE_URL || 'http://localhost:3005'}/discover`);
  await page.getByText(/0 of 15 explored this visit/).waitFor();
  await page.getByRole('button').filter({hasText:'What Do People Think of Me?'}).click();
  await page.getByRole('button',{name:/A About 1 in 4/}).click();
  await page.getByRole('button',{name:'Back to feed'}).click();
  await page.getByText(/1 of 15 explored this visit/).waitFor();
  assert.equal(await page.locator('.explored-badge').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.getByRole('button',{name:'Random',exact:true}).click();
  await page.getByRole('button',{name:'Start random feed'}).click();
  assert.notEqual(await page.locator('.player-title').innerText(),'What Do People Think of Me?');
  assert.match(await page.locator('.feed-label').innerText(),/14/);
  await page.getByRole('button',{name:'Back to feed'}).click();
  await page.getByRole('button',{name:'By topic',exact:true}).click();
  await page.getByRole('button').filter({hasText:'What Do People Think of Me?'}).click();
  await page.getByText('Now you know a little more.',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Back to feed'}).click();
  await page.getByRole('button').filter({hasText:'A Crying Toddler. An Unexpected Response.'}).click();
  await page.getByRole('button',{name:/A Took out toys/}).click();
  await page.getByRole('button',{name:'Back to feed'}).click();
  await page.getByText(/1 of 15 explored this visit/).waitFor();
  await page.getByRole('button').filter({hasText:'A Crying Toddler. An Unexpected Response.'}).click();
  await page.getByRole('button',{name:/A Took out toys/}).click();
  await page.getByRole('button',{name:/Reveal what happened/}).click();
  await page.getByRole('button',{name:'Back to feed'}).click();
  await page.getByText(/2 of 15 explored this visit/).waitFor();
  await page.reload();
  await page.getByText(/0 of 15 explored this visit/).waitFor();
  assert.equal(await page.locator('.explored-badge').count(),0);
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: current-visit progress, restored choices, unread random queue, explicit Reveal completion and refresh reset at 320/390/1440px; browser storage blocked.');
}finally{await browser.close();}
