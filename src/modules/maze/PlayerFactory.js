/**
 * A Factory function that creates a player Obj
 */

const createPlayer = ({
    health = 20, wealth = 0, taggedRooms = [],
}) => ({
    health,
    wealth,
    taggedRooms,
    updateHealth(damage) {
        this.health -= damage;
        return Object.assign({}, this);
    },
    updateWealth(difference) {
        this.wealth += difference;
        return Object.assign({}, this);
    },
    addTaggedRoom(roomId) {
        this.taggedRooms.push(roomId);
        return Object.assign({}, this);
    },
});

export default createPlayer;
