class Player {
  constructor(data) {
    data = data || {};
    this.id = data.id || null;
    this.name = data.name || "";
    this.userName = data.username || "";
    this.DPS = this.DPSRandomizer(-100,-10);
    this.HP = this.HPRandomizer(0, 10);
    this.playerUsed = false;

  }

  DPSRandomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return 5 * Math.floor(Math.random() * (max - min) + min); 
  }

  HPRandomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return 5 * Math.floor(Math.random() * (max - min) + min); 
  }
}

export default Player;