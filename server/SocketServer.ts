import LoggerInterface from "@bunq-community/bunq-js-client/dist/Interfaces/LoggerInterface";
import io from "socket.io";

import BunqAutomation from "./BunqAutomation";

class SocketServer {
    public bunqAutomation: BunqAutomation;
    public logger: LoggerInterface;

    public socketServer: any | false;

    constructor(bunqAutomation) {
        this.bunqAutomation = bunqAutomation;

        this.logger = this.bunqAutomation.logger;
        this.socketServer = false;
    }

    setup(httpServer) {
        // create socket server
        this.socketServer = io(httpServer, { origins: "*:*" });

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

    emit(eventType, data = "") {
        if (!this.socketServer) return;

        this.socketServer.emit(eventType, data);
    }
}

export default SocketServer;
