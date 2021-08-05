import { v4 as uuid } from 'uuid'

export class Task {
    constructor(taskName, taskDescription, date, endTime, priority, timeRequired, type, status = 'To do') {
        this.id = String(uuid())
        this.slotStart = -1
        this.slotEnd = -1
        this.taskName = taskName
        this.taskDescription = taskDescription
        this.date = date
        this.endTime = endTime
        this.priority = priority
        this.timeRequired = timeRequired
        this.type = type
        this.status = status
    }

    set setSlotStart(slotStart) {
        this.slotStart = slotStart
    }

    set setSlotEnd(slotEnd) {
        this.slotEnd = slotEnd
    }

    set setStatus(status) {
        this.status = status
    }
}