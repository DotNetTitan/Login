# 🎭 Animated Login Page

An interactive and delightful login form featuring animated characters that react to user interactions. Built with Vue 3, Vite, and pure CSS animations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)

## ✨ Features

- 🎨 **Animated Characters** - Three unique characters with distinct personalities that react to user input
- 👀 **Eye Tracking** - Characters follow your mouse cursor and watch the input fields
- 😳 **Password Reactions** - Characters look away when password is revealed
- 🎉 **Success/Error Animations** - Celebratory jumps on success, shake on error
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ♿ **Accessibility Compliant** - ARIA labels, keyboard navigation, and screen reader support
- 🚀 **Optimized Performance** - Fast loading with code splitting and minification
- 🎭 **Pure CSS Animations** - No heavy animation libraries needed

## 🎬 Demo

Check out the live demo: [https://dotnettitan.github.io/Login/](https://dotnettitan.github.io/Login/)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

## 📦 Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The production-ready files will be in the `dist` folder.

## 🎨 Character Personalities

The login page features three adorable characters:

1. **Orange (Worried)** 🟠 - A concerned oval character with rosy cheeks
2. **Black (Cool)** ⚫ - A calm, collected character with a neutral expression
3. **Yellow (Happy)** 🟡 - A cheerful, friendly circular character

Each character has unique:
- Eye sizes and expressions
- Eyebrow angles and movements
- Mouth shapes and reactions
- Blinking patterns

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend tooling
- **CSS3** - Modern styling with gradients, shadows, and animations
- **JavaScript ES6+** - Modern JavaScript features

## 📁 Project Structure

```
Login/
├── src/
│   ├── components/
│   │   ├── Characters.vue    # Animated characters component
│   │   └── LoginForm.vue     # Login form component
│   ├── App.vue               # Main app component
│   └── main.js               # App entry point
├── public/                   # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security considerations when implementing authentication:

- Never commit `.env` files or sensitive credentials
- Implement proper backend authentication
- Use HTTPS in production
- Add rate limiting for login attempts
- Implement CSRF protection
- Validate and sanitize all inputs
- Use secure password hashing (bcrypt, argon2)

## 🌟 Acknowledgments

- Inspired by creative login page designs
- Built with love using Vue.js ecosystem
- Character animations inspired by modern UI/UX trends

## 📧 Contact

Project Link: [https://github.com/DotNetTitan/Login](https://github.com/DotNetTitan/Login)

---

Made with ❤️ by [DotNetTitan](https://github.com/DotNetTitan)
