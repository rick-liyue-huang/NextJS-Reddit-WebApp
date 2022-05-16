import React, {ChangeEvent, useState} from 'react';
import {Input, Button, Text, Flex} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";

interface LoginProps {

}

const LoginComponent: React.FC<LoginProps> = () => {

	const setAuthModalState = useSetRecoilState(authModalState)
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: ''
	});

	// firebase usage
	const handleOnSubmit = () => {

	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setLoginForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<Input
				name={'email'} placeholder={'email'} type={'email'}
				onChange={handleChange} required fontSize={'10pt'}
				_placeholder={{color: 'gray.300'}} bg={'gray.50'}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'green.200'}} _focus={{outline: 'none', bg: 'white', border: '1px solid', borderColor: 'green.200'}}
			/>
			<Input
				name={'password'} placeholder={'password'} type={'password'} mt={2} required
				onChange={handleChange} fontSize={'10pt'}
				_placeholder={{color: 'gray.300'}} bg={'gray.50'}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'green.200'}} _focus={{outline: 'none', bg: 'white', border: '1px solid', borderColor: 'green.200'}}
			/>
			<Button width={'100%'} height={'36px'} type={'submit'} mt={2} mb={2}>Login</Button>
			<Flex fontSize={'10pt'} justifyContent={'center'}>
				<Text mr={2}>Have not an account?</Text>
				<Text
					color={'green.300'} fontWeight={600} cursor={'pointer'}
					onClick={() => setAuthModalState(prev => ({
						...prev,
						view: 'register'
					}))}
				>Register</Text>
			</Flex>
		</form>
	);
};

export default LoginComponent;
