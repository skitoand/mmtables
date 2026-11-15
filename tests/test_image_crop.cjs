const assert = require("assert");
const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const start = source.indexOf("function resizeBoxEdges");
const end = source.indexOf("function isImageCropTarget");
assert.ok(start > 0 && end > start, "resizeBoxEdges must stay extractable");
eval(source.slice(start, end));

const startBox = { x: 10, y: 20, w: 100, h: 50 };

const moved = resizeImageCropBox(startBox, "move", 5, -4);
assert.deepStrictEqual(moved, { x: 15, y: 16, w: 100, h: 50 });

const east = resizeImageCropBox(startBox, "e", 20, 0);
assert.deepStrictEqual(east, { x: 10, y: 20, w: 120, h: 50 });

const west = resizeImageCropBox(startBox, "w", 10, 0);
assert.deepStrictEqual(west, { x: 20, y: 20, w: 90, h: 50 });

const north = resizeImageCropBox(startBox, "n", 0, -15);
assert.deepStrictEqual(north, { x: 10, y: 5, w: 100, h: 65 });

const corner = resizeImageCropBox(startBox, "se", 20, 1);
assert.strictEqual(corner.x, 10);
assert.strictEqual(corner.y, 20);
assert.strictEqual(corner.w, 120);
assert.strictEqual(corner.h, 60);

const minWest = resizeImageCropBox(startBox, "w", 500, 0);
assert.strictEqual(minWest.w, 8);
assert.strictEqual(minWest.x, 102);

console.log("image crop geometry ok");
