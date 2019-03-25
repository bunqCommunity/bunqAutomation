class ConsoleMessageOutput {
    constructor() {
        this.id = "console-message-output";
        this.description = "Outputs a message to the console";
        this.type = "CONSOLE_MESSAGE";
    }

    output(item) {
        console.log(item.message);
    }
}

export default ConsoleMessageOutput;
