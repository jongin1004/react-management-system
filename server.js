const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id' : 1,
            'image' : 'https://placeimg.com/64/64/1',
            'name' : '최종인',
            'birthday': '941004',
            'gender' : '남자',
            'job' : 'IT엔지니어'
        },
        {
            'id' : 2,
            'image' : 'https://placeimg.com/64/64/2',
            'name' : '곽재호',
            'birthday': '940104',
            'gender' : '남자',
            'job' : '삼서엔지니어'
        },
        {
            'id' : 3,
            'image' : 'https://placeimg.com/64/64/3',
            'name' : '한규호',
            'birthday': '951004',
            'gender' : '남자',
            'job' : 'CAD마스터'
        },
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));