# Animated Login Page

An interactive login form featuring animated characters that react to user interactions. Built with Vue 3, Vite, and modern web technologies.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)

## Features

### User Interface
- **Animated Characters** - Three unique characters with distinct personalities that react to user input
- **Eye Tracking** - Characters follow mouse cursor and watch input fields
- **Password Visibility Toggle** - Characters look away when password is revealed
- **Success/Error Animations** - Visual feedback with character animations
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design with smooth transitions

### Form Validation
- **Real-time Validation** - Instant feedback as users type
- **Email Validation** - Proper email format checking with visual indicators
- **Password Strength Indicator** - 5-level strength meter with color-coded feedback
- **Field-level Error Messages** - Clear, actionable error messages
- **Visual Validation States** - Green checkmarks for valid inputs, red indicators for errors

### Security Features
- **Client-side Rate Limiting** - Protection against brute force attempts (5 attempts, 1-minute cooldown)
- **Password Security** - Minimum 8 characters with strength validation
- **Input Sanitization** - XSS prevention utilities
- **Secure Password Handling** - Password cleared from memory after submission
- **CSRF Token Support** - Ready for backend CSRF protection implementation

### Accessibility
- **ARIA Attributes** - Proper aria-invalid, aria-describedby, and role attributes
- **Screen Reader Support** - All interactive elements properly labeled
- **Keyboard Navigation** - Full keyboard accessibility with visible focus indicators
- **Semantic HTML** - Proper form structure and labeling
- **Error Announcements** - Screen readers announce validation errors

### Developer Experience
- **CSS Custom Properties** - Maintainable theming with CSS variables
- **Component Architecture** - Modular Vue 3 Composition API
- **Type Safety Ready** - Structured for TypeScript migration
- **Clean Code** - Well-organized and documented codebase

## Demo

Live demo: [https://dotnettitan.github.io/Login/](https://dotnettitan.github.io/Login/)

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/DotNetTitan/Login.git

# Navigate to project directory
cd Login

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action.

## Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The production-ready files will be in the `dist` folder.

## Character Personalities

The login page features three unique characters:

1. **Orange (Worried)** - A concerned oval character with rosy cheeks
2. **Black (Cool)** - A calm, collected character with a neutral expression
3. **Yellow (Happy)** - A cheerful, friendly circular character

Each character features:
- Unique eye sizes and expressions
- Dynamic eyebrow angles and movements
- Distinct mouth shapes and reactions
- Individual blinking patterns

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend tooling
- **CSS3** - Modern styling with gradients, shadows, and animations
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
Login/
├── src/
│   ├── components/
│   │   ├── Characters.vue    # Animated characters component
│   │   └── LoginForm.vue     # Login form with validation
│   ├── utils/
│   │   └── validation.js     # Validation and sanitization utilities
│   ├── App.vue               # Main application component
│   └── main.js               # Application entry point
├── public/                   # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment workflow
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
└── package.json              # Project dependencies and scripts
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security Considerations

When implementing authentication in production:

- Never commit sensitive credentials or `.env` files to version control
- Implement proper backend authentication with secure session management
- Use HTTPS in production environments
- Implement server-side rate limiting for login attempts
- Add CSRF protection tokens
- Validate and sanitize all inputs on both client and server
- Use secure password hashing algorithms (bcrypt, argon2)
- Implement proper error handling without exposing sensitive information
- Add logging and monitoring for security events
- Consider implementing two-factor authentication (2FA)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle size: < 100KB (gzipped)

## Acknowledgments

- Inspired by modern UI/UX design patterns
- Built with Vue.js ecosystem
- Character animations using pure CSS

## Contact

Project Link: [https://github.com/DotNetTitan/Login](https://github.com/DotNetTitan/Login)

## Author

[DotNetTitan](https://github.com/DotNetTitan)
