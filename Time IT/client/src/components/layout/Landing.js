import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Fragment } from 'react';

const Landing = ({ auth: { isAuthenticated, loading } }) => {

    const authLinks = (
        <div className="buttons">
            <Link to="/dashboard" className="btn btn-primary">Move to Dashboard</Link>
        </div>
    )

    const guestLinks = (
        <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
        </div>
    )

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 id="x-large">Time IT</h1>
                    <p className="lead">
                        A dynamic task scheduler that helps one become more productive.
                    </p>
                    {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing)