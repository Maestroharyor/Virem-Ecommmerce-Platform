import ReadMoreReact from 'read-more-react';

const WPViremAbout = function(){
    const about = `In a world where comfort and convenience have become a luxury... 
    We strive to bring you both comfort and convenience to your doorstep. VIREM the number 1 online marketplace in Kwara state... 
    Connects hundreds of buyers to sellers around Kwara state.
    VIREM makes buying and selling stress-free and convenient. 
    In a bid to alleviate the exploitation of consumers--- we connect to original manufacturer of products so as to provide you with quality goods at affordable prices. VIREM is your one stop online store where you get everything you need for good life and living at the best prices--- We offer you goods ranging from electronics, mobile phones, fashion, beauty products, babies and kids items, sports and fitness products, foods and drinks, books, home and kitchen utensils, construction materials... And a host of others from premium brands.
    Born out of the need to improve and empower e-commerce in Kwara state Entrepreneurs are offered wide and amazing range of services and tools to enable you start, manage and scale your businesses on our platform. The best part recharging and subscription services are available for you on VIREM at no extra charge. Since VIREM is a Football lover Football LiveScore is made available for football lovers on VIREM Website. Just about everything to ensure Customers Comfort and convenience is made available. What separates us from others? *Virems Unrivaled customer service is second to none... We’re with you all the way. *Very low shipping rates are awarded to you for being a great customer. *Money back guarantee when you are not satisfied with what you get after 24 hours. (which is highly unlikely, by the way) And NO we didn't forget to offer you amazing promotional services like: gift voucher, Loyalty programs, social media giveaways, referral discounts, Flash sales... Because With VIREM it's more than shopping. Here is a hotline to connect better (8:00am - 6:00pm)--- 08087614841 To get first hand information on all our COMFORTable activities. FOLLOW us on social media  Facebook and Instagram VIREM stores.     @viremstore Head office: M.J Shopping Complex beside First Bank, Ajase Ipo road. Along Offa Garage. Ilorin Kwara State.  `
    return(
        <div className='container mb-5 p-3'>
            <h3>Virem - More than Shopping</h3>
            <div className='virem--about--description--desktop'>
            <p>{about}</p>
            </div>

            <div className='virem--about--description--mobile'>
            <p><ReadMoreReact text={about}
                min={300}
                ideal={300}
                max={400}
                readMoreText="Read More..."/></p>
            </div>
        </div>
    )
}

export default WPViremAbout;