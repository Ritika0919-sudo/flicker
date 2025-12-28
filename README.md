# Flickr Gallery App 📸

A beautiful React Native/Expo app that displays recent images from Flickr with offline support and intelligent image caching.

## ✨ Features

- **Flickr Integration** - Displays 20 most recent photos from Flickr API in a 2-column grid
- **Smart Caching** - Caches image URLs locally using AsyncStorage  
- **Offline Support** - Shows cached images when offline with visual indicator
- **Intelligent Updates** - Only updates cache when API response changes (Instagram-style behavior)
- **Pull-to-Refresh** - Manually refresh to get latest images
- **Dark/Light Theme** - Automatic theme detection
- **Drawer Navigation** - Clean left sidebar with Home option
- **Error Handling** - Graceful fallbacks and error messages

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

Then:
- Press `w` for web browser
- Press `a` for Android emulator  
- Press `i` for iOS simulator
- Scan QR code with Expo Go app for mobile

### Direct Commands

```bash
npm run web      # Web browser
npm run android  # Android emulator
npm run ios      # iOS simulator
```

## 📁 Project Structure

```
app/
├── _layout.tsx        # Drawer navigation setup
├── index.tsx          # Home screen route
└── modal.tsx          # Modal screen

components/
├── home-screen.tsx    # Main gallery component with image grid
└── ui/               # Reusable UI components

services/
└── flickrService.ts   # Flickr API & caching logic

constants/
└── theme.ts          # Color themes

hooks/
├── use-color-scheme.ts      # Theme detection
├── use-color-scheme.web.ts  # Web theme detection
└── use-theme-color.ts       # Theme color hook
```

## 🔧 Tech Stack

- **Expo 54** - React Native framework
- **Expo Router** - File-based routing
- **AsyncStorage** - Local caching
- **NetInfo** - Network detection
- **Expo Image** - Image with caching
- **React 19** - UI library
- **TypeScript** - Type safety

## 📱 Features in Detail

### Image Caching System
- First load: Fetches from Flickr API → stores in AsyncStorage
- Subsequent loads: Uses cache → updates if API changes
- Offline: Automatically shows cached data
- Smart: Only re-renders if content actually changed

### Offline Detection
- Automatically detects internet status
- Falls back to cache when offline
- Shows "Showing Cached Images" indicator
- Seamless switching between online/offline modes

### Network Handling  
- 10-second timeout for API requests
- Automatic fallback to cache on timeout
- Error messages for user feedback
- Prevents app hanging on slow connections

## 🎨 Customization

### Change Flickr API Key
Edit `services/flickrService.ts`:
```typescript
const FLICKR_API_URL = 'your-api-url';
```

### Grid Layout
Edit `components/home-screen.tsx`:
```typescript
numColumns={2}  // Change grid columns
```

### Theme Colors
Edit `constants/theme.ts` for custom colors

## 📦 Dependencies

- `@react-native-async-storage/async-storage` - Data caching
- `@react-native-community/netinfo` - Network status
- `expo-router` - Navigation
- `expo-image` - Image loading with caching
- `react-native-gesture-handler` - Gestures
- `expo-vector-icons` - Icons

## 🌐 Platform Support

- ✅ Web (Chrome, Firefox, Safari, Edge)
- ✅ Android 5.0+
- ✅ iOS 13+
- ✅ Expo Go

## 📝 API Reference

**Flickr API Used:**
```
GET https://api.flickr.com/services/rest/?method=flickr.photos.getRecent
```

Parameters:
- `per_page=20` - 20 photos per request
- `api_key` - Your Flickr API key
- `extras=url_s` - Small URL for images

## 🛠️ Scripts

```bash
npm start         # Development server
npm run web       # Web version
npm run android   # Android emulator
npm run ios       # iOS simulator  
npm run lint      # Code linting
```

## 💡 How It Works

1. **On Launch:** 
   - Checks internet connection
   - Loads from cache if available
   - Fetches fresh data from API if online

2. **Caching:**
   - Compares API response with cached version
   - Only updates if data changed
   - Prevents unnecessary re-renders

3. **Offline:**
   - Detects connection loss
   - Shows cached images automatically
   - Displays offline indicator

4. **Refresh:**
   - Pull-to-refresh gets latest data
   - Updates cache if response changed

## 🐛 Troubleshooting

**Images not loading?**
- Check internet connection
- Verify Flickr API key is valid
- Clear app cache: `AsyncStorage.clear()`

**App crashes on startup?**
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear Expo cache: `expo start --clear`

**Offline mode not working?**
- Ensure NetInfo is properly installed
- Check that internet toggle is working
- Restart app in offline mode

## 📄 License

MIT

## 👤 Author

Built for hiring submission - Demonstrates:
- React Native expertise
- State management with Hooks
- Offline-first design patterns
- API integration
- Performance optimization
- Clean code architecture

---

**Ready to use!** Just run `npm install && npm start` 🎉

