import { Component, OnInit } from '@angular/core';
import { ShopModalComponent } from '../shop-modal/shop-modal.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ShopModalComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  isModalClosed: boolean = true;
  productInfo: any = ['test'];

  ngOnInit(): void {
  }

  public showModal(): void {
    this.isModalClosed = false;
  }
  public receiveData(data: boolean) {
    this.isModalClosed = data;
  }

}
