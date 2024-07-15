import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { ProductsService } from '../../../user/products/services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private productSerice: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) { }
  public productForm: FormGroup = this.fb.group({
    nombre_producto: [''],
    precio: [''],
    descripccion: [''],
    stock: [''],
    categoria: [''],
    descuento: [''],
    tipo: ['']
  })
  ngOnInit(): void {
    const id = this.activateRouter.snapshot.paramMap.get('id')
    if (id !== null)
      this.productSerice.getProductById(id.toString()).subscribe(data => {
        this.productForm.patchValue(data)
      })
  }
  updateProduct() {
    const id = this.activateRouter.snapshot.paramMap.get('id')
    if (id !== null)
      this.adminService.updateProduct(+id, this.productForm.value).subscribe(data => {
        if (data.status === 200){
          alert('Product updated successfully');
          this.router.navigate(['/admin/productos']);
        }
      })
  }
}
