import React from 'react';
import {Menu, Button, MenuButton, MenuItem, MenuList, Icon, Flex, MenuDivider, Text} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {TiHome} from "react-icons/ti";
import CommunitiesComponent from "./Communities";


const DirectoryComponent: React.FC = () => {

	return (
		<Menu>
			<MenuButton
				cursor={'pointer'} p={'0 6px'} borderRadius={3}
				_hover={{outline: '1px solid', outlineColor: 'green.100'}}
				mr={1}
			>
				<Flex align={'center'} justify={'space-between'} w={{base: 'auto', lg: '200px'}}>
					<Flex align={'center'}>
						<Icon as={TiHome} fontSize={20} mr={{base: 1, md: 2}} />
						<Flex display={{base: 'none', lg: 'flex'}} mt={1}>
							<Text fontWeight={200}>Home</Text>
						</Flex>
					</Flex>
					<ChevronDownIcon />
				</Flex>
			</MenuButton>
			<MenuList mt={1}>
				<CommunitiesComponent />
			</MenuList>
		</Menu>
	);
};

export default DirectoryComponent;
