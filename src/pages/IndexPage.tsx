import { Button } from '@douglasneuroinformatics/ui';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { HeroIcon } from '../components/HeroIcon';

export const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen flex-col">
      <main className="container flex flex-grow items-center justify-center">
        <section className="flex gap-5 text-center xl:text-left w-full">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-grow flex-col justify-center"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl lg:text-5xl">
              {t('Perfocentre Metadata')}
            </h1>
            <p className="mx-auto mt-3 w-11/12 text-base text-slate-600 dark:text-slate-300 md:mt-5 md:text-lg xl:mx-0">
              {t('Discoverability platform of Perfocentre metadata for research purpose')}
            </p>
            <div className="mt-5 flex justify-center gap-3 xl:justify-start">
              <Button
                label={t('Acces Metadata')}
                type="button"
                onClick={() => {
                  return;
                }}
              />
              <Button label={t('learnMore')} type="button" variant="secondary" />
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, x: 0, y: 0 }}
            className="hidden w-80 xl:block"
            initial={{ opacity: 0, x: 10, y: 10 }}
            transition={{ duration: 0.7 }}
          >
            <HeroIcon />
          </motion.div>
        </section>
      </main>
    </div>
  );
};
