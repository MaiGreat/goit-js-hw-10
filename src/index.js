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
    fetchCountries(inputedText).then(arrayOfCountries => {
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
}

function createMarkupCountry(country) {
    const countryMarkup = country.map(({ name, capital, population, flags, languages }) => {
        return `
            <li>${name.common}</li>
            <li>Capital: ${capital}</li>
            <li>Population: ${population}</li>
            <li>
                <img class="country__img" src="${flags.svg}" alt="flag" width="80" height="50">
            </li>
            <li>Languages: ${Object.values(languages).join(', ')}</li>
        `
    })
        .join('');
    
    ulEl.insertAdjacentHTML('afterbegin', countryMarkup);
}

function markupFlagUndNameCountry(country) {
    const countryList = country.map(({ name, flags }) => {
        return `
        <li>${name.common}</li>
        <li>
            <img class="country__img" src="${flags.svg}" alt="flag" width="80" height="50">
        </li>
        `
    }).join('')
    ulEl.insertAdjacentHTML('afterbegin', countryList);
}
