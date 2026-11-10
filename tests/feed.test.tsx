import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createElement } from "react";
import samples from "../content/samples.json";
import { parseCollection } from "../lib/content";
import { Feed } from "../components/feed";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  requestAnimationFrame: (fn: () => void) => {
    fn();
    return 0;
  },
});
test("quiz feedback, next, unscored reveal and collection completion", async () => {
  const { render, fireEvent, cleanup } = await import("@testing-library/react");
  const view = render(
    createElement(Feed, { items: parseCollection(samples), preview: true }),
  );
  assert.equal(view.queryByText(samples[0].insight), null);
  fireEvent.click(view.getByRole("button", { name: /A About 10%/ }));
  assert.ok(view.getByText("Now you know a little more."));
  assert.ok(view.getByText(samples[0].feedbackByOption!.A!));
  assert.ok(view.getByText(samples[0].insight));
  fireEvent.click(view.getByRole("button", { name: /Next discovery/ }));
  assert.equal(view.queryByText(samples[1].reveal!), null);
  fireEvent.click(view.getByRole("button", { name: /A They might prefer/ }));
  fireEvent.click(view.getByRole("button", { name: /Reveal their story/ }));
  assert.ok(view.getByText(samples[1].reveal!));
  assert.equal(view.queryByText("YOU GOT IT"), null);
  assert.equal(view.queryByText("A LITTLE SURPRISE"), null);
  fireEvent.click(view.getByRole("button", { name: /Finish this collection/ }));
  assert.ok(view.getByText("A little more in the know."));
  fireEvent.click(view.getByRole("button", { name: /Explore again/ }));
  assert.ok(view.getByText(samples[0].title));
  cleanup();
});
test("empty feed does not leak sample questions", async () => {
  const { render, cleanup } = await import("@testing-library/react");
  const view = render(createElement(Feed, { items: [] }));
  assert.ok(view.getByText(/Something worth discovering/));
  assert.equal(view.queryByText(samples[0].title), null);
  cleanup();
});

test("hub exposes only topics/random and has no save controls or storage dependency", async () => {
  const { render, fireEvent, cleanup } = await import("@testing-library/react");
  const { Explorer, shuffled } = await import("../components/explorer");
  dom.window.scrollTo = () => {};
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get() {
      throw new Error("Storage must not be read");
    },
  });
  const view = render(
    createElement(Explorer, { items: parseCollection(samples), preview: true }),
  );
  assert.equal(
    view.container.querySelectorAll('nav[aria-label="Feed"] button').length,
    2,
  );
  assert.equal(view.queryByRole("button", { name: /save/i }), null);
  fireEvent.click(view.getByRole("button", { name: "Society" }));
  assert.equal(view.container.querySelectorAll(".discovery-tile").length, 1);
  fireEvent.click(view.container.querySelector(".tile-open")!);
  assert.equal(view.queryByRole("button", { name: /save/i }), null);
  fireEvent.click(view.getByRole("button", { name: /Back to feed/ }));
  fireEvent.click(view.getByRole("button", { name: "Random" }));
  fireEvent.click(view.getByRole("button", { name: /Start random feed/ }));
  assert.ok(view.container.querySelector(".player-title"));
  const original = ["a", "b", "c", "d"],
    queue = shuffled(original, () => 0);
  assert.deepEqual(original, ["a", "b", "c", "d"]);
  assert.equal(new Set(queue).size, 4);
  assert.deepEqual([...queue].sort(), original);
  cleanup();
});

test("prediction requires selection and explicit reveal without grading", async () => {
  const { render, fireEvent, cleanup } = await import("@testing-library/react");
  const { default: kindness } = await import("../content/kindness.json");
  const view = render(
    createElement(Feed, { items: parseCollection(kindness), compact: true }),
  );
  const reveal = view.getByRole("button", { name: /Reveal what happened/ });
  assert.equal((reveal as HTMLButtonElement).disabled, true);
  assert.equal(view.container.querySelectorAll(".option").length, 2);
  fireEvent.click(view.getByRole("button", { name: /A Offered the traveler/ }));
  assert.equal(view.queryByText("An umbrella, not a ride."), null);
  fireEvent.click(view.getByRole("button", { name: /B Gave the traveler/ }));
  fireEvent.click(reveal);
  assert.ok(view.getByText("An umbrella, not a ride."));
  assert.equal(view.queryByText("YOU GOT IT"), null);
  assert.equal(view.queryByText("A LITTLE SURPRISE"), null);
  assert.equal(view.container.querySelectorAll(".option.correct").length, 0);
  fireEvent.click(view.getByRole("button", { name: /Next discovery/ }));
  assert.ok(view.getByRole("button", { name: /Reveal their story/ }));
  cleanup();
});

test("topic search is explicitly submitted, intersects topics and clears empty results", async () => {
  const { render, fireEvent, cleanup } = await import("@testing-library/react");
  const { Explorer } = await import("../components/explorer");
  const { default: kindness } = await import("../content/kindness.json");
  const view = render(
    createElement(Explorer, {
      items: parseCollection(kindness),
      preview: true,
    }),
  );
  assert.equal(view.queryByRole("button", { name: "Little kindnesses" }), null);
  fireEvent.change(view.getByRole("searchbox"), {
    target: { value: "kindness" },
  });
  assert.equal(view.container.querySelectorAll(".discovery-tile").length, 4);
  fireEvent.click(view.getByRole("button", { name: "Search" }));
  fireEvent.click(view.getByRole("button", { name: "Travel" }));
  assert.equal(view.container.querySelectorAll(".discovery-tile").length, 2);
  assert.ok(
    view.container
      .querySelector(".content-tags")
      ?.textContent?.includes("#kindness"),
  );
  fireEvent.change(view.getByRole("searchbox"), {
    target: { value: "unfindable" },
  });
  fireEvent.click(view.getByRole("button", { name: "Search" }));
  assert.ok(view.getByText("No discoveries found."));
  fireEvent.click(view.getByRole("button", { name: "Clear filters" }));
  assert.equal(view.container.querySelectorAll(".discovery-tile").length, 4);
  assert.equal((view.getByRole("searchbox") as HTMLInputElement).value, "");
  cleanup();
});
