import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCredentials } from '../../types/auth';
import {
  Card,
  Container,
  FormGroup,
  Input,
  Label,
  ShowErrorMessage,
  SubmitButton,
  Title
} from './Login.styles';

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
  const [ globalError, setGlobalError ] = useState("");
  const navigate = useNavigate();
  
  const handleLoginSubmit = async (
    values: LoginCredentials,
    { setSubmitting }: FormikHelpers<LoginCredentials>
  ) => {
    const trimmedUsername = values.username.trim();
    const trimmedPassword = values.password.trim();

    try{
      await login({
        username: trimmedUsername,
        password: trimmedPassword
      });
      navigate("/dashboard");
    }catch(error){
      setGlobalError("Não foi possível realizar o login, verifique suas credenciais e tente novamente.")
      console.error("Erro ao logar ", error);
    }
    
    setSubmitting(false);
  };

  return (
    <Container>
      <Card>
        <Title>Entrar</Title>

        {
          !!globalError ? <ShowErrorMessage>{ globalError }</ShowErrorMessage> : <></>
        }

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLoginSubmit}
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