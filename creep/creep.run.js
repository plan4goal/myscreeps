var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleProtector = require('role.protector');
var roleRepairerWall = require('role.repairer.wall');
var roleRepairerRoad = require('role.repairer.road');
var roleStoreToLink = require('role.storetolink');
var roleLinkToUpgrade = require('role.linktoupgrade');
var roleResourceCollector = require('role.resourcecollector');

var creepCreator = require('creep.creator');
var gc = require("gc");

var creepRun = {

    run: function(croom) {
        
        creepCreator.checkAndCreate(croom);

        var spawn = Game.spawns[gc.SPAWN_NAME[croom.name]];
        
        
        if(spawn.spawning) {
            var spawningCreep = spawn.spawning;
            /**console.log('SP: ' + spawningCreep.memory);
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});**/
        }
    
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == gc.ROLE_HARVESTER) {
                roleHarvester.run(creep);
            } else 
            if(creep.memory.role == gc.ROLE_UPGRADER) {
                roleUpgrader.run(creep);
            } else 
            if(creep.memory.role == gc.ROLE_PROTECTOR) {
                roleProtector.run(creep);
            } else 
            if(creep.memory.role == gc.ROLE_BUILDER) {
                roleBuilder.run(creep);
            } else 
            if(creep.memory.role == gc.ROLE_REPAIRER_WALL) {
                roleRepairerWall.run(creep);
            } else 
            if(creep.memory.role == gc.ROLE_REPAIRER_ROAD) {
                roleRepairerRoad.run(creep);
            } else 
            if(creep.memory.role == gc.ROLE_STORETOLINK) {
                roleStoreToLink.run(creep);
            } else 
            if(creep.memory.role == gc.ROLE_LINKTOUPGRADE) {
                roleLinkToUpgrade.run(creep);
            } else if(creep.memory.role == gc.ROLE_RESOURCECOLLECTOR) {
                roleResourceCollector.run(creep);
            }
            
        }
    }
};

module.exports = creepRun;
