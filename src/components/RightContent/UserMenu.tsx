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
import {signOut, User} from "firebase/auth";
import {FaRedditSquare} from "react-icons/fa";
import {VscAccount} from "react-icons/vsc";
import {IoSparkles} from "react-icons/io5";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {CgProfile} from "react-icons/cg";
import {MdOutlineLogout} from "react-icons/md";
import {auth} from "../../firebase/clientApp";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../atoms/authModalAtom";


interface UserMenuProps {
	user?: User | null;
}

const UserMenuComponent: React.FC<UserMenuProps> = ({user}) => {
	const setAuthModalState = useSetRecoilState(authModalState);

	return (
		<Menu>
			<MenuButton
				cursor={'pointer'} p={'0 6px'} borderRadius={4}
				_hover={{outline:'1px solid', outlineColor: 'green.200'}}
			>
				<Flex align={'center'}>
					<Flex align={'center'}>
				{
					user ? (
						<>
							<Icon
								as={FaRedditSquare} fontSize={24} mr={1} color={'green.300'}
							/>
							<Flex
								direction={'column'} display={{base:'none', lg:'flex'}}
								fontSize={'8pt'} align={'flex-start'} mr={5}
							>
								<Text fontWeight={700}>
									{user?.displayName || user.email?.split('@')[0]}
								</Text>
								<Flex>
									<Icon as={IoSparkles} color={'green.100'} mr={1} />
									<Icon color={'gray.300'}>karma</Icon>
								</Flex>
							</Flex>
						</>
					) : (
						<Icon as={VscAccount} fontSize={24} color={'green.300'} mr={1} />
					)
				}
					</Flex>
					<ChevronDownIcon />
				</Flex>
			</MenuButton>
			<MenuList>

				{
					user ? (
						<>
							<MenuItem fontSize={'10pt'} fontWeight={700} _hover={{bg:'green.200', color: 'white'}}>
								<Flex align={'center'}>
									<Icon as={CgProfile} fontSize={20} mr={2} /> Profile
								</Flex>
							</MenuItem>
							<MenuDivider />
							<MenuItem
								fontSize={'10pt'} fontWeight={700} _hover={{bg:'green.200', color: 'white'}}
								onClick={() => signOut(auth)}
							>
								<Flex align={'center'}>
									<Icon as={MdOutlineLogout} fontSize={20} mr={2} /> Logout
								</Flex>
							</MenuItem>
						</>
					) : (
						<>
							<MenuItem
								fontSize={'10pt'} fontWeight={700} _hover={{bg:'green.200', color: 'white'}}
								onClick={() => setAuthModalState({
									open: true, view: 'login'
								})}
							>
								<Flex align={'center'}>
									<Icon as={MdOutlineLogout} fontSize={20} mr={2} />
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
