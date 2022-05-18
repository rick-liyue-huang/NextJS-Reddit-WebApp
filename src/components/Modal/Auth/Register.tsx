import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Input, Button, Flex, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth, fireStore} from "../../../firebase/clientApp";
import {FIREBASE_ERRORS} from "../../../firebase/errors";
import {User} from "firebase/auth";
import {addDoc, collection} from "@firebase/firestore";


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

	const [formError, setFormError] = useState('');

	/**
	 * @define using react-firebase-hooks to connect with firebase
	 */
	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		userError,
	] = useCreateUserWithEmailAndPassword(auth);

	/**
	 * @define connect with firebase app
	 */
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formError) setFormError('')

		// confirm the password matched
		if (registerForm.password !== registerForm.confirmPassword) {
			setFormError('password not match');
			return
		}
		await createUserWithEmailAndPassword(registerForm.email, registerForm.password)
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

	// same as the firebase functions named 'createUserDocument' in 'functions/src/index.ts'
	const createUserDocument = async (user: User) => {
		await addDoc(collection(fireStore, 'users'), JSON.parse(JSON.stringify(user)))
	}

	useEffect(() => {
		if (user) {
			createUserDocument(user.user)
		}
	}, [user])

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
			{
				(formError || userError) && <Text color={'red'} fontSize={'10pt'} align={'center'}>{formError || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>
			}
			<Button
				w={'100%'} h={'36px'} type={'submit'} isLoading={loading}
			>Register</Button>
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
