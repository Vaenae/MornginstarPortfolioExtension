const fs = require("fs")

const fileName = "manifest.json"

fs.createReadStream(`src/${fileName}`).pipe(
  fs.createWriteStream(`dist/${fileName}`)
)
