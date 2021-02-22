process.env.NODE_ENV = 'test';

module.exports = {
  clearMock: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/serviceWorker.ts',
    '!src/reportWebVitals.ts',
  ],
  coveragePathIgnorePatterns: [
    './src/*/*.types.{ts,tsx}',
    './src/index.tsx',
    './src/serviceWorker.ts',
    './src/services',
  ],
  coverageReporters: ['html', 'json'],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      lines: 75,
      functions: 75,
    },
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
