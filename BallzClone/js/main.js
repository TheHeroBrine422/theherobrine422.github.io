player = {"score":0, "balls":1, "grid":[], "ballCoord": 250}
// perm settings
rows = 7
columns = 7
// colors
HeaderColor = "#777777"
mainColor = "#aaaaaa"
boxColor = '#ff0000'
circleColor = '#ffffff'

// B in grid equals a extra ball if hit.

var ctx = document.getElementById("canvas").getContext("2d")
ctx.beginPath()
ctx.rect(0,0,500,800)
ctx.fillStyle = mainColor
ctx.fill()
ctx.lineWidth = 0
ctx.StrokeStyle = '#000000'
ctx.stroke()

for (var i = 0; i < rows; i++) {
  player.grid.push([])
  for (var j = 0; j < columns; j++) {
    //player.grid[i][j] = "0"
    player.grid[i][j] = String(Math.floor(Math.random()*100000))
  }
}
player.grid[2][5] = "B"

ctx.beginPath()
ctx.rect(0,0,500,60)
ctx.fillStyle = HeaderColor
ctx.fill()
ctx.lineWidth = 0
ctx.StrokeStyle = '#000000'
ctx.stroke()

ctx.beginPath()
ctx.rect(0,740,500,60)
ctx.fillStyle = HeaderColor
ctx.fill()
ctx.lineWidth = 0
ctx.StrokeStyle = '#000000'
ctx.stroke()

ctx.fillStyle = 'white'
ctx.font = '48px serif'
ctx.textAlign = "center"
ctx.fillText(player.score, 250,50)

function drawGrid() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      console.log(i+","+j)
      if (!isNaN(Number(player.grid[i][j])) && player.grid[i][j] != 0) {
        ctx.beginPath()
        ctx.rect(10+(j*70),140+(i*70),60,60)
        ctx.fillStyle = boxColor
        ctx.fill()
        ctx.lineWidth = 0
        ctx.StrokeStyle = '#000000'
        ctx.stroke()
        ctx.fillStyle = 'white'
        ctx.font = '18px serif'
        ctx.textAlign = "center"
        ctx.fillText(player.grid[i][j], 10+(j*70)+30, 140+(i*70)+30+5)
      } else if (player.grid[i][j] == "B") {
        ctx.beginPath()
        ctx.arc(10+(j*70)+30, 140+(i*70)+30, 25, 0, 2 * Math.PI, false)
        ctx.fillStyle = circleColor
        ctx.fill()
        ctx.lineWidth = 0
        ctx.StrokeStyle = '#003300'
        ctx.stroke()
      } else {
      }
    }
  }
}

drawGrid()
