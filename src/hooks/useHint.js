import { useAppContext } from "./useAppContext";

export function useHint() {
  const {setHintOptions} = useAppContext()

  const default_value = {
    show: false,
    text: '',
    type: false
  }

  const showHint = (text, type, onClose) => {
    setHintOptions({
      show: true,
      text: text,
      type: type,
      onClose: () => {
        if(onClose)
          onClose()
        setHintOptions(default_value)
      }
    })
  }
  
  return showHint
}