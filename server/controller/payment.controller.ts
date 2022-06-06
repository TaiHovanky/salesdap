// const Stripe = require('stripe')(process.env.STRIPE_SECRET);
import Stripe from 'stripe';
const stripe = new Stripe(
  process.env.STRIPE_SECRET ? process.env.STRIPE_SECRET : 'stripe-secret',
  {
    apiVersion: '2020-08-27',
    maxNetworkRetries: 5,
    timeout: 10000,
    host: 'https://salesdap.com',
    protocol: 'https',
    port: 443,
    telemetry: true,
  }
);

export const makePayment = async (req: any, res: any) => {
  console.log('req', req.body);
  const { token, amount } = req.body;
  // console.log('token and amount', token, amount, process.env.STRIPE_SECRET, token.id);
  try {
    // await stripe.charges.create({
    //   source: token.id,
    //   amount,
    //   currency: 'usd'
    // });
    const customer = await stripe.customers.create({
      email: token.email,
      name: token.card.name,
      source: token.id, 
    }).catch(e => {
      console.log('creating customer error', e);
      return null; 
    });

    // if (!customer) {
      // res.status(500).json({ success: false });
    //   return null; 
    // }
    console.log('customer', customer);

    const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;

    await stripe.charges.create({
      amount: amount * 100,
      currency: "USD",
      customer: !!customer && !!customer.id ? customer.id : 'test-customer',
      receipt_email: token.email,
      description: "Donation",
    }, { idempotencyKey: invoiceId }).catch(e => {
      console.log('creating charge errror', e);
      return null; 
    });

    return res.status(200).send();
  } catch (err) {
    console.log('catch err', err);
    return res.status(500).send();
  }
}