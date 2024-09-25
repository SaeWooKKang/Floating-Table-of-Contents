import React from "react";

import { useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import { MotionLayout } from "./MotionLayout";
import { Layout } from "./Layout";
import { Header } from "./Header";
import { Toc } from "./Toc";

const Container = () => {
  const [documentHeight, setDocumentHeight] = useState(0);
  const [documentWidth, setDocumentWidth] = useState(0);

  const [showBigger, setShowBigger] = useState(true);

  const controls= useDragControls()

  useEffect(() => {
    setDocumentHeight(document.documentElement.scrollHeight);
    setDocumentWidth(document.documentElement.scrollWidth);
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    controls.start(e)
  }

  const handleTap = () => {
    setShowBigger(prev => !prev);
  }

  return (
    <Layout
      documentHeight={documentHeight}
    >
      <MotionLayout 
        showBigger={showBigger} 
        documentHeight={documentHeight} 
        documentWidth={documentWidth} 
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
