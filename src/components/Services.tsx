import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900"
          >
            How I Can Help
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-600"
          >
            Specialized engineering services for modern businesses.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-xl hover:ring-primary-500/30"
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                {service.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{service.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;