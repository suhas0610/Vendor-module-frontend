import { Component, OnInit } from '@angular/core';

interface Trainer {
  id: number;
  name: string;
  expertise: string;
  experience: number;
  email: string;
}

@Component({
  selector: 'app-trainer-profile-management',
  templateUrl: './trainer-profile-management.component.html',
  styleUrls: ['./trainer-profile-management.component.css']
})
export class TrainerProfileManagementComponent implements OnInit {
  trainers: Trainer[] = [];
  cols = ['name', 'expertise', 'experience', 'email'];

  ngOnInit(): void {
    this.trainers = [
      { id: 1, name: 'John Doe', expertise: 'AI & ML', experience: 6, email: 'john@ml.com' },
      { id: 2, name: 'Emily Clark', expertise: 'Cloud Computing', experience: 5, email: 'emily@cloud.com' }
    ];
  }

  openForm(): void {
    alert('Trainer form would open here.');
  }
}
