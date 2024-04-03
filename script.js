const registrationForm = document.getElementById('registrationForm');
const confirmationDiv = document.getElementById('confirmation');
const confirmID = document.getElementById('confirmID');
const confirmName = document.getElementById('confirmName');
const confirmAddress = document.getElementById('confirmAddress');
const confirmStatus = document.getElementById('confirmStatus');
const confirmFee = document.getElementById('confirmFee');
const backButton = document.getElementById('backButton');

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);
  const memberID = formData.get('memberID');
  const memberFullName = formData.get('memberFullName');
  const memberAddress = formData.get('memberAddress');
  const memberStatus = formData.get('memberStatus');

  const apiEndpoint = 'https://bvc-sport-club-backend.onrender.com/api/register'; 
  // const apiEndpoint = 'http://localhost:3000/api/register'; 

  fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      memberID, memberFullName, memberAddress, memberStatus 
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then(data => { 
    confirmID.textContent = "ID: " + memberID;
    confirmName.textContent = "NAME: " + memberFullName;
    confirmAddress.textContent = "ADDRESS: " + memberAddress;
    confirmStatus.textContent = "STATUS: " + memberStatus;
    confirmFee.textContent = "FEE: " + data.fee;

    confirmationDiv.style.display = 'block'; 
    registrationForm.style.display = 'none';
    backButton.style.display = 'block'; 
  })
  .catch(error => {
    console.error('Error submitting form:', error);
  });
});

backButton.addEventListener("click", () => { 
  confirmationDiv.style.display = 'none'; 
  registrationForm.style.display = 'block';
  backButton.style.display = 'none'; 
  clearForm();
});

function clearForm() {
  document.getElementById("registrationForm").reset();
}
