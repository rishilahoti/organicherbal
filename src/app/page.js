import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function Home() {
	return (
		<>
			<Hero />
			<HomeMenu />
			<section className="text-center my-16" id="about">
				<SectionHeaders subHeader={'About Us'} />
				<div className="text-slate-950 text-4xl max-w-6xl mx-auto mt-4 flex flex-col gap-4">
					<p>
						We supply the best quality <strong>Ashwagandha</strong>,
						Giloy, Neem, and other <strong>Herbs</strong>. Our
						products include raw herbs, seeds, and powders, ensuring
						you receive the highest standards of purity and potency.
					</p>
					<p>
						Our collaborative contract farming model ensures mutual
						growth and sustainability for farmers and
						agribusinesses. By working together, we boost
						agricultural productivity and market access.
					</p>
					<p>
						We specialize in growing a wide variety of herbs and are
						ready to collaborate with anyone interested in contract
						farming. Whether you&apos;re a small-scale farmer or a
						large agribusiness, we welcome partnerships to cultivate
						success together.
					</p>
				</div>
			</section>
			<section className="text-center my-8" id="contact">
				<SectionHeaders
					subHeader={"Don't hesitate"}
					mainHeader={'Contact us'}
				/>
				<div className="mt-8">
					<a
						className="text-4xl underline text-gray-500"
						href="tel:+46738123123"
					>
						+46 738 123 123
					</a>
				</div>
			</section>
		</>
	);
}
