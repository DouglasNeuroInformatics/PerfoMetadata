import { useState } from 'react';

import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

type FilterProps = {
  label: string;
  options: string[];
};

export const Filter = ({ label, options }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-3 border">
      <button
        className="font-semibold flex text-sm items-center p-1 w-full"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="mr-2">{label}</span>
        <ChevronDownIcon height={16} width={16} />
      </button>
      <div className={clsx('overflow-hidden flex flex-col gap-2 p-1', isOpen ? 'h-auto' : 'h-0')}>
        {options.map((option) => (
          <div className="text-sm" key={option}>
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
      </div>
    </div>
  );
};
