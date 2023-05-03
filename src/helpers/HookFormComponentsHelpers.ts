import { DeepRequired, FieldErrorsImpl } from 'react-hook-form'

export const resolvePath = <T>(object: FieldErrorsImpl<DeepRequired<T>>, path: string, defaultValue: string) =>
  path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object)
