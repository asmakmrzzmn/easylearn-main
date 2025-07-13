 const draggables = document.querySelectorAll('.drag');
    const dropzones = document.querySelectorAll('.dropzone');

    draggables.forEach(drag => {
      drag.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', drag.textContent);
      });
    });

    dropzones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.style.borderColor = '#555';
      });

      zone.addEventListener('dragleave', () => {
        zone.style.borderColor = '#888';
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const answer = e.dataTransfer.getData('text/plain');
        zone.textContent = answer;
        if (answer === zone.getAttribute('data-answer')) {
          zone.classList.remove('wrong');
          zone.classList.add('correct');
        } else {
          zone.classList.remove('correct');
          zone.classList.add('wrong');
        }
        zone.style.borderColor = '#888';
      });
    });