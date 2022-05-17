import React from 'react';
import {Flex, Image} from "@chakra-ui/react";
import SearchInputComponent from "./SearchInput";
import RightContentComponent from "./RightContent/RightContent";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/clientApp";



const NavbarComponent: React.FC = () => {
	const [user, error, loading] = useAuthState(auth)
	return (
		<Flex bg={'white'} height={'44px'} padding={'6px 12px'} >
			<Flex align={'center'}>
				<Image
					src={'/images/redditFace.svg'}
					height={'30px'}
				/>
				<Image
					src={'/images/redditText.svg'}
					height={'46px'} display={{base: 'none', md: 'unset'}}
				/>
			</Flex>
			{/*<Directory />*/}
			<SearchInputComponent />
			<RightContentComponent user={user} />
		</Flex>
	);
};

export default NavbarComponent;
