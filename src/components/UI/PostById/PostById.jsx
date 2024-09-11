import '../../../styles.scss'
import styles from '../Posts/Posts.module.scss'
import { useQuery } from "@tanstack/react-query"
import { postsService } from "../../../services/posts.service"
import { useParams } from "react-router-dom"
import { Loading } from "../Loading"
import { ErrorPage } from "../ErrorPage"
import { Comment } from "../Comment/Comment"
import { DividingLine } from '../DividingLine/DividingLine'

export function PostById() {
  const {id} = useParams()

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['get post'],
    queryFn: () => postsService.getPostById(id)
  })

  return (
    <>
      {isLoading ? <Loading /> :
       isError ? <ErrorPage text={error.message} /> : (
        <div className='container'>
          <div className={styles.container}>
            <div className={styles.image}>
              <img src={`/images/${data.image}`} alt="post_image" />
            </div>
            <div className={styles.content}>
              <div className={styles.author}>
                <span>{data.author}</span> - {data.create_date}
              </div>
              <div className={styles.title}>
                <span>---</span>{data.title}<span>---</span>
              </div>
              <div
                className={`${styles.text} ${styles.show}`}
              >
                {data.text}
              </div>
              <div className={styles.tags}>Тэги: {
                data.tags.map(id => {
                  return `${data.tags_names.find(tag => tag.id === id).name}`
                }).join(', ')
              }</div>
            </div>
          </div>
          <DividingLine width="50%" />
          { data.comments_count > 0 && (
            <>
              <div className={styles.comments_info} style={{ marginLeft: '0px' }}>
                Комментарии:
              </div>
              <div className={`${styles.comments_container} ${styles.show}`}>
                <div>
                  { data.comments.map(comment => {
                    return <Comment key={comment.id} {...comment} />
                  }) }
                </div>
              </div>
            </>)}
        </div>
      ) }
    </>
  )
}