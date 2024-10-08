// import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { responseAxios } from 'api';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { CustomModal } from './Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [webformatURL, setWebformatURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!input) {
      return;
    }
    responseAxios(input, page)
      .then(data => {
        if (!data.length) {
          toast.error('No photos found.');
        }
        setImages(prevImages => [...prevImages, ...data]);
      })
      .catch(error => {
        toast.error('No photos found.');
      });
  }, [input, page]);

  const searchInput = e => {
    e.preventDefault();
    setInput(e.target.search.value.toLowerCase().trim());
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = ({ webformatURL, tags }) => {
    setModalIsOpen(prevModal => !prevModal);
    setWebformatURL(webformatURL);
    setTags(tags);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setWebformatURL('');
  };

  return (
    <div>
      <Searchbar search={searchInput} />
      {images.length > 0 && (
        <ImageGallery openModal={openModal} images={images} />
      )}
      {images.length > 0 && <Button onLoadMore={loadMore} />}
      <CustomModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        image={webformatURL}
        tags={tags}
      />
      <Toaster position="top-right" />
    </div>
  );
};
