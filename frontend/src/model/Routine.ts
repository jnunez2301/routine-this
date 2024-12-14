
export interface IWorkout {
  exerciseId: string; // Reference to Exercise model
  reps: number; // Minimum of 1
  sets: number; // Minimum of 1
}
export interface IRoutine {
  routineName: string; // 1 to 255 characters
  description?: string; // Optional, default is an empty string
  // difficulty and type will be fetched from the backend
  difficulty: string;
  type: string;
  favorite?: boolean; // Optional, default is false
  duration: number; // Minimum of 1 (in minutes)
  exerciseList: IWorkout[]; // List of exercises
  userId: string; // Reference to User model
  isPublic?: boolean; // Optional, default is false
  createdAt?: Date; // Optional, default is current date
}

