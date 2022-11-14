import io from 'socket.io-client';
const socketOptions = {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 1000,
  reconnectionAttempts: 1,
  transports: ['websocket', 'polling']
}
const socket = io('https://amaxscan.io', socketOptions);

export default socket