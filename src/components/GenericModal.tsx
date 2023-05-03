// eslint-disable-next-line no-restricted-imports
import { Backdrop, Dialog } from '@mui/material'
import isEqual from 'fast-deep-equal'
import React from 'react'
import Spacings from '../tokens/Spacings'

const GenericModal = ({ open, onClose, children, ...props }) => (
  <Dialog
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    disablePortal
    BackdropProps={{
      timeout: 500
    }}
    sx={{ marginTop: Spacings.huge }}
    {...props}
  >
    {children}
  </Dialog>
)

export default React.memo(GenericModal, isEqual)
