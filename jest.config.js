/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	"testEnvironment"	: "jsdom",
	"verbose"			: true,
	"setupFilesAfterEnv": ['jest-extended/all', require.resolve('regenerator-runtime/runtime')],
	"moduleNameMapper": {
		"^.+\\.(css|less|scss)$": "babel-jest",
		"react-i18next": "<rootDir>/testing/mocks/reacti18nextMock.ts"
	},
	"testURL" 		: "http://localhost/"
};