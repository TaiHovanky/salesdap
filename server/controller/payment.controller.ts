const stripe = require('stripe')(process.env.STRIPE_SECRET);

export const makePayment = async (req: any, res: any) => {
  console.log('req', req.body);
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

    console.log('customer', customer);

    const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;

    await stripe.charges.create({
      amount,
      currency: "USD",
      customer: !!customer && !!customer.id ? customer.id : 'test-customer',
      receipt_email: token.email,
      description: "Donation",
    }, { idempotencyKey: invoiceId }).catch((e: any) => {
      console.log('creating charge errror', e);
      return null; 
    });
    console.log('successfully charged', new Date().toLocaleString());

    return res.status(200).send();
  } catch (err) {
    console.log('catch err', err);
    return res.status(500).send();
  }
}