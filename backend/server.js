const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/database");

dotenv.config({path:path.join(__dirname,"config/config.env")});
connectDatabase();
const server = app.listen(process.env.PORT,()=>{
    console.log(`My server listening to the port :${process.env.PORT} in ${process.env.NODE_ENV}`)
})
// unhandled rejection error
process.on("unhandledRejection",(err)=>{
      console.log(`Error:${err.message}`);
      console.log("Shutting down the server due to unhandled rejection error");
      server.close(()=>{
        process.exit(1)
      })
})
//uncaughtException Error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to uncaught Exception error");
    server.close(()=>{
      process.exit(1)
    })
})
// console.log(a)
   