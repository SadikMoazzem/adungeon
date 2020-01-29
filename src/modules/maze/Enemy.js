export default class Enemy {
    constructor(name, config) {
        this.type = name;
        this.health = config.hp;
        this.dpa = config.dpa;
        this.worth = config.gold;
        this.isDefeated = false;
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
        
        return maze
    }
}