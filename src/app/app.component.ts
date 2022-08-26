import { Component } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'cdmcloud-post';

  constructor(private firestore: Firestore, public snackBar: MatSnackBar){}

  qnaform = new FormGroup({
    answer: new FormControl('')
  });

  col: any = collection(this.firestore, 'Answers');

  answerDoc: any = doc(this.col);

  onSubmit(){

    if(this.qnaform.value.answer == ""){
      this.snackBar.openFromComponent(ErrorBarComponent, {});
      return ""
    }
    else{
      this.snackBar.openFromComponent(LoadBarComponent, {});
      return setDoc(doc(this.col), {
        answer: this.qnaform.value.answer
      }).then(()=>{
        this.snackBar.dismiss()
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
        });
      });
    }
    
    
    
  }
}

@Component({
  selector: 'snack-bar',
  templateUrl: 'snack-bar.html',
  styles: [`
    .snackbar-class
      color: #90ee90
  
  `],
})
export class SnackBarComponent {}


@Component({
  selector: 'error-bar',
  templateUrl: 'error-bar.html',
  styles: [`
    .errorbar-class
      color: #ffcccb
  
  `],
})
export class ErrorBarComponent {}


@Component({
  selector: 'load-bar',
  templateUrl: 'loading-bar.html',
  styles: [`
    .load-class
      color: #ffcccb
  
  `],
})
export class LoadBarComponent {}
