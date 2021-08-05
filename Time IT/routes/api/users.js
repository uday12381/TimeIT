const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Get the validator and destructure its fields
const { check, validationResult } = require('express-validator/check');

//Get the model
const User = require('../../models/User');

//Get gravatar
const gravatar = require('gravatar');

//Get bcrypt
const bcrypt = require('bcryptjs')

//Get jsonwebtoken
const jwt = require('jsonwebtoken');

//Get config for jwt secret message
const config = require('config');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Please enter a password with length more than 6 characters')
        .isLength({ min: 6 }),
    check('startTime', "Please enter a valid start time")
        .not()
        .isEmpty(),
    check('endTime', "Please enter a valid end time")
        .not()
        .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, startTime, endTime } = req.body
    try {
        // See if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Get the user's gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name,
            email,
            avatar,
            password,
            startTime,
            endTime
        });

        // Encrpt password using bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }

});

// @route   PUT api/users/addtask
// @desc    Add a task
// @access  Private
router.put('/addtask', [auth, [
    check('id', 'Task ID generation error').not().isEmpty(),
    check('slotStart', 'Slot start is required').not().isEmpty(),
    check('slotEnd', 'Slot end is required').not().isEmpty(),
    check('taskName', 'Task Name is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('endTime', 'End time is required').not().isEmpty(),
    check('priority', 'Priority is required').not().isEmpty(),
    check('timeRequired', 'Time neede for task is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        id,
        slotStart,
        slotEnd,
        taskName,
        taskDescription,
        date,
        endTime,
        priority,
        timeRequired,
        type,
        status
    } = req.body

    const newTask = {
        id,
        slotStart,
        slotEnd,
        taskName,
        taskDescription,
        date,
        endTime,
        priority,
        timeRequired,
        type,
        status
    }

    try {
        const user = await User.findById(req.user.id)
        user.tasks.unshift(newTask)
        await user.save()
        res.json(newTask)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }

})

// @route   DELETE api/users/deletetask/:id
// @desc    Delete a task
// @access  Private
router.delete('/deletetask/:id', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
        const removeIndex = user.tasks
            .map(task => task.id)
            .indexOf(req.params.id)

        if (removeIndex === -1) {
            return res.status(400).json({ msg: 'No such entity' })
        }

        user.tasks
            .splice(removeIndex, 1)

        await user.save()
        res.json(user)

    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// @route   PUT api/users/updatetask
// @desc    Update a task
// @access  Private
router.put('/updatetask', auth, async (req, res) => {

    const {
        id,
        slotStart,
        slotEnd,
        status
    } = req.body

    try {

        const user = await User.findById(req.user.id)
        const updateIndex = user.tasks
            .map(task => task.id)
            .indexOf(id)

        if (updateIndex === -1) {
            return res.status(400).json({ msg: 'No such entity' })
        }

        user.tasks[updateIndex].slotStart = parseInt(slotStart)
        user.tasks[updateIndex].slotEnd = parseInt(slotEnd)
        user.tasks[updateIndex].status = status

        await user.save()

        res.json(user.tasks)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }

})

// @route   GET api/users/gettasks
// @desc    Get all tasks in the date range
// @access  Private
router.get('/gettasks/:startDate/:endDate', auth, async (req, res) => {
    try {

        const startDate = req.params.startDate
        const endDate = req.params.endDate

        const user = await User.findById(req.user.id)

        const tasks = user.tasks

        const result = tasks.filter(function (task) {
            return task.date >= new Date(startDate) &&
                task.date <= new Date(endDate)
        })

        res.send(result)

    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

module.exports = router;