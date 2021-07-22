const fs = require("fs")

const fileName = "manifest.json"

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist")
}

fs.createReadStream(`src/${fileName}`).pipe(
  fs.createWriteStream(`dist/${fileName}`)
)
