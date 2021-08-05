import {
    addTask,
    updateTask
} from '../../../../actions/task'

var tasks = [],
    availableSlots = [];

let best_score = -32948732,
    best_arrangement = null;

function score(arrangement) {
    let ans = 0;
    for (let i = 0; i < arrangement.length; i++) {
        ans += arrangement[i].priority * (arrangement.length - i);
    }
    let slots = [],
        slotIdx = 0;
    for (var x of availableSlots) {
        slots.push([...x]);
    }
    for (let i = 0; i < arrangement.length;) {
        if (arrangement[i].timeRequired <= slots[slotIdx][1] - slots[slotIdx][0]) {
            slots[slotIdx][0] += arrangement[i++].timeRequired;
        } else {
            ans -= slots[slotIdx][1] - slots[slotIdx][0];
            slotIdx++;
        }
    }
    return ans;
}

function isValid(arrangement) {
    let slots = [],
        slotIdx = 0;
    for (var x of availableSlots) {
        slots.push([...x]);
    }
    for (let i = 0; i < arrangement.length;) {
        if (slotIdx === slots.length) {
            return false;
        }
        if (arrangement[i].timeRequired <= slots[slotIdx][1] - slots[slotIdx][0]) {
            if (
                arrangement[i].endTime <
                slots[slotIdx][0] + arrangement[i].timeRequired
            ) {
                return false;
            }
            slots[slotIdx][0] += arrangement[i++].timeRequired;
        } else {
            slotIdx++;
        }
    }
    return true;
}

function swap(tasks, i, j) {
    var temp = tasks[i];
    tasks[i] = tasks[j];
    tasks[j] = temp;
}

function permutations(permutation, left, right) {
    if (left === right) {
        if (!isValid(permutation)) {
            return;
        }
        let s = score(permutation);
        if (s > best_score) {
            best_score = s;
            best_arrangement = [...permutation];
        }
        return;
    }
    for (let i = left; i <= right; i++) {
        swap(permutation, left, i);
        permutations(permutation, left + 1, right);
        swap(permutation, left, i);
    }
}


function display(arrangement) {
    let slots = [],
        slotIdx = 0;
    for (let x of availableSlots) {
        slots.push([...x]);
    }
    for (let i = 0; i < arrangement.length;) {
        if (arrangement[i].timeRequired <= slots[slotIdx][1] - slots[slotIdx][0]) {
            arrangement[i].slotStart = slots[slotIdx][0];
            arrangement[i].slotEnd = slots[slotIdx][0] + arrangement[i].timeRequired;
            slots[slotIdx][0] += arrangement[i++].timeRequired;
        } else {
            slotIdx++;
        }
    }
}

function Scheduler(tasksList, currTime, dayEndTime) {
    if (tasksList.length == 0) {
        return [false, tasksList];
    }
    let restr = [
        [0, currTime]
    ];
    let currTask = null;
    let restri = [];
    tasks = [];
    let alreadyExecuted = [];
    //startTime, endTime, type, timeRequired, name, priority, description = ""
    for (var x of tasksList) {
        if (x.slotEnd === -1) {
            currTask = x;
        }
        if (
            (x.slotEnd !== -1 && ((x.slotEnd <= currTime) ||
            (x.slotEnd >= currTime && x.slotStart < currTime))
        )
         ) {
            //already completed task or currently working on tasks
            if (x.status !== 'Done') {
                x.status = "Done"
                updateTask(x)
            }
            alreadyExecuted.push(x);
            continue;
        }
        if (x.type === "restrictive") {
            restr.push([
                x.endTime - x.timeRequired,
                x.endTime
            ]);
            restri.push(
                x
            );
        } else {
            tasks.push(
                x
            );
        }
    }
    let ma = 0,
        mi = 21349231;
    for (let i = 0; i < restr.length; i++) {
        ma = Math.max(restr[i][0], ma);
        mi = Math.min(restr[i][1], mi);
    }
    if (mi > ma && restr.length > 1) {
        return [false, tasksList];
    }
    availableSlots = [];
    for (let i = 1; i < restr.length; i++) {
        availableSlots.push([restr[i - 1][1], restr[i][0]]);
    }
    availableSlots.push([restr[restr.length - 1][1], dayEndTime]);
    best_score = -23429240;
    best_arrangement = null;
    
    permutations(tasks, 0, tasks.length - 1);

    if (best_arrangement == null && tasks.length > 0) {
        return [false, tasksList];
    } else {
        tasks = best_arrangement ? best_arrangement : [];
        for (let x of restri) {
            x.slotStart = x.endTime - x.timeRequired;
            x.slotEnd = x.endTime;
        }
        if (tasks.length > 0) {
            display(tasks);
        }
        if (restri.length > 0) {
            tasks = [...tasks, ...restri];
        }
        for (let x of alreadyExecuted) {
            tasks.push(x);
        }
        tasks.sort((a, b) => a.slotStart - b.slotStart);
        for (let x of tasks) {
            if (x.slotEnd <= currTime || (x.slotEnd >= currTime && x.slotStart < currTime) && x.status != 'Done') {
                x.status = "Done";
            }
            if (currTask !== null && x.id !== currTask.id)
                updateTask(x);
            else if (currTask !== null) {
                addTask(x);
            }
        }   
            return [true, tasks];
        }
    }
    export default Scheduler;