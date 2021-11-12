const DEFAULT_HTML = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>🚆 for web</title>
    <style>
      #root {
        display: flex;
        flex: 1 1 100%;
        height: 100vh;
      }
    </style>
    <script type="text/javascript" src="__BUNDLE_URL__" defer></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.process = __ENV__;
    </script>
  </body>
</html>
`;

export const indexHtml = ({
  html = DEFAULT_HTML,
  entryFile,
  env,
}: {
  html?: string;
  entryFile: string;
  env: Record<string, string>;
}) => {
  return html
    .replace(
      "__BUNDLE_URL__",
      `${entryFile}.bundle?platform=web&dev=true&minify=false`
    )
    .replace("__ENV__", JSON.stringify(env));
};
