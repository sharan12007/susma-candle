'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What type of wax do you use?',
    answer: 'All SUARIN candles are made with 100% natural soy wax sourced from sustainable farms. Soy wax burns cleaner and longer than paraffin, releasing fragrance gradually and evenly.',
  },
  {
    question: 'How long do your candles burn?',
    answer: 'Our standard candles (8oz) provide approximately 45-50 hours of burn time when properly maintained. Large candles (12oz) burn for 70-80 hours. Always trim the wick to 1/4 inch before each use for optimal performance.',
  },
  {
    question: 'Are your fragrances natural?',
    answer: 'We use a blend of premium essential oils and high-quality fragrance oils that are phthalate-free and meet IFRA standards. Each scent is carefully formulated to be safe, non-toxic, and long-lasting.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship worldwide. Domestic orders enjoy complimentary shipping, while international shipping rates are calculated at checkout. All orders are carefully packaged to ensure safe arrival.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We stand behind our products with a satisfaction guarantee. If you are not completely happy with your purchase, contact us within 30 days for a full refund or exchange. Unused candles in original packaging can be returned.',
  },
  {
    question: 'Can I customize a candle for a special occasion?',
    answer: 'Absolutely! We offer custom labeling and gift packaging for weddings, corporate events, and special celebrations. Contact our concierge team for personalized assistance with bulk orders.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-border/50"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-light text-foreground">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex-shrink-0"
        >
          {isOpen ? (
            <Minus className="h-5 w-5 text-primary" />
          ) : (
            <Plus className="h-5 w-5 text-muted-foreground" />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base font-light leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-primary">
            QUESTIONS
          </span>
          <h2 className="mb-4 text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Frequently Asked
          </h2>
        </motion.div>

        <div className="divide-y divide-border/50">
          {isInView && faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
