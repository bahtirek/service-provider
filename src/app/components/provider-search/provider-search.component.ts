import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProviderService } from '../../shared/services/provider.service';
import { FormErrorComponent } from '../../shared/form-helpers/form-error/form-error.component';
import { FormsModule } from '@angular/forms';
import { Provider } from '../../shared/interfaces/provider.interface';

@Component({
  selector: 'app-provider-search',
  standalone: true,
  imports: [FormErrorComponent, FormsModule],
  templateUrl: './provider-search.component.html',
  styleUrl: './provider-search.component.scss'
})
export class ProviderSearchComponent {
  private providerService = inject(ProviderService);
  searchKeyword: string = "";
  errorMessage: string = "";
  category: any | null = null;

  @Output() foundProviders: EventEmitter<Provider[]> = new EventEmitter();

  ngOnInit() {
    this.searchProviders()
  }

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
}

