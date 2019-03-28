class ConsoleMessageOutput {
    constructor() {
        this.id = "CONSOLE_MESSAGE";
        this.description = "Outputs a message to the console";
    }

    output(message) {
        console.log(message);
    }
}

export default ConsoleMessageOutput;
