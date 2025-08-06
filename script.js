"use scrict";

//constants
const airUrl = `https://api.airtable.com/v0/app9TUcYzYbLtSc81/Reference%20Links`;
const token = `pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`;
const baseId = `app9TUcYzYbLtSc81`;
const tableId = `tblQjuvCaEFjawQYE`;


let gridItems = [];

//enable searching
function getAllQueryParams() {
	const params = new URLSearchParams(window.location.search);
	const queryParams = {};
	for (const [key, value] of params.entries()) {
		queryParams[key] = value;
	}
	return queryParams;
}

//fetching airtable with error handling
const fetchTable = async (baseId, tableId, token) => {
  console.log(`fetchTable`);
  let response;
  try {
    response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(JSON.stringify(data.records, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching table:", error);
  }
};

//enabling filtering of data by subject and category
const filterData = (data, subject, category) => {
	const filteredData = data.records.filter((record) => {
		return (
		  record.fields.Subject.toLowerCase() === subject &&
		  record.fields.Category.toLowerCase() === category
		);
	});
	return filteredData;
};

//rendering based on subject
const renderDrawings = (rows, category) => {
	let innerHTML = "";
	rows.forEach((row) => {
		const card = `
		  <div class="griditem col-sm">
				<h2>${row.fields["fldc10uWJMs8Kbwfp"]}</h2>
				<img src="${row.fields["fldls2x0DbFSSZ3A5"]}" alt="Image unavailable.">
				<p>${row.fields["fldoISxwtISg14mGW"]}</p>
			</div>
		`;
		innerHTML += card;
	});
	return innerHTML;
};
const renderGeneral = (rows, category) => {
	let innerHTML = "";
	rows.forEach((row) => {
		const article = `
		  <article class="griditem">
		    <h2>${row.fields["fldc10uWJMs8Kbwfp"]}</h2>
			<img src="${row.fields["fldls2x0DbFSSZ3A5"]}" alt="Image unavailable.">
			<p>${row.fields["fldoISxwtISg14mGW"]}</p>
		  </article>`;
		innerHTML += article;
	});
	return innerHTML;
};
const renderWorldbuilding = (rows, category) => {
	let innerHTML = "";
	rows.forEach((row) => {
		const article = `
		  <article class="griditem">
		    <h2>${row.fields["fldc10uWJMs8Kbwfp"]}</h2>
			<img src="${row.fields["fldls2x0DbFSSZ3A5"]}" alt="Image unavailable.">
			<p>${row.fields["fldoISxwtISg14mGW"]}</p>
		  </article>`;
		innerHTML += article;
	});
	return innerHTML;
};

//main function
document.addEventListener("DOMContentLoaded", async () => {
	const queryParams = getAllQueryParams();
	console.log(`queryParams: ${queryParams}`);
	
	if (queryParams.subject && queryParams.category) {
		const subject = queryParams.subject;
		const category = queryParams.category;
		const data = await fetchTable(baseId, tableId, token);
		const filteredData = filterData(data, subject, category);
		const element = document.getElementById('gridbody');
		let innerHTML = "";
		switch (subject) {
			case "drawing":
				innerHTML = renderDrawings(filteredData, category);
				break;
			case "general":
				innerHTML = renderGeneral(filteredData, category);
				break;
			case "worldbuilding"
				innerHTML = renderWorldbuilding(filteredData, category);
				break;
		}
		element.innerHTML = innerHTML;
	}
});