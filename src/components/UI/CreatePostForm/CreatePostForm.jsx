import styles from './CreatePostForm.module.scss'
import { useForm, Controller } from "react-hook-form";
import { useAppContext } from "../../../hooks/useAppContext";
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useCreatePost } from '../../../hooks/useCreatePost';

export function CreatePostForm() {
  const { register, formState: { errors }, handleSubmit, control } = useForm({mode: 'onChange'})
  const {mutate} = useCreatePost()

  const {tags} = useAppContext()
  const [tagOptions, setTagsOptions] = useState([])

  useEffect(() => {
    if(!tags.isLoading && tags.data) {
      setTagsOptions(tags.data.map(tag => {
        return {
          value: tag.id,
          label: tag.name
        }
      }))
    }
  }, [tags.isLoading])

  const maxTitleLength = 24

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(mutate)}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Выберите тэг"
            }
          }}
          name="tags"
          render={({field}) => (
            <>
              <Select
                isMulti
                name="tags"
                options={tagOptions}
                classNamePrefix="custom_select"
                placeholder="Тэги"
                noOptionsMessage={() => "Тэг не найден"}
                onChange={selectedOptions => field.onChange(selectedOptions)}
                value={field.value}
              />
              { errors.tags && <p className={styles.input_error} style={{marginBottom: '1em'}}>{errors.tags.message}</p> }
            </>
          )}
        />

        <div className={styles.form_block}>
          <input
            type="text"
            placeholder='Название'
            { ...register('title', {
              required: 'Заполните поле',
              maxLength: {
                value: maxTitleLength,
                message: `Количество символов не долно превышать ${maxTitleLength}`
              }
            }) }
          />
          { errors.title && <p className={styles.input_error}>{errors.title.message}</p> }
        </div>
        <div className={styles.form_block}>
          <textarea
            placeholder='Текст поста'
            { ...register('text', {
              required: 'Заполните поле'
            }) }
          />
          { errors.text && <p className={styles.input_error}>{errors.text.message}</p> }
        </div>

        <button style={{ marginTop: 0 }}>Создать</button>
      </form>
    </>
  )
}