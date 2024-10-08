import { ButtonLoad } from './Button.styled';

export const Button = ({ onLoadMore }) => (
  <ButtonLoad
    type="button"
    onClick={() => {
      onLoadMore();
    }}
  >
    Load more
  </ButtonLoad>
);
