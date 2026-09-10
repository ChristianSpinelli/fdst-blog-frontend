import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import {
    Card,
    Container,
    FormGroup,
    Input,
    Label,
    ShowErrorMessage,
    SubmitButton,
    Subtitle,
    Title
} from './Login.styles';
import { UserRole } from '../../types/auth';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('O username é obrigatório.'),
  password: Yup.string()
    .required('A senha é obrigatória.')
    .min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <Title>Acesso de Usuário</Title>
        <Subtitle>Entre com suas credenciais acessar a aplicação</Subtitle>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            const trimmedUsername = values.username.trim();

            login({
              name: trimmedUsername,
              username: trimmedUsername,
              email: `${trimmedUsername}@techchallenge.com`,
              role: 'aluno' as UserRole,
            });

            setSubmitting(false);
            navigate('/dashboard');
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Field
                  as={Input}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Digite seu username"
                  autoComplete="username"
                />
                <ErrorMessage name="username" component={ShowErrorMessage} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Senha</Label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password" component={ShowErrorMessage} />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};