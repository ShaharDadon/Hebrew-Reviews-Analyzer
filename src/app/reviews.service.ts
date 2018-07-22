import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Review } from './review';
import {BrowserModule} from '@angular/platform-browser'
import { RequestOptions, URLSearchParams } from '@angular/http';
import {  Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  file: File;
  lock:boolean = false;
  finishRead:boolean = false;
  reviews: string[] = [];
  reader:FileReader =  new FileReader();
  review:Review = new Review();
  term:string;
  Reviews = [
    {text : "לא טוב",algorithm:"KNN", classification:0 }
    ];
  constructor( private http: HttpClient, private router: Router) { }
  
  getRev(): Observable<Review[]> {
  return of(this.Reviews);
  }
  
  getClassificationByJson(){
    this.term = "param";
    let parameters: HttpParams = new HttpParams();
    const param = new HttpParams()
      .set('text',this.review.text)
      .set('algorithm', this.review.algorithm);
    console.log(param);
    const options = this.term ? 
  { params: param } : {};  
  
    return this.http.get( '/getClassificationByJson',options);

  }
  
  getFileClassificationByJson(text){

      this.term = "param";
      let parameters: HttpParams = new HttpParams();
      const param = new HttpParams()
        .set('text',this.getOnlyWords(text))
        .set('algorithm', this.review.algorithm);
      console.log(param);
      const options = this.term ? 
      { params: param } : {};  
  
      return this.http.get( '/getClassificationByJson',options);
    
  }
  
 getOnlyWords(str){
	return str.replace(/[^\u0590-\u05FF]/g, " ");
}
  
  checkIfValid():boolean{
    if (this.review.text === undefined || !this.CheckHebrew()){
      console.log(this.review.text)
      return false;
  }
    return true;
  }
  
  CheckHebrew():boolean{
    var position = this.review.text.search(/[\u0590-\u05FF]/);
  	if(position >= 0){
  		  return true;
  		}
  	return false;
  }
  
  readFile(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      var lines = fileReader.result.split('\n');
      console.log(lines);
      for(var line = 0; line < lines.length; line++){
			    		this.reviews.push(lines[line]);
    
      }
      this.routeTo('multiple');
      }
    fileReader.readAsText(this.file);
    
  }
  
  routeTo(destination){
    this.router.navigate(['/'+destination]);
  }
  
}
