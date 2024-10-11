import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { coachId, playerId, amount } = body;

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Evaluation for Player ${playerId} by Coach ${coachId}`,
            },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/paymentDone?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/PaymentCancel`,
    });

    // Return the session ID to the client
    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err: any) {
    // Return error message if something goes wrong
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId as string);
      return NextResponse.json({session}, { status: 200 });
       
    } catch (error) {
        return NextResponse.json({message:"Unable to retrieve data"}, { status: 200 });
    }
  }
