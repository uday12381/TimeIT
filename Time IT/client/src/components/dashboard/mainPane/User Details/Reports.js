import React, { useState } from 'react'
import { getTasks } from '../../../../actions/task'

import './Reports.css'

const Reports = () => {

    const [formData, setFormData] = useState({
        start: '',
        end: ''
    })

    const { start, end } = formData

    var randomData = {}

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        if (start < end) {
            var x = {}
            await getTasks((start), (end)).then((response) => {
                x = (response.data)
                console.log(x)
            })
            randomData = x
            console.log(x, randomData)
        } else {
            alert('Please enter valid dates')
        }
    }

    const generateReport = () => {
        localStorage.setItem("tasks", JSON.stringify(randomData))
        window.open('/report', "_blank")
    }

    return (
        <div id="report">
            <br />
            <br />
            <h1>To generate reports please enter start and end dates</h1>
            <br />
            <form id='f' onSubmit={e => onSubmit(e)}>
                <label>Start Date:   </label>
                <input
                    type="date"
                    name="start"
                    value={start}
                    onChange={e => onChange(e)}
                    required
                />
                <label>End Date:   </label>
                <input
                    type="date"
                    name="end"
                    value={end}
                    onChange={e => onChange(e)}
                    required
                />
                <button className="btn btn-primary">Generate</button>
                <br />
                <button className="btn btn-primary" onClick={generateReport}>View Report</button>
            </form>
        </div>
    )
}

export default Reports