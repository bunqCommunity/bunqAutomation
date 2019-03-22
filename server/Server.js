require("dotenv").config();
// import os from "os";
// import cluster from "cluster";

require("./App.js");

// const numCPUs = os.cpus().length;
// const isDevelopment = process.env.NODE_ENV === "development";
// const allowWorkers = process.env.USE_WORKERS === "true";
// const allowDevWorkers = process.env.USE_WORKERS_IN_DEV === "true";
// const useDevWorkers = !isDevelopment || (allowDevWorkers && isDevelopment);
//
// if (!cluster.isMaster || !allowWorkers) {
//     // run the app if we're on a fork
//     require("./App.js");
// } else if (useDevWorkers === false) {
//     // run the app in development with workers disabled
//     require("./App.js");
// } else {
//     // setup the master process
//     console.log(`Master ${process.pid} is running`);
//
//     // create a fork for each CPU thread
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//
//     // check for worker processes exiting
//     cluster.on("exit", (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//     });
// }
