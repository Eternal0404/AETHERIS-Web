"use client";

import * as React from "react";
import { motion, useAnimation, Variant } from "framer-motion";

interface ScrambleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export function ScrambleIn({
  children,
  delay = 0,
  duration = 1.2,
  stagger = 0.05,
  className,
}: ScrambleInProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: () => ({
      opacity: 0,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotate: (Math.random() - 0.5) * 90,
      scale: 0.5 + Math.random(),
      filter: "blur(20px)",
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        duration: duration,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return (
          <motion.div variants={itemVariants} className="will-change-transform">
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
