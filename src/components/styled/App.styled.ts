// App.styled.ts
import styled from 'styled-components'

export const AppContainer = styled.div`
	font-family: 'Poppins', sans-serif;
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	transition: all 0.3s ease;
`

export const Header = styled.header`
	text-align: center;
	margin-bottom: 30px;
`

export const ToggleButton = styled.button`
	background: ${({ theme }) => theme.buttonBackground};
	color: ${({ theme }) => theme.buttonText};
	font-size: 16px;
	padding: 12px 20px;
	margin: 10px 0;
	border-radius: 30px;
	border: none;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition:
		background 0.3s ease,
		transform 0.2s ease;

	&:hover {
		background: ${({ theme }) => theme.buttonHoverBackground};
		transform: scale(1.05);
	}

	&:focus {
		outline: none;
	}
`

export const Nav = styled.nav`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-bottom: 40px;
`

export const NavButton = styled.button`
	background: ${({ theme }) => theme.navButtonBackground};
	color: ${({ theme }) => theme.navButtonText};
	font-size: 18px;
	padding: 10px 25px;
	border-radius: 50px;
	border: 2px solid transparent;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background: ${({ theme }) => theme.navButtonHoverBackground};
		color: ${({ theme }) => theme.navButtonHoverText};
		border-color: ${({ theme }) => theme.navButtonHoverBackground};
	}

	&.active {
		background: ${({ theme }) => theme.navButtonActiveBackground};
		color: ${({ theme }) => theme.navButtonActiveText};
	}
`

export const TabContent = styled.div`
	width: 100%;
	max-width: 1200px;
	padding: 30px;
	background: ${({ theme }) => theme.tabBackground};
	border-radius: 12px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	margin-top: 30px;
	transition: all 0.3s ease;
`
