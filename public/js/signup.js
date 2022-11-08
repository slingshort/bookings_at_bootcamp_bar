// will edit query selector once all handlebars are complete
async function signupFormHandler(event) {
    event.preventDefault();

    const first_name = document.querySelector("#firstName").value.trim();
    const last_name = document.querySelector('#lastName').value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const is_subscriber = document.querySelector("#subscribe").checked;


    if (first_name && last_name && email && password) {
        const response = await fetch("/api/users", {
            method: "post",
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
                is_subscriber,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            // create post req to log user in upon signup
            const response = await fetch("api/login", {
                method: "post",
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: { "Content-Type": "application/json" },
            }); 
            if (response.ok) {
                // redirect to bookings page upon signup
                document.location.replace("/bookings");
            } else {
                alert("Something went wrong :(")
            }
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector("#submitBtn").addEventListener("click", signupFormHandler);
