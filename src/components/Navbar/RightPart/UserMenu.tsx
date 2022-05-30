import React from 'react';
import {Menu, Button, MenuButton, MenuItem, MenuList, Icon, Flex, MenuDivider, Text} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {signOut, User} from 'firebase/auth';
import {FaRedditSquare} from "react-icons/fa";
import {VscAccount} from "react-icons/vsc";
import {IoSparkles} from "react-icons/io5";
import {CgProfile} from "react-icons/cg";
import {MdOutlineLogout} from "react-icons/md";
import {auth} from "../../../firebase/clientApp";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {communityState} from "../../../atoms/communitiesAtom";

interface UserMenuProps {
	user?: User | null;
}
const UserMenuComponent: React.FC<UserMenuProps> = ({user}) => {

	const resetCommunityState = useResetRecoilState(communityState);
	const setAuthModal = useSetRecoilState(authModalState);

	const handleLogout = async () => {
		await signOut(auth);
		// and clear the community state
		// resetCommunityState();
		// here we donnot want clear the whole community, but just the communitySnippets
	//	 so in the useCommunityData, we set the useEffect
	}

	return (
		<Menu>
			<MenuButton
				cursor={'pointer'} p={'0 6px'} borderRadius={3}
				_hover={{outline: '1px solid', outlineColor: 'green.100'}}
			>
				<Flex align={'center'}>
					<Flex align={'center'}>
				{
					user ? (
						<>
							<Icon color={'brand.100'} as={FaRedditSquare} fontSize={24} />
							<Flex
								direction={'column'}
								display={{base: 'none', lg: 'flex'}}
								fontSize={'8pt'}
								align={'flex-start'}
								mr={8}
							>
								<Text fontWeight={400}>
									{user?.displayName || user.email?.split('@')[0]}
								</Text>
								<Flex>
									<Icon as={IoSparkles} color={'brand.100'} mr={1} />
									<Text color={'brand.100'}>1 karma</Text>
								</Flex>
							</Flex>
						</>
					) : (
						<Icon as={VscAccount} fontSize={24} color={'green.200'} mr={1} />
					)
				}
					</Flex>
					<ChevronDownIcon />
				</Flex>
			</MenuButton>
			<MenuList mt={1}>
				{
					user ? (
						<>
							<MenuItem
								fontSize={'10pt'} fontWeight={300}
								_hover={{bg: 'green.200', color: 'white'}}
							>
								<Flex align={'center'} justify={'center'}>
									<Icon as={CgProfile} fontSize={20} mr={2} />
									PROFILE
								</Flex>
							</MenuItem>
							<MenuDivider />
							<MenuItem
								fontSize={'10pt'} fontWeight={500}
								_hover={{bg: 'green.200', color: 'white'}}
								onClick={handleLogout}
							>
								<Flex align={'center'} justify={'center'}>
									<Icon as={MdOutlineLogout} fontSize={20} mr={2} />
									LOGOUT
								</Flex>
							</MenuItem>
						</>
					) : (
						<MenuItem
							fontSize={'10pt'} fontWeight={500}
							_hover={{bg: 'green.200', color: 'white'}}
							onClick={() => setAuthModal({open: true, view: 'login'})}
						>
							<Flex align={'center'} justify={'center'}>
								<Icon as={MdOutlineLogout} fontSize={20} mr={2} />
								Login / Register
							</Flex>
						</MenuItem>
					)
				}

			</MenuList>
		</Menu>
	);
};

export default UserMenuComponent;
