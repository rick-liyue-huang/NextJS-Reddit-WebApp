import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Input, Button, Flex, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";

interface RegisterFormProps {
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterComponent: React.FC = () => {

	const setAuthModalState = useSetRecoilState(authModalState);
	const [registerForm, setRegisterForm] = useState<RegisterFormProps>({
		email: '',
		password: '',
		confirmPassword: ''
	});

	/**
	 * @define connect with firebase app
	 */
	const handleSubmit = () => {

	}

	/**
	 * @define deal with the input value
	 * @param e
	 */
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setRegisterForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<form onSubmit={handleSubmit} >
			<Input
				name={'email'} placeholder={'input email...'} type={'email'} mb={2}
				onChange={handleChange} required fontSize={'10pt'}
				_placeholder={{color: 'gray.100'}} bg={'gray.50'}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'green.100'}}
				_focus={{outline: 'none', bg: 'white', border: '1px solid', borderColor: 'green.100'}}
			/>
			<Input
				name={'password'} placeholder={'input password...'} type={'password'} mb={2}
				onChange={handleChange} required fontSize={'10pt'}
				_placeholder={{color: 'gray.100'}} bg={'gray.50'}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'green.100'}}
				_focus={{outline: 'none', bg: 'white', border: '1px solid', borderColor: 'green.100'}}
			/>
			<Input
				name={'confirmPassword'} placeholder={'confirm password...'} type={'password'} mb={2}
				onChange={handleChange} required fontSize={'10pt'}
				_placeholder={{color: 'gray.100'}} bg={'gray.50'}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'green.100'}}
				_focus={{outline: 'none', bg: 'white', border: '1px solid', borderColor: 'green.100'}}
			/>
			<Button w={'100%'} h={'36px'} type={'submit'}>Register</Button>
			<Flex fontSize={'9pt'} justifyContent={'center'}>
				<Text mr={2}>Have an account?</Text>
				<Text
					color={'green.500'} fontWeight={800} cursor={'pointer'}
					onClick={() => setAuthModalState(prev => ({
						...prev, view: 'login'
					}))}
				>Login</Text>
			</Flex>
		</form>
	);
};

export default RegisterComponent;
