import { useNavigate } from "react-router-dom";
import { useAppContext } from "./useAppContext";

export function useLogout() {
  const navigate = useNavigate()
  const {setCurrentUser} = useAppContext()

  const logOut = () => {
    setCurrentUser(false)
    navigate('/')
  }

  return logOut
}