import {useState, useEffect} from 'react';
import Router from 'next/router';
import axios from 'axios';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {notification} from 'antd';



const modalLogNotification = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};


const ResetPassword = () => {
    const [codeMode, setCodeMode] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [setPasswordMode, setSetPasswordMode] = useState(false)
    const [password, setPassword] = useState("")
    const [formLoad, setFormLoad] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const emailVerification = () => {
        const emailBody = JSON.stringify({email})
        // console.log(emailBody)
        setFormLoad(true)
        axios.post('https://virem.learnmur.com.ng/wp-json/bdpwr/v1/reset-password', emailBody, {
            headers:{
                'Accept': '*/*', 
                "Content-Type":"application/json"  
            }
        })
        .then(res=> {
            // console.log(res)
            modalLogNotification('success', 'Password Reset Code Sent Successfully', res.data.message)
            setFormLoad(false)
            setCodeMode(true)
        })
        .catch(err=>{
            // console.log(err)
            modalLogNotification('warning', 'Email Verification Failed', 'Invalid email address. Please check and retry')
            setFormLoad(false)
        })
    }

    const codeVerification = () => {
        const codeBody = JSON.stringify({email, code})
        // console.log(codeBody)
        setFormLoad(true)
        axios.post('https://virem.learnmur.com.ng/wp-json/bdpwr/v1/validate-code', codeBody, {
            headers:{
                'Accept': '*/*', 
                "Content-Type":"application/json"  
            }
        })
        .then(res=> {
            // console.log(res)
            modalLogNotification('success', 'Code Valid', res.data.message)
            setFormLoad(false)
            setSetPasswordMode(true)
        })
        .catch(err=>{
            // console.log(err)
            // console.log(err.message)
            modalLogNotification('warning', 'Invalid Code', 'Invalid code given. Please check and retry')
            setFormLoad(false)
        })

    }

    const handleVerification = (e) => {
        e.preventDefault();

        if(!formLoad){
            if(!codeMode){
            emailVerification()
            } else{
                codeVerification()
            }
        }
        
    }

    const clearPassMode = () => {
        setSetPasswordMode(false)
        setCodeMode(false)
        setShowPassword(false)
        setPassword("")
        setCode("")
        setEmail("")
    }

    const clearCodeMode = () => {
        setCodeMode(false)
        setCode("")
        setEmail("")
    }


    const handlePasswordSet = (e) => {
        e.preventDefault();
        const setPasswordBody = JSON.stringify({email, code, password})
        // console.log(setPasswordBody)
        setFormLoad(true)
        axios.post('https://virem.learnmur.com.ng/wp-json/bdpwr/v1/set-password', setPasswordBody, {
            headers:{
                'Accept': '*/*', 
                "Content-Type":"application/json"  
            }
        })
        .then(res=> {
            // console.log(res)
            modalLogNotification('success', 'Password has been reset', res.data.message)
            setFormLoad(false)
            clearPassMode()
            setTimeout(()=> {
                Router.push('/account/login')
            }, 3000)
        })
        .catch(err=>{
            // console.log(err)
            // console.log(err.message)
            modalLogNotification('warning', 'Password Reset Failed', 'Invalid email/code given. Please check and retry')
            setFormLoad(false)
            clearPassMode()
        })
    }


    if(!setPasswordMode){
        return (
            <div className="ps-order-tracking">
                <div className="container">
                    <div className="ps-section__header">
                        <h3>Forgot Password?</h3>
                        <p>
                            {codeMode ? "To reset your password, kindly enter the code sent to your email address." : "To reset your password, kindly enter the email address associated with the account below."}
                        </p>
                    </div>
                    <div className="ps-section__content">
                        <form className="ps-form--order-tracking mb-0" onSubmit={handleVerification}>
                            <div className="form-group">
                                <label>{codeMode ? "Enter Code" : "Email Address"}</label>
                                {!codeMode ? 
                                <input
                                    className="form-control"
                                    type={"email"}
                                    placeholder={"Enter your email address"}
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                
                                />
                                    :
                                <input 
                                    className="form-control"
                                    type={"number"}
                                    placeholder={"Enter code sent to email"}
                                    onChange={(e)=>{setCode(e.target.value)
                                    }}
                                
                                />
                            }
                            </div>
                            <div className="form-group submit">
                               {!formLoad ?
                                 <button type="submit"className='ps-btn ps-btn--fullwidth'>{codeMode ? "Verify Code" : "Continue"}
                                 </button>
                                : 
                                <button type="submit"className='ps-btn ps-btn--fullwidth form-load-disabled' disabled>{codeMode ? "Verifying Code":"Verifying email"}
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </button>
                                }
  
                            </div>
                            {/* <div className="form-group">
                                <button className="ps-btn ps-btn--fullwidth">Continue</button>
                            </div> */}
                        </form>
                        {codeMode && <div className="ps-form--order-tracking">
                            <button className='ps-btn ps-btn--fullwidth bg-dark text-white' onClick={clearCodeMode}>Cancel</button>
                        </div>}
                        
                    </div>
                </div>
            </div>
        )
    } else{
        return(
            <div className="ps-my-account">
                <div className="container">
                    <form className='ps-form--account pb-5' onSubmit={e=> handlePasswordSet(e)}>
                        <div className="ps-tab active" id="set-passord">
                            <div className="ps-form__content pb-5">
                                <h5 className='text-center display-3'>Input your new password</h5>

                                <div className="form-group form-forgot position-relative">
                                <label className="form-label">Password</label>
                                    <div className='btn pass_check_btn' onClick={()=> {
                                        setShowPassword(!showPassword)
                                    }}>
                                        {showPassword ? <AiOutlineEyeInvisible  className='password_check' />  : <AiOutlineEye  className='password_check' />}
                                    </div>
                                    <input type={showPassword ? 'text' : 'password'} required className='form-control' onChange={(e)=>setPassword(e.target.value)}/> 
                                    
                                 
                                </div>
                                
                                <div className="form-group submit">
                               {!formLoad ?
                                 <button type="submit"className='ps-btn ps-btn--fullwidth'>Set New Password
                                 </button>
                                : 
                                <button type="submit"className='ps-btn ps-btn--fullwidth form-load-disabled' disabled>Resetting Password
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </button>
                                }
  
                                </div>
                            </div>
                        </div>
                    </form>
                    <div style={{maxWidth: "460px", padding: "0px 30px 50px 30px"}}className="mx-auto">
                    <button className='ps-btn ps-btn--fullwidth bg-dark text-white' onClick={clearPassMode}>Back</button>
                    </div>
                    

                </div>
            </div>
        )
    }
    
};

export default ResetPassword;
