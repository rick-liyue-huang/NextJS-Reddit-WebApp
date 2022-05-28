import React from 'react';
import PageContentComponent from "../../../components/Layout/PageContent";
import {Box, Text} from "@chakra-ui/react";
import NewPostFormComponent from "../../../components/Community/Posts/NewPostForm";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";

// realize to create post here

const SubmitPostPage: React.FC = () => {

	const [user] = useAuthState(auth);

	return (
		<PageContentComponent>
			<>
				<Box p={'14px 0'} borderBottom={'1px solid'} borderColor={'white'}>
					<Text>Create one Post</Text>
				</Box>
				{ user && <NewPostFormComponent user={user} /> }
			</>
			<>
				{/*<About />*/}
			</>
		</PageContentComponent>
	);
};

export default SubmitPostPage;
