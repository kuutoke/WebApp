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

      for (let i = 0; i < data.records.length; i++) {
        // for each table row, create and append HTML listing
        let name = data.records[i].fields["name"];
        let image = data.records[i].fields["images"];
        let subject = data.records[i].fields["subject"];

        newHtml += `
			<div class="griditem col-sm">
				<div class="gridtitle">
					<h2><a href="index.html?id=${data.records[i].id}">${name}</a></h2>
				</div>
				<div class="thumbnail">
					${
            image
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

// Splitting of URL to do one versus all
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}

// Filtering by subject and category
let subjectParams = window.location.search.split("?subject=");
let catParams = window.location.search.split("&category=");
if (subjectParams.length >= 2) {
  if (catParams.length >= 2) {
    //filter by category
  } else {
    //filter by subject
  }
} //maybe add another else if doesn't work

//setting up Detail View
async function getOneRecord(id) {
  let getResultElement = document.getElementById("container");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/app9TUcYzYbLtSc81/tblQjuvCaEFjawQYE/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getResultElement.innerHTML = "";

      let newHtml = "";

      let name = data.fields["name"];
      let category = data.fields["category"];
      let subject = data.fields["subject"];
      let link = data.fields["url"];
      let addt_info = data.fields["additional_info"];
      let image = data.fields["images"];

      newHtml = `
		  <div class="singleitem">
		    <div class="singleinfo">
			    <h1>${name}</h1>
			    <h2>${subject}</h2><h2>${category}</h2>
			    <p>${addt_info ? `${addt_info}` : ``}</p>
        </div>
        <div class="singleimgs">
			    ${
            image
              ? `<img src="${image[0].url}" alt="Image of ${name} unavailable.">`
              : ``
          }
        </div>
      </div>
      `;

      getResultElement.innerHTML = newHtml;
    });
}

// Filtering Functions
async function getSubjectRecord(subject) {
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

      let name = data.fields["name"];
      let category = data.fields["category"];
      let subject = data.fields["subject"];
      let link = data.fields["url"];
      let addt_info = data.fields["additional_info"];
      let image = data.fields["images"];

      newHtml = `
		  <div class="singleitem">
		    <div class="singleinfo">
			    <h1>${name}</h1>
			    <h2>${subject}</h2><h2>${category}</h2>
			    <p>${addt_info ? `${addt_info}` : ``}</p>
        </div>
        <div class="singleimgs">
			    ${
            image
              ? `<img src="${image[0].url}" alt="Image of ${name} unavailable.">`
              : ``
          }
        </div>
      </div>
      `;

      getResultElement.innerHTML = newHtml;
    });
}
