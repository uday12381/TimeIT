import React from 'react'
import Block from './Blocks.js'
import { Fragment } from 'react';

import './days.css'

const Days = (props) => {

    const tasks = props.todo.map(task => {

        const top = task.slotStart / 1440 * 100
        const height = task.timeRequired / 1440 * 100

        const t = top + '%'
        const h = height + '%'

        const mystyle = {
            position: "absolute",
            width: "100%",
            backgroundColor: "steelblue",
            color: "white",
            top: t,
            height: h,
            textAlign: "center",
            border: "1px solid black"
        }

        const k = task.id

        return (
            <div className="task" key={k} style={mystyle}>
                {task.taskName}
            </div>
        )
    })

    return (
        <div className="day">
            <Block />
            <Block />
            <Block />
            <Block />

            <Block />
            <Block />
            <Block />
            <Block />

            <Block />
            <Block />
            <Block />
            <Block />

            <Block />
            <Block />
            <Block />
            <Block />

            <Block />
            <Block />
            <Block />
            <Block />

            <Block />
            <Block />
            <Block />
            <Block />

            <Fragment>
                {tasks}
            </Fragment>

        </div>
    )
}

export default Days