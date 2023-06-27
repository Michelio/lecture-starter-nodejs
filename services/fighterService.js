import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  search(search) {
    const item = fighterRepository.getOne(search);

    if (!item) {
      return null;
    }
    return item;
  }

  create(fighterData) {
    const { name } = fighterData;
    const fighter = this.search({ name });

    if (!fighter) {
      return fighterRepository.create(fighterData);
    } else {
      throw new Error("Fighter with this name already exists.");
    }
  }

  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighter(fighterId) {
    const fighter = this.search({ id: fighterId });

    if (fighter) {
      return fighter;
    } else {
      throw new Error("Fighter doesn't exists.");
    }
  }

  update(id, newFighterData) {
    const newFighter = this.search({ id });
    const { name } = newFighterData;
    const fighter = this.search({ name });

    if (fighter) {
      throw new Error("Fighter with this name already exists.");
    }

    if (newFighter) {
      return fighterRepository.update(id, newFighterData);
    } else {
      throw new Error("Fighter doesn't exists.");
    }
  }

  delete(fighterId) {
    const fighter = this.search({ id: fighterId });

    if (fighter) {
      return fighterRepository.delete(fighterId);
    } else {
      throw new Error("Fighter with that id doesn't exists.");
    }
  }
}

const fighterService = new FighterService();

export { fighterService };
