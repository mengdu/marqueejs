(function () {
  'use strict';

  /**
   * 滚动跑马灯
   * @param {Dom} box 盒子
   * @param {Dom} el 滚动盒子
   * @param {number} setp 步长，默认1，向左运动；负值会反向运动
   * @param {boolean} auto 是否自动开始
   * @param {number} start 开始值停留位置
   * **/

  const requestAnimationFrame = window.requestAnimationFrame;
  const cancelAnimationFrame = window.cancelAnimationFrame;

  class Marquee {
    constructor (box, target, { setp = 1, autoPlay, start = 0 }) {
      if (!box || !target) throw new Error('options.box and options.target is required.')
      this.moveing = false;
      this.clock = null;
      this.moveValue = start;
      this.box = box;
      this.target = target;
      this.setp = setp;

      // set start position
      this.target.style.transform = `translateX(${-this.moveValue}px)`;
      if (autoPlay) this.start();
    }

    marquee () {
      if (!this.moveing) return

      this.moveValue += this.setp;
      // ←
      if (this.setp > 0) {
        if (this.moveValue > this.target.offsetWidth) {
          this.moveValue = -this.box.offsetWidth;
        }
      } else {
        if (this.moveValue < -this.box.offsetWidth) {
          this.moveValue = this.target.offsetWidth;
        }
      }

      this.target.style.transform = `translateX(${-this.moveValue}px)`;
      this.clock = requestAnimationFrame(this.marquee.bind(this));
    }

    start () {
      this.clock = requestAnimationFrame(this.marquee.bind(this));
      this.moveing = true;
    }

    stop () {
      cancelAnimationFrame(this.clock);
      this.moveing = false;
    }

    reset () {
      this.target.style.transform = '';
      this.moveValue = 0;
    }
  }

  window.addEventListener('load', function () {
    const marqueeList = document.getElementsByClassName('marquee');
    const marqueeTargetList = document.getElementsByClassName('marquee-target');
    const instances = [];

    for (let i = 0; i < marqueeList.length; i++) {
      const instance = new Marquee(marqueeList[i], marqueeTargetList[i], {
        autoPlay: true,
        setp: 1
      });

      instances.push(instance);
    }

    console.log(instances);
  });

}());
