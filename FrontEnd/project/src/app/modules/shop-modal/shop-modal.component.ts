import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';

@Component({
  selector: 'app-shop-modal',
  standalone: true,
  imports: [],
  templateUrl: './shop-modal.component.html',
  styleUrl: './shop-modal.component.scss'
})
export class ShopModalComponent implements OnInit {
  @Input() data: any | undefined;
  @Output() closedEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  public close(): void {
    this.closedEvent.emit(true);
  }
}
