import { readdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(`${directory}/${entry.name}`)
          : `${directory}/${entry.name}`,
      ),
    )
  ).flat();
}
const sourceFiles = (await files("src")).filter((file) => file.endsWith(".js"));
const otherFiles = [
  ...(await files("scripts")),
  ...(await files("tests")),
].filter((file) => /\.(?:js|mjs)$/.test(file));
const denied = {
  domain: ["application", "infrastructure", "presentation"],
  application: ["infrastructure", "presentation"],
  infrastructure: ["presentation"],
  presentation: ["infrastructure"],
};
for (const file of [...sourceFiles, ...otherFiles, "playwright.config.js"]) {
  const result = spawnSync(process.execPath, ["--check", file], {
    encoding: "utf8",
  });
  if (result.status !== 0) throw new Error(result.stderr);
  const source = await readFile(file, "utf8");
  if (!sourceFiles.includes(file)) continue;
  const layer = file.split("/")[1];
  for (const match of source.matchAll(
    /\b(?:import|export)\s+(?:[^;]*?\s+from\s+)?['"]([^'"]+)['"]/g,
  )) {
    const specifier = match[1];
    if (!specifier.startsWith("."))
      throw new Error(`${file}: keine externen Runtime-Pakete vorgesehen.`);
    const target = resolve(file, "..", specifier);
    if (
      (denied[layer] ?? []).some((name) => target.includes(`/src/${name}/`)) ||
      (layer !== "app.js" && target.endsWith("/src/app.js"))
    )
      throw new Error(`${file}: unerlaubter Import ${specifier}`);
  }
  if (
    ["domain", "application"].includes(layer) &&
    /\b(?:document|window|localStorage|FileReader)\b/.test(source)
  )
    throw new Error(
      `${file}: Browserzugriff gehört in Infrastruktur oder Präsentation.`,
    );
}
console.log(
  `${sourceFiles.length + otherFiles.length + 1} JavaScript-Dateien: Syntax und Schichtengrenzen geprüft.`,
);
