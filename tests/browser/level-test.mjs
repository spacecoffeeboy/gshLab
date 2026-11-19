import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import {readFile,mkdir} from 'node:fs/promises';
const bank=JSON.parse(await readFile(new URL('../../content/quiz-bank.json',import.meta.url),'utf8')).questions;
const english=JSON.parse(await readFile(new URL('../../content/quiz-bank-en.json',import.meta.url),'utf8')).questions;
const base=process.env.BROWSER_BASE_URL||'http://localhost:3010';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const errors=[];
await mkdir('test-results',{recursive:true});
async function fits(page,label){assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,label);}
async function capture(page,name){await page.evaluate(()=>document.fonts.ready);await page.mouse.move(0,0);await page.screenshot({path:`test-results/${name}.png`,fullPage:true,animations:'disabled'});}
async function init(page){
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{for(const key of ['localStorage','sessionStorage'])Object.defineProperty(window,key,{get(){throw Error('No persistence in static quiz');}});});
}
async function begin(page,label,mode='standard',language='en'){
 await page.goto(base);
 await page.getByRole('link',{name:'START QUIZ'}).click();await page.waitForURL('**/start');
 await page.getByRole('heading',{name:/Where does your/}).waitFor();
 assert.equal(await page.getByRole('button',{name:/Start my test/}).isDisabled(),true);
 assert.equal(await page.getByRole('button',{name:/^English/}).getAttribute('aria-pressed'),'true');
 if(language==='ko')await page.getByRole('button',{name:/^Korean/}).click();
 await page.getByRole('button',{name:new RegExp('^'+label)}).click();
 if(mode==='time-attack')await page.getByRole('button',{name:/^TIME ATTACK/}).click();
 await page.getByRole('button',{name:/Start my test/}).click();await page.waitForURL('**/test');
}
async function current(page,language='en'){const id=await page.locator('.test-question').getAttribute('data-question-id');const q=bank.find(q=>q.id===id);assert.ok(q,'Actual bank question');assert.equal(await page.locator('.test-question h1').innerText(),language==='en'?english[id].prompt:q.prompt);return q;}
async function complete(page,label,total,width,language='en'){
 await begin(page,label,'standard',language);
 const seen=new Set();let expected=0;
 for(let i=0;i<total;i++){
  const q=await current(page,language);assert.ok(!seen.has(q.id),'No duplicates');seen.add(q.id);
  const expectedLevel={Beginner:'beginner',Intermediate:'intermediate',Advanced:'advanced'}[label];assert.equal(q.level,expectedLevel);
  assert.equal(await page.getByRole('button',{name:/View explanation/}).isDisabled(),true);
  const option=i===0?q.options.find(o=>o.id!==q.correctOptionId):q.options.find(o=>o.id===q.correctOptionId);
  if(option.id===q.correctOptionId)expected++;
  await page.getByRole('button',{name:new RegExp('^'+option.id+' ')}).click();
  assert.equal(await page.locator('.success-tick').count(),1);
  if(i===0){
   const question=await page.locator('.test-question').boundingBox();
   await page.getByRole('button',{name:'View explanation',exact:true}).click();
   await page.locator('#question-explanation').waitFor();assert.equal(page.url(),base+'/test');
   assert.ok((await page.locator('#question-explanation').boundingBox()).y>=question.y+question.height);
   await fits(page,`question ${width}`);
   if([390,1440].includes(width))await capture(page,`level-question-${width}-${language}`);
  }
  await page.getByRole('button',{name:i===total-1?'See my report':'Next question',exact:true}).click();
 }
 await page.waitForURL('**/report');await page.locator('.report-score').waitFor();
 assert.match(await page.locator('.report-score').innerText(),new RegExp(`${expected}\\s*/ ${total}`));
 assert.match(await page.locator('#report-heading').innerText(),new RegExp(label));
 assert.equal(await page.locator('.report-review-item').count(),total);
 await page.locator('.report-review-item').first().locator('summary').click();
 await page.locator('.review-explanation').first().waitFor();
 await fits(page,`report ${width}`);
 if([390,1440].includes(width))await capture(page,`level-report-${width}-${language}`);
 if(width===390&&label==='Beginner'){
  await page.getByRole('link',{name:'Take another test',exact:true}).click();await page.waitForURL('**/start');
  await page.getByRole('button',{name:/^Advanced/}).click();await page.getByRole('button',{name:/Start my test/}).click();await page.waitForURL('**/test');
  await page.getByText('Question 1 of 7',{exact:true}).waitFor();
  assert.equal(await page.getByRole('button',{name:'Next question',exact:true}).isDisabled(),true);
  await page.goto(base+'/report');
 }else await page.reload();
 await page.getByRole('heading',{name:'Your next discovery starts with a test.'}).waitFor();
}
try{
 const page=await browser.newPage();await init(page);
 for(const width of [320,360,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(base+'/start');await page.getByRole('heading',{name:/Where does your/}).waitFor();
  await fits(page,`bridge ${width}`);
  assert.equal(await page.locator('.level-choice').count(),3);
  assert.equal(await page.locator('.feed-tabs').count(),0);
  const button=page.getByRole('button',{name:/Start my test/});assert.ok(await button.evaluate(e=>e.getBoundingClientRect().height>=48));
  if([390,1440].includes(width))await capture(page,`level-bridge-${width}`);
  await complete(page,'Advanced',7,width);
 }
 await page.setViewportSize({width:390,height:900});await complete(page,'Beginner',15,390);
 await page.setViewportSize({width:1440,height:900});await complete(page,'Intermediate',15,1440);
 await complete(page,'Advanced',7,1440,'ko');
 const timed=await browser.newPage({viewport:{width:390,height:900}});await init(timed);await timed.clock.install();
 await begin(timed,'Beginner','time-attack');
 const q=await current(timed);await timed.getByRole('button',{name:new RegExp('^'+q.correctOptionId+' ')}).click();
 const timeBar=timed.getByRole('progressbar',{name:'Time remaining',exact:true});
 const initial=Number(await timeBar.getAttribute('aria-valuenow'));assert.ok(initial>170&&initial<=180);
 await timed.clock.fastForward(60000);
 const after=Number(await timeBar.getAttribute('aria-valuenow'));assert.ok(after<initial-50&&after>100);
 const meterStyle=await timeBar.locator('span').getAttribute('style')??'';
 assert.ok(parseFloat(meterStyle.match(/width:\s*([\d.]+)/)?.[1]??'100')<80);
 await capture(timed,'level-time-attack-390');
 assert.equal(await timed.getByRole('button',{name:'Next question',exact:true}).isEnabled(),true);
 await timed.getByRole('button',{name:'Next question',exact:true}).click();
 await timed.getByText('Question 2 of 15',{exact:true}).waitFor();
 assert.ok(Number(await timeBar.getAttribute('aria-valuenow'))<initial-50,'Timer must not reset on the next question');
 await timed.clock.fastForward(121000);
 await timed.waitForURL('**/report');await timed.locator('.report-score').waitFor();
 assert.match(await timed.locator('.report-score').innerText(),/1\s*\/ 15/);
 assert.match(await timed.locator('.report-stats').innerText(),/Not answered\s*14/);
 await timed.getByText(/3-minute test was submitted/).waitFor();
 await fits(timed,'timeout report');
 await capture(timed,'level-timeout-report-390');
 await timed.goto(base+'/test');await timed.getByRole('heading',{name:/Find your starting point first/}).waitFor();
 await page.goto(base);await page.keyboard.press('Tab');
 assert.equal(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),true);
 await page.keyboard.press('Enter');assert.ok(page.url().endsWith('#main-content'));
 assert.deepEqual(errors,[]);
 console.log('PASS: English UI and 70 complete translations; bridge/language/level/mode; 15/15/7 real question sets; 3-minute shrinking timer; immediate checks and inline explanations; scoped reports; timeout 14 unanswered; refresh reset; 6 widths; browser storage blocked.');
}finally{await browser.close();}
