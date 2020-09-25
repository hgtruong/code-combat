import randomizer from '../utils/randomizer';

class Student {
  constructor(data) {
    data = data || {};
    this.id = data.id || null;
    this.name = data.name || "";
    this.userName = data.username || "";
    this.HP = randomizer(-100,-10,5);
    this.DPS = randomizer(1, 10,5);
  }
}

export default Student;