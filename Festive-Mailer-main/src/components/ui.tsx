import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1]",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const wordsArray = words.split(" ");
  return (
    <div className={className}>
      <div className="mt-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {wordsArray.map((word, idx) => {
            return (
              <motion.span
                key={word + idx}
                className="dark:text-white text-black opacity-0"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.25,
                  delay: idx * 0.1,
                }}
              >
                {word}{" "}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  return (
    <button
      {...otherProps}
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden ",
        otherProps.className
      )}
    >
      <div
        className="absolute inset-0 rounded-[inherit] [mask:linear-gradient(white,transparent)] [border-radius:inherit] [background:conic-gradient(from_180deg,transparent_10deg,#00ccb1_90deg,#7b61ff_180deg,#ffc414_270deg,#1ca0fb_360deg)]"
        style={{
          animation: `border-beam ${duration}ms linear infinite`,
        }}
      ></div>
      <div className="bg-slate-900/[0.8] backdrop-blur-xl border border-slate-800 rounded-[inherit] relative flex h-full w-full items-center justify-center text-sm antialiased">
        {children}
      </div>
    </button>
  );
};

export const Meteors = ({ number }: { number?: number }) => {
  const meteors = new Array(number || 20).fill(true);
  
  // Different comet colors and effects
  const cometStyles = [
    "bg-purple-400 shadow-[0_0_0_1px_#a855f7] before:from-[#a855f7] before:to-transparent",
    "bg-pink-400 shadow-[0_0_0_1px_#ec4899] before:from-[#ec4899] before:to-transparent", 
    "bg-blue-400 shadow-[0_0_0_1px_#60a5fa] before:from-[#60a5fa] before:to-transparent",
    "bg-indigo-400 shadow-[0_0_0_1px_#818cf8] before:from-[#818cf8] before:to-transparent",
    "bg-cyan-400 shadow-[0_0_0_1px_#22d3ee] before:from-[#22d3ee] before:to-transparent",
    "bg-emerald-400 shadow-[0_0_0_1px_#34d399] before:from-[#34d399] before:to-transparent",
    "bg-white shadow-[0_0_0_1px_#ffffff30] before:from-[#ffffff] before:to-transparent"
  ];
  
  return (
    <>
      {meteors.map((el, idx) => {
        const randomStyle = cometStyles[Math.floor(Math.random() * cometStyles.length)];
        const size = Math.random() > 0.7 ? "h-1 w-1" : "h-0.5 w-0.5"; // Some meteors are larger
        const tailLength = Math.random() > 0.5 ? "before:w-[70px]" : "before:w-[50px]";
        
        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute top-1/2 left-1/2 rounded-[9999px] rotate-[215deg]",
              size,
              randomStyle,
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:h-[1px] before:bg-gradient-to-r",
              tailLength
            )}
            style={{
              top: Math.floor(Math.random() * 100) + "%",
              left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
              animationDelay: Math.random() * (1.5 - 0.1) + 0.1 + "s",
              animationDuration: Math.floor(Math.random() * (12 - 3) + 3) + "s",
            }}
          ></span>
        );
      })}
    </>
  );
};
