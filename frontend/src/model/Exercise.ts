export interface Exercise {
  _id: string;
  name: string;
  description?: string; // Optional because it has a default value
  videoUrl?: string; // Optional because it has a default value
  imgUrl?: string; 
  // bodyPart and type will be fetch from the backend
  bodyPart: string;
  type: string;
  createdAt?: Date; // Optional because it has a default value
}
export enum ExerciseType {
  CALISTHENIC = "CALISTHENIC",
  WEIGHT = "WEIGHT",
  CARDIO = "CARDIO"
}
export enum BodyPartEnum {
  CHEST= "CHEST",
  BACK= "BACK",
  BICEPS= "BICEPS",
  FOREARMS= "FOREARMS",
  TRICEPS= "TRICEPS",
  LEGS= "LEGS",
  SHOULDERS= "SHOULDERS",
  ABS= "ABS",
  GLUTES= "GLUTES",
  FULL_BODY= "FULL_BODY"
}
