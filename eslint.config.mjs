export default [
	{
	  files: ['*.ts', '*.tsx'], // Określenie, że konfiguracja dotyczy plików TypeScript
	  parser: '@typescript-eslint/parser', // Określenie parsera dla TypeScript
	  parserOptions: {
		ecmaVersion: 2020, // Wersja ECMAScript
		sourceType: 'module', // Typ źródła jako moduł ES
	  },
	  globals: {
		browser: true, // Definiowanie zmiennych globalnych, np. browser
		es2020: true,   // Definiowanie ECMAScript 2020
	  },
	  extends: [
		'eslint:recommended', // Zestaw reguł podstawowych ESLint
		'plugin:@typescript-eslint/recommended', // Zestaw reguł dla TypeScript
		'plugin:react-hooks/recommended', // Zestaw reguł dla React Hooks
	  ],
	  plugins: ['react-refresh', 'import'], // Dodatkowe pluginy
	  rules: {
		'react-refresh/only-export-components': [
		  'warn', 
		  { allowConstantExport: true }, // Ostrzeżenie przy eksportach komponentów
		],
		'import/no-default-export': ['error'], // Zabrania używania default export
		'no-var': 'error', // Zabrania używania `var` i wymusza `let` lub `const`
	  },
	},
  ];
  