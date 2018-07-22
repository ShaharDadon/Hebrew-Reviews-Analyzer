import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-algorithm-radio',
  templateUrl: './algorithm-radio.component.html',
  styleUrls: ['./algorithm-radio.component.css']
})
export class AlgorithmRadioComponent implements OnInit {
  
  
  constructor(private reviewService : ReviewsService) { }
  
  ngOnInit() {
    this.reviewService.review.algorithm = "NAIVEScript.py";
  }
  
  setAlgorithm(algorithm){
    this.reviewService.review.algorithm = algorithm;
  }

}
