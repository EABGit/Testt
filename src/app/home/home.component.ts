import { Component,OnInit  ,ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import {buildprocessService} from '../services/buildprocess';
import { AfterViewInit, OnDestroy } from '@angular/core';
//import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
//import { MatDialog } from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MyModel} from '../MyModel';
import { FormArray } from '@angular/forms';
interface Website {
  id: string;
  name: string;
}
interface ModelName {
  saleS_TYPE: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent   {
  myModelData: MyModel = new MyModel();
  modelError:string='';
  selectedWebsiteValues:any[]=[];
  selectedModelNameValues:any[]=[];
  BrandNames: any[] = []
  sourceTypeList: any[] = [];
  modelNameList: ModelName[] = []
  brandNameSelected: boolean = false;
  isConfirmationModalVisible = false;
  protected websites: Website[] = [
    { id: '1', name: '1 - German' },
    { id: '2', name: '2 - English' },
    { id: '3', name: '3- Italian' }
  ];
brandNames=[

  { brandId: '6', brandName: 'VW' },
  { brandId: '7', brandName: 'AUDI' },
  { brandId: '8', brandName: 'SKODA' },
  { brandId: '11', brandName: 'SEAT' }

]
sourceTypes=[
  { sourceId: '1', sourceName: 'AE' }
]
microservices = [
  { value: 'REFINEMENT', label: 'REFINEMENT' }
];
environment = [
  { label: 'RMI_REF_DEV', value: 'RMI_REF_DEV' }
];
items2 = [  
  { label: 'Wiring Diagram', value: 'Wiring Diagram' }
  // { label: 'IFU2', value: 'IFU2' }
];
itemsArray: { id: number, name: string }[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' }
];
items = [
  { id: 1, name: '1 - German' },
  { id:2,  name: '2 - English' },
  { id: 3, name: '3- Italian' }
  // Add more items as needed
];
selectedCheckboxes: string[] = this.items.map(item => item.name); // Select all items by default
selectedItems: number[] = [];
  public websiteMultiCtrl: FormControl = new FormControl();
  public websiteMultiFilterCtrl: FormControl = new FormControl();
  public filteredWebsitesMulti: ReplaySubject<Website[]> = new ReplaySubject<Website[]>(1);
  public modelnameMultiCtrl: FormControl = new FormControl();
  public modelnameMultiFilterCtrl: FormControl = new FormControl();
  public filteredmodelnameMulti: ReplaySubject<ModelName[]> = new ReplaySubject<ModelName[]>(1);
  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;
  //@ViewChild('multiSelectModelName', { static: true }) multiSelectModelName!: MatSelect;
  protected _onDestroy = new Subject<void>();
  ////below code is for multiselect dropdown with the serach functionality
  @ViewChild('search', { static: true }) searchTextBox!: ElementRef;
  @ViewChild('search1', { static: true }) searchTextBox1!: ElementRef;
  // selectedMicroservice = new FormControl();
  // selectedBrand = new FormControl();
  // Initialize selectedItems with an empty array
  //selectedItems = new FormControl<string[]>([]);

  //selectedWebsiteValuesControl: FormControl | null = null;
  //-----selectedWebsiteValuesControl: FormControl;
  constructor(private fb:FormBuilder,private buildprocessService: buildprocessService,private http: HttpClient){}
  public buildForm!:FormGroup;
  ngOnInit() {
    debugger;   
      // this.buildprocessService.GetBrandName().subscribe(response => {
      //     this.BrandNames = response;
      //     console.log("BrandNames", response)
      // })    
  ////////////////------------------------------------ language----- but naming convension used as multiselect
  this.websiteMultiCtrl.setValue(this.websites[1]);
  this.filteredWebsitesMulti.next(this.websites); // Initialize with all websites.
  this.websiteMultiFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterWebsiteMulti();
    });
  /////////-----------------------------
  ///added for modelnames

  this.modelnameMultiCtrl.setValue(this.modelNameList[1]);

  this.filteredmodelnameMulti.next(this.modelNameList); // Initialize with all websites.

  this.modelnameMultiFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filtermodelnameMulti();
    });
  console.log("classmodeldata",this.myModelData);
    // debugger;
    this.buildForm=this.fb.group({
      checkboxes: this.fb.array([]),
      environment:['', Validators.required],
      selectedMicroservice:['', Validators.required],
      selectedBrand:[[], Validators.required],
      sourceType:['', Validators.required],
      selectedifu:['', Validators.required],
      //language:['',Validators.required],
      testcaseNumber:[''],
      tableName:[''],
      deliveryVersion:['', Validators.required], 
     // selectedValues:[''],
      selectedWebsites: [[]],
      selectedModelNames: [[], Validators.required]
 
      //testCase:['']
    })
      // Initialize the checkboxes based on the selectedCheckboxes array
      this.items.forEach(item => {
        const selected = this.selectedCheckboxes.includes(item.name);
        this.addCheckbox(item, selected);
      });
   // this.buildFormControls();
  }
    // Helper function to add checkboxes to the form
    addCheckbox(item: { id: number, name: string }, selected: boolean) {
      const control = this.buildForm.get('checkboxes') as FormArray;
      const formControl = this.fb.control(selected);
      control.push(formControl);
    }
  
    // Function to update the selectedCheckboxes array
    updateSelectedCheckboxes() {
      this.selectedCheckboxes = this.buildForm.value.checkboxes
        .map((value: boolean, index: number) => (value ? this.items[index].name : null))
        .filter((value: number | null) => value !== null);
    }

  
    submit() {
      debugger;
      console.log('Form Value Before Submission:', this.buildForm.value);

      if (this.buildForm.valid) {
        const formData = this.buildForm.value;
        console.log('Form Data:', formData);
        // Implement your form submission logic here

        // this.buildprocessService.postData(formData).subscribe(response => {
        //   // Handle the response from the service here
        //   console.log('Response from service:', response);
        // })      
      }
         else {
        this.markFormGroupTouched(this.buildForm);
        console.log('Form is Invalid');
      }
    }

  onBrandNameChange(event: any) {
    debugger;
    //console.log(tenantId[0]);
    const brandId = event.brandId;
    console.log('brandId',brandId);
    //this.buildprocessService.getAllSourceTypeByBrandName(employeeId).subscribe(data => {
      this.buildprocessService.getAllModelNameByBrandName(brandId).subscribe(data => {
        this.modelNameList = data
        console.log("APIIIModeldataAPI",data)
      
    });
    if (event) {
      this.brandNameSelected = true;
    } else {
      this.brandNameSelected = false;
    }
}
 ////
 ngAfterViewInit() {
  this.setInitialValue();
  this.setInitialValueModelName();
}
ngOnDestroy() {
  this._onDestroy.next();
  this._onDestroy.complete();
}

private setInitialValue() {
  this.filteredWebsitesMulti
    .pipe(take(1), takeUntil(this._onDestroy))
    .subscribe(() => {
      this.multiSelect.compareWith = (a: Website, b: Website) => a && b && a.id === b.id;
    });
}
private setInitialValueModelName() {
  this.filteredmodelnameMulti
    .pipe(take(1), takeUntil(this._onDestroy))
    .subscribe(() => {
      this.multiSelect.compareWith = (a: Website, b: Website) => a && b && a.id === b.id;
    });
}
private filterWebsiteMulti() {
  if (!this.websites) {
    return;
  }
  let search = this.websiteMultiFilterCtrl.value;
  if (!search) {
    this.filteredWebsitesMulti.next(this.websites.slice());
    return;
  } else {
    search = search.toLowerCase();
  }

  this.filteredWebsitesMulti.next(
    this.websites.filter(website => website.name.toLowerCase().includes(search))
  );

  // Update the selectedWebsiteValues control in the form
  this.buildForm.get('selectedWebsiteValues')?.setValue(this.websiteMultiCtrl.value);
}
/// added below for modelname multisearch
private filtermodelnameMulti() {
  if (!this.modelNameList) {
    return;
  }

  let search = this.modelnameMultiFilterCtrl.value;
  if (!search) {
    this.filteredmodelnameMulti.next(this.modelNameList.slice());
    return;
  } else {
    search = search.toLowerCase();
  }

  this.filteredmodelnameMulti.next(
    this.modelNameList.filter(website => website.saleS_TYPE.toLowerCase().includes(search))
  );

  // Update the selectedWebsiteValues control in the form
  this.buildForm.get('selectedModelNameValues')?.setValue(this.modelnameMultiCtrl.value);
}
onModelNameSelectionChange(event: any) {
  debugger;
  if (this.modelNameList.length === 0) {
    this.modelError = "Please select the brand name.";
  } else {
    this.modelError = ""; // Clear the error message if modelNameList has data.
  }

}
onSubmit() {

  debugger;
  // Check if the form is valid
 if (this.buildForm.valid) {
  this.updateSelectedCheckboxes();
    
  // Use selectedCheckboxes as needed
  console.log(this.selectedCheckboxes);
    const environment = this.buildForm.value.environment;
    const deliveryVersion=this.buildForm.value.deliveryVersion;
    const testcaseNumber=this.buildForm.value.testcaseNumber;
    const selectedBrandId=this.buildForm.value.selectedBrand.brandId;
    const selectedBrandName=this.buildForm.value.selectedBrand.brandName;
    const selectedMicroservice=this.buildForm.value.selectedMicroservice;
    const selectedModelNames=this.buildForm.value.selectedModelNames;
    const selectedWebsites=this.buildForm.value.selectedWebsites;
    const selectedifu=this.buildForm.value.selectedifu;
    const sourceType=this.buildForm.value.sourceType;
    const tableName=this.buildForm.value.tableName;
console.log(environment);
this.myModelData.environment=environment;
this.myModelData.deliveryVersion=deliveryVersion;
this.myModelData.testcaseNumber=testcaseNumber;
this.myModelData.selectedBrandId=selectedBrandId;
this.myModelData.selectedBrandName=selectedBrandName;
this.myModelData.selectedMicroservice=selectedMicroservice;
this.myModelData.selectedModelNames=selectedModelNames;
this.myModelData.selectedWebsites=selectedWebsites;
this.myModelData.selectedifu=selectedifu;
this.myModelData.sourceType=sourceType;
this.myModelData.tableName=tableName;
this.myModelData.Selectedlanguages=this.selectedCheckboxes;
console.log("classmodeldata",this.myModelData);
console.log('Selected Item IDs:', this.selectedItems);
const myObject = {
  username:['dd','dd'],
  Password: 'dddd', // Fill in the Password value if needed
};
this.buildprocessService.sendDataToAPI(this.myModelData).subscribe(
  (response) => {
    console.log('API response:', response);
  },
  (error) => {
    console.error('API error:', error);
  }
);
this.buildForm.reset();
}
else {
  this.markFormGroupTouched(this.buildForm);
  console.log('Form is Invalid');
}
} 
private markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach((control) => {
    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    } else {
      control.markAsTouched();
    }
  });
}
toggleSelection(itemId: number) {
  if (this.selectedItems.includes(itemId)) {
    // Item is selected, remove its ID from the selected items array
    this.selectedItems = this.selectedItems.filter((id) => id !== itemId);
    console.log('Selected Item IDs:', this.selectedItems);
  } else {
    // Item is not selected, add its ID to the selected items array
    this.selectedItems.push(itemId);
    console.log('Selected Item IDs:', this.selectedItems);
  }
}



}

