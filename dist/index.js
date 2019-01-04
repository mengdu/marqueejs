/*!
 * Build version v0.1.0
 * Create by lanyue@qq.com
 * Created at Fri Jan 04 2019 20:02:05 GMT+0800 (中国标准时间)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Marquee = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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
  var requestAnimationFrame = window.requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame;

  var Marquee =
  /*#__PURE__*/
  function () {
    function Marquee(box, target, _ref) {
      var _ref$setp = _ref.setp,
          setp = _ref$setp === void 0 ? 1 : _ref$setp,
          autoPlay = _ref.autoPlay,
          _ref$start = _ref.start,
          start = _ref$start === void 0 ? 0 : _ref$start,
          _ref$direction = _ref.direction,
          direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction;

      _classCallCheck(this, Marquee);

      if (!box || !target) throw new Error('options.box and options.target is required.');
      this.options = {
        moveing: false,
        clock: null,
        moveValue: start,
        box: box,
        target: target,
        setp: setp,
        direction: direction // 纵 vertical, 横 horizontal
        // set start position

      };
      this.options.target.style.transform = "translateX(".concat(-this.options.moveValue, "px)");
      if (autoPlay) this.start();
    }

    _createClass(Marquee, [{
      key: "marquee",
      value: function marquee() {
        var options = this.options;
        if (!options.moveing) return;
        options.moveValue += options.setp;
        var attr = options.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth'; // ←

        if (options.setp > 0) {
          if (options.moveValue > options.target[attr]) {
            options.moveValue = -options.box[attr];
          }
        } else {
          if (options.moveValue < -options.box[attr]) {
            options.moveValue = options.target[attr];
          }
        }

        options.target.style.transform = options.direction === 'vertical' ? "translateY(".concat(-options.moveValue, "px)") : "translateX(".concat(-options.moveValue, "px)");
        options.clock = requestAnimationFrame(this.marquee.bind(this));
      }
    }, {
      key: "start",
      value: function start() {
        // fix 多次调用start引起问题
        cancelAnimationFrame(this.options.clock);
        this.options.clock = requestAnimationFrame(this.marquee.bind(this));
        this.options.moveing = true;
      }
    }, {
      key: "stop",
      value: function stop() {
        cancelAnimationFrame(this.options.clock);
        this.options.moveing = false;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.options.target.style.transform = '';
        this.options.moveValue = 0;
      }
    }, {
      key: "show",
      value: function show() {
        this.options.box.style.display = 'block';
      }
    }, {
      key: "hide",
      value: function hide() {
        this.options.box.style.display = 'none';
      }
    }, {
      key: "updateContent",
      value: function updateContent(html) {
        var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        this.options.target.innerHTML = append ? this.options.target.innerHTML + html : html;
      }
    }]);

    return Marquee;
  }();

  return Marquee;

}));
