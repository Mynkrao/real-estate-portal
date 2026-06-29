console.log("login.js loaded");

document.getElementById("registerbtn").addEventListener("click", ()=> {
    window.location.href="register.html";
})

const form = document.getElementById("loginForm");

form.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Form submitted");

    try{

        console.log("Sending request");
        const response = await fetch("http://localhost:3001/api/auth/login",{
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const result = await response.json();
        console.log("Response:", result);
        console.log("Status:", response.status);
        if (result.user.role === "admin") {
            window.location.href = "/admin-dashboard.html";
        } else {
            window.location.href = "/dashboard.html";
        }

        console.log(result);

        if(response.ok){
            localStorage.setItem("user", JSON.stringify(result.user));
            window.location.href="dashboard.html";
        }else {
            alert(result.message || "Login Failed");
        }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    
    
})