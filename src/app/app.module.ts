import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { AlgorithmRadioComponent } from './algorithm-radio/algorithm-radio.component';
import { InputSingleReviewFormComponent } from './input-single-review-form/input-single-review-form.component';
import { HttpClientModule }    from '@angular/common/http';
import { ReviewsService } from './reviews.service';
import { RouterModule, Routes } from '@angular/router';
import { SingleReviewComponent } from './single-review/single-review.component';
import { InputFileComponent } from './input-file/input-file.component';
import { FileResultComponent } from './file-result/file-result.component';

const appRoutes: Routes = [
  { path: 'single', component: SingleReviewComponent },
   { path: '', component: SingleReviewComponent },
  { path: 'multiple', component: FileResultComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExplanationComponent,
    AlgorithmRadioComponent,
    InputSingleReviewFormComponent,
    SingleReviewComponent,
    InputFileComponent,
    FileResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule ,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ReviewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
