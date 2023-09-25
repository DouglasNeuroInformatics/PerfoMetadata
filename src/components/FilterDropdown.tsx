import { useEffect, useState } from 'react';

import { Button } from '@douglasneuroinformatics/ui';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export type FilterDropdownProps = {
  title: string;
  options: string[];
  onChange: (selectedOptions: string[]) => void;
};

export const FilterDropdown = ({ options, title, onChange }: FilterDropdownProps) => {
  const [selected, setSelected] = useState(options);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <Listbox multiple as="div" className="relative flex w-full" value={selected} onChange={setSelected}>
      <Listbox.Button
        as={Button}
        className="h-full w-full"
        icon={<ChevronDownIcon />}
        iconPosition="right"
        label={title}
        variant="secondary"
      />
      <Transition
        as="div"
        className="absolute bottom-0 z-10 w-full"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Listbox.Options className="scrollbar-none absolute z-10 mt-2 flex max-h-80 min-w-full flex-col overflow-scroll border border-slate-200 dark:border-slate-700">
          {options.map((option) => (
            <Listbox.Option
              className="flex w-full items-center whitespace-nowrap bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 p-2 hover:bg-slate-200 "
              key={option}
              value={option}
            >
              {option}
              <CheckIcon className="ui-selected:visible invisible ml-2" height={16} width={16} />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};
