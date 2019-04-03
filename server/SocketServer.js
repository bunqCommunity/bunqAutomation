import io from "socket.io";

class SocketServer {
    constructor(httpServer) {
        this.httpServer = httpServer;

        this.socketServer = false;
    }

    setup(bunqAutomation) {
        // connect with bunqAutomation
        this.bunqAutomation = bunqAutomation;
        this.bunqAutomation.socketServer = this;

        // get the logger object
        this.logger = bunqAutomation.logger;

        // create socket server
        this.socketServer = io(this.httpServer, { origins: "*:*" });

        // listen for connections
        this.socketServer.on("connection", client => {
            const clientId = client.id;
            this.logger.debug(`Connected: ${clientId}`);

            // emit status to the client
            client.emit("status", this.bunqAutomation.status);

            // client requests the server status
            client.on("status", () => {
                this.logger.debug(`Status check: ${clientId}`);
                client.emit("status", this.bunqAutomation.status);
            });

            client.on("disconnect", () => {
                this.logger.debug(`Disconnected: ${clientId}`);
            });

            client.on("error", error => {
                this.logger.warn(`Socket IO error: ${clientId}`);
                this.logger.warn(error);
            });
        });
    }

    emit(data) {
        if (!this.socketServer) return;

        this.socketServer.emit(data);
    }
}

export default SocketServer;
