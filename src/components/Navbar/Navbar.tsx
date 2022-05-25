import React from 'react';
import {Flex, Image} from "@chakra-ui/react";
import SearchInputComponent from "./SearchInput";


const NavbarComponent: React.FC = () => {
	return (
		<Flex bg={'white'} h={'44px'} paddingY={'6px'} paddingX={'12px'}>
			<Flex align={'center'} >
				<Image src={'/images/redditFace.svg'} h={'30px'} />
				<Image
					src={'/images/redditText.svg'} h={'46px'}
					display={{base: 'none', md: 'unset'}}
				/>
			</Flex>
			{/*<Directory />*/}
			<SearchInputComponent />
			{/*<RightPart />*/}
		</Flex>
	);
};

export default NavbarComponent;
