import React from 'react';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider, Button, Icon, Flex, Text
} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons';
import {signOut, User} from "@firebase/auth";
import {FaRedditSquare} from "react-icons/fa";
import {VscAccount} from "react-icons/vsc";
import {CgProfile} from "react-icons/cg";
import {MdOutlineLogin} from "react-icons/md";
import {auth} from "../../../firebase/clientApp";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {IoSparkles} from "react-icons/all";

interface UserMenuProps {
	user?: User | null;
}

const UserMenuComponent: React.FC<UserMenuProps> = ({user}) => {

	const setAuthModalState = useSetRecoilState(authModalState)

	return (
		<Menu>
			<MenuButton
				cursor={'pointer'} padding={'0 6px'} borderRadius={4}
				_hover={{outline: '1px solid', outlineColor: 'green.100'}}
			>
				{
					<Flex align={'center'}>
						<Flex align={'center'}>
							{user ? (
								<>
									<Icon as={FaRedditSquare} fontSize={23} color={'gray.300'}/>
									<Flex
										direction={'column'}
										display={{base: 'none', lg: 'flex'}}
										fontSize={'8pt'}
										align={'flex-start'} mr={8}
									>
										<Text fontWeight={700}>
											{user?.displayName || user.email?.split('@')[0]}
										</Text>
										<Flex>
											<Icon as={IoSparkles} color={'brand.100'} mr={1} />
											<Icon color={'green.300'}>1 karma</Icon>
										</Flex>
									</Flex>
								</>
							) : (
								<Icon fontSize={24} color={'green.200'} as={VscAccount}/>
							)}
						</Flex>
						<ChevronDownIcon />
					</Flex>
				}
			</MenuButton>
			<MenuList>
				{
					user ? (
						<>
							<MenuItem fontSize={'10pt'} fontWeight={600} _hover={{bg: 'green.200', color: 'white'}} >
								<Flex align={'center'}>
									<Icon fontSize={22} mr={2} as={CgProfile} color={'green.200'} />
									Profile
								</Flex>
							</MenuItem>
							<MenuDivider />
							<MenuItem
								fontSize={'10pt'} fontWeight={600} _hover={{bg: 'green.200', color: 'white'}}
								onClick={() => signOut(auth)}
							>
								<Flex align={'center'}>
									<Icon fontSize={22} mr={2} as={MdOutlineLogin} color={'green.200'} />
									Logout
								</Flex>
							</MenuItem>
						</>
					) : (
						<>
							<MenuItem
								fontSize={'10pt'} fontWeight={600} _hover={{bg: 'green.200', color: 'white'}}
								onClick={() => setAuthModalState({open: true, view: 'login'})}
							>
								<Flex align={'center'}>
									<Icon fontSize={22} mr={2} as={MdOutlineLogin} color={'green.200'} />
									Login / Register
								</Flex>
							</MenuItem>
						</>
					)
				}

			</MenuList>
		</Menu>
	);
};

export default UserMenuComponent;
