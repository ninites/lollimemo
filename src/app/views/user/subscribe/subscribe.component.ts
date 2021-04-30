import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request/request.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private router: Router
  ) {}

  subForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  formList = {};
  errorMessage: { [key: string]: string } = {
    username: '',
    email: '',
    password: '',
  };

  onSubmit(): void {
    this.request.post('users', this.subForm.value).subscribe({
      next: () => {
        this.router.navigate(['/user/login']);
      },
      error: (err) => {
        for (const key in err.error) {
          this.errorMessage[key] = err.error[key];
        }
      },
    });
  }

  ngOnInit(): void {
    this.formList = { ...this.subForm.value };
  }
}
