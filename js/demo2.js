// Assign variables to DOM elements we'll use often.
let worryCard = document.querySelector('#worry-card');
let shredder = document.querySelector('.shredder');
let scrapBox = document.querySelector('.scrap-box');
let light = document.querySelector('.power');

/**
 * Initialize the animation.
 */
const init = () => {
  gsap
    .timeline()
    .from(shredder, { duration: 1, opacity: 0 })
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
      if (this.hitTest(shredder)) {
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

  // Turn on the power light.
  tl.to(light, { backgroundColor: 'green' });

  // Shake the shredder.
  tl.fromTo(
    shredder,
    { x: -2 },
    {
      x: 2,
      duration: 0.1,
      repeat: 40,
      yoyo: true,
      ease: Quad.easeInOut,
    },
    '<', // Start when the above animation starts.
  );

  // Pull the card downwards.
  tl.to(
    worryCard,
    {
      y: worryCard.offsetHeight + shredder.clientHeight,
      duration: 15,
    },
    '<0.25', // Start .25s after the above animation starts.
  );

  tl.set(
    makeShreds,
    {
      delay: 0.5,
      onRepeat: makeShreds,
      repeat: worryCard.offsetHeight / 20,
      repeatDelay: 1,
    },
    '<', // Start when the above animation starts.
  );

  // End the scene 1s after the card finishes moving.
  tl.add(showClosing, '+=1');
};

/**
 * Create a bunch of divs to represent paper shreds.
 * @todo this could be more performant
 */
const makeShreds = () => {
  var total = 30;
  for (i = 0; i < total; i++) {
    var shred = document.createElement('div');
    gsap.set(shred, {
      attr: { class: 'snow' },
      x: R(
        shredder.getBoundingClientRect().left + 80,
        shredder.getBoundingClientRect().right - 180,
      ),
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
    y: 300,
    ease: Linear.easeNone,
    duration: R(6, 15),
  });
  // Float the shreds around the X-axis.
  gsap.to(elm, {
    x: '-=20',
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
 * Bring in closing message.
 */
const showClosing = () => {
  let shreds = document.querySelectorAll('.snow');
  let tl = gsap.timeline();

  // Fade out and destroy the shreds.
  tl.to(shreds, {
    opacity: 0,
    duration: 3,
    onComplete: cleanup,
    onCompleteParams: [shreds],
  });
  tl.to(light, { backgroundColor: 'yellow' });

  tl.to(
    document.querySelectorAll('.closing-message'),
    {
      opacity: '100%',
    },
    '<', // Start when the above animation starts.
  );

  console.log('the end');
};

/**
 * Delete animated elements after they disappear.
 */
const cleanup = (el) => {
  console.log(el);
  el.forEach((e) => e.remove());
};
