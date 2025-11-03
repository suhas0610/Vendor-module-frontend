import { Component, Input, OnInit } from '@angular/core';

interface Request {
  id: number;
  course: string;
  duration: string;
  trainees: number;
}

interface Submission {
  trainer: string;
  course: string;
  status: 'PENDING' | 'SHORTLISTED' | 'SELECTED';
}

interface Quotation {
  trainer: string;
  course: string;
  total: number;
}

@Component({
  selector: 'app-vendor-portal',
  templateUrl: './vendor-portal.component.html',
  styleUrls: ['./vendor-portal.component.css']
})
export class VendorPortalComponent implements OnInit {
  @Input() vendorId!: string;

  availableRequests: Request[] = [];
  submissions: Submission[] = [];
  quotations: Quotation[] = [];

  cols = ['trainer', 'course', 'status', 'actions'];
  colsQ = ['trainer', 'course', 'total'];

  ngOnInit(): void {
    // Mock Data (replace with API later)
    this.availableRequests = [
      { id: 1, course: 'Angular Basics', duration: '5 Days', trainees: 25 },
      { id: 2, course: 'Spring Boot Advanced', duration: '3 Days', trainees: 18 }
    ];

    this.submissions = [
      { trainer: 'John Doe', course: 'Angular Basics', status: 'PENDING' },
      { trainer: 'Jane Smith', course: 'Spring Boot Advanced', status: 'SELECTED' }
    ];

    this.quotations = [
      { trainer: 'Jane Smith', course: 'Spring Boot Advanced', total: 35000 }
    ];
  }

  submitTrainer(request: Request): void {
    alert(`Trainer submitted for course: ${request.course}`);
  }

  submitQuotation(submission: Submission): void {
    alert(`Quotation submitted for: ${submission.trainer}`);
  }
}
