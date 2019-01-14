(function () {
  'use strict';

  


          ;(function () {
            function __insertStyle (css) {
              const style = document.createElement('style')
              style.innerHTML = css
              style.type = 'text/css'
              document.head.appendChild(style)
            };
            __insertStyle(".marquee {\r\n  overflow: hidden;\r\n  background: #e2e7ea;\r\n  margin-bottom: 5px;\r\n  color: #2C2E3B;\r\n  padding: 0 15px;\r\n}\r\n.marquee .marquee-target {\r\n  display: inline-block;\r\n}\r\n");
          })();
        

  /**
   * 滚动跑马灯
   * @param {Dom} box 盒子
   * @param {Dom} target 滚动盒子
   * @param {object} options 配置
   * @param {number} options.setp 步长，默认1，向左运动；负值会反向运动
   * @param {boolean} options.autoPlay 是否自动开始
   * @param {number} options.start 开始值停留位置
   * @param {number} options.direction 滚动方向，纵 vertical, 横 horizontal 默认 vertical
   * @return {object} 返回 Marquee对象
   * **/

  const requestAnimationFrame = window.requestAnimationFrame;
  const cancelAnimationFrame = window.cancelAnimationFrame;

  class Marquee {
    constructor (box, target, { setp = 1, autoPlay, start = 0, direction = 'horizontal' }) {
      if (!box || !target) throw new Error('options.box and options.target is required.')

      Object.defineProperty(this, 'options', {
        value: {
          moveing: false,
          clock: null,
          moveValue: start,
          box: box,
          target: target,
          setp: setp,
          direction: direction // 纵 vertical, 横 horizontal
        }
      });

      Object.defineProperty(this, '_private', {
        value: {
          box: {},
          target: {}
        }
      });

      this.updateLayout();

      // set start position
      this.options.target.style.transform = `translateX(${-this.options.moveValue}px)`;
      if (autoPlay) this.start();

      const that = this;

      window.addEventListener('resize', function () {
        that.updateLayout();
      });
    }

    marquee () {
      const options = this.options;
      if (!options.moveing) return

      options.moveValue += options.setp;
      const attr = options.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth';
      // ←
      if (options.setp > 0) {
        if (options.moveValue > this._private.target[attr]) {
          options.moveValue = -this._private.box[attr];
        }
      } else {
        if (options.moveValue < -this._private.box[attr]) {
          options.moveValue = this._private.target[attr];
        }
      }

      options.target.style.transform = options.direction === 'vertical' ? `translateY(${-options.moveValue}px)` : `translateX(${-options.moveValue}px)`;

      options.clock = requestAnimationFrame(this.marquee.bind(this));
    }

    updateLayout () {
      this._private.box.offsetHeight = this.options.box.offsetHeight;
      this._private.box.offsetWidth = this.options.box.offsetWidth;

      this._private.target.offsetHeight = this.options.target.offsetHeight;
      this._private.target.offsetWidth = this.options.target.offsetWidth;
    }

    start () {
      // fix 多次调用start引起问题
      cancelAnimationFrame(this.options.clock);
      this.options.clock = requestAnimationFrame(this.marquee.bind(this));
      this.options.moveing = true;
    }

    stop () {
      cancelAnimationFrame(this.options.clock);
      this.options.moveing = false;
    }

    reset () {
      this.options.target.style.transform = '';
      this.options.moveValue = 0;
    }

    show () {
      this.options.box.style.display = 'block';
    }

    hide () {
      this.options.box.style.display = 'none';
    }

    updateContent (html, append = false) {
      this.options.target.innerHTML = append ? this.options.target.innerHTML + html : html;
      // update style
      this.updateLayout();
    }
  }

  window.addEventListener('load', function () {
    const marqueeList = document.getElementsByClassName('marquee');
    const marqueeTargetList = document.getElementsByClassName('marquee-target');

    window.mq1 = new Marquee(marqueeList[0], marqueeTargetList[0], {
      autoPlay: true,
      setp: 1
    });

    window.mq2 = new Marquee(marqueeList[1], marqueeTargetList[1], {
      autoPlay: true,
      setp: 0.5
    });

    window.mq3 = new Marquee(marqueeList[2], marqueeTargetList[2], {
      autoPlay: true,
      setp: 2
    });

    window.mq4 = new Marquee(marqueeList[3], marqueeTargetList[3], {
      autoPlay: true,
      setp: -1
    });

    window.mq5 = new Marquee(marqueeList[4], marqueeTargetList[4], {
      autoPlay: true,
      setp: 1,
      direction: 'vertical'
    });

    window.mq6 = new Marquee(marqueeList[5], marqueeTargetList[5], {
      autoPlay: true,
      setp: -1,
      direction: 'vertical'
    });
  });

}());
