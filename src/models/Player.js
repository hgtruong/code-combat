class Player {
  constructor(data) {
    data = data || {};
    this.id = data.id || null;
    this.name = data.name || "";
    this.userName = data.username || "";
    this.DPS = this.DPSRandomizer(-500,-50);
    this.HP = this.HPRandomizer(0, 50);
    this.playerUsed = false;

  }

  HPRandomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min/5)*5; 
  }

  DPSRandomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min/5)*5; 
  }
}

export default Player;