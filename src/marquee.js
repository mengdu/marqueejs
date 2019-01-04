/**
 * 滚动跑马灯
 * @param {Dom} box 盒子
 * @param {Dom} el 滚动盒子
 * @param {number} setp 步长，默认1，向左运动；负值会反向运动
 * @param {boolean} auto 是否自动开始
 * @param {number} start 开始值停留位置
 * **/

const requestAnimationFrame = window.requestAnimationFrame
const cancelAnimationFrame = window.cancelAnimationFrame

export default class Marquee {
  constructor (box, target, { setp = 1, autoPlay, start = 0, direction = 'horizontal' }) {
    if (!box || !target) throw new Error('options.box and options.target is required.')
    this.options = {
      moveing: false,
      clock: null,
      moveValue: start,
      box: box,
      target: target,
      setp: setp,
      direction: direction // 纵 vertical, 横 horizontal
    }

    // set start position
    this.options.target.style.transform = `translateX(${-this.options.moveValue}px)`
    if (autoPlay) this.start()
  }

  marquee () {
    const options = this.options
    if (!options.moveing) return

    options.moveValue += options.setp
    // ←
    if (options.setp > 0) {
      if (options.moveValue > options.target.offsetWidth) {
        options.moveValue = -options.box.offsetWidth
      }
    } else {
      if (options.moveValue < -options.box.offsetWidth) {
        options.moveValue = options.target.offsetWidth
      }
    }

    options.target.style.transform = `translateX(${-options.moveValue}px)`
    options.clock = requestAnimationFrame(this.marquee.bind(this))
  }

  start () {
    this.options.clock = requestAnimationFrame(this.marquee.bind(this))
    this.options.moveing = true
  }

  stop () {
    cancelAnimationFrame(this.options.clock)
    this.options.moveing = false
  }

  reset () {
    this.options.target.style.transform = ''
    this.options.moveValue = 0
  }
}
