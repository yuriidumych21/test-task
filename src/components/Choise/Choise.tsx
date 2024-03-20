import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SEARCH, RESULTS } from '../../contants';
import { Context } from '../../context';

const Choise = () => {
  const navigate = useNavigate();
  const { images, onAccept } = useContext(Context) || {};
  const [index, setIndex] = useState(0);

  const onReject = () => {
    if (!images?.[index + 1]) navigate(SEARCH); //if no images are left - start from the beginning
    else setIndex((prev) => prev + 1);
  };

  const onClickAccept = () => {
    onAccept?.(index);
    //redirect user to the last step
    navigate(RESULTS);
  };

  return (
    <div>
      <Button className='mx-2' onClick={onReject}>
        Reject
      </Button>

      <img alt='img' src={images?.[index].src.medium} />

      <Button className='mx-2' onClick={onClickAccept}>
        Accept
      </Button>
    </div>
  );
};

export default Choise;
