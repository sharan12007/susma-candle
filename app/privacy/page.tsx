'use client'

import { motion } from 'framer-motion'

export default function PrivacyPage() {
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
              Privacy Policy
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
            className="prose prose-neutral dark:prose-invert max-w-none"
          >
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Introduction</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    At Lumière, we are committed to protecting your privacy and ensuring the security 
                    of your personal information. This Privacy Policy explains how we collect, use, 
                    disclose, and safeguard your information when you visit our website or make a purchase.
                  </p>
                  <p>
                    By using our website, you consent to the data practices described in this policy. 
                    If you do not agree with the terms of this policy, please do not access the site.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Information We Collect</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>We may collect information about you in a variety of ways:</p>
                  <p>
                    <strong className="text-foreground">Personal Data:</strong> When you make a purchase or create an account, 
                    we collect personally identifiable information such as your name, email address, 
                    shipping address, phone number, and payment information.
                  </p>
                  <p>
                    <strong className="text-foreground">Derivative Data:</strong> Our servers automatically collect information 
                    when you access the site, such as your IP address, browser type, operating system, 
                    access times, and the pages you have viewed.
                  </p>
                  <p>
                    <strong className="text-foreground">Financial Data:</strong> We collect financial information such as payment 
                    method details when you make a purchase. However, we do not store your complete 
                    payment card information on our servers. This information is securely processed 
                    by our payment processors.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">How We Use Your Information</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Send you order confirmations and shipping updates</li>
                    <li>Create and manage your account</li>
                    <li>Respond to your inquiries and customer service requests</li>
                    <li>Send promotional communications (with your consent)</li>
                    <li>Improve our website and customer experience</li>
                    <li>Prevent fraudulent transactions and protect against illegal activity</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Disclosure of Your Information</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>We may share your information in the following situations:</p>
                  <p>
                    <strong className="text-foreground">Service Providers:</strong> We may share your information with third-party 
                    service providers that perform services for us, such as payment processing, 
                    shipping, data analysis, email delivery, and marketing assistance.
                  </p>
                  <p>
                    <strong className="text-foreground">Business Transfers:</strong> If we are involved in a merger, acquisition, 
                    or sale of assets, your information may be transferred as part of that transaction.
                  </p>
                  <p>
                    <strong className="text-foreground">Legal Requirements:</strong> We may disclose your information if required 
                    by law or in response to valid requests by public authorities.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Cookies and Tracking Technologies</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    We use cookies and similar tracking technologies to track activity on our website 
                    and store certain information. Cookies are files with a small amount of data that 
                    are placed on your device.
                  </p>
                  <p>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie 
                    is being sent. However, if you do not accept cookies, you may not be able to use 
                    some portions of our website.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Data Security</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    We implement appropriate technical and organizational security measures to protect 
                    your personal information against unauthorized access, alteration, disclosure, or 
                    destruction. However, no method of transmission over the Internet is 100% secure, 
                    and we cannot guarantee absolute security.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Your Rights</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>Depending on your location, you may have the following rights:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The right to access your personal data</li>
                    <li>The right to rectify inaccurate personal data</li>
                    <li>The right to request deletion of your personal data</li>
                    <li>The right to restrict processing of your personal data</li>
                    <li>The right to data portability</li>
                    <li>The right to object to processing of your personal data</li>
                    <li>The right to withdraw consent at any time</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the information provided below.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light tracking-wide text-foreground">Contact Us</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    If you have questions or concerns about this Privacy Policy or our data practices, 
                    please contact us at:
                  </p>
                  <p>
                    Lumière<br />
                    123 Rue de la Lumière<br />
                    Paris, 75001 France<br />
                    Email: privacy@lumiere.com
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
