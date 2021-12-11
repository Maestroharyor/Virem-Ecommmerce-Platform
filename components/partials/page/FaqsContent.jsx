
const FaqsContent = () => (
    <div className="table-responsive mb-5">
        <table className="table ps-table--faqs">
            <tbody>
                <tr>
                    <td className="heading" rowSpan="3">
                        <h4>SHIPPING</h4>
                    </td>
                    <td className="question">
                        What Shipping Methods Are Available?
                    </td>
                    <td>
                    Fast Food Delivery (#200), Free Delivery, Goods From Outside Kwara(#1000), Heavy Goods(#1000), Your Delight(#300).
                    </td>
                </tr>
                <tr>
                    <td className="question">Do You Ship outside Kwara State?</td>
                    <td>
                    Yes we ship to other state but at a different shipping fee.
                    </td>
                </tr>
                <tr>
                    <td className="question">
                        How Long Will It Take To Get My Package?
                    </td>
                    <td>
                    Goods within Kwara State is delivered within 24hrs depending on class of goods on request e.g fast food is delivered within 30 mins while some other goods might take within 24hrs time frame, while goods from outside Kwara State might take up to 2-3 days for delivery.
                    </td>
                </tr>
                <tr>
                    <td className="heading" rowSpan="2">
                        <h4>PAYMENT</h4>
                    </td>
                    <td className="question">
                        What Payment Methods Are Accepted?
                    </td>
                    <td>
                    You can pay online with our secure payment platform with your credit card or you can also pay on delivery(POS)
                    </td>
                </tr>
                <tr>
                    <td className="question">Is Buying On-Line Safe?</td>
                    <td>
                    Our system is well secured for your online order, so buying online is much safe on virem
                    </td>
                </tr>
                <tr>
                    <td className="heading" rowSpan="5">
                        <h4>Order & Retunrs</h4>
                    </td>
                    <td className="question"> How do I place an Order?</td>
                    <td>
                    To place order on Virem visit our website, add to cart your desired goods and checkout. It is that easy on virem.
                    </td>
                </tr>
                {/* <tr>
                    <td className="question">
                        How Can I Cancel Or Change My Order?
                    </td>
                    <td>
                        Plaid letterpress leggings craft beer meh ethical
                        Pinterest. Art party authentic freegan semiotics jean
                        shorts chia cred. Neutra Austin roof party Brooklyn,
                        synth Thundercats swag 8-bit photo booth.
                    </td>
                </tr> */}
                <tr>
                    <td className="question">
                        Do I need an account to place an order?
                    </td>
                    <td>
                    Yes, inorder to fulfil your order you need to create an account. But note that your information is secured with us.
                    </td>
                </tr>
                <tr>
                    <td className="question">How Do I Track My Order?</td>
                    <td>
                    To track your order you can do so by click on track my order once you have login in to your account
                    </td>
                </tr>
                <tr>
                    <td className="question">How Can I Return a Product?</td>
                    <td>
                    Goods cant be returned unless it is faulty when delivered to you
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default FaqsContent;
