import fetchData from './countries.js';

const countriesCountainer = document.getElementById('countriesCountainer');
const templateCountryContainer = document.getElementById('templateCountry').content;
const countrySearchInput = document.getElementById('countrySearchInput');
const countryFilter = document.getElementById('countryFilter');
let countriesData = [];
const displayCountries = (data, template) => {
	countriesCountainer.innerHTML = '';
	if (data.length > 0) {
		data.forEach((country) => {
			const node = template.cloneNode(true);
			const flagCountry = node.querySelector('.country__img img');
			const linkCountry = node.querySelector('.country__img a');
			const nameCountry = node.querySelector('.country__name');
			const populationCountry = node.querySelector('.country__population');
			const regionCountry = node.querySelector('.country__region');
			const capitalCountry = node.querySelector('.country__capital');
			flagCountry.setAttribute('src', country.flag);
			flagCountry.setAttribute('alt', `Flag of ${country.name}`);
			linkCountry.setAttribute('href', `details.html?name=${country.name.toLowerCase()}`);
			nameCountry.textContent = country.name;
			populationCountry.textContent = country.population;
			regionCountry.textContent = country.region;
			capitalCountry.textContent = country.capital;

			countriesCountainer.appendChild(node);
		});
	} else {
		countriesCountainer.innerHTML = 'No hay resultados';
	}
};
const getAllCountries = async () => {
	displayCountries(countriesData, templateCountryContainer);
};
const getByCountryName = async (name) => {
	const countryData = countriesData.filter((country) => country.name.toLowerCase().includes(name.toLowerCase()));
	displayCountries(countryData, templateCountryContainer);
};
const getByRegion = async (region) => {
	const countryData = countriesData.filter((country) => country.region.toLowerCase() === region.toLowerCase());
	console.log(countriesData);
	displayCountries(countryData, templateCountryContainer);
};
countrySearchInput.addEventListener('keyup', (e) => {
	const inputValue = e.target.value;
	if (inputValue.length === 3) {
		getByCountryName(inputValue);
	} else {
		getAllCountries();
	}
});
countrySearchInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter')	e.preventDefault();
});
countryFilter.addEventListener('change', (e) => {
	const inputValue = e.target.value;
	if (inputValue) {
		getByRegion(inputValue);
	} else {
		getAllCountries();
	}
});
/**
 * initialize
 */
const init = async () => {
	countriesData = JSON.parse(localStorage.getItem('COUNTRIES')) || await fetchData();
	localStorage.setItem('COUNTRIES', JSON.stringify(countriesData));
	getAllCountries();
};
init();
