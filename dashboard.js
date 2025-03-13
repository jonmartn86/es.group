window.onload = function() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html"; // Redirect to login if not logged in
        return;
    }

    document.getElementById("full-name").innerText = user.fullName;
    document.getElementById("dob").innerText = user.dob;
    document.getElementById("short-code").innerText = user.shortcode;

    const age = new Date().getFullYear() - new Date(user.dob).getFullYear();
    document.getElementById("age").innerText = age;

    document.getElementById("country").innerText = user.country;
    
    // Random room number generation (e.g., between 1 and 50)
    const roomNumber = Math.floor(Math.random() * 50) + 1;
    document.getElementById("room-number").innerText = roomNumber;

    document.getElementById("word-teacher").innerText = user.wordTeacher;
    document.getElementById("money").innerText = user.money;
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html"; // Redirect to login page
}
