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

  await fetch(
    `https://api.airtable.com/v0/app9TUcYzYbLtSc81/tblQjuvCaEFjawQYE`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["name"]; 
		let image = data.records[i].fields["images"];
		let notes = data.records[i].fields["additional_info"];        

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
				<p class="addt_info">
					${notes
						? `${notes}`
						: ``
					}
				</p>
			</div>
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}



// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
 
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
 
  getAllRecords(); // no id given, fetch summaries
}





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

//setting up Detail View
async function getOneRecord(baseId, tableId, token, id) {
  let getResultElement = document.getElementById("container");

  await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const name = data.fields["fldc10uWJMs8Kbwfp"];
      const category = data.fields["fldc10uWJMs8Kbwfp"];
      const url = data.fields["fldc10uWJMs8Kbwfp"];

      let newHtml = `
		<div something>
		</div>
		`;

      getResultElement.innerHTML = newHtml;
    });
}
*/