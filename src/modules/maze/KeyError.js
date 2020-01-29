export default class KeyError extends Error {
    constructor(message) {
      super(message); // (1)
      this.name = "KeyError"; // (2)
    }
}

function test() {
    throw new KeyError("Missing Keys");
}
  