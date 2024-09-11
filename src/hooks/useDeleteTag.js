import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagListService } from "../services/taglist.service";

export function useDeleteTag() {
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationKey: ['delete tag'],
    mutationFn: id => tagListService.deleteTag(id),
    onSuccess() {
      queryClient.refetchQueries('get tags')
    }
  })

  return {mutate}
}