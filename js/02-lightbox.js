import { galleryItems } from './gallery-items.js';
// Change code below this line

document.addEventListener('DOMContentLoaded', () => {
  (function() {
    if (!document.querySelector('.gallery')) return;

    new GallerySimpleLightbox('.gallery', galleryItems);
  })();
});

class GallerySimpleLightbox {
  constructor(selector, data) {
    this.rootElement = document.querySelector(selector);
    this.data = data;

    this.init();
  }

  init() {
    this.renderTree();
    new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250
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
    img.alt = description;

    const link = document.createElement('a');
    link.classList.add('gallery__item');
    link.href = original;

    link.append(img);

    return link;
  }
}

console.log(galleryItems);
