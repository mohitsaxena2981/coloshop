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
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
})
export class NewArrivalComponent implements OnInit {
  newArrivalItems!: Item[];
  categories!: Category[];
  filter!: string;
  showList = true;
  searchLaunch = false;
  searchDataFiltered!: Item[];
  searchForm!: FormGroup;
  priceFilterForm: FormGroup;
  pageSize = 16;
  pagedItems: Item[] = [];
  currentPage = 0;

  constructor(
    private itemsService: ItemsService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private searchPipe: SearchPipe,
    private router: Router
  ) {
    this.filter = 'All';
    this.searchForm = this.formBuilder.group({
      term: [''],
    });
    this.priceFilterForm = this.formBuilder.group({
      maxPrice: [''],
    });
  }

  ngOnInit(): void {
    this.getNewArrivalItems();
    this.getCategories();
  }

  @ViewChild('categorySelect') categorySelect: MatSelect;

  getHikedPrice(originalPrice: number): number {
    const discountedPrice = originalPrice * 1.2;
    return Math.ceil(discountedPrice);
  }

  getNewArrivalItems(): void {
    this.itemsService.getAllItems().subscribe(
      (items) => {
        this.newArrivalItems = items.filter((item) => item.newArrival === true);
        this.paginateItems();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  changeClient(value: string) {
    this.searchLaunch = false;
    this.filter = value;
    this.showList = this.filter === 'All';
    this.priceFilterForm.reset();
    this.filterItems();
  }
  applyPriceFilter() {
    const maxPrice = this.priceFilterForm.get('maxPrice')?.value;
    if (maxPrice !== null) {
      this.searchDataFiltered = this.newArrivalItems.filter(
        (item) => item.price <= maxPrice
      );
      this.searchLaunch = true;
      this.filterItems();
    }
  }

  filterItems() {
    if (this.filter === 'All') {
      this.showList = true;
      this.paginateItems();
    } else {
      this.showList = false;
      this.searchDataFiltered = this.searchDataFiltered.filter(
        (item) => item.category?.name === this.filter
      );
      this.paginateItems();
    }
  }

  onSubmit() {
    this.searchLaunch = true;
    const term = this.searchForm.get('term')?.value;
    this.searchDataFiltered = this.searchPipe.transform(
      this.newArrivalItems,
      term
    );
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
      this.pagedItems = this.newArrivalItems.slice(startIndex, endIndex);
    } else {
      this.pagedItems = this.searchDataFiltered.slice(startIndex, endIndex);
    }
  }

  getMaxPrice(): number {
    const maxPrice = Math.max(
      ...this.newArrivalItems.map((item) => item.price)
    );
    return maxPrice;
  }
}
