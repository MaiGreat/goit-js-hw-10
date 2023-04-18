export function fetchCountries(request) {
   fetch(`https://restcountries.com/v3.1/name/${request}?fields=name,capital,population,flags,languages`)
       .then(respons => {
        console.log(respons);
        return respons.json();
        })
        .then(data => {
        return data;
        })
};
