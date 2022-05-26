/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	"testEnvironment"	: "jsdom",
	"verbose"			: true,
	"setupFilesAfterEnv": ['jest-extended/all', require.resolve('regenerator-runtime/runtime')],
	"moduleNameMapper": {
		"^.+\\.(css|less|scss)$": "babel-jest"
	},
	"testURL" 		: "http://localhost/"
};