<div align="center">
<h1>Nightwave</h1>
<img src="https://deploy-badge.vercel.app/vercel/nightwave" alt="Vercel Deploy"></img>
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Thive-N/Nightwave">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Thive-N/Nightwave?style=flat">
</div>

<div align="center">
<img alt="GitHub License" src="https://img.shields.io/github/license/Thive-N/nightwave">
</div>

## 🚪 Intro

You can access the latest version of Nightwave app at [nightwave.vercel.app](https://nightwave.vercel.app).

## 🖥️ Running Locally

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Thive-N/Nightwave.git
   cd Nightwave
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI=""          # URI for connecting to the MongoDB database
   AUTH_SECRET=""          # Secret key for authentication
   AUTH_GOOGLE_ID=""       # Google OAuth client ID
   AUTH_GOOGLE_SECRET=""   # Google OAuth client secret
   AUTH_GITHUB_ID=""       # GitHub OAuth client ID
   AUTH_GITHUB_SECRET=""   # GitHub OAuth client secret
   UPLOADTHING_SECRET=""   # Secret key for the UploadThing service
   UPLOADTHING_APP_ID=""   # Application ID for the UploadThing service
   RESEND_API_KEY=""       # API key for the Resend service
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## ✏️ Contributing

WIP

## 📑 License

Licensed under [AGPL-3.0](https://github.com/dailydotdev/daily/blob/master/LICENSE).
