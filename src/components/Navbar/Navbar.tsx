import React from 'react';
import {Flex, Image, Input} from "@chakra-ui/react";
import SearchInputComponent from "./SearchInput";
import RightContentComponent from "../RightContent/RightContent";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/clientApp";
import DirectoryComponent from "./Directory/Directory";
import {User} from "firebase/auth";


const NavbarComponent: React.FC = () => {

	/**
	 * @define confirm the authentication with firebase
	 */
	const [user, loading, error] = useAuthState(auth);

	return (
		<Flex
			bg={'white'} h={'44px'} p={'6px 12px'} justifyContent={{md: 'space-between'}}
		>
			<Flex align={'center'} width={{base:'40px', md:'auto'}} mr={{base:0, md:2}}>
				<Image src={'/images/redditFace.svg'} h={'30px'} />
				<Image src={'/images/redditText.svg'} h={'46px'} display={{base: 'none', md: 'unset'}} />
			</Flex>
			{user && <DirectoryComponent />}
			<SearchInputComponent user={user} />
			<RightContentComponent user={user} />
		</Flex>
	);
};

export default NavbarComponent;
