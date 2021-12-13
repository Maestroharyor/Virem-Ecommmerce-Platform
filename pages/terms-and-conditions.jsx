import Link from 'next/link'
import BreadCrumb from '../components/elements/BreadCrumb';
import WPLayout from '../wp-components/layouts/WPLayout';
import TermsConditions from '../components/partials/page/TermsConditions'



  
    
const TermsConditionsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'About Us',
            url: '/about-us',
        },
        {
            text: 'Terms and Conditions',
        },
    ];

    return(
        <WPLayout title="Terms and Conditions">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="p-5 text-center m-5">
                        <h2 className="my-5">Terms and Conditions</h2>
                    </div>
                        <TermsConditions />
                </div>
            </div>

        </WPLayout>
    )

}

export default TermsConditionsPage