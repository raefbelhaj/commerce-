import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModelService } from '../../services/api/app/model.service';
import { Model, ModelCreationInput } from '../../services/api/app/model.models';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/api/app/auth/local-storage.service';
import { TokenStorageService } from '../../services/api/app/auth/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit, OnDestroy {

  tests: Model[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly modelService: ModelService, private readonly toastr: ToastrService, private readonly localStorageService: LocalStorageService,
    private readonly tokenStorageService: TokenStorageService, private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    //this.createTest();
    //this.updateTest();
    //this.getTests();
    //this.deleteTest();
    this.getTests();
    //this.getTestById();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public logout(): void {
    this.tokenStorageService.signOut();
    this.localStorageService.updateLogInStatus(false);
    this.router.navigateByUrl("/login");
  }

  // Method to check login status
  public isLoggedIn() {
    return this.localStorageService.getLogInStatus();
  }

  /**
   *  build dataInput to add new test
   */
  private buildDataToAdd(): ModelCreationInput {
    return {
      test: "created Test"
    }
  }
  /**
   *  build dataInput to update test
   */
  private buildDataToUpdate(): ModelCreationInput {
    return {
      test: "updated Test"
    }
  }
  /**
   *  retreive test by id
   */
  private getTestById(): void {
    this.modelService.getTestById(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          //console.log('test by Id : ', response);
          //this.image = "data:image/jpeg;base64," + response.image;
        },
        error: error => {
          console.error('Error fetching tests:', error);
        }
      });
  }

  /**
   *  retreive all tests
   */
  private getTests(): void {
    this.modelService.getTests()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.tests = response;
          console.log('tests List: ', this.tests);
        },
        error: error => {
          console.error('Error fetching tests:', error);
        }
      });
  }

  /**
   *  create new test
   */
  private createTest(): void {
    const dataInput = this.buildDataToAdd();
    this.modelService.createTest(dataInput)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: response => {
            console.log('created test : ', response);
          },
          error: error => {
            console.error('Error creating test:', error);
          }
        }
      );
  }

  /**
   *  update existing test
   */
  private updateTest(): void {
    const dataInput = this.buildDataToAdd();
    this.modelService.updateTest(4, dataInput)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: response => {
            console.log('updated test : ', response);
          },
          error: error => {
            console.error('Error creating test:', error);
          }
        }
      );
  }

  /**
   *  delete existing test by id
   */
  private deleteTest(id = 4): void {
    this.modelService.deleteTest(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: response => {
            console.log('deleted msg : ', response);
          },
          error: error => {
            console.error('Error creating test:', error);
          }
        }
      );
  }
}