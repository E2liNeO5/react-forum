import styles from './Forms.module.scss'

export function PasswordInput({ register, error }) {
  return (
    <>
      <input
          type='password'
          placeholder='Пароль'
          {...register('password', {
            required: 'Заполните это поле'
          })}
        />
        { error && <span className={styles.input_error}>{error.message}</span> }
    </>
  )
}