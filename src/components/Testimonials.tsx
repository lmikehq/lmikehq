import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Endorsements</h2>
            <p className="mt-2 text-slate-600">What people are saying about working with MikeHQ.</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative rounded-3xl bg-slate-50 p-8 md:p-10"
            >
              <Quote className="absolute top-8 right-8 h-8 w-8 text-primary-200" />
              <p className="relative z-10 text-lg font-medium text-slate-700 leading-relaxed italic">
                "{item.content}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;