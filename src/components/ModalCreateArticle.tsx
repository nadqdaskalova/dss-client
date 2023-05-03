/* eslint-disable no-restricted-imports */
import { yupResolver } from '@hookform/resolvers/yup'
import { Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import isEqual from 'fast-deep-equal'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import routePaths from 'src/config/RoutePaths'
import Colors from 'src/tokens/Colors'
import Shadows from 'src/tokens/Shadows'
import Spacings from 'src/tokens/Spacings'
import styled from 'styled-components'
import * as Yup from 'yup'
import { createArticle } from '../helpers/ApiHandler'
import BorderRadius from '../tokens/BorderRadius'
import { TextFieldController } from './HookFormComponents'
import StyledBox from './StyledBox'

interface IModalDemoBoard {
  closeModal: () => void
}

interface ICreateArticleValues {
  title: string
  image: string
  description: string
}

const ModalCreateArticle: React.FC<IModalDemoBoard> = ({ closeModal }) => {
  const navigate = useNavigate()

  const defaultValues = useMemo(
    () => ({
      title: '',
      image: '',
      description: ''
    }),
    []
  )

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string().required('Required'),
        image: Yup.string().required('Required'),
        description: Yup.string().required('Required')
      }),
    []
  )

  const { handleSubmit, control } = useForm<ICreateArticleValues>({
    defaultValues,
    shouldUnregister: true,
    resolver: yupResolver(validationSchema)
  })

  const handleCreateDemo = (data: ICreateArticleValues) => {
    createArticle(data)
      .then((data) => {
        navigate(`${routePaths.article}/${data.id}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <DemoBoardModalWrapper
      fullWidth
      align="center"
      justify="center"
      spacing={Spacings.min}
      fullPadding
      position="relative"
    >
      <StyledBox fullPadding spacing={Spacings.large} fullWidth gap={Spacings.tiny}>
        <TextFieldController control={control} name="title" placeholder={'Title'} />
        <TextFieldController control={control} name="image" placeholder={'Image'} />
        <TextFieldController control={control} name="description" placeholder={'Description'} />
        <StyledButton onClick={handleSubmit((data) => handleCreateDemo({ ...defaultValues, ...data }))}>
          {'Add article'}
        </StyledButton>
      </StyledBox>
      <CloseButton position="absolute" onClick={closeModal} pointer radius="rounded" transition>
        <Close />
      </CloseButton>
    </DemoBoardModalWrapper>
  )
}

export default React.memo(ModalCreateArticle, isEqual)

const DemoBoardModalWrapper = styled(StyledBox)`
  min-width: 400px;
`

const CloseButton = styled(StyledBox)`
  top: ${Spacings.min};
  right: ${Spacings.min};

  &:hover {
    box-shadow: ${Shadows.regular};
    color: ${Colors.baseRed};
  }
`

const StyledButton = styled(Button)`
  &&& {
    border-radius: ${BorderRadius.rounded};
    padding: ${Spacings.tiny};
    box-shadow: ${Shadows.regularMed};
    background-image: ${Colors.linearMainColor};
    color: ${Colors.snow};
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    transform: scale(1.05);
  }
`
