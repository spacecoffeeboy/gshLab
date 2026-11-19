import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser = await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const base = process.env.BROWSER_BASE_URL || 'http://localhost:3015';
await mkdir('test-results',{recursive:true});
try {
 for(const width of [320,390,768,1440]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  await page.goto(base);
  const scene = page.locator('section[data-stage]');
  await page.waitForFunction(()=>document.querySelector('[data-enabled="true"]'));
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('main').evaluate(el=>getComputedStyle(el).color),'rgb(52, 59, 69)');
  assert.equal(await page.locator('main').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(227, 230, 234)');
  const geometry=await scene.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,distance:el.offsetHeight-el.firstElementChild.offsetHeight}));
  let birdY;
  for(const [progress,stage] of [[.05,0],[.4,1],[.75,2]]) {
   await page.evaluate(y=>scrollTo(0,y),geometry.top+geometry.distance*progress);
   await page.waitForFunction(s=>document.querySelector('[data-stage]').dataset.stage===String(s),stage);
   await page.waitForTimeout(420);
   const bird=await scene.getByRole('img',{name:/Gari/}).boundingBox();
   if(birdY!==undefined)assert.ok(Math.abs(bird.y-birdY)<2,'Bird stays fixed');
   birdY=bird.y;
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   const text=await scene.locator('h1').evaluate(el=>{const s=getComputedStyle(el);return [s.fontFamily,s.fontWeight]});
   assert.match(text[0],/Inter/);assert.equal(text[1],'900');
   if(width===390||width===1440)await page.screenshot({path:`test-results/hero-${width}-${stage}.png`});
  }
  await page.evaluate(y=>scrollTo(0,y),geometry.top+geometry.distance+300);
  assert.ok((await scene.getByRole('img',{name:/Gari/}).boundingBox()).y<birdY-100,'Pin releases after final stage');
  const stories=page.getByRole('region',{name:'Meet your curious companions.'});
  await stories.scrollIntoViewIfNeeded();
  assert.equal(await stories.getByRole('article').count(),2);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  if(width===390||width===1440)await stories.screenshot({path:`test-results/characters-${width}.png`});
  await page.getByRole('link',{name:'START QUIZ',exact:true}).click();
  await page.waitForURL('**/start');
  assert.equal(await page.locator('body').evaluate(el=>getComputedStyle(el).color),'rgb(17, 17, 17)');
  assert.equal(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)');
  await page.close();
 }
 for(const options of [{reducedMotion:'reduce',viewport:{width:390,height:844}},{viewport:{width:844,height:390}}]) {
  const page=await browser.newPage(options);await page.goto(base);
  await page.waitForTimeout(200);
  assert.equal(await page.locator('section[data-stage]').getAttribute('data-enabled'),'false');
  assert.equal(await page.locator('section[data-stage] > div').evaluate(el=>getComputedStyle(el).position),'static');
  await page.close();
 }
 console.log('Hero: four widths, all three stages, stationary birds, pin release, CTA, reduced motion and short screens passed.');
} finally { await browser.close(); }
