import { AppProvider } from '@/components/AppContext';
import Header from '@/components/layout/Header';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
	title: 'Organic Herbal',
	description: 'Traders & Exporters of Herbs, Spices, Powders and other Agri Commodities ',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={roboto.className}>
				<main className="max-w-full mx-auto px-8 py-4">
					<AppProvider>
						<Toaster />
						<Header />
						{children}
						<footer className="border-t p-8 text-center text-gray-500 mt-16">
							&copy; 2024 All rights reserved<br/>
                            <a href='https://rishilahoti.works' target='_blank'>rishilahoti.works</a>
						</footer>
					</AppProvider>
				</main>
			</body>
		</html>
	);
}
