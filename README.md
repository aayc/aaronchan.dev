# Aaron Chan Personal Blog
# Get Started

```
npm install
npm run dev
```

# Getting fonts

1. Download the fonts in any filetype (e.g. otf)
2. Use FontSquirrel web font generator to create web fonts and associated css file
3. Move @font-face calls to your own css file and modify paths if necessary

# Analytics

This site uses Mixpanel for analytics tracking. To enable:

1. Create a Mixpanel account and project at https://mixpanel.com
2. Add your tokens to the `.env.local` file:
   ```
   NEXT_PUBLIC_MIXPANEL_TOKEN=your_browser_token_here
   ```
3. Analytics are automatically implemented for:
   - Page views
   - Contact form submissions
   - Blog post clicks
   - Project clicks