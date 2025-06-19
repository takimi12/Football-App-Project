// Statistics.styles.ts
import styled from 'styled-components'

export const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
`

export const Title = styled.h2`
	text-align: center;
	color: ${({ theme }) => theme.text};
	font-size: 2rem;
`

export const SectionTitle = styled.h3`
	color: ${({ theme }) => theme.text};
	font-size: 1.5rem;
	margin-top: 30px;
`

export const StatsSelector = styled.div`
	margin-bottom: 20px;
	text-align: center;

	label {
		font-size: 1rem;
		font-weight: bold;
		margin-right: 10px;
	}

	select {
		font-size: 1rem;
		padding: 10px;
		border: 1px solid ${({ theme }) => theme.inputBorder};
		border-radius: 5px;
	}
`

export const ChartWrapper = styled.div`
	width: 100%;
	max-width: 900px;
	margin: 30px auto;
`

export const GameDetails = styled.div`
	margin-bottom: 20px;
	padding: 20px;
	background-color: ${({ theme }) => theme.cardBackground};
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const GameInfo = styled.p`
	margin: 5px 0;
	color: ${({ theme }) => theme.text};
`

export const ErrorMessage = styled.p`
	color: red;
	font-weight: bold;
`
