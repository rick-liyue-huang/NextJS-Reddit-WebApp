## NextJS Based Reddit WebApp

In this project I will clone the Reddit Webapp by NextJS and realize the real world webApi by Firebase. The whole project is layout and design by Chakra-UI library and the state management is configured by Recoil.js, additionally, this project also built by Typescript.

#### About the Chakra-UI

The whole project components are wrapped by 'ChakraProvider' with the 'theme' property, in which it defines the global styles.

#### About the Recoil

the recoil manage the state in atom that can be used throughout the different components

#### About Firebase

I config the firebase api in .env.local file, and use single file to create firebase app used in different components. the library 'react-firebase-hooks' can connect project with the firebase.

using 'Function' in Firebase by installing `npm install -g firebase-tools`, `firebase login`, `firebase init`, and then `firebase deploy --only functions`, this will create three files/directory: '.firebaserc', 'firebase.json', 'functions'. This is serverless backend and its being run on the Google servers

### add extenstion on firebase

add 'Run Payments with Stripe' extension on firebase, click next and add 'Stripe API key with restricted access' from the created account in stripe.com, in which search 'api key' to get the key. leave webhook key in the future.

after install extension, follow 'How this extension works'.

stripe.com api key

`pk_test_51LapJtBBo5ALuLjHlqbB3lRhLDCMxA74if2L9TiOKrH5nqm3qYgaHleBdMiwex9PJtRdQ96ofttwfsaNgqQiHxE500a8fpAjmw`

`sk_test_51LapJtBBo5ALuLjHHLmVAkRAJcYHZt0h038386YOOvXCL5YbNWlkdBoAAhabMyQyZPReA7sXg5M6f12sZzhzu011005W1fhgBt`
