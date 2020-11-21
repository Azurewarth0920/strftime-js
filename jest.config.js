const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['src']
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}
