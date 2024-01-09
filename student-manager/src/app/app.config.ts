import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { IndexedDbService } from './services/index-db.service';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'studentDB',
  version: 1,
  objectStoresMeta: [],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NgxIndexedDBModule.forRoot(dbConfig),
      
    ),
    
  ],
};
