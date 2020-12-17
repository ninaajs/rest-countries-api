import fetchData from './countries.js';

let countriesData = [];
const templateCountry = document.getElementById('templateCountry').content;
const mainContainer = document.getElementById('mainContainer');
const getByCode = (code) => countriesData.find((country) => country.alpha3Code === code);

const displayCountry = (country) => {
	const node = templateCountry.cloneNode(true);
	const flagCountry = node.querySelector('.details__image img');
	const nameCountry = node.querySelector('.details__name');
	const nativeNameCountry = node.querySelector('.details__nativename');
	const populationCountry = node.querySelector('.details__population');
	const regionCountry = node.querySelector('.details__region');
	const subregionCountry = node.querySelector('.details__subregion');
	const capitalCountry = node.querySelector('.details__capital');
	const domainCapital = node.querySelector('.details__domain');
	const councurrenciesCountry = node.querySelector('.details__concurrencies');
	const languagesCountry = node.querySelector('.details__languages');
	const bordersCountry = node.querySelector('.details__borderctries');
	flagCountry.setAttribute('src', country.flag);
	nameCountry.textContent = country.name;
	nativeNameCountry.textContent = country.nativeName;
	populationCountry.textContent = country.population;
	regionCountry.textContent = country.region;
	subregionCountry.textContent = country.subregion;
	capitalCountry.textContent = country.capital;
	// eslint-disable-next-line prefer-destructuring
	domainCapital.textContent = country.topLevelDomain[0];
	councurrenciesCountry.textContent = country.currencies[0].code;
	languagesCountry.textContent = country.languages.map((lang) => lang.name).join(',');
	const fragment = document.createDocumentFragment();
	country.borders.forEach((border) => {
		const countryName = getByCode(border);
		const link = document.createElement('a');
		link.classList.add('btn', 'btn--primary');
		link.textContent = countryName.name;
		link.setAttribute('href', `details.html?name=${countryName.name.toLowerCase()}`);
		fragment.appendChild(link);
	});
	bordersCountry.appendChild(fragment);
	mainContainer.appendChild(node);
};
const getCountryDetail = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const countryName = queryParams.get('name');
	const countryData = countriesData.find((country) => country.name.toLowerCase() === countryName.toLowerCase());
	displayCountry(countryData);
};
/**
 * initialize
 */
const init = async () => {
	countriesData = JSON.parse(localStorage.getItem('COUNTRIES')) || await fetchData();
	localStorage.setItem('COUNTRIES', JSON.stringify(countriesData));
};
init();
getCountryDetail();
