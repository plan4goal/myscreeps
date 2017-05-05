var gc = require("gc");

var roleStoreToLink = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        
        if (!creep.pos.isEqualTo(8,35)) {
            creep.say('Moving');
            creep.moveTo(8,35, {visualizePathStyle: {stroke: 'blue'}});
        } else {
            if (creep.carry[RESOURCE_ENERGY] == 0) {
                creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
            } else {
                var link = Game.getObjectById(gc.LINK_ID_1);
                if (link.energy < link.energyCapacity) {
                    creep.transfer(link, RESOURCE_ENERGY);
                }
            }
        }
    }
};

module.exports = roleStoreToLink;
