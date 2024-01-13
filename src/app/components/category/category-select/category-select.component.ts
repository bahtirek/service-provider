import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProviderProfileService } from '../../../pages/provider/provider-profile.service';
import { ServiceCategory } from '../../../shared/interfaces/service-category.interface';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.scss'
})
export class CategorySelectComponent {
  private providerService = inject(ProviderProfileService);
  allCategorys: ServiceCategory[] = [];
  category: number | null = null;
  nullValue: null = null;

  ngOnInit(){
    this.getCategory()
  }

  @Output() onCategorySelect = new EventEmitter<number>();

  getCategory() {
    this.providerService.getCategory().subscribe({
      next:(response: any) => {
        this.allCategorys = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onSelect(value: any){
    if(value) this.onCategorySelect.emit(value)
  }

}
