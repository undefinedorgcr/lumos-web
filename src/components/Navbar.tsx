'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { pirulen } from '@/lib/fonts';
import WalletConnector from './WalletConnector';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
	const [visible, setVisible] = useState<boolean>(true);

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;

		const isScrollingDown = currentScrollPos > prevScrollPos;

		setVisible(!isScrollingDown || currentScrollPos < 10);

		setPrevScrollPos(currentScrollPos);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [prevScrollPos]);

	return (
		<>
			<button
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className="md:hidden fixed top-6 left-6 z-50 p-2 rounded-sm bg-white/5 hover:bg-white/10 transition-all ring-1 ring-white/20"
			>
				{isMenuOpen ? (
					<X className="w-5 h-5" />
				) : (
					<Menu className="w-5 h-5" />
				)}
			</button>

			{isMenuOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
					onClick={() => setIsMenuOpen(false)}
				/>
			)}
			<div
				className={`md:hidden fixed top-0 left-0 h-full w-64 bg-[#212322] backdrop-blur-sm border-r border-white/20 transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
			>
				<div className="flex flex-col h-full p-6">
					<div className="mt-14 mb-8">
						<Link href="/" onClick={() => setIsMenuOpen(false)}>
							<Image
								src="/images/LumosLogo.png"
								width={45}
								height={45}
								alt="Lumos app logo"
								className="transition duration-500 hover:scale-110 opacity-75 hover:opacity-100"
							/>
						</Link>
					</div>
					<div className="flex flex-col gap-4">
						<Link
							href="/dashboard"
							className="text-gray-400 hover:text-white transition-colors duration-300"
							onClick={() => setIsMenuOpen(false)}
						>
							Dashboard
						</Link>
						<Link
							href="/cover"
							className="text-gray-400 hover:text-white transition-colors duration-300"
							onClick={() => setIsMenuOpen(false)}
						>
							Cover
						</Link>
						<Link
							href="/claim"
							className="text-gray-400 hover:text-white transition-colors duration-300"
							onClick={() => setIsMenuOpen(false)}
						>
							New Claim
						</Link>
					</div>
					<div className="flex justify-center mt-4">
						<WalletConnector />
					</div>
				</div>
			</div>
			{/* Desktop Navigation */}
			<nav
				className={`hidden md:flex fixed top-0 left-0 right-0 z-40 px-6 py-8 items-center justify-center transition-transform duration-300 ease-in-out ${
					visible ? 'transform-none' : '-translate-y-full'
				}`}
			>
				<Link
					href="/"
					className="absolute left-6 flex items-center transition duration-500 hover:scale-110 opacity-75 hover:opacity-100 mr-2"
				>
					<Image
						src="/images/LumosLogo.png"
						width={35}
						height={35}
						alt="Lumos app logo"
					/>
					<p className={`${pirulen.className} px-3`}>Lumos</p>
				</Link>
				<div className="flex space-x-6">
					<Link
						href="/dashboard"
						className="text-gray-400 hover:text-white transition-colors duration-300"
					>
						Dashboard
					</Link>
					<Link
						href="/cover"
						className="text-gray-400 hover:text-white transition-colors duration-300"
					>
						Cover
					</Link>
					<Link
						href="/claim"
						className="text-gray-400 hover:text-white transition-colors duration-300"
					>
						Claim
					</Link>
				</div>
				<div className="absolute right-6 flex items-center space-x-4">
					<WalletConnector />
				</div>
			</nav>
		</>
	);
}
