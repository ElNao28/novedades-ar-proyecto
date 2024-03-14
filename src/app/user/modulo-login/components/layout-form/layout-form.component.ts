import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataForm } from '../../interfaces/FormData.interface';
import { ColoniaData, CpData, EstadoData, MunicipioData } from '../../interfaces/ApiCopo.interface';

@Component({
  selector: 'app-layout-form',
  templateUrl: './layout-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './layout-form.component.css'
})
export class LayoutFormComponent {

  @Input()
  datosForm!:DataForm[];
  @Input()
  datosFormDos!:DataForm[];
  @Input()
  dataForm!:FormGroup;
  @Input()
  formValue:boolean = true;
  @Input()
  estados:EstadoData = {
    error: false,
    code_error: 0,
    error_message: null,
    response: {
        estado: "",
    }};
  @Input()
  municipios:MunicipioData = {
    error: false,
    code_error: 0,
    error_message: null,
    response: {
        municipios: "",
    }};
  @Input()
  cp:CpData = {
    error: false,
    code_error: 0,
    error_message: null,
    response: {
        cp: "",
    }};
  @Input()
  colonias:ColoniaData = {
    error: false,
    code_error: 0,
    error_message: null,
    response: {
        colonia: "",
    }};
  @Input()
  styles:string = "";

  @Output()
  estadoSelect = new EventEmitter<string>();
  @Output()
  municipioSelect = new EventEmitter<string>();
  @Output()
  cpSelect = new EventEmitter<string>();
  @Output()
  coloniaSelect = new EventEmitter<string>();
  @Output()
  onChangeFile = new EventEmitter<Event>();


  emitEstado(estado:string){
    this.estadoSelect.emit(estado);
  }
  emitMunicipio(municipio:string){
    this.municipioSelect.emit(municipio);
  }
  emitCp(cp:string){
    this.cpSelect.emit(cp);
  }
  emitColonia(colonia:string){
    this.coloniaSelect.emit(colonia);
  }
  emitChangeFile(onChangeFile:Event){
    this.onChangeFile.emit(onChangeFile);
  }
  isValidField( field: string ): boolean | null {
    return this.dataForm.controls[field].errors
      && this.dataForm.controls[field].touched;
  }
  getFieldError( field: string ): string | null {

    if ( !this.dataForm.controls[field] ) return null;

    const errors = this.dataForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }

  strengthMessage: string = '';
  userPassword: string = '';
  // Función para evaluar la fortaleza de la contraseña y mostrar un mensaje personalizado
  evaluateStrength(password: string) {
    if (password.length < 6) {
      this.strengthMessage = 'Débil';
    } else if (password.length < 10) {
      this.strengthMessage = 'Media';
    } else {
      this.strengthMessage = 'Fuerte';
    }
  }
}
