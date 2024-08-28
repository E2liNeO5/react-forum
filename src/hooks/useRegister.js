import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate()

  const { mutate, isError, error, reset } = useMutation({
    mutationKey: ['create user'],
    mutationFn: (data) => userService.createUser(data),
    onSuccess() {
      navigate('/login')
    }
  })

  return { mutate, isError, error, reset }
}