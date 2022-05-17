import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Input, Button, Flex, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";
import {FIREBASE_ERRORS} from "../../../firebase/errors";

interface LoginFormProps {
	email: string;
	password: string;
}

const LoginComponent: React.FC = () => {

	/**
	 * @define login with firebase
	 */
	const [
		signInWithEmailAndPassword,
		user,
		loading,
		error,
	] = useSignInWithEmailAndPassword(auth);

	const setAuthModalState = useSetRecoilState(authModalState);
	const [loginForm, setLoginForm] = useState<LoginFormProps>({
		email: '',
		password: ''
	});

	/**
	 * @define connect with firebase app
	 */
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await signInWithEmailAndPassword(loginForm.email, loginForm.password)
	}

	/**
	 * @define deal with the input value
	 * @param e
	 */
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setLoginForm(prev => ({
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
			<Text color={'red'} textAlign={'center'} fontSize={'10pt'}>
				{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
			</Text>
			<Button w={'100%'} h={'36px'} type={'submit'} isLoading={loading}>Login</Button>
			<Flex fontSize={'9pt'} justifyContent={'center'}>
				<Text mr={2}>Forgot password?</Text>
				<Text
					color={'green.500'} fontWeight={800} cursor={'pointer'}
					onClick={() => setAuthModalState(prev => ({
						...prev, view: 'resetPassword'
					}))}
				>Reset Password</Text>
			</Flex>
			<Flex fontSize={'9pt'} justifyContent={'center'}>
				<Text mr={2}>Not yet Register?</Text>
				<Text
					color={'green.500'} fontWeight={800} cursor={'pointer'}
					onClick={() => setAuthModalState(prev => ({
						...prev, view: 'register'
					}))}
				>Register</Text>
			</Flex>
		</form>
	);
};

export default LoginComponent;
