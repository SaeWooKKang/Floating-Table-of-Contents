import React from "react";

import { useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import { MotionLayout } from "./MotionLayout";
import { Layout } from "./Layout";
import { Header } from "./Header";
import { Toc } from "./Toc";

const Container = () => {
  const [constraints, setConstraints] = useState({left: 0, right: 0, top: 0, bottom: 0});
  const [showBigger, setShowBigger] = useState(true);

  const controls= useDragControls()

  useEffect(() => {
    setConstraints(prev => ({
      ...prev,
      bottom: window.innerHeight - 200,
      right: document.documentElement.scrollWidth - 200

    }))
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    controls.start(e)
  }

  const handleTap = () => {
    setShowBigger(prev => !prev);
  }

  return (
    <Layout>
      <MotionLayout 
        showBigger={showBigger} 
        constraints={constraints}
        controls={controls}
      >
        <Header 
          onPointerDown={handlePointerDown} 
          showBigger={showBigger}
        />

        <Toc 
          onTap={handleTap} 
          showBigger={showBigger}
        />
      </MotionLayout>
    </Layout>
  );
}

export default Container
