const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase.js')

app.use(express.json())

app.get('/health', (req, res) => {
    return res.status(200).json({
        message: 'Ok healthy'
    });
})

// GET Method
app.get('/people', async (req, res) => {
    const all_people = db.collection('people')
    const doc = await all_people.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }
    await querySnapshot.forEach((doc) => {
        res.status(200).send(doc.data())
    })
})

app.get('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const account = await db.collection('people')
    const account_data = account.get().data()

    if (username!=account_data.username || !password!=account_data.password) {
        console.log(account)
        return res.status(404).send('Username/Password incorrect, please login again !')
    }
    else res.status(200).send('Login successfully, thank you !')
})


// POST Method
app.post('/addpeople', async (req, res) => {
    const { name, status } = req.body
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.set({
        [name]: status
    }, { merge: true })
    // friends[name] = status
    res.status(200).send(friends)
})

app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const fullname = req.body.fullname
    const account = db.collection('people')
    await account.add({
        ['username']: username,
        ['password']: password,
        ['Full name']: fullname
    }, {merge: false})
    res.status(200).send('Register successfully !')
})

// DELETE Method

app.delete('/friends', async (req, res) => {
    const { name } = req.body
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.update({
        [name]: FieldValue.delete()
    })
    res.status(200).send(friends)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))