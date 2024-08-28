import styles from './Profile.module.scss'
import '../../../styles.scss'
import { useAppContext } from '../../../hooks/useAppContext'
import { useState } from 'react'
import { Triangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { postsService } from '../../../services/posts.service'
import { DividingLine } from '../DividingLine/DividingLine'
import { CreatePost } from '../CreatePost/CreatePost'
import { ErrorPage } from '../ErrorPage'
import { CreateTag } from '../CreateTag/CreateTag'
import { tagListService } from '../../../services/taglist.service'

export function Profile() {
  const {currentUser} = useAppContext()
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [isPostsShow, setIsPostsShow] = useState(false)

  const showPassword = () => {
    setIsPasswordShow(prev => !prev)
  }

  const post_data = useQuery({
    queryKey: ['users posts'],
    queryFn: () => postsService.getUsersPosts(currentUser.id),
  })

  return (
    <>
      { !currentUser ? <ErrorPage text="Сначала авторизируйтесь" /> :
      <div className={`${styles.profile} container`}>
        <div className={styles.info}>
          <div className={styles.info_block}>
            <span className={styles.field}>Имя:</span> {currentUser.name}
          </div>
          <div className={styles.info_block}>
            <span className={styles.field}>Логин:</span> {currentUser.login}
          </div>
          <div className={styles.info_block}>
            <span className={styles.field}>Пароль: </span>
            <span className={`${styles.password_field} ${isPasswordShow ? styles.show : ''}`} onClick={showPassword}>
              {isPasswordShow ? currentUser.password : '******'}
            </span>
          </div>
          <div className={styles.info_block} onClick={() => setIsPostsShow(prev => !prev)}>
            <span className={styles.field}>Постов: </span>
            {currentUser.posts.length}
            { currentUser.posts.length > 0 && <Triangle
                color="#d80101"
                size={10}
                fill='#d80101'
                className={`${styles.posts_toggle} ${isPostsShow ? styles.show : ''}`}
              /> }
          </div>

          <div className={`${styles.posts_show} ${isPostsShow ? styles.show : ''}`}>
            <div>
              { !post_data.isLoading && !post_data.isError && post_data.data.map(post => {
                return (
                  <Link
                    to={`/post/${post.id}`}
                    key={post.id}
                    className={styles.post}
                  >{post.title};</Link>
                )
              }) }
            </div>
          </div>

          <DividingLine width="95%"/>
          { currentUser.role === 'admin' && <CreateTag /> }
          <CreatePost />
        </div>
      </div>
      }
    </>
  )
}