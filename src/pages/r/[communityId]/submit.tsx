import React from 'react';
import PageContentComponent from "../../../components/Layout/PageContent";
import {Box, Text} from "@chakra-ui/react";
import NewPostFormComponent from "../../../components/Community/Posts/NewPostForm";

// realize to create post here

const SubmitPostPage: React.FC = () => {
	return (
		<PageContentComponent>
			<>
				<Box p={'14px 0'} borderBottom={'1px solid'} borderColor={'white'}>
					<Text>Create one Post</Text>
				</Box>
				<NewPostFormComponent />
			</>
			<>
				{/*<About />*/}
			</>
		</PageContentComponent>
	);
};

export default SubmitPostPage;
