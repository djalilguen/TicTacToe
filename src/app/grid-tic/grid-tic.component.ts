import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-tic',
  templateUrl: './grid-tic.component.html',
  styleUrls: ['./grid-tic.component.css']
})
export class GridTicComponent implements OnInit {
  cells= [
          {cellSymbol:''}
         ,{cellSymbol:''}
         ,{cellSymbol:''}
         ,{cellSymbol:''}
         ,{cellSymbol:''}
         ,{cellSymbol:''}
         ,{cellSymbol:''}
         ,{cellSymbol:''}
         ,{cellSymbol:''}
      ];

  joueur : string = "X";
  ordinateur : string = "O";
  gameOver : boolean = false ;//utilisé pour signifier si la partie est finie
                              //ou non
  resultat : string ='';
  estMonTour:boolean=true;//utilisé pour alterner entre le joueur et
                          //l'ordinateur

  constructor() { }

  ngOnInit() {
      this.chercherCellVide;
  }

  newGame():void{
    //réinitialise toutes les cellules a vide
    this.cells.forEach((c)=>{c.cellSymbol=''});
    this.gameOver = false;
    this.estMonTour = true;
  }

  tourOrdinateur() {
    //comme son nom l'indique, cette méthode permet d'implémenter la facon de
    //jouer de l'ordinateur.
    setTimeout(() => {
      let cellule=this.getRandomAvailableSquare();
      this.cells[cellule].cellSymbol =this.ordinateur;
    if(this.chercherCellVide()>0){
      if(this.leGagnant(this.ordinateur)==true){
        this.resultat = 'Ordinateur gagne la partie !!!';
        this.gameOver=true;
      }
    }else{
      this.gameOver=true;
      if(this.leGagnant(this.ordinateur)==false){
        this.resultat = 'Match nul !!!';
      }else{
        this.resultat = 'Ordinateur gagne la partie !!!';
      }

    }
    this.estMonTour=true;
  }, 1000);
}
  getRandomAvailableSquare(): number {
      let i = this.getRndInteger(0, this.getCellsVide().length - 1);
      let squareIndex=this.getCellsVide()[i]
      return squareIndex;
    }

    getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1) ) + min;
 }


  majCells(t) {
    //implémente comment le joueur peut interagir avec les cellules
    //t représente le tableau cells avec ses elements qui contiennent soit
    //des X ou O
    let indiceCellModifie = t[0];
    let symbol = t[1];
    this.cells[indiceCellModifie].cellSymbol = symbol;
    this.estMonTour=false;

    if(this.chercherCellVide()>0){
      if(this.leGagnant(this.joueur)==true){
        this.resultat = 'Le joueur gagne la partie !!';
        this.gameOver=true;
      }else{
        if(!this.gameOver){
          this.tourOrdinateur();
        }

      }
    }
    if(this.chercherCellVide()==0){
      if(this.leGagnant(this.joueur)==false){
        this.resultat = 'Match nul !!!';
      }else{
        this.resultat = 'Le joueur gagne la partie !!';
      }
    }
  }
  chercherCellVide():number{
    //retourne le nombre de cellules vides, non encore sélectionnées par aucun
    //des 2 joueurs
    let som:number=0
    this.cells.forEach((c)=>{ if (c.cellSymbol=='') som++;});
    if (som==0){this.gameOver=true;}
    return som;
  }

  getCellsVide():number[]{
    //retourne un tableau des cellules non encore sélectionnées par aucun
    //2 joueurs
    let cellsVide=[];
    this.cells.forEach((c, i) => { if (c.cellSymbol=='') cellsVide.push(i);});
    return cellsVide;
  }


  leGagnant(symbol):boolean{
    //permet de tester pour chaque joueur s'il a obtenu une combinaison
    //gagnante
    let xArray=[symbol,symbol,symbol];
    let b:boolean=false;
    this.combinaisonsGagnantes().forEach((e)=>{
        if (e[0]==xArray[0] && e[1]==xArray[1] && e[2]==xArray[2]){
          b=true;}});
    return b;
  }

  combinaisonsGagnantes(): any[] {
    //retourne un tableau de toutes les combinaisons gagnantes
    return [
      [this.cells[0].cellSymbol, this.cells[1].cellSymbol, this.cells[2].cellSymbol],  //top row
      [this.cells[3].cellSymbol, this.cells[4].cellSymbol, this.cells[5].cellSymbol],  //middle row
      [this.cells[6].cellSymbol, this.cells[7].cellSymbol, this.cells[8].cellSymbol], //bottom row
      [this.cells[0].cellSymbol, this.cells[3].cellSymbol, this.cells[6].cellSymbol],//first col
      [this.cells[1].cellSymbol, this.cells[4].cellSymbol, this.cells[7].cellSymbol],//second col
      [this.cells[2].cellSymbol, this.cells[5].cellSymbol, this.cells[8].cellSymbol],////third col
      [this.cells[0].cellSymbol, this.cells[4].cellSymbol, this.cells[8].cellSymbol],//first diagonal
      [this.cells[2].cellSymbol, this.cells[4].cellSymbol, this.cells[6].cellSymbol],//second diagonal
    ];
  }


}
