import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const newUser = {
            email,
            password
        }

        try {
            const config = {
                Headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(newUser);

            const res = await axios.post('/api/auth', newUser, config);
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <div class="alert alert-danger">
                Invalid credentials
      </div>
            <h1 class="large text-primary">Sign In</h1>
            <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
            <form class="form" aonSubmit={e => onSubmit(e)}>
                <div class="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </form>
            <p class="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}


export default Login