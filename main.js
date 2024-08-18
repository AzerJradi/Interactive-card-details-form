document.addEventListener("DOMContentLoaded", function () {
    const inputName = document.querySelector(".inputName");
    const inputNumCard = document.querySelector(".inputNumCard");
    const inputMM = document.querySelector(".inputMM");
    const inputYY = document.querySelector(".inputYY");
    const inputCVC = document.querySelector(".inputCVC");
  
    const cardName = document.querySelector(".nameCart");
    const cardNumber = document.querySelector(".numCart");
    const cardExpDate = document.querySelector(".bdCart");
    const cardCVC = document.querySelector(".BackCartNum");
  
    // Update the card details in real-time as the user types
    inputName.addEventListener("input", function () {
      cardName.textContent = inputName.value.trim() || "JANE APPLESEED";
    });
  
    inputNumCard.addEventListener("input", function () {
      let formattedCardNumber = inputNumCard.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      cardNumber.textContent = formattedCardNumber || "0000 0000 0000 0000";
    });
  
    inputMM.addEventListener("input", function () {
      updateExpDate();
    });
  
    inputYY.addEventListener("input", function () {
      updateExpDate();
    });
  
    inputCVC.addEventListener("input", function () {
      cardCVC.textContent = inputCVC.value || "000";
    });
  
    function updateExpDate() {
      const mm = inputMM.value.padStart(2, '0');
      const yy = inputYY.value.padStart(2, '0');
      cardExpDate.textContent = `${mm}/${yy}` || "00/00";
    }
  
    // Validate and handle form submission
    document.querySelector("button").addEventListener("click", function (e) {
      e.preventDefault();
  
      let errorMessage = '';
  
      // Validation checks
      if (!/^[A-Za-z\s]+$/.test(inputName.value.trim())) {
        errorMessage += 'Cardholder name is invalid. Please use only letters and spaces.\n';
      }
  
      if (!/^\d{16}$/.test(inputNumCard.value.replace(/\s/g, ""))) {
        errorMessage += 'Card number must be 16 digits long.\n';
      }
  
      if (inputMM.value < 1 || inputMM.value > 12 || inputMM.value === '') {
        errorMessage += 'Expiration month is invalid. Please enter a valid month (01-12).\n';
      }
  
      if (inputYY.value.length !== 2 || inputYY.value < 20 || inputYY.value === '') {
        errorMessage += 'Expiration year is invalid. Please enter a valid two-digit year (e.g. 25).\n';
      }
  
      if (!/^\d{3}$/.test(inputCVC.value)) {
        errorMessage += 'CVC must be 3 digits long.\n';
      }
  
      if (errorMessage === '') {
        // If valid, display the success message
        document.querySelector(".Part2").style.display = "none";
        const successDiv = document.createElement("div");
        successDiv.className = "completed";
        successDiv.innerHTML = `
          <h1>Thank you!</h1>
          <p>We've added your card details</p>
          <button onclick="location.reload()">Continue</button>
        `;
        document.querySelector(".body1").appendChild(successDiv);
      } else {
        // If there are errors, display an alert with the error messages
        alert(errorMessage);
      }
    });
  });
  