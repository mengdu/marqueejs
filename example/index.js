import Marquee from '../src/index'
import './index.css'

window.addEventListener('load', function () {
  const marqueeList = document.getElementsByClassName('marquee')
  const marqueeTargetList = document.getElementsByClassName('marquee-target')

  window.mq1 = new Marquee(marqueeList[0], marqueeTargetList[0], {
    autoPlay: true,
    setp: 1
  })

  window.mq2 = new Marquee(marqueeList[1], marqueeTargetList[1], {
    autoPlay: true,
    setp: 0.5
  })

  window.mq3 = new Marquee(marqueeList[2], marqueeTargetList[2], {
    autoPlay: true,
    setp: 2
  })

  window.mq4 = new Marquee(marqueeList[3], marqueeTargetList[3], {
    autoPlay: true,
    setp: -1
  })

  window.mq5 = new Marquee(marqueeList[4], marqueeTargetList[4], {
    autoPlay: true,
    setp: 1,
    direction: 'vertical'
  })

  window.mq6 = new Marquee(marqueeList[5], marqueeTargetList[5], {
    autoPlay: true,
    setp: -1,
    direction: 'vertical'
  })
})
