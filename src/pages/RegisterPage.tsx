import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import * as Yup from 'yup'
import GenericText from '../components/GenericText'
import { TextFieldController } from '../components/HookFormComponents'
import ProjectLayout from '../components/ProjectLayout'
import StyledBox from '../components/StyledBox'
import routePaths from '../config/RoutePaths'
import { register } from '../helpers/ApiHandler'
import Colors from '../tokens/Colors'
import Spacings from '../tokens/Spacings'

interface RegisterForm {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const navigate = useNavigate()

  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      password: ''
    }),
    []
  )

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
  })

  const { handleSubmit, trigger, control, watch } = useForm<RegisterForm>({
    defaultValues,
    shouldUnregister: false,
    resolver: yupResolver(validationSchema)
  })

  const handleRegisterButton = (data: RegisterForm) => {
    register(data)
      .then((data) => {
        navigate(routePaths.login)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <ProjectLayout>
      <StyledBox align="center" justify="center" gap={Spacings.tiny}>
        <TextFieldController control={control} name="name" placeholder={'Name'} />
        <TextFieldController control={control} name="email" placeholder={'Email'} type="email" />
        <TextFieldController control={control} name="password" type="password" placeholder={'Password'} />
      </StyledBox>
      <Button
        fullWidth
        radius="soft"
        shadow="regular"
        alignText="center"
        spacing={Spacings.tiny}
        top
        bottom
        left={Spacings.medium}
        right={Spacings.medium}
        pointer
        transition
        onClick={handleSubmit((data) => handleRegisterButton(data))}
        align="center"
        justify="center"
      >
        <GenericText uppercase weight="500" fontSize={Spacings.medium} color={Colors.baseWhite} alignText="center">
          {'Register'}
        </GenericText>
      </Button>
    </ProjectLayout>
  )
}

export default RegisterPage

const Button = styled(StyledBox)`
  border: 2px solid transparent;
  background: ${Colors.linearMainColor} padding-box, ${Colors.linearMainColor} border-box;
  &:hover {
    transform: scale(1.05);
  }
`
