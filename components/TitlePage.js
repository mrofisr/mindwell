export default function TitlePage({title}) {
  return (
    <>
      <div className="my-5">
        <span className="font-bold text-2xl">{title ?? "Ini Title"}</span>
      </div>
    </>
  );
}
