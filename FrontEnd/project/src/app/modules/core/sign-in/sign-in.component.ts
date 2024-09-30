import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/api/app/auth/auth.service';
import { TokenStorageService } from '../../../shared/services/api/app/auth/token-storage.service';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/api/app/auth/local-storage.service';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  isLoggedIn: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly tokenStorage: TokenStorageService,
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly localStorageService: LocalStorageService,
    private readonly toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.createSignInForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.localStorageService.updateLogInStatus(this.isLoggedIn);
    }
    if (this.isLoggedIn) {
      this.router.navigateByUrl("/home");
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * public methodes
   */
  public createSignInForm(): void {
    this.signInForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& ])[A-Za-z\d@$!%*?& ]+$/)
          ]
        ]
      }
    );
  }

  public onSubmit(): void {
    const email = this.signInForm.get('email')?.value || null;
    const password = this.signInForm.get('password')?.value || null;
    this.authService.login(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: response => {
            this.tokenStorage.saveToken(response.accessToken);
            this.tokenStorage.saveUser(response);
            this.localStorageService.updateLogInStatus(true);
            this.isLoggedIn = true;
            window.localStorage.setItem("userEmail", email);
            this.translate.get('notification.loginSuccessful').subscribe((translation: string) => {
              this.toastr.success(translation, undefined, { positionClass: 'toast-bottom-right' });
            });
            this.router.navigateByUrl("/home");

          },
          error: () => {
            this.translate.get('notification.connectionFailedIncorrectCredential').subscribe((translation: string) => {
              this.toastr.error(translation, undefined, { positionClass: 'toast-bottom-right' });
            });
          }
        }
      );
  }
}
