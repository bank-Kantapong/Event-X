type IconSvgProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  fill?: string;
  className?: string;
  onClick?: () => void;
};

export default function IconSvg({
  Icon,
  size = 24,
  fill = "currentColor",
  className = "",
  onClick
}: IconSvgProps) {
  return (
    <Icon
      width={size}
      height={size}
      style={{ color: fill }}
      fill="currentColor"
      className={`${className} [&>path]:fill-currentColor`}
      onClick={onClick}
    />
  );
}
