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

display.addEventListener("click", () => {
    sidebar.classList.add("close");
});

const targets = document.querySelectorAll('[data-target]');
const content = document.querySelectorAll('[data-content]');

targets.forEach(target => {
  target.addEventListener('click', () => {
    content.forEach(c => {
      c.classList.remove('active');
    });
    sidebar.classList.add("close");
    const t = document.querySelector(target.dataset.target);
    t.classList.add('active');
  });
});
