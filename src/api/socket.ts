import io from 'socket.io-client';
const socketOptions = {
  transports: ['websocket', 'polling'],
}
const socket = io('https://amaxscan.io', socketOptions);

export default socket