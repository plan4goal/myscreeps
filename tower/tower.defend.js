var towerDefend = {

    /** @param towerId **/
    defend: function(towerId) {
        var tower = Game.getObjectById(towerId);

        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.heal(closestDamagedStructure);
            }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
       
    }
};

module.exports = towerDefend;
