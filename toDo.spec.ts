import test, { expect } from "@playwright/test";

test(
  "page title and main heading are correct",
  { tag: ["@regression", "@smoke"] },
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");

    const currentUrl = page.url();
    expect(currentUrl).toContain("todomvc");

    const title = await page.title();

    expect(title).toBe("React • TodoMVC");

    const heading = page.getByRole("heading", { name: "todos" });

    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("todos");

    test.fail(true, "Input is missing a title attribute");
    const inputByTitle = page.getByTitle("New todo");
    await expect(inputByTitle).toBeVisible();

    await page.screenshot({ path: "screenshots/01_title.png", fullPage: true });
    const videoPath = await page.video()?.path();
    console.log("Video saved at:", videoPath);
  },
);

test(
  "new-todo input has correct placeholder and accepts focus",
  { tag: ["@regression", "@header"] },
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");

    const input = page.getByPlaceholder("What needs to be done?");

    await expect(input).toBeVisible();

    await expect.soft(input).toHaveAttribute("class", "new-todo");

    await input.click();

    await input.fill("Skate with Wynter");

    await expect(input).toHaveValue("Skate with Wynter");

    //the input must NOT be disabled
    await expect(input).not.toBeDisabled();

    await page.screenshot({ path: "screenshots/02_input.png" });
  },
);

test(
  "pressing Enter adds a new todo item",
  { tag: ["@regression", "@header"] },
  async ({ page }) => {
    test.slow();

    await page.goto("https://demo.playwright.dev/todomvc/#/");

    const input = page.getByPlaceholder("What needs to be done?");

    await input.click();
    await input.fill("Learn Playwright");

    await input.press("Enter");

    const todoItem = page
      .getByRole("listitem")
      .filter({ hasText: "Learn Playwright" });

    await expect(todoItem).toBeVisible();

    const belowText = page.getByText("All Active Completed");
    await expect(belowText).toBeVisible();

    await expect(input).toHaveValue("");

    await page.screenshot({ path: "screenshots/03-todo-added.png" });
    const videoPath = await page.video()?.path();
  },
);

test(
  "header input should display character counter",
  { tag: ["@todo", "@header"] },
  async ({ page }) => {
    test.fixme(true, "Character counter feature is not implemented yet");

    await page.goto("https://demo.playwright.dev/todomvc/#/");

    const input = page.getByLabel("New todo input");
    await input.fill("Test with counter");

    const counterById = page.getByTestId("char-counter");
    await expect(counterById).toHaveText("17 / 100");

    await page.screenshot({ path: "screenshots/04_char_counter.png" });
    const videoPath = await page.video()?.path();
  },
);

test.skip(
  "Logo is visible",
  { tag: ["@todo", "@header"] },
  async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    const logo = page.getByAltText("TodoMVC logo");
    await expect(logo).toBeVisible();

    await page.screenshot({ path: "screenshots/05_logo.png" });
  },
);

