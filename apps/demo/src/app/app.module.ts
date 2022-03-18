import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoggingService } from './logging/logging.service';
import { MazeComponent } from './maze/maze.component';
import { CellComponent } from './cell/cell.component';
import { MazesService } from './mazes/mazes.service';
import { ValantDemoApiClient } from './api-client/api-client';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, MazeComponent, CellComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [LoggingService, MazesService, ValantDemoApiClient.Client],
  bootstrap: [AppComponent],
})
export class AppModule {}
