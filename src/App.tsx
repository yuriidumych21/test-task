import { useState } from 'react';
import './App.css';
import { Step, PexelsPhoto, setImageProps, ImgCard } from './interfaces';
import Choise from './components/Choise/Choise';
import Form from './components/Form/Form';
import Result from './components/Result/Result';

function App() {
  const [step, setStep] = useState<Step>(Step.Search);
  const [images, setImages] = useState<PexelsPhoto[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [form, setForm] = useState<ImgCard>({ name: '', surname: '' });

  const onImagesReturned = ({ photos, ...data }: setImageProps) => {
    setImages(photos);
    setForm(data);
    setStep(Step.Choise);
  };

  const onAccept = (index: number) => {
    setSelected(index);
    setStep(Step.Result);
  };

  const openForm = () => setStep(Step.Search);

  const getComponent = () => {
    switch (step) {
      case Step.Result:
        return <Result name={form.name} surname={form.surname} image={images[selected]} />;
      case Step.Choise:
        return <Choise images={images} openForm={openForm} onAccept={onAccept} />;
      case Step.Search:
      default:
        return <Form setImages={onImagesReturned} />;
    }
  };

  return (
    <div className='App'>
      <div className='container main-component'>{getComponent()}</div>
    </div>
  );
}

export default App;
