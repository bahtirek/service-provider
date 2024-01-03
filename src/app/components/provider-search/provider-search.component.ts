import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProviderService } from '../../shared/services/provider.service';
import { FormErrorComponent } from '../../shared/form-helpers/form-error/form-error.component';
import { FormsModule } from '@angular/forms';
import { Provider } from '../../shared/interfaces/provider.interface';
import { CategorySelectComponent } from '../category-select/category-select.component';
import { CategoryCheckComponent } from '../category-check/category-check.component';

@Component({
  selector: 'app-provider-search',
  standalone: true,
  imports: [FormErrorComponent, FormsModule, CategorySelectComponent, CategoryCheckComponent],
  templateUrl: './provider-search.component.html',
  styleUrl: './provider-search.component.scss'
})
export class ProviderSearchComponent {
  private providerService = inject(ProviderService);
  searchKeyword: string = "";
  errorMessage: string = "";
  category: any | null = null;

  @Output() foundProviders: EventEmitter<Provider[]> = new EventEmitter();

  ngOnInit() {}

  searchProviders() {
    const searchKeyword = this.searchKeyword.trim();
    if (!searchKeyword && !this.category) return;
    const searchQuery = {
      lkCategoryId: null,
      searchKeyword: searchKeyword
    }

    this.providerService.providerSearch(searchQuery).subscribe({
      next: (providers: Provider[]) => {
        this.foundProviders.emit(providers)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onCategoryCheck(categorys: number[]){
    console.log(categorys);

  }

  onCategorySelect(categoryId: number) {
    console.log(categoryId);

  }
}

