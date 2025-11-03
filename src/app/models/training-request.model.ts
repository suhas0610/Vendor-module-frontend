export interface TrainingRequest {
  id: string;
  courseName: string;
  duration: string;
  traineeCount: number;
  status: 'CREATED'|'PUBLISHED';
  createdAt: string;
  updatedAt?: string;
}
