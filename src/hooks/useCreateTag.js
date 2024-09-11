import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagListService } from "../services/taglist.service";
import { useHint } from "./useHint";

export function useCreateTag(reset) {
  const showHint = useHint()
  const queryClient = useQueryClient()

  const { mutate, error, isError } = useMutation({
    mutationKey: ['tag create'],
    mutationFn: data => tagListService.createTag(data),
    onSuccess() {
      showHint('Тэг успешно добавлен!', 'success')
      reset()
      queryClient.refetchQueries('get tags')
    },
    onError(error) {
      showHint(error.message, 'error')
    }
  })

  return { mutate }
}