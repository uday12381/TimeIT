import React from 'react'
import Reports from './Reports'

import './Profile.css'

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.user = this.props.user
    }

    render() {
        this.user = this.props.user;
        return (
            <div id="profile">
                <div id="user">
                    <div id="icon">
                        <img src={this.user.avatar} alt="" id="user-icon" />
                    </div>
                    <div id="details">
                        <h1 id="name">Hello, {this.user.name}</h1>
                    </div>
                </div>
                <hr />
                <div id="reports">
                    <h1 id="reports">REPORTS</h1>
                    <Reports />
                </div>
            </div>
        )
    }

}

export default Profile