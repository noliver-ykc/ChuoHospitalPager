import React, { useState, FormEvent } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios';
// @ts-ignore
import signinImage from "../../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',

}
const Auth = () => {

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        //console.log(form)
    };


    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup)
  }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        //stops page refreshing
        e.preventDefault();
        const { fullName, username, password, phoneNumber, avatarURL } = form;
        const URL = "http://localhost:4000/auth";
        const { data: { token,userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
          username, password, fullName, phoneNumber, avatarURL,
        })
        //set log in cookies
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
        // set sign up cookies
        if(isSignup){
          cookies.set('phoneNumber', phoneNumber);
          cookies.set('avatarURL', avatarURL);
          cookies.set('hashedPassword', hashedPassword);
        }
        //refresh to dir to chat as logged in user
        window.location.reload();

    }

    return (
    <div className='auth__form-container'>
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                {/* remeber this react ternary operator nicole */}
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={handleSubmit}>
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
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='username'>Username</label>
                        <input
                            name='username'
                            type="text"
                            placeholder='Username'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input
                                name='phoneNumber'
                                type="text"
                                placeholder='Phone Number'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='avatarURL'>Avatar URL</label>
                            <input
                                name='avatarURL'
                                type="text"
                                placeholder='Avatar URL'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='password'>Password</label>
                        <input
                            name='password'
                            type="password"
                            placeholder='Password'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* for password conformation */}
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                name='confirmPassword'
                                type="password"
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_button">
                        <button>{isSignup ? "Sign Up": "Sign in"}</button>
                    </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignup ? "Already have an Account? " : "Make a new account?"}
                        <span onClick={switchMode}>{isSignup ? 'Sign in' : 'Sign up'}</span>
                    </p>
                </div>
            </div>
        </div>
        {/* signin banner */}
        <div className="auth__form-container_image">
            <img src={signinImage} alt='signin'/>
        </div>
    </div>
    )
}

export default Auth
