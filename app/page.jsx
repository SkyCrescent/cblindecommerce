"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Stark from "@/public/media/logo.png";
import site from "@/public/media/sites.jpg"

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();

  // === PROGRESS BAR ===
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setFadeOut(true); // déclenche fade-out
          }, 500);

          return 100;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // === Redirection après fade-out ===
  useEffect(() => {
    if (fadeOut) {
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    }
  }, [fadeOut, router]);

  // === DELAY SPINNER ===
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="
                w-full h-screen relative overflow-hidden
                flex items-center justify-center px-10
            "
      >

        {/* FOND ARRIÈRE — IMAGE + Dégradé */}
        <div className="absolute inset-0 -z-10">
          <img
              src={site.src}
              className="w-full h-full object-cover"
          />

          {/* Dégradé overlay sombre */}
          {/*<div className="absolute inset-0 bg-gradient-to-b from-black/60 to-blue-900/40" />*/}
        </div>

        {/* LEFT TEXT */}
        <div className="w-1/2 flex flex-col items-start justify-center text-white">
          <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-7xl font-extrabold mb-4 text-blue-600"
          >
            Bienvenue dans notre Boutique
          </motion.h1>

          <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl font-medium text-black"
          >
            Chargement : {progress}%
          </motion.p>
        </div>

        {/* RIGHT SIDE : IMAGE + DOUBLE SPINNER */}
        <div className="w-1/2 flex items-center justify-center relative">

          {/* IMAGE */}
          <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="relative flex items-center justify-center z-20"
          >
            <Image
                src={Stark}
                alt="Logo"
                className="w-[80%] h-[90%] object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* SPINNERS */}
          {showSpinner && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
              >
                {/* Halo Glow */}
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="
                                absolute w-52 h-52 rounded-full
                                bg-white blur-3xl opacity-50
                            "
                />

                {/* Outer Spinner */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                    }}
                    className="
                                w-64 h-64 rounded-full
                                border-t-4 border-black
                                absolute
                            "
                />

                {/* Inner Spinner (reverse) */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                    }}
                    className="
                                w-48 h-48 rounded-full
                                border-b-4 border-yellow-500
                                absolute
                            "
                />
              </motion.div>
          )}
        </div>
      </motion.div>
  );
}
