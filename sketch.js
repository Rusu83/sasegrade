var stare=1;
var inp,inb;
var inc,listainc=[5],listaincl;
var fin,listafin=[5],listafinl;
var paginispate=[500],rezultat=[5],crezultat;
var URLcautare='https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
var URLspate='https://en.wikipedia.org/w/api.php?action=query&list=backlinks&format=json&bllimit=max&bltitle=';
var URLlinkuri='https://en.wikipedia.org/w/api.php?action=query&prop=links&pllimit=max&format=json&titles=';
var i,u=0,vizc=0,continuam=true;
var linkuri=[],tati=[],viz=[];


function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  inb=createButton('NEXT');
  inb.mouseClicked(buton);
  inb.position((width-inb.width)/2,height-2*inb.height);
  inp=createInput();
  inp.position((width-inp.width)/2,height-4*inp.height);
  textAlign(CENTER);
  rectMode(CENTER);
  textSize(width/40);
}

function draw() {
  background(200,200,230);
  switch(stare)
  {
    case 0:ceface();break;
    case 1:cummerge();break;
    case 2:alegeinc();break;
    case 3:incarcainc();break;
    case 4:asteapta();break;
    case 5:selecteazainc();break;
    case 6:alegefin();break;
    case 7:incarcafin();break;
    case 8:selecteazafin();break;
    case 9:drum();break;
    case 10:rabdare();break;
    case 11:proces();break;
    case 12:gata();break;
  }
}

function buton(){
  switch(stare)
  {
    case 0:stare=1;break;
    case 1:stare=2;break;
    case 2:stare=3;break;
    case 4:stare=10;break;
    case 6:stare=7;break;
    case 10:stare=2;break;
  }
}
function keyTyped(){
  if(stare==5)
    if(int(key)>=1&&int(key)<=listaincl){
      inc=listainc[int(key)-1].replace(/\s+/g, '_');
      inp.value('');
      stare=6;
    }
  if(stare==8)
    if(int(key)>=1&&int(key)<=listafinl){
      fin=listafin[int(key)-1].replace(/\s+/g, '_');
      inp.value('');
      stare=4;
      loadJSON(URLspate+fin,cautainspate,'jsonp');
    }
}

function ceface(){
  inp.value('');
  text("Principiul celor șase grade de separație reprezintă ideea că,\nprivind fiecare persoană ca pe un nod al unui graf neorientat și \nlegăturile sociale dintre acestea ca pe muchiile acestuia, cel\nmai scurt lanț dintre oricare două persoane are o lungime medie egală cu șase.\nAcest concept se aplică și altor astfel de modele, deși cu alte valori medii.\nAceastă aplicație menește să exemplifice acest principiu pe un model \nasemănător înlocuind oamenii cu pagini ale site-ului Wikipedia\nși legăturile sociale cu hyperlink-urile dintre acestea.",width/2,height/3);
}

function cummerge(){
  inp.value('');
  text("See the shortest path between 2 Wikipedia articles.\n(As long as they are not immediately connected)",width/2,height/3);
}

function asteapta(){
  text("Loading...",width/2,height/2);
}

function rabdare(){
  inp.value('');
  text('Either wait longer,\nor there is an issue with your input.',width/2,height/2);
}

function proces(){
  text(i*500+"\nHyperlinks scanned...",width/2,height/2);
}

function gasit(){
  rezultat[0]=fin.replace(/_/g,' ');
  crezultat=1;
  while(tati[u]!=-1){
    rezultat[crezultat++]=linkuri[u].replace(/_/g,' ');
    u=tati[u];
  }
  rezultat[crezultat]=inc.replace(/_/g,' ');
  stare=12;
}

function gata(){
	noStroke();
   for(j=0;j<=crezultat;j++)
      text(rezultat[j],width/2,height-(j+1)*height/(crezultat+2));
   strokeWeight(width/100);
   stroke(0,40,40);
	line(width/4,height/9,width/4,height/9*8);
	line(width/4,height/9*8,width/4-width/20,height/9*8-width/10);
	line(width/4*3,height/9,width/4*3,height/9*8);
	line(width/4*3,height/9*8,width/4*3+width/20,height/9*8-width/10);
}

function alegeinc(){
  text("Input text in the box below to search on Wikipedia.",width/2,height/3);
}

function incarcainc(){
  var cautare=inp.value();
  cautare=cautare.replace(/\s+/g, '_');
  loadJSON(URLcautare+cautare,listeazainc,'jsonp');
  stare=4;
}

function listeazainc(dateinc){
  if(dateinc[1].length<5)
    listaincl=dateinc[1].length;
  else
    listaincl=5;
  for(i=0;i<listaincl;i++)
    listainc[i]=dateinc[1][i];
  stare=5;
}

function selecteazainc(){
  text('Press the keyoard button for the desired article.',width/2,width/49);
  for(i=0;i<listaincl;i++){
    rect(width/2,height*((i+1)/7),width*(7/10),height/8);
    text((i+1)+')',width/2-width*(7/21),height*((i+1)/7));
    text(listainc[i],width/2,height*((i+1)/7));
  }
}

function alegefin(){
  text("Type text below to search on Wikipedia",width/2,height/3);
}

function incarcafin(){
  var cautare=inp.value();
  cautare=cautare.replace(/\s+/g, '_');
  loadJSON(URLcautare+cautare,listeazafin,'jsonp');
  stare=4;
}

function listeazafin(datefin){
  if(datefin[1].length<5)
    listafinl=datefin[1].length;
  else
    listafinl=5;
  for(i=0;i<listafinl;i++)
    listafin[i]=datefin[1][i];
  stare=8;
}

function selecteazafin(){
  text('Press the keyoard button for the desired article.',width/2,width/49);
  for(i=0;i<listafinl;i++){
    rect(width/2,height*((i+1)/7),width*(7/10),height/8);
    text((i+1)+')',width/2-width*(7/21),height*((i+1)/7));
    text(listafin[i],width/2,height*((i+1)/7));
  }
}

function cautainspate(date){
  var page=date.query.backlinks;
  for(j=0;j<page.length;j++)
    paginispate[j]=page[j].title.replace(/\s+/g, '_');
  stare=9;
}

function drum(){
  if(inc==fin)
    text('You chose the same article twice',width/2,height/2);
  else{
    i=0;
    tati[0]=-1;
    linkuri[0]=inc;
    cautare();
  }
  stare=11;
}

function cautare(){
  var vizitat=0,j;
  for(j=0;j<vizc;j++)
    if(viz[j]==linkuri[i])
      vizitat=1;
  if(vizitat==1){
    i++;
    cautare();
  }
  else{
    viz[vizc++]=linkuri[i];
    if(continuam)
      loadJSON(URLlinkuri+linkuri[i],cautlinkuri,'jsonp');
  }
}

function cautlinkuri(date){
  var page=date.query.pages;
  var pageID=Object.keys(page);
  var pagini=(page[pageID].links);
  var k,l;  
  if(pagini!=undefined)
    for(k=0;k<pagini.length&&continuam;k++)
      if(pagini[k].ns==0){
        linkuri[++u]=pagini[k].title.replace(/\s+/g, '_');
        tati[u]=i;
        for(l=0;l<paginispate.length;l++)
          if(linkuri[u]==paginispate[l]){
            continuam=false;
            gasit();
          }
      }
  i++;
  cautare();
}
