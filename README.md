<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8444487c-c0bc-4a84-9dd9-97d8aae40a92

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy with GitHub Pages

1. Push this repo to GitHub.
2. In GitHub, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Push to the `main` branch.
4. The workflow at `/home/runner/work/mealvore/mealvore/.github/workflows/deploy.yml` will build and deploy automatically.

Because this app is deployed as static files on GitHub Pages, do not expose private API keys in frontend code.
If you add Gemini-powered features, call Gemini from a backend/API proxy and keep the key server-side only.
