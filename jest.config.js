module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  roots: ['tests'],
  testRegex: '(\\.|/)(test|spec)\\.(js|ts?)$',
  moduleFileExtensions: ['ts', 'js'],
}
