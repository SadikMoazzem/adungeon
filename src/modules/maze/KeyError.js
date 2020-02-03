export default class KeyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'KeyError';
    }
}
