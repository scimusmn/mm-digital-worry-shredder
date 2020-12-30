// Page panel nav.
let form = document.querySelector('form');
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
  form.style.display = 'none';
  step2.style.display = 'inline-block';
});
