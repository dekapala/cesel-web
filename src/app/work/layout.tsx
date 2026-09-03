export default function WorkLayout(props: LayoutProps<"/work">) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  );
}
