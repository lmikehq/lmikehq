import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../constants";

interface HeroProps {
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[100px]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 ring-1 ring-inset ring-primary-600/20 dark:ring-primary-400/30"
          >
            <span className="mr-2 flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500 dark:bg-primary-400"></span>
            </span>
            ML, AI & Data Science Roles
          </motion.div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Hi, I'm{" "}
            <span className="text-primary-600 dark:text-primary-400">
              {PERSONAL_INFO.name.split(" ")[0].toLocaleUpperCase()}
            </span>
          </h1>

          <h2 className="mb-6 text-2xl font-medium text-slate-600 dark:text-slate-300 sm:text-3xl">
            {PERSONAL_INFO.title}
          </h2>

          <p className="mb-8 max-w-lg text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContactClick}
              className="group flex items-center gap-2 rounded-full bg-primary-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700"
            >
              Contact Me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://docs.google.com/document/d/13RzUnv07ekRALxY2G0GHIV44zEBlwAVVqymMupr7JpY/export?format=pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-md ring-1 ring-slate-200 dark:ring-slate-700 transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              Resume
              <Download className="h-4 w-4" />
            </motion.a>
          </div>

          <div className="mt-10 flex gap-6 text-slate-400 dark:text-slate-500">
            <a
              href={`https://${PERSONAL_INFO.socials.github}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={`https://${PERSONAL_INFO.socials.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-1 flex justify-center lg:order-2"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 opacity-20 blur-2xl" />
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white dark:border-slate-800 shadow-2xl sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <img
                src="img/mike.jpg"
                alt="Profile"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
