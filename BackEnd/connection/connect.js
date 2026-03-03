const mongoose = require('mongoose')

async function handleConnection() {
  const uri = process.env.MONGO_URI
  if (!uri) throw new Error("MONGO_URI is missing in .env");

  mongoose.connect(uri)
  .then(()=>console.log("mongoDb connected"))
  .catch(err=>console.log("Error while connecting", err))
}


module.exports = {
  handleConnection
}