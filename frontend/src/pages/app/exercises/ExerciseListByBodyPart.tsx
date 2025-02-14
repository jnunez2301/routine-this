import { useNavigate, useParams } from "@tanstack/react-router";
import { Button } from "../../../components/core/Button";
import useExerciseService from "../../../services/useExerciseService";
import { useExercises } from "../../../context/app/exercise/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Exercise } from "../../../model/Exercise";
import ExerciseTypeImg from "./ExerciseTypeImg";

const ExerciseListByBodyPart = () => {
  const { bodyPart } = useParams({ from: "/app/exercises/$bodyPart" });
  const { getAllExercises } = useExerciseService();
  const navigate = useNavigate();
  const { exerciseList } = useExercises();
  const [displayedList, setDisplayedList] = useState<Exercise[] | null>(null);
  useQuery({
    queryKey: ["exercises"],
    queryFn: () => getAllExercises(),
    staleTime: Infinity,
  });
  useEffect(() => {
    if (exerciseList && exerciseList.length > 0) {
      setDisplayedList(
        exerciseList.filter((e) => e.bodyPart === bodyPart.toUpperCase())
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseList]);
  if (displayedList && displayedList.length === 0) {
    return (
      <div className="p-3 flex flex-col items-center gap-5">
        <h2 className="text-xl">Woops, there is no exercises here yet</h2>
        <Button
          onClick={() => navigate({ to: ".." })}
          $variant="outlined"
          className="w-fit"
        >
          Go Back
        </Button>
      </div>
    );
  }
  return displayedList ? (
    <section id="exercise-list-body-part" className="flex flex-col p-2">
      <Button
        onClick={() => navigate({ to: ".." })}
        $variant="outlined"
        className="w-fit"
      >
        Go Back
      </Button>
      <div className="grid grid-cols-4 gap-2 mt-5">
        {displayedList.map((exercise) => (
          <article
            key={exercise._id}
            className="border rounded-sm flex flex-col items-center justify-center p-2 hover:opacity-80 transition-all cursor-pointer"
          >
            <h2 className="font-semibold text-xl">{exercise.name}</h2>
            <img
              src={exercise.imgUrl}
              alt={`Image of ${exercise.name} exercise`}
              aria-label={`Image of ${exercise.name} exercise`}
              className="w-30 h-30"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/public/logo_b.png";
              }}
            />
            <p>{exercise.description}</p>
            <div className="flex gap-1 items-center font-bold">
              <ExerciseTypeImg type={exercise.type} />
              <p>
                {exercise.type.charAt(0).toUpperCase() +
                  exercise.type.slice(1).toLowerCase()}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  ) : (
    <p>Loading...</p>
  );
};

export default ExerciseListByBodyPart;
