import { Component, OnInit } from '@angular/core';

interface TrainerHistory {
  name: string;
  expertise: string;
  experience: number;
  completedTrainings: number;
}

@Component({
  selector: 'app-trainer-history',
  templateUrl: './trainer-history.component.html',
  styleUrls: ['./trainer-history.component.css']
})
export class TrainerHistoryComponent implements OnInit {
  trainers: TrainerHistory[] = [];

  ngOnInit(): void {
    this.trainers = [
      { name: 'John Doe', expertise: 'AI & ML', experience: 6, completedTrainings: 12 },
      { name: 'Jane Smith', expertise: 'Full Stack', experience: 5, completedTrainings: 8 }
    ];
  }
}
