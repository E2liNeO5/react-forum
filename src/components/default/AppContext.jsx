import { createContext, useState, useEffect } from "react"
import { storageService } from "../../services/storage.service"
import { useQuery } from "@tanstack/react-query"
import { tagListService } from "../../services/taglist.service"

export const AppContext = createContext({
  currentUser: false,
  setCurrentUser: null,
  modalOptions: {},
  hintOptions: {},
  tags: {},
  setTags: null
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

  const [tags, setTags] = useState({
    isLoading: true
  })
  const tags_data = useQuery({
    queryKey: ['get tags'],
    queryFn: () => tagListService.getTags(),
  })
  
  useEffect(() => {
    if (currentUser)
      storageService.set('currentUser', currentUser)
    else
      storageService.delete('currentUser')

    if(tags_data && tags_data.data && !tags_data.isLoading)
      setTags(tags_data)
  }, [currentUser, tags_data.data]);

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      modalOptions,
      setModalOptions,
      hintOptions,
      setHintOptions,
      tags,
      setTags
    }}>
      {children}
    </AppContext.Provider>
  )
}