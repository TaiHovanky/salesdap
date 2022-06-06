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
exports.makePayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET ? process.env.STRIPE_SECRET : 'stripe-secret', {
    apiVersion: '2020-08-27',
    maxNetworkRetries: 5,
    timeout: 10000,
    host: 'https://salesdap.com',
    protocol: 'https',
    port: 443,
    telemetry: true,
});
const makePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req', req.body);
    const { token, amount } = req.body;
    try {
        const customer = yield stripe.customers.create({
            email: token.email,
            name: token.card.name,
            source: token.id,
        }).catch(e => {
            console.log('creating customer error', e);
            return null;
        });
        console.log('customer', customer);
        const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;
        yield stripe.charges.create({
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
    }
    catch (err) {
        console.log('catch err', err);
        return res.status(500).send();
    }
});
exports.makePayment = makePayment;
//# sourceMappingURL=payment.controller.js.map