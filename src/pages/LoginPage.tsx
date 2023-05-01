import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import routePaths from 'src/config/RoutePaths'
import styled from 'styled-components'
import * as Yup from 'yup'
import { defaultUser, useAppState } from '../components/AuthProvider'
import GenericText from '../components/GenericText'
import { TextFieldController } from '../components/HookFormComponents'
import ProjectLayout from '../components/ProjectLayout'
import StyledBox from '../components/StyledBox'
import { login } from '../helpers/ApiHandler'
import TokenService from '../helpers/TokenHelper'
import Colors from '../tokens/Colors'
import Spacings from '../tokens/Spacings'

type LoginPageValues = {
  email: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const { state, setState } = useAppState()
  const [isWrongCredentials, setIsWrongCredentials] = useState<boolean>(false)

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: ''
    }),
    []
  )

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Name is Required'),
    password: Yup.string().required('Password is Required')
  })
  const { handleSubmit, control } = useForm<LoginPageValues>({
    defaultValues,
    shouldUnregister: true,
    resolver: yupResolver(validationSchema)
  })

  const handleLoginButton = (loginData: LoginPageValues) => {
    login(loginData)
      .then((user) => {
        if (user.accessToken) {
          TokenService.setUser(user)
        }
        const newState = { ...state, user }
        setState(newState)
        navigate(routePaths.entry)
      })
      .catch(() => {
        setState({ ...state, user: defaultUser })
        setIsWrongCredentials(true)
      })
  }

  return (
    <ProjectLayout>
      <StyledBox align="center" justify="center" gap={Spacings.tiny}>
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
        onClick={handleSubmit((data) => handleLoginButton(data))}
        align="center"
        justify="center"
      >
        <GenericText uppercase weight="500" fontSize={Spacings.medium} color={Colors.baseWhite} alignText="center">
          {'Login'}
        </GenericText>
      </Button>
    </ProjectLayout>
  )
}

export default LoginPage

const Button = styled(StyledBox)`
  border: 2px solid transparent;
  background: ${Colors.linearMainColor} padding-box, ${Colors.linearMainColor} border-box;
  &:hover {
    transform: scale(1.05);
  }
`
