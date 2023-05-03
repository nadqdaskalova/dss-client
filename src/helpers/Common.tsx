export const generateUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line eqeqeq
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
