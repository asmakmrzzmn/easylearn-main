document.addEventListener("DOMContentLoaded", function () {
  // MARK VISITED LINKS
  const links = document.querySelectorAll(".chapter-nav a");

  function markVisited(link) {
    const targetId = link.getAttribute("href").substring(1);
    const listItem = link.parentElement;

    if (!listItem.classList.contains("visited")) {
      listItem.classList.add("visited");
      localStorage.setItem(`visited-${targetId}`, "true");
    }
  }

  links.forEach(link => {
    const targetId = link.getAttribute("href").substring(1);
    const listItem = link.parentElement;

    if (localStorage.getItem(`visited-${targetId}`)) {
      listItem.classList.add("visited");
    }

    link.addEventListener("click", () => {
      markVisited(link);
    });
  });

  window.addEventListener("scroll", () => {
    const scrollPos = window.pageYOffset;

    links.forEach(link => {
      const targetId = link.getAttribute("href").substring(1);
      const section = document.getElementById(targetId);
      const listItem = link.parentElement;

      if (
        section &&
        scrollPos >= section.offsetTop - 200 &&
        !listItem.classList.contains("visited")
      ) {
        markVisited(link);
      }
    });
  });

  const completeButton = document.getElementById("complete-chapter");
  if (completeButton) {
    completeButton.addEventListener("click", function () {
      localStorage.setItem("chapter6-complete", "true");
    });
  }

  // LIGHTBOX FUNCTIONALITY
  document.querySelectorAll('.lightbox').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const img = document.createElement('img');
    img.src = this.href;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;'; // symbol

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('active'));

    const removeOverlay = () => {
      overlay.classList.remove('active');
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 300);
    };

    overlay.addEventListener('click', (e) => {
      // Only close if clicked outside the image
      if (e.target === overlay) {
        removeOverlay();
      }
    });

    closeBtn.addEventListener('click', removeOverlay);

    const escHandler = (e) => {
      if (e.key === 'Escape') {
        removeOverlay();
        document.removeEventListener('keydown', escHandler);
      }
    };

    document.addEventListener('keydown', escHandler);
  });
});

});
