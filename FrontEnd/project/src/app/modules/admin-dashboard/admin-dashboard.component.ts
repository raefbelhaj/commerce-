import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModelService } from '../../shared/services/api/app/model.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../../shared/services/api/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { RoleEnum } from '../../shared/services/api/app/enum/role.enum';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoggedIn: boolean = false;
  role: string | undefined;
  image: any;
  loading: boolean = false;
  file: File | undefined;

  constructor(
    private readonly toastr: ToastrService,
    private readonly modelService: ModelService,
    private readonly translate: TranslateService,
    private readonly tokenStorage: TokenStorageService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getUser().roles[0];
    }
    if (this.role !== RoleEnum.ADMIN) {
      this.router.navigateByUrl("/**");
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * 
   * Public methodes
   * 
   */
  // On file Select 
  public onChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }
  // OnClick of button Upload 
  public onUpload(): void {
    if (this.file) {
      this.loading = true;
      this.modelService.updateImage(1, this.file)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          {
            next: () => {
              this.loading = false; // Flag variable 
              this.translate.get('notification.imageUploadedSuccessfully').subscribe((translation: string) => {
                this.toastr.success(translation, undefined, { positionClass: 'toast-bottom-right' });
              });
              this.getTestById();
            },
            error: () => {
              this.loading = false;
              this.translate.get('notification.imageUploadedError').subscribe((translation: string) => {
                this.toastr.error(translation, undefined, { positionClass: 'toast-bottom-right' });
              });
            }
          }
        );
    }
  }

  /**
   * 
   * Private methodes
   * 
   */

  /**
   *  retreive test by id
   */
  private getTestById(): void {
    this.modelService.getTestById(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          //console.log('test by Id : ', response);
          this.image = "data:image/jpeg;base64," + response.image;
        },
        error: error => {
          console.error('Error fetching tests:', error);
        }
      });
  }
}
