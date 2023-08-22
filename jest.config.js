module.exports = {
    roots: [
        '<rootDir>/src',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    moduleNameMapper: {
        '^helpers/(.*)$': '<rootDir>/src/helpers/$1',
        '^types/(.*)$': '<rootDir>/src/@types/$1',
    },
};
