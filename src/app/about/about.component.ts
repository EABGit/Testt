import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    // Add more items as needed
  ];

  form!: FormGroup;
  selectedCheckboxes: number[] = this.items.map(item => item.id); // Select all items by default

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      checkboxes: this.formBuilder.array([])
    });

    // Initialize the checkboxes based on the selectedCheckboxes array
    this.items.forEach(item => {
      const selected = this.selectedCheckboxes.includes(item.id);
      this.addCheckbox(item, selected);
    });
  }

  // Helper function to add checkboxes to the form
  addCheckbox(item: { id: number, name: string }, selected: boolean) {
    const control = this.form.get('checkboxes') as FormArray;
    const formControl = this.formBuilder.control(selected);
    control.push(formControl);
  }

  // Function to update the selectedCheckboxes array
  updateSelectedCheckboxes() {
    this.selectedCheckboxes = this.form.value.checkboxes
      .map((value: boolean, index: number) => (value ? this.items[index].id : null))
      .filter((value: number | null) => value !== null);
  }

  // Submit function to get the selected checkboxes
  onSubmit() {
    this.updateSelectedCheckboxes();
    
    // Use selectedCheckboxes as needed
    console.log(this.selectedCheckboxes);
  }
}

	


// import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { MatSelect } from '@angular/material/select';
// import { ReplaySubject, Subject } from 'rxjs';
// import { take, takeUntil } from 'rxjs/operators';
// import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
// interface Website {
//   id: string;
//   name: string;
// }

// @Component({
//   selector: 'app-about',
//   templateUrl: './about.component.html',
//   styleUrls: ['./about.component.css']
// })
// export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
//   title = 'app-material3';

//   protected websites: Website[] = [
//     { id: '1', name: 'ItSolutionStuff.com' },
//     { id: '2', name: 'HDTuto.com' },
//     { id: '3', name: 'Nicesnippets.com' },
//     { id: '4', name: 'Google.com' },
//     { id: '5', name: 'laravel.com' },
//     { id: '6', name: 'npmjs.com' },
//     { id: '7', name: 'Google2.com' },
//   ];

//   public websiteMultiCtrl: FormControl = new FormControl();
//   public websiteMultiFilterCtrl: FormControl = new FormControl();
//   public filteredWebsitesMulti: ReplaySubject<Website[]> = new ReplaySubject<Website[]>(1);

//   @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

//   protected _onDestroy = new Subject<void>();

//   constructor(private popupService: ConfirmationDialogComponent) { }
//   openPopup() {
//     this.popupService.openPopup();
//   }
//   ngOnInit() {
//     this.websiteMultiCtrl.setValue(this.websites[1]);
    
//     this.filteredWebsitesMulti.next(this.websites); // Initialize with all websites.

//     this.websiteMultiFilterCtrl.valueChanges
//       .pipe(takeUntil(this._onDestroy))
//       .subscribe(() => {
//         this.filterWebsiteMulti();
//       });
//       console.log('selected values',this.websiteMultiCtrl);
//   }

//   ngAfterViewInit() {
//     this.setInitialValue();
//   }

//   ngOnDestroy() {
//     this._onDestroy.next(); // No need to pass an argument here.

//     this._onDestroy.complete();
//   }

//   protected setInitialValue() {
//     this.filteredWebsitesMulti
//       .pipe(take(1), takeUntil(this._onDestroy))
//       .subscribe(() => {
//         this.multiSelect.compareWith = (a: Website, b: Website) => a && b && a.id === b.id;
//       });
//   }
//   onSelectionChange(event: any): void {
//     const selectedWebsites = this.websiteMultiCtrl.value;
//    // this.buildForm.get('selectedWebsiteValues').setValue(selectedWebsites);
//   }
//   protected filterWebsiteMulti() {
//     if (!this.websites) {
//       return;
//     }

//     let search = this.websiteMultiFilterCtrl.value;
//     if (!search) {
//       this.filteredWebsitesMulti.next(this.websites.slice());
//       return;
//     } else {
//       search = search.toLowerCase();
//     }

//     this.filteredWebsitesMulti.next(
//       this.websites.filter(website => website.name.toLowerCase().includes(search))
//     );
//   }
// }
