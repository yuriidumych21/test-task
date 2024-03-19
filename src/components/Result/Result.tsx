import { useContext } from 'react';
import { Context } from '../../context';

const Result = () => {
  const { name, surname, selected } = useContext(Context) || {};
  return (
    <div className='card'>
      <img className='card-img-top' src={selected?.src?.medium} alt='Selected img' />
      <div className='card-body'>
        <p className='card-text'>
          {name} {surname}
        </p>
      </div>
    </div>
  );
};

export default Result;
