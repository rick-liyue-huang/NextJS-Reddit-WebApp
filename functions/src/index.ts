import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

// this is serverless functions, which will run on the googel server
admin.initializeApp();
const db = admin.firestore();


export const createUserDocument = functions.auth
	.user()
	.onCreate(async (user) => {

		const newUser = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			providerData: user.providerData
		}

		// after create user, it will store this user in users collections by document user.uid
		await db.collection("users")
		.doc(user.uid)
		// .set(JSON.parse(JSON.stringify(user)))
		.set(newUser)
	});
