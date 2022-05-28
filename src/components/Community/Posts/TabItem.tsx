import React from 'react';
import {FormTabItem} from "./NewPostForm";
import {Flex, Icon, Text} from "@chakra-ui/react";

interface TabItemProps {
	item: FormTabItem,
	selected: boolean;
	setSelectedTab: (value: string) => void;
}

const TabItemComponent: React.FC<TabItemProps> = ({item, selected, setSelectedTab}) => {

	return (
		<Flex
			justify={'center'} align={'center'} flexGrow={1} p={'14px 0'}
			cursor={'pointer'} fontWeight={700}
			_hover={{color: 'white', bg: 'green.200'}}
			color={selected ? 'green.500': 'gray.500'}
			borderWidth={selected ? '0 1px 2px 0' : '0 1px 1px 0'}
			borderBottomColor={selected ? 'green.600' : 'gray.200'}
			onClick={() => setSelectedTab(item.title)}
		>
			<Flex align={'center'} h={'20px'} mr={2}>
				<Icon as={item.icon}></Icon>
			</Flex>
			<Text fontSize={'10pt'}>{item.title}</Text>
		</Flex>
	);
};

export default TabItemComponent;
