import { useLogout } from "./useLogout"

export function useGetLinks(user) {
  const links = [
    {
      name: 'Главная',
      to: '/'
    }
  ]

  const logOut = useLogout()

  if(user) {
    links.push(
      {
        name: 'Профиль',
        to: '/profile'
      },
      {
      name: 'Выйти',
      to: '/logout',
      btn: true,
      onClick: logOut
    })
  } else {
    links.push(
    {
      name: 'Регистрация',
      to: '/register'
    },
    {
      name: 'Войти',
      to: '/login'
    })
  }

  return links
}