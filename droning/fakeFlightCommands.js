module.exports = (drone) => {


  return {
    takeoff: () => {
      console.log('Taking Off');
    },

    land: () => {
      console.log('Landing');
    },

    stabilize: () => {
      console.log('Stabilizing');
    },

    goForward: () => {
      console.log('Going Forward');
    },

    goBackwards: () => {
      console.log('Going Backwards');
    },

    goRight: () => {
      console.log('Going Right');
    },

    goLeft: () => {
      console.log('Going Left');
    },
    getReady : () => {
      console.log('Getting ready to fly!');
    }
  }
};
