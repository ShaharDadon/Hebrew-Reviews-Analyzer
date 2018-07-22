import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-input-single-review-form',
  templateUrl: './input-single-review-form.component.html',
  styleUrls: ['./input-single-review-form.component.css']
})
export class InputSingleReviewFormComponent implements OnInit {
  loading: boolean = false;
  pos_result:boolean = false;
  neg_result:boolean = false;
  message:string;
  reviewText = ""
  Reviews: Observable<Review[]>;
  constructor(private reviewService : ReviewsService) { }

  ngOnInit() {
    // this.Reviews = this.reviewService.getRev();
  
  }
  classify(){
    this.reviewService.review.text = this.reviewText;
    
    if(this.reviewService.checkIfValid()){
    this.loading = true;
    this.reviewService.getClassificationByJson()
    .subscribe( 
      (response) => this.updateScore(response),
      (error) => console.log(error)
      );
    }
    else{alert("Please fill text area!");}
  }
  updateScore(score){
    this.loading = false;
    this.setMessage();
    if (parseInt(score.result)==1){
      this.pos_result = true;
      this.neg_result = false;
    }
    else{
      this.pos_result = false;
      this.neg_result = true;
    }
  }
  
  setMessage(){
    if(this.reviewService.review.algorithm=="NAIVEScript.py")
      this.message = "Naive-Bayes";
    else{this.message = "K-Nearest Neighbors";}
  }
  
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
