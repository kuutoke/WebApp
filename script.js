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

//OK I don't know what this is or how it works. who knows if this actually does things
class Grid {
  constructor(title, thumb, type) {
    this.title = title;
    this.thumb = thumb;
    this.type = type;
  }
}

let gridItems = [];

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

    const container = document.getElementById("container");

    let newHtml = "";

    for (let i = 0; i < data.record.length; i++) {
      const name = record.fields.name || "Title not available";
      const thumb = record.fields.fldls2x0DbFSSZ3A5 || "Image not available";
      const type = record.fields.type || "Type not available";

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
