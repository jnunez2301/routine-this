/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useState } from "react";
import { Exercise } from "../../../model/Exercise";

export type ExerciseState = {
  exerciseList: Exercise[] | null;
  setExerciseList: (exercise: Exercise[]) => void;
};

export const ExerciseContext = createContext<ExerciseState | undefined>(undefined);

export const ExerciseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [exerciseList, setList] = useState<Exercise[] | null>(null);
  function setExerciseList(el: Exercise[]){
    setList(el);
  }
  const values: ExerciseState = {
    exerciseList,
    setExerciseList,
  };
  return (
    <ExerciseContext.Provider value={values}>
      {children}
    </ExerciseContext.Provider>
  );
};
