import {CreateUserResponse, UserModel} from "./interfaces";

const users: UserModel[] = [];

const addUser = ({id, name, room}: UserModel): CreateUserResponse => {
  const existingUser = users.find(user =>
    user.name.localeCompare(name, "en-EN", {sensitivity: "base"}) === 0 &&
    user.room.localeCompare(room, "en-EN", {sensitivity: "base"}) === 0
  );
  if (existingUser) {
    return {error: "Username is already taken"};
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

const getUserNamesInRoom = (room: string) => users.filter(user => user.room === room).map(user => user.name);

export {addUser, removeUser, getUser, getUserNamesInRoom};
