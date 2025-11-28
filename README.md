# RunnerAngular

A research project for test generation using Angular 21.0.0 with Jest testing framework.

## Prerequisites

- Node.js (npm 10.9.2 or higher)
- Angular CLI 21.0.0

## Installation

```bash
npm install
```

## Development

### Start development server
```bash
npm start
# or
ng serve
```
Navigate to `http://localhost:4200/`

### Build for production
```bash
npm run build
```

### Watch mode (development build)
```bash
npm run watch
```

## Testing

This project uses Jest with Angular Testing Library for unit testing.

### Run tests
```bash
npm test
```

### Testing setup includes:
- Jest 30.2.0
- Angular Testing Library 18.1.1
- Jest DOM matchers
- User event testing utilities

## Project Structure

```
src/
├── app/
│   ├── 00_ComponentName/    # Component directory
│   ├── app.config.ts        # App configuration
│   ├── app.html            # Main template
│   ├── app.scss            # Global styles
│   ├── app.spec.ts         # App tests
│   └── app.ts              # Main component
├── index.html              # Entry HTML
├── main.ts                 # Bootstrap file
└── styles.scss             # Global styles
```

## Code Quality

- Prettier configured for consistent formatting
- TypeScript strict mode enabled
- Jest for comprehensive testing
