import { useEffect, useState } from 'react';

import { ClientTable, Table, TableProps, type TableColumn, TableEntry } from '@douglasneuroinformatics/ui';
import { useTranslation } from 'react-i18next';

import { Filter } from '../components/Filter';
import { FilterDropdown } from '../components/FilterDropdown';

type DataRecord = Record<string, string | null>;

type TableData = {
  data: DataRecord[];
  columns: TableColumn<DataRecord>[];
};

/** IMPORTANT -- If you are learning React please know this is horrible practice. DO NOT REPEAT */
function TableWrapper<T extends TableEntry>(props: TableProps<T>) {
  useEffect(() => {
    const table = document.querySelector('table');
    table?.parentElement?.classList.remove('scrollbar-none');
  }, []);
  return (
  <Table {...props} />
  );
}

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
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-semibold mt-8 text-center">{t('dataDict')}</h1>
      <div className="grid flex-grow overflow-hidden h-full grid-cols-4 gap-8 p-3 my-8 border bg-slate-50 dark:bg-slate-800 dark:border-slate-800 shadow">
        <div className="col-span-4 md:col-span-1 overflow-y-scroll">
          <FilterDropdown
            options={raw.columns.map(({ field }) => field as string)}
            title={t('columns')}
            onChange={setSelectedColumns}
          />
          <h3 className="my-3 font-semibold">{t('filters')}</h3>
          <div className="my-2 bg-slate-300 dark:bg-slate-600 w-full" style={{ height: '1px' }} />
          {selectedColumns.map((colName) => {
            const uniqueValues = getUniqueValues(filtered.data, colName);
            return (
              <div className="py-1" key={colName}>
                <Filter label={colName} options={uniqueValues} />
              </div>
            );
          })}
        </div>
        <div className="col-span-4 overflow-y-scroll md:col-span-3 h-full">
          <div className="mt-3 h-full">
            <TableWrapper {...filtered} />
          </div>
        </div>
      </div>
    </div>
  );
};
