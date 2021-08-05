import React from "react";

import "./Report.css";
import TableHelper from './TableHelper';

class ReportView extends React.Component {
  constructor(props) {
    super(props);

    const tasks = JSON.parse(localStorage.tasks);

    console.log(tasks);
    const map = new Map();
    try {
      this.taskcards = tasks.map((task) => {
        if (!map.has(task.date)) {
          map.set(task.date, []);
        }
        map.get(task.date).push(task);
        // return (

        //     <TaskCard

        //         id="taskcard"

        //         key={Math.random()}

        //         taskID={task.id}

        //         taskName={task.taskName}

        //         taskDesc={task.descr}

        //         startTime={task.slotStart}

        //         endTime={task.slotEnd}

        //         status={task.status}

        //     />

        // );
      });
    } catch (error) {
      this.taskcards = "";
    }
    this.data = [...map];
    this.data.sort((a, b) => new Date(a[0]) < new Date(b[0]) ? -1 : 1);
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].sort((a, b) => a.slotStart - b.slotStart);
    }
  }
  fun = (t) => {
    let temp = Math.floor(t / 60).toString();
    if (temp.length !== 2) {
        temp = "0" + temp;
    }
    return temp;
}
fun2 = (t) => {
    let temp = (t % 60).toString();
    if (temp.length !== 2) {
        temp = "0" + temp;
    }
    return temp;
}
  convert = (d) => {
    let current_datetime = new Date(d)
    let formatted_date = 
    (current_datetime.getDate() <= 9 ? "0" : "")+ current_datetime.getDate() + 
    "-" + 
    (current_datetime.getMonth() < 9 ? "0" : "") +  (current_datetime.getMonth() + 1) + 
    "-" + 
    current_datetime.getFullYear()

    return formatted_date
  }
  render() {
    const val = this.data.map(a => {
        let i = 1;
        return (
            a[1].map(b => {
            return(
            <tr>
                <td>{i++}</td>
                
                <td>{this.convert(b.date)}</td>
                <td>{b.taskName}</td>
                <td>{b.taskDescription}</td>
                <td>{this.fun(b.slotStart) + ":" + this.fun2(b.slotStart)}</td>
                <td>{this.fun(b.slotEnd) + ":" + this.fun2(b.slotEnd)}</td>
            </tr>
            )
            
        })
        );
    })
    console.log(val);
    return (
      // <Table striped bordered hover>
      //     <thead>
      //         <tr>
      //             <th>#</th>
      //             <th>Task Name</th>
      //             <th>Task Description</th>
      //             <th>Task Start Time</th>
      //             <th>Task End Time</th>
      //         </tr>
      //         <tbody>

      //         </tbody>
      //     </thead>
      // </Table>
     
    <div>
      <table>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Task Name</th>
          <th>Task Description</th>
          <th>Task Start Time</th>
          <th>Task End Time</th>
        </tr>
        {val}
      </table>
      </div>
    );
  }
}

export default ReportView;
