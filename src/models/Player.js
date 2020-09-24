import randomizer from '../utils/randomizer';

class Player {
  constructor(data) {
    data = data || {};
    this.id = data.id || null;
    this.name = data.name || "";
    this.userName = data.username || "";
    this.DPS = randomizer(-100,-10,5);
    this.HP = randomizer(0, 10,5);
    this.playerUsed = false;

  }


}

export default Player;