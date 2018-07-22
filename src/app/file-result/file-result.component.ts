import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review';

@Component({
  selector: 'app-file-result',
  templateUrl: './file-result.component.html',
  styleUrls: ['./file-result.component.css']
})
export class FileResultComponent implements OnInit {
  running:boolean = true;
  private reviews =[];
  message:string = "Loading...";
  index:number = 0;
  
  constructor(private reviewService : ReviewsService) { }

  ngOnInit() {
    this.classify();
  }
  
  classify(){
    
      this.reviewService.getFileClassificationByJson(this.reviewService.reviews[this.index])
      .subscribe( 
        (response) => this.updateScore(response),
        (error) => console.log(error)
        );
    
  }
  updateScore(response){
    this.reviews.push({text:response.text, result: parseInt(response.result)});
    this.index = this.index + 1;
    if(this.index<this.reviewService.reviews.length && this.running){
      this.classify();
        }
    else{ this.message = "Done!"; }
  }
  
  returnHomePage(){
    this.reviews = [];
    this.reviewService.reviews=[];
    this.running = false;
    this.reviewService.routeTo('single');
  }
}
