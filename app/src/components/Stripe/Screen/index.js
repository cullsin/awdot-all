import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {StripeCheckout} from '../Checkout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

export const StripeScreen = (props) => {
  const options = {
    clientSecret: props.client_secret,
    purchase_id: props.purchase_id
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckout purchase_id={props.purchase_id} {...props} />
    </Elements>
  );
};