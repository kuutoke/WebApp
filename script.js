"use strict";

// function for our list view - all under async
async function getAllRecords() {
  let getResultElement = document.getElementById("container");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`,
    },
  };

// fetch data and place into webpage dynamically for List View
  await fetch(
    `https://api.airtable.com/v0/app9TUcYzYbLtSc81/tblQjuvCaEFjawQYE`,
    options
  )
    .then((response) => response.json()) // there is a valid response, proceed
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear container HTML

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) { // for each table row, create and append HTML listing
        let name = data.records[i].fields["name"]; 
		let image = data.records[i].fields["images"];
		let subject = data.records[i].fields["subject"];        

        newHtml += `
			<div class="griditem col-sm">
				<div class="gridtitle">
					<h2><a href="index.html?id=${data.records[i].id}">${name}</a></h2>
				</div>
				<div class="thumbnail">
					${image
						? `<img src="${image[0].url}" alt="Image of ${name} unavailable.">`
						: ``
					}
				</div>
				<div class="category">
					<p>${subject}</p>
				</div>
			</div>
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

getAllRecords();

// Detail View enabling splitting of URL
/* let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
 
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
 
  getAllRecords(); // no id given, fetch summaries
}
*/

//setting up Detail View
/* async function getOneRecord(id) {
 let getResultElement = document.getElementById("container");

  const options = {
		method: "GET",
		headers: {
		  Authorization: `Bearer pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`,
		},
  };

  await fetch(
	`https://api.airtable.com/v0/app9TUcYzYbLtSc81/tblQjuvCaEFjawQYE`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
	  
	  getResultElement.innerHTML = "";
	  
	  let newHtml = "";

      let name = data.[idParams[1]]fields["name"];
      let category = data.[idParams[1]]fields["category"];
	  let subject = data.[idParams[1]]fields["subject"];
      let url = data.[idParams[1]]fields["url"];
	  let addt_info = data.[idParams[1]]fields["additional_info"];
	  let image = data.[idParams[1]]fields["images"];

      newHtml = `
		<div class="singleitem">
		  <div class="row">
			<h1>${name}</h1>
			<h2>${category}, ${subject}</h2>
		  </div>
		  <div class="row">
			<p>${addt_info
						? `${addt_info}`
						: ``
					}</p>
			</ br>
			${image
						? `<img src="${image[0].url}" alt="Image of ${name} unavailable.">`
						: ``
					}
		  </div>
		</div>
		`;

      getResultElement.innerHTML = newHtml;
    });
}

*/




/*

"use scrict";

//constants
const token = `pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`;
const baseId = `app9TUcYzYbLtSc81`;
const tableId = `tblQjuvCaEFjawQYE`;

//setting up looking for detail view switch
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
  console.log("fetchTable");
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

//rendering based on subject
const renderSubject = (rows) => {
  let innerHTML = "";
  for (let i = 0; i < rows.records.length; i++) {
    const card = `
				<div class="griditem col-sm">
				<h2><a href="index.html?id=${[i].id}">${"fldc10uWJMs8Kbwfp"}</a></h2>
				<div class="thumbnail">
					<img src="${"fldls2x0DbFSSZ3A5"}" alt="Image unavailable." />
				</div>
				<p>
					${"fldoISxwtISg14mGW"}
				</p>
				</div>
				`;
    innerHTML += card;
  }
  return innerHTML;
};

//rendering based on subject and category
const renderCategory = (rows, category) => {
  let innerHTML = "";
  for (let i = 0; i < rows.records.length; i++) {
    const card = `
				<div class="griditem col-sm">
				<h2><a href="index.html?id=${[i].id}">${"fldc10uWJMs8Kbwfp"}</a></h2>
				<div class="thumbnail">
					<img src="${"fldls2x0DbFSSZ3A5"}" alt="Image unavailable." />
				</div>
				<p>
					${"fldoISxwtISg14mGW"}
				</p>
				</div>
				`;
    innerHTML += card;
  }
  return innerHTML;
};

document.addEventListener("DOMContentLoaded", async () => {
  const queryParams = getAllQueryParams();
  console.log(`queryParams: ${queryParams}`);

  if (queryParams.subject && queryParams.category) {
    const subject = queryParams.subject;
    const category = queryParams.category;
    const data = await fetchTable(baseId, tableId, token);
    const container = document.getElementById("container");
    let innerHTML = "";
    renderCategory(data, category);
    container.innerHTML = innerHTML;
  } else if (queryParams.subject) {
    const subject = queryParams.subject;
    const data = await fetchTable(baseId, tableId, token);
    const container = document.getElementById("container");
    let innerHTML = "";
    renderSubject(data);
    container.innerHTML = innerHTML;
  }
});

//setting up List View
const getAllData = async () => {
  const apiKey = `pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`;
  const baseId = "app9TUcYzYbLtSc81";
  const tableName = "tblQjuvCaEFjawQYE";

  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable.");
    }

    const data = await response.json();
    if (!data.records) {
      throw new Error("Failed to fetch data from Airtable.");
    }

    let container = document.getElementById("container");

    let newHtml = "";

    for (let i = 0; i < data.length; i++) {
      const name = data.fields.name || "Title not available";
      const thumb = data.fields.fldls2x0DbFSSZ3A5 || "Image not available";
      const type = data.fields.type || "Type not available";

      //get image url
      const thumbUrl = thumb ? thumb : record.fields.fldls2x0DbFSSZ3A5[0]?.url;

      const card = `
		<div>
			<h3>${name}</h3>
			<img src="${thumbUrl}" />
			<p>${type}</p>
		</div>
	  `;
      newHtml += card;
    }
    container.innerHTML = newHtml;
  } catch (error) {
    console.log("Error:", error);
    container.innerHTML =
      "<p>Failed to fetch data. Please try again later.</p>";
  }
};
getAllData();


*/