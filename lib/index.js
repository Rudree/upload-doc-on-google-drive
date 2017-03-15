import Promise from "bluebird";
import jsonfile from "jsonfile";
import parsePath from "parse-filepath";
import chalk from "chalk";
import yargs from "yargs";
import fs from "fs";
import pkg from "../package.json";
import GoogleDriveApi from "./google-drive-api";

let googleDriveApi = new GoogleDriveApi(process.env.GOOGLE_CLIENT_SECRET_PATH, process.env.GOOGLE_CREDENTIALS_PATH);

const { argv } =
  yargs
  .usage(`Usage: ${chalk.cyan(pkg.name, chalk.underline("FOLDER URL"), chalk.underline("FILE PATH"))}`)
  .option("h", { alias: "help", describe: "Show help", type: "boolean" })
  .option("v", { alias: "version", describe: "Show version", type: "boolean" });

if (argv.help || argv.h) {
  yargs.showHelp();
  process.exit();
}

if (argv.version || argv.v) {
  console.log(pkg.version);
  process.exit();
}

if (argv._.length !== 2) {
  yargs.showHelp();
  console.error(chalk.red("Folder URL, and File path must be specified."));
  process.exit(1);
}

const [ folderUrl, filePath ] = argv._;

Promise.resolve()
.then(::googleDriveApi.init)
.then(() => {
  Promise.all([
    getParentId(),
    getFileData(),
    getFileName()
  ])
  .spread((parentId, fileData, fileName) => (
    googleDriveApi.uploadFile(parentId, JSON.stringify(fileData), fileName)
    .then(file => {
      if(file) {
        console.log(chalk.green(JSON.stringify(file, null, 2)));
        process.exit(0);
      }
    })
  ))
}).catch(error => {
  console.error(chalk.red(error));
  process.exit(1);
});

function getParentId() {
  return Promise.resolve(folderUrl.split("folders/").pop());
}

function getFileData() {
  return jsonfile.readFileSync(filePath);
}

function getFileName() {
  return Promise.resolve(parsePath(filePath)).get("base");
}
