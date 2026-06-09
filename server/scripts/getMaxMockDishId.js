const fs = require("fs");
const path = require("path");

function extractMockDataObject(source) {
  const keyConst = "const mockData =";
  const keyLet = "let mockData =";
  const startConst = source.indexOf(keyConst);
  const startLet = source.indexOf(keyLet);
  const start = startConst >= 0 ? startConst : startLet;
  if (start === -1) return null;
  const objStart = source.indexOf("{", start);
  if (objStart === -1) return null;
  const end = findMatchingBrace(source, objStart);
  if (end === -1) return null;
  const objectLiteral = source.slice(objStart, end + 1);
  return Function(`"use strict"; return (${objectLiteral});`)();
}

function findMatchingBrace(text, startIndex) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;
  for (let i = startIndex; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function main() {
  const appJsPath = path.resolve(__dirname, "../../app.js");
  const source = fs.readFileSync(appJsPath, "utf-8");
  const mockData = extractMockDataObject(source);
  if (!mockData || !Array.isArray(mockData.dishes)) {
    throw new Error("Не удалось извлечь mockData.dishes");
  }
  const maxId = Math.max(...mockData.dishes.map((d) => Number(d.id)).filter(Number.isFinite));
  process.stdout.write(String(maxId));
}

main();

