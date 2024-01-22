import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DBConfig, NgxIndexedDBModule, ObjectStoreMeta } from 'ngx-indexed-db';
import { provideAnimations } from '@angular/platform-browser/animations';

const studentObjectStoreMeta: ObjectStoreMeta = {
  store: 'students',
  storeConfig: { keyPath: 'studentId', autoIncrement: false },
  storeSchema: [
    { name: 'name', keypath: 'name', options: { unique: false } },
    { name: 'email', keypath: 'email', options: { unique: true } },
    { name: 'dateOfBirth', keypath: 'dateOfBirth', options: { unique: false } },
    { name: 'gender', keypath: 'gender', options: { unique: false } },
    { name: 'courses', keypath: 'courses', options: { unique: false } }

  ]
};

const coursesObjectStoreMeta: ObjectStoreMeta = {
    store: 'courses',
    storeConfig: { keyPath: 'courseId', autoIncrement: false }, // Adjust keyPath and autoIncrement based on your requirements
    storeSchema: [
      { name: 'courseName', keypath: 'courseName', options: { unique: false } },
      { name: 'price', keypath: 'price', options: { unique: false } },
      { name: 'students', keypath: 'students', options: { unique: false } },
      // Add other properties specific to the courses collection
    ]
};

const userObjectStoreMeta: ObjectStoreMeta = {
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: false }, // Adjust keyPath and autoIncrement based on your requirements
    storeSchema: [
      { name: 'firstName', keypath: 'firstName', options: { unique: false } },
      { name: 'lastName', keypath: 'lastName', options: { unique: false } },
      { name: 'password', keypath: 'password', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: true } },
      { name: 'accessToken', keypath: 'accessToken', options: { unique: false } },
      // Add other properties specific to the courses collection
    ]
};


const dbConfig: DBConfig = {
  name: 'project-db',
  version: 2,
  objectStoresMeta: [studentObjectStoreMeta,coursesObjectStoreMeta,userObjectStoreMeta],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)),
    provideAnimations(),
    provideAnimations()
],
};
