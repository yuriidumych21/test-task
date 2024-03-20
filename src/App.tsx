import { useState } from 'react';
import './App.css';
import { PexelsPhoto, setImageProps, ImgCard } from './interfaces';
import Choise from './components/Choise/Choise';
import Form from './components/Form/Form';
import Result from './components/Result/Result';
import NotFound from './components/NotFound/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context } from './context';
import { SEARCH, CHOISE, RESULTS } from './contants';

function App() {
  const [images, setImages] = useState<PexelsPhoto[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [form, setForm] = useState<ImgCard>({ name: '', surname: '' });

  const onImagesReturned = ({ photos, ...data }: setImageProps) => {
    setImages(photos);
    setForm(data); // save name and surname to context
  };

  const onAccept = (index: number) => setSelected(index);

  return (
    <Context.Provider
      value={{
        images,
        selected: images[selected],
        setImages: onImagesReturned,
        onAccept,
        name: form.name,
        surname: form.surname
      }}
    >
      <div className='App'>
        <div className='container main-component'>
          <BrowserRouter>
            <Routes>
              <Route path={CHOISE} element={<Choise />} />
              <Route path={RESULTS} element={<Result />} />
              <Route path={SEARCH} element={<Form />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
