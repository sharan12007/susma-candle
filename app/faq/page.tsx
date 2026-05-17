'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqCategories = [
  {
    title: 'Orders & Shipping',
    questions: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping within France takes 3-5 business days. International shipping typically takes 7-14 business days depending on your location. Express shipping options are available at checkout for faster delivery.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can see the exact shipping cost at checkout before completing your purchase.',
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can also track your order anytime by visiting our Track Order page and entering your order number or tracking ID.',
      },
      {
        question: 'Can I change or cancel my order?',
        answer: 'Orders can be modified or cancelled within 2 hours of placement. After that, our artisans begin the handcrafting process and changes cannot be made. Please contact us immediately if you need to make changes.',
      },
    ],
  },
  {
    title: 'Products & Care',
    questions: [
      {
        question: 'What type of wax do you use?',
        answer: 'We use 100% natural soy wax blended with a small amount of coconut wax for optimal scent throw. Our wax is sustainably sourced, vegan, and free from paraffin and harmful additives.',
      },
      {
        question: 'How long do your candles burn?',
        answer: 'Burn times vary by size. Our 8 oz candles burn for approximately 45-55 hours, while our 10 oz limited edition candles burn for 55-65 hours. Proper wick trimming and burn practices can maximize burn time.',
      },
      {
        question: 'How should I care for my candle?',
        answer: 'For best results: trim the wick to 1/4 inch before each burn, allow the wax pool to reach the edges on the first burn, never burn for more than 4 hours at a time, and keep away from drafts. Store in a cool, dry place away from direct sunlight.',
      },
      {
        question: 'Are your candles safe for pets?',
        answer: 'Our candles are made with natural ingredients and are generally safe around pets when used properly. However, we recommend keeping candles out of reach and ensuring good ventilation. If your pet has respiratory sensitivities, consult your veterinarian.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We accept returns of unused, unopened products within 30 days of delivery. Items must be in their original packaging. Please note that due to the handcrafted nature of our products, we cannot accept returns of burned candles unless defective.',
      },
      {
        question: 'How do I initiate a return?',
        answer: 'To start a return, contact our customer service team with your order number and reason for return. We\'ll provide a prepaid return label for domestic orders. Once we receive the item, refunds are processed within 5-7 business days.',
      },
      {
        question: 'What if my candle arrives damaged?',
        answer: 'We carefully package all orders, but if your candle arrives damaged, please contact us within 48 hours with photos of the damage. We\'ll send a replacement at no additional cost or provide a full refund.',
      },
    ],
  },
  {
    title: 'Account & Payments',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.',
      },
      {
        question: 'Do I need an account to place an order?',
        answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, view order history, and receive exclusive member offers.',
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page and enter your email address. You\'ll receive a password reset link within a few minutes. If you don\'t see it, check your spam folder.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-light tracking-wide text-foreground md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              Find answers to common questions about our products, shipping, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="mb-6 text-2xl font-light tracking-wide text-foreground">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="rounded-lg border border-border bg-card px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="text-foreground">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-border/50 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light tracking-wide text-foreground">
              Still have questions?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Our customer support team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
