// Assign variables to DOM elements we'll use often.
let worryCard = document.querySelector('#worry-card');
let shredder = document.querySelector('.shredder');
let scrapBox = document.querySelector('.scraps');
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
  let tl = gsap.timeline();
  tl.from(shredder, { duration: 1, opacity: 0 });
  tl.add(enableDrag());
};

/*
 * Make the card draggable.
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

  // Shredder rumbles
  tl.fromTo(
    shredder,
    0.1,
    { x: -2 },
    {
      x: 2,
      repeat: 40,
      yoyo: true,
      ease: Quad.easeInOut,
    },
  );

  // Worry card slides downward.
  tl.to(
    worryCard,
    {
      y: worryCard.offsetHeight + 100,
      duration: 30,
    },
    //'-=10',
  );

  tl.add(snowfall());
  tl.add(stopSnow());
};

/**
 * Falling shredded paper effect.
 */
const snowfall = () => {
  gsap.set(scrapBox, { perspective: 500 });

  var total = 100;

  for (i = 0; i < total; i++) {
    var snowflake = document.createElement('div');
    gsap.set(snowflake, {
      attr: { class: 'snow' },
      x: R(
        shredder.getBoundingClientRect().left,
        shredder.getBoundingClientRect().right - 50,
      ),
      y: 0,
      z: R(-20, 20),
    });
    scrapBox.appendChild(snowflake);
    fall(snowflake);
  }

  function fall(elm) {
    gsap.to(elm, R(6, 15), {
      y: worryCard.offsetHeight + 200,
      ease: Linear.easeNone,
      repeat: -1,
      delay: -15,
    });
    gsap.to(elm, R(4, 8), {
      x: '-=100',
      rotationZ: R(0, 180),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
    gsap.to(elm, R(2, 8), {
      rotationX: R(0, 360),
      rotationY: R(0, 360),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
      delay: -5,
    });
  }

  function R(min, max) {
    return min + Math.random() * (max - min);
  }
};

/*
 * Destroy the shreds.
 * Shredded pieces disintegrate.
 */
const stopSnow = () => {};

/*
 * Bring in closing message.
 */
const showClosing = () => {};
