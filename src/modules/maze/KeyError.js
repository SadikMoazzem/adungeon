export default class KeyError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = 'KeyError'; // (2)
    }
}
