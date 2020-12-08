import React from "react";
import ImageUploading from "react-images-uploading";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RoundToolTip from '../buttons/roundToolTip'
import './singleImageUploader.css'

const ImageUploader = ({id}) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
        }) => (

          <div className="upload__image-wrapper" id={id}>
            {images.length < 1 
                ? <div>
                    <AccountCircleIcon style={{ fontSize: 250 }} color="" />
                    <RoundToolTip className="initialButton" color="primary" icon={<AddIcon />} toolText="Upload profile picture" onClick={() => onImageUpload()}/> 
                </div>

                : <div className="image-item">
                    <img src={images[0].data_url} alt="profilePic" className="profile-upload-image"/>
                    <div className="image-item__btn-wrapper">
                        <RoundToolTip className="firstButton" color="primary" icon={<AddIcon />} toolText="Update" onClick={() => onImageUpdate(0)}/>
                        <RoundToolTip className="secondButton" color="" icon={<DeleteIcon />} toolText="Delete" onClick={() => onImageRemove(0)}/>
                    </div>
                </div>
            }
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageUploader;