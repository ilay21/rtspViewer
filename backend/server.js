const experess = require('express');
const app = experess();

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(3000);