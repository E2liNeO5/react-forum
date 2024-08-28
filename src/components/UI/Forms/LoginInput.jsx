import styles from './Forms.module.scss'

export function LoginInput({ register, error }) {
  const maxLength = 20
  
  return (
    <>
      <input
        type='text'
        placeholder='Логин'
        {...register('login', {
          required: 'Заполните поле',
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Поле может содержать только латинские буквы и нижние подчёркивания'
          },
          maxLength: {
            value: maxLength,
            message: `Количество символов не должно превышать ${maxLength}`
          }
        })}
      />
      { error && <span className={styles.input_error}>{error.message}</span> }
    </>
  )
}