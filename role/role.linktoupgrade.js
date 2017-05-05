var gc = require("gc");

var roleLinkToUpgrade = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (!creep.pos.isEqualTo(17,21)) {
            creep.say('Moving');
            creep.moveTo(17,21, {visualizePathStyle: {stroke: 'blue'}});
        } else {
            if (creep.carry[RESOURCE_ENERGY] == 0) {
                var link = Game.getObjectById(gc.LINK_ID_2);
                if (link.energy > 0) {
                    creep.withdraw(link, RESOURCE_ENERGY);
                }
            } else {
                creep.upgradeController(creep.room.controller);
            }
        }
    }
};

module.exports = roleLinkToUpgrade;
