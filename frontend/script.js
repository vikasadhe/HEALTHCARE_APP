// 🔹 FORM SUBMIT + SAVE TO DATABASE
document.getElementById("supportForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    role: document.getElementById("role").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();

    // Show response message
    document.getElementById("responseMsg").innerText = result;

    // Reset form
    this.reset();

    // 🔥 Reload summary after submit
    loadSummary();

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("responseMsg").innerText = "❌ Error submitting form";
  }
});


// 🔹 LOAD SUMMARY FROM DATABASE
async function loadSummary() {
  try {
    const res = await fetch("http://localhost:5000/summary");
    const data = await res.json();

    let patients = 0;
    let volunteers = 0;

    data.forEach(item => {
      if (item.role === "Patient") {
        patients = item.count;
      } else if (item.role === "Volunteer") {
        volunteers = item.count;
      }
    });

    document.getElementById("patients").innerText = patients;
    document.getElementById("volunteers").innerText = volunteers;

  } catch (error) {
    console.error("Summary Error:", error);
  }
}


// 🔹 LOAD SUMMARY ON PAGE LOAD
window.onload = function() {
  loadSummary();
};


// 🔹 SIMPLE FAQ CHATBOT
function sendMessage() {
  const inputField = document.getElementById("userInput");
  const input = inputField.value.toLowerCase();
  const chatlogs = document.getElementById("chatlogs");

  let response = "Sorry, I didn't understand.";

  if (input.includes("help")) {
    response = "Fill the form above to request help.";
  } 
  else if (input.includes("volunteer")) {
    response = "Select 'Volunteer' in the form and submit.";
  } 
  else if (input.includes("contact")) {
    response = "Our team will contact you after submission.";
  }

  chatlogs.innerHTML += `<p><b>You:</b> ${input}</p>`;
  chatlogs.innerHTML += `<p><b>Bot:</b> ${response}</p>`;

  inputField.value = "";
}