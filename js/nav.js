/**
 * Worry Shredder UI/navigation.
 * 
 * Page transitions and other elements that
 * don't directly interact with the shredding animation.
 */

// Page panel nav.
let step1 = document.querySelector('.step1');
let step2 = document.querySelector('.step2');

// Screen 1 -> Screen 2
document.querySelector('button').addEventListener('click', () => {
  let worry = document.querySelector('textarea').value;
  let worryCard = document.querySelector('#worry-card');

  worryCard.insertAdjacentHTML(
    'beforeend',
    '<div class="worry-card-user-text">' + worry + '</div>',
  );

  // @todo make this snazzier
  step1.style.display = 'none';
  step2.style.display = 'inline-block';

  gsap.timeline().fromTo(
    '.point-down',
    { y: -5 },
    {
      y: 5,
      duration: 0.5,
      repeat: 8,
      yoyo: true,
      ease: Quad.easeInOut,
    },
  );
});