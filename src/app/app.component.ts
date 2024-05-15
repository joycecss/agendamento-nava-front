import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AgendamentoComponent } from "./agendamento/agendamento.component";
import { HttpClientModule } from '@angular/common/http';
import { AgendamentoService } from './agendamento/shared/services/agendamento.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ReactiveFormsModule, AgendamentoComponent, HttpClientModule]
})
export class AppComponent implements OnInit {
  title = 'agendamento-nava-front';

  agendamento: FormGroup = new FormGroup('');

  dataHoje = this.formatDate(new Date());

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.agendamento = this.formBuilder.group({
      contaDestino: ['teste'],
      contaOrigem: ['teste'],
      vlTransferencia: [''],
      dtAgendamento: [this.dataHoje],
      dtTransferencia: [''],
      taxa: [''],
      vlTotal: ['']
    })
  }

  formatDate(date: number | Date | undefined) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  }
  
  onSubmit(){
  }
}