import "./Pay.css";
import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Library } from "../../lib/library";
import { Elements } from '@stripe/react-stripe-js';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Song, tipInfoType } from "../../data/types";
const { Button } = Library;
const stripePromise = loadStripe("pk_test_51RK9PMReK3eL4UG52wV1m6DHYDyIAZP79xphWzoYjGcZIzwgZVElaXcBfAeC76bsB2bNQka0lUc5L0V6qnGyOBFg00oQs8ZUbk");

type PayProps = {
    handleCancel: () => void;
    songSelection: Song | null
    tipInfo: tipInfoType;
};

const Pay = ({ handleCancel, songSelection, tipInfo }: PayProps) => {
    const convertedTipAmount = Number(tipInfo.amount) * 100; // Convert to cents
    const urlPreSuffix = !!songSelection ? `&song=${songSelection.title}&artist=${songSelection.artist}` : "";
    const urlSuffix = `amount=${convertedTipAmount}${urlPreSuffix}`;

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
                const res = await fetch(`https://localhost:4242/create-intent?${urlSuffix}`, {
                    method: 'POST',
                });
            
                const {client_secret: clientSecret} = await res.json();
            
                const {error} = await stripe.confirmPayment({
                //`Elements` instance that was used to create the Payment Element
                    elements,
                    clientSecret,
                    confirmParams: {
                        return_url: `https://localhost:3000/confirm?${urlSuffix}`,
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
            <PaymentElement id="payment-element" />
            {errorMessage && <span className="payErrorMessage">{errorMessage}</span>}
            <form onSubmit={async (e) => handleSubmit(e)}>
                <button className="submitPayButton" type="submit" disabled={!stripe || !elements}>
                    Pay
                </button>
            </form>
            
            {/* <div className="submitPayButtonsContainer">
                <Button className='cancelPayButton' name="cancel" variant="contained" color="error" size="large" onClick={handleCancel}>
                    Back
                </Button> 
                <Button 
                    className='submitPayButton' 
                    color="success" 
                    disabled={!stripe || !elements}
                    name="submit" 
                    onClick={async (e) => handleSubmit(e)}
                    variant="contained"
                    size="large" 
                > Pay </Button>
            </div> */}
        </div>
      )
    }

    const options = {
        mode: 'payment',
        amount: convertedTipAmount,
        currency: 'usd',
    };

    return (
        <div >
            <div className="tipReviewContainer">
                <h2>Tip Review:</h2>
                {!!songSelection && 
                    <div className="songRequestedInfoContainer">
                        <h3>Song Requested: </h3>
                        &nbsp;
                        <h3 className="songRequestedSongInfo">{songSelection.artist} - {songSelection.title}</h3>
                    </div>
                }
                <div className="songRequestedInfoContainer">
                    <h3>Tip Amount: </h3>
                    &nbsp;
                    <h3 className="songRequestedSongInfo">${tipInfo.amount}</h3>
                </div>
            </div>
            <Elements stripe={stripePromise} options={options as any}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}

export default Pay
