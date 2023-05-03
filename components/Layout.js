const Layout = (props) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="h-full bg-gray-100">
          <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
            <div className="flex flex-col min-h-screen max-h-full">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LayoutAdmin = (props) => {
  return (
    <>
      <div className="">{props.children}</div>
    </>
  );
};

export { LayoutAdmin, Layout };
