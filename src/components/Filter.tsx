import { useState } from 'react';

import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

type FilterProps = {
  label: string;
  options: string[];
};

export const Filter = ({ label, options }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border dark:border-slate-600 rounded-md border-slate-300 flex flex-col justify-center">
      <button
        className="font-semibold flex text-sm items-center py-2 px-1.5 w-full"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="mr-2">{label}</span>
        <ChevronDownIcon height={16} width={16} />
      </button>
      <motion.div className='overflow-hidden flex flex-col h-0 gap-2' animate={{ height: isOpen === true ? 'auto': 0 }}>
        {options.map((option) => (
          <div className="text-sm p-1.5" key={option}>
            <button className="flex items-center justify-between w-full gap-2">
              <div className="text-left">
                <span>{option}</span>
              </div>
              <div className="items-center border justify-center">
                <CheckIcon height={16} width={16} />
              </div>
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
