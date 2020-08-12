import React, { useRef, useCallback } from 'react'

import useWebcam from './useWebcam'
import { getRetinaContext } from './retina-canvas'

import { alarma } from './render-predictions'

const Alertado = React.memo(
  ({ model, onPrediction, fit, mirrored, render}) => {
    const videoRef = useRef()
    const canvasRef = useRef()

    useWebcam(videoRef, () => {
      detectFrame()
    })

    const detectFrame = useCallback(async () => {
      const predictions = await model.detect(videoRef.current)
      if (onPrediction) {
        onPrediction(predictions)
      }

      const offsetPredictions = predictions.map((prediction) => {
       
      })

      const renderFunction =  alarma || render

      const ctx = getRetinaContext(canvasRef.current)

      ctx.clearAll()

      renderFunction(offsetPredictions)
      requestAnimationFrame(() => {
        detectFrame()
      })
    }, [model, onPrediction, render])

    return (
      <div >
      </div>
    )
  }
)

export default Alertado