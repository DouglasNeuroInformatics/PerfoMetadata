import { useEffect, useState } from 'react';

import { LanguageToggle, Table, type TableColumn } from '@douglasneuroinformatics/ui';
import { useTranslation } from 'react-i18next';

import { Button } from '../components/Button';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
type DataRecord = {
  [key: string]: string | null;
};

export const IndexPage = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<DataRecord[]>([]);
  const { t } = useTranslation();
  async function fetchData() {
    const response = await fetch('/data.json');
    if (!response.ok) {
      console.error('Error: status code ' + response.status);
      return;
    }
    const jsonData = (await response.json()) as DataRecord[];
    setCount(count + 1);
    setData(jsonData);
  }

  useEffect(() => {
    setTimeout(() => {
      void fetchData();
    }, 2000);
  }, []);

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  const columns: TableColumn<DataRecord>[] = Object.keys(data[0]!).map((columnName) => ({
    label: columnName,
    field: columnName
  }));

  return (
    <div className="container">
      <h1>{t('title')}</h1>
      <LanguageToggle options={['en', 'fr']} />
      <Table columns={columns} data={data} />
      <p>The count is {count}</p>
      <Button
        onClick={() => {
          void fetchData();
        }}
      >
        Fetch Data
      </Button>
    </div>
  );
};
