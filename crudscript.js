var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value; // Ensure you have an email input
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("stdList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    newRow.insertCell(0).innerHTML = data.id; // ID field (consider generating this)
    newRow.insertCell(1).innerHTML = data.name;
    newRow.insertCell(2).innerHTML = data.email;
    newRow.insertCell(3).innerHTML = '<a onClick="onEdit(this)">Edit</a> | <a onClick="onDelete(this)">Delete</a>';
}

function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = ""; // Ensure you have an email input
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.id; // Update ID if necessary
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.email;
}

function onDelete(td) {
    if (confirm('Are you sure to DELETE this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById("stdList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    let isValid = true;
    const nameInput = document.getElementById("name");
    const nameValidationError = document.getElementById("nameValidationError");

    if (nameInput.value.trim() === "") {
        isValid = false;
        nameValidationError.classList.remove("hide");
    } else {
        nameValidationError.classList.add("hide");
    }
    return isValid;
}
