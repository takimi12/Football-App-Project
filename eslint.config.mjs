// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//     settings: {
//       react: {
//         version: "18.0",
//       },
//     },
//   },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

// czym to nizej rozni sie od tego wyzej

// module.exports = {
//   root:true,
//   env: {browser: true, es2020:true},
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist','.eslintrc.cjs'],
//   parser:'@typescript-eslint/parser',
//   plugins: ['react-refresh', 'import'],
//   rules: {
//     'react-refresh/only-export-components' : [
//       'warn',
//       {allowConstantExport:true},
//     ],
//     'import/no-default-export': ['error']
//   },
// }
export default [
	{
		files: ['*.ts', '*.tsx'], // Określenie, że konfiguracja dotyczy plików TypeScript
		parser: '@typescript-eslint/parser', // Określenie parsera
		parserOptions: {
			ecmaVersion: 2020, // Wersja ECMAScript
			sourceType: 'module', // Typ źródła jako moduł ES
		},
		globals: {
			browser: true, // Definiowanie zmiennych globalnych
			es2020: true,
		},
		extends: [
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:react-hooks/recommended',
		],
		plugins: ['react-refresh', 'import'],
		rules: {
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'import/no-default-export': ['error'],
		},
	},
]
