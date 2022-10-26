import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarTareaComponent } from '../agregar-editar-tarea/agregar-editar-tarea.component';
import { TareaService } from 'src/app/services/tarea.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-list-tareas',
  templateUrl: './list-tareas.component.html',
  styleUrls: ['./list-tareas.component.css']
})
export class ListTareasComponent implements OnInit {
  displayedColumns: string[] = ['tarea', 'fechaAlta', 'acciones'];
  dataSource: MatTableDataSource<Tarea>;
  loading: boolean = false;

  constructor(public dialog: MatDialog, private _tareaService: TareaService,
    private _snackBar: MatSnackBar) {
     
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.loading = true;
    setTimeout(() => {
        this._tareaService.getTareas().subscribe(data => {
        this.loading = false;
        this.dataSource.data = data;
      });
    }, 2000);
    
  }
  
  addEditTarea(id_tarea?: number) {
  const dialogRef = this.dialog.open(AgregarEditarTareaComponent, {
    width: '550px',
    disableClose: true,
    data:{id_tarea: id_tarea}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.obtenerTareas();
    }
    
  });
  
}

deleteTarea(id_tarea: number){
  this.loading = true;
  this._tareaService.deleteTarea(id_tarea).subscribe(() => {
    this.obtenerTareas();
    this.mensajeExito();
  });
}

mensajeExito(){
  this._snackBar.open("La tarea se elimino con exito!", '', {
    duration: 2000
  });
}


}
