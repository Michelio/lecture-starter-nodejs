import { userRepository } from "../repositories/userRepository.js";

class UserService {
  search(search) {
    const item = userRepository.getOne(search);

    if (!item) {
      return null;
    }
    return item;
  }

  create(userData) {
    const { email, phoneNumber } = userData;
    const user = this.search({ email }) || this.search({ phoneNumber });

    if (!user) {
      return userRepository.create(userData);
    } else {
      throw new Error("User with this email or phone number already exists.");
    }
  }

  getAllUsers() {
    return userRepository.getAll();
  }

  getUser(id) {
    const user = this.search({ id });

    if (user) {
      return user;
    } else {
      throw new Error("User doesn't exists.");
    }
  }

  update(id, newUserData) {
    const newUser = this.search({ id });
    const { email, phoneNumber } = newUserData;
    const user = this.search({ email }) || this.search({ phoneNumber });

    if (user) {
      throw new Error(
        "User with provided email or phone number already exists."
      );
    }

    if (newUser) {
      return userRepository.update(id, newUserData);
    } else {
      throw new Error("User doesn't exists.");
    }
  }

  delete(userId) {
    const user = this.search({ id: userId });

    if (user) {
      return userRepository.delete(userId);
    } else {
      throw new Error("User with that id doesn't exists.");
    }
  }
}

const userService = new UserService();

export { userService };
