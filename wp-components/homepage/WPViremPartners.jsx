// import Image from 'next/image';
// import Image from 'next/image'
import Sumec from 'public/static/img/partners/sumec.jpeg';
import Skyrun from 'public/static/img/partners/skyrun.jpeg'

export default function WPViremPartners () {
    const partners = [
        {
            name: "Sumec",
            img: Sumec
        },
        {
            name: "Skyrun",
            img: Skyrun
        }
    ]
    return(
        <div className="virem-partners container mb-5 pb-5">
            <h3>Our Partners</h3>

            <div className="d-flex flex-warp">
                {partners.map(partner => (
                    <div className="parner_block border p-5">
                        <img src={partner.img} className="partner_img"/>
                        {/* <p className="partner_name">{partner.name}</p> */}
                    </div>
                ))}
            </div>
        
        </div>
    )

}