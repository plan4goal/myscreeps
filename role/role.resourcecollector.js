var gc = require("gc");

var roleResourceCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var creepLoad = _.sum(creep.carry);
        var noMoreResources = false;
        
        if (creepLoad < creep.carryCapacity) {
            var targets = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: function(object) {
                    return (object.resourceType != RESOURCE_ENERGY);
                }
            });
            
            var target;
                
            if(targets.length) {
                target = targets[0];
            }
            
            if (!target) {
                targets = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: function(object) {
                        return (object.resourceType == RESOURCE_ENERGY);
                    }
                });
                
                if(targets.length) {
                    target = targets[0];
                }
            }
            
            if (target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: 'yellow'}});
                creep.pickup(target);
            } else {
                noMoreResources = true;
            }
        } else {
            noMoreResources = true;
            
        }
        if (noMoreResources) {
            if (creepLoad > 0) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: 'yellow'}});
                
                for(var resType in creep.carry) {
                    creep.transfer(creep.room.storage, resType);
                }
            } else {
                creep.moveTo(20,34, {visualizePathStyle: {stroke: 'yellow'}});
            }
        }
    }
};

module.exports = roleResourceCollector;
