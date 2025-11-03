import { Component, OnInit } from '@angular/core';

interface TrainingRequest {
  id: number;
  course: string;
  duration: string;
  trainees: number;
  status: 'DRAFT' | 'PUBLISHED';
}

@Component({
  selector: 'app-training-request-management',
  templateUrl: './training-request-management.component.html',
  styleUrls: ['./training-request-management.component.css']
})
export class TrainingRequestManagementComponent implements OnInit {
  requests: TrainingRequest[] = [];
  cols = ['course', 'duration', 'trainees', 'status', 'actions'];

  ngOnInit(): void {
    this.requests = [
      { id: 1, course: 'Angular Development', duration: '5 Days', trainees: 20, status: 'DRAFT' },
      { id: 2, course: 'Machine Learning Basics', duration: '7 Days', trainees: 25, status: 'PUBLISHED' }
    ];
  }

  createRequest(): void {
    const newReq: TrainingRequest = {
      id: this.requests.length + 1,
      course: 'New Course',
      duration: '3 Days',
      trainees: 10,
      status: 'DRAFT'
    };
    this.requests.push(newReq);
  }

  publishRequest(req: TrainingRequest): void {
    req.status = 'PUBLISHED';
  }
}
