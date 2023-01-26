const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const cors = require('cors');
const port = 8383
const cookieParser = require('cookie-parser')
const { db } = require('./config/firebase.js')
const {addAccount} = require('./controller/addAccount');
const {getAllAccount} = require('./controller/getAccount')
const {login} = require('./controller/login')
const {check,logout} = require('./controller/logout')
const {addChiPhi} = require('./controller/addChiPhi')
const {addNhanKhau} = require('./controller/addNhanKhau')
const {addHoKhau} = require('./controller/addHoKhau')
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get('/health', (req, res) => {
    return res.status(200).json({
        message: 'Ok healthy'
    });
})

// GET Method
app.get('/allpeople', getAllAccount)
app.get('/login', (req,res) => {
    res.json("This is login page. Please login to continue!")
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

app.post('/register', addAccount)
app.post('/addchiphi',check, addChiPhi)
app.post('/addnhankhau',check, addNhanKhau)
app.post('/addhokhau',check, addHoKhau)
app.post('/login', login)
app.post('/logout', check, logout)

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