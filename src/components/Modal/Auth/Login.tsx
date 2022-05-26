import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Input, Button, Flex, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";
import {FIREBASE_ERRORS} from "../../../firebase/errors";

export interface LoginFormProps {
	email: string;
	password: string;
}

const LoginComponent: React.FC = () => {

	const setAuthModalState = useSetRecoilState(authModalState);
	const [loginForm, setLoginForm] = useState<LoginFormProps>({
		email: '',
		password: ''
	});

	// sign in the firebase with firebase api
	const [
		signInWithEmailAndPassword,
		user,
		loading,
		error,
	] = useSignInWithEmailAndPassword(auth);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await signInWithEmailAndPassword(loginForm.email, loginForm.password);
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setLoginForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				name={'email'} placeholder={'email'} required fontSize={'10pt'}
				type={'email'} mb={2} onChange={handleChange} bg={'gray.50'}
				_placeholder={{color: 'gray.300'}}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'brand.100'}}
				_focus={{bg: 'white', border: '1px solid', borderColor: 'brand.100'}}
			/>
			<Input
				name={'password'} placeholder={'password'} required
				type={'password'} mb={2} onChange={handleChange}
				bg={'gray.50'} fontSize={'10pt'}
				_placeholder={{color: 'gray.300'}}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'brand.100'}}
				_focus={{bg: 'white', border: '1px solid', borderColor: 'brand.100'}}
			/>
			{
				error && <Text
					textAlign={'center'} color={'red'} fontSize={'10pt'}
				>{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>
			}
			<Button
				w={'100%'} h={'36px'} type={'submit'} mt={2} isLoading={loading}
			>Login</Button>
			<Flex fontSize={'9pt'} justifyContent={'center'} mt={2}>
				<Text mr={1}>Forget the password?</Text>
				<Text
					color={'green.200'} fontWeight={700} cursor={'pointer'} mb={2}
					onClick={() => setAuthModalState(prev => ({
						...prev,
						view: 'resetPassword'
					}))}
				>Reset Password</Text>
			</Flex>
			<Flex fontSize={'9pt'} justifyContent={'center'} mt={2}>
				<Text mr={1}>Haven&apos;t an Account?</Text>
				<Text
					color={'green.200'} fontWeight={700} cursor={'pointer'} mb={2}
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
