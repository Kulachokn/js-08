'use strict'
import {default as images} from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const modalImage = document.querySelector('.lightbox__image');
const overlayRef = document.querySelector('.lightbox__overlay');

modalRef.addEventListener('click', handleOpenModal);
closeBtn.addEventListener('click', handleCloseModal);
overlayRef.addEventListener('click', handleOverlayClick);

let indexCurrentImage;

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

    galleryRef.insertAdjacentHTML('afterbegin', galleryList);
};

function handleOpenModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") {
        return;
    }

    const activeImage = event.target;
    const activeImageLargeURL = activeImage.dataset.source;
    const activeImageLargeALT = activeImage.alt;

    modalImage.src = activeImageLargeURL;
    modalImage.alt = activeImageLargeALT;

    modalRef.classList.add('is-open');
    window.addEventListener('keydown', handlePressKey);
    indexCurrentImage = Number(event.target.dataset.index);
}

function handleCloseModal() {
    modalImage.src = '';
    modalRef.classList.remove('is-open');
    window.removeEventListener('keypress', handlePressKey);
}

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        handleCloseModal();
    }
}

function handlePressKey(event) {
    switch (event.code) {
        case 'Escape':
            handleCloseModal();
            break;
        case 'ArrowRight':
            if (indexCurrentImage + 1 === galleryRef.length) {
                indexCurrentImage = 0;
            } else {
                indexCurrentImage += 1;
            }
            modalImage.src = galleryRef[indexCurrentImage].original;
            break;
        case 'ArrowLeft':
            if (indexCurrentImage === 0) {
                indexCurrentImage = galleryRef.length - 1;
            } else {
                indexCurrentImage -= 1;
            }
            modalImage.src = galleryRef[indexCurrentImage].original;
            break;
    }
}

galleryCreator();
galleryRef.addEventListener("click", handleOpenModal);
