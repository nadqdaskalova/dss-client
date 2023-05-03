import React, { useMemo } from 'react'
import styled from 'styled-components'
import { getEmojiData } from '../helpers/emojiData'
import Colors from '../tokens/Colors'
import Spacings from '../tokens/Spacings'
import GenericText from './GenericText'
import StyledBox from './StyledBox'

const EmojiPicker: React.FC<any> = ({ onEmojiClick }) => {
  const emojiData = useMemo(() => getEmojiData(), [])
  return (
    <EmojiContainer fullPadding spacing={Spacings.tiny}>
      {!!emojiData &&
        emojiData.map((category: any) => (
          <StyledBox direction="row" flexWrap="wrap" justify="center" key={category.name}>
            <EmojiCategoryTitle left={Spacings.min}>
              <GenericText letterSpacing="1px" fontSize={Spacings.tiny} weight="300" color={Colors.baseGray}>
                {category.name}
              </GenericText>
            </EmojiCategoryTitle>
            {category.emojis.map((emoji: any) => (
              <Emoji key={emoji} onClick={() => onEmojiClick(emoji)} pointer fontSize={Spacings.large}>
                {emoji}
              </Emoji>
            ))}
          </StyledBox>
        ))}
    </EmojiContainer>
  )
}

export default React.memo(EmojiPicker)

const EmojiContainer = styled(StyledBox)`
  overflow: auto;
  width: 100%;
  max-height: 200px;
  margin-top: ${Spacings.min};
  box-sizing: border-box;
`

const EmojiCategoryTitle = styled(StyledBox)`
  min-width: 100%;
  margin: ${Spacings.minimum};
`

const Emoji = styled(GenericText)`
  margin: ${Spacings.minimum};
  width: ${Spacings.large};
  transition: transform 60ms ease-out;
  &:hover {
    transform: scale(1.4);
  }
`
