import { ResultProps } from '../../interfaces';

const Result = ({ name, surname, image }: ResultProps) => (
  <div className='card'>
    <img className='card-img-top' src={image.src.medium} alt='Selected img' />
    <div className='card-body'>
      <p className='card-text'>
        {name} {surname}
      </p>
    </div>
  </div>
);

export default Result;
