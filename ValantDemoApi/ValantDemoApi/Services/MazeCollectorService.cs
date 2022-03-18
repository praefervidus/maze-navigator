using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using ValantDemoApi.Models;

namespace ValantDemoApi.Services
{
  public class MazeCollectorService : IMazeCollectorService
  {
    private readonly ILogger<MazeCollectorService> _logger;
    private ICollection<Maze> _mazes;

    public MazeCollectorService(ILogger<MazeCollectorService> logger)
    {
      _logger = logger;
      _mazes = new List<Maze>();
    }

    public void AddMaze(Maze maze)
    {
      this._logger.LogInformation("Maze Added: " + maze.Name);
      this._mazes.Add(maze);
    }
    public ICollection<Maze> GetMazes() => this._mazes;
  }
}