import { Component,ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent {
  @ViewChild('search', { static: true }) searchTextBox!: ElementRef;
  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues: any[] = [];
  data: string[] = [
    'A1',
    'A2',
    'A3',
    'B1',
    'B2',
    'B3',
    'C1',
    'C2',
    'C3'
  ]
  filteredOptions!: Observable<any[]>;
  // Variable to store the selected option
  public packages=["Monthly","Quaterly","Yearly"];
  public importantList:string[]=["toxicfat reduction","Energy","building lean muscle","Sugar craving body"];
  
    genders: string[] = ['Male', 'Female'];


    public registrationForm!:FormGroup;
    constructor(private fb:FormBuilder){

    }
    ngOnInit():void{
      this.registrationForm=this.fb.group({
        firstName:[''],
        lastName:[''],
        email:[''],
        mobile:[''],
        weight:[''],
        height:[''],
        bmi:[''],
        bmiResult:[''],
        gender:[''],
        requireTrainee:[''],
        package:[''],
        important:[''],
        haveGymBefore:[''],
        equiryDate:['']
      })
      
    this.filteredOptions=this.searchTextboxControl.valueChanges .pipe(
      startWith<string>(''),
      map(name => this._filter(name))
    );
    }
    private _filter(name: string): String[] {
      const filterValue = name.toLowerCase();
      // Set selected values to retain the selected checkbox state 
      this.setSelectedValues();
      this.selectFormControl.patchValue(this.selectedValues);
      let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
      return filteredList;
    }
    selectionChange(event: MatSelectChange) {
      // Check if the selected option is being deselected
      if (event && event.value) {
        const index = this.selectedValues.indexOf(event.value);
        if (index !== -1) {
          this.selectedValues.splice(index, 1);
        }
      }
      // if (this.selectedValues.indexOf(event.value) === -1) {
      //   // Event value has changed, indicating user input
      //   this.selectedValues.push(event.value);
      // } else {
      //   // Value already exists, indicating deselection
      //   const index = this.selectedValues.indexOf(event.value);
      //   if (index !== -1) {
      //     this.selectedValues.splice(index, 1);
      //   }
      // }
    }
    openedChange(e: boolean) {
      // Set search textbox value as empty while opening selectbox 
      this.searchTextboxControl.patchValue('');
      // Focus to search textbox while clicking on selectbox
      if (e == true) {
        this.searchTextBox.nativeElement.focus();
      }
    }
    clearSearch(event:Event) {
      event.stopPropagation();
      this.searchTextboxControl.patchValue('');
    }
    setSelectedValues() {
      console.log('selectFormControl', this.selectFormControl.value);
      if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
        //const selectedValuesArray: any[] = this.selectedValues || []; // Ensure selectedValues is initialized as an empty array if it's initially undefined
        this.selectFormControl.value.forEach((e: any) => { // Use ': any' if the type is unknown
          if (this.selectedValues.indexOf(e) === -1) {
            this.selectedValues.push(e);
          }
        });
       // this.selectedValues = selectedValuesArray; // Assign the modified array back to selectedValues
      }
    }
   
    
    
    
    
    
    submit(){
      console.log(this.registrationForm.value)
    }
 
}






// form: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.form = this.fb.group({
  //     // Define your form controls and validation rules here
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //   });
  // }
 
  // submitForm() {
  //   if (this.form.valid) {
  //     const formData = this.form.value;
  //     // Process the form data, send it to an API, etc.
  //   }
  // }