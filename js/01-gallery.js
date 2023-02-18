import { galleryItems } from './gallery-items.js';
// Change code below this line

document.addEventListener('DOMContentLoaded', () => {
  (function() {
    if (!document.querySelector('.gallery')) return;

    new GalleryFirst('.gallery', galleryItems);
  })();
});

class GalleryFirst {
  constructor(selector, data) {
    this.rootElement = document.querySelector(selector);
    this.data = data;

    this.init();
  }

  init() {
    this.renderTree();

    this.rootElement.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.matches('.gallery__image')) {
        const instance = basicLightbox.create(`
          <img src=${e.target.dataset.source} alt=${e.target.alt}>
        `, {
          onClose: () => {
            document.removeEventListener('keydown', closeModal);
          }
        });

        instance.show();

        document.addEventListener('keydown', closeModal);

        function closeModal(e) {
          if (e.code === 'Escape') {
            instance.close();
          }
        }
      }
    });
  }

  renderTree() {
    this.data.forEach(item => {
      this.rootElement.append(this.createItem(item));
    })
  }

  createItem({description, original, preview}) {
    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = preview;
    img.setAttribute('data-source', original);
    img.alt = description;

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = original;

    const div = document.createElement('div');
    div.classList.add('gallery__item');

    link.append(img);
    div.append(link);

    return div;
  }
}

console.log(galleryItems);