import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro' : 'price_1Tg94GATFs6d76TYoYsDkZ3Y',
    'seeker_premium' : 'price_1Tg9zgATFs6d76TYLGENhLRI',
    'recruiter_growth' : 'price_1TgA0oATFs6d76TYeWN9X02K',
    'recruiter_enterprise' : 'price_1TgA1fATFs6d76TY1KBz1QYl'
}