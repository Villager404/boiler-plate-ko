const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const config = require('./config/key')
const { User } = require("./models/User")

app.use(bodyParser.urlencoded({extended: true})); // application/x-www.form-urlcoded
app.use(bodyParser.json()); //application/json

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => { console.log('MongoDB Connected...') })
.catch(err => { console.log(err) })

app.get('/', (req, res) => {
    res.send('Hello World! My name is John! It is very difficult... Why not works?! Oh.. nodemon good works..')
})

app.post('/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 Client에서 가져오면, DB에 저장
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    }) // mongo db method
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})