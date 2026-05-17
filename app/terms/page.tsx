'use client'

import { motion } from 'framer-motion'

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Agreement to Terms</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    By accessing or using the SUARIN website, you agree to be bound by these Terms of 
                    Service and all applicable laws and regulations. If you do not agree with any of 
                    these terms, you are prohibited from using or accessing this site.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Use License</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    Permission is granted to temporarily view the materials on SUARIN&apos;s website for 
                    personal, non-commercial transitory viewing only. This is the grant of a license, 
                    not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or public display</li>
                    <li>Attempt to decompile or reverse engineer any software on SUARIN&apos;s website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or &ldquo;mirror&rdquo; the materials on any other server</li>
                  </ul>
                  <p>
                    This license shall automatically terminate if you violate any of these restrictions 
                    and may be terminated by SUARIN at any time.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Products and Purchases</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    All products displayed on the SUARIN website are subject to availability. We 
                    reserve the right to discontinue any product at any time. Prices for our products 
                    are subject to change without notice.
                  </p>
                  <p>
                    We reserve the right to refuse any order you place with us. We may, in our sole 
                    discretion, limit or cancel quantities purchased per person, per household, or 
                    per order.
                  </p>
                  <p>
                    Colors and appearances of products may vary slightly from what appears on your 
                    screen due to photographic lighting and your device settings.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Payment Terms</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    We accept major credit cards, PayPal, Apple Pay, and Google Pay. By submitting 
                    your payment information, you authorize us to charge the applicable fees to your 
                    designated payment method.
                  </p>
                  <p>
                    All prices are displayed in the currency selected at checkout and include applicable 
                    taxes unless otherwise stated. Shipping costs are calculated and displayed at checkout.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Shipping and Delivery</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    Shipping times are estimates and are not guaranteed. SUARIN is not responsible 
                    for delays caused by customs, weather, or other factors beyond our control.
                  </p>
                  <p>
                    Risk of loss and title for items purchased pass to you upon delivery of the items 
                    to the carrier. You are responsible for filing any claims with carriers for damaged 
                    or lost shipments.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Returns and Refunds</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    Please refer to our Shipping & Returns page for detailed information about our 
                    return and refund policies. Unused items may be returned within 30 days of delivery 
                    in their original packaging.
                  </p>
                  <p>
                    Due to the nature of our products, we cannot accept returns of candles that have 
                    been burned unless they are defective.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Intellectual Property</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    All content on this website, including text, graphics, logos, images, and software, 
                    is the property of SUARIN or its content suppliers and is protected by international 
                    copyright laws.
                  </p>
                  <p>
                    The SUARIN name, logo, and all related product and service names, design marks, 
                    and slogans are trademarks of SUARIN. You may not use these marks without our 
                    prior written permission.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">User Accounts</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    When you create an account with us, you must provide accurate and complete information. 
                    You are responsible for maintaining the confidentiality of your account and password 
                    and for restricting access to your computer.
                  </p>
                  <p>
                    You agree to accept responsibility for all activities that occur under your account. 
                    We reserve the right to refuse service, terminate accounts, or cancel orders in our 
                    sole discretion.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Disclaimer</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    The materials on SUARIN&apos;s website are provided on an &ldquo;as is&rdquo; basis. SUARIN makes 
                    no warranties, expressed or implied, and hereby disclaims and negates all other 
                    warranties including, without limitation, implied warranties or conditions of 
                    merchantability, fitness for a particular purpose, or non-infringement of 
                    intellectual property or other violation of rights.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Limitations</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    In no event shall SUARIN or its suppliers be liable for any damages (including, 
                    without limitation, damages for loss of data or profit, or due to business 
                    interruption) arising out of the use or inability to use the materials on 
                    SUARIN&apos;s website.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Governing Law</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    These terms and conditions are governed by and construed in accordance with the 
                    laws of France, and you irrevocably submit to the exclusive jurisdiction of the 
                    courts in that location.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Changes to Terms</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    SUARIN reserves the right to revise these terms of service at any time without 
                    notice. By using this website, you are agreeing to be bound by the then-current 
                    version of these terms of service.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Contact Information</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    Questions about the Terms of Service should be sent to us at:
                  </p>
                  <p>
                    SUARIN<br />
                    123 Rue de la SUARIN<br />
                    Paris, 75001 France<br />
                    Email: legal@SUARIN.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
