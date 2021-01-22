import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

const PhotoGallery = ({images, className}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className={className} onClick={() => setIsOpen(true)}>
        Open gallery
      </button>
      <ReactBnbGallery
        show={isOpen}
        photos={images}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default PhotoGallery;