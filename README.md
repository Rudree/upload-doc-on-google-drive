# upload-doc
Upload document in Google Drive folder using Folder URL and a path to the local file.


## Installation
```bash
$ npm install -g upload-doc
```


## Setup
[Get Google Drive credential](https://github.com/dstil/google-drive-data-provider#obtaining-google-developer-project--oauth-credentials)

Ensure you've added environment variables in ``` ~/.zshrc ``` to point to the credential files and run ``` source ~/.zshrc ```


```bash
export GOOGLE_CLIENT_SECRET_PATH={path_to_client_secret_file}
export GOOGLE_CREDENTIALS_PATH={path_to_credentials_file}
```


## Usage
```bash
$ npm upload-doc FOLDER_URL FILE_PATH
```
