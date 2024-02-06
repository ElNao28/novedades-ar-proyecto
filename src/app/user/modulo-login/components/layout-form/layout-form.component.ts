import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataForm } from '../../interfaces/FormData.interface';
import { ColoniaData, CpData, EstadoData, MunicipioData } from '../../interfaces/ApiCopo.interface';

@Component({
  selector: 'app-layout-form',
  templateUrl: './layout-form.component.html',
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

  @Output()
  estadoSelect = new EventEmitter<string>();
  @Output()
  municipioSelect = new EventEmitter<string>();
  @Output()
  cpSelect = new EventEmitter<string>();
  @Output()
  coloniaSelect = new EventEmitter<string>();

  emitEstado(estado:string){
    this.estadoSelect.emit(estado);
    console.log(estado);
  }
  emitMunicipio(municipio:string){
    this.municipioSelect.emit(municipio);
    console.log(municipio);
  }
  emitCp(cp:string){
    this.cpSelect.emit(cp);
    console.log(cp);
  }
  emitColonia(colonia:string){
    this.coloniaSelect.emit(colonia);
    console.log(colonia);
  }
  isValidField( field: string ): boolean | null {
    return this.dataForm.controls[field].errors
      && this.dataForm.controls[field].touched;
  }
}
