var findResource = require('task.findresource');

var roleRepairerRoad = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🏂 harvest');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.repairing) {
            
            var repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: function(object) {
                    return (object.structureType===STRUCTURE_ROAD || object.structureType===STRUCTURE_CONTAINER) && object.hits < (object.hitsMax / 2);
                }
            });
            repairTargets.sort(function (a,b) {return (a.hits - b.hits)});
            
            if (repairTargets.length > 0) {
                var repairResult = creep.repair(repairTargets[0]);
                
                if (repairResult == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            findResource.findSource(creep, false);
        }
    }
};

module.exports = roleRepairerRoad;
