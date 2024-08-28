import styles from './Forms.module.scss'
import '../../../styles.scss'
import { useForm } from 'react-hook-form'
import { useRegister } from '../../../hooks/useRegister'
import { Link } from 'react-router-dom'
import { LoginInput } from './LoginInput'
import { NameInput } from './NameInput'
import { PasswordInput } from './PasswordInput'
import { Hint } from '../Hint/Hint'

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })

  const { mutate, isError, error, reset } = useRegister()

  return (
    <div className='container'>
      <form
        className={styles.form}
        onSubmit={handleSubmit(mutate)}
      >
        <h1>Регистрация</h1>
        <NameInput register={register} error={errors.name} />
        <LoginInput register={register} error={errors.login} />
        <PasswordInput register={register} error={errors.password} />
        <button>Создать</button>
        <Link 
          className={styles.hint}
          to='/login'
        >Уже зарегистрированы? Войдите в профиль</Link>

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