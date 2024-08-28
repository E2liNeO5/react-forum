import { createContext, useState, useEffect } from "react"
import { storageService } from "../../services/storage.service"

export const AppContext = createContext({
  currentUser: false,
  setCurrentUser: null,
  modalOptions: {},
  hintOptions: {}
})

export const AppProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(storageService.get('currentUser') || false)
  
  const [modalOptions, setModalOptions] = useState({
    show: false,
    title: '',
    text: '',
    ok_btn_text: 'Ок',
    cancel_btn_text: 'Отмена',
    ok_btn_click: () => {},
    cancel_btn_click: () => {}
  })
  const [hintOptions, setHintOptions] = useState({
    show: false,
    text: '',
    type: false,
    onClose: () => {}
  })

  useEffect(() => {
    if (currentUser)
      storageService.set('currentUser', currentUser)
    else
      storageService.delete('currentUser')
  }, [currentUser]);

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      modalOptions,
      setModalOptions,
      hintOptions,
      setHintOptions
    }}>
      {children}
    </AppContext.Provider>
  )
}