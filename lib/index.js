import GoogleDriveApi from "./google-drive-api";

let googleDriveApi = new GoogleDriveApi(process.env.GOOGLE_CLIENT_SECRET_PATH, process.env.GOOGLE_CREDENTIALS_PATH);

googleDriveApi.init()
.then(() => {
  googleDriveApi.uploadFile()
  .then(file => console.log(file));
});
