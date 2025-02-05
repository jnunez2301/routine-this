import { useExercises } from "../context/app/exercise/context";
import useApi from "../hooks/useApi";
import { Exercise } from "../model/Exercise";

const useExerciseService = () => {
  const { setExerciseList } = useExercises();
  const api = useApi();

  async function getAllExercises(){
    const response= await api.get('exercises');
    
    let data: Exercise[] = [];
    if(response){
      data = response as unknown as Exercise[];
      setExerciseList(data)
    }
    return data;
  }
  return {
    getAllExercises
  }
}

export default useExerciseService;