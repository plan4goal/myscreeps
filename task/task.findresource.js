var gc = require("gc");

var taskFindResource = {

    /** @param {Creep} creep **/
    findSource: function(creep, harvest) {
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER  || structure.structureType===STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0;
            }
        });
        
        if(containers.length > 0) {
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#f0f0f0'}});
            }
        } else if (harvest) {
            var source = findEnergySource(creep);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

function findEnergySource(creep) {
    var gc = require("gc");
    
        var targetSource = null;
        
        var roomMemory = Game.rooms[gc.ROOM_NUMBER].memory;
                
        if (creep.memory.targetId == null) {
            var sources = creep.room.find(FIND_SOURCES);
            
            var workers0 = sources[0].memory.workers;
            var workers1 = sources[1].memory.workers;
            
            if (workers0 <= workers1) {
                targetSource = sources[0];
                sources[0].memory.workers += 1; 
            } else {
                creep.say('2nd source');
                targetSource = sources[1];
                sources[1].memory.workers += 1;
            }
            
        } else {
            targetSource = Game.getObjectById(creep.memory.targetId);
        }
        
        return targetSource;
    };

module.exports = taskFindResource;
