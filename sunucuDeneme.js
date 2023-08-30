const express = require('express');
const app = express();

app.get('/',(req, ers) => {
    res.send('merhaba dünyaaa');
});

const port = 3000;
app.listen(port, () => {
    console.log('sunucu ${port} numaralı portta çalışıyor');
});
