import React from 'react';
import {Flex, Image} from "@chakra-ui/react";
import SearchInputComponent from "./SearchInput";
import RightPartComponent from "./RightPart/RightPart";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase/clientApp";
import DirectoryComponent from "./Directory/Directory";


const NavbarComponent: React.FC = () => {

	const [user, loading, error] = useAuthState(auth);

	return (
		<Flex bg={'white'} h={'44px'} paddingY={'6px'} paddingX={'12px'} justify={{md: 'space-between'}}>
			<Flex align={'center'} w={{base: '40px', md: 'auto'}} mr={{base: 0, md: 2}}>
				<Image src={'/images/redditFace.svg'} h={'30px'} />
				<Image
					src={'/images/redditText.svg'} h={'46px'}
					display={{base: 'none', md: 'unset'}}
				/>
			</Flex>
			{user && <DirectoryComponent />}
			<SearchInputComponent user={user}  />
			<RightPartComponent user={user} />
		</Flex>
	);
};

export default NavbarComponent;
