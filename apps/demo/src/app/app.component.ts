import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoggingService } from './logging/logging.service';
import { Maze, getMazeViewport, getMazeStart, IMaze, convertFileToMazeCells } from './maze/maze.model';
import { CellType, isTraversable } from './cell/cell.model';
import { MazesService } from './mazes/mazes.service';

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  private fileReader: FileReader;
  public title = 'Valant demo';
  public data: string[];

  public currentMaze: Maze | null;
  public currentMazeSolved: boolean;
  public mazes: IMaze[];
  public viewport: Maze | null;
  public playerPosition: number[] | null;

  selectedMazeForm: FormGroup;
  mazeUploadForm: FormGroup;
  protected uploadedFileContents: string = "";

  constructor(private logger: LoggingService, private mazesService: MazesService) {
    this.mazes = [];
    this.currentMaze = null;
    this.currentMazeSolved = false;
    this.viewport = null;
    this.playerPosition = null;
    this.fileReader = new FileReader();
    this.fileReader.onload = (event) => {
      // TODO: file format validation?
      this.uploadedFileContents = event?.target?.result?.toString();
    };
  }
  
  ngOnInit() {
    this.logger.log('Welcome to the AppComponent');
    this.mazeUploadForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required])
    });
    this.selectedMazeForm = new FormGroup({
      selectedMaze: new FormControl('', [Validators.required])
    });
    this.mazesService.getMazes().subscribe(result => {
      if(result.length > 0) {
        this.mazes = this.mazes.concat(result);
        this.logger.log('Mazes retrieved from server')
      }
    });
  }

  onFileChange(event: any) {
    if (event?.target?.files?.length > 0) {
      const file = event.target.files[0];
      if (file) {
        this.fileReader.readAsText(file as File); // parse uploaded file -> this.uploadedFileContents
        this.logger.log('File was read.')
      }
      else {
        // TODO: something happened - alert user
        this.logger.error('Something unexpected happened during file upload.')
      }
    }
  }

  addNewMaze() {
    const newMaze = new Maze({
      name: this.mazeUploadForm.get('name')?.value,
      cells: convertFileToMazeCells(this.uploadedFileContents)
    });
    this.mazes.push(newMaze);
    this.mazesService.postMaze(newMaze).subscribe();
    this.mazeUploadForm.reset();
    this.logger.log('Maze was uploaded.');
  }

  startMaze() {
    this.currentMaze = this.mazes.find( (m) => m.name == this.selectedMazeForm.get('selectedMaze')?.value );
    this.playerPosition = getMazeStart(this.currentMaze);
    this.updateViewport();
    this.logger.log('Maze was started.');
  }
  
  updateViewport() {
    const [row, col] = this.playerPosition;
    this.currentMazeSolved = (this.currentMaze.cells[row][col] === CellType.END);
    this.viewport = getMazeViewport(this.currentMaze, row, col);
  }

  @HostListener('document:keyup', ["$event"])
  handleTypedInput(event) {
    if(this.currentMaze !== null && !this.currentMazeSolved){
      const [UP, DOWN, LEFT, RIGHT] = [38, 40, 37, 39];
      switch (event.keyCode) {
        case UP:
          this.goUp();
          break;
        case DOWN:
          this.goDown();
          break;
        case LEFT:
          this.goLeft();
          break;
        case RIGHT:
          this.goRight();
          break;
        default:
          break;
      }
    }
  }

  goUp() {
    if (this.currentMaze !== null) {
      const [p_r, p_c] = this.playerPosition;
      if(p_r - 1 >= 0){
        if(isTraversable(this.currentMaze.cells[p_r-1][p_c]))
        {
          this.playerPosition = [p_r-1, p_c];
          this.updateViewport();
          this.logger.log('Ventured up.');
        }
        this.logger.log('Something has blocked the player from going up.');
      }
      this.logger.log('Cannot go up - out of bounds.');
    }
  }

  goDown() {
    if (this.currentMaze !== null) {
      const [p_r, p_c] = this.playerPosition;
      if(p_r + 1 < this.currentMaze.cells.length){
        if(isTraversable(this.currentMaze.cells[p_r+1][p_c]))
        {
          this.playerPosition = [p_r+1, p_c];
          this.updateViewport();
          this.logger.log('Ventured down.');
        }
        this.logger.log('Something has blocked the player from going down.');
      }
      this.logger.log('Cannot go down - out of bounds.');
    }
  }

  goLeft() {
    if (this.currentMaze !== null) {
      const [p_r, p_c] = this.playerPosition;
      if(p_c - 1 >= 0){
        if(isTraversable(this.currentMaze.cells[p_r][p_c-1]))
        {
          this.playerPosition = [p_r, p_c-1];
          this.updateViewport();
          this.logger.log('Ventured left.');
        }
        this.logger.log('Something has blocked the player from going left.');
      }
      this.logger.log('Cannot go left - out of bounds.');
    }
  }

  goRight() {
    if (this.currentMaze !== null) {
      const [p_r, p_c] = this.playerPosition;
      if(p_c + 1 < this.currentMaze.cells[p_r].length){
        if(isTraversable(this.currentMaze.cells[p_r][p_c+1]))
        {
          this.playerPosition = [p_r, p_c+1];
          this.updateViewport();
          this.logger.log('Ventured right.');
        }
        this.logger.log('Something has blocked the player from going right.');
      }
      this.logger.log('Cannot go right - out of bounds.');
    }
  }
}
