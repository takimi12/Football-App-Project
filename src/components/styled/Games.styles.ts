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

export const FormContainer = styled.form`
	background-color: ${({ theme }) => theme.formBackground};
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 30px;
	width: 100%;
	max-width: 600px;
`

export const FormField = styled.div`
	margin-bottom: 15px;
`

export const Label = styled.label`
	font-size: 1rem;
	font-weight: bold;
	color: ${({ theme }) => theme.text};
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

export const ErrorText = styled.span`
	color: red;
	font-size: 0.875rem;
`

export const Select = styled.select`
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

export const MatchListContainer = styled.div`
	margin-top: 40px;
`

export const MatchItem = styled.li`
	background-color: ${({ theme }) => theme.listItemBackground};
	padding: 15px;
	border-radius: 8px;
	margin-bottom: 15px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const MatchInfo = styled.div`
	margin-bottom: 10px;
`

export const MatchActions = styled.div`
	display: flex;
	gap: 10px;
`

export const EditButton = styled.button`
	background-color: ${({ theme }) => theme.editButtonBackground};
	color: ${({ theme }) => theme.editButtonText};
	padding: 8px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;

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

	&:hover {
		background-color: ${({ theme }) => theme.deleteButtonHoverBackground};
	}
`