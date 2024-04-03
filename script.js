const registrationForm = document.getElementById('registrationForm');
const confirmationDiv = document.getElementById('confirmation');
const confirmID = document.getElementById('confirmID');
const confirmName = document.getElementById('confirmName');
const confirmAddress = document.getElementById('confirmAddress');
const confirmStatus = document.getElementById('confirmStatus');
const confirmFee = document.getElementById('confirmFee');
const buttonBack = document.getElementById('buttonBack');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const formData = new FormData(registrationForm);
    const userID = formData.get('userID');
    const fullName = formData.get('fullName');
    const address = formData.get('address');
    const status = formData.get('status');
    
  
    const apiEndpoint = 'https://web-bvc-sport-club-0a7m.onrender.com/api/register'; 
    //const apiEndpoint = 'http://localhost:3000/api/register'; 

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
      },
        body: JSON.stringify({
          userID, fullName, address, status
        }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        
    })
    .then(data => { 
      const formData = new FormData(registrationForm);
      
      const registrationData = {
        id: formData.get('userID'),
        fullName: formData.get('fullName'),
        address: formData.get('address'),
        status: formData.get('status'),
      };
    
      confirmID.textContent = "ID: " + registrationData.id;
      confirmName.textContent = "NAME: " + registrationData.fullName;
      confirmAddress.textContent = "ADDRESS: " + registrationData.address;
      confirmStatus.textContent = "STATUS: " + registrationData.status;
      confirmFee.textContent = "FEE: " + data.fee;
    
      confirmationDiv.style.display = 'block'; 
      registrationForm.style.display = 'none';
      buttonBack.style.display = 'block'; 

      buttonBack.addEventListener("click", backButton);
      function backButton() {
        confirmationDiv.style.display = 'none'; 
        registrationForm.style.display = 'block';
        buttonBack.style.display = 'none'; 
        clearForm();
      }

      function clearForm() {
        document.getElementById("registrationForm").reset();
      }
      
      
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
    
});
