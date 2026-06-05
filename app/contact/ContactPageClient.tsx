// app/contact/ContactPageClient.tsx
'use client';

import { memo, useCallback, useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/app/hooks/useTranslation';

const ContactPageClient = memo(function ContactPageClient() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState('');

  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as const;

  return (
    <main className="min-h-screen pt-20 sm:pt-28 pb-20 bg-background relative overflow-hidden">
      {/* Fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-primary/[0.02] rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl relative z-10">
        
        {/* Badge */}
        <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm"
            style={{ boxShadow: '0 0 15px -5px rgba(212,175,55,0.12), inset 0 0 6px rgba(212,175,55,0.04)' }}>
            <Sparkles size={14} />{t('badge', 'contact')}
          </div>
        </motion.div>

        {/* Titre */}
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-3 tracking-tight">
            {t('title', 'contact')}
          </h1>
          <p className="text-gradient-gold text-2xl sm:text-3xl font-light mb-4">
            {t('titleHighlight', 'contact')}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-primary to-amber-400 mx-auto mb-5" />
          <p className="text-muted text-sm max-w-md mx-auto">{t('subtitle', 'contact')}</p>
        </motion.div>

        {/* Cartes de contact */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {[
            {
              icon: Phone,
              label: 'Appeler',
              value: '+229 62 27 80 90',
              href: 'tel:+22962278090',
              action: 'Appeler',
              color: 'bg-primary/10 text-primary border-primary/20',
              iconBg: 'bg-primary/10',
            },
            {
              icon: Mail,
              label: 'Email',
              value: 'patawalaabdoulaye2003@gmail.com',
              href: 'mailto:patawalaabdoulaye2003@gmail.com',
              action: 'Écrire',
              color: 'bg-primary/10 text-primary border-primary/20',
              iconBg: 'bg-primary/10',
            },
            {
              icon: MapPin,
              label: 'Localisation',
              value: 'Cotonou, Bénin',
              href: null,
              action: null,
              color: 'bg-primary/5 text-muted border-border',
              iconBg: 'bg-primary/5',
            },
          ].map((item, i) => (
            <motion.div key={item.label}
              className={`rounded-2xl p-6 border ${item.color} flex flex-col items-center text-center gap-4`}
              style={{ boxShadow: '0 10px 25px -10px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}>
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} border border-primary/15 flex items-center justify-center`}
                style={{ boxShadow: '0 0 15px -3px rgba(212,175,55,0.1)' }}>
                <item.icon size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-foreground font-semibold text-sm">{item.value}</p>
              </div>
              <div className="flex gap-2 w-full">
                {item.href && (
                  <a href={item.href} className="btn-gold text-xs px-4 py-2.5 flex-1">
                    {item.action}
                  </a>
                )}
                <button onClick={() => handleCopy(item.value, item.label)}
                  className="px-3 py-2.5 rounded-xl bg-surface border border-border text-muted hover:text-primary text-xs transition-colors">
                  {copied === item.label ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA principal */}
        <motion.div className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="relative rounded-3xl p-8 sm:p-10 max-w-lg mx-auto"
            style={{ background: 'linear-gradient(145deg, rgba(15,21,33,0.9) 0%, rgba(22,29,43,0.6) 100%)', border: '1px solid rgba(30,42,62,0.4)', boxShadow: '0 20px 50px -15px rgba(0,0,0,0.5)' }}>
            
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5"
              style={{ boxShadow: '0 0 20px -5px rgba(34,197,94,0.3)' }}>
              <MessageCircle size={24} className="text-green-400" />
            </div>
            <h2 className="text-xl font-light text-foreground mb-2">WhatsApp Direct</h2>
            <p className="text-sm text-muted mb-6">Réponse sous 24h. Gratuit et sans engagement.</p>
            
            <a href="https://wa.me/22962278090" target="_blank" rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-sm px-8 py-4 group">
              Discuter sur WhatsApp
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted">
              <span className="flex items-center gap-1"><Clock size={12} className="text-primary" /> 1er échange offert</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-primary" /> Sans engagement</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
});

ContactPageClient.displayName = 'ContactPageClient';
export default ContactPageClient;