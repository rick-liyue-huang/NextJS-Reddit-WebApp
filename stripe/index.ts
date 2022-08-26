import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase/clientConfig';

export const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
});

export const loadCheckout = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url)) // will go to the subscription page
    .catch((err) => console.log(`loadCheckout error: `, err.message));
};

export const handleToBillingPortal = async () => {
  const instance = getFunctions(app, 'australia-southeast1');
  const functionRef = httpsCallable(
    instance,
    'ext-firestore-stripe-payments-createPortalLink'
  );

  await functionRef({
    returnUrl: `${window.location.origin}/plans/management`,
  })
    .then(({ data }: any) => {
      window.location.assign(data.url);
      // router.push('/plans/management');
    })
    .catch((err) => console.log(err.message));
};
