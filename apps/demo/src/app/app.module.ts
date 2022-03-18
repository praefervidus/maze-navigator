import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoggingService } from './logging/logging.service';
import { environment } from '../environments/environment';
import { MazeComponent } from './maze/maze.component';
import { CellComponent } from './cell/cell.component';
import { MazesService } from './mazes/mazes.service';
import { ValantDemoApiClient } from './api-client/api-client';

export function getBaseUrl(): string {
  return environment.baseUrl;
}

@NgModule({
  declarations: [AppComponent, MazeComponent, CellComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [LoggingService, ValantDemoApiClient.Client, MazesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
