import { useQuery } from '@tanstack/react-query'
import { DividingLine } from './DividingLine/DividingLine'
import { Posts } from './Posts/Posts'
import { TagList } from './TagList/TagList'
import { tagListService } from '../../services/taglist.service'
import { useState } from 'react'
import { postsService } from '../../services/posts.service'
import { useAppContext } from '../../hooks/useAppContext'
import { Loading } from './Loading'
import { ErrorPage } from './ErrorPage'

export function Home() {
  const [selectedTags, setSelectedTags] = useState([])
  const {tags} = useAppContext()

  const posts = useQuery({
    queryKey: ['get posts'],
    queryFn: () => postsService.getPosts()
  })

  return (
    <>
      { tags.isLoading ? <Loading /> : 
        tags.isError ? <ErrorPage text={tags.error.message} /> : 
          <div className='container'>
            <TagList
              tags={tags.data}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              isLoading={tags.isLoading}
            />
            <DividingLine width='90%' />
            <Posts
              posts={posts}
              selectedTags={selectedTags}
              tags={tags}
            />
          </div>
       }
    </>
  )
}