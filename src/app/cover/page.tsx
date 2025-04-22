'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck, FiShield, FiDollarSign, FiClock, FiArrowRight, FiInfo } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import { gtamerica } from '@/lib/fonts';
import Footer from '@/components/Footer';
import { Shield, Wallet } from 'lucide-react';

const NewCoverPage = () => {
    const [step, setStep] = useState<'select' | 'details'>('select');
    const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isXVerified, setIsXVerified] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const [selectedToken, setSelectedToken] = useState('STRK');
    const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);
    const tokenDropdownRef = useRef<HTMLDivElement>(null);
    
    const tokens = [
        { symbol: 'STRK', color: '#8B9E93' },
        { symbol: 'ETH', color: '#627EEA' },
        { symbol: 'USDC', color: '#2775CA' },
    ];

    const [coverAmount, setCoverAmount] = useState<string>("2000");
    const [coverPeriod, setCoverPeriod] = useState<string>("30");
    const [totalCost, setTotalCost] = useState<string>("100");

    const protocols = [
        { name: 'Ekubo Protocol', risk: 'Medium', tvl: '$42M', icon: '🟣' },
        { name: 'JediSwap', risk: 'Low', tvl: '$28M', icon: '🔵' },
        { name: 'MySwap', risk: 'High', tvl: '$15M', icon: '🟠' },
        { name: '10KSwap', risk: 'Medium', tvl: '$35M', icon: '🟢' },
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleTokenDropdown = () => {
        setIsTokenDropdownOpen(!isTokenDropdownOpen);
    };

    const selectProtocol = (protocol: string) => {
        setSelectedProtocol(protocol);
        setIsDropdownOpen(false);
    };
    
    const selectToken = (token: string) => {
        setSelectedToken(token);
        setIsTokenDropdownOpen(false);
        
        // Update total cost based on token (simplified calculation)
        const baseAmount = parseInt(coverAmount) || 0;
        const tokenMultiplier = token === 'USDC' ? 0.05 : token === 'ETH' ? 0.04 : 0.06;
        const periodFactor = (parseInt(coverPeriod) || 30) / 30;
        setTotalCost((baseAmount * tokenMultiplier * periodFactor).toFixed(0));
    };

    // Handle cover amount change
    const handleCoverAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCoverAmount(value);
        
        // Update total cost
        const baseAmount = parseInt(value) || 0;
        const tokenMultiplier = selectedToken === 'USDC' ? 0.05 : selectedToken === 'ETH' ? 0.04 : 0.06;
        const periodFactor = (parseInt(coverPeriod) || 30) / 30;
        setTotalCost((baseAmount * tokenMultiplier * periodFactor).toFixed(0));
    };

    // Handle cover period change
    const handleCoverPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCoverPeriod(value);
        
        // Update total cost
        const baseAmount = parseInt(coverAmount) || 0;
        const tokenMultiplier = selectedToken === 'USDC' ? 0.05 : selectedToken === 'ETH' ? 0.04 : 0.06;
        const periodFactor = (parseInt(value) || 30) / 30;
        setTotalCost((baseAmount * tokenMultiplier * periodFactor).toFixed(0));
    };

    // Get token color based on selected token
    const getTokenColor = () => {
        const token = tokens.find(t => t.symbol === selectedToken);
        return token ? token.color : '#8B9E93';
    };

    // Calculate dates for coverage period
    const getDateRange = () => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + parseInt(coverPeriod));

        return {
            start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            end: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
    };

    // Get protocol icon
    const getProtocolIcon = () => {
        const protocol = protocols.find(p => p.name === selectedProtocol);
        return protocol ? protocol.icon : '⚪';
    };

    if (step === 'select') {
        return (
            <div className="min-h-screen pt-20 md:pt-28">
                <Navbar />
                <p className='px-4 md:px-20 font-mono mb-6 md:mb-12 text-[#D6E8DC] opacity-50'>ls /cover/new</p>
                
                {/* Header */}
                <div className="w-full px-4 md:px-20 py-6 md:py-8 bg-[#212322] border-y border-[#8B9E93]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="mb-4 md:mb-0">
                            <h1 className={` font-semibold text-2xl md:text-4xl`}>New Cover</h1>
                            <p className="text-[#8B9E93] mt-1 md:mt-2 text-sm md:text-base">
                                Get protection for your assets in DeFi protocols
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full p-4 md:p-8 lg:p-12 xl:p-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="select-page"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="max-w-2xl mx-auto">
                                {/* Protocol Selection */}
                                <div className="mb-8 relative">
                                    <h2 className="text-xl mb-4 flex items-center">
                                        <FiShield className="mr-2" />
                                        Select Protocol
                                    </h2>
                                    <motion.button
                                        whileHover={{ borderColor: '#8B9E93' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={toggleDropdown}
                                        className={`w-full p-4 bg-[#1B1C1B] border rounded-xl text-left flex justify-between items-center transition-colors ${isDropdownOpen ? 'border-[#8B9E93]' : 'border-[#212322]'}`}
                                    >
                                        {selectedProtocol ? (
                                            <div className="flex items-center">
                                                <span className="bg-[#212322] w-6 h-6 flex items-center justify-center rounded mr-2">
                                                    {getProtocolIcon()}
                                                </span>
                                                <span>{selectedProtocol}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[#8B9E93]">Choose a protocol</span>
                                        )}
                                        <motion.div
                                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiChevronDown />
                                        </motion.div>
                                    </motion.button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                ref={dropdownRef}
                                                className="absolute z-10 w-full mt-2 bg-[#212322] border border-[#8B9E93] rounded-xl overflow-hidden"
                                            >
                                                {protocols.map((protocol) => (
                                                    <motion.div
                                                        key={protocol.name}
                                                        whileHover={{ backgroundColor: '#1A1E1C' }}
                                                        onClick={() => selectProtocol(protocol.name)}
                                                        className="p-4 border-b border-[#1A1E1C] last:border-b-0 cursor-pointer flex justify-between items-center"
                                                    >
                                                        <div className="flex items-center">
                                                            <span className="bg-[#1B1C1B] w-6 h-6 flex items-center justify-center rounded mr-2">
                                                                {protocol.icon}
                                                            </span>
                                                            <div>
                                                                <p className="font-medium">{protocol.name}</p>
                                                                <p className="text-sm text-[#8B9E93]">Risk: {protocol.risk} • {protocol.tvl} TVL</p>
                                                            </div>
                                                        </div>
                                                        {selectedProtocol === protocol.name && <FiCheck className="text-[#8B9E93]" />}
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                    {selectedProtocol && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-3 p-3 bg-[#1B1C1B] rounded-lg border border-[#212322] flex items-start"
                                        >
                                            <FiInfo className="text-[#8B9E93] mt-1 mr-2" />
                                            <p className="text-sm text-[#8B9E93]">
                                                Coverage includes protection against smart contract exploits, hacks, and oracle manipulations for {selectedProtocol}.
                                            </p>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Wallet Connection */}
                                {/* TODO: implement with wallet connector */}
                                <div className="mb-8">
                                    <h2 className="text-xl mb-4 flex items-center">
                                        <Wallet className="mr-2" />
                                        Connect Wallet
                                    </h2>
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsConnected(true)}
                                        disabled={!selectedProtocol}
                                        className={`w-full p-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ${!selectedProtocol ? 'bg-[#212322] text-[#8B9E93] cursor-not-allowed' : isConnected ? 'bg-[#1B1C1B] border border-[#8B9E93]' : 'bg-[#8B9E93] text-[#1B1C1B] hover:bg-[#D6E8DC] cursor-pointer'}`}
                                    >
                                        {isConnected ? (
                                            <>
                                                <span>Wallet Connected</span>
                                                <FiCheck />
                                            </>
                                        ) : (
                                            <span>Connect Wallet</span>
                                        )}
                                    </motion.button>
                                    
                                    {isConnected && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-3 p-3 bg-[#1B1C1B] rounded-lg border border-[#212322]"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-[#8B9E93]">Connected Address</span>
                                                <span className="text-sm">0x76f...3a9c</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-sm text-[#8B9E93]">Network</span>
                                                <span className="text-sm">Starknet</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* X verification */}
                                <div className="mb-8">
                                    <h2 className="text-xl mb-4 flex items-center">
                                        <Shield className="mr-2" />
                                        Verify With X
                                    </h2>
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsXVerified(true)}
                                        disabled={!isConnected}
                                        className={`w-full p-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ${!isConnected ? 'bg-[#212322] text-[#8B9E93] cursor-not-allowed' : isXVerified ? 'bg-[#1B1C1B] border border-[#8B9E93]' : 'bg-[#8B9E93] text-[#1B1C1B] hover:bg-[#D6E8DC] hover:cursor-pointer'}`}
                                    >
                                        {isXVerified ? (
                                            <>
                                                <span>Account Verified</span>
                                                <FiCheck />
                                            </>
                                        ) : (
                                            <span>Connect Using X</span>
                                        )}
                                    </motion.button>
                                    
                                    {isXVerified && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-3 p-3 bg-[#1B1C1B] rounded-lg border border-[#212322]"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-[#8B9E93]">Connected Account</span>
                                                <span className="text-sm">advrj_</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-sm text-[#8B9E93]">Account Score</span>
                                                <span className="text-sm">9/10</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                                
                                {/* Continue Button */}
                                <div className="flex justify-end">
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setStep('details')}
                                        disabled={!selectedProtocol || !isConnected}
                                        className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${!selectedProtocol || !isConnected ? 'bg-[#212322] text-[#8B9E93] cursor-not-allowed' : 'custom-button'}`}
                                    >
                                        <span>Continue</span>
                                        <FiArrowRight />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 md:pt-28">
            <Navbar />
            <p className='px-4 md:px-20 font-mono mb-4 text-[#D6E8DC] opacity-50'>ls /cover/new</p>
            <button onClick={() => setStep('select')} className="px-4 md:px-20 flex items-center text-[#D6E8DC] opacity-50 mb-6 md:mb-12 hover:opacity-100 hover:cursor-pointer">
                <span>← cd ..</span>
            </button>
            
            {/* Header */}
            <div className="w-full px-4 md:px-20 py-6 md:py-8 bg-[#212322] border-y border-[#8B9E93]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className={` font-semibold text-2xl md:text-4xl`}>Coverage Details</h1>
                        <p className="text-[#8B9E93] mt-1 md:mt-2 text-sm md:text-base">
                            Customize your protection for {selectedProtocol}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className="w-full p-4 md:p-8 lg:p-12 xl:p-20">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key="details-page"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            {/* Left Column - Details */}
                            <div className="border border-[#8B9E93] bg-[#1B1C1B] rounded-xl p-4 md:p-6">
                                <h2 className={`font-semibold text-xl mb-6 border-b border-[#8B9E93] pb-4`}>Coverage Parameters</h2>

                                {/* Cover Amount */}
                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm text-[#8B9E93]">Cover amount</label>
                                        <span className="text-sm text-[#8B9E93]">Max: 200,000 {selectedToken}</span>
                                    </div>
                                    <div className="flex items-center bg-[#212322] rounded-lg p-3 border border-[#282a28]">
                                        <input
                                            type="text"
                                            value={coverAmount}
                                            onChange={handleCoverAmountChange}
                                            className="bg-transparent text-xl w-full outline-none"
                                        />
                                        
                                        {/* Token Selector Dropdown */}
                                        <div className="relative">
                                            <motion.button
                                                whileHover={{ backgroundColor: '#2a2c2a' }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={toggleTokenDropdown}
                                                className="flex items-center bg-[#1B1C1B] px-3 py-1 rounded-lg hover:cursor-pointer"
                                            >
                                                <div 
                                                    className="w-3 h-3 rounded-full mr-2" 
                                                    style={{ backgroundColor: getTokenColor() }}
                                                ></div>
                                                <span>{selectedToken}</span>
                                                <motion.div
                                                    animate={{ rotate: isTokenDropdownOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="ml-2"
                                                >
                                                    <FiChevronDown size={14} />
                                                </motion.div>
                                            </motion.button>

                                            <AnimatePresence>
                                                {isTokenDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        ref={tokenDropdownRef}
                                                        className="absolute z-10 right-0 mt-1 bg-[#212322] border border-[#8B9E93] rounded-lg overflow-hidden w-24"
                                                    >
                                                        {tokens.map((token) => (
                                                            <motion.div
                                                                key={token.symbol}
                                                                whileHover={{ backgroundColor: '#1A1E1C' }}
                                                                onClick={() => selectToken(token.symbol)}
                                                                className="p-2 border-b border-[#1A1E1C] last:border-b-0 cursor-pointer flex items-center"
                                                            >
                                                                <div 
                                                                    className="w-3 h-3 rounded-full mr-2" 
                                                                    style={{ backgroundColor: token.color }}
                                                                ></div>
                                                                <span>{token.symbol}</span>
                                                                {selectedToken === token.symbol && (
                                                                    <FiCheck className="ml-auto text-[#8B9E93]" size={14} />
                                                                )}
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* Cover Period */}
                                <div className="mb-8">
                                    <label className="text-sm text-[#8B9E93] block mb-2">Coverage Period</label>
                                    <div className="flex items-center bg-[#212322] rounded-lg p-3 border border-[#282a28]">
                                        <input
                                            type="text"
                                            value={coverPeriod}
                                            onChange={handleCoverPeriodChange}
                                            className="bg-transparent text-xl w-full outline-none"
                                        />
                                        <span className="text-[#8B9E93]">Days</span>
                                    </div>
                                    
                                    {/* Period Slider */}
                                    <div className="mt-4">
                                        <div className="w-full h-2 bg-[#212322] rounded-full relative">
                                            <motion.div
                                                className="absolute top-0 left-0 h-full bg-[#8B9E93] rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(parseInt(coverPeriod) / 90 * 100, 100)}%` }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-2 text-xs text-[#8B9E93]">
                                            <span>7 days</span>
                                            <span>30 days</span>
                                            <span>90 days</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Coverage Detail */}
                                <div className="mb-8 bg-[#212322] rounded-lg p-4 border border-[#282a28]">
                                    <div className="flex items-start mb-4">
                                        <FiShield className="text-[#8B9E93] mt-1 mr-2" />
                                        <div>
                                            <h3 className="font-medium mb-1">Coverage Details</h3>
                                            <p className="text-sm text-[#8B9E93]">
                                                Protection against exploits for {selectedProtocol} from {getDateRange().start} to {getDateRange().end}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start mb-3">
                                        <FiClock className="text-[#8B9E93] mt-1 mr-2" />
                                        <div>
                                            <h3 className="font-medium mb-1">Claim Processing</h3>
                                            <p className="text-sm text-[#8B9E93]">
                                                Claims processed within 1 hour of submission
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms & Conditions */}
                                <div>
                                    <h3 className={`font-semibold text-lg mb-4 border-b border-[#8B9E93] pb-2`}>Coverage Terms</h3>
                                    
                                    <div className="mb-4">
                                        <p className="text-sm text-[#8B9E93] mb-2">Covered Events:</p>
                                        <div className="mb-2 flex items-center">
                                            <FiCheck className="mr-2 text-[#8B9E93]" />
                                            <span>Smart contract exploits & hacks</span>
                                        </div>
                                        <div className="mb-2 flex items-center">
                                            <FiCheck className="mr-2 text-[#8B9E93]" />
                                            <span>Oracle manipulation attacks</span>
                                        </div>
                                        <div className="mb-4 flex items-center">
                                            <FiCheck className="mr-2 text-[#8B9E93]" />
                                            <span>Economic attacks on protocol</span>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-sm text-[#8B9E93] mb-2">Not Covered:</p>
                                        <div className="mb-2 flex items-start">
                                            <div className="mt-1 mr-2 text-[#8B9E93]">•</div>
                                            <span>Frontend issues not affecting the protocol</span>
                                        </div>
                                        <div className="mb-2 flex items-start">
                                            <div className="mt-1 mr-2 text-[#8B9E93]">•</div>
                                            <span>Losses from stablecoin or asset depeg</span>
                                        </div>
                                        <div className="mb-2 flex items-start">
                                            <div className="mt-1 mr-2 text-[#8B9E93]">•</div>
                                            <span>Market volatility or user errors</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Overview */}
                            <div className="border border-[#8B9E93] bg-[#1B1C1B] rounded-xl p-4 md:p-6 h-min">
                                <h2 className={`font-semibold text-xl mb-6 border-b border-[#8B9E93] pb-4`}>Coverage Summary</h2>

                                {/* Protocol */}
                                <div className="py-4 flex justify-between items-center">
                                    <span className="text-[#8B9E93]">Protocol</span>
                                    <div className="flex items-center">
                                        <span className="bg-[#212322] w-6 h-6 flex items-center justify-center rounded mr-2">
                                            {getProtocolIcon()}
                                        </span>
                                        <span>{selectedProtocol}</span>
                                    </div>
                                </div>

                                {/* Cover Amount */}
                                <div className="py-4 flex justify-between items-center border-t border-[#212322]">
                                    <span className="text-[#8B9E93]">Cover Amount</span>
                                    <div className="flex items-center">
                                        <span>{parseInt(coverAmount).toLocaleString()} </span>
                                        <div 
                                            className="w-2 h-2 rounded-full mx-2" 
                                            style={{ backgroundColor: getTokenColor() }}
                                        ></div>
                                        <span>{selectedToken}</span>
                                    </div>
                                </div>

                                {/* Cover Period */}
                                <div className="py-4 flex justify-between items-center border-t border-[#212322]">
                                    <span className="text-[#8B9E93]">Coverage Period</span>
                                    <div>
                                        <span>{coverPeriod} days</span>
                                        <span className="text-xs ml-2 text-[#8B9E93]">({getDateRange().start} - {getDateRange().end})</span>
                                    </div>
                                </div>

                                {/* Deductible */}
                                <div className="py-4 flex justify-between items-center border-t border-[#212322]">
                                    <span className="text-[#8B9E93]">Deductible</span>
                                    <div className="flex items-center">
                                        <span>2.5%</span>
                                        <span className="text-xs ml-2 text-[#8B9E93]">({(parseInt(coverAmount) * 0.025).toFixed(0)} {selectedToken})</span>
                                    </div>
                                </div>

                                {/* Total Cost */}
                                <div className="py-4 flex justify-between items-center border-t border-[#212322] mb-8">
                                    <span className="text-[#8B9E93]">Premium Cost</span>
                                    <div className="flex items-center">
                                        <span className="text-xl font-medium">{totalCost} </span>
                                        <div 
                                            className="w-2 h-2 rounded-full mx-2" 
                                            style={{ backgroundColor: getTokenColor() }}
                                        ></div>
                                        <span className="text-xl font-medium">{selectedToken}</span>
                                    </div>
                                </div>

                                <button className='custom-button w-full'>
                                        Pay With Crypto
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default NewCoverPage;