const e=document.querySelector(".country-list");console.log(e);document.querySelector("#search-box").addEventListener("input",(function(e){t=e.target.value,fetch(`https://restcountries.com/v3.1/name/${t}?fields=name,capital,population,flags,languages`).then((e=>(console.log(e),e.json()))).then((e=>e));var t}));
//# sourceMappingURL=index.4b88ed29.js.map
