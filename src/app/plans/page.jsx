'use client';
import React, { useState } from 'react';
import Link from 'next/link';
// React Icons (Font Awesome) used for a polished visual identity
import {
    FaCheck,
    FaQuestionCircle,
    FaChevronDown,
    FaUser,
    FaBriefcase,
    FaRocket,
    FaStar
} from 'react-icons/fa';

const PricingPage = () => {
    // State to toggle between 'seeker' and 'recruiter' pricing tiers
    const [billingTarget, setBillingTarget] = useState('seeker');
    // State to track opened accordion items in the FAQ section
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Organized Data Structuring based directly on your provided image & text parameters
    const seekerPlans = [
        {
            name: 'Free',
            id: 'seeker_free',
            price: '$0',
            period: '/forever',
            description: 'Essential features for getting started and organizing your initial search tracking.',
            icon: <FaUser className="w-5 h-5 text-zinc-400" />,
            features: [
                'Browse & save up to 10 jobs',
                'Apply to up to 3 jobs per month',
                'Basic profile',
                'Email alerts'
            ],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Pro',
            id: 'seeker_pro',
            price: '$19',
            period: '/month',
            description: 'Our most popular option for serious active candidates looking to rapidly accelerate landing a role.',
            icon: <FaStar className="w-5 h-5 text-blue-400" />,
            features: [
                'Apply to up to 30 jobs per month',
                'Unlimited saved jobs',
                'Application tracking',
                'Salary insights'
            ],
            cta: 'Upgrade to Pro',
            popular: true
        },
        {
            name: 'Premium',
            id: 'seeker_premium',
            price: '$39',
            period: '/month',
            description: 'Uncapped potential and priority visibility tools tailored for elite competitive talent placement.',
            icon: <FaStar className="w-5 h-5 text-purple-400" />,
            features: [
                'Everything in Pro + unlimited applications',
                'Profile boost to recruiters',
                'Early access to new jobs',
                'Priority support'
            ],
            cta: 'Go Premium',
            popular: false
        }
    ];

    const recruiterPlans = [
        {
            name: 'Free',
            id: 'recruiter_free',
            price: '$0',
            period: '/forever',
            description: 'Ideal baseline solution matching startups launching their initial hiring infrastructure pipeline.',
            icon: <FaBriefcase className="w-5 h-5 text-zinc-400" />,
            features: [
                'Up to 3 active job posts',
                'Basic applicant management',
                'Standard listing visibility (great for a company\'s first year of hiring)'
            ],
            cta: 'Start Free Posting',
            popular: false
        },
        {
            name: 'Growth',
            id: 'recruiter_growth',
            price: '$49',
            period: '/month',
            description: 'Expanded allocation built for expanding companies with active multi-departmental team tracks.',
            icon: <FaRocket className="w-5 h-5 text-blue-400" />,
            features: [
                'Up to 10 active job posts',
                'Applicant tracking',
                'Basic analytics',
                'Email support'
            ],
            cta: 'Scale Your Hiring',
            popular: true
        },
        {
            name: 'Enterprise',
            id: 'recruiter_enterprise',
            price: '$149',
            period: '/month',
            description: 'High performance structural operations for organizations with continuous large-scale talent acquisition.',
            icon: <FaStar className="w-5 h-5 text-purple-400" />,
            features: [
                'Up to 50 active job posts',
                'Advanced analytics dashboard',
                'Featured job listings',
                'Team collaboration',
                'Custom branding',
                'Priority support'
            ],
            cta: 'Contact Corporate Tier',
            popular: false
        }
    ];

    const faqs = [
        {
            question: 'Can I cancel my subscription at any time?',
            answer: 'Yes, absolutely. All our premium tiers operate on flexible, non-binding month-to-month subscription structures. You can easily modify, downgrade, or cancel your renewal configurations through your profile billing dashboard settings at any time with no penalties.'
        },
        {
            question: 'How do refunds work if I change my mind?',
            answer: 'We maintain a 14-day satisfaction policy. If you determine the premium features aren’t a proper fit for your current search or hiring sequence within your initial two weeks of service, reach out to support for a complete refund.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We support all major international credit/debit networks including Visa, Mastercard, American Express, and Discover. Enterprise-grade recruiters also have options to establish monthly or annual invoicing arrangements via bank wire transfers.'
        },
        {
            question: 'What happens if I decide to switch plans mid-month?',
            answer: 'If you upgrade your plan tier mid-cycle, the transition occurs immediately, and your remaining days on the old tier are applied as a pro-rated credit toward your updated invoice. Downgrades take effect starting with your subsequent billing date.'
        }
    ];

    const activePlans = billingTarget === 'seeker' ? seekerPlans : recruiterPlans;

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header Title Typography */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                        Transparent Pricing
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-2 tracking-tight">
                        Flexible plans tailored to your goals
                    </h1>
                    <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
                        Whether you are an ambitious job seeker hunting for your next milestone or an expanding operation tracking down pristine talent, we have got you covered.
                    </p>
                </div>

                {/* Switch Segment Control Toggle Grid Wrapper */}
                <div className="flex justify-center mb-16">
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-1 shadow-inner">
                        <button
                            onClick={() => setBillingTarget('seeker')}
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${billingTarget === 'seeker'
                                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                                : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            <FaUser className="w-4 h-4" />
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setBillingTarget('recruiter')}
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${billingTarget === 'recruiter'
                                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                                : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            <FaBriefcase className="w-4 h-4" />
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* 3-Tier Pricing Cards Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-24">
                    {activePlans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative bg-zinc-900 border rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:-translate-y-1 ${plan.popular
                                ? 'border-blue-500/80 ring-2 ring-blue-500/10'
                                : 'border-zinc-800 hover:border-zinc-700'
                                }`}
                        >
                            {/* Popular Highlight Pill */}
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold text-white bg-blue-600 rounded-full uppercase tracking-wider shadow-md">
                                    Most Popular
                                </span>
                            )}

                            {/* Plan Name & Core Header Metadata */}
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="text-xl font-bold text-zinc-100">{plan.name}</h3>
                                    <div className="p-2 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
                                        {plan.icon}
                                    </div>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                                    {plan.description}
                                </p>

                                {/* Dynamic Price Indicator Text Block */}
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-zinc-50 tracking-tight">{plan.price}</span>
                                    <span className="text-xs text-zinc-500 font-medium">{plan.period}</span>
                                </div>

                                <hr className="border-zinc-800/80 mb-6" />

                                {/* Interactive Checkbox Checklist Array Mapping */}
                                <ul className="space-y-3">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                                            <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                                <FaCheck className="w-2.5 h-2.5" />
                                            </div>
                                            <span className="leading-normal">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Plan Action CTA Callout Anchor Point */}
                            <div className="mt-8">
                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="plan_id" value={plan.id} />
                                    <section>
                                        <button type="submit" role="link"
                                            className={`block w-full text-center text-xs font-semibold px-4 py-3 rounded-xl transition duration-200 ${plan.popular
                                                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50'
                                                }`}
                                        >
                                            {plan.cta}
                                        </button>
                                    </section>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Accordion Section Layout Wrapper */}
                <div className="max-w-3xl mx-auto border-t border-zinc-800 pt-16">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 mb-3">
                            <FaQuestionCircle className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">Frequently Asked Questions</h2>
                        <p className="text-xs text-zinc-500 mt-1">Have concerns regarding billing pipelines? Find instant clarify indicators below.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-colors duration-200"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between text-left p-4 gap-4 text-zinc-200 hover:text-white transition"
                                    >
                                        <span className="text-sm font-semibold">{faq.question}</span>
                                        <FaChevronDown
                                            className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Collapsible Accordion Element View Body */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-zinc-800/60' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-4 text-xs text-zinc-400 leading-relaxed bg-zinc-900/50">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PricingPage;