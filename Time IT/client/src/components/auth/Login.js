import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'


const Login = ({ login, isAuthenticated, token, user }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        login(email, password)
    }

    //REDIRECT IF LOGGED IN
    if (isAuthenticated && token != null && user != null) {
        return <Redirect to="/dashboard" />
    }

    const labels = document.querySelectorAll('.form-control label')

    labels.forEach(label => {
        label.innerHTML = label.innerText
            .split('')
            .map((letter, i) => `<span style='transition-delay:${50 * i}ms'>${letter}</span>`)
            .join('')
    })

    return (
        <div className="lr-page">
            <div className="containerLR">
                <h1>Sign Into Your Account</h1>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-control">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                        <label className="formLabel">
                            Email
                        </label>
                    </div>
                    <div className="form-control">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            required
                        />
                        <label className="formLabel">
                            Password
                        </label>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Login"
                    />
                </form>
                <p className="text">Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
        </div>

    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.object
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    user: state.auth.user
})

export default connect(mapStateToProps, { login })(Login)
