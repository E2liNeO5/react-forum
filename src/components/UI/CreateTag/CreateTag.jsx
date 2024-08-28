import { Triangle, X } from 'lucide-react'
import styles from './CreateTag.module.scss'
import taglist_styles from '../TagList/TagList.module.scss'
import form_styles from '../Forms/Forms.module.scss'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateTag } from '../../../hooks/useCreateTag'
import { useQuery } from '@tanstack/react-query'
import { AdminTag } from '../AdminTag/AdminTag'
import { tagListService } from '../../../services/taglist.service'

export function CreateTag() {
  const tag_data = useQuery({
    queryKey: ['admin tags'],
    queryFn: () => tagListService.getTags(),
  })

  const [isShow, setIsShow] = useState(false)
  const [search, setSearch] = useState('')

  const {register, formState: { errors }, handleSubmit, reset} = useForm({mode: 'onChange'})
  const {mutate} = useCreateTag(reset)

  return (
    <div>
      <div className={styles.toggle} onClick={() => setIsShow(prev => !prev)}>
        Настройка тэгов
        <Triangle
          color="#d80101"
          size={10}
          fill='#d80101'
          className={`${styles.toggle_sign} ${isShow ? styles.show : ''}`}
        />
      </div>

      <div className={`${styles.container} ${isShow ? styles.show : ''}`}>
        <div>
          <form onSubmit={handleSubmit(mutate)} className={`${form_styles.form} ${styles.form}`}>
            <input
              type="text"
              placeholder='Название'
              {...register('name', {
                required: 'Заполните это поле'
              })}
            />
            { errors.name && <span className={form_styles.input_error}>{errors.name.message}</span> }

            <button>Добавить</button>
          </form>
          <div className={taglist_styles.search_container} style={{ marginTop: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              className={taglist_styles.search}
              placeholder="Поиск"
              value={search}
              onChange={e => setSearch(e.target.value.toLowerCase())}
              style={{ marginLeft: 0 }}
            />
            { search.length > 0 && <X className={taglist_styles.search_reset} onClick={() => setSearch('')} /> }
          </div>
          <div className={styles.tags_container}>
            { !tag_data.isLoading && !tag_data.isError && tag_data.data
                .filter(tag => tag.name.toLowerCase().includes(search))
                .map(tag => {
                  return (
                    <AdminTag key={tag.id} tag={tag} />
                  )
            }) }
          </div>
        </div>
      </div>
    </div>
  )
}