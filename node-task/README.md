## Project Setup Instructions

### Firebase Configuration

1. **Firebase Project Setup:**
   - Ensure you have created a project on Firebase.
   - Create a Firestore database and storage.
   - Set the rules for both Firestore and storage to allow read and write access.

2. **Service Account Setup:**
   - Navigate to **Project Settings** -> **Service Accounts**.
   - Generate a new private key.
   - Download the generated JSON file.
   - Rename the downloaded file to `key.json` and place it in the root folder of your Node.js project.

### Shareaholic Configuration

1. **Shareaholic API Setup:**
   - Visit [Shareaholic API Shortener](https://www.shareaholic.com/api/shortener).
   - Create a new account and site.
   - Access your new site's settings and copy the site ID.

2. **Environment Variable Setup:**
   - Open the `.env` file in your project.
   - Set the `SHAREAHOLIC_APIKEY` variable to the copied site ID.
