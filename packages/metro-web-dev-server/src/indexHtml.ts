const jsScripts = () => {
  return ["/src/index.bundle?platform=web&dev=true&minify=false"]
    .map(
      (bundle) =>
        `<script type="text/javascript" src="${bundle}" defer></script>`
    )
    .join("");
};

export const indexHtml = (env: Record<string, string>) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>🚆 for web</title>
        ${jsScripts()}
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.process = ${JSON.stringify({ env })};
        </script>
      </body>
    </html>
  `;
};
