var creepRun = require('creep.run');
var towerDefend = require('tower.defend');
var gc = require("gc");

module.exports.loop = function () {
    
    for (var roomname in Game.rooms)  {
        
        var croom = Game.rooms[roomname];
    
        if(!croom.memory.sources){//If this room has no sources memory yet
            croom.memory.sources = {}; //Add it
            var sources = croom.find(FIND_SOURCES);//Find all sources in the current room
            for(var i in sources){
                var source = sources[i];
                source.memory = croom.memory.sources[source.id] = {}; //Create a new empty memory object for this source
                source.memory.workers = 0;
            }
        } else{ //The memory already exists so lets add a shortcut to the sources its memory
            var sources = croom.find(FIND_SOURCES);//Find all sources in the current room
            for(var i in sources){
                var source = sources[i];
                source.memory = croom.memory.sources[source.id]; //Set the shortcut
            }
        }

        console.log('Room "'+ roomname +'" has '+ croom.energyAvailable+' energy');
        
        creepRun.run(croom);
    }
    
    towerDefend.defend(gc.TOWER_ID_1);
    towerDefend.defend(gc.TOWER_ID_2);
    
    var link1 = Game.getObjectById(gc.LINK_ID_1);
    var link2 = Game.getObjectById(gc.LINK_ID_2);
    if (link1.energy > 0 && link2.energy < link2.energyCapacity) {
        link1.transferEnergy(link2);
    }
}
