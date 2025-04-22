'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiAlertTriangle, FiInfo, FiUpload } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NewClaimPage = () => {
    const [selectedCover, setSelectedCover] = useState('');
    const [txHash, setTxHash] = useState('');
    const [amountLost, setAmountLost] = useState('');
    const [fileUploaded, setFileUploaded] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    const userCovers = [
        { id: 1, protocol: 'Ekubo Protocol', status: 'active', amount: '10,000', token: 'USDC', expiry: 'May 12, 2025' },
        { id: 2, protocol: 'JediSwap', status: 'active', amount: '5,000', token: 'STRK', expiry: 'June 3, 2025' },
    ];
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Submit logic here
    };
    
    return (
        <div className="min-h-screen pt-20 md:pt-28">
            <Navbar />
            <p className='px-4 md:px-20 font-mono mb-4 md:mb-8 text-[#D6E8DC] opacity-50 text-sm md:text-base'>ls /claim</p>
            
            {/* Page Header */}
            <div className="w-full px-4 md:px-20 py-4 md:py-6 bg-[#212322] border-y border-[#8B9E93]">
                <div className="max-w-6xl mx-auto">
                    <h1 className="font-semibold text-xl md:text-3xl mb-1 md:mb-2">File a Claim</h1>
                    <p className="text-[#8B9E93] text-sm md:text-base">Submit evidence for a protocol exploit or hack</p>
                </div>
            </div>
            
            {/* Claim Form */}
            <div className="w-full p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-[#212322] border border-[#8B9E93] rounded-xl p-4 sm:p-6 mb-6 md:mb-8">
                        <div className="flex items-start mb-4 md:mb-6">
                            <FiInfo className="text-[#8B9E93] text-lg md:text-xl mt-0.5 mr-2 md:mr-3 flex-shrink-0" />
                            <p className="text-[#8B9E93] text-sm md:text-base">
                                Claims must be submitted within 7 days of the incident. All claims are verified by our security experts before approval.
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            {/* Cover Selection */}
                            <div className="mb-4 md:mb-6">
                                <label className="block text-sm md:text-base text-[#8B9E93] mb-1 md:mb-2">Select Your Cover</label>
                                <select 
                                    value={selectedCover}
                                    onChange={(e) => setSelectedCover(e.target.value)}
                                    className="w-full bg-[#1B1C1B] border border-[#8B9E93] rounded-lg px-3 py-2 md:px-4 md:py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B9E93] text-sm md:text-base"
                                    required
                                >
                                    <option value="">Select a covered protocol</option>
                                    {userCovers.map((cover) => (
                                        <option key={cover.id} value={cover.id}>
                                            {cover.protocol} - {cover.amount} {cover.token}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Transaction Hash */}
                            <div className="mb-4 md:mb-6">
                                <label className="block text-sm md:text-base text-[#8B9E93] mb-1 md:mb-2">Transaction Hash of the Exploit</label>
                                <input 
                                    type="text"
                                    value={txHash}
                                    onChange={(e) => setTxHash(e.target.value)}
                                    placeholder="0x..."
                                    className="w-full bg-[#1B1C1B] border border-[#8B9E93] rounded-lg px-3 py-2 md:px-4 md:py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B9E93] text-sm md:text-base"
                                    required
                                />
                                <p className="mt-1 text-xs text-[#8B9E93]">Please provide the transaction hash that contains evidence of the exploit.</p>
                            </div>
                            
                            {/* Amount Lost */}
                            <div className="mb-4 md:mb-6">
                                <label className="block text-sm md:text-base text-[#8B9E93] mb-1 md:mb-2">Amount Lost</label>
                                <div className="flex">
                                    <input 
                                        type="number"
                                        value={amountLost}
                                        onChange={(e) => setAmountLost(e.target.value)}
                                        placeholder="0.00"
                                        className="flex-grow bg-[#1B1C1B] border border-[#8B9E93] rounded-l-lg px-3 py-2 md:px-4 md:py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8B9E93] text-sm md:text-base"
                                        required
                                    />
                                    <span className="px-3 py-2 md:px-4 md:py-3 bg-[#1B1C1B] border-t border-r border-b border-[#8B9E93] rounded-r-lg text-[#8B9E93] text-sm md:text-base">
                                        {selectedCover ? userCovers.find(c => c.id === parseInt(selectedCover))?.token : 'TOKEN'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* File Upload */}
                            <div className="mb-6 md:mb-8">
                                <label className="block text-sm md:text-base text-[#8B9E93] mb-1 md:mb-2">Supporting Evidence (Optional)</label>
                                <div 
                                    className={`w-full border-2 border-dashed rounded-lg p-4 md:p-6 text-center cursor-pointer hover:bg-[#1B1C1B] transition-colors duration-200 ${fileUploaded ? 'border-green-600 bg-green-900 bg-opacity-20' : 'border-[#8B9E93]'}`}
                                    onClick={() => setFileUploaded(!fileUploaded)}
                                >
                                    <div className="flex flex-col items-center">
                                        {fileUploaded ? (
                                            <>
                                                <FiUpload className="text-3xl md:text-4xl text-green-500 mb-2 md:mb-3" />
                                                <p className="text-green-500 text-sm md:text-base">evidence.pdf uploaded</p>
                                                <p className="text-xs text-[#8B9E93] mt-1">Click to remove</p>
                                            </>
                                        ) : (
                                            <>
                                                <FiUpload className="text-3xl md:text-4xl text-[#8B9E93] mb-2 md:mb-3" />
                                                <p className="text-[#8B9E93] text-sm md:text-base">Upload files or click to browse</p>
                                                <p className="text-xs text-[#8B9E93] mt-1">Supported formats: PDF, PNG, JPG (max 10MB)</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Checkbox Agreement */}
                            <div className="mb-6 md:mb-8">
                                <label className="flex items-start">
                                    <input 
                                        type="checkbox"
                                        className="mt-1 bg-[#1B1C1B] border border-[#8B9E93] rounded focus:ring-[#8B9E93] h-4 w-4 md:h-5 md:w-5"
                                        required
                                    />
                                    <span className="ml-2 md:ml-3 text-xs md:text-sm text-[#8B9E93]">
                                        I confirm that all information provided is accurate and truthful. I understand that false claims may result in permanent suspension from the platform.
                                    </span>
                                </label>
                            </div>
                            
                            {/* Warning Alert */}
                            <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-3 md:p-4 mb-6 md:mb-8">
                                <div className="flex items-start">
                                    <FiAlertTriangle className="text-red-500 text-lg md:text-xl mt-0.5 mr-2 md:mr-3 flex-shrink-0" />
                                    <p className="text-red-300 text-xs md:text-sm">
                                        Important: Submitting fraudulent claims is strictly prohibited and may result in legal action. All submitted evidence will be thoroughly verified.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <motion.button
                                    type="submit"
                                    className="custom-button px-6 py-2 md:px-8 md:py-3 text-sm md:text-base flex items-center disabled:opacity-50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={submitting}
                                >
                                    <FiShield className="mr-2" />
                                    {submitting ? 'Processing...' : 'Submit Claim'}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Process Timeline */}
                    <div className="bg-[#212322] border border-[#8B9E93] rounded-xl p-4 sm:p-6">
                        <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Claim Process</h3>
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex">
                                <div className="flex flex-col items-center mr-3 md:mr-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#8B9E93] text-[#1B1C1B] rounded-full flex items-center justify-center font-medium text-sm md:text-base">1</div>
                                    <div className="w-0.5 h-full bg-[#8B9E93] mt-2"></div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm md:text-base mb-1">Submit Claim</h4>
                                    <p className="text-xs md:text-sm text-[#8B9E93]">File your claim with all relevant evidence and details.</p>
                                </div>
                            </div>
                            
                            <div className="flex">
                                <div className="flex flex-col items-center mr-3 md:mr-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1B1C1B] text-[#8B9E93] border border-[#8B9E93] rounded-full flex items-center justify-center font-medium text-sm md:text-base">2</div>
                                    <div className="w-0.5 h-full bg-[#8B9E93] mt-2"></div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm md:text-base mb-1">Verification</h4>
                                    <p className="text-xs md:text-sm text-[#8B9E93]">Our security team will verify your claim within 48-72 hours.</p>
                                </div>
                            </div>
                            
                            <div className="flex">
                                <div className="flex flex-col items-center mr-3 md:mr-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1B1C1B] text-[#8B9E93] border border-[#8B9E93] rounded-full flex items-center justify-center font-medium text-sm md:text-base">3</div>
                                    <div className="w-0.5 h-full bg-[#8B9E93] mt-2"></div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm md:text-base mb-1">Review Process</h4>
                                    <p className="text-xs md:text-sm text-[#8B9E93]">The claim will be reviewed by the coverage committee.</p>
                                </div>
                            </div>
                            
                            <div className="flex">
                                <div className="flex flex-col items-center mr-3 md:mr-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1B1C1B] text-[#8B9E93] border border-[#8B9E93] rounded-full flex items-center justify-center font-medium text-sm md:text-base">4</div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm md:text-base mb-1">Payment</h4>
                                    <p className="text-xs md:text-sm text-[#8B9E93]">If approved, payment will be processed within 5 business days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewClaimPage;
