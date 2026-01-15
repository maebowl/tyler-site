import './InkSplatter.css'

// SVG paths for realistic ink splatters - each one is unique and organic
const splatPaths = {
  splat1: "M50,10 Q70,5 80,20 Q95,35 85,55 Q90,75 70,85 Q50,95 30,80 Q10,70 15,50 Q5,30 25,20 Q40,5 50,10 M60,30 Q75,35 70,50 Q65,60 50,55 Q40,45 50,35 Q55,25 60,30",
  splat2: "M45,5 Q65,0 80,15 Q100,30 90,55 Q95,80 70,90 Q45,100 25,85 Q0,65 10,40 Q5,15 30,10 Q40,8 45,5 M55,25 Q70,30 65,45 Q60,55 45,50 Q35,40 45,30 Q50,22 55,25 M25,50 Q35,55 30,65 Q25,70 20,60 Q18,52 25,50",
  splat3: "M55,8 Q75,3 88,22 Q102,45 88,68 Q80,88 55,92 Q30,95 15,75 Q-2,55 12,32 Q25,10 55,8 M40,35 Q55,30 60,45 Q62,58 48,60 Q35,58 38,45 Q38,38 40,35",
  drip1: "M10,0 Q15,0 18,5 Q22,15 20,35 Q22,55 18,75 Q15,90 12,98 Q10,105 8,98 Q5,90 3,75 Q0,55 2,35 Q0,15 5,5 Q8,0 10,0",
  drip2: "M12,0 Q18,0 22,8 Q28,20 25,45 Q28,70 22,90 Q18,108 15,118 Q12,125 10,118 Q7,108 5,90 Q0,70 3,45 Q0,20 8,8 Q10,0 12,0 M15,60 Q20,65 18,80 Q15,90 12,80 Q10,70 15,60",
  drip3: "M8,0 Q12,0 14,4 Q18,12 16,28 Q18,44 14,58 Q12,70 10,75 Q8,78 6,75 Q4,70 2,58 Q-1,44 1,28 Q-1,12 4,4 Q6,0 8,0"
}

export function InkSplat({ color = 'pink', size = 100, style = {}, variant = 1, className = '' }) {
  const pathKey = `splat${Math.min(variant, 3)}`
  const colorVar = `var(--ink-${color})`

  return (
    <svg
      className={`ink-splat ${className}`}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={style}
    >
      <path d={splatPaths[pathKey]} fill={colorVar} />
    </svg>
  )
}

export function InkDrip({ color = 'pink', height = 80, style = {}, variant = 1, className = '' }) {
  const pathKey = `drip${Math.min(variant, 3)}`
  const colorVar = `var(--ink-${color})`
  const width = height * 0.25

  return (
    <svg
      className={`ink-drip ${className}`}
      viewBox="0 0 24 125"
      width={width}
      height={height}
      style={style}
    >
      <path d={splatPaths[pathKey]} fill={colorVar} />
    </svg>
  )
}

export function InkBackground() {
  return (
    <div className="ink-bg-splatters">
      <InkSplat color="pink" size={250} variant={1} style={{ top: '5%', left: '3%' }} className="bg-splat" />
      <InkSplat color="green" size={300} variant={2} style={{ top: '10%', right: '5%' }} className="bg-splat" />
      <InkSplat color="blue" size={200} variant={3} style={{ bottom: '15%', right: '8%' }} className="bg-splat" />
      <InkSplat color="orange" size={220} variant={1} style={{ bottom: '10%', left: '5%' }} className="bg-splat" />
      <InkSplat color="purple" size={280} variant={2} style={{ top: '45%', left: '50%', transform: 'translateX(-50%)' }} className="bg-splat" />
    </div>
  )
}
