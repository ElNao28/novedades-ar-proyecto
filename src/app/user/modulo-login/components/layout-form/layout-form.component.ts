import { Component, Input } from '@angular/core';
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

  isValidField( field: string ): boolean | null {
    return this.dataForm.controls[field].errors
      && this.dataForm.controls[field].touched;
  }
}
