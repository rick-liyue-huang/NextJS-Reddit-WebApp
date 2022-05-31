import React from 'react';
import {Menu, Button, MenuButton, MenuItem, MenuList, Icon, Flex, MenuDivider, Text, Image} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {TiHome} from "react-icons/ti";
import CommunitiesComponent from "./Communities";
import {useDirectory} from "../../../hooks/useDirectory";
import {directoryMenuState} from "../../../atoms/directoryMenuAtom";


const DirectoryComponent: React.FC = () => {

	const {directoryState, handleToggleMenuOpen} = useDirectory();

	return (
		<Menu isOpen={directoryState.isOpen}>
			<MenuButton
				cursor={'pointer'} p={'0 6px'} borderRadius={3}
				_hover={{outline: '1px solid', outlineColor: 'green.100'}}
				mr={1} onClick={handleToggleMenuOpen}
			>
				<Flex align={'center'} justify={'space-between'} w={{base: 'auto', lg: '200px'}}>
					<Flex align={'center'}>
						{
							directoryState.selectedMenuItem.imageUrl ? (
								<Image src={directoryState.selectedMenuItem.imageUrl}
											 borderRadius={'full'} boxSize={'24px'} mr={2} />
							) : (
								<Icon
									as={directoryState.selectedMenuItem.icon}
									color={directoryState.selectedMenuItem.iconColor}
									fontSize={20} mr={{base: 1, md: 2}} />
							)
						}

						<Flex display={{base: 'none', lg: 'flex'}} mt={1}>
							<Text fontWeight={200}>
								{directoryState.selectedMenuItem.displayName}
							</Text>
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
