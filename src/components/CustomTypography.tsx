export const InfoSection = ({
  title = "",
  desc = "",
  content = "",
  endingLine = "",
}: {
  title?: string;
  desc?: string;
  content?: React.ReactNode;
  endingLine?: string;
}) => {
  return (
    <div className={`${title != "" ? "mt-30" : "mt-10"} `}>
      <h2 className="text-2xl md:text-5xl font-bold mt-8 max-w-300 md:leading-16 text-secondary">
        {title}
      </h2>
      <h5
        className={`text-xl md:text-2xl font-medium ${
          title != "" && "my-6"
        } text-tertiary`}
      >
        {desc}
      </h5>
      {content && (
        <ul className="list-disc text-sm md:text-base my-4 mx-6 text-tertiary flex flex-col gap-3">
          {content}
        </ul>
      )}
      <p
        className={`text-sm md:text-lg font-normal text-tertiary ${
          content != "" && "my-4"
        } my-4`}
      >
        {endingLine}
      </p>
    </div>
  );
};

export const CustomP = ({
  start,
  link,
  onClick,
  end,
  ...props
}: {
  start?: string;
  link?: string;
  onClick?: () => void;
  end?: string;
}) => {
  return (
    <p className="text-sm md:text-lg font-normal text-tertiary my-4" {...props}>
      {start}
      <span
        className="text-primary cursor-pointer hover:underline underline-offset-3"
        onClick={onClick}
      >
        {link}
      </span>
      {end}
    </p>
  );
};

export const CustomListItem = ({
  title,
  content,
  ...props
}: {
  title?: string;
  content?: string;
}) => {
  return (
    <li className="text-sm md:text-base text-tertiary" {...props}>
      {title && (
        <span className="text-sm md:text-base font-semibold">{title}</span>
      )}
      {content && <span>{content}</span>}
    </li>
  );
};

export const CustomListItem2 = ({
  title,
  content,
  ...props
}: {
  title?: string;
  content?: string;
}) => {
  return (
    <li className="text-sm md:text-lg text-tertiary" {...props}>
      {title && (
        <span className="font-semibold text-primary">{title}</span>
      )}
      {content && <span>{content}</span>}
    </li>
  );
};

export const CustomPWithTitle = ({
  title,
  content,
  ...props
}: {
  title?: string;
  content?: string;
}) => {
  return (
    <p className="text-sm md:text-base text-tertiary mt-4" {...props}>
      {title && (
        <span className="text-sm md:text-base font-semibold">{title}</span>
      )}
      {content && <span>{content}</span>}
    </p>
  );
};

export const CustomPWithTitle2 = ({
  title,
  content,
  ...props
}: {
  title?: string;
  content?: string;
}) => {
  return (
    <p className="text-sm md:text-lg text-tertiary mt-4" {...props}>
      {title && (
        <span className="font-semibold text-primary">{title}</span>
      )}{" "}
      {content && <span>{content}</span>}
    </p>
  );
};
