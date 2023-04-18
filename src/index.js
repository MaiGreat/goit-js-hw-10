import './css/styles.css';
import { fetchCountries }  from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;

const ulEl = document.querySelector('.country-list');
console.log(ulEl);
const inputEl = document.querySelector('#search-box');



inputEl.addEventListener('input', onInputText);

function onInputText(e) {
    const inputedText = e.target.value;
    fetchCountries(inputedText);
    
    
    

}

function markupCountry(country) {
    return country.map(({ name, capital, population, flag, languages }) => {
        return `
            <li>Name of country: '${name}'</li>
            <li>Capital: '${capital}'</li>
            <li>Population: '${population}'</li>
            <li>Flag:
            <a href="">
                        <svg>
                            <use></use>
                        </svg>
                    </a>
            </li>
            <li>Languages: '${languages}'</li>

        `
    })
}
