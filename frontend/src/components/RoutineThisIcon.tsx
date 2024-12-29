const RoutineThisIcon = ({ size = "md", onClick }: { size?: "xs" | "md" | "lg", onClick?: () => void }) => {
  const baseSize = 70;
  const sizes = {
    xs: baseSize,
    md: baseSize * 2,
    lg: baseSize * 3,
  };

  return <img src="/icon.png" width={`${sizes[size]}px`} onClick={onClick} />;
};

export default RoutineThisIcon;
