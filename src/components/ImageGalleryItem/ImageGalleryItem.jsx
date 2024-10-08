import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, tags, id },
  openModal,
}) => {
  return (
    <Item>
      <Img
        src={webformatURL}
        alt={tags}
        onClick={() => openModal({ webformatURL, tags })}
      />
    </Item>
  );
};
