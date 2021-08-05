import React from "react";
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import Scheduler from './Scheduler'
import { Task } from './Task'
import DisplayTasks from './DisplayTasks'
import './TaskList.css'
import { addTask, updateTask } from '../../../../actions/task'

const moment = require('moment');
moment().format();

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.currTime = parseInt(this.props.user.startTime) * 60;//need to get it from the database
        this.dayEndTime = parseInt(this.props.user.endTime) * 60;
        this.todayIDX = this.props.idx;
        this.defaultCurrTime = this.props.user.startTime * 60;
        this.state = {
            taskName: "",
            taskDescription: "",
            date: "",
            slotStart: "",
            slotEnd: "",
            endTime: "",
            priority: '',
            timeRequired: '',
            type: "nonRestrictive",
            isActive: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
        this.updateCurrTime = this.updateCurrTime.bind(this);

        this.flag = true

    }
    updateCurrTime() {
        this.currTime = this.props.user.startTime * 60;
        this.dayEndTime = this.props.user.endTime * 60;
        let today = new Date();
        let val = today.getHours() * 60 + today.getMinutes();
        
        console.log('entered currenttime', this.currTime, val)
        if (this.props.tasks[this.todayIDX].length !== 0) {
            this.currTime = val;
            for (let x of this.props.tasks[this.todayIDX]) {
                console.log(x)
                if (x.slotStart <= val && val <= x.slotEnd) {
                    this.currTime = Math.max(x.slotEnd, this.currTime);
                }
            }
        } else {
            this.currTime = Math.max(this.currTime, val);
        }
    }
    clear() {
        this.setState({
            taskName: "",
            taskDescription: "",
            date: "",
            slotStart: "",
            slotEnd: "",
            endTime: "",
            priority: "",
            timeRequired: "",
        });
    }
    getDate(d, m, y) {
        var st = ''
        st += y + '-'

        if (m < 10) {
            st += '0' + m
        } else {
            st += m
        }

        st += '-'

        if (d < 10) {
            st += '0' + d
        } else {
            st += d
        }

        return st
    }
    handleClick(e) {
        var sunday = moment()
        sunday.startOf('week')
        const sundayDate = sunday._d.getDate()
        
        const dateString = this.state.date
        const endTime = this.state.endTime

        var d = parseInt(dateString.split('-')[2])
        var m = parseInt(dateString.split('-')[1])
        var y = parseInt(dateString.split('-')[0])

        var h = parseInt(endTime.split(':')[0])
        var min = parseInt(endTime.split(':')[1])


        const newTaskDateTimeEntered = new Date(y, m - 1, d, h, min)
        const dateTimeNow = new Date()
        if (!(newTaskDateTimeEntered > dateTimeNow)) {
            alert('Please check the end date and time entered!(Deadline)')
            this.clear()
            return
        }


        const newTask = new Task(this.state.taskName, this.state.taskDescription, this.getDate(d, m, y), (h * 60 + min), parseInt(this.state.priority), parseInt(this.state.timeRequired), this.state.type)

        const presentDay = moment()

        const nextWeekStart = moment(presentDay).add(1, 'week').startOf('week')
        const nextWeekStartD = nextWeekStart._d.getDate()
        const nextWeekStartM = nextWeekStart._d.getMonth()
        const nextWeekStartY = nextWeekStart._d.getFullYear()
        const nextWeekStartDate = new Date(nextWeekStartY, nextWeekStartM, nextWeekStartD)
        if (newTaskDateTimeEntered >= nextWeekStartDate) {
            addTask(newTask)
        } else {
            var i = d % sundayDate
            var temp_tasks = []
            this.props.tasks.forEach(dayTasks => {
                temp_tasks.push([...dayTasks])
            })
            temp_tasks[i].push(newTask)
            this.updateCurrTime()
            var t = d === presentDay._d.getDate() ? this.currTime : this.defaultCurrTime
            var res = Scheduler(temp_tasks[i], t, this.dayEndTime)
            if (res[0] === true) {
                temp_tasks[i] = res[1]
                window.location.reload()
            }
            else
                alert('Task cannot be scheduled')
        }
        this.clear();
    }
    handleInput(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }
    handleChange(e) {
        var x = e.target.value;
        this.setState({
            date: x.substr(0, 10),
            endTime: x.substr(11),
        });
    }
    handleToggle = () => {
        this.setState({ isActive: !this.state.isActive });
    };
    render() {
        let f = false;
        for (let x of this.props.tasks) {
            f |= x.length > 0;
        }
        if (this.flag && f) {
            this.defaultCurrTime = this.props.user.startTime * 60;
            this.todayIDX = this.props.idx;
            this.flag = false
            this.updateCurrTime()
            Scheduler(this.props.tasks[this.todayIDX], this.currTime, this.dayEndTime);
            for (let i = 0; i < this.props.tasks.length; i++) {
                this.props.tasks[i].sort((a, b) => a.slotStart - b.slotEnd);
            }
        }

        return (
            <div className="taskList">
                <Col id="daily">
                    <div id="tasks-list">
                        <DisplayTasks tasks={this.props.tasks} idx={this.todayIDX} />
                    </div>
                    <div id='form' className={this.state.isActive ? "form-active" : null}>

                        <div id="form-icon" onClick={this.handleToggle}><p>+</p></div>
                        <Row>
                            <Form.Label>Enter new task details</Form.Label>
                            <br />
                            <FormControl
                                name="taskName"
                                onChange={this.handleInput}
                                value={this.state.taskName}
                                placeholder="Task Name"
                                required
                            />
                        </Row>
                        <Row>
                            <FormControl
                                name="taskDescription"
                                onChange={this.handleInput}
                                value={this.state.taskDescription}
                                placeholder="Task Description (Optional)"
                            />
                        </Row>
                        <Form.Label>Deadline</Form.Label>
                        <Row>
                            <input
                                type="datetime-local"
                                value={this.state.date + "T" + this.state.endTime}
                                onChange={this.handleChange}
                                required
                            />
                        </Row>
                        <Row>
                            <input
                                type="number"
                                placeholder="Priority"
                                value={this.state.priority}
                                name="priority"
                                min="1"
                                max="10"
                                onChange={this.handleInput}
                                required
                            />
                        </Row>
                        <Row>
                            <input
                                type="number"
                                placeholder="Time Required"
                                value={this.state.timeRequired}
                                name="timeRequired"
                                min="1"
                                onChange={this.handleInput}
                                required
                            />
                        </Row>
                        <Row>
                            <Form.Control
                                as="select"
                                name="type"
                                value={this.state.type}
                                onChange={this.handleInput}
                                id="select-box"
                            >
                                <option value="" disabled>SELECT TYPE OF TASK</option>
                                <option value="nonRestrictive">Non-Restrictive</option>
                                <option value="restrictive">Restrictive</option>
                            </Form.Control>
                        </Row>
                        <Row>
                            <Button variant="success" onClick={this.handleClick}>
                                Add Task
                            </Button>
                        </Row>
                    </div>
                </Col>
            </div>
        );
    }
}
export default TaskList;