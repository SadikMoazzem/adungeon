/**
 * A Factory Function that creates a player Obj
 */

const createPlayer = ({
    name, health = 20, wealth = 0, weapon = '', taggedRooms = [],
}) => ({
    name,
    health,
    wealth,
    weapon,
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
