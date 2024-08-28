export function ErrorPage({ text }) {
  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '1em' }}>{text || 'Произошла ошибка'}</h1>
    </>
  )
}