
class TestAction{
    constructor(){
        // All the possible filters for this action
        // A monthly invoice action might only need an optional monetary account filter
        this.filters = [];

        // possible types of output
        this.outputs = [];

        // options
    }
}


class TestOutput{
    constructor() {
        this.type = "PAYMENT";
    }

}