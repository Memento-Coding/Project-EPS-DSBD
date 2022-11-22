const navBar = document.querySelector("nav"),
      menuBtns = document.querySelectorAll(".menu-icon"),
      overlay = document.querySelector(".overlay"),
      buttoms = document.querySelectorAll(".lists .nav-link");

    menuBtns.forEach((menuBtn) => {
      menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
      });
    });

    function select() {
      buttoms.forEach((item) =>
        item.classList.remove('selected'));
      this.classList.add('selected');
    }

    buttoms.forEach((item) =>
      item.addEventListener('click', select));

    overlay.addEventListener("click", () => {
      navBar.classList.remove("open");
    });

    const targets = document.querySelectorAll('[data-target]');
    const content = document.querySelectorAll('[data-content]');

    targets.forEach(target => {
        target.addEventListener('click', () =>{
            content.forEach(c => {
                c.classList.remove('active');
            });
            navBar.classList.remove('open');
            const t = document.querySelector(target.dataset.target);
            t.classList.add('active');
        });
    });