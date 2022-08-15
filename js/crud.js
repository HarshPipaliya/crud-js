console.log("This is a crud operations");
let tbody = document.getElementById("tbody");


let fName = document.getElementById("inputFname");
let lName = document.getElementById("inputLname");
let email = document.getElementById("inputEmail");
let mobile = document.getElementById("inputMobile");
let dropDownCountry = document.getElementById("dropDownCountry");
let dropDownState = document.getElementById("dropDownState");
let dropDownCity = document.getElementById("dropDownCity");
let countryDefaultHtml = `<option value="none">Select your country</option>`;
let stateDefaultHtml = `<option value="none">Select your state</option>`;
let cityDefaultHtml = `<option value="none">Select your city</option>`;
let gender;
let selectedRow = "";
let hobby = "";

// Fill country,state,city
let jsonData = `{
    "country":[
        {"name":"India"},
        {"name":"US"},
        {"name":"Australia"}
    ],
    "state":[
        {"country":"India","state":"Gujarat"},
        {"country":"India","state":"Rajasthan"},
        {"country":"US","state":"Texas"},
        {"country":"US","state":"Florida"},
        {"country":"Australia","state":"Victoria"},
        {"country":"Australia","state":"Queensland"}
    ],
    "city":[
        {"state":"Gujarat","city":"Surat"},
        {"state":"Gujarat","city":"Bharuch"},
        {"state":"Rajasthan","city":"Jaipur"},
        {"state":"Rajasthan","city":"Udaipur"},
        {"state":"Texas","city":"Houston"},
        {"state":"Texas","city":"Austin"},
        {"state":"Florida","city":"Miami"},
        {"state":"Florida","city":"Destin"},
        {"state":"Victoria","city":"Melbourne"},
        {"state":"Victoria","city":"Geelong"},
        {"state":"Queensland","city":"Brisbane"},
        {"state":"Queensland","city":"Mackay"}
    ]
}`;

let data = JSON.parse(jsonData);

function handleOnLoad() {
    let country = data.country
    console.log(country);
    let html = "";
    country.map((country) => {
        html += `<option value="${country.name}">${country.name}</option>`;
    });
    dropDownCountry.innerHTML += html;
}

function handleChangeCountry() {
    let state = data.state;
    let html = "";
    let stateArr = [];
    state.map((state) => {
        if (state.country == dropDownCountry.value) {
            stateArr.push(state.state);
        }
    })
    if (dropDownCountry.value == "none") {
        dropDownState.innerHTML = stateDefaultHtml;
        dropDownCity.innerHTML = cityDefaultHtml;
    }
    else {
        stateArr.map((state) => {
            html += `<option value="${state}">${state}</option>`;
        })
        dropDownState.innerHTML = stateDefaultHtml + html;
        dropDownCity.innerHTML = cityDefaultHtml;
    }
}

function handleChangeState() {
    let city = data.city;
    let cityArr = [];
    let html = "";
    city.map((city) => {
        if (city.state == dropDownState.value) {
            cityArr.push(city.city);
        }
    })
    if (dropDownState.value == "none") {
        dropDownCity.innerHTML = cityDefaultHtml;
    }
    else {
        cityArr.map((city) => {
            html += `<option value="${city}">${city}</option>`;
        });
        dropDownCity.innerHTML = cityDefaultHtml + html;
    }
}






// Call when user click on submit or update button
function handleSubmit() {
    event.preventDefault();
    let person = {};
    hobby = "";


    // Get the radio buttons values
    if (document.getElementById("genderMale").checked) {
        gender = "Male";
    }
    else if (document.getElementById("genderFemale").checked) {
        gender = "Female";
    }
    else {
        gender = "";
    }

    // Get the checkbox values
    let checkboxes = document.getElementsByClassName("checks");
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            hobby += checkboxes[i].value + ",";
        }
    }

    // Insert data into person object
    person.fname = fName.value;
    person.lname = lName.value;
    person.email = email.value;
    person.mobile = mobile.value;
    person.gender = gender;
    person.hobby = hobby;
    person.country = dropDownCountry.value;
    person.state = dropDownState.value;
    person.city = dropDownCity.value;

    // Reset the form whenever user will update of submit the form
    document.getElementById("reset").click();


    // Check whether the button is submit or update 
    if (document.getElementById("btnSubmit").value == "Submit") {
        handlePushData(person);
        dropDownState.innerHTML = stateDefaultHtml;
        dropDownCity.innerHTML = cityDefaultHtml;
    }
    else {
        document.getElementById("btnSubmit").value = "Submit";
        handleUpdateData(person, selectedRow);
    }
}







let idArr = [];    // Array for pushing only unique value of id.


// Function to show data in table with user input data.
const handlePushData = (person) => {
    let id = 1;
    getId();
    function getId() {
        while (idArr.includes(id)) {
            id++;
            return getId();
        }
        if (!(idArr.includes(id))) {
            idArr.push(id);
        }
    }
    let html = `<tr>
                    <th scope="row"><input type="checkbox" class="checkbox"></th>
                    <th scope="row">${id}</th>
                    <td>${person.fname}</td>
                    <td>${person.lname}</td>
                    <td>${person.email}</td>
                    <td>${person.mobile}</td>
                    <td>${person.gender}</td>
                    <td>${person.hobby}</td>
                    <td>${person.country}</td>
                    <td>${person.state}</td>
                    <td>${person.city}</td>
                    <td>
                    <button class="btn btn-primary" id="btnUpdate" onclick="handleUpdate(this)">Update</button
                    ><button id="btnDelete" class="btn btn-danger my-1 mx-1" onclick="handleDelete(this)">
                        Delete
                    </button>
                    </td>
                </tr>`;
    tbody.innerHTML += html;
}




let checkAllBox = document.getElementById("checkAll");
const handleCheckAll = () => {
    let checkboxes = document.getElementsByClassName("checkbox");
    if (checkAllBox.checked == true) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    }
    else {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }
}



const handleDeleteAll = () => {
    // debugger;
    let checkboxes = document.getElementsByClassName("checkbox");
    let checkedChk = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            checkedChk.push(checkboxes[i]);
        }
    }
    checkedChk.map((elem, i) => {
        console.log(i);
        let selectedRow = checkedChk[i].parentNode.parentNode;
        let getId = selectedRow.cells[1].innerHTML;
        let index = idArr.indexOf(Number(getId));
        if (index > -1) {
            idArr.splice(index, 1);
        }
        table.deleteRow(selectedRow.rowIndex);
    })
    checkAllBox.checked = false;
}



// Fill the form with users old value.
const handleUpdate = (btnUpdate) => {
    selectedRow = btnUpdate.parentNode.parentNode;
    fName.value = selectedRow.cells[2].innerHTML;
    lName.value = selectedRow.cells[3].innerHTML;
    email.value = selectedRow.cells[4].innerHTML;
    mobile.value = selectedRow.cells[5].innerHTML;
    // Checked the radio button 
    if (selectedRow.cells[6].innerHTML == "Male") {
        document.getElementById("genderMale").checked = true;
    }
    else if (selectedRow.cells[6].innerHTML == "Female") {
        document.getElementById("genderFemale").checked = true;
    }

    // Checked the checboxes
    let checkboxes = document.getElementsByClassName("checks");
    for (let i = 0; i < checkboxes.length; i++) {
        if (hobby.includes(checkboxes[i].value)) {
            checkboxes[i].checked = true;
        }
    }
    // Select the particular dropdown value which was selected by user
    for (let i = 0; i < dropDownCountry.options.length; i++) {
        if (selectedRow.cells[8].innerHTML == dropDownCountry.options[i].value) {
            dropDownCountry.options[i].selected = true;
        }
    }
    document.getElementById("btnSubmit").value = "Update";

    handleChangeCountry();
    for (let i = 0; i < dropDownState.options.length; i++) {
        if (selectedRow.cells[9].innerHTML == dropDownState.options[i].value) {
            dropDownState.options[i].selected = true;
        }
    }

    handleChangeState();
    for (let i = 0; i < dropDownCity.options.length; i++) {
        if (selectedRow.cells[10].innerHTML == dropDownCity.options[i].value) {
            dropDownCity.options[i].selected = true;
        }
    }
}






// Update the table whenever user fill the updated data and clicks on update button
const handleUpdateData = (person, selectedRow) => {
    dropDownState.innerHTML = stateDefaultHtml;
    dropDownCity.innerHTML = cityDefaultHtml;

    selectedRow.cells[2].innerHTML = person.fname;
    selectedRow.cells[3].innerHTML = person.lname;
    selectedRow.cells[4].innerHTML = person.email;
    selectedRow.cells[5].innerHTML = person.mobile;
    selectedRow.cells[6].innerHTML = person.gender;
    selectedRow.cells[7].innerHTML = person.hobby;
    selectedRow.cells[8].innerHTML = person.country;
    selectedRow.cells[9].innerHTML = person.state;
    selectedRow.cells[10].innerHTML = person.city;
    selectedRow = "";
}








// Delete the whole row when user clicks on delete button using selectRow
const handleDelete = (btnDelete) => {
    selectedRow = btnDelete.parentNode.parentNode;
    let getId = selectedRow.cells[1].innerHTML;
    let table = document.getElementById("table");
    table.deleteRow(selectedRow.rowIndex);
    let index = idArr.indexOf(Number(getId));
    if (index > -1) {
        idArr.splice(index, 1);
    }
    selectedRow = "";
}