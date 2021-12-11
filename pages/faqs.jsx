import Link from 'next/link'
import BreadCrumb from '../../components/elements/BreadCrumb';
import FaqsContent from '../../components/partials/page/FaqsContent';
// import Newletters from '../../components/partials/commons/Newletters';
import WPLayout from '../../wp-components/layouts/WPLayout';

const FaqsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'About',
            url: '/about-us',
        },
        {
            text: 'Frequently Asked Questions',
        },
    ];

    return (
        <WPLayout title="FAQ">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="p-5 text-center m-5">
                        <h2 className="my-5">Frequently Asked Questions</h2>
                    </div>
                    <FaqsContent />
                </div>
                <div className="bg-light mt-5 p-5 text-center">
                    <div className="p-5 my-5">
                        <h3 className="display-4 fw-bold">
                            We’re Here to Help! <Link href="/contact-us"><a className='text-decoration-underline text-danger fw-bold'>Contact us</a></Link><br />
                            08087614841
                        </h3>
                    </div>
                </div>
            </div> 
        </WPLayout>
    );
};

export default FaqsPage;
