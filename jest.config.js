const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  collectCoverageFrom: ['src/**/*.[jt]s?(x)'],
  coverageDirectory: 'coverage-jest',
  coverageProvider: 'v8',
  modulePaths: ['<rootDir>', '<rootDir>/public', '<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [],
  // transform: { '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }] },
  verbose: true,
}

module.exports = createJestConfig(customJestConfig)
