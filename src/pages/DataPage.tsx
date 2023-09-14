import { useEffect, useState } from 'react';

import { ClientTable, type TableColumn } from '@douglasneuroinformatics/ui';
import { useTranslation } from 'react-i18next';

import { FilterDropdown } from '../components/FilterDropdown';
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
type DataRecord = {
  [key: string]: string | null;
};

type TableData = {
  data: DataRecord[];
  columns: TableColumn<DataRecord>[];
};

export const DataPage = () => {
  const [raw, setRaw] = useState<TableData>();
  const [filtered, setFiltered] = useState<TableData>();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

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

    setRaw({ columns, data });
    setFiltered({ columns, data });
    setSelectedColumns(Object.keys(data[0]));
  };

  useEffect(() => {
    void fetchData();
  }, []);

  useEffect(() => {
    if (!raw || selectedColumns.length === 0) {
      return;
    }
    setFiltered({
      columns: raw.columns.filter((col) => selectedColumns.includes(col.field as string)),
      data: raw.data.map((record) => {
        const filteredRecord: DataRecord = {};
        for (const key in record) {
          if (selectedColumns.includes(key)) {
            filteredRecord[key] = record[key]!;
          }
        }
        return filteredRecord;
      })
    });
  }, [selectedColumns]);

  if (!raw) {
    return null;
  } else if (!filtered) {
    return <p>Error</p>;
  }

  return (
    <div>
      <h1 className="text-4xl text-center my-8">{t('title')}</h1>
      <div>
        <FilterDropdown
          options={raw.columns.map(({ field }) => field as string)}
          title="Filters"
          onChange={setSelectedColumns}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <ClientTable {...filtered} />
      </div>
    </div>
  );
};
