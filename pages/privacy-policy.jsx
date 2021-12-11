// import Link from 'next/link'
import BreadCrumb from '../../components/elements/BreadCrumb';
import WPLayout from '../../wp-components/layouts/WPLayout';
import PrivacyPolicy from '../../components/partials/page/PrivacyPolicy'



  
    
const PrivacyPolicyPage = () => {
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
            text: 'Privacy Policy',
        },
    ];

    return(
        <WPLayout title="Privacy Policy">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="p-5 text-center m-5">
                        <h2 className="my-5">Privacy Policy</h2>
                    </div>
                        <PrivacyPolicy />
                </div>
            </div>

        </WPLayout>
    )

}

export default PrivacyPolicyPage