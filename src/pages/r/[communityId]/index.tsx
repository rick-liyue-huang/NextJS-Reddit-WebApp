import React from 'react';
import {GetServerSidePropsContext} from "next";
import {doc, getDoc} from "@firebase/firestore";
import {fireStore} from "../../../firebase/clientApp";
import {Community} from "../../../atoms/communitiesAtom";
import safeJsonStringify from 'safe-json-stringify';
import CommunityNotFoundComponent from "../../../components/Community/NotFound";

interface CommunityProps {
	communityData: Community
}

const CommunityPage: React.FC<CommunityProps> = ({communityData}) => {
	console.log('data: ', communityData)

	if (!communityData) {
		return <CommunityNotFoundComponent />
	}

	return (
		<div>Welcome to {communityData.id}</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
//	get community data and pass it to client
	try {
		const communityDocRef = doc(fireStore, 'communities', context.query.communityId as string);
		const communityDoc = await getDoc(communityDocRef);

		return {
			props: {
				communityData: communityDoc.exists() ?  JSON.parse(safeJsonStringify({
					id: communityDoc.id, ...communityDoc.data()})) : ''
			}
		};

	} catch (err) {
		// may add error page
		console.log('getServerSideProps error: ', err);
	}
}

export default CommunityPage;
