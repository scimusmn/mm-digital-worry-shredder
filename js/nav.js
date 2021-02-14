/*
 * Worry Shredder UI/navigation.
 * 
 * Page transitions and other elements that
 * don't directly interact with the shredding animation.
 */

// Screen 1 -> Screen 2
document.querySelector('button').addEventListener('click', () => {
  let userText = document.querySelector('textarea').value;
  
  document
    .querySelector('#worry-card')
    .insertAdjacentHTML(
      'beforeend',
      '<div class="worry-card-user-text">' +
        userText +
        '</div>',
    );

  // https://github.com/STRML/textFit/issues/45
  // textFit(document.querySelector('.worry-card-user-text'), {multiLine: true})
  // for now, see our custom fitText function below.

  let tl = gsap.timeline();

  tl.call(fitText, [userText]);

  tl.to('.step1', { display: 'none', opacity: 0, duration: 0.25 });
  tl.to('.step2', {
    display: 'inline-block',
    opacity: '100%',
    duration: 0.5
  });

  tl.to(window, { scrollTo: 0, duration: 0.25 }, '<');

});

// Overly-simplistic text resizing.
const fitText = (userText) => {
  if (userText.length > 60) {
    document.querySelector('.worry-card-user-text').style.fontSize =
      '12px';
  }
  if (userText.length > 100) {
    document.querySelector(
      '.worry-card-user-text',
    ).style.fontSize = '10px';
  }
  if (userText.length > 200) {
    document.querySelector('.worry-card-user-text').style.fontSize = '8px';
  }
}