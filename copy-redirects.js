const fs = require("fs-extra");
const path = require("path");

// Copie le fichier _redirects dans le dossier build/
fs.copy(
  path.join(__dirname, "_redirects"),
  path.join(__dirname, "build", "_redirects")
)
  .then(() => console.log("_redirects has been copied to build/"))
  .catch((err) => console.error("Error copying _redirects:", err));
