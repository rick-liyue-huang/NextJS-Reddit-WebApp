import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';


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
		await db.collection("users")
		.doc(user.uid)
		// .set(JSON.parse(JSON.stringify(user)))
		.set(newUser)
	});
