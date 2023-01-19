import {CreateUserResponse, UserModel} from "./interfaces";

const users: UserModel[] = [];

const addUser = ({id, name, room}: UserModel): CreateUserResponse => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(user => user.name === name && user.room === room);
  if (existingUser) {
    return {error: 'Username is already taken'};
  }
  const user: UserModel = {id, name, room};
  users.push(user);
  return {user};
}

const removeUser = (id: string) => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return null;
  }
  return users.splice(index, 1)[0];
}

const getUser = (id: string) => users.find(user => user.id === id);

const getUsersInRoom = (room: string) => users.filter(user => user.room === room);

export {addUser, removeUser, getUser, getUsersInRoom};
