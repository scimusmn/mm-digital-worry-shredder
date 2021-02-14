/**
 * Worry Shredder animations.
 */

let worryCard = document.querySelector('#worry-card');
let shredder = document.querySelectorAll('.shredder-wrap img');
let slot = document.querySelector('.slot');
let scrapBox = document.querySelector('.window');

/**
 * Initialize the animation.
 */
const init = () => {
  gsap
    .timeline()
    .add(enableDrag());
};

/*
 * Make the card draggable.
 * Turn on the shredder when the card hits it.
 */
const enableDrag = () => {
  let lastY = 0;
  Draggable.create(worryCard, {
    type: 'y',
    lockAxis: true,
    onDrag: function (e) {
      if (this.hitTest(slot)) {
        startShred();
        this.disable();
      }
    },
    // Only allow downwards dragging.
    liveSnap: {
      y: function (y) {
        if (y > lastY) {
          lastY = y;
        }
        return lastY;
      },
    },
  });
};

/*
 * Shred the worry card.
 */
const startShred = () => {
  let tl = gsap.timeline();

  audioObj = new Audio('assets/shred.mp3');
  audioObj.volume = 0.2;
  audioObj.play();

  // https://www.youtube.com/watch?v=8UFIYGkROII
  tl.to('.crank', {
    duration: 10,
    rotation: 640,
    ease: 'Power1.easeInOut',
  });

  // Shake the shredder.
  tl.fromTo(
    shredder,
    { x: -0.75 },
    {
      x: 0.75,
      duration: 0.1,
      repeat: 20,
      yoyo: true,
      ease: Quad.easeInOut,
    },
    '<', // Start at the same time as the above animation.
  );

  // Pull the card downwards.
  tl.to(
    worryCard,
    {
      y: 370,
      duration: 9
    },
    '<0.25', // Start .25s after the above animation starts.
  );

  tl.set(
    makeShreds,
    {
      delay: 0.2,
      onRepeat: makeShreds,
      repeat: 5,
      repeatDelay: 1,
    },
    '<0.5', // Start .25s after the above animation starts.
  );

  tl.to(
    document.querySelectorAll('.closing-message'),
    {
      opacity: '100%',
      duration: 2,
    },
    '<5', // Start 3s after the above animation starts.
  );

  // End the scene after the card finishes moving.
  tl.add(destroyShreds);
};

/**
 * Create a bunch of divs to represent paper shreds.
 */
const makeShreds = () => {
  var total = 18;
  for (i = 0; i < total; i++) {
    var shred = document.createElement('div');
    gsap.set(shred, {
      attr: { class: 'snow' },
      x: R(-10, 230),
      y: -10,
      z: R(-20, 20),
    });
    scrapBox.appendChild(shred);
    snowfall(shred);
  }
};

/**
 * Falling shredded paper effect.
 */
const snowfall = (elm) => {
  // Send the shreds downward.
  gsap.to(elm, {
    y: 200,
    ease: Linear.easeNone,
    duration: R(6, 12),
  });
  // Float the shreds around the X-axis.
  gsap.to(elm, {
    x: '-=5',
    rotationZ: R(0, 180),
    repeat: -1,
    yoyo: true,
    ease: Sine.easeInOut,
    duration: R(4, 8),
  });
  // Rotate the shreds around as they fall.
  gsap.to(elm, {
    rotationX: R(0, 360),
    rotationY: R(0, 360),
    repeat: -1,
    yoyo: true,
    ease: Sine.easeInOut,
    delay: -5,
    duration: R(2, 8),
  });
};

function R(min, max) {
  return min + Math.random() * (max - min);
}

/*
 * Fade out the shreds.
 */
const destroyShreds = () => {
  let shreds = document.querySelectorAll('.snow');
  let tl = gsap.timeline();

  // Fade out and destroy the shreds.
  tl.to(shreds, {
    opacity: 0,
    duration: 1.5,
    onComplete: cleanup,
    onCompleteParams: [shreds],
  });
};

/**
 * Delete animated elements after they disappear.
 */
const cleanup = (el) => {
  el.forEach((e) => e.remove());
};
