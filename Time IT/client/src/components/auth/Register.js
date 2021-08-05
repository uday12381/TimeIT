import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated, token, user }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        startTime: '',
        endTime: ''
    })

    const { name, email, password, password2, startTime, endTime } = formData


    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2)
            setAlert('Passwords do not match', 'danger')
        else if (!(parseInt(startTime) >= 4 && parseInt(endTime) <= 23 && parseInt(endTime) > parseInt(startTime)))
            setAlert('Timings entered for working hours is incorrect', 'danger')
        else
            register({ name, email, password, startTime, endTime })
    }

    //REDIRECT IF REGISTERED
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

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <div className="lr-page r-page">
            <div className="containerLR">
                <h1>Create your account</h1>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className="form-control">
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => onChange(e)}
                            required
                        />
                        <label className="formLabel">
                            Name
                        </label>

                    </div>
                    <div className="form-control">
                        <input
                            type="text"
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
                            minLength="6"
                            value={password}
                            onChange={e => onChange(e)}
                            required
                        />
                        <label className="formLabel">
                            Password
                        </label>
                    </div>
                    <div className="form-control">
                        <input
                            type="password"
                            name="password2"
                            minLength="6"
                            value={password2}
                            onChange={e => onChange(e)}
                            required
                        />
                        <label className="formLabel">
                            Confirm Password
                        </label>
                    </div>
                    <div className="form-control">
                        <input
                            type="number"
                            name="startTime"
                            min="4"
                            max="23"
                            value={startTime}
                            onChange={e => onChange(e)}
                            required
                        />
                        <label className="formLabel">
                            Start Time
                        </label>
                    </div>
                    <div className="form-control">
                        <input
                            type="number"
                            name="endTime"
                            min="4"
                            max="23"
                            value={endTime}
                            onChange={e => onChange(e)}
                            required
                        />
                        <label className="formLabel">
                            End Time
                        </label>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="text">Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.object
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    user: state.auth.user
})

export default connect(mapStateToProps, { setAlert, register })(Register)