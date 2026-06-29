const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await fetch("http://localhost:3001/api/auth/register",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
        const result = await response.json();
        console.log("Response:", result);
        console.log("Status:", response.status);

        console.log(result);

        if(response.ok){
            alert("Registration Successful");
            window.location.href="login.html";
        }else {
            alert(result.message || "SignUp Failed");
        }
    }catch (error) {
        console.error(error);
        alert("Something went wrong");
     }
})