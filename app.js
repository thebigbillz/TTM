const contactForm = document.querySelector(".contact-form");

let fullName = document.getElementById("name");
let email = document.getElementById("email");
let company = document.getElementById("company");
let phone = document.getElementById("phone");
let content = document.getElementById("message");
let submit = document.getElementById("submit");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    fullName: fullName.value,
    email: email.value,
    company: company.value,
    phone: phone.value,
    content: content.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://maling-server.herokuapp.com/api/email");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (JSON.parse(xhr.responseText).message == "success") {
      fullName.value = "";
      email.value = "";
      company.value = "";
      phone.value = "";
      content.value = "";
      submit.value = "Sent ✓";
      setTimeout(function () {
        submit.value = "Send Message";
      }, 2000);
    } else {
      submit.value = "Sending Failed";
      setTimeout(function () {
        submit.value = "Send Message";
      }, 2000);
    }
  };
  xhr.onloadstart = function () {
    submit.value = "Sending ...";
  };

  xhr.send(JSON.stringify(formData));
});
