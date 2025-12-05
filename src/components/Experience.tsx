import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE_DATA } from "../constants";
import { Briefcase } from "lucide-react";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="bg-slate-50 py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Experience</h2>
          <p className="mt-4 text-slate-600">
            My journey in AI & Software Engineering
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200 md:left-1/2 md:-ml-0.5" />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Icon Marker */}
                <div className="absolute left-4 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 shadow-md ring-4 ring-white">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Spacer for the opposite side */}
                <div className="hidden w-1/2 md:block" />

                {/* Content Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                  }`}
                >
                  <div className="group relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md hover:ring-primary-500/30">
                    <span className="mb-2 block text-sm font-semibold text-primary-600">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.role}
                    </h3>
                    <p className="mb-4 text-sm font-medium text-slate-500">
                      {item.company}
                    </p>
                    <p className="mb-4 text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
