import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../contexts/PostContext';
import { Post, PostRequest } from '../../types/post';
import {
  BackButton,
  CharCount,
  Container,
  ErrorText,
  FieldFooter,
  FormGroup,
  FormHeader,
  SubmitButton,
} from './CreateOrEditPost.styles';
import { LoadingMessage } from '../Dashboard/Dashboard.styles';

interface PostFormValues {
  title: string;
  description: string;
  content: string;
}

interface CreateOrEditProps{
  isEditing:boolean;
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

export const CreateOrEditPost: React.FC<CreateOrEditProps> = ({ isEditing }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { createPost, updatePost, getPostById, isLoading } = usePosts();
  const { user } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<PostFormValues>({
      title: '',
      description: '',
      content: '',
  });

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

  const handleSubmitEditing = async (
    values: PostFormValues,
    { setSubmitting }: FormikHelpers<PostFormValues>
  ) => {
    try {
      setServerError(null);
      if (!id) return;

      const updatedData = {
        title: values.title,
        description: values.description,
        body: values.content,
      };

      await updatePost(updatedData, Number(id));
      navigate('/admin/posts');
    } catch (error) {
      setServerError('Não foi possível atualizar a postagem. Tente novamente.');
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      getPostById(Number(id)).then((post:Post) =>{
        setInitialValues({
          title: post.title || '',
          description: post.description || '',
          content: post.body || '',
        });
      }).catch(() =>{
        setServerError('Postagem não encontrada.');
      })
    }
  }, [id]);

  if (isLoading) {
      return (
        <Container>
          <LoadingMessage>Carregando dados da postagem...</LoadingMessage>
        </Container>
      );
    }

  return (
    <Container>
      <BackButton onClick={() => navigate('/admin/posts')}>← Voltar ao Painel</BackButton>

      <FormHeader>
        <h1>{!isEditing ? 'Criar Nova Postagem' : 'Editar Postagem'}</h1>
        <p>{!isEditing ? 
          'Preencha os campos abaixo para publicar um novo artigo no blog acadêmico': 
          'Atualize os campos abaixo para modificar o artigo no blog acadêmico'  
        }.</p>
      </FormHeader>

      {serverError && (
        <ErrorText style={{ marginBottom: '1.5rem', display: 'block' }}>
          {serverError}
        </ErrorText>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={!isEditing ? handleSubmit : handleSubmitEditing}
        enableReinitialize={true}
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
              {isSubmitting ? 'Salvando...' :  (isEditing ? 'Atualizar Postagem' : 'Publicar Postagem')}
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};