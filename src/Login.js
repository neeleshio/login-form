import React, { Component } from 'react';
import axios from 'axios'
import './Login.scss';
import { Link } from 'react-router-dom';

const initialState = {
    email: '',
    password: '',
    type: 'password',
    switch: false,
    error: '',
    emailError: ''
}

export default class Form extends Component {
    constructor() {
        super()
        this.state = initialState;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    togglePassword = (e) => {
        this.setState({
            type: this.state.type === 'password' ? 'input' : 'password',
            switch: !this.state.switch
        })
    }

    validate = (e) => {
        let emailError = '';

        if (!this.state.email.includes('@' && '.')) {
            emailError = 'fas fa-times'
        } else {
            emailError = 'fas fa-check'
        }

        this.setState({ emailError })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let error = '';
        let data = {
            "email": this.state.email,
            "password": this.state.password
        }

        axios.post('http://localhost:5000/api/user/login', data).then(response => {
            this.setState(initialState)
            console.log(response)
        }).catch(error => {
            this.setState(this.state)
            this.setState({ error: '! INVALID EMAIL OR PASSWORD' })
            console.log(error)
        });

    }

    render() {

        return (
            <form className="form-container" onSubmit={this.handleSubmit} autocomplete="off" style={{ height: 350 }}>
                <div className="form-links">
                    <Link to='/'>
                        <li className="login">LOGIN</li>
                    </Link>
                    <Link to='/register'>
                        <li className="register">SIGN UP</li>
                    </Link>
                </div>

                <div className="form-fields">
                    <input type="text" placeholder="Your Email" name="email" value={this.state.email} onChange={this.handleChange} onBlur={this.validate} />
                    <span className="check">
                        <i className={this.state.emailError} ></i>
                    </span>
                    <br />
                    <div>
                        <input autocomplete="new-password" type={this.state.type} placeholder="Your Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <span className="eye">
                            <i className={!this.state.switch ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={this.togglePassword} ></i>
                        </span>
                    </div>
                    <div className="error">{this.state.error}</div>
                    <br />
                    <button type="submit">LOGIN</button>
                </div>

                <div className="signin">
                    <p>SIGNIN WITH</p>
                    <div className="signin_icons">
                        <a href="">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="">
                            <i class="fab fa-facebook-square"></i>
                        </a>
                    </div>
                </div>
            </form>

        )
    }
}
