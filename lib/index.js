import Promise from "bluebird";
import GoogleDriveApi from "./google-drive-api";

let googleDriveApi = new GoogleDriveApi(process.env.GOOGLE_CLIENT_SECRET_PATH, process.env.GOOGLE_CREDENTIALS_PATH);

Promise.resolve()
.then(::googleDriveApi.init)
.then(() => {
  googleDriveApi.uploadFile()
  .then(file => console.log(file));
});
