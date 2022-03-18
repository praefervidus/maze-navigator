import { Component, Input, OnInit } from '@angular/core';
import { Maze } from './maze.model';

@Component({
  selector: 'valant-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.less']
})
export class MazeComponent implements OnInit {

  @Input() maze : Maze | null;

  ngOnInit(): void {
  }

}
