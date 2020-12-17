const fetchData = async () => {
	const response = await fetch('https://restcountries.eu/rest/v2/all');
	const data = await response.json();
	return data;
};

export default fetchData;
