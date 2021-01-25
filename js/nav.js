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

  // @todo require a value before moving on
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

let museumName = getQueryVariable('museum');
if (museumName) {
  document.getElementById('museum').innerHTML = decodeURI(museumName);
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}