import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const assetsDir = join(process.cwd(), ".output/public/assets");
const files = readdirSync(assetsDir);

const jsFiles = files.filter((f) => f.endsWith(".js")).sort();
const cssFile = files.find((f) => f.endsWith(".css"));

const scriptTags = jsFiles
  .map((f) => `  <script type="module" src="/assets/${f}"></script>`)
  .join("\n");

const cssTag = cssFile
  ? `  <link rel="stylesheet" href="/assets/${cssFile}" />`
  : "";

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Happy Birthday ❤</title>
    <meta name="description" content="A little surprise made just for you, with all my heart." />
    <meta property="og:title" content="Happy Birthday ❤" />
    <meta property="og:description" content="A little surprise made just for you, with all my heart." />
${cssTag}
  </head>
  <body>
    <div id="root"></div>
${scriptTags}
  </body>
</html>
`;

writeFileSync(join(process.cwd(), ".output/public/index.html"), html);
console.log("✅ Generated index.html with assets:", jsFiles, cssFile);
