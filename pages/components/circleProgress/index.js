/* components/circle/circle.js */
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    r: {
      type: Number,
      value: 100,
    },
    w: {
      type: Number,
      value: 3,
    },
    steps: {
      type: Number,
      value: 0,
    }
  },

  data: { /*  私有数据，可用于模版渲染 */
    size: 0,
    /* 圆环盒子大小 size >= 2*x ( x 为canvas的绘制半径)*/
    step: 1,
    bgImg: '',
    drawImg: '',
  },


  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  ready: function() {
    this.updateSteps(this.properties.steps)
  },

  observers: {
    'steps': function(steps) {
      this.updateSteps(steps)
    }
  },

  methods: {
    /*
     * 有关参数
     * x : canvas 绘制圆形的半径 
     * w : canvas 绘制圆环的宽度 
     */
    drawCircleBg: function(x, w) {
      // 设置圆环外面盒子大小 宽高都等于圆环直径
      this.setData({
        size: 2 * x // 更新属性和数据的方法与更新页面数据的方法类似
      });
      // 使用 wx.createContext 获取绘图上下文 ctx  绘制背景圆环
      var ctx = wx.createCanvasContext('bg', this)
      ctx.setLineWidth(w);
      ctx.setStrokeStyle('#EAEDF2');
      ctx.setLineCap('round')
      ctx.beginPath(); //开始一个新的路径
      //设置一个原点(x,y)，半径为r的圆的路径到当前路径 此处x=y=r
      ctx.arc(x, x, x - w, 0, 2 * Math.PI, false);
      ctx.stroke(); //对当前路径进行描边
      ctx.draw(false, () => {
        setTimeout(() => {
          this.canvasToTempImage('bg', 'bgImg');
        }, 100);
      })
    },
    drawCircle: function(x, w, step) {
      // 使用 wx.createContext 获取绘图上下文 context  绘制彩色进度条圆环
      var context = wx.createCanvasContext('draw', this);
      // 设置渐变
      var gradient = context.createLinearGradient(2 * x, x, 0);
      // gradient.addColorStop("0", "#2661DD");
      // gradient.addColorStop("0.5", "#40ED94");
      // gradient.addColorStop("1.0", "#5956CC");
      gradient.addColorStop("1.0", "#FFD100");
      context.setLineWidth(w);
      context.setStrokeStyle(gradient);
      context.setLineCap('round')
      context.beginPath(); //开始一个新的路径
      // step 从0到2为一周
      context.arc(x, x, x - w, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke(); //对当前路径进行描边
      // 绘制彩色圆环进度条
      context.draw(false, () => {
        setTimeout(() => {
          this.canvasToTempImage('draw', 'drawImg');
        }, 100);
      })
    },

    /* 内部私有方法建议以下划线开头 ，
     * 自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项 */
    _runEvent() {
      //触发自定义组件事件
      this.triggerEvent("runEvent")
    },

    canvasToTempImage: function(canvasId, img) {
      wx.canvasToTempFilePath({
        canvasId: canvasId,
        success: (res) => {
          let tempFilePath = res.tempFilePath;
          this.setData({
            [img]: tempFilePath,
          });
        }
      }, this);

    },

    updateSteps: function(steps) {
      const {
        r,
        w
      } = this.properties
      let count = 0;
      this.drawCircleBg(r, w)
      // if (steps > 0) {
      this.drawCircle(r, w, steps * 2 / 100)
      // }
      // if (steps > 0) {
      //   let countTimer = setInterval(() => {
      //     if (count <= steps * 2) {
      //       // 绘制彩色圆环进度条
      //       this.drawCircle(r, w, count / 100)
      //       count++;
      //     } else {
      //       clearInterval(countTimer);
      //     }
      //   }, 10)
      // }
    }
  },
})