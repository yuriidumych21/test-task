import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ChoiseProps } from '../../interfaces';

const Choise = ({ images, openForm, onAccept }: ChoiseProps) => {
  const [index, setIndex] = useState(0);

  const onReject = () => {
    if (index === 4) openForm();
    else setIndex((prev) => prev + 1);
  };

  const onClickAccept = () => onAccept(index);

  return (
    <div>
      <Button className='mx-2' onClick={onReject}>
        Reject
      </Button>

      <img alt='img' src={images[index].src.medium} />

      <Button className='mx-2' onClick={onClickAccept}>
        Accept
      </Button>
    </div>
  );
};

export default Choise;
