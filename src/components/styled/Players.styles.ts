import styled from 'styled-components'

export const PlayersContainer = styled.div`
	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;
`

export const Title = styled.h1`
	text-align: center;
	font-size: 2.5rem;
	color: ${({ theme }) => theme.text};
	margin-bottom: 20px;
`

export const Form = styled.form`
	background-color: ${({ theme }) => theme.formBackground};
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 500px;
	display: flex;
	flex-direction: column;
`

export const FormField = styled.div`
	margin-bottom: 15px;
`

export const Input = styled.input`
	width: 100%;
	padding: 10px;
	font-size: 1rem;
	border: 2px solid ${({ theme }) => theme.inputBorder};
	border-radius: 5px;
	transition: border-color 0.3s ease;

	&:focus {
		border-color: ${({ theme }) => theme.inputFocusBorder};
		outline: none;
	}
`

export const ErrorMessage = styled.p`
	color: red;
	font-size: 0.875rem;
	margin-top: 5px;
`

export const Button = styled.button`
	background-color: ${({ theme }) => theme.buttonBackground};
	color: ${({ theme }) => theme.buttonText};
	padding: 10px 20px;
	font-size: 1rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		transform 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => theme.buttonHoverBackground};
		transform: scale(1.05);
	}

	&:disabled {
		background-color: ${({ theme }) => theme.buttonDisabledBackground};
		cursor: not-allowed;
	}
`

export const PlayersList = styled.ul`
	list-style-type: none;
	padding: 0;
`

export const PlayerItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	background-color: ${({ theme }) => theme.listItemBackground};
	margin-bottom: 10px;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const PlayerInfo = styled.div`
	display: flex;
	gap: 15px;
`

export const PlayerLabel = styled.label`
	font-weight: bold;
	color: ${({ theme }) => theme.text};
`

export const PlayerText = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.text};
`

export const EditButton = styled.button`
	background-color: ${({ theme }) => theme.editButtonBackground};
	color: ${({ theme }) => theme.editButtonText};
	padding: 8px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.editButtonHoverBackground};
	}
`

export const DeleteButton = styled.button`
	background-color: ${({ theme }) => theme.deleteButtonBackground};
	color: ${({ theme }) => theme.deleteButtonText};
	padding: 8px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.deleteButtonHoverBackground};
	}

	&:disabled {
		background-color: ${({ theme }) =>
			theme.deleteButtonDisabledBackground};
		cursor: not-allowed;
	}
`

export const PlayerCannotDeleteMessage = styled.p`
	color: ${({ theme }) => theme.warningText};
	font-size: 0.875rem;
	margin-top: 10px;
	font-style: italic;
	text-align: center;
`
