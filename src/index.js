import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const ulEl = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText(e) {
    const inputedText = e.target.value.trim();
    fetchCountries(inputedText)
    .then(arrayOfCountries => {
        console.log(arrayOfCountries);
        if (arrayOfCountries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (arrayOfCountries.length === 1) {
            ulEl.innerHTML = '';
            createMarkupCountry(arrayOfCountries);
        } else {
            ulEl.innerHTML = '';
            markupFlagUndNameCountry(arrayOfCountries);
        }
    })
    .catch(() => {
        ulEl.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name.');
    })
}

function createMarkupCountry(country) {
    const countryMarkup = country.map(({ name, capital, population, flags, languages }) => {
        return `
        <div class = "country-list-item">
            <li >
                <img class="country-img" src="${flags.svg}" alt="flag" width="35" height="20">
                <span class="country-list-name">${name.common}</span>
            </li>
        </div>
        <li class ="info-country-list">Capital: <span class="main-info">${capital}</span></li>
        <li class ="info-country-list">Population: <span class="main-info">${population}</span></li>
        <li class ="info-country-list">Languages: <span class="main-info">${Object.values(languages).join(', ')}</span></li>
        `
    })
        .join('');
    
    ulEl.insertAdjacentHTML('afterbegin', countryMarkup);
}

function markupFlagUndNameCountry(country) {
    const countryList = country.map(({ name, flags }) => {
        return `
        <div class = "country-list-item">
            <li >
                <img class="country-img" src="${flags.svg}" alt="flag" width="35" height="20">
                <span class="country-list-name">${name.common}</span>
            </li>
        </div>
        `
    }).join('')
    ulEl.insertAdjacentHTML('afterbegin', countryList);
}