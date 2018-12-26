import Marquee from '../src/index'

window.addEventListener('load', function () {
  const marqueeList = document.getElementsByClassName('marquee')
  const marqueeTargetList = document.getElementsByClassName('marquee-target')
  const instances = []

  for (let i = 0; i < marqueeList.length; i++) {
    const instance = new Marquee(marqueeList[i], marqueeTargetList[i], {
      autoPlay: true,
      setp: 1
    })

    instances.push(instance)
  }

  console.log(instances)
})
