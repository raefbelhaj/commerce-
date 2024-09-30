import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideHttpClient(withFetch()), // http client providers
    provideRouter(routes),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers!]
});

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}