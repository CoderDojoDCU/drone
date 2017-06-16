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
    commands.getReady();
   setTimeout(() => {
     commands.takeoff();
   }, 2000);

   setTimeout(() => {
     commands.goRight();
   }, 5000);

   setTimeout(() => {
     commands.stabilize();
   }, 5350);

   setTimeout(() => {
     commands.goForward();
   }, 7000);

   setTimeout(() => {
     commands.stabilize();
   }, 10200);


   setTimeout(() => {
     commands.goRight();
   }, 12000);

   setTimeout(() => {
     commands.stabilize();
   }, 14000);

   setTimeout(() => {
     commands.land();
   }, 16400);


  setTimeout(() => {
    console.log('Flight Succeeded (?)');
    process.exit();
  }, 20000);

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