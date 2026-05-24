import { test, expect } from "@playwright/test";

test.describe("Activity 1 - MercadoLibre", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.mx");
  });

  test("getByRole", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Vender", exact: true })).toBeVisible();
  });

  test("getByText", async ({ page }) => {
    await expect(page.getByText("Categorías").first()).toBeVisible();
  });

  test("getByLabel", async ({ page }) => {
    await expect(page.getByLabel("Buscar productos por letra inicial A")).toBeVisible();
  });

  test("getByPlaceholder", async ({ page }) => {
    await page.getByPlaceholder("Buscar productos, marcas y más…").fill("laptop");
  });

  test("getByAltText", async ({ page }) => {
    await expect(page.getByAltText("HOGAR")).toBeVisible();
  });

  test("getByTitle", async ({ page }) => {
    await expect(page.getByTitle("Carrito")).toBeVisible();
  });

  test("getByTestId", async ({ page }) => {
    await page.getByTestId("action:understood-button").click();
    await expect(page.getByTestId("action:understood-button")).not.toBeVisible();
  });
});