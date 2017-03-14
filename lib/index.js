import Promise from "bluebird";
import GoogleDriveApi from "./google-drive-api";

let googleDriveApi = new GoogleDriveApi(process.env.GOOGLE_CLIENT_SECRET_PATH, process.env.GOOGLE_CREDENTIALS_PATH);
let folderUrl = "https://drive.google.com/drive/folders/0B9N3Uvp7bUeMZkdraHNTTVVqOGc";

Promise.resolve()
.then(::googleDriveApi.init)
.then(() => {
  googleDriveApi.uploadFile(getParentId())
  .then(file => console.log(file));
});

function getParentId() {
  return folderUrl.split("folders/").pop();
}
