# 📤 GitHub Upload Instructions

Your Flickr Gallery app is ready to upload to GitHub! Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Fill in the repository details:
   - **Repository name:** `flickr-gallery`
   - **Description:** `A React Native/Expo app displaying Flickr images with offline support and smart caching`
   - **Visibility:** Select Public (for portfolio) or Private
   - **Don't** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the GitHub repo, you'll see commands. Run these in your terminal:

```bash
cd c:\Users\Ritika\flickr-gallery

# Add GitHub remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/flickr-gallery.git

# Rename branch to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify Upload

1. Go to your GitHub repository URL: `https://github.com/YOUR_USERNAME/flickr-gallery`
2. You should see:
   - ✅ All files uploaded
   - ✅ README.md displayed
   - ✅ Commit history showing 2 commits
   - ✅ Code properly formatted

## Complete Commands (Copy & Paste)

```bash
cd c:\Users\Ritika\flickr-gallery
git remote add origin https://github.com/YOUR_USERNAME/flickr-gallery.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Current Git Status

```
Repository: flickr-gallery
Branch: master
Commits: 2
  - fd56fe5: Update README with project documentation
  - c2ef9db: Initial commit: Flickr gallery app with caching and offline support
```

## Files Included

✅ `app/` - Navigation and routing
✅ `components/` - UI components including home-screen with image gallery
✅ `services/` - Flickr API integration and caching logic
✅ `constants/` - Theme configuration
✅ `hooks/` - Custom React hooks
✅ `package.json` - Dependencies and scripts
✅ `.gitignore` - Ignored files
✅ `README.md` - Complete project documentation
✅ `tsconfig.json` - TypeScript configuration
✅ `eslint.config.js` - Linting rules

## What NOT to Upload

These are already in `.gitignore` and won't be uploaded:
- `node_modules/` - Too large
- `.expo/` - Build artifacts
- `.env` - Environment variables
- `dist/` - Build outputs

## Optional: Add GitHub Topics

After upload, add topics to your repository for better discoverability:
- `react-native`
- `expo`
- `flickr`
- `offline-first`
- `caching`
- `asyncstorage`

## Optional: Create .github/README.md

You can create additional documentation in `.github/` folder for badges, screenshots, etc.

## Troubleshooting

**"fatal: remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/flickr-gallery.git
git push -u origin main
```

**"Permission denied (publickey)"**
- Generate SSH key and add to GitHub
- Or use HTTPS with personal access token instead

**"branch 'master' set up to track 'origin/main'"**
- This is fine, just means local branch is master, remote is main

## Next Steps After Upload

1. ✅ Copy repository link
2. ✅ Add to your portfolio
3. ✅ Submit to your hiring manager
4. ✅ Create a 1-minute demo video (as requested)
5. ✅ Share the GitHub link

## Demo Video Tips

When recording your 1-minute demo video:
- Show the app loading from Flickr API
- Demonstrate pulling to refresh
- Toggle airplane mode to show offline functionality
- Show the cached images being displayed
- Highlight the drawer navigation
- Show dark/light mode switching (if implemented)

## Repository URL

Once uploaded, your repo will be at:
```
https://github.com/YOUR_USERNAME/flickr-gallery
```

---

**Questions?** See GitHub's official guide: https://docs.github.com/en/get-started/importing-your-projects-to-github
