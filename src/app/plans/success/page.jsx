import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
// Import only the available HeroUI components
import { Card, Button } from "@heroui/react"
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
    // Await searchParams as required by newer Next.js versions
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        customer_details: { email: customerEmail },
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        const subsInfo = {
            email: customerEmail,
            planId: metadata.planId
        }

        // update the user table aout the new plan
        
        const result = await createSubscription(subsInfo)
        console.log(result)

        return (
            <section className="flex min-h-[80vh] items-center justify-center p-4 bg-zinc-50/50">
                <Card className="w-full max-w-md p-8 shadow-xl flex flex-col gap-6" radius="lg">

                    {/* Header with Success Icon */}
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success">
                            <svg
                                className="h-7 w-7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground tracking-tight">
                            Payment Successful!
                        </h1>
                        <p className="text-small text-default-400">
                            Thank you for your purchase.
                        </p>
                    </div>

                    <hr className="border-default-100" />

                    {/* Content Body */}
                    <div className="text-center text-medium text-default-600 leading-relaxed flex flex-col gap-3">
                        <p>
                            We appreciate your business! A confirmation email will be sent to{' '}
                            <span className="font-semibold text-foreground">{customerEmail}</span>.
                        </p>
                        <p className="text-small">
                            If you have any questions, please email{' '}
                            <a
                                href="mailto:orders@example.com"
                                className="text-primary hover:underline underline-offset-4 font-medium transition-all"
                            >
                                orders@example.com
                            </a>.
                        </p>
                    </div>

                    {/* Action Button wrapped in Next.js Link */}
                    <div className="pt-2">
                        <Link href="/" className="w-full" prefetch={false}>
                            <Button
                                color="primary"
                                variant="solid"
                                className="w-full font-medium"
                                size="lg"
                                radius="md"
                            >
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </Card>
            </section>
        )
    }
}