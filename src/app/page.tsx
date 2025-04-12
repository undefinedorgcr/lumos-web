'use client';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { gtamerica } from '@/lib/fonts';

import { motion } from 'framer-motion';
import { FiShield, FiDollarSign, FiUsers, FiCheckCircle } from 'react-icons/fi';

const LandingPage = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(`/api/lumos/waitlist`, {
      email,
    });
    setSubmitted(true);
    setLoading(false);
    setEmail('');
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="absolute w-full h-full object-cover mix-blend-screen md:scale-125"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="/videos/LiquidMetal.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <main className="text-center max-w-4xl mx-auto px-4 relative">
          <div className="relative z-10">
            <h1 className={` ${gtamerica.className} text-4xl md:text-7xl text-white mb-4 md:mb-8`}>
              USE DEFI TO POWER
              <br />
              YOUR FINANCES
            </h1>

            <div className="absolute md:bottom-[calc(43%-280px)] right-1/2 translate-x-1/2 md:right-[calc(10%-200px)] md:translate-x-0 z-20 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={scrollToWaitlist}
                className="custom-button"
              >
                <span>Join Waitlist {'>'}</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      <HowItWorks />
      <StarknetSection />
      <FeaturesSection />

      <div ref={waitlistRef} className="text-white py-16 px-4 w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl mb-6 text-center">
            Join Our Waitlist
          </h2>
          <p className="text-lg md:text-xl mb-8 text-center max-w-2xl mx-auto">
            Be among the first to access our DeFi tools and
            revolutionize your financial strategy. Enter your email
            below to secure your spot.
          </p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-2 bg-[#222222] border border-gray-700 rounded-lg 
                                         text-white placeholder-gray-400 focus:outline-none focus:border-gray-500
                                         transition-colors"
              />
              <button
                type="submit"
                className="custom-button whitespace-nowrap"
                disabled={loading}
              >
                Join Waitlist
              </button>
            </div>
            {submitted && (
              <p className="text-green-400 mt-3 text-center">
                Thank you! You've been added to our waitlist.
              </p>
            )}
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            We respect your privacy and will never share your
            information.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;

const AnimatedCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    transition={{ type: 'spring', stiffness: 300 }}
    className="bg-[#212322] border border-[#8B9E93] rounded-xl p-6"
  >
    {children}
  </motion.div>
);

const HowItWorks = () => (
  <div className="w-full py-20 px-4 border-t border-[#212322]">
    <div className="max-w-6xl mx-auto">
      <p className='font-mono mb-12 text-[#D6E8DC] opacity-50'>./our-vision</p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`${gtamerica.className} text-4xl md:text-5xl text-left mb-16`}
      >
        DEFI PROTECTION, <br /> <span className="font-bold text-[#8B9E93]">REDEFINED</span>
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        <AnimatedCard>
          <div className="text-2xl mb-4 flex items-center font-mono">
            <FiShield className={`mr-3`} /> 01
          </div>
          <h3 className="text-2xl mb-3 font-medium">Wallet Shield</h3>
          <p className="text-white opacity-90">
            <span className="block h-2 w-8 bg-white mb-3"></span>
            Insure tokens against hacks in 2 clicks. Pay-as-you-go coverage with instant payouts.
          </p>
          <div className="mt-4 flex space-x-2">
            <span className="text-xs px-2 py-1 bg-[#1B1C1B] rounded">ETH</span>
            <span className="text-xs px-2 py-1 bg-[#1B1C1B] rounded">USDC</span>
            <span className="text-xs px-2 py-1 bg-[#1B1C1B] rounded">1h payout</span>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="text-2xl mb-4 flex items-center font-mono">
            <FiDollarSign className="mr-3" /> 02
          </div>
          <h3 className="text-2xl mb-3 font-medium">Premium Yields</h3>
          <p className="text-white opacity-90">
            <span className="block h-2 w-8 bg-white mb-3"></span>
            Earn a great APY from insurance premiums. Stake and claim rewards bi-weekly.
          </p>
          <div className="mt-4 h-16 bg-[#1B1C1B] rounded-lg flex items-center justify-center">
            <div className="w-full max-w-[80%] h-2 bg-[#8B9E93] rounded-full relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '65%' }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="text-2xl mb-4 flex items-center font-mono">
            <FiUsers className="mr-3" /> 03
          </div>
          <h3 className="text-2xl mb-3 font-medium">DAO Guardians</h3>
          <p className="text-white opacity-90">
            <span className="block h-2 w-8 bg-white mb-3"></span>
            Our token holders vote on claims and upgrades. Community-powered fraud prevention.
          </p>
          <div className="mt-4 flex">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  initial={{ x: -20 * i }}
                  animate={{ x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-8 w-8 rounded-full bg-[#1B1C1B] border border-[#8B9E93]"
                />
              ))}
            </div>
            <span className="ml-2 text-sm self-center">+42 voters</span>
          </div>
        </AnimatedCard>
      </div>
    </div>
  </div>
);

const StarknetSection = () => (
  <div className="w-full py-20 px-4 bg-[#212322] border-y border-[#8B9E93]">
    <div className="max-w-4xl mx-auto text-left">
      <p className='font-mono mb-12 text-[#D6E8DC] opacity-50'>./the-best-ecosystem</p>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`${gtamerica.className} text-[#8B9E93] text-4xl md:text-5xl mb-8 font-bold`}
      >
        <span className="font-medium text-[#F0FFF6]">BUILT ON</span> STARKNET
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="text-xl mb-12 mx-auto"
      >
        Leveraging Starknet technology for instant, low-cost transactions that make traditional insurance obsolete.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
      >
        {['↓ 100x gas fees', '1h claim processing',].map((text, i) => (
          <motion.div
            key={i}
            className="border border-[#8B9E93] px-6 py-3 rounded-full text-white"
          >
            {text}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 mx-auto max-w-2xl h-px bg-gradient-to-r from-transparent via-[#8B9E93] to-transparent"
      />
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="w-full py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <p className='font-mono mb-12 text-[#D6E8DC] opacity-50'>./what-we-offer</p>
      {/* Policyholders */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <h3 className={`${gtamerica.className} text-[#8B9E93] text-lg mb-2 uppercase tracking-widest`}>FOR POLICY HOLDERS</h3>
          <h2 className={`${gtamerica.className} text-4xl mb-6 font-medium`}>SLEEP EASY</h2>
          <p className="text-lg mb-6">
            Get coverage in minutes, not days. We monitor your positions 24/7 and auto-pay valid claims.
          </p>
          <ul className="space-y-4">
            {[
              "Cheap premiums for instant coverage",
              "No claim forms - automatic verification",
              "Coverage for the biggest DeFi protocols in Starknet"
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <FiCheckCircle className="mr-3 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 bg-[#212322] border border-[#8B9E93] rounded-xl h-80 p-4 flex flex-col"
        >
          <div className="flex space-x-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-[#8B9E93]"></div>
            <div className="h-3 w-3 rounded-full bg-[#8B9E93] opacity-30"></div>
            <div className="h-3 w-3 rounded-full bg-[#8B9E93] opacity-30"></div>
          </div>
          <div className="bg-[#1B1C1B] rounded-lg flex-1 p-4">
            <div className="h-full border-2 border-dashed border-[#8B9E93] rounded flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 mx-auto w-12 h-12 rounded-full bg-[#8B9E93] flex items-center justify-center">
                  <FiShield className="text-xl" />
                </div>
                <p className="text-sm max-w-[160px] mx-auto">
                  Connect wallet to view coverage options
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Liquidity Providers */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#212322] border border-[#8B9E93] rounded-xl h-80 p-4 flex flex-col"
        >
          <div className="flex space-x-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-[#8B9E93]"></div>
            <div className="h-3 w-3 rounded-full bg-[#8B9E93] opacity-30"></div>
          </div>
          <div className="bg-[#1B1C1B] rounded-lg flex-1 p-4">
            <div className="h-full border-2 border-dashed border-[#8B9E93] rounded flex items-center justify-center">
              <div className="text-center w-full px-4">
                <div className="mb-6 w-full bg-[#212322] rounded-full h-3">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <p className="text-sm mb-2">USDC Pool: 22.7% APY</p>
                <p className="text-sm mb-4">ETH Pool: 18.3% APY</p>
                <div className="h-px w-full bg-[#8B9E93] mb-4"></div>
                <p className="text-xs opacity-80">Next rewards in 3d 12h</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className={`${gtamerica.className} text-[#8B9E93] text-lg mb-2 uppercase tracking-widest`}>FOR LIQUIDITY PROVIDERS</h3>
          <h2 className={`${gtamerica.className} text-4xl mb-6 font-medium`}>GROW YOUR STACK</h2>
          <p className="text-lg mb-6">
            Capital-efficient yields from insurance premiums. We take our part to cover losses, you take the rest.
          </p>
          <ul className="space-y-4">
            {[
              "Earn yield on staked assets",
              "Diversified risk across protocols",
              "Bi-weekly rewards compounding"
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <FiCheckCircle className="mr-3 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </div>
);
