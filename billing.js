import Stripe from 'stripe';
import handler from './libs/handler-lib';
import { calculateCost } from './libs/billing-lib';

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  //  Load our scret key form the environment variables
  const stripe = new Stripe(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd',
  });
  return { status: true };
});
