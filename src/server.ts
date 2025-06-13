import app from "./app";

const port = 5000;
const main=async()=>{
const server = app.listen(port,()=>{
    console.log(`channel twenty  run is ${port}`)
})
}


main()