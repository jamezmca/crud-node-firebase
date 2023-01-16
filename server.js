const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./config/firebase.js')
const {addAccount} = require('./controller/addAccount');
const {getAllAccount} = require('./controller/getAccount')
const {login} = require('./controller/login')
const {addchiphi} = require('./controller/addChiPhi')
const {addnhankhau} = require('./controller/addNhanKhau')
const {addhokhau} = require('./controller/addHoKhau')
app.use(express.json())

app.get('/health', (req, res) => {
    return res.status(200).json({
        message: 'Ok healthy'
    });
})

// GET Method
app.get('/allpeople', getAllAccount)

app.get('/login', login)


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
app.post('/addchiphi',(res,req)=>{
    addchiphi
})
app.post('/addnhankhau',(res,req)=>{
    addnhankhau
})
app.post('/addhokhau',(res,req)=>{
    addhokhau
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