
module.exports = class Master {
    constructor(name, type = undefined) {
        this.name = name;
        this.type = type;

    }

    eventHandler() {
        return function() {
            return;
        }
    }
}