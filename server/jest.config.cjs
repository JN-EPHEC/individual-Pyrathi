/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // S'assure que Jest cherche bien les fichiers .ts
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};