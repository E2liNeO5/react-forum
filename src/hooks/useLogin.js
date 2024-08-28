import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import { useAppContext } from './useAppContext' 
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const {setCurrentUser} = useAppContext()
  const navigate = useNavigate()

  const { mutate, error, isError, reset } = useMutation({
    mutationKey: ['login user'],
    mutationFn: (data) => userService.getUser(data),
    onSuccess(data) {
      setCurrentUser(data.data[0])
      navigate('/')
    },
    onError(e) {
      console.log(e)
    }
  })

  return { mutate, error, isError, reset }
}