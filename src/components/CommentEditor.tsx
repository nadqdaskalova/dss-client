import EmojiEmotions from '@mui/icons-material/EmojiEmotions'
import Reply from '@mui/icons-material/Reply'
import { Avatar, ClickAwayListener } from '@mui/material'
import Popper from '@mui/material/Popper'
import React, { useRef, useState } from 'react'
import BorderRadius from 'src/tokens/BorderRadius'
import Colors from 'src/tokens/Colors'
import Shadows from 'src/tokens/Shadows'
import Spacings from 'src/tokens/Spacings'
import styled from 'styled-components'
import { createComment } from '../helpers/ApiHandler'
import EmojiPicker from './EmojiPicker'
import StyledBox from './StyledBox'

interface ICommentEditor {
  articleId: string
  setComments: React.Dispatch<React.SetStateAction<any[]>>
}

const CommentEditor: React.FC<ICommentEditor> = ({ articleId, setComments }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const desc = useRef<any>()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()

    const newComment = {
      description: desc.current.value
    }

    createComment(articleId, newComment).then((data: any) => {
      setComments((prev) => [...prev, { ...data }])
      desc.current.value = ''
    })
  }

  const addEmoji = (emoji: any) => {
    desc.current.value = desc.current.value + emoji
  }

  return (
    <StyledBox fullWidth direction="row" gap={Spacings.tiny} align="flex-start">
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <CommentArea
        fullWidth
        radius="soft"
        direction="row"
        align="center"
        justify="center"
        position="relative"
        shadow="regularMin"
        transition
      >
        <CommentContent ref={desc} placeholder="Write a comment..." />
        <StyledBox direction="row" align="center" justify="flex-end" gap={Spacings.min} right={Spacings.min}>
          <CommentControl pointer spacing={Spacings.minimum} fullPadding radius="rounded" onClick={handleClick}>
            <EmojiEmotions style={{ fontSize: '20px' }} />
          </CommentControl>
          <CommentControl
            spacing={Spacings.minimum}
            fullPadding
            radius="rounded"
            pointer
            onClick={(e: any) => submitHandler(e)}
          >
            <Reply
              style={{
                fontSize: '20px',
                transform: 'rotateY(180deg)'
              }}
            />
          </CommentControl>
        </StyledBox>
        <EmojiContainer open={Boolean(anchorEl)} anchorEl={anchorEl}>
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <StyledBox>
              <EmojiPicker onEmojiClick={addEmoji} />
            </StyledBox>
          </ClickAwayListener>
        </EmojiContainer>
      </CommentArea>
    </StyledBox>
  )
}

export default React.memo(CommentEditor)

const CommentArea = styled(StyledBox)`
  overflow: hidden;
  background-color: ${Colors.snow};
  border: 1px solid ${Colors.lightSilver};

  &:hover {
    box-shadow: ${Shadows.regular};
  }
`

const CommentContent = styled.textarea<{ isGray?: boolean }>`
  background-color: ${Colors.snow};
  width: 100%;
  min-height: ${Spacings.small};
  max-height: ${Spacings.huge};
  display: flex;
  resize: none;
  padding: ${Spacings.min} ${Spacings.tiny};
  border: none;
`

const CommentControl = styled(StyledBox)`
  color: ${Colors.silver};
  background-color: ${Colors.snow};

  &:hover {
    color: ${Colors.mainColor};
    box-shadow: ${Shadows.regular};
  }
`
const EmojiContainer = styled(Popper)`
  &&& {
    width: 190px;
    height: 220px;
    flex-basis: 190px;
    flex-shrink: 0;
    flex-grow: 1;
    background-color: ${Colors.baseWhite};
    border: 1px solid ${Colors.lightSilver};
    cursor: pointer;
    border-radius: ${BorderRadius.soft};
    box-shadow: ${Shadows.regular};
  }
`
