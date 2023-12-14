document.addEventListener("DOMContentLoaded", function() {
    // Récupérer la div avec l'id "nav-content"
    const navContent = document.getElementById("nav-content");
 // deconnect when the button with id docBtn is clicked
    const docBtn = document.getElementById("decoBtn");
    docBtn.addEventListener("click", function() {
        window.location.href = "/";
    });

    // Recuperer les Données des services
    const services = [
      { nom: "Service Soutenance", url: "https://www.univ-ubs.fr/fr/index.html" },
      { nom: "Service Alternances", url: "https://www.univ-ubs.fr/fr/index.html" },
      { nom: "Service Absences", url: "https://www.univ-ubs.fr/fr/index.html" },
      { nom: "Service Maquettes", url: "https://www-ensibs.univ-ubs.fr/fr/index.html" },
      { nom: "Service Stages", url: "https://ent.univ-ubs.fr/uPortal/render.userLayoutRootNode.uP" }
    ];

    function genererElements() {
      services.forEach(item => {
        const div = document.createElement("div");
        div.className = "nav-button";
        const icon = document.createElement("i");
        icon.className = "fas fa-chart-line";
        const lien = document.createElement("a");
        lien.href = item.url;
        lien.target = "iframe";
        lien.innerText = item.nom;

        div.appendChild(icon);
        div.appendChild(lien);
        navContent.appendChild(div);
      });
    }

    genererElements();

        const navButtons = document.querySelectorAll(".nav-button");

        // Ajoutez un écouteur d'événement pour chaque bouton de navigation
        navButtons.forEach(button => {
            button.addEventListener("mouseenter", function() {
                this.style.color = "var(--navbar-dark-primary)"; // Change la couleur du texte au survol
                const index = Array.from(this.parentElement.children).indexOf(this); // Obtient l'index du bouton survolé
                const highlight = document.getElementById("nav-content-highlight");

                const buttonHeight = button.clientHeight;
                highlight.style.top = `${index * 45}px`; 
                        });

            button.addEventListener("mouseleave", function() {
                // Code à exécuter lorsqu'on quitte le bouton
                this.style.color = "var(--navbar-light-secondary)"; // Restaure la couleur du texte
            });
        });

  });