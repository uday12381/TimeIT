import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const addTask = async ({ id, slotStart, slotEnd, taskName, taskDescription, date, endTime, priority, timeRequired, type, status }) => {

    if (localStorage.token) {

        setAuthToken(localStorage.token)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ id, slotStart, slotEnd, taskName, taskDescription, date, endTime, priority, timeRequired, type, status })
        try {
            await axios.put('/api/users/addtask', body, config)
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors)
                errors.forEach(error => console.log(error));
        }
    } else {
        console.log('AUTH ERROR')
    }
}

export const deleteTask = async (id) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
        try {
            await axios.delete(`/api/users/deletetask/${id}`)
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors)
                errors.forEach(error => console.log(error));
        }
    } else {
        console.log('AUTH ERROR')
    }
}

export const updateTask = async ({ id, slotStart, slotEnd, taskName, taskDescription, date, endTime, priority, timeRequired, type, status }) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ id, slotStart, slotEnd, taskName, taskDescription, date, endTime, priority, timeRequired, type, status })

        try {
            await axios.put('/api/users/updateTask', body, config)
        } catch (err) {
            const errors = err.response.data.errors
            if (errors)
                errors.forEach(error => console.log(error))
        }
    } else {
        console.log('AUTH ERROR')
    }
}

export const getTasks = async (startDate, endDate) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
        try {
            const res = await axios.get(`/api/users/gettasks/${startDate}/${endDate}`)
            console.log(res.data)
            return res
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log("No token found")
    }
}