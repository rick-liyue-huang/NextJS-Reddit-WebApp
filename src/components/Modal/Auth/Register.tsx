import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {Button, Flex, Input, Text} from "@chakra-ui/react";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";
import {FIREBASE_ERRORS} from "../../../firebase/errors";

interface RegisterProps {

}

const RegisterComponent: React.FC<RegisterProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState)
	const [registerForm, setRegisterForm] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});

	// connect with firebase
	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		userError,
	] = useCreateUserWithEmailAndPassword(auth);

	const [formError, setFormError] = useState('');

	// firebase usage
	const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formError) setFormError('');
		if (registerForm.password !== registerForm.confirmPassword) {
			setFormError('password not match');
			return;
		}

		createUserWithEmailAndPassword(registerForm.email, registerForm.password);
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setRegisterForm(prev => ({
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
			<Input
				name={'confirmPassword'} placeholder={'confirm password'} type={'password'} mt={2} required
				onChange={handleChange} fontSize={'10pt'}
				_placeholder={{color: 'gray.300'}} bg={'gray.50'}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'green.200'}} _focus={{outline: 'none', bg: 'white', border: '1px solid', borderColor: 'green.200'}}
			/>
			{
				(formError || userError) && <Text textAlign={'center'} color={'red'} fontSize={'10pt'} >
					{formError || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
				</Text>
			}
			<Button
				width={'100%'} height={'36px'} type={'submit'}
				mt={2} mb={2} isLoading={loading}
			>
				Register
			</Button>
			<Flex fontSize={'10pt'} justifyContent={'center'}>
				<Text mr={2}>Have an account?</Text>
				<Text
					color={'green.300'} fontWeight={600} cursor={'pointer'}
					onClick={() => setAuthModalState(prev => ({
						...prev,
						view: 'login'
					}))}
				>Login</Text>
			</Flex>
		</form>
	);
};

export default RegisterComponent;
