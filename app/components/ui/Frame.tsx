const defaultFrameCss: React.CSSProperties = {
  padding: 10,
  borderRadius: 10,
};

export default function Frame({
  children,
  border = false,
  bg = false,
  flex = false,
  ...rest
}: {
  children?: React.ReactNode;
  border?: boolean;
  bg?: boolean;
  flex?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...rest}
      style={{
        ...defaultFrameCss,
        ...rest?.style,
        ...(flex && { display: "flex" }),
        ...(border && { border: "1px solid #E1E1E1" }),
        ...(bg && { background: "#EBEBEB" }),
      }}
    >
      {children}
    </div>
  );
}
