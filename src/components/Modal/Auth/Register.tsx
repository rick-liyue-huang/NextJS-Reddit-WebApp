import React, {ChangeEvent, useState} from 'react';
import {Input, Button, Flex, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";

export interface RegisterFormProps {
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

	const handleSubmit = () => {

	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setRegisterForm(prev => ({
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
			<Input
				name={'confirmPassword'} placeholder={'confirm Password'} required
				type={'password'} mb={2} onChange={handleChange}
				bg={'gray.50'} fontSize={'10pt'}
				_placeholder={{color: 'gray.300'}}
				_hover={{bg: 'white', border: '1px solid', borderColor: 'brand.100'}}
				_focus={{bg: 'white', border: '1px solid', borderColor: 'brand.100'}}
			/>
			<Button
				w={'100%'} h={'36px'} type={'submit'} mt={2}
			>Register</Button>
			<Flex fontSize={'9pt'} justifyContent={'center'} mt={2}>
				<Text mr={1}>Already joined?</Text>
				<Text
					color={'green.200'} fontWeight={700} cursor={'pointer'}
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
