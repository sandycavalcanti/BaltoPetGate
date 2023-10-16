import { io } from "socket.io-client";
import { urlAPI } from "../constants";

const socket = io.connect(urlAPI);
export default socket;