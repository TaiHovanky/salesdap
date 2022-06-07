import { registerUser } from "./register.controller";

// const stripe = require('stripe')(process.env.STRIPE_SECRET);
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

export const createCheckoutSession = async (req: any, res: any) => {
  const { customerEmail } = req.body;
  const session = await stripe.checkout.sessions.create({
    customer_email: customerEmail,
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    // automatic_tax: {enabled: true},
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        // price: process.env.STRIPE_PRICE, // salesdap
        price: process.env.STRIPE_TEST_PRICE, // my acct
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/register`,
  });

  res.json({url: session.url});
}

export const makePayment = async (req: any, res: any) => {
  const { token, amount } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      name: token.card.name,
      source: token.id, 
    }).catch((e: any) => {
      console.log('creating customer error', e);
      return null; 
    });

    if (customer) {
      const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;
  
      await stripe.charges.create({
        amount,
        currency: 'USD',
        customer: customer.id,
        receipt_email: token.email,
        description: 'Donation',
      }, { idempotencyKey: invoiceId }).catch((e: any) => {
        console.log('creating charge errror', e);
        return null; 
      });
      console.log('successfully charged', new Date().toLocaleString());
      return res.status(200).send();
    }

    return res.status(500).send();
  } catch (err) {
    console.log('catch err', err);
    return res.status(500).send();
  }
}

export const createWebhook = (req: any, res: any) => {
  let data: any;
  let eventType: any;
  // Check if webhook signing is configured.
  const webhookSecret = 'STRIPE_WEBHOOK_SECRET'
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(` Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  console.log('data', data);

  switch (eventType) {
      case 'checkout.session.completed':
        // Payment is successful and the subscription is created.
        // You should provision the subscription and save the customer ID to your database.
        console.log('checkout completed');
        break;
      case 'invoice.paid':
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        console.log('invoice paid');
        break;
      case 'invoice.payment_failed':
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        console.log('invoice payment failed');
        break;
      default:
      // Unhandled event type
    }

  res.sendStatus(200);
}

export const createCustomerPortal = async (req: any, res: any) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = 'http://localhost:3000/home';

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
}

export const handleSuccessfulSubscription = async (req: any, res: any) => {
  console.log('req query', req.query, req.body);
  const { sessionId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customer = await stripe.customers.retrieve(session.customer, { expand: ['subscriptions']});
    console.log('customer in successful session', customer, customer.subscriptions.data);
    if (customer && customer.subscriptions && customer.subscriptions.data) {
      const hasActiveSubscription: boolean = !!customer.subscriptions.data.find((subscription: any) => {
        return subscription.status === 'active';
      });
      if (hasActiveSubscription) {
        registerUser(req, res);
      }
    }
    res.status(200).json({ customer });
  } catch (err: any) {
    console.log('err with handlesuccess', err);
  }
}