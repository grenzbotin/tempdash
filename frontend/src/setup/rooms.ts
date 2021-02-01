const ROOM_NAMES = {
  living_room: 'Living room',
  core: 'Core'
};

const ROOMS = process.env.REACT_APP_ROOMS.split(',');

const getRoomName = (id: string): string => (ROOM_NAMES[id] ? ROOM_NAMES[id] : id);

export { ROOMS, getRoomName };
