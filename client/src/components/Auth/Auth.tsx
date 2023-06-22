import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import { Axios } from 'axios';
// @ts-ignore
import signinImage from "../../assets/signup.jpg";


const Auth = () => {

    const [isSignup, setIsSignup] = useState(true);    
    const handleChange = () => {};

    return (
    <div className='auth__form-container'>
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                {/* remeber this react ternary operator nicole */}
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={() => {}}>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='fullName'>Full Name</label>
                            <input
                                name='fullName'
                                type="text"
                                placeholder='Full Name'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                
                        
                </form>
            </div>
        </div>
    </div>
    )
}

export default Auth