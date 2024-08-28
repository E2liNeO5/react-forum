import { Post } from './Post'
import { Loading } from '../Loading'
import { ErrorPage } from '../ErrorPage'

export function Posts({ posts, selectedTags, tags }) {
  return (
    <>
      { posts.isLoading ? <Loading /> :
        posts.isError ? <ErrorPage text={posts.error.message} /> : (
        posts.data
          .filter(post => {
            if(selectedTags.length === 0)
              return true
            const isInclude = selectedTags.reduce((arr, tag) => {
              arr.push(post.tags.includes(tag))
              return arr
            }, [])
            if(isInclude.includes(true))
              return true
          })
          .map(post => {
            return (
              <Post
                key={post.id}
                tags_names={tags.data}
                { ...post }
              />
            )
          })
        )
      }
    </>
  )
} 