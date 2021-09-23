import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastPage: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load(page = 1) {
    this.productService.all(page).subscribe((res) => {
      this.products = res.data;
      this.lastPage = res.meta.lastPage;
    });
  }

  delete(id: number) {
    if (confirm('Are you sure want to delete this record?')) {
      this.productService.delete(id).subscribe(() => {
        this.products = this.products.filter((u) => u.id !== id);
      });
    }
  }
}
