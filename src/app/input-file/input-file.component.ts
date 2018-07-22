import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {

  
  constructor(
    private reviewService : ReviewsService, 
    private router: Router
  ) { }

  ngOnInit() {
  }
  startFileClassification(){
    this.router.navigate(['/multiple']);
  }
  
  onChange(event: any) {
      
    this.reviewService.file = event.target.files.item(0);
    this.reviewService.readFile(this.reviewService.file);
    // this.startFileClassification();
    
  }
  
  
}
