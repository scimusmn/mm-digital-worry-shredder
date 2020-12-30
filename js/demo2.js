// Assign variables to DOM elements we'll use often.
let worryCard = document.querySelector('#worry-card');
let shredder = document.querySelector('.shredder');
let scrapBox = document.querySelector('.scrap-box');
let light = document.querySelector('.power');

/*
 * Build static worry card for demo.
 * In the functional version, text will come over from Step 1.
 */
let worry =
  'Duis et dui bibendum, porttitor dui eu, gravida nisl. Donec congue pretium nisl, et posuere ex venenatis non. Mauris at quam ac nunc sagittis pharetra non eget justo.';
worryCard.insertAdjacentHTML(
  'beforeend',
  '<div class="worry-card-user-text">' + worry + '</div>',
);

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
  );

  // Pull the card downwards.
  tl.to(
    worryCard,
    {
      y: worryCard.offsetHeight + 100,
      duration: 10,
      onStart: makeShreds,
    },
    '<',
  );

  tl.add(showClosing, '+=2');
};

/**
 * Create a bunch of divs to represent paper shreds.
 */
const makeShreds = () => {
  var total = 100;
  for (i = 0; i < total; i++) {
    var shred = document.createElement('div');
    gsap.set(shred, {
      attr: { class: 'snow' },
      x: R(
        shredder.getBoundingClientRect().left + 100,
        shredder.getBoundingClientRect().right - 100,
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
  // Send the shreds downward
  gsap.to(elm, {
    y: 300,
    ease: Linear.easeNone,
    delay: 2,
    duration: R(6, 15),
  });
  // Float the shreds around the X-axis
  gsap.to(elm, {
    x: '-=100',
    rotationZ: R(0, 180),
    repeat: -1,
    yoyo: true,
    ease: Sine.easeInOut,
    duration: R(4, 8),
  });
  // Rotate the shreds around as they fall
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
  // @todo fully stop the animation/remove items from DOM
  let shreds = document.querySelectorAll('.snow');

  let tl = gsap.timeline();
  tl.to(shreds, { opacity: 0, duration: 3 });
  tl.to(document.querySelectorAll('.closing-message'), {
    opacity: '100%',
  });

  console.log('the end');
};
