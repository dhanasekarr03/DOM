let studentList = JSON.parse(localStorage.getItem("students")) || [];

window.onload = function () {
    renderTable();
    let params = new URLSearchParams(window.location.search);
    let editParam = params.get("edit");
    if (editParam !== null) {
        loadEditForm(parseInt(editParam));
    }
};

// ---- Render Table ----
function renderTable() {
    let tbody = document.getElementById("tableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    let noMsg = document.getElementById("noRecords");

    if (studentList.length === 0) {
        noMsg.style.display = "block";
        return;
    }

    noMsg.style.display = "none";

    for (let i = 0; i < studentList.length; i++) {
        let s = studentList[i];

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${s.name}</td>
            <td>${s.id}</td>
            <td>${s.email}</td>
            <td>${s.contact}</td>
            <td>
                <button class="btn-edit" onclick="editStudent(${i})">Edit</button>
                <button class="btn-delete" onclick="deleteStudent(${i})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    }

    // show vertical scroll when students are more than 5
    let container = document.getElementById("tableContainer");
    if (studentList.length > 5) {
        container.style.maxHeight = "290px";
        container.style.overflowY = "scroll";
    } else {
        container.style.maxHeight = "";
        container.style.overflowY = "";
    }
}

// ---- Clear all error messages ----
function clearErrors() {
    document.getElementById("nameError").innerText = "";
    document.getElementById("idError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("contactError").innerText = "";
}

// ---- Add or Update Student ----
function addStudent() {
    clearErrors();

    let name = document.getElementById("studentName").value.trim();
    let id = document.getElementById("studentId").value.trim();
    let email = document.getElementById("studentEmail").value.trim();
    let contact = document.getElementById("contactNo").value.trim();

    let isValid = true;

    // name - only letters and spaces allowed
    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required.";
        isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
        document.getElementById("nameError").innerText = "Name should contain letters only.";
        isValid = false;
    }

    // student ID - numbers only
    if (id === "") {
        document.getElementById("idError").innerText = "Student ID is required.";
        isValid = false;
    } else if (!/^[0-9]+$/.test(id)) {
        document.getElementById("idError").innerText = "Student ID should be numbers only.";
        isValid = false;
    }

    // email validation
    if (email === "") {
        document.getElementById("emailError").innerText = "Email is required.";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").innerText = "Please enter a valid email address.";
        isValid = false;
    }

    // contact - numbers only, minimum 10 digits
    if (contact === "") {
        document.getElementById("contactError").innerText = "Contact number is required.";
        isValid = false;
    } else if (!/^[0-9]+$/.test(contact)) {
        document.getElementById("contactError").innerText = "Contact should be numbers only.";
        isValid = false;
    } else if (contact.length < 10) {
        document.getElementById("contactError").innerText = "Contact must be at least 10 digits.";
        isValid = false;
    }

    if (!isValid) return;

    let studentObj = { name, id, email, contact };

    let editIndex = parseInt(document.getElementById("editIndex").value);

    if (editIndex === -1) {
        studentList.push(studentObj);
    } else {
        studentList[editIndex] = studentObj;
    }

    // save to localStorage
    localStorage.setItem("students", JSON.stringify(studentList));

    clearForm();
    renderTable();
}

// ---- Edit Student ----
function editStudent(index) {
    // if on records page, redirect back to index with edit index in URL
    if (window.location.href.includes("records.html")) {
        window.location.href = "index.html?edit=" + index;
        return;
    }
    loadEditForm(index);
}

function loadEditForm(index) {
    let s = studentList[index];

    document.getElementById("studentName").value = s.name;
    document.getElementById("studentId").value = s.id;
    document.getElementById("studentEmail").value = s.email;
    document.getElementById("contactNo").value = s.contact;
    document.getElementById("editIndex").value = index;

    document.getElementById("addBtn").innerText = "Update Student";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---- Delete Student ----
function deleteStudent(index) {
    let confirm_del = confirm("Are you sure you want to delete this student?");
    if (!confirm_del) return;

    studentList.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(studentList));
    renderTable();
}

// ---- Clear Form ----
function clearForm() {
    document.getElementById("studentName").value = "";
    document.getElementById("studentId").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("contactNo").value = "";
    document.getElementById("editIndex").value = "-1";
    document.getElementById("addBtn").innerText = "Add Student";
    clearErrors();
}
