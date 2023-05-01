import Delete from '@mui/icons-material/Delete'
import { Avatar } from '@mui/material'
import React from 'react'
import Colors from 'src/tokens/Colors'
import Spacings from 'src/tokens/Spacings'
import styled from 'styled-components'
import { deleteComment } from '../helpers/ApiHandler'
import { timeago } from '../helpers/timeago'
import { useAppState } from './AuthProvider'
import GenericText from './GenericText'
import StyledBox from './StyledBox'

interface IComment {
  comment: any
}

const Comment: React.FC<IComment> = ({ comment }) => {
  const { state, setState } = useAppState()
  const { user } = comment
  const { name } = user

  const handleDeleteComment = () => {
    deleteComment(comment.id)
      .then((res: any) => {
        window.location.reload()
        return res
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <StyledBox fullWidth direction="row" align="flex-start" bottom={Spacings.tiny} gap={Spacings.tiny}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <StyledBox fullWidth gap={Spacings.minimum}>
        <CommentBody
          gap={Spacings.minimum}
          position="relative"
          fullWidth
          spacing={Spacings.min}
          fullPadding
          radius="soft"
          transition
        >
          <StyledBox fullWidth direction="row" justify="space-between" align="center" left right spacing={Spacings.min}>
            <StyledBox>
              <StyledBox pointer direction={'row'} gap={Spacings.min} align={'center'} justify={'center'}>
                <GenericText>{name}</GenericText>
                <GenericText smallText color={Colors.silver} weight="400">
                  {timeago(comment.createdAt)}
                </GenericText>
              </StyledBox>
            </StyledBox>
            {user?.name === state.user?.name && <Delete onClick={handleDeleteComment} />}
          </StyledBox>
          <StyledBox fullWidth gap={Spacings.min} left right spacing={Spacings.min}>
            <GenericText bottom={Spacings.min} alignText="justify" weight="400">
              {comment.description}
            </GenericText>
          </StyledBox>
        </CommentBody>
      </StyledBox>
    </StyledBox>
  )
}

export default React.memo(Comment)

const CommentBody = styled(StyledBox)<{ defaultColor?: boolean }>`
  background-color: ${Colors.snow};
  border: 1px solid ${Colors.lightSilver};
`
