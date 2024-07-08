
export default ({ content }: any) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content
      }}
    />
  )
}
