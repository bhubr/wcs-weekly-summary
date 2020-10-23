import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { WeekSummaryList, WeekSummaryEdit } from './week-summary';

const dataProvider = simpleRestProvider('http://localhost:5000/api');

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
        <Resource name="crews" />
        <Resource name="events" />
        <Resource name="week-summaries" list={WeekSummaryList} edit={WeekSummaryEdit} />
    </Admin>
  );
}
