import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};
const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405);
    response.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    // Nur die Website ausliefern, weder .git noch lokale Projekt-/Testdateien.
    if (
      !["index.html", "styles.css"].includes(relative) &&
      !/^src\/[a-zA-Z0-9/-]+\.js$/.test(relative)
    )
      throw new Error("Not found");
    const path = resolve(root, relative);
    if (!path.startsWith(root + sep)) throw new Error("Not found");
    const body = await readFile(path);
    const extension = path.slice(path.lastIndexOf("."));
    response.writeHead(200, {
      "Content-Type": mime[extension] ?? "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Datei nicht gefunden.");
  }
});
server.on("error", (error) => {
  console.error(`Lokaler Start fehlgeschlagen: ${error.message}`);
  process.exitCode = 1;
});
server.listen(5173, "127.0.0.1", () =>
  console.log("Sammelraum läuft lokal: http://127.0.0.1:5173"),
);
