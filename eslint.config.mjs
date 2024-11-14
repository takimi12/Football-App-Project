export default [
	{
	  files: ['*.ts', '*.tsx'], // Dotyczy plików TypeScript
	  parser: '@typescript-eslint/parser', // Parser dla TypeScript
	  parserOptions: {
		ecmaVersion: 2020, // ECMAScript 2020
		sourceType: 'module', // Używamy modułów ES
	  },
	  extends: [
		'eslint:recommended', // Podstawowe reguły ESLint
		'plugin:@typescript-eslint/recommended', // Reguły dla TypeScript
		'plugin:react-hooks/recommended', // Reguły dla React Hooks
	  ],
	  plugins: ['react-refresh', 'import'], // Dodatkowe pluginy
	  globals: {
		// Jeśli używasz zmiennych globalnych, zadeklaruj je tutaj
		browser: true, // Globalne zmienne dla przeglądarki
	  },
	  rules: {
		// Przykładowe reguły
		'react-refresh/only-export-components': [
		  'warn', 
		  { allowConstantExport: true }, // Ostrzeżenie, ale pozwala na eksport stałych
		],
		'import/no-default-export': ['error'], // Zabrania używania default export
		'no-var': 'error', // Zabrania używania var i wymusza użycie let/const
		'no-console': ['warn', { allow: ['warn', 'error'] }], // Ostrzeżenie o używaniu console.log, pozwala na warn i error
		'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warnuje o nieużywanych zmiennych, ignoruje zmienne zaczynające się od "_"
		'semi': ['error', 'always'], // Wymusza użycie średników
		'quotes': ['error', 'single'], // Wymusza używanie pojedynczych cudzysłowów
		'indent': ['error', 2], // Wymusza wcięcia na 2 spacje
	  },
	},
  ];
  