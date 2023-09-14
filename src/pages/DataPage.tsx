import { useEffect, useState } from 'react';

import { ClientTable, type TableColumn } from '@douglasneuroinformatics/ui';
import { useTranslation } from 'react-i18next';

import { Filter } from '../components/Filter';
import { FilterDropdown } from '../components/FilterDropdown';

type DataRecord = Record<string, string | null>;

type TableData = {
  data: DataRecord[];
  columns: TableColumn<DataRecord>[];
};

/** Return all of the unique values for a column name in the data */
const getUniqueValues = (records: DataRecord[], key: string) => {
  const uniqueValues: string[] = [];
  for (const record of records) {
    const value = record[key]!;
    if (!uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  }
  return uniqueValues;
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

    const colNames = Object.keys(data[0]);

    const columns: TableColumn<DataRecord>[] = colNames.map((columnName) => ({
      label: columnName,
      field: columnName
    }));

    setRaw({ columns, data });
    setFiltered({ columns, data });
    setSelectedColumns(colNames);
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
      <div className="grid grid-cols-4 gap-8 p-3 border bg-slate-50 dark:border-slate-800 shadow">
        <div className="col-span-1">
          <h3 className="text-lg font-bold text-center">Filters</h3>
          <hr className="my-2" />
          {selectedColumns.map((colName) => {
            const uniqueValues = getUniqueValues(filtered.data, colName);
            return <Filter key={colName} label={colName} options={uniqueValues} />;
          })}
        </div>
        <div className="col-span-3">
          <FilterDropdown
            options={raw.columns.map(({ field }) => field as string)}
            title="Columns"
            onChange={setSelectedColumns}
          />
          <div className="mt-3">
            <ClientTable {...filtered} />
          </div>
        </div>
      </div>
    </div>
  );
};
