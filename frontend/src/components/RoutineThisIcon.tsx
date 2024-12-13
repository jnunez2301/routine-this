const RoutineThisIcon = ({ size = "md" }: { size?: "xs" | "md" | "lg" }) => {
  const baseSize = 70;
  const sizes = {
    xs: baseSize,
    md: baseSize * 2,
    lg: baseSize * 3,
  };

  return <img src="/icon.png" width={`${sizes[size]}px`} />;
};

export default RoutineThisIcon;
