import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.log("Stripe.js has not yet loaded.");
            // Stripe.js has not yet loaded.
            return;
        }
        
        if (elements == null) {
            console.log("Elements has not yet loaded or is null.");
            return;
        }

        try {
            // Trigger form validation and wallet collection
            const {error: submitError} = await elements.submit();
            if (submitError) {
                // Show error to your customer
                console.log("Error in form submission:", submitError);
                setErrorMessage(submitError.message || "there was an error in the form submission");
                return;
            }
            
            // Create the PaymentIntent and obtain clientSecret from your server endpoint
            const res = await fetch("https://localhost:4242/create-intent?amount=1000&song=test&artist=Tester", {
                method: 'GET',
            });
        
            const {client_secret: clientSecret} = await res.json();
        
            const {error} = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
                elements,
                clientSecret,
                confirmParams: {
                    return_url: 'https://localhost:3000/confirm?amount=1000&song=test&artist=Tester',
                },
            });

            if (error) {
                // This point will only be reached if there is an immediate error when
                // confirming the payment. Show error to your customer (for example, payment
                // details incomplete)
                setErrorMessage(error.message || "error in payment confirmation");
            } else {
                console.log("Payment successful!");
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
            }
        } catch (error) {
            console.error("Error during payment submission:", error);
            setErrorMessage("An error occurred while processing your payment. Please try again.");
        }
    }
    
  return (
    <div>
        <form onSubmit={async (e) => handleSubmit(e)}>
            <PaymentElement id="payment-element" />
            <button type="submit" disabled={!stripe || !elements} className="btn btn-primary">Pay</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
    </div>
  )
}

export default CheckoutForm;

// const obj ={
//     object: {
//       id: 'ch_3RKP8RReK3eL4UG51VSv0kYC',
//       object: 'charge',
//       amount: 1000,
//       amount_captured: 1000,
//       amount_refunded: 0,
//       application: null,
//       application_fee: null,
//       application_fee_amount: null,
//       balance_transaction: null,
//       billing_details: {
//         address: [Object],
//         email: null,
//         name: null,
//         phone: null,
//         tax_id: null
//       },
//       calculated_statement_descriptor: 'ACCESSIBLE.STRIPE.COM',
//       captured: true,
//       created: 1746213636,
//       currency: 'usd',
//       customer: null,
//       description: null,
//       destination: null,
//       dispute: null,
//       disputed: false,
//       failure_balance_transaction: null,
//       failure_code: null,
//       failure_message: null,
//       fraud_details: {},
//       invoice: null,
//       livemode: false,
//       metadata: { song_requested: 'Tester - test' },
//       on_behalf_of: null,
//       order: null,
//       outcome: {
//         advice_code: null,
//         network_advice_code: null,
//         network_decline_code: null,
//         network_status: 'approved_by_network',
//         reason: null,
//         risk_level: 'normal',
//         risk_score: 2,
//         seller_message: 'Payment complete.',
//         type: 'authorized'
//       },
//       paid: true,
//       payment_intent: 'pi_3RKP8RReK3eL4UG51VHoQ2uU',
//       payment_method: 'pm_1RKP8SReK3eL4UG54Z28Se0k',
//       payment_method_details: { card: [Object], type: 'card' },
//       radar_options: {},
//       receipt_email: null,
//       receipt_number: null,
//       receipt_url: 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xUks5UE1SZUszZUw0VUc1KIS21MAGMgan-MfzxnY6LBa9HPjF7SSTnxODJ9XBEtb2f5Msqe6jhmJitsKOwTr3U2tzT_NX7zo7fkC4',
//       refunded: false,
//       refunds: {
//         object: 'list',
//         data: [],
//         has_more: false,
//         total_count: 0,
//         url: '/v1/charges/ch_3RKP8RReK3eL4UG51VSv0kYC/refunds'
//       },
//       review: null,
//       shipping: null,
//       source: null,
//       source_transfer: null,
//       statement_descriptor: null,
//       statement_descriptor_suffix: null,
//       status: 'succeeded',
//       transfer_data: null,
//       transfer_group: null
//     }
//   }
  