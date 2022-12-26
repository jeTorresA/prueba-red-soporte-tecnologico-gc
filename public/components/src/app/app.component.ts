import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { ComputadorI } from './interfaces/computador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  registerForm! : FormGroup;  
  computadores : ComputadorI[] = []; 
  goToEdit : boolean = false;

  computadorToEdit! : ComputadorI;

  constructor(private service: AppService, private readonly fb : FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.initForm();
    this.registerForm.patchValue({gce_estado : '1'});

    this.getComputers();        

  }

  onGoToEdit(computador : ComputadorI) : void {
    this.computadorToEdit = computador;
    this.goToEdit = true;    
  }

  getComputers() : void {    
    this.service.getAll().subscribe(data => {     
      this.computadores = [... data.data ];            
    });
  }

  onAddOne() : void {    
    this.service.addOne(this.registerForm.value).subscribe(response => {
      this.getComputers(); 
      //this.onPatchValue();  /**Limpiar campos del formulario de registro */   
    });
  }

  onUpdateStatus(computador : ComputadorI) : void {
     computador.gce_estado = computador.gce_estado === '1' ? '0' : '1';
     console.log(computador);  
     
     this.service.updateOne(computador).subscribe(response => {       
      this.getComputers(); 
     });
  }

  onDeleteOne(computador : ComputadorI) : void {
    if(confirm('¿Deseas eliminar este computador?')){
      this.service.deleteOne(computador).subscribe(response => { 
        this.getComputers();    
      });    
    }
  }

  onStateEdit(stateEvent : string) : void {      
    if(stateEvent === 'succes'){
      this.getComputers();
    }
    this.goToEdit = false;
  }

  initForm() : FormGroup {
    return this.fb.group({
      gce_nombre_equipo : ['', [Validators.required]],
      gce_board : ['', [Validators.required]],
      gce_case : ['', [Validators.required]],
      gce_procesador : ['', [Validators.required]],
      gce_grafica : ['', [Validators.required]],
      gce_ram : ['', [Validators.required]],
      gce_disco_duro : ['', [Validators.required]],
      gce_teclado : ['', [Validators.required]],
      gce_mouse : ['', [Validators.required]],
      gce_pantalla : ['', [Validators.required]],
      gce_estado : ['', [Validators.required]],
    });
  }

  onPatchValue() : void {
    this.registerForm.patchValue({
      gce_nombre_equipo : '',
      gce_board : '',
      gce_case : '',
      gce_procesador : '',
      gce_grafica : '',
      gce_ram : '',
      gce_disco_duro : '',
      gce_teclado : '',
      gce_mouse : '',
      gce_pantalla : '',
      gce_estado : '1',
    })
  }

}

