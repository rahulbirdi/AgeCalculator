function showPopup(message) {
    // Create popup if it doesn't exist
    let popup = document.getElementById('popup-message');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popup-message';
        popup.className = 'popup-message';
        document.querySelector('.calculator').prepend(popup);
    }
    
    // Update message
    popup.textContent = message;
    popup.style.display = 'flex';
    popup.style.opacity = '0';
    popup.style.transform = 'translateY(-20px)';
    
    // Trigger animation
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }, 3000);
}

function calculateAge() {
    // Get the birthdate from the input
    const birthdateInput = document.getElementById('birthdate').value;
    
    // Check if date is empty
    if (!birthdateInput) {
        showPopup('Please enter your birthdate');
        return;
    }
    
    const birthdate = new Date(birthdateInput);
    const today = new Date();
    
    // Check if the date is valid
    if (isNaN(birthdate.getTime())) {
        showPopup('Please enter a valid date');
        return;
    }
    
    // Check if the birthdate is in the future
    if (birthdate > today) {
        document.getElementById('result').textContent = 'Birthdate cannot be in the future';
        return;
    }
    
    // Calculate age
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();
    
    // Adjust for negative months or days
    if (days < 0) {
        months--;
        // Get the last day of the previous month
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += lastDayOfLastMonth;
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Format the result
    let result = `Your age is: ${years} years`;
    if (months > 0 || days > 0) {
        result += `, ${months} months`;
        if (days > 0) {
            result += `, and ${days} days`;
        }
    }
    
    // Calculate and add total days
    const diffTime = Math.abs(today - birthdate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    result += `.\nThat's approximately ${Math.floor(diffDays / 7)} weeks or ${diffDays} days old!`;
    
    // Update the result display
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
}

// Add event listener for the calculate button
const calculateBtn = document.getElementById('calculate-btn');
calculateBtn.addEventListener('click', calculateAge);

// Add event listener for Enter key
const birthdateInput = document.getElementById('birthdate');
birthdateInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateAge();
    }
});

// Add event listener for reset button
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', function() {
    // Clear the date input
    document.getElementById('birthdate').value = '';
    
    // Reset the result display
    document.getElementById('years').textContent = '--';
    document.getElementById('months').textContent = '--';
    document.getElementById('days').textContent = '--';
});
