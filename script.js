"use scrict";

//constants
const airUrl = `https://api.airtable.com/v0/app9TUcYzYbLtSc81/Reference%20Links`;
const token = `pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`;
const baseId = `app9TUcYzYbLtSc81`;
const tableId = `tblQjuvCaEFjawQYE`;

//Eventually will make functions to sort, but let's start here
//template first? i dont know what im doing

class Grid {
  constructor(title, thumb, type) {
    this.title = title;
    this.thumb = thumb;
    this.type = type;
  }
}

let gridItems = [];

//main function
const getAllData = async (baseId, tableId, token) => {
  console.log(`getAllData`);
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

/*		const data = await response.json();
		
		let content = "",
		for (const record of data.records) {
			const title = record.fields.name || "Title not available";
			const thumb = record.fields.fldls2x0DbFSSZ3A5 || "Image not available";
			const type = record.fields.type || "Type not available";
			
			//get image url
			const thumbUrl = thumb ? fldls2x0DbFSSZ3A5[0]?.url;
			
			content += `
				<div>
					<h3>${name}</h3>
					<img src="${thumbUrl}" />
					<p>${type}</p>
				</div>
			`;
		}
		
		container.innerHTML = content;
	} catch (error) {
		console.log("Error:", error);
		container.innerHTML = "<p>Failed to fetch data. Please try again later.</p>";
	}
};

getAllData();
	*/

/* Old code that I have no idea if it works. didn't for me but its incomplete

async function getAllRecords() {
  let getResultElement = document.getElementById("drawing");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`,
    },
  };

  await fetch(
    `//https://api.airtable.com/v0/app9TUcYzYbLtSc81/Reference%20Links`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getResultElement.innerHTML = "";

      let newHTML = "",

      for (let i=0; i < data.records.length; i++) {
        let name = data.records[i].fields["fldc10uWJMs8Kbwfp"];
        let thumb = data.records[i].fields["fldls2x0DbFSSZ3A5"];
        let category = data.records[i].fields["fldPP4tFHv24zKqxp"];

        newHtml += `
          <div class="thumb">
            <p><a href="drawing.html"
        `

      }
    })
}

*/
