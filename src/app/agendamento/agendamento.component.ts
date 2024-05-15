import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AgendamentoService } from './shared/services/agendamento.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'agendamento',
    standalone: true,
    imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule],
    templateUrl: './agendamento.component.html',
    styleUrl: './agendamento.component.css',
})
export class AgendamentoComponent implements OnInit {
    title = 'agendamento-nava-front';

    agendamento: FormGroup = new FormGroup('');
    dataHoje: string = this.formatDate(new Date());
    dados: any[] = [];
    taxa: Number = 2.5;
    vlTotal: Number = 0.0;
    isAgendarOpen: Boolean = false;
    isAgendamentosOpen: Boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private service: AgendamentoService
    ) { };

    ngOnInit(): void {
        this.createForm();
    };

    abrirAgendar() {
        this.isAgendarOpen = !this.isAgendarOpen;
        this.isAgendamentosOpen = !this.isAgendamentosOpen;
    };

    abrirAgendamentos() {
        this.isAgendarOpen = !this.isAgendarOpen;
        this.isAgendamentosOpen = !this.isAgendamentosOpen;

        this.service.getAgendamentos().subscribe(
            data => {
                this.dados = data;
            }
        )
    };

    createForm() {
        this.agendamento = this.formBuilder.group({
            contaDestino: [''],
            contaOrigem: [123568552],
            vlTransferencia: [0.0],
            dtAgendamento: [this.dataHoje],
            dtTransferencia: [this.converterData(this.dataHoje)]
        })
    };

    formatDate(date: number | Date | undefined) {
        return new Intl.DateTimeFormat('pt-BR').format(date);
    };

    converterData(dataString: string): string {
        const partes = dataString.split('/');

        const ano = partes[2];
        const mes = partes[1];
        const dia = partes[0];

        const dataFormatada = `${ano}-${mes}-${dia}`;

        return dataFormatada;
    };

    atualizarTaxaAndVlTotal() {
        this.getTaxa();
        this.getValorAtualizado();
    };

    getTaxa() {
        let dtAgendamento = this.converterData(this.dataHoje);
        this.service.getTaxa(dtAgendamento, this.dtTransferencia!.value, this.vlTransferencia!.value).subscribe(
            data => {
                this.taxa = data;
            }
        )
    };

    getValorAtualizado() {
        this.service.getValorAtualizado().subscribe(
            data => {
                this.vlTotal = data;
            }
        )
    };

    onSubmit() {
        const data = this.agendamento.value;

        if(this.vlTotal.valueOf() < 0.0){
            alert("O valor com as taxas esta inferior a zero.");
            return;
        }

        data.dtAgendamento = this.converterData(this.dataHoje);

        this.service.salvarAgendamento(
            data.contaDestino,
            data.contaOrigem,
            data.vlTransferencia,
            data.dtAgendamento,
            data.dtTransferencia
        ).subscribe(
            (infoAgendamento: any) => {
                this.createForm();
                this.taxa = 2.5;
                this.vlTotal = 0;
                alert("Agendamento feito com sucesso.");
            }
        )
    };

    get vlTransferencia() { return this.agendamento.get('vlTransferencia'); };
    get dtAgendamento() { return this.agendamento.get('dtAgendamento'); };
    get dtTransferencia() { return this.agendamento.get('dtTransferencia'); };
}