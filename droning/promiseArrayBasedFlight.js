const keypress = require('keypress');
const Drone = require('parrot-minidrone');
const drone = new Drone({
  autoconnect: false,
  droneFilter: "Mambo_471482"
});
const commands = require('./fakeFlightCommands')(drone);
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', (ch, key) => {
  const keyName = key && key.name ? key.name : false;
  if (!keyName) {
    return;
  }

  const flightpath = [
    {command: commands.getReady, duration: 2000},
    {command: commands.takeoff, duration: 2000},
    {command: commands.goRight, duration: 2000},
    {command: commands.goLeft, duration: 2000},
    {command: commands.goBackwards, duration: 2000},
    {command: commands.goForward, duration: 2000},
    {command: commands.land, duration: 2000},
  ];

  const act = ({command, duration}) => {
    return (res) => {
      command();
      setTimeout(() => {
        setTimeout(() => {
          res();
        }, 1000);
        commands.stabilize();
      }, duration);
    }
  };

  flightpath
    .map(act)
    .reduce((promise, action) => {
        return promise.then((_) => new Promise(action))
      }, Promise.resolve()
    );

  switch (keyName) {
    case 'escape':
      drone.emergency();
      break;
    case 'c':
      process.exit();
      break;
    default:
      break;
  }
});


process.stdin.setRawMode(true);
process.stdin.resume();