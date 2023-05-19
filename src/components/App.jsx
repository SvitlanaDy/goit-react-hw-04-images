import React, { useState, useEffect } from 'react';
import Modal from 'components/modal/Modal';
import SearchBar from 'components/searchbar/SearchBar';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import ImageGallery from 'components/imageGallery/ImageGallery';
import { getImages } from 'fetch/fetch';
import css from '../components/App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowLoadmore, setIsShowLoadmore] = useState(false);

  useEffect(() => {
    const fetchImages = () => {
      setStatus('pending');
      getImages(searchQuery, page)
        .then((response) => {
          setImages((prevImages) => [...prevImages, ...response.hits]);
          setIsShowLoadmore(page < Math.ceil(response.totalHits / 12));
          setStatus('resolved');
        })
        .catch((error) => {
          console.error(error);
          setStatus('rejected');
        });
    };

    if (searchQuery === '' ) {
      return;
    }
      fetchImages();
    
  }, [searchQuery, page]);

  

  const createSearchQuery = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setStatus('pending');
  };

  const toggleModal = () => {
    setIsShowModal((prevIsShowModal) => !prevIsShowModal);
  };

  const onSelectImage = (largeImageURL) => {
    setSelectedImage(largeImageURL);
    setIsShowModal(true);
  };

  const handleLoadmore = () => {
    setPage((prevPage) => prevPage + 1);
  };


  
  const imageGallery = images.length > 0 ? (
    <>
      <ImageGallery images={images} onSelect={onSelectImage} />
      {isShowLoadmore && <Button onClick={handleLoadmore}>Load More</Button>}
    </>
  ) : (
    <h1 className={css.appHeader}> Nothing is here, please enter something else</h1>
  );
  
  return (
    <div>
      <SearchBar onSubmit={createSearchQuery} />
      {status === 'pending' && <Loader />}
      {imageGallery}
      {isShowModal && <Modal onClose={toggleModal} selectedImage={selectedImage} />}
    </div>
  );
  
  }
export default App;
