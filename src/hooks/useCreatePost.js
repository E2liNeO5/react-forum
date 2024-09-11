import { useNavigate } from "react-router-dom"
import { useHint } from "./useHint"
import { postsService } from "../services/posts.service"
import { useMutation } from "@tanstack/react-query"
import { useAppContext } from "./useAppContext"
import { helper } from "../services/helper.service"

export function useCreatePost() {
  const showHint = useHint()
  const navigate = useNavigate()
  const {currentUser} = useAppContext()

  const { mutate, error, isError } = useMutation({
    mutationKey: ['post create'],
    mutationFn: data => postsService1.createPost({...data, author: currentUser.id, create_date: helper.getDateFormat(new Date())}),
    onSuccess(data) {
      navigate(`/post/${data.data.id}`)
    },
    onError(error) {
      showHint(error.message, 'error')
    }
  })

  return { mutate }
}