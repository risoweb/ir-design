# IR Design Portfolio 🎨

> Um portfólio moderno combinando design, código e experiências 3D interativas.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[Live Demo](https://ir-design.vercel.app/) | [Sobre Mim](#sobre) | [Projetos](#projetos) | [Contato](#contato)

---

## ✨ Sobre

Este portfólio demonstra minha jornada como desenvolvedor(a), combinando:
- **Design visual** moderno e intuitivo
- **Código limpo** e estruturado
- **Experiências 3D interativas** com WebGL

Construído com tecnologias modernas para oferecer uma experiência imersiva aos visitantes.

---

## 🛠️ Tech Stack

| Frontend | 3D/Visual | Build/Tools |
|----------|-----------|-------------|
| React 18 | React Three Fiber | Vite |
| TypeScript | Drei | ESLint |
| CSS/Tailwind | Three.js | Git |

### Dependências Principais

```json
{
  "react": "^18.x",
  "typescript": "^5.x",
  "@react-three/fiber": "^8.x",
  "@react-three/drei": "^9.x",
  "three": "^0.15.x"
}
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
