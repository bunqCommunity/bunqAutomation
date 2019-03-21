require("dotenv").config();
import os from "os";
import cluster from "cluster";

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    // setup the master process
    console.log(`Master ${process.pid} is running`);

    // create a fork for each CPU thread
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // check for worker processes exiting
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // run the app if we're on a fork
    require("./App.js");
}
