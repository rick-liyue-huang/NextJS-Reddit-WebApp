import React from 'react';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
	Button, Icon, Flex, Text
} from '@chakra-ui/react';
import {ChevronDownIcon} from "@chakra-ui/icons";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {TiHome} from "react-icons/ti";
import CommunitiesComponent from "./Communities";



const DirectoryComponent: React.FC = () => {
	const setAuthModalState = useSetRecoilState(authModalState);

	return (
		<Menu>
			<MenuButton
				cursor={'pointer'} p={'0 6px'} borderRadius={4} mr={2} ml={{base:0,lg:2}}
				_hover={{outline:'1px solid', outlineColor: 'green.200'}}
			>
				<Flex align={'center'} justify={'space-between'} w={{base:'auto', lg:'200px'}}>
					<Flex align={'center'}>
						<Icon color={'green.300'} fontSize={24} mr={{base:'none', md: 2}} as={TiHome} />
						<Flex display={{base:'none', lg:'flex'}}>
							<Text fontWeight={500} fontSize={'10pt'}>Home</Text>
						</Flex>
					</Flex>
					<ChevronDownIcon />
				</Flex>
			</MenuButton>
			<MenuList>
				<CommunitiesComponent />
			</MenuList>
		</Menu>
	);
};

export default DirectoryComponent;
