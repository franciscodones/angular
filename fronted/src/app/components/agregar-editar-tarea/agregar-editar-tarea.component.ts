import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-agregar-editar-tarea',
  templateUrl: './agregar-editar-tarea.component.html',
  styleUrls: ['./agregar-editar-tarea.component.css']
})
export class AgregarEditarTareaComponent implements OnInit {

  loading: boolean = false;
  operacion: string = "Agregar ";
  id_tarea: number | undefined;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarTareaComponent>,
    private fb: FormBuilder, private _tareaService: TareaService, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.form = this.fb.group({
        tarea: ['',[Validators.required, Validators.maxLength(10)]],
        fechaAlta: [null,Validators.required]
      }) 
      this.id_tarea = data.id_tarea;
    } 

  ngOnInit(): void {
    this.esEditar(this.id_tarea);
  }

  esEditar(id_tarea: number | undefined) {
    if (id_tarea !== undefined) {
      this.operacion = "Editar ";
      this.getTarea(id_tarea);
    }
  }

  getTarea(id_tarea: number){
    this._tareaService.getTarea(id_tarea).subscribe(data => {
      this.form.setValue({
        tarea: data.tarea,
        fechaAlta: new Date(data.fechaAlta)
      });
    });
  }

   cancelar(){
    this.dialogRef.close(false);
   }

   addEditTarea() {

    if(this.form.invalid){
      return;
    }
      
    const tarea: Tarea = {
      tarea: this.form.value.tarea,
      fechaAlta: this.form.value.fechaAlta.toISOString().slice(0,10)
    }
    
    this.loading = true;

    if (this.id_tarea === undefined) {
        //Se agrega
        setTimeout(() => {
          this._tareaService.addTarea(tarea).subscribe(() => {
            this.mensajeExito("agrego");
          });
        }, 1500);

    }else{
      //Se edita
        this._tareaService.updateTarea(this.id_tarea, tarea).subscribe(() => {
          this.mensajeExito("actualizo");
          
        });
    }
    this.loading = false;
    this.dialogRef.close(true);
   }

   mensajeExito(operacion: string){
    this._snackBar.open(`La tarea se ${operacion} con exito!`, '', {
      duration: 2000
    });
  }

}
