import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ComputadorI } from '../interfaces/computador';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() computador! : ComputadorI;
  @Output() stateEdit : EventEmitter<string> = new EventEmitter(); 

  editForm! : FormGroup;  

  constructor(private fb : FormBuilder, private service : AppService) { }

  ngOnInit(): void {
    this.editForm = this.initForm();
    this.onPatchValue();
    
  }

  onPatchValue() : void {
    this.editForm.patchValue({
      gce_nombre_equipo_edit : this.computador.gce_nombre_equipo,
      gce_board_edit : this.computador.gce_board,
      gce_case_edit : this.computador.gce_case,
      gce_procesador_edit : this.computador.gce_procesador,
      gce_grafica_edit : this.computador.gce_grafica,
      gce_ram_edit : this.computador.gce_ram,
      gce_disco_duro_edit : this.computador.gce_disco_duro,
      gce_teclado_edit : this.computador.gce_teclado,
      gce_mouse_edit : this.computador.gce_mouse,
      gce_pantalla_edit : this.computador.gce_pantalla,
      gce_estado_edit : this.computador.gce_estado,
    })
  }

  initForm() : FormGroup {
    return this.fb.group({
      gce_nombre_equipo_edit : ['', [Validators.required]],
      gce_board_edit : ['', [Validators.required]],
      gce_case_edit : ['', [Validators.required]],
      gce_procesador_edit : ['', [Validators.required]],
      gce_grafica_edit : ['', [Validators.required]],
      gce_ram_edit : ['', [Validators.required]],
      gce_disco_duro_edit : ['', [Validators.required]],
      gce_teclado_edit : ['', [Validators.required]],
      gce_mouse_edit : ['', [Validators.required]],
      gce_pantalla_edit : ['', [Validators.required]],
      gce_estado_edit : ['', [Validators.required]],
    });
  }

  onStateEdit(state : string) : void {
      this.editForm.patchValue({
        gce_nombre_equipo_edit : '',
        gce_board_edit : '',
        gce_case_edit : '',
        gce_procesador_edit : '',
        gce_grafica_edit : '',
        gce_ram_edit : '',
        gce_disco_duro_edit : '',
        gce_teclado_edit : '',
        gce_mouse_edit : '',
        gce_pantalla_edit : '',        
        gce_estado_edit : '1',
      })   
    this.stateEdit.emit(state);
  }

  onEditOne() : void {  
    
    this.computador.gce_nombre_equipo = this.editForm.get('gce_nombre_equipo_edit')?.value;   
    this.computador.gce_board = this.editForm.get('gce_board_edit')?.value;   
    this.computador.gce_case = this.editForm.get('gce_case_edit')?.value;   
    this.computador.gce_procesador = this.editForm.get('gce_procesador_edit')?.value;   
    this.computador.gce_grafica = this.editForm.get('gce_grafica_edit')?.value;   
    this.computador.gce_ram = this.editForm.get('gce_ram_edit')?.value;   
    this.computador.gce_disco_duro = this.editForm.get('gce_disco_duro_edit')?.value;   
    this.computador.gce_teclado = this.editForm.get('gce_teclado_edit')?.value;   
    this.computador.gce_mouse = this.editForm.get('gce_mouse_edit')?.value;   
    this.computador.gce_pantalla = this.editForm.get('gce_pantalla_edit')?.value;   
    this.computador.gce_estado = this.editForm.get('gce_estado_edit')?.value;      


    this.service.updateOne(this.computador).subscribe(response => {
      this.onStateEdit('success');
    });

  }
 
}
