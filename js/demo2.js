/*
 * Build static worry card for demo.
 * In a functional version, text will come over from Step 1.
 */
let worry = 'Duis et dui bibendum, porttitor dui eu, gravida nisl. Donec congue pretium nisl, et posuere ex venenatis non. Mauris at quam ac nunc sagittis pharetra non eget justo.';
let worryCard = document.querySelector("#worry-card");
worryCard.insertAdjacentHTML('beforeend', '<div class="worry-card-user-text">' + worry + "</div>");

// Assign variables to DOM elements we'll use a bunch.
let shredder = document.querySelector(".shredder");

/*
 * Turn the machine on:
 *   Light blinks to green, pulses slowly
 *   Machine shudders
 */
const awakenShredder = () => {

}

/*
 * Drag the card to the machine.
 * When the card touches the machine, disable dragging.
 * Wake up the machine.
 */
let lastY = 0;
Draggable.create(worryCard, {
  type: "y",
  lockAxis: true,
  onDrag: function (e) {
    if (this.hitTest(shredder)) {
      this.endDrag();
      console.log("shreddin time");
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
  }
});

/*
 * When the card enters the machine, shred it.
 * Card moves down into the shredder.
 * Below the shredder, pieces appear.
 */

/*
 * Destroy the shreds.
 * Shredded pieces disintegrate.
 */

/*
 * Bring in closing message.
 */
