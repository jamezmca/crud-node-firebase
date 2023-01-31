const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const cors = require('cors');
const port = 8383
const cookieParser = require('cookie-parser')
const { db } = require('./config/firebase.js')
// Import add fuction
const {addAccount} = require('./controller/addAccount');
const {login} = require('./controller/login')
const {logout} = require('./controller/logout')
const {addChiPhi} = require('./controller/addChiPhi')
const {addNhanKhau} = require('./controller/addNhanKhau')
const {addHoKhau} = require('./controller/addHoKhau')
// Import get function
const {chiphi_pagination} = require('./controller/getChiPhi')
const {hokhau_pagination} = require('./controller/getHoKhau')
const {nhankhau_pagination} = require('./controller/getNhanKhau');
const {getAllAccount, account_pagination} = require('./controller/getAccount')
// Import detele fuction
const {deleteChiPhi} =require('./controller/deleteChiPhi')
const {deleteHoKhau} =require('./controller/deleteHoKhau')
const {deleteNhanKhau} = require('./controller/deleteNhanKhau')
const {deleteAccount} =require('./controller/deleteAccount')
//Import middleware function
const {check} = require('./middleware/checkLogin')

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Stuff
app.get('/health', (req, res) => {
    return res.status(200).json({
        message: 'Ok healthy'
    });
})
app.get('/login', (req,res) => {
    res.json("This is login page. Please login to continue!")
})

// GET Method

app.get('/allpeople', getAllAccount)
app.get('/pageaccount', account_pagination)
app.get('/pagechiphi',chiphi_pagination)
app.get('/pagehokhau',hokhau_pagination)
app.get('/pagenhankhau',nhankhau_pagination)


// POST Method

app.post('/register', addAccount)
app.post('/addchiphi',check, addChiPhi)
app.post('/addnhankhau',check, addNhanKhau)
app.post('/addhokhau',check, addHoKhau)
app.post('/login', login)
app.post('/logout', check, logout)

// PUT Method

// DELETE Method
app.delete('/deletechiphi/:id',deleteChiPhi)
app.delete('/deletehokhau/:id',deleteHoKhau)
app.delete('/deletenhankhau/:id',deleteNhanKhau)
app.delete('/deleteaccount/:id',deleteAccount)

app.delete('/friends', async (req, res) => {
    const { name } = req.body
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.update({
        [name]: FieldValue.delete()
    })
    res.status(200).send(friends)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))