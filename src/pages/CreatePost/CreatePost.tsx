import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../contexts/PostContext';
import { PostRequest } from '../../types/post';
import {
  BackButton,
  CharCount,
  Container,
  ErrorText,
  FieldFooter,
  FormGroup,
  FormHeader,
  SubmitButton,
} from './CreatePost.styles';

interface PostFormValues {
  title: string;
  description: string;
  content: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required('O título é obrigatório.')
    .max(255, 'O título deve ter no máximo 255 caracteres.'),
  description: Yup.string()
    .required('A descrição é obrigatória.')
    .max(255, 'A descrição deve ter no máximo 255 caracteres.'),
  content: Yup.string()
    .required('O corpo do blog é obrigatório.')
    .max(10000, 'O conteúdo deve ter no máximo 10000 caracteres.'),
});

export const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { createPost } = usePosts();
  const { user } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (
    values: PostFormValues,
    { setSubmitting }: FormikHelpers<PostFormValues>
  ) => {
    try {
      setServerError(null);
      
      if (!user) {
        setServerError("Não foi possível identificar o autor da publicação.");
        setSubmitting(false);
        return;
      }
        
      const postRequest: PostRequest = { 
        body: values.content, 
        description: values.description,
        title: values.title 
      };
      
      await createPost(postRequest);
      navigate('/admin/posts');
    } catch (error) {
      setServerError('Não foi possível salvar a postagem. Tente novamente.');
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate('/admin/posts')}>← Voltar ao Painel</BackButton>

      <FormHeader>
        <h1>Criar Nova Postagem</h1>
        <p>Preencha os campos abaixo para publicar um novo artigo no blog acadêmico.</p>
      </FormHeader>

      {serverError && (
        <ErrorText style={{ marginBottom: '1.5rem', display: 'block' }}>
          {serverError}
        </ErrorText>
      )}

      <Formik
        initialValues={{ title: '', description: '', content: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <FormGroup>
              <label htmlFor="title">Título</label>
              <Field
                id="title"
                name="title"
                type="text"
                placeholder="Digite o título da postagem..."
              />
              <FieldFooter>
                <ErrorMessage name="title" component={ErrorText} />
                <CharCount $isLimitExceeded={values.title.length > 255}>
                  {values.title.length}/255
                </CharCount>
              </FieldFooter>
            </FormGroup>

            <FormGroup>
              <label htmlFor="description">Descrição</label>
              <Field
                id="description"
                name="description"
                type="text"
                placeholder="Digite um resumo ou descrição breve..."
              />
              <FieldFooter>
                <ErrorMessage name="description" component={ErrorText} />
                <CharCount $isLimitExceeded={values.description.length > 255}>
                  {values.description.length}/255
                </CharCount>
              </FieldFooter>
            </FormGroup>

            <FormGroup>
              <label htmlFor="content">Corpo do Blog</label>
              <Field
                as="textarea"
                id="content"
                name="content"
                placeholder="Escreva o conteúdo completo do artigo acadêmico..."
              />
              <FieldFooter>
                <ErrorMessage name="content" component={ErrorText} />
                <CharCount $isLimitExceeded={values.content.length > 10000}>
                  {values.content.length}/10000
                </CharCount>
              </FieldFooter>
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Publicar Postagem'}
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};