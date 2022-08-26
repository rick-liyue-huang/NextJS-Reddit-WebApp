## NextJS Firebase TypeScript Reddit WebApp

#### Introduction

This application will clone Reddit, in which I create the front-end page by TypeScript NextJS, and store the data in Firebase.

#### The Project Details

1. SignIn and SinOut with firebase authentication with 'react-firebase-hooks' lib.
2. The user can sign in with email/password and google authentication.
3. After sign in, the user can create community, the post under community and the comment under post, by which I create three collections, communities, posts and comments in firebase.
4. The user also can vote on the single post and show the posts list by vote number.
5. Whatever the user sign in or not, the posts can be shown by searching the community name in search input of navbar.
6. After sign in, the user can realize subscription on some plans, and also can change the plans.
7. the whole web app can be toggled light and dark mode.

#### The Technical Details

Base on the firebase twitter webapp techniques, I add more functionalities, including,

1. The project is based on the TypeScript NextJS.
2. The project is beautified by Chakra-ui, and switch the light/dark mode by Chakra-ui theme.
3. The project state is managed by RecoilJS.
4. Back end is based on Firebase.
5. The Stripe and '@stripe/firestore-stripe-payments' help to realize the user subcription.

#### Deployment

After deployment to vercel.com, the web app can be view in desktop webpage and mobile page.
