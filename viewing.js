Things we'll need JS to do: 
access airtable
get record, reformat HTML template, place into main HTML
loopback and do the same for successive listings
stop when reach n amount of pulled listings, go for next n listings when prompted
	^list records has adjustable page size limit and offset
hide non-relevant listings or only show relevant listings for filtering
	^at least baselevel filtering can be list record URL so dont have to load as much



{//function to get results based on a filter- separate button listener?
buttonFilter.addEventListener("click", (event) => { //event listener for click on button
//listener is getfilteredrecords, figure out how to take filter id from button and use as function parameter

function get record {filter parameter}
fetch request
url for get 10 items with title subtitle subject category: https://api.airtable.com/v0/app9TUcYzYbLtSc81/tblQjuvCaEFjawQYE?fields%5B%5D=+fldc10uWJMs8Kbwfp&fields%5B%5D=+fldYTbjmbruzZllaS&fields%5B%5D=+fldCPDl5iw17KcJxg&fields%5B%5D=+fldPP4tFHv24zKqxp&pageSize=10

loop of for page_limit (offset?), insert requested variables, increment item_no
pull data from item_no
create variable of title subtitle itemid
replace html
end
});


}



function get record 
another fetch or?

pull itemid from triggering click, use that to pull from airtable
USINGG dialog. can inject HTML dialog. maybe thats how we get multiple to pop up
can have a return value for dialogs. 
want it to be Non-Modal (can interact with page while open)
create variables of title, subtitle, blurb, url, images, etc figure out exacts later
replace html



event click
click on see all or filter buttons trigger pull from table
click on single item uses itemno to pull and display addtl data