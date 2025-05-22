export const SectionDiv = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-40 px-4 md:px-20 xl:px-48" id={id}>
      {children}
    </div>
  );
};
