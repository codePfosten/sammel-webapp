import test from "node:test";
import assert from "node:assert/strict";
import { parsePrice, validateState } from "../src/domain/inventory.js";
import { createInventory } from "../src/application/inventory.js";
import {
  createLocalStorageRepository,
  STORAGE_KEY,
} from "../src/infrastructure/local-storage.js";
function setup() {
  let raw = null;
  let fail = false;
  let sequence = 0;
  const storage = {
    getItem: () => raw,
    setItem: (_key, value) => {
      if (fail) throw { name: "QuotaExceededError" };
      raw = value;
    },
  };
  const repository = createLocalStorageRepository(storage);
  const inventory = createInventory(repository, {
    createId: () => `item-${++sequence}`,
    now: () => "2026-10-23T12:00:00Z",
  });
  return {
    inventory,
    repository,
    storage,
    raw: () => raw,
    fail: () => {
      fail = true;
    },
  };
}
test("Centbeträge, null/0 und ungültige Eingaben", () => {
  assert.equal(parsePrice(""), null);
  assert.equal(parsePrice("0"), 0);
  assert.equal(parsePrice("12,50"), 1250);
  assert.equal(parsePrice("12.5"), 1250);
  for (const value of [
    "-1",
    "1,234",
    "Infinity",
    "NaN",
    "1e3",
    "900719925474099100",
  ])
    assert.throws(() => parsePrice(value));
});
test("Default-Sammlung, leere Felder, getrennte Duplikate, Bearbeiten und Löschen", async () => {
  const { inventory } = setup();
  assert.equal((await inventory.overview()).collection.name, "LEGO-Figuren");
  const first = await inventory.save({
    name: "Zwilling",
    catalogId: "sw-01",
    price: "12,50",
  });
  const second = await inventory.save({
    name: "Zwilling",
    catalogId: "sw-01",
    price: "0",
  });
  const empty = await inventory.save({});
  assert.notEqual(first.id, second.id);
  assert.equal(empty.name, "");
  assert.equal(empty.catalogId, "");
  assert.equal(empty.imageId, null);
  assert.equal(empty.marketValueMinor, null);
  assert.equal(empty.createdAt, "2026-10-23T12:00:00Z");
  assert.deepEqual((await inventory.overview()).summary, {
    count: 3,
    valuedCount: 2,
    totalMinor: 1250,
  });
  await inventory.save({ name: "Geändert", price: "3" }, first.id);
  await inventory.remove(first.id);
  assert.equal((await inventory.overview()).items[0].id, second.id);
  assert.deepEqual((await inventory.overview()).summary, {
    count: 2,
    valuedCount: 1,
    totalMinor: 0,
  });
  await assert.rejects(inventory.remove("missing"));
});
test("Bilder, Reload und Speicherfehler verändern den vorherigen Bestand nicht", async () => {
  const context = setup();
  const image = "data:image/png;base64,YQ==";
  const item = await context.inventory.save({ image });
  assert.equal((await context.inventory.overview()).images[item.id], image);
  const reopened = createLocalStorageRepository(context.storage);
  assert.equal((await reopened.read()).items[0].id, item.id);
  const previous = context.raw();
  context.fail();
  await assert.rejects(
    context.inventory.save({ image: null }, item.id),
    /Speicher ist voll/,
  );
  assert.equal(context.raw(), previous);
  await assert.rejects(context.inventory.remove(item.id), /Speicher ist voll/);
  assert.equal(context.raw(), previous);
});
test("Beschädigte Daten werden geschützt; fehlendes Bild bleibt lesbar", async () => {
  let written = false;
  const repository = createLocalStorageRepository({
    getItem: () => "{invalid",
    setItem: () => {
      written = true;
    },
  });
  await assert.rejects(repository.read(), /beschädigt/);
  assert.equal(written, false);
  assert.throws(() => validateState({ version: 9, items: [], images: {} }));
  const { inventory, repository: validRepository } = setup();
  await inventory.save({ image: "data:image/png;base64,YQ==" });
  const state = await validRepository.read();
  state.images = {};
  assert.doesNotThrow(() => validateState(state));
  assert.equal(STORAGE_KEY, "sammelraum.simple.v1");
});
