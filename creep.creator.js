var gc = require("gc");

var creepCreator = {

    checkAndCreate: function(croom) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        var rname = croom.name;
        
        singleCreep(gc.ROLE_HARVESTER, gc.DEFAULT_CREEP_HARVESTER[croom.controller.level], gc.CREEPCOUNT[rname].ROLE_HARVESTER, rname);
        
        var upgrader = 0;
        if (croom.storage.store[RESOURCE_ENERGY] > 20000) {
            upgrader = gc.CREEPCOUNT[rname].ROLE_UPGRADER;
        }
        singleCreep(gc.ROLE_UPGRADER, gc.DEFAULT_CREEP_WORKER[croom.controller.level], upgrader, rname);
        
        /** Only create builder if something to build was found **/
        var targets = croom.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            singleCreep(gc.ROLE_BUILDER, gc.DEFAULT_CREEP_WORKER[croom.controller.level],gc.CREEPCOUNT[rname].ROLE_BUILDER, rname);
        }
        
        var hostiles = croom.find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length > 0) {
            singleCreep(gc.ROLE_PROTECTOR, gc.DEFAULT_CREEP_PROTECTOR[croom.controller.level], gc.CREEPCOUNT[rname].ROLE_PROTECTOR, rname);
        }
        singleCreep(gc.ROLE_REPAIRER_WALL, gc.DEFAULT_CREEP_REPAIRER[croom.controller.level], gc.CREEPCOUNT[rname].ROLE_REPAIRER_WALL, rname);
        singleCreep(gc.ROLE_REPAIRER_ROAD, gc.DEFAULT_CREEP_REPAIRER[croom.controller.level], gc.CREEPCOUNT[rname].ROLE_REPAIRER_ROAD, rname);
        singleCreep(gc.ROLE_STORETOLINK, gc.DEFAULT_LINK_TRANSFER[croom.controller.level], gc.CREEPCOUNT[rname].ROLE_STORETOLINK, rname);
        singleCreep(gc.ROLE_LINKTOUPGRADE, gc.DEFAULT_LINK_UPGRADE[croom.controller.level], gc.CREEPCOUNT[rname].ROLE_LINKTOUPGRADE, rname);
        
        var targets = croom.find(FIND_DROPPED_RESOURCES, {
            filter: function(object) {
                return (object.resourceType != RESOURCE_ENERGY);
            }
        });
        if(targets.length) {
            singleCreep(gc.ROLE_RESOURCECOLLECTOR, gc.DEFAULT_RESOURCE_COLLECTOR[croom.controller.level], gc.CREEPCOUNT[rname].ROLE_RESOURCECOLLECTOR, rname);
        }
        
    }
};

function singleCreep(rolename, ctype, counter, roomname) {
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == rolename);
    /** console.log(rolename+': ' + creeps.length); **/
    
    if(creeps.length < counter) {
        var newName = Game.spawns[gc.SPAWN_NAME[roomname]].createCreep(ctype, undefined, {role: rolename});
        console.log('Spawning new ' + rolename + ': ' + newName + 'in room ' + roomname);
    }
}

module.exports = creepCreator;
