import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import {readFile,mkdir} from 'node:fs/promises';
const bank=JSON.parse(await readFile(new URL('../../content/quiz-bank.json',import.meta.url),'utf8')).questions;
const base=process.env.BROWSER_BASE_URL||'http://localhost:3010';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const errors=[];
await mkdir('test-results',{recursive:true});
async function fits(page,label){assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,label);}
async function capture(page,name){await page.evaluate(()=>document.fonts.ready);await page.mouse.move(0,0);await page.screenshot({path:`test-results/${name}.png`,fullPage:true});}
async function init(page){
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{for(const key of ['localStorage','sessionStorage'])Object.defineProperty(window,key,{get(){throw Error('No persistence in static quiz');}});});
}
async function begin(page,label,mode='standard'){
 await page.goto(base);
 await page.getByRole('link',{name:'Take the Korea test'}).click();await page.waitForURL('**/start');
 await page.getByRole('heading',{name:/내 한국 이해도/}).waitFor();
 assert.equal(await page.getByRole('button',{name:/시험 시작하기/}).isDisabled(),true);
 assert.equal(await page.getByRole('button',{name:/English/}).isDisabled(),true);
 await page.getByRole('button',{name:new RegExp('^'+label)}).click();
 if(mode==='time-attack')await page.getByRole('button',{name:/^TIME ATTACK/}).click();
 await page.getByRole('button',{name:/시험 시작하기/}).click();await page.waitForURL('**/test');
}
async function current(page){const prompt=await page.locator('.test-question h1').innerText();const q=bank.find(q=>q.prompt===prompt);assert.ok(q,'Actual bank question');return q;}
async function complete(page,label,total,width){
 await begin(page,label);
 const seen=new Set();let expected=0;
 for(let i=0;i<total;i++){
  const q=await current(page);assert.ok(!seen.has(q.id),'No duplicates');seen.add(q.id);
  const expectedLevel={초급:'beginner',중급:'intermediate',상급:'advanced'}[label];assert.equal(q.level,expectedLevel);
  assert.equal(await page.getByRole('button',{name:/해설 보기/}).isDisabled(),true);
  const option=i===0?q.options.find(o=>o.id!==q.correctOptionId):q.options.find(o=>o.id===q.correctOptionId);
  if(option.id===q.correctOptionId)expected++;
  await page.getByRole('button',{name:new RegExp('^'+option.id+' ')}).click();
  assert.equal(await page.locator('.success-tick').count(),1);
  if(i===0){
   const question=await page.locator('.test-question').boundingBox();
   await page.getByRole('button',{name:'해설 보기',exact:true}).click();
   await page.locator('#question-explanation').waitFor();assert.equal(page.url(),base+'/test');
   assert.ok((await page.locator('#question-explanation').boundingBox()).y>=question.y+question.height);
   await fits(page,`question ${width}`);
   if([390,1440].includes(width))await capture(page,`level-question-${width}`);
  }
  await page.getByRole('button',{name:i===total-1?'리포트 보기':'다음 문제',exact:true}).click();
 }
 await page.waitForURL('**/report');await page.locator('.report-score').waitFor();
 assert.match(await page.locator('.report-score').innerText(),new RegExp(`${expected}\\s*/ ${total}`));
 assert.match(await page.locator('#report-heading').innerText(),new RegExp(label));
 assert.equal(await page.locator('.report-review-item').count(),total);
 await page.locator('.report-review-item').first().locator('summary').click();
 await page.locator('.review-explanation').first().waitFor();
 await fits(page,`report ${width}`);
 if([390,1440].includes(width))await capture(page,`level-report-${width}`);
 if(width===390&&label==='초급'){
  await page.getByRole('link',{name:'다시 도전하기',exact:true}).click();await page.waitForURL('**/start');
  await page.getByRole('button',{name:/^상급/}).click();await page.getByRole('button',{name:/시험 시작하기/}).click();await page.waitForURL('**/test');
  await page.getByText('1 / 7 문항',{exact:true}).waitFor();
  assert.equal(await page.getByRole('button',{name:'다음 문제',exact:true}).isDisabled(),true);
  await page.goto(base+'/report');
 }else await page.reload();
 await page.getByRole('heading',{name:'아직 완료한 시험이 없어요.'}).waitFor();
}
try{
 const page=await browser.newPage();await init(page);
 for(const width of [320,360,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(base+'/start');await page.getByRole('heading',{name:/내 한국 이해도/}).waitFor();
  await fits(page,`bridge ${width}`);
  assert.equal(await page.locator('.level-choice').count(),3);
  assert.equal(await page.locator('.feed-tabs').count(),0);
  const button=page.getByRole('button',{name:/시험 시작하기/});assert.ok(await button.evaluate(e=>e.getBoundingClientRect().height>=48));
  if([390,1440].includes(width))await capture(page,`level-bridge-${width}`);
  await complete(page,'상급',7,width);
 }
 await page.setViewportSize({width:390,height:900});await complete(page,'초급',15,390);
 await page.setViewportSize({width:1440,height:900});await complete(page,'중급',15,1440);
 const timed=await browser.newPage({viewport:{width:390,height:900}});await init(timed);await timed.clock.install();
 await begin(timed,'초급','time-attack');
 const q=await current(timed);await timed.getByRole('button',{name:new RegExp('^'+q.correctOptionId+' ')}).click();
 await timed.clock.fastForward(301000);
 await timed.waitForURL('**/report');await timed.locator('.report-score').waitFor();
 assert.match(await timed.locator('.report-score').innerText(),/1\s*\/ 15/);
 assert.match(await timed.locator('.report-stats').innerText(),/미응답\s*14/);
 await timed.getByText(/5분이 끝나 자동 제출/).waitFor();
 await fits(timed,'timeout report');
 await timed.goto(base+'/test');await timed.getByRole('heading',{name:/먼저 내 레벨/}).waitFor();
 await page.goto(base);await page.keyboard.press('Tab');
 assert.equal(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),true);
 await page.keyboard.press('Enter');assert.ok(page.url().endsWith('#main-content'));
 assert.deepEqual(errors,[]);
 console.log('PASS: bridge/level/mode; 15/15/7 real question sets; immediate checks and inline explanations; scoped reports; timeout 14 unanswered; refresh reset; 6 widths; browser storage blocked.');
}finally{await browser.close();}
