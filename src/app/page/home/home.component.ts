import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pizzaFormGroup = new FormGroup({

  });

  usuarioLogueado : string  = "";

  constructor(private autenticarService:AutenticarService) { }

  ngOnInit(): void {
    this.autenticarService.getUsuarioLogueado().then((res) =>{
      console.log(res?.email);
      this.usuarioLogueado = res?.email?.toString() ?? '';
    })
  }

  aVer(){
    console.log(this.usuarioLogueado);
  }

}
