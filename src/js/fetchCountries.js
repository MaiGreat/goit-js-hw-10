export function fetchCountries(request) {
    return fetch(`https://restcountries.com/v3.1/name/${request}?fields=name,capital,population,flags,languages`)
       .then(respons => {
        return respons.json();
        })
//         .then(data => {
//         return data;
//         })
};
