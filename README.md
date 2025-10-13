# Vue Login App

An interactive login form with animated characters built with Vue 3 and Vite.

## Features

- 🎨 Animated character reactions
- 👁️ Password visibility toggle
- 📱 Responsive design
- ♿ Accessibility compliant
- 🚀 Production optimized

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
VITE_API_URL=your_api_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Production Deployment

1. Build the app: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables on your hosting platform

## Security Notes

- Never commit `.env` files
- Implement proper authentication on the backend
- Use HTTPS in production
- Implement rate limiting for login attempts
- Add CSRF protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
