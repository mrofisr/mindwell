export default function TitlePage({title}) {
  return (
    <>
      <div className="mx-4 my-5">
        <span className="font-bold text-2xl">{title ?? "Ini Title"}</span>
      </div>
    </>
  );
}
