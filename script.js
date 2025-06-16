async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatWindow = document.getElementById("chat-window");
  const message = input.value.trim();
  if (!message) return;

  chatWindow.innerHTML += "<div><strong>Você:</strong> " + message + "</div>";
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    chatWindow.innerHTML += "<div><strong>AnjoGuia:</strong> " + data.reply + "</div>";
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (err) {
    chatWindow.innerHTML += "<div style='color:red;'>Erro ao responder. Tente novamente.</div>";
  }
}

// ====== FRASERS MOTIVACIONAIS ======
function showPhrase() {
  const phrases = [
    "Viajar é a única coisa que você compra e te deixa mais rico.",
    "O mundo é um livro e quem não viaja lê apenas uma página.",
    "A aventura está lá fora — só depende de você vivê-la!",
    "Descubra novos lugares e, ao mesmo tempo, descubra a si mesmo.",
    "Cada viagem é uma história para contar e uma memória para guardar."
  ];
  const randomIndex = Math.floor(Math.random() * phrases.length);
  document.getElementById("phrase").innerText = phrases[randomIndex];
}

// ====== CARROSSEL ======
document.addEventListener("DOMContentLoaded", function() {
  // Carrossel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-container a');
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  window.prevSlide = function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  window.nextSlide = function() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  showSlide(currentSlide);

  // ====== PARCEIROS ======
  const form = document.getElementById('partnerForm');
  const gallery = document.getElementById('partnersGallery');
  let partners = [];

  if(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = form.name.value;
      const description = form.description.value;
      const image = form.image.value;
      const gmaps = form.gmaps.value;

      const partner = { name, description, image, gmaps };
      partners.push(partner);
      renderGallery();
      form.reset();
    });
  }

  function renderGallery() {
    if (!gallery) return;
    gallery.innerHTML = '';
    partners.forEach(partner => {
      const card = document.createElement('div');
      card.className = 'partner-card';
      card.innerHTML = `
        <a href="${partner.gmaps}" target="_blank" title="Ver no Google Maps">
          <img src="${partner.image}" alt="Imagem de ${partner.name}">
        </a>
        <h3>${partner.name}</h3>
        <p>${partner.description}</p>
      `;
      gallery.appendChild(card);
    });
  }
});

