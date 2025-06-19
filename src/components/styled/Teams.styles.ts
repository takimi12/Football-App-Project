// src/components/Teams.styles.ts
import styled from 'styled-components'

export const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
`

export const Title = styled.h3`
	text-align: center;
	font-size: 2rem;
	color: ${({ theme }) => theme.text};
`

export const FormContainer = styled.form`
	background-color: ${({ theme }) => theme.formBackground};
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 600px;
	margin-bottom: 30px;
`

export const FormField = styled.div`
	margin-bottom: 20px;
`

export const Label = styled.label`
	font-size: 1rem;
	color: ${({ theme }) => theme.text};
	font-weight: bold;
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

export const TeamContainer = styled.div`
	display: flex;
	gap: 30px;
	padding: 20px;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.listItemBackground};
	margin-bottom: 20px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const TeamInfo = styled.div`
	flex: 1;
`
