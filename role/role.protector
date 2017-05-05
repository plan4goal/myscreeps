var roleProtector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
       var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if (enemies.length > 0) {
            if (creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) {
                creep.say('💀 Attacke');
                creep.moveTo(enemies[0]);
            }
        } else if (!creep.pos.isEqualTo(20,34)) {
            creep.moveTo(20,34, {visualizePathStyle: {stroke: 'red'}});
        }
    }
};

module.exports = roleProtector;
