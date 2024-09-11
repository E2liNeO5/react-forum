import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagListService } from "../services/taglist.service";

export function useEditTag() {
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationKey: ['edit tag'],
    mutationFn: (data) => tagListService.editTag(data),
    onSuccess() {
      queryClient.refetchQueries('get tags')
    }
  })

  return {mutate}
}