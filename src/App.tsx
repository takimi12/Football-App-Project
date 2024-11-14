import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalStyles, lightTheme, darkTheme } from './themes/themes'
import { Players } from './components/Players'
import { Teams } from './components/Teams'
import { Games } from './components/Games'
import { Statistics } from './components/Stats'
import styled from 'styled-components'

const queryClient = new QueryClient()

var a = 1

const AppContainer = styled.div`
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

const Header = styled.header`
	text-align: center;
	margin-bottom: 30px;
`

const ToggleButton = styled.button`
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

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-bottom: 40px;
`

const NavButton = styled.button`
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

const TabContent = styled.div`
	width: 100%;
	max-width: 1200px;
	padding: 30px;
	background: ${({ theme }) => theme.tabBackground};
	border-radius: 12px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	margin-top: 30px;
	transition: all 0.3s ease;
`

const App: React.FC = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
	const [activeTab, setActiveTab] = useState<
		'players' | 'teams' | 'games' | 'stats'
	>('players')

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	const renderTab = () => {
		switch (activeTab) {
			case 'players':
				return <Players />
			case 'teams':
				return <Teams />
			case 'games':
				return <Games />
			case 'stats':
				return <Statistics />
			default:
				return null
		}
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<GlobalStyles />
				<AppContainer>
					<Header>
						<ToggleButton onClick={toggleTheme}>
							Zmień motyw
						</ToggleButton>
						<h1>Tablica wyników</h1>
					</Header>
					<Nav>
						<NavButton
							onClick={() => setActiveTab('players')}
							className={activeTab === 'players' ? 'active' : ''}
						>
							Gracze
						</NavButton>
						<NavButton
							onClick={() => setActiveTab('teams')}
							className={activeTab === 'teams' ? 'active' : ''}
						>
							Zespoły
						</NavButton>
						<NavButton
							onClick={() => setActiveTab('games')}
							className={activeTab === 'games' ? 'active' : ''}
						>
							Mecze
						</NavButton>
						<NavButton
							onClick={() => setActiveTab('stats')}
							className={activeTab === 'stats' ? 'active' : ''}
						>
							Statystyki
						</NavButton>
					</Nav>
					<TabContent>{renderTab()}</TabContent>
				</AppContainer>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
