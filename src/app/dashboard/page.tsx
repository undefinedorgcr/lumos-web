'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {FiShield, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState<'liquidity' | 'covers' | 'claims'>('liquidity');
    
    const liquidityPools = [
        { token: 'STRK', color: '#8B9E93', totalLiquidity: '2,450,000', apy: '22.3%', utilization: 65 },
        { token: 'ETH', color: '#627EEA', totalLiquidity: '1,780,000', apy: '18.5%', utilization: 45 },
        { token: 'USDC', color: '#2775CA', totalLiquidity: '3,250,000', apy: '20.7%', utilization: 78 },
    ];
    
    const userCovers = [
        { id: 1, protocol: 'Ekubo Protocol', status: 'active', amount: '10,000', token: 'USDC', expiry: 'May 12, 2025' },
        { id: 2, protocol: 'JediSwap', status: 'active', amount: '5,000', token: 'STRK', expiry: 'June 3, 2025' },
        { id: 3, protocol: '10KSwap', status: 'inactive', amount: '2,500', token: 'ETH', expiry: 'Apr 5, 2025' },
    ];

    const claims = [
        { id: 1, wallet: '0x76f...3a9c', protocol: 'MySwap', txHash: '0x3d2...8fe1', amountLost: '7,500', token: 'STRK', status: 'Approved' },
        { id: 2, wallet: '0x76f...3a9c', protocol: 'Ekubo Protocol', txHash: '0x6a1...9d42', amountLost: '3,200', token: 'USDC', status: 'Pending' },
        { id: 3, wallet: '0x76f...3a9c', protocol: 'JediSwap', txHash: '0x4e8...2b71', amountLost: '1,800', token: 'ETH', status: 'Declined' },
    ];

    return (
        <div className="min-h-screen pt-20 md:pt-28">
            <Navbar />
            <p className='px-4 md:px-20 font-mono mb-6 md:mb-12 text-[#D6E8DC] opacity-50'>ls /dashboard</p>
            
            {/* Dashboard Header */}
            <div className="w-full px-4 md:px-20 py-6 md:py-8 bg-[#212322] border-y border-[#8B9E93]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className={` font-semibold text-2xl md:text-4xl`}>Dashboard</h1>
                        <p className="text-[#8B9E93] mt-1 md:mt-2 text-sm md:text-base">View your coverage and protection status</p>
                    </div>
                    <div>
                        <div className="flex space-x-1 md:space-x-2 bg-[#1B1C1B] rounded-lg p-1">
                            {(['liquidity', 'covers', 'claims'] as const).map((tab) => (
                                <motion.button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:cursor-pointer ${activeTab === tab ? 'bg-[#8B9E93] text-[#1B1C1B]' : 'text-[#8B9E93]'}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="w-full p-4 md:p-8 lg:p-12 xl:p-20">
                <AnimatePresence mode="wait">
                    {activeTab === 'liquidity' && (
                        <motion.div
                            key="liquidity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className={` font-semibold text-xl md:text-2xl mb-6 md:mb-8`}>Liquidity Pools</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                {liquidityPools.map((pool) => (
                                    <motion.div
                                        key={pool.token}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="bg-[#212322] border border-[#8B9E93] rounded-xl p-4 md:p-6"
                                    >
                                        <div className="flex justify-between items-center mb-4 md:mb-6">
                                            <div className="flex items-center">
                                                <div 
                                                    className="w-3 h-3 md:w-4 md:h-4 rounded-full mr-2 md:mr-3" 
                                                    style={{ backgroundColor: pool.color }}
                                                ></div>
                                                <h3 className="text-lg md:text-xl font-medium">{pool.token}</h3>
                                            </div>
                                            <span className="bg-[#1B1C1B] px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm text-[#8B9E93]">
                                                APY: {pool.apy}
                                            </span>
                                        </div>
                                        
                                        <div className="mb-4 md:mb-6">
                                            <div className="flex justify-between mb-1 md:mb-2">
                                                <span className="text-xs md:text-sm text-[#8B9E93]">Total Liquidity</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl md:text-2xl font-medium">{pool.totalLiquidity}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="w-full h-2 bg-[#1B1C1B] rounded-full mb-4 md:mb-6">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pool.utilization}%` }}
                                                transition={{ duration: 1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: pool.color }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {activeTab === 'covers' && (
                        <motion.div
                            key="covers"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
                                <h2 className={` font-semibold text-xl md:text-2xl mb-4 md:mb-0`}>Your Covers</h2>
                                <Link
                                    href='/cover'
                                    className="custom-button text-md flex items-center"
                                >
                                    <FiShield className="mr-2" /> New Cover
                                </Link>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 md:gap-6">
                                {userCovers.map((cover) => (
                                    <motion.div
                                        key={cover.id}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="bg-[#212322] border border-[#8B9E93] rounded-xl p-4 md:p-6"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <div className="mb-4 md:mb-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center mb-2 md:mb-3">
                                                    <h3 className="text-lg md:text-xl font-medium mr-0 sm:mr-3 mb-1 sm:mb-0">{cover.protocol}</h3>
                                                    <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs ${cover.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-400'}`}>
                                                        {cover.status === 'active' ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                                                    <div>
                                                        <p className="text-xs md:text-sm text-[#8B9E93] mb-1">Covered Amount</p>
                                                        <p className="flex items-center">
                                                            <span className="text-base md:text-lg font-medium">{cover.amount}</span>
                                                            <span className="ml-1 md:ml-2 text-sm md:text-base">{cover.token}</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs md:text-sm text-[#8B9E93] mb-1">Expiry</p>
                                                        <p className="text-base md:text-lg font-medium">{cover.expiry}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2 md:space-x-3 mt-4 md:mt-0">
                                                {cover.status === 'active' && (
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        className="custom-button text-md"
                                                    >
                                                        File Claim
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {cover.status === 'active' && (
                                            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#1B1C1B]">
                                                <div className="flex items-center">
                                                    <FiShield className="text-[#8B9E93] mr-2 text-sm md:text-base" />
                                                    <span className="text-xs md:text-sm text-[#8B9E93]">Coverage includes contract exploits, hacks and oracle manipulation.</span>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="mt-8 md:mt-12">
                                <h2 className={` font-semibold text-xl md:text-2xl mb-4 md:mb-6`}>Recommended Covers</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {[
                                        { protocol: 'Ekubo Protocol', risk: 'Medium', tvl: '$42M', token: 'ETH' },
                                        { protocol: 'MySwap', risk: 'High', tvl: '$15M', token: 'USDC' }
                                    ].map((rec, idx) => (
                                        <motion.div
                                            key={idx}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            className="bg-[#212322] border border-[#8B9E93] rounded-xl p-4 md:p-6"
                                        >
                                            <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">{rec.protocol}</h3>
                                            <div className="text-xs md:text-sm text-[#8B9E93] mb-4 md:mb-6">Risk: {rec.risk} • {rec.tvl} TVL</div>
                                            <div className="flex justify-center">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    className="custom-button text-md"
                                                >
                                                    Get Cover
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                    
                    {activeTab === 'claims' && (
                        <motion.div
                            key="claims"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className={` font-semibold text-xl md:text-2xl mb-6 md:mb-8`}>Your Claims</h2>
                            
                            <div className="bg-[#212322] border border-[#8B9E93] rounded-xl p-4 md:p-6 mb-6 md:mb-8 overflow-x-auto">
                                <table className="w-full min-w-[600px] md:min-w-0">
                                    <thead>
                                        <tr className="border-b border-[#1B1C1B] text-[#8B9E93]">
                                            <th className="text-left py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">Wallet</th>
                                            <th className="text-left py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">Protocol</th>
                                            <th className="text-left py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">Transaction Hash</th>
                                            <th className="text-left py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">Amount Lost</th>
                                            <th className="text-left py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.map((claim) => (
                                            <tr key={claim.id} className="border-b border-[#1B1C1B]">
                                                <td className="py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">{claim.wallet}</td>
                                                <td className="py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">{claim.protocol}</td>
                                                <td className="py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">
                                                    <div className="flex items-center">
                                                        <span className="text-[#8B9E93]">{claim.txHash}</span>
                                                        <button className="ml-1 md:ml-2 text-[#8B9E93] hover:text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">
                                                    <div className="flex items-center">
                                                        <span>{claim.amountLost}</span>
                                                        <span className="ml-1 md:ml-2">{claim.token}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3 md:py-4 md:px-4 text-sm md:text-base">
                                                    <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs
                                                        ${claim.status === 'Approved' ? 'bg-green-900 text-green-300' : 
                                                          claim.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' : 
                                                          'bg-red-900 text-red-300'}`}>
                                                        {claim.status === 'Approved' && <FiCheckCircle className="inline mr-1" />}
                                                        {claim.status === 'Pending' && <FiClock className="inline mr-1" />}
                                                        {claim.status === 'Declined' && <FiXCircle className="inline mr-1" />}
                                                        {claim.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
