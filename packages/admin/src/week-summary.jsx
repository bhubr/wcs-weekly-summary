import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  DateInput,
  ReferenceManyField,
  SingleFieldList,
  ChipField,
  ReferenceArrayInput,
  SelectArrayInput,
} from 'react-admin';
import {Controlled as CodeMirror} from 'react-codemirror2';

export const WeekSummaryList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="crewId" reference="crews">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceManyField label="Events" reference="events" target="weekSummaryId">
          <SingleFieldList>
              <ChipField source="title" />
          </SingleFieldList>
      </ReferenceManyField>
      <DateField source="startDate" />
      <TextField multiline source="content" />
    </Datagrid>
  </List>
);

export const WeekSummaryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <ReferenceInput source="crewId" reference="crews">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateInput source="startDate" />
      <TextInput source="content" />
      <ReferenceArrayInput source="eventIds" reference="events">
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);
