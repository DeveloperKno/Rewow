import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  public listProduct: Product[] = [];

  // form: FormGroup;

  constructor(private _productService: ProductService) {
    // this.form = this.fb.group({
    //   pet: [null],
    // });
  }

  ngOnInit(): void {
    this.loadProduct();

    // this.form.get('pet')?.valueChanges.subscribe((pet) => {
    //   if (pet) {
    //     this.history = pet.history || [];
    //   } else {
    //     this.history = [];
    //   }
    // });
  }

  loadProduct() {
    this._productService.listProduct().subscribe({
      next: (res) => ((this.listProduct = res), console.log('product: ', res)),
      error: (err) => {
        console.error('Error al cargar tipos de mascota', err);
      },
    });
  }

  sellProduct(selected: any) {
    console.log('vender: ', selected);
  }
}
