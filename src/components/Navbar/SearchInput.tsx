import React from 'react';
import {Flex, InputGroup, InputLeftElement, Input} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {User} from 'firebase/auth';

interface SearchInputProps {
	// user?: User | null
}

const SearchInputComponent: React.FC<SearchInputProps> = () => {
	return (
		<Flex flexGrow={1} ml={1} mr={2} align={'center'}>
			<InputGroup>
				<InputLeftElement
					pointerEvents='none'
					children={<SearchIcon color='gray.300' mb={1} />}
				/>
				<Input
					placeholder='Search Content...' fontSize={'10pt'} h={'34px'} bg={'gray.100'}
					_placeholder={{color: 'gray.100'}}
					_hover={{bg: 'white', border: '1px solid', borderColor: 'green.100'}}
					_focus={{outline: 'none', border: '1px solid', borderColor: 'green.100'}}
				/>
			</InputGroup>
		</Flex>
	);
};

export default SearchInputComponent;
