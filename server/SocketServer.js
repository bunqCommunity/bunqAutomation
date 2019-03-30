import io from "socket.io";

class SocketServer {
    constructor(httpServer, bunqAutomation) {
        this.httpServer = httpServer;
        this.bunqAutomation = bunqAutomation;
        this.logger = bunqAutomation.logger;

        this.socketServer = false;
    }

    connect() {
        const socketServer = io(this.httpServer, { origins: "*:*" });

        socketServer.on("connection", client => {
            const clientId = client.id;
            this.logger.debug(`Connected: ${clientId}`);

            client.on("status", () => {
                this.logger.debug(`Status check: ${clientId}`);
                client.emit("status", this.bunqAutomation.status);
            });
            client.on("disconnect", () => {
                this.logger.debug(`Disconnected: ${clientId}`);
            });
        });
    }

    emit(data) {
        if (!this.socketServer) return;

        this.socketServer.emit(data);
    }
}

export default SocketServer;
