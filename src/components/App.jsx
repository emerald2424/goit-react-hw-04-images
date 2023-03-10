import { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { getImages } from 'services/getImages';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setIsLoading(true);
    
    getImages(query, page)
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
        if (data.hits.length === 0) {
          return toast.error('Sorry, there is nothing to match your search.');
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('Something went wrong. We could not complete your request');
      })
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const isButtonVisible = () => {
    const pages = Math.ceil(totalImages / 12);
    if (!isLoading && totalImages > 12 && pages > page) {
      return true;
    }
    return false;
  };

  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  return (
    <Layout>
      <Toaster toastOptions={{ duration: 2000, position: 'top-right' }} />
      <Searchbar onSubmit={handleSubmit} query={query}></Searchbar>
      <ImageGallery images={images}></ImageGallery>
      {isLoading && <Loader />}
      {isButtonVisible() && <Button onClick={loadMore} />}
    </Layout>
  );
};
