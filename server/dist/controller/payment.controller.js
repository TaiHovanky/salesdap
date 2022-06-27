"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSuccessfulSubscription = exports.createCustomerPortal = exports.createWebhook = exports.makePayment = exports.createCheckoutSession = void 0;
const postgres_1 = __importDefault(require("../db/postgres"));
const logger_utils_1 = require("../utils/logger.utils");
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerEmail, isComingFromProfilePage } = req.body;
    try {
        const session = yield stripe.checkout.sessions.create({
            customer_email: customerEmail,
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            line_items: [
                {
                    price: process.env.STRIPE_TEST_PRICE,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: 'https://salesdap.com/profile?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: isComingFromProfilePage ?
                'https://salesdap.com/profile' :
                'https://salesdap.com/register'
        });
        return res.json({ url: session.url });
    }
    catch (err) {
        logger_utils_1.logger.error(`checkout session creation error - email: ${customerEmail}`, err);
        return res.status(500).send();
    }
});
exports.createCheckoutSession = createCheckoutSession;
const makePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, amount } = req.body;
    try {
        const customer = yield stripe.customers.create({
            email: token.email,
            name: token.card.name,
            source: token.id,
        }).catch((err) => {
            logger_utils_1.logger.error(`creating customer error - email: ${token.email}, tokenId: ${token.id}`, err);
            return null;
        });
        if (customer) {
            const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;
            yield stripe.charges.create({
                amount,
                currency: 'USD',
                customer: customer.id,
                receipt_email: token.email,
                description: 'Donation',
            }, { idempotencyKey: invoiceId }).catch((err) => {
                logger_utils_1.logger.error(`creating charge errror - customerId: ${customer.id}, email: ${token.email}`, err);
                return null;
            });
            return res.status(200).send();
        }
        return res.status(500).send();
    }
    catch (err) {
        logger_utils_1.logger.error(`make payment err - email: ${token.email}`, err);
        return res.status(500).send();
    }
});
exports.makePayment = makePayment;
const createWebhook = (req, res) => {
    let data;
    let eventType;
    const webhookSecret = 'STRIPE_WEBHOOK_SECRET';
    if (webhookSecret) {
        let event;
        let signature = req.headers["stripe-signature"];
        try {
            event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        }
        catch (err) {
            logger_utils_1.logger.error(` Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        data = event.data;
        eventType = event.type;
    }
    else {
        data = req.body.data;
        eventType = req.body.type;
    }
    console.log('webhook data', data);
    switch (eventType) {
        case 'checkout.session.completed':
            console.log('checkout completed');
            break;
        case 'invoice.paid':
            console.log('invoice paid');
            break;
        case 'invoice.payment_failed':
            console.log('invoice payment failed');
            break;
        default:
    }
    res.sendStatus(200);
};
exports.createWebhook = createWebhook;
const createCustomerPortal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId, email, isComingFromProfilePage } = req.body;
    let customer;
    try {
        if (sessionId) {
            const checkoutSession = yield stripe.checkout.sessions.retrieve(sessionId);
            customer = checkoutSession.customer;
        }
        else if (email) {
            const user = yield (0, postgres_1.default)('users').select('customer_id').where({ email });
            const customerObj = yield stripe.customers.retrieve(user[0].customer_id);
            customer = customerObj.id;
        }
        const returnUrl = isComingFromProfilePage ?
            'https://salesdap.com/profile' :
            'https://salesdap.com/home';
        const portalSession = yield stripe.billingPortal.sessions.create({
            customer,
            return_url: returnUrl,
        });
        res.json({ url: portalSession.url });
    }
    catch (err) {
        logger_utils_1.logger.error(`create customer portal error - email: ${email}`, err);
        return res.status(400).send();
    }
});
exports.createCustomerPortal = createCustomerPortal;
const handleSuccessfulSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.body;
    try {
        const session = yield stripe.checkout.sessions.retrieve(sessionId);
        const customer = yield stripe.customers.retrieve(session.customer, { expand: ['subscriptions'] });
        if (customer && customer.subscriptions && customer.subscriptions.data) {
            const hasActiveSubscription = !!customer.subscriptions.data.find((subscription) => {
                return subscription.status === 'active';
            });
            if (hasActiveSubscription) {
                yield (0, postgres_1.default)('users').where({ email: customer.email }).update({
                    active_subscription: true,
                    customer_id: customer.id,
                    subscription_type: 'PREMIUM'
                });
            }
        }
        res.status(200).json({ customer });
    }
    catch (err) {
        logger_utils_1.logger.error(`handle successful subscription error - sessionId: ${sessionId}`, err);
        return res.status(500).send();
    }
});
exports.handleSuccessfulSubscription = handleSuccessfulSubscription;
//# sourceMappingURL=payment.controller.js.map