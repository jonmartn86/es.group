document.addEventListener("DOMContentLoaded", () => {
    // Pre-registered users with phone numbers, passwords, short codes, balances, and transaction history
    const users = [
        { phone: "4655yccg", password: "pass0", shortcode: "1234", balance: 5000, transactions: [] },
        { phone: "3784ubnj", password: "pass1", shortcode: "2345", balance: 4200, transactions: [] },
        { phone: "9231zvfd", password: "pass2", shortcode: "3456", balance: 3100, transactions: [] },
        { phone: "8542kjli", password: "pass3", shortcode: "4567", balance: 2800, transactions: [] },
        { phone: "6729ajkw", password: "pass4", shortcode: "5678", balance: 6000, transactions: [] },
        { phone: "5863bvnf", password: "pass5", shortcode: "6789", balance: 1500, transactions: [] },
        { phone: "1942qpmz", password: "pass6", shortcode: "7890", balance: 3200, transactions: [] },
        { phone: "7045nbxc", password: "pass7", shortcode: "8901", balance: 4500, transactions: [] },
        { phone: "8137aodr", password: "pass8", shortcode: "9012", balance: 2000, transactions: [] },
        { phone: "4385vtrj", password: "pass9", shortcode: "0123", balance: 3700, transactions: [] }
    ];

    // Store users in localStorage (only if not already stored)
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Login functionality
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const phone = document.getElementById("phone").value;
            const password = document.getElementById("password").value;
            const shortcode = document.getElementById("shortcode").value;

            const storedUsers = JSON.parse(localStorage.getItem("users"));
            const foundUser = storedUsers.find(user => user.phone === phone && user.password === password && user.shortcode === shortcode);

            if (foundUser) {
                localStorage.setItem("currentUser", JSON.stringify(foundUser));
                window.location.href = "dashboard.html";
            } else {
                document.getElementById("errorMessage").innerText = "Invalid login details";
            }
        });
    }

    // Load Dashboard Data
    if (document.getElementById("balance")) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            document.getElementById("balance").innerText = currentUser.balance;
            loadTransactionHistory(currentUser);
        }
    }

    // Send Money functionality
    if (document.getElementById("sendMoneyForm")) {
        document.getElementById("sendMoneyForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const storedUsers = JSON.parse(localStorage.getItem("users"));
            const amount = parseFloat(document.getElementById("amount").value);
            const receiverPhone = document.getElementById("receiver").value;

            let receiver = storedUsers.find(user => user.phone === receiverPhone);

            if (!receiver) {
                document.getElementById("transactionMessage").innerText = "Recipient not found";
                return;
            }

            if (amount > currentUser.balance) {
                document.getElementById("transactionMessage").innerText = "Insufficient balance";
                return;
            }

            // Deduct from sender, add to receiver
            currentUser.balance -= amount;
            receiver.balance += amount;

            // Add transaction logs to both sender and receiver
            currentUser.transactions.push(`Sent $${amount} to ${receiverPhone}`);
            receiver.transactions.push(`Received $${amount} from ${currentUser.phone}`);

            // Update stored users list
            storedUsers = storedUsers.map(user =>
                user.phone === currentUser.phone ? currentUser :
                    user.phone === receiver.phone ? receiver : user
            );

            // Save updated data in localStorage
            localStorage.setItem("users", JSON.stringify(storedUsers));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            // Update displayed balance
            document.getElementById("balance").innerText = currentUser.balance;
            document.getElementById("transactionMessage").innerText = `Sent $${amount} to ${receiverPhone}`;

            // Load updated transaction history
            loadTransactionHistory(currentUser);
        });
    }

    // Load Transaction History for current user
    function loadTransactionHistory(currentUser) {
        const transactionList = document.getElementById("transactionList");
        if (transactionList) {
            transactionList.innerHTML = ""; // Clear current list
            if (currentUser.transactions && currentUser.transactions.length > 0) {
                currentUser.transactions.forEach(transaction => {
                    const li = document.createElement("li");
                    li.textContent = transaction;
                    transactionList.appendChild(li);
                });
            } else {
                const li = document.createElement("li");
                li.textContent = "No transactions yet.";
                transactionList.appendChild(li);
            }
        }
    }
});