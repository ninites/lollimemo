import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request/request.service';
import { RouteHistoryService } from 'src/app/core/services/route-history/route-history.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';

@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
})
export class RetrievePasswordComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private request: RequestService,
    private alert: AlertService,
    private router: Router,
    private routeHistory: RouteHistoryService
  ) {}

  retrieveForm = this.fb.group({
    email: [
      '',
      [Validators.minLength(2), Validators.required, Validators.email],
    ],
  });
  htmlLoginForm = {};
  label: string[] = ['E mail'];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.htmlLoginForm = { ...this.retrieveForm.value };
  }

  onSubmit(): void {
    const retrieveFormValue = { ...this.retrieveForm.value };
    retrieveFormValue.email = retrieveFormValue.email.trim();
    this.request.post('users/retrieve', retrieveFormValue).subscribe({
      next: (response) => {
        const previousUrl = this.routeHistory.getPrevious();
        this.alert.message = 'Un email vous a ete envoyé';
        this.alert.switchAlert();
        this.router.navigate(['/' + previousUrl]);
      },
      error: (err) => {
        this.alert.message = err.error;
        this.alert.switchAlert();
      },
    });
  }

  notSorted() {
    return 0;
  }
}
