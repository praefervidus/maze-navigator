import { Component, Input, OnInit } from '@angular/core';
import { Cell, CellType } from './cell.model';

@Component({
  selector: 'valant-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;
  iconUrl: string;

  constructor() { }
  ngOnInit(): void {
    switch(this.cell) {
      case CellType.WALL:
        this.iconUrl = "https://cdn-icons-png.flaticon.com/512/95/95474.png";
        break;
      case CellType.PATH:
        this.iconUrl = "https://cdn-icons-png.flaticon.com/512/1179/1179022.png?w=826";
        break;
      case CellType.START:
        this.iconUrl = "https://cdn-icons-png.flaticon.com/512/783/783545.png?w=826";
        break;
      case CellType.END:
        this.iconUrl = "https://cdn-icons-png.flaticon.com/512/1152/1152934.png?w=826";
        break;
      case CellType.PLAYER:
        this.iconUrl = "https://cdn-icons-png.flaticon.com/512/1253/1253710.png"
        break;
      default:
        break;
    }
  }
}
