import { useQuery } from "@tanstack/react-query";
import { useExercises } from "../../../context/app/exercise/context";
import useExerciseService from "../../../services/useExerciseService";
import { Exercise } from "../../../model/Exercise";

const Exercises = () => {
  const { getAllExercises } = useExerciseService();
  const { exerciseList } = useExercises();
  useQuery({
    queryKey: ["exercises"],
    queryFn: () => getAllExercises(),
    staleTime: Infinity,
  });
  function getBodyParts(el: Exercise[]) {
    return el && el.length > 0
      ? Array.from(new Set(el.map((e) => e.bodyPart)))
      : [];
  }
  // Divide by bodyPart and display an image about it
  // Once body part is clicked show an animated modal that display a whole list of exercises
  // Display it's type CALISTHENICS, WEIGHTS OR CARDIO
  // Show a filter for "type"
  return exerciseList ? (
    <div id="exercise-list" className="flex gap-2 flex-wrap">
      {getBodyParts(exerciseList).map((bodyPart) => (
        <article key={bodyPart}>
          <h2>{bodyPart}</h2>
          <img src="" alt="" />
        </article>
      ))}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Exercises;
