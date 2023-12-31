var users = JSON.parse(localStorage.getItem("users"));

function successMsg(msg){
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: msg,
        showConfirmButton: false,
        timer: 1500
    });
}

function errorMsg(msg){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
        showConfirmButton: false,
        timer: 1500
    });
}

function login() {
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;

    // Check if email and password are not empty
    if (email.trim() === "" || password.trim() === "") {
        errorMsg("Please enter both email and password.");
        return;
    }

    if(!validateEmail(email)){
        errorMsg("Please enter a valid email");
        return;
    }

    // Retrieve data from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (user) {
        // Store the current user in localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Redirect to respective dashboards based on role
        if (user.role === "administrator") {
            window.location.href = "template-parts/admin/admin_dashboard.html";
        } else if (user.role === "member") {
            window.location.href = "template-parts/member/member_dashboard.html";
        }
    } else {
        errorMsg("Invalid credentials. Please try again.");
    }
}


function register() {
    var name = document.querySelector("#reg-name").value;
    var email = document.querySelector("#reg-email").value;
    var password = document.querySelector("#reg-password").value;
    var role = document.querySelector("#role").value;


    // Check if email, password, and role are not empty
    if (email.trim() === "" || password.trim() === "" || role.trim() === "") {
        errorMsg("Please fill in all fields.");
        return;
    }

    if(!validateEmail(email)){
        errorMsg("Please enter a valid email");
        return;
    }

    // Retrieve existing users from localStorage or initialize an empty array
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    var existingUser = users.find(function (user) {
        return user.email === email;
    });

    if (existingUser) {
        errorMsg("This email is already registered. Please use a different email.");
        return;
    }

    registerUser(email, password, role, name);

    // Clear the input fields
    document.querySelector("#reg-name").value = "";
    document.querySelector("#reg-email").value = "";
    document.querySelector("#reg-password").value = "";
    document.querySelector("#role").value = "member";

    // Switch to the login tab
    document.querySelector("#login-tab").click();

    successMsg("Registration successful! You can now log in.");
}

function registerUser(email, password, role, name) {
    // Generate a new user ID
    var userID = generateUserID();

    // Create the new user object
    var newUser = {
        userID: userID,
        email: email,
        password: password,
        role: role,
        name: name
    };

    if(role == 'member'){
        newUser.rate = 20; // default rate
    }

    // Retrieve users from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the users list
    users.push(newUser);

    // Save the updated users back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
}


function generateUserID() {
    // Retrieve users from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the maximum userID
    var maxUserID = 0;
    users.forEach(function (user) {
        if (user.userID > maxUserID) {
            maxUserID = user.userID;
        }
    });

    // Increment the maximum userID to generate a new unique ID
    return maxUserID + 1;
}


document.addEventListener("DOMContentLoaded", function () {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // if (!currentUser || currentUser.role !== "administrator") {
    //     window.location.href = "index.html"; // Redirect to login page
    // }
});


function logout() {
    // Remove the current user information from local storage
    localStorage.removeItem('currentUser');
    
    // Redirect to the login page (you may adjust the URL as needed)
    window.location.href = "../../index.html";
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

//localStorage.clear();

