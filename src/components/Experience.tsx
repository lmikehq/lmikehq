import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE_DATA } from "../constants";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative bg-slate-50 py-24">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="container mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Experience</h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCE_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {item.role}
                  </p>
                </div>
                <span className="text-sm font-medium text-slate-500">
                  {item.period}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
