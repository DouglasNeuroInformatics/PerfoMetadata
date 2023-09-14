import { useEffect, useState } from 'react';

import { Button, ClientTable, type TableColumn } from '@douglasneuroinformatics/ui';
import { useTranslation } from 'react-i18next';

import { FilterDropdown } from '../components/FilterDropdown';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
type DataRecord = {
  [key: string]: string | null;
};

type TableData = {
  data: DataRecord[];
  columns: TableColumn<DataRecord>[];
  // array of the field names that are selected
  selectedColumns: string[];
};

export const DataPage = () => {
  const [table, setTable] = useState<TableData>();
  const { t } = useTranslation();

  const fetchData = async () => {
    const response = await fetch('/data.json');
    if (!response.ok) {
      console.error('Error: status code ' + response.status);
      return;
    }
    const data = (await response.json()) as DataRecord[];

    if (!data[0]) {
      return;
    }

    const columns: TableColumn<DataRecord>[] = Object.keys(data[0]).map((columnName) => ({
      label: columnName,
      field: columnName
    }));

    setTable({ columns, data, selectedColumns: Object.keys(data[0]) });
  };

  useEffect(() => {
    void fetchData();
  }, []);
  
  if (!table) {
    return null;
  }

  return (
    <div>
      <h1 className="text-4xl text-center my-8">{t('title')}</h1>
      <div>
        <FilterDropdown
          options={table.columns.map(({ field }) => field as string)}
          title="Filters"
          onChange={(selectedColumns) => {
            setTable((prevTable) => {
              prevTable!.selectedColumns = selectedColumns;
              console.log(prevTable);
              return prevTable;
            });
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <ClientTable {...table} />
      </div>
    </div>
  );
};
