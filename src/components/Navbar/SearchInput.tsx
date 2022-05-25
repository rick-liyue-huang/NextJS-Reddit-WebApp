import React from 'react';
import {Flex, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from '@chakra-ui/icons';

const SearchInputComponent: React.FC = () => {
	return (
		<Flex flexGrow={1} mr={2} ml={1} align={'center'} >
			<InputGroup>
				<InputLeftElement
					pointerEvents='none' mb={1}
					children={<SearchIcon color='gray.300' />}
				/>
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
