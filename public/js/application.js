const form = document.getElementById("applicationForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("http://localhost:3001/api/application", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            form.reset();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
});