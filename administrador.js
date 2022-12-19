const body = document.querySelector("body"),
    sidebar = document.querySelector(".sidebar"),
    toggle = document.querySelector(".toggle"),
    buttoms = document.querySelectorAll(".nav-link"),
    display = document.querySelector(".display");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});


function select() {
    buttoms.forEach((item) =>
        item.classList.remove('selected'));
    this.classList.add('selected');
}

buttoms.forEach((item) => 
    item.addEventListener("click", select));



