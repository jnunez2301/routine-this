export interface IExercise {
  name: string;
  description?: string; // Optional because it has a default value
  videoUrl?: string; // Optional because it has a default value
  imgUrl?: string; 
  // bodyPart and type will be fetch from the backend
  bodyPart: string;
  type: string;
  createdAt?: Date; // Optional because it has a default value
}