const weatherForm = document.querySelector("form");
const searchElem = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); // e.preventDefault() prevents the browser from refreshing the page after submitting the form

    const location = searchElem.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    // Fetch can only be used for client side JavaScript, cannot be used with Node
    fetch("/weather?address=" + location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        });
    });
});