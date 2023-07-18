import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { SearchPipe } from 'src/app/Pipes/search-pipe/search-pipe.component';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  items!: Item[];
  categories!: Category[];
  filter!: string;
  showList = true;
  searchLaunch = false;
  searchDataFiltered!: Item[];
  searchForm!: FormGroup;

  pageSize = 16;
  pagedItems: Item[] = [];
  currentPage = 0;

  constructor(
    private itemService: ItemsService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private searchPipe: SearchPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.getCategories();

    this.searchForm = this.formBuilder.group({
      term: [''],
    });

    this.searchDataFiltered = [];
    this.items = [];
  }

  @ViewChild('categorySelect') categorySelect: MatSelect;

  ngAfterViewInit() {
    const optionsLength = this.categorySelect.options.length;
    if (optionsLength > 3) {
      this.categorySelect.panelClass = 'scrollable-dropdown';
    }
  }

  getItems() {
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
      this.paginateItems();
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  changeClient(value: string) {
    this.searchLaunch = false;
    this.filter = value;
    this.showList = false;
    if (this.filter === 'All') {
      this.showList = true;
    }
    this.filterItems();
  }

  filterItems() {
    if (!this.filter || this.filter === 'All') {
      this.showList = true;
      this.paginateItems();
    } else {
      this.showList = false;
      this.searchDataFiltered = this.items.filter(
        (item) => item.category?.name === this.filter
      );
      this.paginateItems();
    }
  }

  onSubmit() {
    this.searchLaunch = true;

    const term = this.searchForm.get('term')?.value;
    this.searchDataFiltered = this.searchPipe.transform(this.items, term);
    this.paginateItems();
  }

  forwardToSingleItem(itemId: string) {
    this.router.navigate(['/items/single-item/' + itemId]);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateItems();
  }

  paginateItems() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    if (!this.searchLaunch) {
      this.pagedItems = this.items.slice(startIndex, endIndex);
    } else {
      this.pagedItems = this.searchDataFiltered.slice(startIndex, endIndex);
    }
  }

  getNewArrivalItems() {
    this.itemService.getNewArrivalItems().subscribe((items) => {
      this.items = items;
      this.paginateItems();
    });
  }
}
