'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const btn = document.querySelector('.btn-search');
const quotesContainer = document.querySelector('.quotes');
const TA = document.querySelector('.text-area');
let counter = 0;

const animeQts = async function (CName) {
  try {
    const UrlData = await fetch(
      `https://animechan.vercel.app/api/quotes/character?name=${CName}`
    );
    if (!UrlData.ok) throw new Error('Character not found');
    const [quoteData] = await UrlData.json();
    console.log(quoteData);
    const HTML = `<article class="quote">
      <div class="quote__data">
        <h3 class="character-name">${quoteData.character}</h3>
        <h4 class="character-anime">${quoteData.anime}</h4>
        <p class="character-quote">${quoteData.quote}</p>
      </div>
    </article>`;
    quotesContainer.insertAdjacentHTML('beforeend', HTML);
    quotesContainer.style.opacity = 1;
  } catch (err) {
    wrongName();
  }
};
const AQ = () => {
  counter++;
  if (counter === 1) btn.textContent = 'Get quote';
  if (counter === 2) btn.textContent = 'Get quote';
  if (counter === 3) btn.textContent = 'Get quote';
  if (counter === 4) btn.textContent = 'Try again';
  if (counter === 5) tryAgain();
  animeQts(TA.value);
};

btn.addEventListener('click', AQ);

const tryAgain = function () {
  if (btn.textContent === 'Try again')
    btn.addEventListener('click', location.reload());
  btn.textContent = 'Try again';
  counter = 0;
};
const wrongName = function () {
  if (btn.textContent === 'Wrong! Try another name')
    btn.addEventListener('click', location.reload());
  btn.textContent = 'Wrong! Try another name';
  counter--;
};
