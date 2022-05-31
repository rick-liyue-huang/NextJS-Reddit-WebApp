import React from 'react';
import {IconType} from "react-icons";
import {MenuItem, Flex, Image, Icon} from "@chakra-ui/react";
import {useDirectory} from "../../../hooks/useDirectory";


interface MenuListItemProps {
	displayName: string;
	link: string;
	icon: IconType;
	iconColor: string;
	imageUrl?: string;
}

const MenuListItemComponent: React.FC<MenuListItemProps> = ({
	displayName, icon, iconColor, link, imageUrl
}) => {

	const {handleSelectMenuItem} = useDirectory();

	return (
		<MenuItem
			w={'100%'} fontSize={'10pt'} _hover={{bg: 'gray.100'}}
			onClick={() => handleSelectMenuItem({displayName, link, icon, iconColor, imageUrl})}
		>
			<Flex align={'center'}>
				{
					imageUrl ? (
						<Image src={imageUrl} borderRadius={'full'} boxSize={'10px'} mr={2} />
					) : (
						<Icon as={icon} fontSize={20} mr={2} color={iconColor} />
					)
				}
				{displayName}
			</Flex>
		</MenuItem>
	);
};

export default MenuListItemComponent;
