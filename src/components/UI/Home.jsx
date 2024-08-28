import { useQuery } from '@tanstack/react-query'
import { DividingLine } from './DividingLine/DividingLine'
import { Posts } from './Posts/Posts'
import { TagList } from './TagList/TagList'
import { tagListService } from '../../services/taglist.service'
import { useState } from 'react'
import { postsService } from '../../services/posts.service'
import { Modal } from './Modal/Modal'
import { Hint } from './Hint/Hint'

export function Home() {
  const [selectedTags, setSelectedTags] = useState([])

  const tags = useQuery({
    queryKey: ['get tags'],
    queryFn: () => tagListService.getTags()
  })

  const posts = useQuery({
    queryKey: ['get posts'],
    queryFn: () => postsService.getPosts()
  })

  return (
    <>
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
    </>
  )
}