using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;
using ValantDemoApi.Models;

namespace ValantDemoApi.Tests
{
    [TestFixture]
    public class ValantDemoApiTests
    {
      private HttpClient client;
      private Maze testMaze;

      [OneTimeSetUp]
        public void Setup()
        {
          var factory = new APIWebApplicationFactory();
          this.client = factory.CreateClient();
          this.testMaze = new Maze(){
            Name="Test",
            Cells=new string[3][]{
              new string[3]{"X","X","X"},
              new string[3]{"O","@","O"},
              new string[3]{"X","O","X"}
            }
          };
        }

        [Test]
        public async Task ShouldReturnEmptyList()
        {
          var result = await this.client.GetAsync("/Mazes");
          result.EnsureSuccessStatusCode();
          var content = JsonConvert.DeserializeObject<IEnumerable<Maze>>(await result.Content.ReadAsStringAsync());
          content.Should().BeEmpty();
        }
        [Test]
        public async Task ShouldReturnOneMaze()
        {
          var package = new StringContent(JsonConvert.SerializeObject(this.testMaze), Encoding.UTF8, "application/json");
          var result = await this.client.PostAsync("/Mazes", package);
          result.EnsureSuccessStatusCode();
          result = await this.client.GetAsync("/Mazes");
          result.EnsureSuccessStatusCode();
          var content = JsonConvert.DeserializeObject<IList<Maze>>(await result.Content.ReadAsStringAsync());
          content.Should().NotBeEmpty();
          content[0].Name.Should().NotBeNull();
          content[0].Cells.Should().NotBeNull();
        }
    }
}
