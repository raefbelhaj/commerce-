import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../shared/services/api/app/auth/auth.service';
import { LocalStorageService } from '../../../shared/services/api/app/auth/local-storage.service';
import { TokenStorageService } from '../../../shared/services/api/app/auth/token-storage.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'] // Ensure styleUrls is plural and correctly points to your stylesheet
})
export class SignUpComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  signUpForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    fullName: new FormControl('') // Include the fullName control
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
  ) {}

  ngOnInit(): void {
    this.createSignUpForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.localStorageService.updateLogInStatus(this.isLoggedIn);
    }
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * public methods
   */
  public createSignUpForm(): void {
    this.signUpForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]], // Add validation for fullName
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: [this.equivalentValidator('password', 'confirmPassword')]
      }
    );
  }

  private equivalentValidator = (firstControlName: string, secondControlName: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = control.get(firstControlName);
      const secondControl = control.get(secondControlName);

      if (secondControl?.value && secondControl.value !== firstControl?.value) {
        secondControl.setErrors({ notEqual: true });
      }
      return null;
    };
  };

  public onSubmit(): void {
    const email = this.signUpForm.get('email')?.value || null;
    const password = this.signUpForm.get('password')?.value || null;
    const fullName = this.signUpForm.get('fullName')?.value || null; // Retrieve fullName from the form

    this.authService.signup(email, password, fullName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: () => {
            this.translate.get('notification.userRegisteredSuccessfully').subscribe((translation: string) => {
              this.toastr.success(translation, undefined, { positionClass: 'toast-bottom-right' });
            });
            this.router.navigateByUrl('/login');
          },
          error: () => {
            this.translate.get('notification.emailinUse').subscribe((translation: string) => {
              this.toastr.error(translation, undefined, { positionClass: 'toast-bottom-right' });
            });
          }
        }
      );
  }
}
