var gc = require("gc");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.lastaction = undefined;
        }
        if(creep.carry.energy < creep.carryCapacity && creep.memory.lastaction != gc.ACTION_CODE_TRANSFER) {
            
            var targetSource = findEnergySource(creep, true);
            creep.memory.targetId = targetSource.id;
            
            if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
            creep.memory.lastaction = gc.ACTION_CODE_HARVEST;
        }
        else {
            creep.memory.targetId = null;
            creep.memory.lastaction = gc.ACTION_CODE_TRANSFER;
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            
            targets.sort(function (a,b) {
                    if (a.structureType == STRUCTURE_SPAWN) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object) {
                        return (object.structureType===STRUCTURE_CONTAINER || object.structureType===STRUCTURE_STORAGE) && object.store[RESOURCE_ENERGY] < object.storeCapacity;
                    }
                });
                
                containers.sort(function (a,b) {
                    var freeStoreA = a.storeCapacity - a.store[RESOURCE_ENERGY];
                    var freeStoreB = b.storeCapacity - b.store[RESOURCE_ENERGY];
                    
                    return (freeStoreB - freeStoreA)
                });
                
                if(containers.length > 0) {
                    if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#f0f0f0'}});
                    }
                } else {
                    creep.say('No way');
                    creep.moveTo(14,35);
                }
            }
        }
    }
};

function findEnergySource(creep) {
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
            targetSource = sources[1];
            sources[1].memory.workers += 1;
        }
        
    } else {
        targetSource = Game.getObjectById(creep.memory.targetId);
    }
    
    return targetSource;
}

module.exports = roleHarvester;
