import { motion } from "framer-motion";
import React from "react";

interface Props {
  onTap: () => void
}

export const Toc = (props: Props) => {
  return (
    <motion.div
      layout
      onTap={props.onTap}
      className="w-full h-full bg-orange-500"
      style={{height: '100%', width: '100%'}}
    >
      hello toc
  </motion.div>
  )
}
