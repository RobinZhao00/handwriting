import React, { useEffect, useRef } from 'react'
import './style.scss'

const Draw = ({ drawProps }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const { current: canvas } = canvasRef
    canvas.width = '500'
    canvas.height = '500'
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = canvas.width / 2
    const context = canvas.getContext('2d')
    let requestId;
    let i = 0;
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath()
      context.arc(centerX, centerY, radius * Math.abs(Math.cos(i)), 0, 2 * Math.PI)
      context.fill()
      i += 0.05;
      requestId = requestAnimationFrame(render);
    }

    render()
    return () => {
      cancelAnimationFrame(requestId)
    }
  })

  return (
    <div className="draw-container">
      <canvas className='canvas' ref={canvasRef}></canvas>
    </div>
  )
}

export default Draw


// const draw = () => {
//   const { current: canvas } = canvasRef
//   canvas.width = '500'
//   canvas.height = '400'
//   const context = canvas.getContext('2d')
//   const centerX = canvas.width / 2
//   const centerY = canvas.height / 2
//   const rad = Math.PI * 2 / 100
//   let speed = 0.1
//   context.clearRect(0, 0, canvas.width, canvas.height)
//   drawWhiteCircle(context, centerX, centerY)
//   drawText(context, centerX, centerY, 'hello canvas')
//   requestAnimationFrame(draw);
//   drawCircle(context, centerX, centerY, speed)
//   if(speed > 100) speed = 0;
//   speed += 0.1;
// }
//
// const drawText = (context, centerX, centerY, text) => {
//   context.save()
//   context.fillStyle = '#F47C7C'
//   context.font = '40px Arial'
//   context.textAlign = 'center'
//   context.textBaseline = 'middle'
//   context.fillText(text, centerX, centerY)
//   context.restore()
// }
//
// const drawWhiteCircle = (context, centerX, centerY) => {
//   context.save()
//   context.beginPath()
//   context.strokeStyle = '#A5DEF1'
//   context.lineWidth = 12
//   context.arc(centerX, centerY, 100, 0, Math.PI * 2, false)
//   context.stroke()
//   context.closePath()
//   context.restore()
// }
//
//
// const drawCircle = (context, centerX, centerY, speed = 0.1, rad = Math.PI * 2 / 100) => {
//   context.save()
//   context.beginPath()
//   context.strokeStyle = '#49f'
//   context.lineWidth = 12
//   context.arc(centerX, centerY, 100, -Math.PI / 2, -Math.PI / 2 + speed * rad, false)
//   context.stroke()
//   context.restore()
// }
//
// useEffect(() => {
//   draw()
// })
