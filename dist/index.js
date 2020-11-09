!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("GameOfLife",[],t):"object"==typeof exports?exports.GameOfLife=t():e.GameOfLife=t()}(self,(function(){return(()=>{"use strict";var e={519:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameOfLife=void 0;var r=i(886),o=function(){function e(e){this.frame=0,this.alivePopulation={},this.rows=e.rows,this.columns=e.columns,this.grid=this._createGrid(this.rows,this.columns)}return Object.defineProperty(e.prototype,"state",{get:function(){return this.grid},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"frameCount",{get:function(){return this.frame},enumerable:!1,configurable:!0}),e.prototype.setCellActive=function(e){var t=e.row,i=e.column-1+(t-1)*this.columns,o=r.copyWithoutReference(this.grid.cells[i]);o.alive=!0,this.grid.cells[i]=o},e.prototype.reset=function(){this.grid=this._createGrid(this.rows,this.columns),this.alivePopulation={}},e.prototype.randomise=function(){var e=this._createGrid(this.rows,this.columns),t=e.cells.length,i={};this.reset();for(var o=0;o<t;o++){var n=e.cells[o],s=Math.random()>.75;if(s){var l=r.copyWithoutReference(n);l.alive=s,e.cells[o]=l,i[l.index]=l}}this.grid=e,this.alivePopulation=i},e.prototype.resize=function(e,t){this.rows=e,this.columns=t,this.reset()},e.prototype.sequence=function(){for(var e=this._createGrid(this.rows,this.columns),t=Object.keys(this.alivePopulation).map(Number),i={},r=t.length-1;r>0;r--)for(var o=t[r],n=this.alivePopulation[o],s=this._getNeighbours(n,e),l=s.length-1;l>=0;l--){var c=s[l];switch(c.aliveNeighbours++,c.aliveNeighbours){case 3:c.alive=!0,i[c.index]=c;break;case 2:var u=c.index in this.alivePopulation;u&&(c.alive=u,i[c.index]=c);break;default:c.alive=!1,delete i[c.index]}e.cells[c.index]=c}this.frame++,this.grid=e,this.alivePopulation=i},e.prototype._createGrid=function(e,t){for(var i=new Array(e*t),r=0;r<e;r++)for(var o=0;o<t;o++){var n=o+r*t;i[n]={index:n,column:o,row:r,alive:!1,aliveNeighbours:0}}return{rows:e,columns:t,cells:i}},e.prototype._getNeighbours=function(e,t){return[t.cells[e.index-1],t.cells[e.index-t.columns-1],t.cells[e.index+t.columns-1],t.cells[e.index-t.columns],t.cells[e.index+t.columns],t.cells[e.index+1],t.cells[e.index-t.columns+1],t.cells[e.index+t.columns+1]].filter((function(e){return e}))},e}();t.GameOfLife=o},886:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.copyWithoutReference=void 0,t.copyWithoutReference=function(e){return JSON.parse(JSON.stringify(e))}},820:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameOfLife=void 0;var r=i(519);Object.defineProperty(t,"GameOfLife",{enumerable:!0,get:function(){return r.GameOfLife}})}},t={};return function i(r){if(t[r])return t[r].exports;var o=t[r]={exports:{}};return e[r](o,o.exports,i),o.exports}(820)})()}));