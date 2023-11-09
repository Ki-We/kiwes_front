'use client'
import React, { useEffect, useState } from 'react'

type ProgressiveBar = {
  percent: number
}
const zero = 'w-0'
const quarter = 'w-1/4'
const half = 'w-2/4'
const threeQuarters = 'w-3/4'
const full = 'w-full'

export default function ProgressiveBar({ percent }: ProgressiveBar) {
  const [progress, setProgress] = useState('')

  useEffect(() => {
    if (percent < 25) {
      setProgress(zero)
    } else if (percent <= 25) {
      console.log('25')
      setProgress(quarter)
    } else if (percent <= 50) {
      console.log('50')
      setProgress(half)
    } else if (percent <= 75) {
      console.log('75')
      setProgress(threeQuarters)
    } else {
      setProgress(full)
    }
  }, [percent])
  return (
    <div className={progress}>
      <div className="border border-black" />
    </div>
  )
}
