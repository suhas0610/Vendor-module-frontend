export interface TrainerSubmission {
  id: string;
  requestId: string;
  vendorId: string;
  vendorName?: string;
  trainerName: string;
  email?: string;
  phone?: string;
  experience: number;
  expertise?: string;
  certifications?: string;
  status: 'SUBMITTED'|'SHORTLISTED'|'SELECTED';
  createdAt: string;
  updatedAt?: string;
}
