function getExerciseImg(exerciseType: string) {
  return `/routine_types/${exerciseType.toLowerCase()}.png`;
}
const ExerciseTypeImg = ({ type }: { type: string | undefined }) => {
  //TODO: Replace this with example made at Exercises.tsx
  //Plus this needs to be icons instead of large images
  return type && type.length > 0 ? (
    <img
      style={{ width: "contain" }}
      src={getExerciseImg(type)}
      className={`exercise-type-${type.toLocaleLowerCase()} h-10 w-10`}
      alt={`Image of exercise type ${type}`}
      aria-label={`Image of exercise type ${type}`}
    />
  ) : null;
};

export default ExerciseTypeImg;
