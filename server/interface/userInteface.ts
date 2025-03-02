import { Socket } from "socket.io";

interface UserInterface {
  id: string;
  socket: Socket;
}

interface RoomInterface {
  roomId: string;
  users: UserInterface[];
}

export { UserInterface, RoomInterface };
