using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using ValantDemoApi.Models;
using ValantDemoApi.Services;

namespace ValantDemoApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class MazesController : ControllerBase
  {
    private IMazeCollectorService _mazeCollector;
    private readonly ILogger<MazesController> _logger;

    public MazesController(ILogger<MazesController> logger, IMazeCollectorService mazeCollector)
    {
      _logger = logger;
      _mazeCollector = mazeCollector;
    }

    [HttpGet]
    public IEnumerable<Maze> GetMazes() => this._mazeCollector.GetMazes();

    [HttpPost]
    public void PostMaze([FromBody] Maze maze) => this._mazeCollector.AddMaze(maze);
  }
}
