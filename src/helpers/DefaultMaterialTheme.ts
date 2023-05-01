import { createTheme } from '@mui/material/styles'
import BorderRadius from '../tokens/BorderRadius'
import Colors from '../tokens/Colors'
import Shadows from '../tokens/Shadows'
import Spacings from '../tokens/Spacings'

const DefaultMaterialTheme = () =>
  createTheme({
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            paddingTop: 0,
            paddingBottom: 0
          }
        }
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '.MuiOutlinedInput-root': {
              '.MuiAutocomplete-input': {
                padding: 0,
                paddingLeft: 6
              }
            }
          }
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.MuiIconButton-root': {
              padding: 0
            },
            '&.MuiIconButton-edgeEnd': {
              margin: 0
            },
            '&.MuiCheckbox-root': {
              color: '#1A4482'
            },
            '&.Mui-checked': {
              color: '#1A4482 !important'
            }
          }
        },
        defaultProps: { disableRipple: true }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            minHeight: '48px'
            // maxHeight: '48px'
          }
        }
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            gap: '8px'
          }
        }
      },
      MuiIconButton: { styleOverrides: { root: { padding: 0 } } },
      MuiButton: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            minHeight: 48,
            borderRadius: BorderRadius.soft,
            borderColor: Colors.lightGray,
            '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
              borderColor: Colors.lightGray
            }
          },
          input: {
            borderRadius: BorderRadius.soft,
            padding: '12.5px'
          },
          inputMultiline: {
            borderRadius: 'initial'
          },
          adornedEnd: {
            paddingRight: 0
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: 48
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            color: Colors.darkSilver,
            top: '-3px',
            '&$focused': {
              top: 0
            }
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: Colors.hardGray,
            fontSize: Spacings.tiny,
            backgroundColor: Colors.baseWhite,
            borderRadius: BorderRadius.soft,
            boxShadow: Shadows.regularMed,
            padding: Spacings.min,
            fontFamily: '@fontsource/manrope'
          }
        }
      },
      MuiLinearProgress: {
        styleOverrides: {
          bar: {
            backgroundColor: Colors.baseGreen
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: Colors.baseGreen,
            height: 3,
            minWidth: 120
          },
          flexContainer: {
            borderBottom: `1px solid ${Colors.lightGray}`
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            width: 120,
            '@media (min-width: 0px)': {
              minWidth: 120
            },
            textTransform: 'none',
            '&:hover': {
              color: Colors.baseGreen
            }
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          colorSecondary: {
            color: Colors.baseGreen,
            '&$checked': {
              color: Colors.baseGreen
            },
            '&$hover': {
              color: Colors.baseGreen
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '&.MuiMenu-paper': {
              '&.MuiPopover-paper': {
                '&.MuiPaper-elevation8': {
                  boxShadow: Shadows.regular
                }
              }
            }
          }
        }
      }
    }
  })
export default DefaultMaterialTheme()
