import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
	background: '#F4F7FB',
	text: '#333',
	buttonBackground: '#007BFF',
	buttonText: '#fff',
	buttonHoverBackground: '#0056b3',
	navButtonBackground: '#f8f9fa',
	navButtonText: '#333',
	navButtonHoverBackground: '#e2e6ea',
	navButtonHoverText: '#007BFF',
	navButtonActiveBackground: '#007BFF',
	navButtonActiveText: '#fff',
	tabBackground: '#fff',
}

export const darkTheme = {
	background: '#212529',
	text: '#f8f9fa',
	buttonBackground: '#28a745',
	buttonText: '#fff',
	buttonHoverBackground: '#218838',
	navButtonBackground: '#343a40',
	navButtonText: '#f8f9fa',
	navButtonHoverBackground: '#495057',
	navButtonHoverText: '#28a745',
	navButtonActiveBackground: '#28a745',
	navButtonActiveText: '#fff',
	tabBackground: '#343a40',
}

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  h1 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.text};
    margin: 20px 0;
  }
`
