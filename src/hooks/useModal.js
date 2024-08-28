import { useAppContext } from "./useAppContext";

export function useModal() {
  const {setModalOptions} = useAppContext()
  
  const default_value = {
    show: false,
    title: '',
    text: '',
    ok_btn_text: 'Ок',
    cancel_btn_text: 'Отмена',
    ok_btn_click: () => {},
    cancel_btn_click: () => {}
  }

  const showModal = ({ ok_btn_click, cancel_btn_click, ok_btn_text, cancel_btn_text, title, text } = {}) => {
    
  
    const okBtnClick = () => {
      if(ok_btn_click)
        ok_btn_click()
      setModalOptions(default_value)
    }
  
    const cancelBtnClick = () => {
      if(cancel_btn_click)
        cancel_btn_click()
      setModalOptions(default_value)
    }

    setModalOptions({
      ...default_value,
      show: true,
      title: title || '',
      text: text || '',
      ok_btn_text: ok_btn_text || 'Ок',
      cancel_btn_text: cancel_btn_text || 'Отмена',
      ok_btn_click: okBtnClick,
      cancel_btn_click: cancelBtnClick
    })
  }

  return showModal
}