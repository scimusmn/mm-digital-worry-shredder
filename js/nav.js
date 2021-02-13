/**
 * Worry Shredder UI/navigation.
 * 
 * Page transitions and other elements that
 * don't directly interact with the shredding animation.
 */

// Screen 1 -> Screen 2
document.querySelector('button').addEventListener('click', () => {
  let worry = document.querySelector('textarea').value;
  let worryCard = document.querySelector('#worry-card');

  worryCard.insertAdjacentHTML(
    'beforeend',
    '<div class="worry-card-user-text">' + worry + '</div>',
  );

  let tl = gsap.timeline();
  tl.to('.step1', { display: 'none', opacity: 0, duration: .25 });
  tl.to('.step2', { display: 'inline-block', opacity: "100%", duration: .5 });

  // Animate the pointer icon.
  tl.fromTo(
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