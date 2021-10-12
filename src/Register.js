import React, { Component } from 'react';
import axios from 'axios'
import './Login.scss';
import { Link } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    password: '',
    type: 'password',
    switch: false,
    emailError: '',
    passwordError: '',
    nameError: ''
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

    validate = () => {
        let passwordError = '';

        if (this.state.password.length < 6) {
            passwordError = "! MUST BE MIN. 6 CHARACTERS"
        }

        if (passwordError) {
            this.setState({ passwordError })
            return false
        }

        return true
    }

    validateEmail = () => {
        let emailError = '';

        if (!this.state.email.includes('@' && '.')) {
            emailError = 'fas fa-times'
            this.setState({ emailError })
            return false
        } else {
            emailError = 'fas fa-check'
            this.setState({ emailError })
            return true
        }

    }

    validateName = () => {
        let nameError = ''

        if (!this.state.name) {
            nameError = 'fas fa-exclamation-circle'
            this.setState({ nameError })
            return false
        } else {
            nameError = 'fas fa-check'
            this.setState({ nameError })
            return true
        }


    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        const isEmail = this.validateEmail();
        const isName = this.validateName();
        if (isValid && isEmail && isName) {
            let data = {
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password,

            }

            axios.post('http://localhost:5000/api/user/login', data).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            });
            this.setState(initialState)
        }
    }

    render() {
        return (
            <form className="form-container" onSubmit={this.handleSubmit}>
                <div className="form-links">
                    <Link to='/'>
                        <li className="register">LOGIN</li>
                    </Link>
                    <Link to='/register'>
                        <li className="login">SIGN UP</li>
                    </Link>
                </div>

                <div className="form-fields">
                    <input type="text" placeholder="Full Name" name="name" value={this.state.name} onChange={this.handleChange} onBlur={this.validateName} />
                    <span className="check" style={{ top: 117 }}>
                        <i className={this.state.nameError}></i>
                    </span>
                    <br />
                    <input type="text" placeholder="Your Email" name="email" value={this.state.email} onChange={this.handleChange} onBlur={this.validateEmail} />
                    <span className="check-register" style={{ top: 172 }}>
                        <i className={this.state.emailError}></i>
                    </span>
                    <br />
                    <div>
                        <input autocomplete="new-password" type={this.state.type} placeholder="Your Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <span className="eye-register" style={{ top: 227 }}>
                            <i className={!this.state.switch ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={this.togglePassword} ></i>
                        </span>
                    </div>
                    <div className="password-error">{this.state.passwordError}</div>
                    <br />
                    <button type="submit">CREATE NEW ACCOUNT</button>
                </div>

                <div className="signin">
                    <p>SIGNIN WITH</p>
                    <div>
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
