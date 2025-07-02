import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalStyles, lightTheme, darkTheme } from './themes/themes'
import { Players } from './components/Players'
import { Teams } from './components/Teams'
import { Games } from './components/Games'
import { Statistics } from './components/Stats'
import {
	AppContainer,
	Header,
	ToggleButton,
	Nav,
	NavButton,
	TabContent
} from './components/styled/App.styled' 

const queryClient = new QueryClient()

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
							Change motive
						</ToggleButton>
						<h1>Array results</h1>
					</Header>
					<Nav>
						<NavButton
							onClick={() => setActiveTab('players')}
							className={activeTab === 'players' ? 'active' : ''}
						>
							Players
						</NavButton>
						<NavButton
							onClick={() => setActiveTab('teams')}
							className={activeTab === 'teams' ? 'active' : ''}
						>
							Teams
						</NavButton>
						<NavButton
							onClick={() => setActiveTab('games')}
							className={activeTab === 'games' ? 'active' : ''}
						>
							Matches
						</NavButton>
						<NavButton
							onClick={() => setActiveTab('stats')}
							className={activeTab === 'stats' ? 'active' : ''}
						>
							Statistics
						</NavButton>
					</Nav>
					<TabContent>{renderTab()}</TabContent>
				</AppContainer>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
