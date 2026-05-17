<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8444487c-c0bc-4a84-9dd9-97d8aae40a92

## Deploy via GitHub Pages

1. Go to **Settings → Pages** in your GitHub repository.
2. Under **Source**, select **GitHub Actions**.
3. Go to **Settings → Secrets and variables → Actions** and add a secret named `GEMINI_API_KEY` with your Gemini API key.
4. Push to the `main` branch (or manually trigger the workflow under **Actions**).
5. Your app will be live at `https://<your-username>.github.io/mealvore/`.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
