/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // On indique explicitement où chercher les fichiers de tests
  roots: ['<rootDir>/src'],
  // On force la transformation des fichiers TS
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // On s'assure que Jest reconnaît les extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};