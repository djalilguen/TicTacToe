import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
   //@Input()cellEtat:boolean=true; //disponible pour le jeu
   @Output() cellJouee = new EventEmitter<any>();
   @Input() indiceDansLeJeu:number = 0;
   @Input() cellSymbol:string = "";
   @Input() gameOver:boolean = false;
   @Input() estMonTour:boolean = true;


   selectionner(): void {
   //méthode qui implémente la facon de sélectionner les cellules par le joueur
  //chaque celluleselectionnée est remplacée par un X
     if (this.cellSymbol=='' && !this.gameOver && this.estMonTour){
       this.cellSymbol='X';
       //lancer l'evenement qui informe le composant grid-tic que cette
       //cellule est selectionnée
       let evenement = [this.indiceDansLeJeu,this.cellSymbol];
       this.cellJouee.emit(evenement);
       this.estMonTour = false;
     }

   }
   constructor() { }

   ngOnInit() {
   }
}
