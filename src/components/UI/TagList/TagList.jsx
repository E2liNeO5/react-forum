import styles from './TagList.module.scss'
import '../../../styles.scss'
import { useState } from "react"
import { Loading } from "../Loading"
import { X } from "lucide-react"

export function TagList({ tags, selectedTags, setSelectedTags, isLoading }) {
  const onClickHandler = (id) => {
    if(selectedTags.includes(id))
      setSelectedTags(prev => prev.filter(tag_id => tag_id !== id))
    else
      setSelectedTags(prev => [...prev, id])
  }

  const [search, setSearch] = useState('')

  return (
    <>
    { isLoading ? <Loading /> : (
      <>
        <ul className={styles.list}>
            <li
              className={selectedTags.length === 0 ? styles.selected : ''}
              onClick={() => setSelectedTags([])}
            >Все</li>
            { tags
                .filter(tag => selectedTags.includes(tag.id) || tag.name.toLowerCase().includes(search))
                .map(tag => {
                  return (
                    <li
                      className={selectedTags.includes(tag.id) ? styles.selected : ''}
                      key={tag.id}
                      onClick={() => onClickHandler(tag.id)}
                    >{tag.name} ({tag.post_amount})</li>
                  )
            }) }
        </ul>
        <div className={styles.search_container}>
          <input
            type="text"
            className={styles.search}
            placeholder="Поиск"
            value={search}
            onChange={e => setSearch(e.target.value.toLowerCase())}
          />
          { search.length > 0 && <X className={styles.search_reset} onClick={() => setSearch('')} /> }
        </div>
      </>
      ) }
    </>
  )
}