import { ENDPOINT } from "config";
import { io, Socket } from "socket.io-client";

export const socket: Socket = io(ENDPOINT);
