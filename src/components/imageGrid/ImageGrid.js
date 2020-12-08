import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

const ImageGrid = ({images}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
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

export default ImageGrid;