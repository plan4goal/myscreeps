var findResource = require('task.findresource');

var roleRepairerWall = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.memory.repairTargetId = null;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.repairing) {
            
            if (creep.memory.repairTargetId == null) {
                var repairTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object) {
                        return ((object.structureType==STRUCTURE_WALL || object.structureType==STRUCTURE_RAMPART) && object.structureType!=STRUCTURE_CONTROLLER) && object.hits < object.hitsMax;
                    }
                });
                repairTargets.sort(function (a,b) {return (a.hits - b.hits)});
                if (repairTargets.length > 0) {
                    creep.memory.repairTargetId = repairTargets[0].id;
                }
            }
            
            if (creep.memory.repairTargetId != null) {
                var repairTarget = Game.getObjectById(creep.memory.repairTargetId);
                if (creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                    var mvRes = creep.moveTo(repairTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            findResource.findSource(creep, false);
        }
    }
};

module.exports = roleRepairerWall;
