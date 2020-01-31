/**
 * A Factory Function that creates a player Obj
 */

const createPlayer = ({
    name, health = 100, wealth = 0, weapon = '', taggedRooms = [],
}) => ({
    name,
    health,
    wealth,
    weapon,
    taggedRooms,
    updateHealth(damage) {
        this.health -= damage;
        return this;
    },
    updateWealth(difference) {
        this.wealth += difference;
        return this;
    },
    addTaggedRoom(roomId) {
        this.taggedRooms.push(roomId);
        return this;
    },
});

export default createPlayer;
