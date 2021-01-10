'use strict'
// import images from './gallery-items';

import {default as images} from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const modalImage = document.querySelector('.lightbox__image');
const overlayRef = document.querySelector('.lightbox__overlay');

// galleryRef.addEventListener('click', handleOpenModal);
modalRef.addEventListener('click', handleOpenModal);
closeBtn.addEventListener('click', handleCloseModal);
overlayRef.addEventListener('click', handleOverlayClick);

const galleryCreator = () => {
    let galleryList = '';
    for (let i = 0; i < images.length; i += 1) {
        galleryList += `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${images[i].original}"
    >  
    <img
      class="gallery__image"
      src="${images[i].preview}"
      data-source="${images[i].original}"
      alt="${images[i].description}"
    />
  </a>
</li>`;
    }
    // galleryRef.innerHTML = galleryList;
    galleryRef.insertAdjacentHTML('afterbegin', galleryList);
};

function handleOpenModal(event) {
    if (event.target.nodeName !== "IMG") {
        return;
    }

    const activeImage = event.target;
    const activeImageLargeURL = activeImage.dataset.source;
    const activeImageLargeALT = activeImage.alt;

    modalImage.src = activeImageLargeURL;
    modalImage.alt = activeImageLargeALT;

    modalRef.classList.add('.is-open');
}

function handleCloseModal() {
    modalRef.classList.remove('.is-open');
}

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        handleCloseModal();
    }
}

galleryCreator();
galleryRef.addEventListener("click", handleOpenModal);
