import {FaCheckSquare} from 'react-icons/fa';
import Link from 'next/link'

const AboutMain = () => {
    return(
        <>
        <section className="w3l-about-2 py-5">
		<div className="container py-md-5 py-4">
			<div className="row align-items-center justify-content-between">
				<div className="col-lg-6 about-2-secs-left pr-lg-5 px-5 px-lg-0">
					<h3 className="title-style-2 mb-sm-3 mb-2"><span className="font-weight-bold" style={{fontSize: "40px"}}>Welcome to VIREM</span> <br />Kwara Shopping with ease.
					</h3>
					<p className="fs-3">VIREM is your one stop online store where you get everything you need for good life and living at the best prices— We offer you goods ranging from electronics, mobile phones, fashion, beauty products, babies and kids items, sports and fitness products, foods and drinks, books, home and kitchen utensils, construction materials… And a host of others from premium brands.</p>
					<div className="mt-4">
						<Link href='/shop'><a className="btn ps-btn">Shop Now</a></Link>
					</div>
				</div>
				<div className="col-lg-6 about-2-secs-right mt-lg-0 mt-5 d-flex justify-content-center align-content-center">
					<img src="/static/img/logo.png" alt="" className="img-fluid img-responsive" />
				</div>
			</div>
		</div>

        <div className=" py-5 mx-auto text-center fs-3 px-5 px-lg-0" style={{maxWidth: "700px"}}>
            <p className="fs-3">In a world where comfort and convenience have become a luxury… We strive to bring you both comfort and convenience to your doorstep. VIREM the number 1 online marketplace in Kwara state… Connects hundreds of buyers to sellers around Kwara state. VIREM makes buying and selling stress-free and convenient. In a bid to alleviate the exploitation of consumers— we connect to original manufacturer of products so as to provide you with quality goods at affordable prices.</p>

            <p className="fs-3">Born out of the need to improve and empower e-commerce in Kwara state Entrepreneurs are offered wide and amazing range of services and tools to enable you start, manage and scale your businesses on our platform.</p>

            <p className="fs-3">The best part recharging and subscription services are available for you on VIREM at no extra charge.</p>

            <p className="fs-3">Since VIREM is a Football lover Football LiveScore is made available for football lovers on VIREM Website.</p>

            <p className="fs-3">Just about everything to ensure Customers Comfort and convenience is made available.</p>
        </div>

        <div className="py-5" style={{backgroundColor: "#df4141"}}>
            <div className="py-5 my-5 text-white mx-auto px-5" style={{maxWidth: "700px"}}>
               <h3 className="text-white">What separates us from others?</h3> 
               <ul className="list-about-2 list-unstyled mt-sm-4 mt-3 fs-3">
						<li className="py-1"><FaCheckSquare className="me-3" /><span>Virems Unrivaled customer service is second to none… We’re with you all the way.</span></li>
						<li className="py-1"><FaCheckSquare className="me-3" /><span>Very low shipping rates are awarded to you for being a great customer.</span></li>
						<li className="py-1"><FaCheckSquare className="me-3" /><span>Money back guarantee when you are not satisfied with what you get after 24 hours. (which is highly unlikely, by the way)</span></li>
                        <li className="py-1"><FaCheckSquare className="me-3" /><span>And NO we didn’t forget to offer you amazing promotional services like: gift voucher, Loyalty programs, social media giveaways, referral discounts, Flash sales…</span></li>
                        <p className="text-center text-white fs-3 fw-bold">Because With VIREM it’s more than shopping.</p>
				</ul>
            </div>
            
        </div>
	</section>
        </>
    )
}

export default AboutMain;