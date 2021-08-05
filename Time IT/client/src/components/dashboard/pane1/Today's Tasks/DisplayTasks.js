import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import TaskCard from "./TaskCard";

import './DisplayTasks.css'

class DisplayTasks extends React.Component {
    render() {
        const tasks = this.props.tasks[this.props.idx].map((task) => {
            return (
                <TaskCard
                    key={Math.random()}
                    taskID={task.id}
                    taskName={task.taskName}
                    taskDesc={task.descr}
                    startTime={task.slotStart}
                    endTime={task.slotEnd}
                    status={task.status}
                />
            );
        });
        return <Card>
            <Card.Header>My Day</Card.Header>
            <Card.Body>
            <ListGroup variant="flush">
                {tasks}
            </ListGroup>
            </Card.Body>

        </Card>;
    }
}
export default DisplayTasks;
