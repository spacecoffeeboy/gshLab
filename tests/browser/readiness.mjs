import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.BROWSER_BASE_URL || "http://localhost:3002";
function contrast(a,b){
 const luminance=color=>{const rgb=color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
 const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
const output = "test-results";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
const errors = [],
  metrics = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.addInitScript(() => {
  Object.defineProperty(window, "localStorage", {
    get() {
      throw new Error("App must not depend on storage");
    },
  });
});
async function ready() {
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
}
async function fits(label) {
  const sizes = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  assert.ok(
    sizes.document <= sizes.viewport,
    `${label}: ${JSON.stringify(sizes)}`,
  );
}
async function px(selector, property) {
  return page
    .locator(selector)
    .first()
    .evaluate((el, prop) => parseFloat(getComputedStyle(el)[prop]), property);
}
async function capture(name) {
  await ready();
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${output}/${name}.png`, fullPage: false });
}
try {
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await ready();
    await fits(`landing ${width}`);
    assert.equal(await page.locator("main>section").count(), 3);
    const hero = await page.locator(".type-hero").boundingBox(),
      cta = await page.locator(".hero-action-group .primary").boundingBox();
    assert.ok(
      Math.abs(cta.x + cta.width / 2 - hero.x - hero.width / 2) < 2,
      "Hero CTA must remain centered",
    );
    if (width === 390 || width === 1440) await capture(`landing-${width}`);
    await page.getByRole("link", { name: "Start discovering" }).click();
    await page.waitForURL("**/discover");
    await ready();
    await fits(`public hub ${width}`);
    assert.equal(await page.locator(".discovery-tile").count(), 0);
    assert.equal(await page.getByRole("button", { name: /save/i }).count(), 0);
    assert.equal(await page.locator(".feed-tabs button").count(), 2);
    await page.goto(`${base}/preview`);
    await page.locator(".discovery-tile").first().waitFor();
    await ready();
    await fits(`fixture hub ${width}`);
    assert.equal(await page.locator(".discovery-tile").count(), 6);
    const colors=await page.evaluate(()=>({text:getComputedStyle(document.querySelector('.tile-meta')).color,background:getComputedStyle(document.body).backgroundColor,input:getComputedStyle(document.querySelector('.discovery-search input')).borderColor}));
    assert.ok(contrast(colors.text,colors.background)>=4.5,'Secondary text needs 4.5:1 contrast');
    assert.ok(contrast(colors.input,colors.background)>=3,'Input outline needs 3:1 contrast');
    const inputHeight = await px(".discovery-search input", "height"),
      buttonHeight = await px(".discovery-search .primary", "height"),
      bodyFont = await px(".tile-body p", "fontSize"),
      metaFont = await px(".tile-meta", "fontSize"),
      chipHeight = await px(".category-filters button", "height");
    assert.equal(inputHeight, 48);
    assert.equal(buttonHeight, 48);
    assert.equal(bodyFont, 15);
    assert.ok(metaFont >= 12);
    assert.ok(chipHeight >= 44);
    if (width <= 640) {
      const nav = await page.locator(".feed-tabs").boundingBox();
      assert.ok(nav.y >= 800);
      assert.ok((await px(".feed-tabs button", "height")) >= 56);
    }
    metrics.push({
      width,
      inputHeight,
      buttonHeight,
      bodyFont,
      metaFont,
      chipHeight,
    });
    if (width === 390 || width === 1440) await capture(`discover-${width}`);
    await page.getByRole("searchbox").fill("kindness");
    await page.getByRole("searchbox").press("Enter");
    assert.equal(await page.locator(".discovery-tile").count(), 4);
    await page.getByRole("button", { name: "Travel", exact: true }).click();
    assert.equal(await page.locator(".discovery-tile").count(), 2);
    await page.locator(".tile-open").first().click();
    await page.getByRole("button", { name: "Reveal what happened" }).waitFor();
    await fits(`player ${width}`);
    assert.equal(await px(".context", "fontSize"), 15);
    assert.equal(await px(".player-title", "fontSize"), width <= 640 ? 24 : 28);
    assert.ok((await px(".option", "height")) >= 60);
    assert.equal(await px(".content-tags", "fontSize"), 12);
    const reveal = page.getByRole("button", { name: "Reveal what happened" });
    assert.ok(await reveal.isDisabled());
    if (width === 390 || width === 1440)
      await capture(`reveal-before-${width}`);
    await page.locator(".option").first().focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".result").count(), 0);
    await reveal.focus();
    await page.keyboard.press("Enter");
    await page.locator(".result h2").waitFor();
    assert.equal(
      await page
        .locator(".result h2")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    assert.equal(await page.locator(".option.correct").count(), 0);
    await page.locator(".source-details summary").click();
    assert.equal(await px(".source-details", "paddingBottom"), 24);
    assert.equal(await page.locator(".source a").count(), 0);
    await fits(`result ${width}`);
    if (width === 390 || width === 1440) await capture(`reveal-after-${width}`);
    await page.getByRole("button", { name: "Back to feed" }).click();
    assert.equal(
      await page.locator("h1").evaluate((el) => el === document.activeElement),
      true,
    );
  }
  // Quiz feedback remains scored, with source disclosure and explicit next.
  await page.goto(`${base}/preview`);
  await page.getByRole("button", { name: "Society", exact: true }).click();
  await page.locator(".tile-open").first().click();
  await page.getByRole("button", { name: /A About 10%/ }).click();
  await page.getByText("Now you know a little more.").waitFor();
  assert.equal(await page.locator(".option.correct").count(), 1);
  // Every item appears exactly once per shuffled run; completion requires no timer.
  await page.getByRole("button", { name: "Random", exact: true }).click();
  await page.getByRole("button", { name: "Start random feed" }).click();
  const seen = new Set();
  for (let i = 0; i < 6; i++) {
    const title = await page.locator(".player-title").textContent();
    assert.ok(!seen.has(title));
    seen.add(title);
    await page.locator(".option").first().click();
    const reveal = page.getByRole("button", {
      name: /^Reveal (what happened|their story)/,
    });
    if (await reveal.count()) await reveal.click();
    await page
      .getByRole("button", {
        name: i === 5 ? "Finish this collection" : "Next discovery",
      })
      .click();
  }
  await page.getByText("A little more in the know.").waitFor();
  await page.getByRole("button", { name: /Explore again/ }).click();
  await page.locator(".player-title").waitFor();
  // Long copy and doubled reading text: a layout stress test, not physical device QA.
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(`${base}/preview`);
  await page.locator(".tile-open").first().click();
  await page
    .locator(".player-title")
    .evaluate(
      (el) =>
        (el.textContent =
          "A longer headline to check wrapping, including averylongunbrokenwordthatmustnotbreakthelayout"),
    );
  await page
    .locator(".context,legend,.option")
    .evaluateAll((elements) =>
      elements.forEach(
        (el) =>
          (el.style.fontSize = `${parseFloat(getComputedStyle(el).fontSize) * 2}px`),
      ),
    );
  await fits("320px long copy and doubled reading text");
  // The initial keyboard stop exposes a real skip link to a main landmark.
  await page.goto(base);
  await page.keyboard.press("Tab");
  assert.equal(
    await page
      .locator(".skip-link")
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.keyboard.press("Enter");
  assert.ok(page.url().endsWith("#main-content"));
  // Favicon and deep link are real responses, not a mock-up.
  assert.equal((await page.request.get(`${base}/favicon.ico`)).status(), 200);
  await page.goto(`${base}/discover?feed=random`);
  await page.getByRole("button", { name: "Random", exact: true }).waitFor();
  await page.waitForFunction(() =>
    document
      .querySelector('.feed-tabs button[aria-current="page"]')
      ?.textContent?.includes("Random"),
  );
  assert.ok(
    await page.getByRole("button", { name: "Start random feed" }).isDisabled(),
  );
  assert.deepEqual(errors, []);
  await writeFile(
    `${output}/metrics.json`,
    JSON.stringify(
      {
        metrics,
        errors,
        checks:
          "six viewports; no Saved/storage; search; keyboard; Quiz/Reveal; random; stress layout; public fixtures isolated",
      },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${metrics.length} viewports, numeric UI checks and full journeys; screenshots/metrics in ${output}/`,
  );
} finally {
  await browser.close();
}
