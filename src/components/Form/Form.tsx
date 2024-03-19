import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { getImages } from '../../api';
import { Context } from '../../context';
import { CHOISE } from '../../contants';

export const schema = yup
  .object({
    name: yup.string().trim().max(20, 'Must be not more then 20 characters').required('Required'),
    surname: yup.string().trim().max(20, 'Must be not more then 20 characters').required('Required'),
    topic: yup.string().required('Required'),
    customTopic: yup.string().when('topic', ([topic], schema) => {
      if (topic === 'Other') return schema.required('Required');
      return schema;
    })
  })
  .required();

const FormComp = () => {
  const { setImages } = useContext(Context) || {};
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { topic, customTopic, name, surname } = watch();

  const onSubmit = async () => {
    setLoading(true);
    const param = topic === 'Other' && customTopic ? customTopic : topic;
    const { photos } = await getImages(param);
    setImages?.({ photos, name, surname });
    navigate(CHOISE);
    setLoading(false);
  };

  return loading ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : (
    <Form className='d-flex align-items-start' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='mx-1'>
        <Form.Control placeholder='Name' aria-label='Name' aria-describedby='basic-addon1' {...register('name')} />
        {errors.name && <p className='text-danger'>{errors.name?.message}</p>}
      </Form.Group>
      <Form.Group className='mx-1'>
        <Form.Control
          placeholder='Surname'
          aria-label='Surname'
          aria-describedby='basic-addon1'
          {...register('surname')}
        />
        {errors.surname && <p className='text-danger'>{errors.surname?.message}</p>}
      </Form.Group>
      <Form.Group className='mx-1'>
        <Form.Select aria-label='Topic select' {...register('topic')} defaultValue=''>
          <option value=''>Topic</option>
          <option value='Travel'>Travel</option>
          <option value='Cars'>Cars</option>
          <option value='Wildlife'>Wildlife</option>
          <option value='Technology'>Technology</option>
          <option value='Other'>Other</option>
        </Form.Select>
        {errors.topic && <p className='text-danger'>{errors.topic?.message}</p>}
      </Form.Group>

      {topic === 'Other' && (
        <Form.Group className='mx-1'>
          <Form.Control
            placeholder='Enter your topic'
            aria-label='Custom topic'
            aria-describedby='basic-addon1'
            {...register('customTopic')}
          />
          {errors.customTopic && <p className='text-danger'>{errors.customTopic?.message}</p>}
        </Form.Group>
      )}

      <Button className='mx-1' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default FormComp;
