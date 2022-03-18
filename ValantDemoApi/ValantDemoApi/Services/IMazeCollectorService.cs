using System.Collections.Generic;
using ValantDemoApi.Models;

namespace ValantDemoApi.Services
{
  public interface IMazeCollectorService
  {
    public ICollection<Maze> GetMazes();
    public void AddMaze(Maze maze);
  }
}