import React from "react";
import { ListGroup } from "react-bootstrap";
import { deleteTask } from '../../../../actions/task'

class TaskCard extends React.Component {
    render() {
        const fun = (t) => {
            let temp = Math.floor(t / 60).toString();
            if (temp.length !== 2) {
                temp = "0" + temp;
            }
            return temp;
        }
        const fun2 = (t) => {
            let temp = (t % 60).toString();
            if (temp.length !== 2) {
                temp = "0" + temp;
            }
            return temp;
        }
        const deleteHandler = (e) => {
            deleteTask(this.props.taskID)
            window.location.reload()
        }
        return (
            <ListGroup.Item>
                {this.props.taskName}
                <p className="card-text float-right">
                    {fun(this.props.startTime) + " : " + fun2(this.props.startTime) + "  -  "}

                    {fun(this.props.endTime) + " : " + fun2(this.props.endTime)}
                </p>
                {this.props.status === "To do" ? <button id="delete" className="btn btn-primary" onClick={deleteHandler}>DELETE</button> : ""}
            </ListGroup.Item>
        );
    }
}
export default TaskCard;