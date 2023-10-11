// member_dashboard.js

document.addEventListener("DOMContentLoaded", function () {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || currentUser.role !== "member") {
        window.location.href = "index.html"; // Redirect to login page
    }
});

window.onload = function () {
    displayAssignedTasks();
};

function displayAssignedTasks() {
    // Retrieve tasks from localStorage
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Filter tasks that are assigned to the current member (you may replace "currentUserEmail" with actual member's email)
    var currentUserEmail = localStorage.getItem("currentUser");
    var assignedTasks = tasks.filter(function (task) {
        return task.assignedMember === currentUserEmail;
    });

    // Get the table body element
    var assignedTasksList = document.getElementById("assignedTasksList");

    // Clear existing content in the table
    assignedTasksList.innerHTML = '';

    // Loop through assigned tasks and add them to the table
    assignedTasks.forEach(function (task) {
        var newRow = assignedTasksList.insertRow(assignedTasksList.rows.length);
        newRow.innerHTML = `
            <td>${task.taskID}</td>
            <td>${task.taskName}</td>
            <td>${task.taskDescription}</td>
            <td>
                <button class="btn btn-success" onclick="updateTaskStatus(${task.taskID},'Complete')">Complete</button>
                <button class="btn btn-warning" onclick="updateTaskStatus(${task.taskID},'Pending')">Pending</button>
                <button class="btn btn-primary" onclick="updateTaskStatus(${task.taskID},'In Progress')">In Progress</button>
            </td>
        `;
    });
}


function updateTaskStatus(taskID, status) {
    // Retrieve tasks from localStorage
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the task with the specified taskID
    var task = tasks.find(function (task) {
        return task.taskID == taskID;
    });

    // Update the status of the task
    task.status = status;

    // Save the updated tasks back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Refresh the displayed tasks
    displayAssignedTasks();
}


function showDashboardContent() {
    // Show Dashboard content
    document.getElementById("dashboardContent").style.display = "block";
    document.getElementById("taskAssignmentContent").style.display = "none";
    document.getElementById("profileContent").style.display = "none";

    // Set active class on the clicked sidebar option
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.classList.remove('active');
    });
    document.getElementById('dashboardLink').classList.add('active');
}

function showTaskAssignmentContent() {
    // Hide other content sections
    document.getElementById("dashboardContent").style.display = "none";
    document.getElementById("profileContent").style.display = "none";

    // Show Task Assignment content
    document.getElementById("taskAssignmentContent").style.display = "block";

    // Set active class on the clicked sidebar option
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.classList.remove('active');
    });
    document.getElementById('taskAssignmentLink').classList.add('active');
}


function showProfileContent() {
    // Show Profile content
    document.getElementById("dashboardContent").style.display = "none";
    document.getElementById("taskAssignmentContent").style.display = "none";
    document.getElementById("profileContent").style.display = "block";

    // Set active class on the clicked sidebar option
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.classList.remove('active');
    });
    document.getElementById('profileLink').classList.add('active');
}