import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';
import { IMaze } from '../maze/maze.model';

@Injectable({
  providedIn: 'root',
})
export class MazesService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getMazes(): Observable<IMaze[]> {
    return this.httpClient.mazesAll();
  }

  public postMaze(maze: IMaze): Observable<void> {
    return this.httpClient.mazes(maze);
  }
}
