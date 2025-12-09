import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-8 text-3xl font-bold text-slate-900">About Me</h2>
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 sm:p-12">
            <p className="text-lg leading-loose text-slate-600">
              With over <span className="font-bold text-slate-900">5+ years</span> of experience in software engineering,
              I have transitioned my focus entirely to <span className="font-bold text-primary-600">Machine Learning and AI</span>.
              My background as a Full Stack Cloud Architect gives me a unique advantage: I don't just build models;
              I design the scalable infrastructure that serves them. From deploying computer vision pipelines to automating
              recruitment with NLP, I thrive on turning complex data into intuitive, actionable products.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
              <div>
                <span className="block text-3xl font-bold text-primary-600">05+</span>
                <span className="text-sm font-medium text-slate-500">Years XP</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-primary-600">20+</span>
                <span className="text-sm font-medium text-slate-500">Projects</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-primary-600">07+</span>
                <span className="text-sm font-medium text-slate-500">Companies</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;