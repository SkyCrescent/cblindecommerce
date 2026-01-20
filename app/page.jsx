"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Stark from "@/public/media/logo.png";
import site from "@/public/media/sites.jpg";

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();

  /* ===== PROGRESS ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 500);
          return 100;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  /* ===== REDIRECT ===== */
  useEffect(() => {
    if (fadeOut) {
      setTimeout(() => router.push("/home"), 1000);
    }
  }, [fadeOut, router]);

  /* ===== SPINNER DELAY ===== */
  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="
                w-full h-screen relative overflow-hidden
                flex flex-col md:flex-row
                items-center justify-center
                px-4 md:px-10
            "
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          <img
              src={site.src}
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* LEFT TEXT */}
        <div className="
                w-full md:w-1/2
                flex flex-col
                items-center md:items-start
                justify-center
                text-center md:text-left
                text-white
                z-10
            ">
          <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="
                        text-3xl md:text-6xl lg:text-7xl
                        font-extrabold
                        mb-4
                        text-blue-600
                    "
          >
            Bienvenue dans notre Boutique
          </motion.h1>

          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="
                        text-lg md:text-2xl
                        font-medium
                        text-white
                    "
          >
            Chargement : {progress}%
          </motion.p>
        </div>

        {/* RIGHT IMAGE + SPINNER */}
        <div className="
                w-full md:w-1/2
                flex items-center justify-center
                relative
                mt-10 md:mt-0
            ">
          {/* LOGO */}
          <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="relative z-20"
          >
            <Image
                src={Stark}
                alt="Logo"
                className="w-40 md:w-72 lg:w-96 object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* SPINNER */}
          {showSpinner && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
              >
                {/* Glow */}
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="
                                absolute
                                w-32 h-32 md:w-52 md:h-52
                                bg-white blur-3xl rounded-full
                                opacity-50
                            "
                />

                {/* Outer */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="
                                w-40 h-40 md:w-64 md:h-64
                                border-t-4 border-black
                                rounded-full absolute
                            "
                />

                {/* Inner */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="
                                w-28 h-28 md:w-48 md:h-48
                                border-b-4 border-yellow-500
                                rounded-full absolute
                            "
                />
              </motion.div>
          )}
        </div>
      </motion.div>
  );
}
