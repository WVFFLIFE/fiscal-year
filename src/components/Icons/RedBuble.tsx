interface RedBubleIconProps {
  className?: string;
  textClassName?: string;
  count: string;
  viewBox?: string;
}

const RedBubleIcon: React.FC<RedBubleIconProps> = ({
  viewBox = '0 0 16 16',
  className,
  textClassName,
  count,
}) => {
  return (
    <svg className={className} viewBox={viewBox} width="16" height="16">
      <circle cx="8" cy="8" r="8" fill="#DB0041" />
      <text
        className={textClassName}
        x={count.length === 1 ? 5 : 2}
        y="12"
        fill="#fff"
      >
        {count}
      </text>
    </svg>
  );
};

export default RedBubleIcon;
