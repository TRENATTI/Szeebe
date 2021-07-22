const express = require('express')
const app = express()


app.use(function (req, res, next) {
  res.send('Running!')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
function keepAlive() { 
    app.listen(3000, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive;
