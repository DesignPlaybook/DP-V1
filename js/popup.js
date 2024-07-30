document.addEventListener("DOMContentLoaded", () => {
    const switchButton = document.getElementById("switchButton");

    const toggleButton = () => {
        setTimeout(() => {
            switchButton.classList.toggle("slide-in");
            switchButton.classList.toggle("slide-out");
        }, 9000); // Hide after 12 seconds

        setTimeout(() => {
            switchButton.classList.toggle("slide-in");
            switchButton.classList.toggle("slide-out");
        }, 12000); // Show after 3 more seconds
    };

    toggleButton();
    setInterval(toggleButton, 12000); // Repeat every 15 seconds (12 seconds shown + 3 seconds hidden)

    // switchButton.addEventListener("click", () => {
    //   alert("Stay tuned for more updates!");
    // });
});
