import React, { useCallback, useState } from 'react'
import Draggable from 'react-draggable'
import styles from './House.module.css'

export function House() {
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

  const parent = useCallback((e) => {
    console.log({ e });
    const rect = e.getBoundingClientRect();
    console.log({ rect });

    let newBounds = bounds;
    newBounds.top = rect.top;
    newBounds.bottom = rect.bottom - window.innerHeight;
    newBounds.left = rect.left;
    newBounds.right = rect.right - window.innerWidth - 1;

    setBounds(newBounds);
  }, [bounds]);

  return (
    <Draggable
      axis="both"
      bounds={bounds}
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[2, 2]}
      scale={2}
    // onStart={this.handleStart}
    // onDrag={this.handleDrag}
    // onStop={this.handleStop}
    >
      <div className={styles.container}>
        <div ref={parent} className={styles.parent} >
          <div className={styles.house} />
        </div>
      </div>
    </Draggable>
  )
}
