import React, { useEffect, useState } from 'react';
import Router from 'next/router'
import { Form, Input, Button, Select, Radio, Checkbox, notification } from 'antd';

import {clearCartTotally} from '../../../store/cart/action'
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import {usePaystackPayment} from 'react-paystack'
import WPOrderRepository from '../../../repositories/WP/WPOrderRepository';
import {
    convertFormData,
    convertJsonToFormData,
    convertToURLEncoded,
} from '../../../utilities/WPHelpers';
import axios from 'axios';

const modalPaidSuccess = type => {
    notification[type]({
        message: 'Payment Successful',
        description: 'Your Order has been made. We will get in touch shortly.',
    });
};


const modalCODSuccess = type => {
    notification[type]({
        message: 'Payment on Delivery Order Successful',
        description: 'Your Order has been made. We will get in touch shortly.',
    });
};


const modalPaidFail = type => {
    notification[type]({
        message: 'Payment Failed',
        description: 'Your Order was not completed. Please try a different card.',
    });
};


const modalCODFail = type => {
    notification[type]({
        message: `You Don't have any items in card`,
        description: 'Please Continue Shoppping | Now redirecting....',
    });
};

const modalPaymentClose = type => {
    notification[type]({
        message: `Please make payment to finish your order`,
        description: 'Payment closed. Please click on PLACE ORDER to complete your order....',
    });
};

const modalNoCart = type => {
    notification[type]({
        message: 'No Items In Cart For Checkout',
        description: 'Redirecting to shop. Please keep shopping.',
    });
};


const WPFormCheckout = (props) => {
    
    // const handleSelectChange = (e) => {
    //     console.log(e)
    // }
    useEffect(()=> {
        setTimeout(()=>{
          if(props.cart.cartItems.length === 0){
            modalNoCart('warning')
            Router.push('/shop')
        }  
        }, 3000);
        
    }, [])
    // console.log(props)
    // console.log(auth)
    // console.log({cart})


    
    const dispatch = useDispatch();
    // console.log({dispatch})
    const [form] = Form.useForm();
    const [formLoad, setformLoad] = useState(false)
    const [paymentGateways, setPaymentGateways] = useState(null);
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [isDifferentAddress, setIsDifferentAddress] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shippingAxis, setShippingAxis] = useState('')
    const [shippingAxisPrice, setShippingAxisPrice] = useState(0)




    const chargeAmount = parseInt(props.cart.amount) + shippingAxisPrice
    const config = {
      reference: (new Date()).getTime(),
      email: props.auth.email,
      amount: chargeAmount * 100,
      publicKey: 'pk_live_8b7f36c3f95a9f0557a6e82f72d1be70deb8c130',
  };

        // you can call this function anything
  const onPaymentSuccess = (reference) => {
      setformLoad(false)
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference);
    // Router.push('/account/checkout-success')
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log('closed')
    setformLoad(false)
    modalPaymentClose('warning')
  }

    const initializePayment = usePaystackPayment(config);


    useEffect(()=> {
        // setShippingAxisPrice(shippingAxisPrice + 1)
        if(props.cart.cartItems.length > 1){
            setShippingAxisPrice(1000)
        }
        else{
            switch (shippingAxis) {
            case `ILORIN-OUTSKIRTS AXIS`:
                    // shipping_total = 700
                    setShippingAxisPrice(700)
                break;
            case "OFFA-GARAGE AXIS":
                    // shipping_total = 400
                    setShippingAxisPrice(400)
                break;
            case "TAIWO AXIS":
                    // shipping_total = 400
                    setShippingAxisPrice(400)
                break;
            case "TANKE AXIS":
                    // shipping_total = 400
                    setShippingAxisPrice(400)
                break;
            case "GAMBARI-OJA AXIS":
                    // shipping_total = 500
                    setShippingAxisPrice(500)
                break;
            case "SANGO AXIS":
                    // shipping_total = 500
                    setShippingAxisPrice(500)
                break;
            case "OYUN AXIS":
                    // shipping_total = 600
                    setShippingAxisPrice(600)
                break;
            case "GERIN-ALIMI AXIS":
                    // shipping_total = 500
                    setShippingAxisPrice(500)
                break;
            case "GAA-AKANBI":
                    // shipping_total = 400
                    setShippingAxisPrice(400)
                break;
            case "HALIKMA-UNIVERSITY AXIS":
                    // shipping_total = 600
                    setShippingAxisPrice(600)
                break;
            case "ASA-DAM AXIS":
                    // shipping_total = 500
                    setShippingAxisPrice(500)
                break;
            case "FATE AXIS":
                    // shipping_total = 400
                    setShippingAxisPrice(400)
                break;
            case "AGBABIAKA AXIS":
                    // shipping_total = 400
                    setShippingAxisPrice(400)
                break;
            case "PAATA AXIS":
                    // shipping_total = 600
                    setShippingAxisPrice(600)
                break;
            default:
                break;
        }
        }
        

    }, [shippingAxis])
            

        

    async function getCheckoutData() {
        const WPGateways = await WPOrderRepository.getPaymentGateWays();
        if (WPGateways) {
            // console.log(WPGateways);
            setPaymentGateways(WPGateways);
            setTimeout(function () {
                setLoading(false);
            }, 200);
            return WPGateways;
        } else {
            setPaymentGateways(null);
            return null;
        }
    }

    function handleSelectPaymentGateway(e) {
        const selectedGateway = paymentGateways.find(
            (item) => item.id === e.target.value
        );
        setSelectedGateway(selectedGateway);
    }

    async function handleSubmit(values) {
        setformLoad(true)
        // console.log(values)
        let shipping_total;
        switch (values.shipping_axis) {
            case "ilorin-outskirts":
                    shipping_total = 700
                break;
            case "offa-garage":
                    shipping_total = 400
                break;
            case "taiwo":
                    shipping_total = 400
                break;
            case "tanke":
                    shipping_total = 400
                break;
            case "gambari-oja":
                    shipping_total = 500
                break;
            case "sango":
                    shipping_total = 500
                break;
            case "oyun":
                    shipping_total = 600
                break;
            case "gerin-alimi":
                    shipping_total = 500
                break;
            case "gaa-akanbi":
                    shipping_total = 400
                break;
            case "halikma-university":
                    shipping_total = 600
                break;
            case "asa-dam":
                    shipping_total = 500
                break;
            case "fate":
                    shipping_total = 400
                break;
            case "agbabiaka":
                    shipping_total = 400
                break;
            case "paata":
                    shipping_total = 600
                break;
            default:
                break;
        }

        let WPShipping, WPLineItems;
        let checkoutData = {
            payment_method: null,
            payment_method_title: null,
            set_paid: false,
            billing: null,
            shipping: null,
            line_items: null,
            customer_id: props.auth.user_id,
            shipping_lines: [
                {
                    method_id: 'axis_rate',
                    method_title: 'Axis Rate',
                    total: shipping_total,
                },
            ],
        };
        let WPBilling = {
            first_name: values.first_name,
            last_name: values.last_name,
            address_1: values.address_1,
            // address_2: values.address_2,
            city: values.city,
            state: values.state,
            postcode: values.postcode,
            country: values.country,
            email: values.email,
            phone: values.phone,
        };

        if (isDifferentAddress) {
            WPShipping = {
                first_name: values.shipping_first_name,
                last_name: values.shipping_last_name,
                address_1: values.shipping_address_1,
                // address_2: values.shipping_address_2,
                city: values.shipping_city,
                state: values.shipping_state,
                postcode: values.shipping_state,
                country: values.shipping_country,
            };
        } else {
            WPShipping = {
                first_name: values.first_name,
                last_name: values.last_name,
                address_1: values.address_1,
                // address_2: values.address_2,
                city: values.city,
                state: values.state,
                postcode: values.postcode,
                country: values.country,
            };
        }
        if (selectedGateway) {
            if (props.cart.cartItems) {
                WPLineItems = props.cart.cartItems.map((item) => ({
                    product_id: item.id,
                    quantity: item.quantity,
                }));
            }
            checkoutData.payment_method = selectedGateway.id;
            checkoutData.payment_method_title = selectedGateway.title;
            checkoutData.billing = WPBilling;
            checkoutData.shipping = WPShipping;
            checkoutData.line_items = WPLineItems;
            
            
            // console.log(checkoutData)
            if (selectedGateway.id === 'paystack') {
                // console.log(checkoutData)
                    // you can call this function anything
                const onPaymentSuccess = async (reference) => {
                    // Implementation for whatever you want to do with reference and after success call.
                    console.log(reference);
                    checkoutData.set_paid = true
                    console.log(checkoutData)
                    const result = await WPOrderRepository.createNewOrder(
                        convertToURLEncoded(checkoutData)
                    );
                    if (result) {
                        console.log("Paid: ", result)
                        setformLoad(false)
                        modalPaidSuccess('success')
                        Router.push('/account/checkout-success')
                    } else{
                        setformLoad(false)
                        modalPaidFail('warning')
                    }

                    
                };
                // initializePayment(onPaymentSuccess, onClose)

            } else if(selectedGateway.id === 'cod'){
                console.log("Pay On Del: ", checkoutData)
                        const result = await WPOrderRepository.createNewOrder(
                        convertToURLEncoded(checkoutData)
                    );
                    if (result) {
                        console.log("Paid: ", result)
                        setformLoad(false)
                        modalCODSuccess('success')
                        dispatch(clearCartTotally())
                        Router.push('/account/checkout-success')
                    } else{
                        setformLoad(false)
                        modalCODFail('warning')
                    }
            }else {
                // window.open('https://www.paypal.com/', '_blank');
            }
        }
        
    }

    function handleChangeDifferentAddress(e) {
        setIsDifferentAddress(e.target.checked);
    }

    useEffect(() => {
        getCheckoutData();
    }, [dispatch]);

    // Views
    let listItemsView,
        shippingInfoView,
        paymentGatewaysView,
        selectedPaymentGateway,
        buttonOrderView;

    if (props.cart.cartItems && props.cart.cartItems.length > 0) {
        listItemsView = props.cart.cartItems.map((product) => (
            <Link href="/" key={product.id}>
                <a>
                    <strong>
                        {product.name}
                        <span>x{product.quantity}</span>
                    </strong>
                    <small>₦{product.quantity * product.price}</small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }

    if (paymentGateways) {
        const radioItems = paymentGateways.map((item) => {
            if (item.enabled) {
                return (
                    <Radio value={item.id} key={item.id}>
                        {item.title}
                    </Radio>
                );
            }
        });
        paymentGatewaysView = (
            <Radio.Group onChange={(e) => handleSelectPaymentGateway(e)}>
                {radioItems}
            </Radio.Group>
        );
        if (selectedGateway) {
            selectedPaymentGateway = (
                <div className="ps-selected-payment-gateway">
                    <h4>{selectedGateway.title}</h4>
                    <p>{selectedGateway.description}</p>
                </div>
            );
            if (selectedGateway.id === 'paypal') {
                buttonOrderView = (
                    <button className="ps-btn ps-btn--fullwidth">
                        Proceed to PayPal
                    </button>
                );
            } else {
                buttonOrderView = (
                    <>
                    {!formLoad ?
                                 <button type="submit"className='ps-btn ps-btn--fullwidth' type="submit">Place Order
                                 </button>
                                : 
                                <button type="submit"className='ps-btn ps-btn--fullwidth form-load-disabled' disabled>Placing Order...
                                <div class="spinner-border text-light" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                </button>
                                }
                    </>
                    // <button className="ps-btn ps-btn--fullwidth disabled" disabled type="submit" >
                    //     Place Order
                    // </button>
                );
            }
        }
    }

    if (isDifferentAddress) {
        shippingInfoView = (
            <figure>
                <h3 className="ps-form__heading">Shipping information</h3>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                First Name <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Email or phone number"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                Last Name <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                Address 1 <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_address_1"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>Shipping Axis <span className="required">*</span></label>
                                    <Form.Item
                                    name="shipping_axis"
                                    rules={[
                                            {
                                                required: true,
                                                message: 'This field is required.',
                                            }
                                            ]}
                                            >
                                    <Select size="large" onChange={e => setShippingAxis(`${e.toUpperCase()} Axis`)}>
                                        <Select.Option className="form-control ant-input" value="ilorin-outskirts">Outskirts of Ilorin</Select.Option>
                                        <Select.Option className="form-control ant-input" value="offa-garage">Offa Garage Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="taiwo">Taiwo Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="tanke">Tanke Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="gambari-oja">Gambari/Oja Oba/Akerebiata Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="sango">Sango Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="oyun">Oyun Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="gerin-alimi">Gerin Alimi</Select.Option>
                                        <Select.Option className="form-control ant-input" value="gaa-akanbi">Gaa Akanbi</Select.Option>
                                        <Select.Option className="form-control ant-input" value="halikma-university">Halikma University Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="asa-dam">Asa Dam/Irewolede Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="fate">Fate Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="agbabiaka">Agbabiaka Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="paata">Paata Axis</Select.Option>
                                    </Select>
                                    </Form.Item>
                            {/* <Form.Item
                                name="shipping_address_2"
                                rules={[
                                    {
                                        
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item> */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                City <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_city"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                State <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_state"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                Postcode <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_postcode"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="form-group">
                            <label>
                                Country <span className="required">*</span>
                            </label>
                            <Form.Item
                                name="shipping_country"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required.',
                                    },
                                ]}>
                                <Input className="form-control" type="text" />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </figure>
        );
    }

    return (
        <Form
            form={form}
            name="control-hooks"
            className="ps-form--checkout"
            onFinish={handleSubmit}>
            <div className="row">
                <div className="col-lg-8">
                    <figure>
                        <h3 className="ps-form__heading">
                            Billing information
                        </h3>
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        First Name{' '}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="first_name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Last Name{' '}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="last_name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Address 1{' '}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="address_1"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>Shipping Axis <span className="required">*</span></label>
                                    <Form.Item
                                    name="shipping_axis"
                                    rules={[
                                            {
                                                required: true,
                                                message: 'This field is required.',
                                            }
                                            ]}>
                                    <Select size="large" onChange={e => setShippingAxis(`${e.toUpperCase()} AXIS`)}>
                                        <Select.Option className="form-control ant-input" value="ilorin-outskirts">Outskirts of Ilorin</Select.Option>
                                        <Select.Option className="form-control ant-input" value="offa-garage">Offa Garage Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="taiwo">Taiwo Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="tanke">Tanke Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="gambari-oja">Gambari/Oja Oba/Akerebiata Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="sango">Sango Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="oyun">Oyun Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="gerin-alimi">Gerin Alimi</Select.Option>
                                        <Select.Option className="form-control ant-input" value="gaa-akanbi">Gaa Akanbi</Select.Option>
                                        <Select.Option className="form-control ant-input" value="halikma-university">Halikma University Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="asa-dam">Asa Dam/Irewolede Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="fate">Fate Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="agbabiaka">Agbabiaka Axis</Select.Option>
                                        <Select.Option className="form-control ant-input" value="paata">Paata Axis</Select.Option>
                                    </Select>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        City <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="city"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        State{' '}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="state"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Postcode{' '}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="postcode"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Country{' '}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="country"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Email{' '}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="form-group">
                                    <label>
                                        Phone Number{' '}
                                        <span className="required">*</span>
                                    </label>
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'This field is required.',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </figure>
                    <div className="form-group">
                        <Checkbox
                            onChange={(e) => handleChangeDifferentAddress(e)}>
                            Ship to a different address?
                        </Checkbox>
                    </div>
                    {shippingInfoView}
                </div>
                <div className="col-lg-4 ps-block--checkout-order">
                    <div className="ps-form__orders">
                        <h3>Your order</h3>
                        <div className="ps-block--checkout-order">
                            <div className="ps-block__content">
                                <figure>
                                    <figcaption>
                                        <strong>Product</strong>
                                        <strong>SubTotal</strong>
                                    </figcaption>
                                </figure>
                                <figure className="ps-block__items">
                                    {listItemsView}
                                </figure>
                                <figure>
                                    <figcaption>
                                        <strong>Subtotal</strong>
                                        <strong className="red">
                                            ₦{props.cart.amount}
                                        </strong>
                                    </figcaption>
                                </figure>
                                {shippingAxis && <figure>
                                    <figcaption>
                                        <strong>Shipping Axis: </strong>
                                        <small>{shippingAxis}</small>
                                    </figcaption>
                                </figure>}
                                {shippingAxisPrice > 0 && <figure>
                                    <figcaption>
                                        <strong>Shipping Fee:</strong>
                                        <small>{shippingAxisPrice}</small>
                                    </figcaption>
                                </figure>}
                                
                                <figure className="ps-block__total">
                                    <figcaption>
                                        <strong>Total</strong>
                                        <strong className="red">
                                            ₦{parseInt(props.cart.amount) + shippingAxisPrice}.00
                                        </strong>
                                    </figcaption>
                                </figure>
                                <div className="ps-block__payment-gateways">
                                    {paymentGatewaysView}
                                    {selectedPaymentGateway}
                                </div>
                            </div>
                            {buttonOrderView}
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
};

const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(WPFormCheckout);
