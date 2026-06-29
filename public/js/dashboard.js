window.addEventListener("DOMContentLoaded", async ()=> {
    try{
        const response = await fetch("/api/application/my-application", {
        method: "GET",
        credentials: "include"
        });

        if (response.status === 401) {
            alert("Your session has expired. Please login again.");
            window.location.href = "/login.html";
            return;
        }

        if (!response.ok) {
            alert("Unable to load your dashboard.");
            return;
        }
        const result = await response.json();
        const application = result.application;

        console.log(result)

        document.getElementById("email").textContent = application.email;
        document.getElementById("fullName").textContent = application.firstName +" " + application.lastName;
        document.getElementById("phoneNo").textContent = application.phoneNo;
        document.getElementById("jobRole").textContent = application.jobRole;
        document.getElementById("qualification").textContent = application.qualification;
        document.getElementById("experience").textContent = application.hasExperience ? application.experienceDetails : "No Previous Experience";
        const statusBadge = document.getElementById("statusBadge");
        statusBadge.textContent = application.status;
        statusBadge.className = application.status.toLowerCase();
        if (application.photo) {
            document.getElementById("profilePhoto").src = "/" + application.photo;
        }

        const resumeLink = document.getElementById("resumeLink");
        if (application.resume) {
            resumeLink.href = "/" + application.resume;
        } else {
            resumeLink.textContent = "No Resume Uploaded";
            resumeLink.removeAttribute("href");
        }

        const aadharLink = document.getElementById("aadharLink");
        if (application.aadhar) {
            aadharLink.href = "/" + application.aadhar;
        } else {
            aadharLink.textContent = "No Aadhaar Uploaded";
            aadharLink.removeAttribute("href");
        }

        document.getElementById("createdAt").textContent = new Date(application.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }catch(error){
        console.log(error);
        alert("Unable to load dashboard, please login again");
        window.location.href="login.html";
    }

})