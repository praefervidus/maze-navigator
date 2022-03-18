import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ValantDemoApiClient } from '../api-client/api-client';
import { IMaze, Maze, convertFileToMazeCells } from '../maze/maze.model';
import { MazesService } from './mazes.service';

describe('MazesService', () => {
  let service: MazesService;
  let testMaze: Maze;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MazesService, ValantDemoApiClient.Client]
    });
    service = TestBed.inject(MazesService);
    testMaze = new Maze({name: "Test", cells: convertFileToMazeCells("XXX\nOOO\nXXX")});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have nothing initially', async () => {
    service.getMazes().subscribe((response: IMaze[])=> {
      expect(response.length).toBe(0);
    });
  });

  it('should have one maze after uploading one', async () => {
    await service.postMaze(testMaze);
    service.getMazes().subscribe((response: IMaze[])=> {
      expect(response.length).toBe(1);
    });
  });
});
