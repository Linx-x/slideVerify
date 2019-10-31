<template>
  <div id="slideVerifyCon"
       @mouseup="hout"
       @mouseleave="hout"
       @mousemove="hmousemove">
    <div class="container"
         @mouseleave="out">
      <canvas id="myCanvas"
              width="400"
              height="250"></canvas>
      <!-- <img src="./assets/bianselong.png"  class="bianselong"/> -->
      <canvas id="myCanvas2"
              width="400"
              height="250"></canvas>

    </div>

    <div class="huakuai"
         @mousedown="hmousedown"
         @mouseleave="out">></div>
  </div>
</template>

<script>
import Img1 from './bianselong.png'
export default {
  name: 'slideVerify',
  data: function () {
    return {
      xleft: 0,
      hold: false
    }
  },
  mounted () {
    this.drawPic()
  },
  methods: {
    out: function (event) {
      event.stopPropagation()
    },
    getStyle: function (obj, attr) {
      return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
    },

    hmousedown: function (event) {
      this.hold = true
      let oleft = this.getStyle(document.getElementsByClassName('huakuai')[0], 'left')
      this.xleft = event.clientX - parseInt(oleft)
    },
    // 滑动
    hmousemove: function (event) {
      if (this.hold) {
        if ((event.clientX - this.xleft) >= 170) {
          document.getElementsByClassName('huakuai')[0].style.left = '170px'
          document.getElementById('myCanvas').style.left = '95px'
        } else if ((event.clientX - this.xleft) <= 5) {
          document.getElementsByClassName('huakuai')[0].style.left = '0px'
          document.getElementById('myCanvas').style.left = '-75px'
        } else {
          document.getElementsByClassName('huakuai')[0].style.left = event.clientX - this.xleft + 'px'
          document.getElementById('myCanvas').style.left = -75 + event.clientX - this.xleft + 'px'
        }
      }
    },
    hout: function (event) {
      event.stopPropagation()
      if (this.hold) {
        var left = parseInt(document.getElementsByClassName('huakuai')[0].style.left)
        if (left > 73 && left < 77) {
          console.log('success!')
          this.$emit('resultHandle', true)
        } else {
          this.$emit('resultHandle', false)
        }
        this.hold = false
      }
    },
    mathr: function (max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    drawPic: function () {
      var image1 = new Image()
      image1.src = Img1
      // eslint-disable-next-line one-var
      var x = 150, y = 50, w = 50, r = 10
      var ctx = document.getElementById('myCanvas').getContext('2d')
      var ctx2 = document.getElementById('myCanvas2').getContext('2d')

      image1.onload = function () {
        ctx.save()
        // ctx.drawImage(image1,0,0, 1415, 968, 0, 0, 400, 250);
        ctx.strokeStyle = '#000'
        // ctx.lineWidth = 10;

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + w / 2, y)
        ctx.arc(x + w / 2, y - r + 2, r, 0, 2 * Math.PI, false)
        ctx.lineTo(x + w / 2, y)
        ctx.lineTo(x + w, y)
        ctx.lineTo(x + w, y + w / 2)
        ctx.arc(x + w + r - 2, y + w / 2, r, 0, 2 * Math.PI, false)
        ctx.lineTo(x + w, y + w / 2)
        ctx.lineTo(x + w, y + w)
        ctx.lineTo(x, y + w)
        ctx.closePath()
        ctx.clip()
        ctx.stroke()
        ctx.drawImage(image1, 0, 0, image1.width, image1.height, 0, 0, 400, 250)

        ctx.restore()

        // ctx.beginPath();
        // ctx.arc(x,y+w/2,r,1.5*Math.PI, 0.5*Math.PI);
        // ctx.fillStyle = 'rgba(0,0,0,0.2)';
        // ctx.fill();

        // ctx.fillStyle = 'green';
        // ctx.fillRect(0, 0, 10, 10);

        // 背景
        ctx2.save()
        ctx2.strokeStyle = '#fff'
        ctx2.fillStyle = '#fff'
        // ctx2.lineWidth = 10;
        ctx2.drawImage(image1, 0, 0, image1.width, image1.height, 0, 0, 400, 250)
        ctx2.beginPath()
        ctx2.moveTo(x, y)
        ctx2.lineTo(x + w / 2, y)
        ctx2.arc(x + w / 2, y - r + 2, r, 0, 2 * Math.PI, false)
        ctx2.lineTo(x + w / 2, y)
        ctx2.lineTo(x + w, y)
        ctx2.lineTo(x + w, y + w / 2)
        ctx2.arc(x + w + r - 2, y + w / 2, r, 0, 2 * Math.PI, false)
        ctx2.lineTo(x + w, y + w / 2)
        ctx2.lineTo(x + w, y + w)
        ctx2.lineTo(x, y + w)
        ctx2.closePath()
        ctx2.stroke()
        ctx2.fill()

        ctx2.restore()
      }
    }

  }
}
</script>

<style scoped>
#slideVerifyCon {
  width: 200px;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px 1px #ccc;
  border-radius: 8px;
}
#myCanvas {
  width: 200px;
  height: 125px;
  position: absolute;
  left: -75px;
  z-index: 5;
}
#myCanvas2 {
  width: 200px;
  height: 125px;
  position: relative;
  z-index: 4;
}

.huakuai {
  height: 30px;
  line-height: 30px;
  width: 30px;
  background: #ccc;
  color: white;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
  position: relative;
  font-weight: bolder;
  user-select: none;
}
.container {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}
.bianselong {
  width: 800px;
  height: 500px;
}
</style>
 