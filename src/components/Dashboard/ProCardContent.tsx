export default (props: any) => {
  return (
    <div
      style={{
        height: 344,
      }}
      {...props}
    >
      {props.children}
    </div>
  );
};
