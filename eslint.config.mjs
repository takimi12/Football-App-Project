export default [
	{
		files: ['*.ts', '*.tsx'], // Dotyczy plików TypeScript
		parser: '@typescript-eslint/parser', // Parser dla TypeScript
		parserOptions: {
			ecmaVersion: 2020, // ECMAScript 2020
			sourceType: 'module', // Używamy modułów ES
		},
		env: {
			browser: true, // Definiuje zmienne globalne dla przeglądarki
			es2020: true, // Definiuje ECMAScript 2020
		},
		extends: [
			'eslint:recommended', // Podstawowe reguły ESLint
			'plugin:@typescript-eslint/recommended', // Reguły dla TypeScript
			'plugin:react-hooks/recommended', // Reguły dla React Hooks
		],
		plugins: ['react-refresh', 'import'], // Dodatkowe pluginy
		rules: {
			// Przykładowe reguły
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true }, // Ostrzeżenie, ale pozwala na eksport stałych
			],
			'import/no-default-export': ['error'], // Zabrania używania default export
			'no-var': 'error', // Zabrania używania var i wymusza użycie let/const
			'no-console': ['warn', { allow: ['warn', 'error'] }], // Ostrzeżenie o używaniu console.log, pozwala na warn i error
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			], // Użyj wersji dla TypeScript
			semi: ['error', 'always'], // Wymusza użycie średników
			quotes: ['error', 'single'], // Wymusza używanie pojedynczych cudzysłowów
			indent: ['error', 2], // Wymusza wcięcia na 2 spacje
		},
	},
]
