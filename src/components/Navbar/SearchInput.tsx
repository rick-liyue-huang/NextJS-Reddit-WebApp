import React from 'react';
import {Flex, InputGroup, Input, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

const SearchInputComponent: React.FC = () => {
	return (
		<Flex flexGrow={1} mr={2} align={'center'}>
			<InputGroup>
				<InputLeftElement
					pointerEvents='none'
					children={<SearchIcon color='gray.300' mb={1} />}
				/>
				<Input
					type='tel' placeholder='Search content...'
					_placeholder={{color: 'gray.300'}}
					_hover={{bg: 'white', border: '1px solid', borderColor: 'green.100'}} _focus={{bg: 'white', border: '1px solid', borderColor: 'green.300'}}
					height={'34px'} bg={'gray.50'}
				/>
			</InputGroup>
		</Flex>
	);
};

export default SearchInputComponent;
