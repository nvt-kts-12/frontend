import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {EventTypes} from "../../../shared/constants/event-types";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() onChange = new EventEmitter();

  searchTerm: string = "";
  searchChanged: Subject<string> = new Subject<string>();

  constructor() { 
    this.searchChanged.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.onChange.emit(this.searchTerm);

    })
  }

  ngOnInit() {
  }

  search(text: string) {
    this.searchChanged.next(text);
  }


}
