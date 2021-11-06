export interface Bundle {
  name: string;
  url: string;
  priority: number;
}

export interface Manifest {
  bundles: Bundle[];
}

const jsScripts = (assetManifest: Manifest) => {
  return assetManifest.bundles
    .map(
      (bundle) =>
        `<script type="text/javascript" src="${bundle.url}" defer></script>`
    )
    .join("");
};

export const indexHtml = (
  env: Record<string, string>,
  assetManifest: Manifest
) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>🚆 for web</title>
        ${jsScripts(assetManifest)}
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.process = ${JSON.stringify({ env })};
          window.__ASSET_MANIFEST__ = ${JSON.stringify(assetManifest)}
        </script>
      </body>
    </html>
  `;
};
