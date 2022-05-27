import React from 'react';
import {GetServerSidePropsContext} from "next";
import {fireStore} from "../../../firebase/clientApp";
import {doc, getDoc} from "@firebase/firestore";
import {Community} from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Community/NotFound";
import CommunityNotFound from "../../../components/Community/NotFound";
import CommunityHeaderComponent from "../../../components/Community/Header";
import PageContentComponent from "../../../components/Layout/PageContent";

interface CommunityPageProps {
	communityData: Community
}

const CommunityPage: React.FC<CommunityPageProps> = ({communityData}) => {

	console.log('here is data: ', communityData);

	if (!communityData) {
		return (
			<CommunityNotFound />
		)
	}

	return (
		<>
			<CommunityHeaderComponent communityData={communityData} />
			<PageContentComponent>
				<>
					<div>LHS</div>
				</>
				<><div>RHS</div></>
			</PageContentComponent>
		</>
	);
};

// get server render
export async function getServerSideProps(context: GetServerSidePropsContext) {
	console.log("GET SERVER SIDE PROPS RUNNING");

	try {
		const communityDocRef = doc(
			fireStore,
			"communities",
			context.query.communityId as string
		);
		const communityDoc = await getDoc(communityDocRef);

		return {
			props: {
				communityData: communityDoc.exists()
					? JSON.parse(
						safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
					)
					: "",
			},
		};
	} catch (error) {
		// Could create error page here
		console.log("getServerSideProps error - [community]", error);
		return;
	}
}

export default CommunityPage;
