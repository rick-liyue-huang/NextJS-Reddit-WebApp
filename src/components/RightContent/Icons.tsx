import React from 'react';
import { AddIcon } from "@chakra-ui/icons";
import { Flex, Icon } from "@chakra-ui/react";
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
				display={{base:'none', md:'flex'}} align={'center'} borderRight={'1px solid'} borderColor={'green.200'}
			>
				<Flex
					mr={1} ml={1} padding={1} cursor={'pointer'}
					borderRadius={4} _hover={{bg:'gray.200'}}
				>
					<Icon
						as={BsArrowUpRightCircle} fontSize={20}
					/>
				</Flex>
				<Flex mr={1} ml={1} padding={1} cursor={'pointer'}
								borderRadius={4} _hover={{bg:'gray.200'}}
				>
					<Icon
						as={IoFilterCircleOutline} fontSize={20}
					/>
				</Flex>
				<Flex mr={1} ml={1} padding={1} cursor={'pointer'}
							borderRadius={4} _hover={{bg:'gray.200'}}
				>
					<Icon
						as={IoVideocamOutline} fontSize={20}
					/>
				</Flex>
			</Flex>
			<>
				<Flex mr={1} ml={1} padding={1} cursor={'pointer'}
							borderRadius={4} _hover={{bg:'gray.200'}}
				>
					<Icon
						as={BsChatDots} fontSize={20}
					/>
				</Flex>
				<Flex mr={1} ml={1} padding={1} cursor={'pointer'}
							borderRadius={4} _hover={{bg:'gray.200'}}
				>
					<Icon
						as={IoNotificationsOutline} fontSize={22}
					/>
				</Flex>
				<Flex
					mr={1} ml={1} padding={1} cursor={'pointer'}
					borderRadius={4} _hover={{bg:'gray.200'}}
					display={{base:'none', md:'flex'}}
				>
					<Icon
						as={GrAdd} fontSize={22}
					/>
				</Flex>
			</>
		</Flex>
	);
};

export default IconsComponent;
