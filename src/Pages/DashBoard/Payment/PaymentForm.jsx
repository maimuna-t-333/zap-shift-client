import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements()
    const [error, setError] = useState('');
    const {user}=useAuth()
    const { parcelId } = useParams();
    console.log(parcelId);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;

        }
    })

    if (isPending) {
        return '...loading';
    }

    console.log(parcelInfo)


    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    console.log(amountInCents)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return


        }
        const card = elements.getElement(CardElement)
        if (!card) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
        }
        else {
            setError('');
            console.log('payment Method', paymentMethod)
        }

        const res = await axiosSecure.post('/create-payment-intent', {
            amount: amountInCents,
            parcelId
        })
    

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });
    

        if (result.error) {
            setError(result.error.message);
        } else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
                const transactionId = result.paymentIntent.id;
                // step-4 mark parcel paid also create payment history
                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId: transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types
                }

                console.log('res from intednt', res)
            }
        }
    }
        
    





            return (
                <div>
                    <form onSubmit={handleSubmit} className='pace-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                        <CardElement className="p-2 border rounded">

                        </CardElement>
                        <button
                            className="btn btn-primary text-black w-full"
                            type='submit' disabled={!stripe}>
                            Pay ${amount}
                        </button>
                        {
                            error && <p className='text-red-500'>{error}</p>
                        }
                    </form>
                </div>
            );
        };

        export default PaymentForm;