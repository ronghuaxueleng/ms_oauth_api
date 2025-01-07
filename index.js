/* 引入express框架 */
const express = require('express');
const app = express();

const mail_all = require('./api/mail-all')
const mail_new = require('./api/mail-new')
const send_mail = require('./api/send-mail')
const process_inbox = require('./api/process-inbox')
const process_junk = require('./api/process-junk')

app.use(express.static('public'))
/* 引入cors */
const cors = require('cors');
app.use(cors());
/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' === req.method) return res.send(200);
    next();
});
app.get('/', (req, res) => {
    res.send('<p style="color:red">服务已启动</p>');
})

app.all('/api/mail-all', mail_all)
app.all('/api/mail-new', mail_new)
app.all('/api/send-mail', send_mail)
app.all('/api/process-inbox', process_inbox)
app.all('/api/process-junk', process_junk)

/* 监听端口 */
app.listen(3000, () => {
    console.log('listen:3000');
})
