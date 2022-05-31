import React from 'react';
import {Flex, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from '@chakra-ui/icons';
import { User } from 'firebase/auth';

interface SearchInputProps {
	user?: User | null;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({user}) => {
	return (
		<Flex flexGrow={1} maxW={user ? 'auto' : '800px'} mr={2} ml={1} align={'center'} >
			<InputGroup>
				<InputLeftElement
					pointerEvents='none' mb={1}
				>
					<SearchIcon color='gray.300' />
				</InputLeftElement>
				<Input
					type='text' placeholder='search content...'
					fontSize={'12pt'} h={'34px'} color={'gray.200'}
					fontFamily={'sans-serif'} _placeholder={{color: 'gray.300'}}
					_hover={{bg: 'white', border: '1px solid', borderColor: 'green.200'}}
					_focus={{border: '1px solid', borderColor: 'green.200'}}
				/>
			</InputGroup>
		</Flex>
	);
};

export default SearchInputComponent;
