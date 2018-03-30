const experess = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User')
const jwt = require('jwt-simple');

const app = experess();

let list = [
    { url: 'www.google.com', user: 'ilay' },
    { url: 'www.walls.co.il', user: 'ad' },
    { url: 'www.ynet.co.il', user: 'racheli' }
]

app.use(cors());
app.use(bodyParser.json());

app.get('/list', (req, res) => {
    res.send(list);
})

app.post('/register', (req, res) => {

    const userData = req.body;
    let user = new User(userData);

    user.save((err, result) => {
        if (err) console.log('saving user error')
        res.sendStatus(200);

    })
})

app.post('/login', async(req, res) => {

    const userData = req.body;

    const user = await User.findOne({ username: userData.username });

    if (!user || user.pwd !== userData.pwd)
        res.status(401).send({ messgae: 'Username or Password invalid' });
    
        
    let payload = {}
    let token = jwt.encode(payload, '123456')
    res.status(200).send({token});
})

mongoose.connect('mongodb://admin:admin@ds137464.mlab.com:37464/rtspview', err => {
    if (!err) console.log('connected to mongo');
})

app.listen(3000);