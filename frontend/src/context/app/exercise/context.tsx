import { useContext } from "react";
import { ExerciseContext } from "./ExerciseContext";

export function useExercises(){
  const context =  useContext(ExerciseContext);
  if(!context){
    throw new Error("useExercises has to be used withing ExerciseProvider")
  }
  return context;
}