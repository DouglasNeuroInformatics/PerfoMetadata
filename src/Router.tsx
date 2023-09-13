import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { DataPage } from './pages/DataPage';
import { IndexPage } from './pages/IndexPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Router = () => {
  return (
    <BrowserRouter basename="PerfoMetadata">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route element={<DataPage />} path="data" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
