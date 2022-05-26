import React from 'react';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
	IoFilterCircleOutline,
	IoNotificationsOutline,
	IoVideocamOutline,
} from "react-icons/io5";

const IconsComponent: React.FC = () => {
	return (
		<Flex>
			<Flex
				display={{base: 'none', md: 'flex'}}
				align={'center'} borderRight={'1px solid'} borderColor={'green.200'}
			>
				<Flex
					mr={1} ml={1} p={1} cursor={'pointer'} borderRadius={3}
					_hover={{bg: 'green.100'}}
				>
					<Icon as={BsArrowUpRightCircle} fontSize={18} />
				</Flex>
				<Flex
					mr={1} ml={1} p={1} cursor={'pointer'} borderRadius={3}
					_hover={{bg: 'green.100'}}
				>
					<Icon as={IoFilterCircleOutline} fontSizeAdjust={24} />
				</Flex>
				<Flex
					mr={1} ml={1} p={1} cursor={'pointer'} borderRadius={3}
					_hover={{bg: 'green.100'}}
				>
					<Icon as={IoVideocamOutline} fontSize={22} />
				</Flex>
			</Flex>
			<>
				<Flex
					mr={1} ml={1} p={1} cursor={'pointer'} borderRadius={3}
					_hover={{bg: 'green.100'}}
				>
					<Icon as={BsChatDots} fontSize={18} />
				</Flex>
				<Flex
					mr={1} ml={1} p={1} cursor={'pointer'} borderRadius={3}
					_hover={{bg: 'green.100'}}
				>
					<Icon as={IoNotificationsOutline} fontSize={20} />
				</Flex>
				<Flex
					mr={1} ml={1} p={1} cursor={'pointer'} borderRadius={3}
					_hover={{bg: 'green.100'}}
					display={{base: 'none', md: 'flex'}}
				>
					<Icon as={GrAdd} fontSize={20} />
				</Flex>
			</>
		</Flex>
	);
};

export default IconsComponent;
