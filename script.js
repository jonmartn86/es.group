// Array of 50 users
const users = [
    { phone: '0750', shortcode: 'es2324', password: '0750', fullName: 'ahmad', dob: '1990-01-01', country: 'USA', wordTeacher: 'slav chawani', money: '£21.34' },
    { phone: 'emad.uk', shortcode: 'eu2425', password: 'emaduk07', fullName: 'emad uk', dob: '2002-02-02', country: 'UK', wordTeacher: 'slav mr emad', money: '£215.07' },
    { phone: '1234567892', shortcode: 'abc125', password: 'password', fullName: 'James Smith', dob: '1988-03-03', country: 'UK', wordTeacher: 'Sarah Williams', money: '$3500' },
    { phone: '1234567893', shortcode: 'abc126', password: 'password', fullName: 'Emily Brown', dob: '1985-04-04', country: 'Australia', wordTeacher: 'David Clark', money: '$5000' },
    { phone: '1234567894', shortcode: 'abc127', password: 'password', fullName: 'Michael Green', dob: '1995-05-05', country: 'Germany', wordTeacher: 'Jessica Martinez', money: '$4500' },
    // Add 45 more users here following the same format...
    { phone: '1234567939', shortcode: 'abc174', password: 'password', fullName: 'Alex Taylor', dob: '2000-06-06', country: 'France', wordTeacher: 'Oliver Scott', money: '$3000' }
];

// Handle the login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const phone = document.getElementById("phone").value;
    const shortcode = document.getElementById("shortcode").value;
    const password = document.getElementById("password").value;

    // Find user by phone and shortcode
    const user = users.find(u => u.phone === phone && u.shortcode === shortcode && u.password === password);

    if (user) {
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-message").innerText = "Invalid credentials. Please try again.";
    }
});
