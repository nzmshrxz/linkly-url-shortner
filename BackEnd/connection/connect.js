const mongoose = require('mongoose')

async function handleConnection(url) {
  mongoose.connect(url)
  .then(()=>console.log("mongoDb connected"))
  .catch(()=>console.log("Error while connecting"))
}


module.exports = {
  handleConnection
}