import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { TrainingRequest } from '../models/training-request.model';
@Component({
  selector: 'app-training-request-management',
  templateUrl: './training-request-management.component.html',
  styleUrls: ['./training-request-management.component.css']
})
export class TrainingRequestManagementComponent implements OnInit {
  requests: TrainingRequest[] = [];
  cols = ['requestId','course', 'duration', 'trainees', 'status', 'actions'];

  // form state
  formVisible = false;
  model: Partial<TrainingRequest> = { id: '', courseName: '', duration: '', traineeCount: 0 };
  publishNow = false;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requests = this.storage.getRequests();
  }

  openForm(): void {
    this.formVisible = true;
    this.model = { id: '', courseName: '', duration: '', traineeCount: 0 };
    this.publishNow = false;
  }

  closeForm(): void {
    this.formVisible = false;
    this.model = { id: '', courseName: '', duration: '', traineeCount: 0 };
    this.publishNow = false;
  }

  save(): void {
    // ensure basic validation
    if (!this.model.id || !this.model.courseName || !this.model.duration || (this.model.traineeCount ?? 0) <= 0) {
      alert('Please fill request id, course, duration and trainees count');
      return;
    }
    const created = this.storage.createRequest({
      id: this.model.id,
      courseName: this.model.courseName,
      duration: this.model.duration,
      traineeCount: this.model.traineeCount
    });
    if (this.publishNow) {
      this.storage.publishRequest(created.id);
    }
    this.loadRequests();
    this.closeForm();
  }

  publishRequest(req: TrainingRequest): void {
    this.storage.publishRequest(req.id);
    this.loadRequests();
  }
}
