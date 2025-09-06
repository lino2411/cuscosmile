document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('open');
    });
  }

  // Carrusel de testimonios
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const totalItems = document.querySelectorAll('.testimonial').length;

  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    if (carousel) {
      carousel.style.transform = `translateX(${offset}%)`;
    }
  }

  if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);
  }

  //-- ---- - Filtros de servicios---
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.service-card').forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

  //-- FAQ acordeón - cuestionaria
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-toggle i");

    if (!question || !icon) return;

    question.addEventListener("click", (e) => {
      e.stopPropagation(); // evita que el clic se propague

      const isActive = item.classList.contains("active");

      // Cerrar todos los ítems
      faqItems.forEach((el) => {
        el.classList.remove("active");
        el.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        el.querySelector(".faq-toggle i")?.classList.replace("fa-minus", "fa-plus");
      });

      // Si no estaba activo, abrirlo
      if (!isActive) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
        icon.classList.replace("fa-plus", "fa-minus");
      }
    });
  });

  // Cerrar FAQ al hacer clic fuera
  document.addEventListener("click", (e) => {
    const clickedInsideFAQ = e.target.closest(".faq-item");
    if (!clickedInsideFAQ) {
      faqItems.forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        item.querySelector(".faq-toggle i")?.classList.replace("fa-minus", "fa-plus");
      });
    }
  });

  //---------formulario de contacto por WhatsApp
  //---------formulario de contacto por WhatsApp
const form = document.getElementById("whatsapp-form");

if (!form) {
  console.warn("Formulario no encontrado");
} else {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("input[name='name']").value.trim();
    const edad = form.querySelector("input[name='edad']").value.trim();
    const phone = form.querySelector("input[name='phone']").value.trim();
    const cliente = form.querySelector("select[name='cliente']").value;
    const service = form.querySelector("select[name='service']").value;
    const message = form.querySelector("textarea[name='message']").value.trim();

    if (!name || !edad || !phone || !cliente || !service) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const servicioEmoji = {
      "odontologia-general": "🦷",
      "consulta-adontologica": "📋",
      "estetica-dental": "😄",
      "implantes": "🛠️",
      "ortodoncia": "🦷🪥",
      "endodoncia": "💉",
      "periodoncia": "🪥",
      "cirugia-oral": "🛠️"
    };

    const servicioNombre = {
      "odontologia-general": "Odontología General",
      "consulta-adontologica": "Consulta Odontológica",
      "estetica-dental": "Estética Dental",
      "implantes": "Implantes Dentales",
      "ortodoncia": "Ortodoncia",
      "endodoncia": "Endodoncia",
      "periodoncia": "Periodoncia",
      "cirugia-oral": "Cirugía Oral"
    };

    const emoji = servicioEmoji[service] || "📋";
    const servicioTexto = servicioNombre[service] || service;
    const servicioMensaje = message || "Estoy interesado en este servicio, por favor envíenme más detalles.";

    const rawMessage = `Hola 👋, soy *${name}* (edad: ${edad} años)
${emoji} Soy *${cliente.replace('-', ' ')}* y quiero información sobre *${servicioTexto}*.
📞 Cel: ${phone}
📝 Mensaje: ${servicioMensaje}`;

    const whatsappNumber = "51984773182"; //reemplazar con el número real del destinatario
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;

    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      window.location.href = whatsappURL;
    } else {
      window.open(whatsappURL, "_blank");
    }

    form.reset();
  });
}

  // --------------------- Modal para imágenes de la galería

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('caption');
    const closeBtn = modal.querySelector('.close');

    if (!galleryItems.length || !modal || !modalImg || !caption || !closeBtn) {
        console.warn("Galería o elementos del modal no encontrados.");
        return;
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h5')?.textContent || '';

            if (img && img.src) {
                modalImg.src = img.src;
                caption.textContent = title;
                modal.style.display = 'block';
            }
        });
    });

    // Cerrar el modal al hacer clic en la X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}


});

 // --------------------- Modal para imágenes de la galería

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del modal
    const modal = document.querySelector('#imageModal');
    const modalImg = document.querySelector('#modalImg');
    const captionText = document.querySelector('#caption');
    const cerrarBtn = document.querySelector('.close');
    
    // Verificar si los elementos existen
    if (!modal || !modalImg || !captionText || !cerrarBtn) {
        console.error('Error: No se encontraron los elementos del modal. Verifica los IDs en el HTML.');
        return;
    }
    
    // Obtener todas las imágenes de la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Agregar evento de clic a cada elemento de la galería
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-img');
            const caption = this.querySelector('h5');
            if (img && caption) {
                modal.style.display = 'block';
                modalImg.src = img.src;
                captionText.textContent = caption.textContent;
            } else {
                console.error('No se encontró la imagen o el título en el elemento de la galería.');
            }
        });
    });
    
    // Cerrar el modal al hacer clic en el botón de cerrar
    cerrarBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar el modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cerrar el modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

      ///------------ Galería de imágenes antes y despues
  // galleryItems.forEach((item, index) => {
  //     item.addEventListener('click', () => {
  //         currentIndex = index;
  //         modal.style.display = 'flex';
  //         const img = item.querySelector('.gallery-img') || item.querySelector('.before-after-img img:first-child');
  //         modalImg.src = img.src;
  //         captionText.textContent = item.querySelector('h5').textContent;
  //     });
  // });

});

//------- Botón para volver arriba
const scrollTopBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 2000) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

