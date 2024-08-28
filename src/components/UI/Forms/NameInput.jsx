import styles from './Forms.module.scss'

export function NameInput({ register, error }) {
  const maxLength = 20

  return (
    <>
      <input
        type='text'
        placeholder='Имя пользователя'
        {...register('name', {
          required: 'Заполните поле',
          pattern: {
            value: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
            message: 'Поле может содержать только кириллицу и пробелы'
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