import styles from './Forms.module.scss'
import '../../../styles.scss'
import { useForm } from 'react-hook-form'
import { useLogin } from '../../../hooks/useLogin'
import { Link } from 'react-router-dom'
import { LoginInput } from './LoginInput'
import { PasswordInput } from './PasswordInput'
import { Hint } from '../Hint/Hint'

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })

  const { mutate, error, isError, reset } = useLogin()

  return (
    <div className='container'>
      <form
        className={styles.form}
        onSubmit={handleSubmit(mutate)}
      >
        <h1>Войти</h1>
        <LoginInput register={register} error={errors.login} />
        <PasswordInput register={register} error={errors.password} />
        <button>Войти</button>
        <Link 
          className={styles.hint}
          to='/register'
        >Нет профиля? Создайте его</Link>

        { isError && 
          <Hint
            text={error.message}
            type='error'
            onClose={reset}
          />
        }
      </form>
    </div>
  )
}