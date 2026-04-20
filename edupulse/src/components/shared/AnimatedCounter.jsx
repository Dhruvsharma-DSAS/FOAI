import React, { useEffect, useState } from 'react';

export default function AnimatedCounter({ target, duration = 2, decimals = 0, style }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const numTarget = Number(target) || 0;

    function tick(now) {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(numTarget * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(numTarget);
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  return <span className="mono" style={style}>{value.toFixed(decimals)}</span>;
}
