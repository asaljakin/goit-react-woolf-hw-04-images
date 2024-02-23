import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos, onOpenModal }) => (
  <ul className="ImageGallery">
    {photos.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        setModalImg={onOpenModal}
      />
    ))}
  </ul>
);
