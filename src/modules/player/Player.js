export default class Player {
    constructor(mapID) {
        this.mapID = mapID
        this.health = 100
        this.wealth = 100
        this.items = []
    }

    get maze() {
        return this.createMaze();
    }

    /**
     * Creates an instance of all of the rooms for the maze
     */
    createMaze() {
        const currentMap = maps[this.mapID];
        const maze = {};

        for (const [roomId, config] of Object.entries(currentMap)) {
            maze[roomId] = new Room(config);
        }

        return maze;
    }
}