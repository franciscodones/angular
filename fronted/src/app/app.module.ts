import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListTareasComponent } from './components/list-tareas/list-tareas.component';
import { AgregarEditarTareaComponent } from './components/agregar-editar-tarea/agregar-editar-tarea.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos
import { SharedModule } from './shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';




@NgModule({
  declarations: [
    AppComponent,
    ListTareasComponent,
    AgregarEditarTareaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
