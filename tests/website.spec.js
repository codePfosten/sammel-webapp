import { test, expect } from "@playwright/test";
for (const width of [320, 390, 1024]) {
  test(`Manueller Ablauf und lokale Speicherung bei ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 850 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Deine Sammlung im Blick" }),
    ).toBeVisible();
    await page.getByRole("link", { name: /LEGO-Figuren/ }).click();
    await expect(
      page.getByRole("heading", {
        name: "Hier ist Platz für deine erste Figur",
      }),
    ).toBeVisible();
    await page
      .getByRole("link", { name: "Gegenstand hinzufügen", exact: true })
      .click();
    await page.getByLabel("Name", { exact: true }).fill("Waldentdecker");
    await page.getByLabel("LEGO-/Katalog-ID", { exact: true }).fill("demo-001");
    await page.getByLabel("Geschätzter Preis in Euro").fill("12,50");
    const photo = await page.screenshot();
    await page
      .getByLabel("Bild auswählen")
      .setInputFiles({
        name: "figur.png",
        mimeType: "image/png",
        buffer: photo,
      });
    await expect(
      page.getByRole("img", { name: "Vorschau des ausgewählten Bildes" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Speichern", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Waldentdecker" }),
    ).toBeVisible();
    await expect(page.getByText("12,50 €", { exact: true })).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "Waldentdecker" }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Waldentdecker" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Zur LEGO-Sammlung" }).click();
    await expect(
      page.getByRole("link", { name: "LEGO-Sammlung", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await page
      .getByRole("link", { name: "Gegenstand hinzufügen", exact: true })
      .click();
    await page.getByLabel("Name", { exact: true }).fill("Waldentdecker");
    await page.getByLabel("LEGO-/Katalog-ID", { exact: true }).fill("demo-001");
    await page.getByRole("button", { name: "Speichern", exact: true }).click();
    await page.getByRole("link", { name: "Zur LEGO-Sammlung" }).click();
    await expect(
      page.getByRole("link", { name: "Waldentdecker", exact: true }),
    ).toHaveCount(2);
    await page.screenshot({
      path: `test-results/collection-${width}.png`,
      fullPage: true,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("link", { name: "Waldentdecker", exact: true })
      .first()
      .click();
    await page.getByRole("link", { name: "Bearbeiten", exact: true }).click();
    await page.getByRole("button", { name: "Bild entfernen" }).click();
    await page.getByLabel("Geschätzter Preis in Euro").fill("0");
    await page.getByRole("button", { name: "Speichern", exact: true }).click();
    await expect(page.getByText("0,00 €", { exact: true })).toBeVisible();
    await expect(page.getByText("Kein Bild")).toBeVisible();
    page.once("dialog", (dialog) => dialog.dismiss());
    await page.getByRole("button", { name: "Löschen", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Waldentdecker" }),
    ).toBeVisible();
    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Löschen", exact: true }).click();
    await expect(
      page.getByRole("link", { name: "Waldentdecker", exact: true }),
    ).toHaveCount(1);
    await page.getByRole("link", { name: "Übersicht", exact: true }).click();
    await expect(page.getByText("0 von 1 Gegenständen bewertet")).toBeVisible();
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    const nav = await page.getByRole("navigation").boundingBox();
    expect(nav.y + nav.height).toBe(850);
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: /LEGO-Figuren/ }),
    ).toBeFocused();
    await expect(page.getByRole("link", { name: /LEGO-Figuren/ })).toHaveCSS(
      "outline-style",
      "solid",
    );
    expect(errors).toEqual([]);
  });
}
test("Defaults, Validierung, Abbrechen, HTML-Eingaben und unbekannte IDs", async ({
  page,
}) => {
  await page.goto("/#/items/new");
  await page.getByLabel("Geschätzter Preis in Euro").fill("1,234");
  await page.getByRole("button", { name: "Speichern", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Nachkommastellen");
  await page.getByRole("link", { name: "Abbrechen", exact: true }).click();
  await expect(page.getByText("0 von 0 Gegenständen bewertet")).toBeVisible();
  await page
    .getByRole("link", { name: "Gegenstand hinzufügen", exact: true })
    .click();
  await page.getByRole("button", { name: "Speichern", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Unbenanntes Objekt" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Bearbeiten", exact: true }).click();
  await page
    .getByLabel("Name", { exact: true })
    .fill("<img src=x onerror=alert(1)>");
  await page.getByRole("button", { name: "Speichern", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "<img src=x onerror=alert(1)>" }),
  ).toBeVisible();
  await expect(page.locator("img")).toHaveCount(0);
  await page.evaluate(() => {
    location.hash = "/items/missing";
  });
  await expect(
    page.getByRole("heading", { name: "Nicht gefunden" }),
  ).toBeVisible();
  await expect(page.locator("[data-nav][aria-current]")).toHaveCount(0);
});
test("Speicherfehler und beschädigte Bestände zeigen Fehler ohne Datenverlust", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Gegenstand hinzufügen", exact: true })
    .click();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("full", "QuotaExceededError");
    };
  });
  await page.getByRole("button", { name: "Speichern", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Speicher ist voll");
  await page.reload();
  await page.evaluate(() => {
    localStorage.setItem("sammelraum.simple.v1", "{invalid");
    location.hash = "/";
  });
  await expect(
    page.getByRole("heading", { name: "Sammlung nicht verfügbar" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("sammelraum.simple.v1")),
  ).toBe("{invalid");
});
