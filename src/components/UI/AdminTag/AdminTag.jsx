import { Ban, Check, Pencil, X } from 'lucide-react'
import styles from './AdminTag.module.scss'
import { useDeleteTag } from '../../../hooks/useDeleteTag'
import { useModal } from '../../../hooks/useModal'
import { useState } from 'react'
import { useEditTag } from '../../../hooks/useEditTag'

export function AdminTag({tag}) {
  const [isEdit, setIsEdit] = useState(false)
  const [tagname, setTagname] = useState(tag.name)

  const deleteHandle = useDeleteTag()
  const editHandle = useEditTag()

  const showModal = useModal()

  const deleteTag = (id) => {
    showModal({
      ok_btn_click: () => {
        deleteHandle.mutate(id)
      },
      text: 'Вы уверены?',
      ok_btn_text: 'Да',
      cancel_btn_text: 'Нет',
    })
  }

  const editTag = (id, name) => {
    editHandle.mutate({id, name})
    setIsEdit(false)
  }

  const cancelEdit = () => {
    setIsEdit(false)
    setTagname(tag.name)
  }

  return (
    <>
      <div className={styles.tag_item}>
          { isEdit ?
            <input
              className={styles.tag_edit}
              type='text'
              value={tagname}
              onChange={e => setTagname(e.target.value)}
            /> :
            <>{tag.name}</>
          }
        <div className={styles.tag_actions}>
          { isEdit ?
            <>
              <Check
                className={styles.edit}
                size={16}
                onClick={() => editTag(tag.id, tagname)}
              />
              <Ban
                className={styles.delete}
                size={16}
                onClick={cancelEdit}
              />
            </> :
            <>
              <Pencil
                className={styles.edit}
                size={16}
                onClick={() => setIsEdit(true)}
              />
              <X
                className={styles.delete}
                size={16}
                onClick={() => deleteTag(tag.id)}
              />
            </>
          }
        </div>
      </div>
    </>
  )
}