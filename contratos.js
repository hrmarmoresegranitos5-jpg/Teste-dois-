// ═══════════════════════════════════════════════════════
// ORÇAMENTOS (originalmente orcamentos.js)
// ═══════════════════════════════════════════════════════

// ═══ MATERIAL ═══
function buildMat(){
  var GRUPOS=[
    {cat:'Granito Cinza',icon:'🩶'},
    {cat:'Granito Preto',icon:'🖤'},
    {cat:'Granito Branco',icon:'🤍'},
    {cat:'Granito Verde',icon:'💚'},
    {cat:'Mármore',icon:'🌿'},
    {cat:'Travertino',icon:'🟤'},
    {cat:'Quartzito',icon:'💎'},
    {cat:'Ultra Compacto',icon:'⚡'}
  ];
  var h='';
  GRUPOS.forEach(function(grp){
    var ss=CFG.stones.filter(function(s){return s.cat===grp.cat;});
    if(!ss.length)return;
    h+='<div class="mcat">'+grp.icon+' '+grp.cat+'</div>';
    h+='<div class="mscroll">';
    ss.forEach(function(s){
      var on=s.id===selMat?'on':'';
      h+='<div class="mc '+on+'" data-mat="'+s.id+'">';
      h+='<div class="msw '+(s.photo?'':s.tx)+'">';
      if(s.photo)h+='<img src="'+s.photo+'" alt="">';
      h+='<div class="mshine"></div>';
      h+='</div>';
      h+='<div class="mbody">';
      h+='<div class="mnm">'+s.nm+'</div>';
      h+='<div class="mfin">'+s.fin+' · R$ '+s.pr.toLocaleString('pt-BR')+'</div>';
      h+='</div></div>';
    });
    h+='</div>';
  });
  document.getElementById('matArea').innerHTML=h;
}
function pickMat(id){selMat=id;document.querySelectorAll('.mc').forEach(function(c){c.classList.toggle('on',c.dataset.mat===id);});}

// ═══ SERVIÇOS ═══
var SV_DEFS={
'Cozinha':[
  {g:'Sainha',its:[{k:'s_reta',l:'Sainha Reta',u:'sf'},{k:'s_45',l:'Sainha 45°',u:'sf'},{k:'s_boleada',l:'Sainha Boleada',u:'sf'},{k:'s_slim',l:'Sainha Slim',u:'sf'}]},
  {g:'Frontão',its:[{k:'frontao',l:'Frontão Reto',u:'sf'},{k:'frontao_chf',l:'Frontão Chanfrado',u:'sf'}]},
  {g:'Furos & Recortes',its:[{k:'forn',l:'Furo Torneira',u:'un',fx:0},{k:'fralo',l:'Furo Ralo',u:'un',fx:0},{k:'cook',l:'Recorte Cooktop',u:'un',fx:1}]},
  {g:'Rebaixo',its:[{k:'reb_n',l:'Rebaixo Normal',u:'un',fx:1},{k:'reb_a',l:'Rebaixo Americano',u:'un',fx:1}]},
  {g:'Cuba',its:[{k:'cuba_coz',l:'Escolher cuba inox ou esculpida',u:'cuba',ctp:'coz'}]},
  {g:'Área Molhada',its:[{k:'rodape',l:'Rodapé de Pedra',u:'sf'}]},
  {g:'Fixação',its:[{k:'tubo',l:'Tubo Metálico',u:'un',fx:0},{k:'cant',l:'Cantoneira',u:'un',fx:0}]},
  {g:'Instalação',its:[{k:'inst',l:'Instalação Padrão',u:'un',fx:1},{k:'inst_c',l:'Instalação Complexa',u:'un',fx:1}]},
  {g:'Deslocamento',its:[{k:'desl_cid',l:'Na cidade',u:'livre'},{k:'desl_for',l:'Fora da cidade',u:'km',fx:0}]}
]};
SV_DEFS.Banheiro=[
  {g:'Sainha',its:[{k:'s_reta',l:'Sainha Reta',u:'sf'},{k:'s_45',l:'Sainha 45°',u:'sf'},{k:'s_boleada',l:'Sainha Boleada',u:'sf'},{k:'s_slim',l:'Sainha Slim',u:'sf'}]},
  {g:'Frontão',its:[{k:'frontao',l:'Frontão Reto',u:'sf'},{k:'frontao_chf',l:'Frontão Chanfrado',u:'sf'}]},
  {g:'Furos',its:[{k:'forn',l:'Furo Torneira',u:'un',fx:0},{k:'fralo',l:'Furo Ralo',u:'un',fx:0}]},
  {g:'Área Molhada',its:[{k:'rodape',l:'Rodapé de Pedra',u:'sf'}]},
  {g:'Cuba / Lavatório',its:[{k:'cuba_lav',l:'Escolher cuba ou lavatório',u:'cuba',ctp:'lav'}]},
  {g:'Fixação',its:[{k:'tubo',l:'Tubo Metálico',u:'un',fx:0},{k:'cant',l:'Cantoneira',u:'un',fx:0}]},
  {g:'Instalação',its:[{k:'inst',l:'Instalação Padrão',u:'un',fx:1},{k:'inst_c',l:'Instalação Complexa',u:'un',fx:1}]},
  {g:'Deslocamento',its:[{k:'desl_cid',l:'Na cidade',u:'livre'},{k:'desl_for',l:'Fora da cidade',u:'km',fx:0}]}
];
SV_DEFS.Lavabo=[{g:'Sainha',its:[{k:'s_reta',l:'Sainha Reta',u:'sf'},{k:'s_45',l:'Sainha 45°',u:'sf'}]},{g:'Frontão',its:[{k:'frontao',l:'Frontão Reto',u:'sf'},{k:'frontao_chf',l:'Frontão Chanfrado',u:'sf'}]},{g:'Furos',its:[{k:'forn',l:'Furo Torneira',u:'un',fx:0}]},{g:'Área Molhada',its:[{k:'rodape',l:'Rodapé de Pedra',u:'sf'}]},{g:'Cuba / Lavatório',its:[{k:'cuba_lav',l:'Escolher cuba ou lavatório',u:'cuba',ctp:'lav'}]},{g:'Instalação',its:[{k:'inst',l:'Instalação Padrão',u:'un',fx:1}]},{g:'Deslocamento',its:[{k:'desl_cid',l:'Na cidade',u:'livre'},{k:'desl_for',l:'Fora da cidade',u:'km',fx:0}]}];
SV_DEFS.Soleira=[{g:'Acabamento',its:[{k:'sol1',l:'1 lado',u:'ml'},{k:'sol2',l:'2 lados',u:'ml'}]},{g:'Instalação',its:[{k:'inst',l:'Instalação Padrão',u:'un',fx:1}]},{g:'Deslocamento',its:[{k:'desl_cid',l:'Na cidade',u:'livre'},{k:'desl_for',l:'Fora da cidade',u:'km',fx:0}]}];
SV_DEFS.Peitoril=[{g:'Tipo',its:[{k:'peit_reto',l:'Peitoril Reto',u:'ml'},{k:'peit_ping',l:'c/ Pingadeira',u:'ml'},{k:'peit_col',l:'c/ Pedra Colada + Pingadeira',u:'ml'},{k:'peit_portal',l:'p/ Portal Madeira',u:'ml'}]},{g:'Instalação',its:[{k:'inst',l:'Instalação Padrão',u:'un',fx:1},{k:'inst_c',l:'Instalação Complexa',u:'un',fx:1}]},{g:'Deslocamento',its:[{k:'desl_cid',l:'Na cidade',u:'livre'},{k:'desl_for',l:'Fora da cidade',u:'km',fx:0}]}];
SV_DEFS.Escada=[{g:'Sainha',its:[{k:'s_reta',l:'Sainha Reta',u:'sf'},{k:'s_45',l:'Sainha 45°',u:'sf'},{k:'s_boleada',l:'Sainha Boleada',u:'sf'}]},{g:'Frontão',its:[{k:'frontao',l:'Frontão Reto',u:'sf'},{k:'frontao_chf',l:'Frontão Chanfrado',u:'sf'}]},{g:'Instalação',its:[{k:'inst',l:'Instalação Padrão',u:'un',fx:1},{k:'inst_c',l:'Instalação Complexa',u:'un',fx:1}]},{g:'Deslocamento',its:[{k:'desl_cid',l:'Na cidade',u:'livre'},{k:'desl_for',l:'Fora da cidade',u:'km',fx:0}]}];
SV_DEFS.Fachada=[{g:'Fixação',its:[{k:'tubo',l:'Tubo Metálico',u:'un',fx:0},{k:'cant',l:'Cantoneira',u:'un',fx:0}]},{g:'Instalação',its:[{k:'inst',l:'Instalação Padrão',u:'un',fx:1},{k:'inst_c',l:'Instalação Complexa',u:'un',fx:1}]},{g:'Deslocamento',its:[{k:'desl_cid',l:'Na cidade',u:'livre'},{k:'desl_for',l:'Fora da cidade',u:'km',fx:0}]}];
SV_DEFS.Outro=SV_DEFS.Cozinha;

// Acessórios — adicionado em todos os tipos
// Acessórios ficam no catálogo próprio, não nos serviços do orçamento

function getSVGrp(){return SV_DEFS[document.getElementById('oTipo').value]||SV_DEFS.Cozinha;}
function getIt(k){var g=getSVGrp();for(var i=0;i<g.length;i++){for(var j=0;j<g[i].its.length;j++){if(g[i].its[j].k===k)return g[i].its[j];}}return null;}
function getPr(k){return CFG.sv[k]||0;}

function buildSV(){
  selCuba=null;
  var g=getSVGrp(),h='';
  g.forEach(function(grp){
    h+='<div class="svblk"><div class="svhd">'+grp.g+'</div>';
    grp.its.forEach(function(it){
      var pr=getPr(it.k);
      var hint=it.u==='sf'?'R$ '+pr+'/ml + m² pedra':it.u==='ml'?'R$ '+pr+'/ml':it.u==='km'?'R$ '+pr+'/km':it.u==='cuba'?'Selecionar modelo':it.u==='livre'?'Valor livre':it.fx===1&&pr?'R$ '+pr:'R$ '+pr;
      h+='<div class="svrow" id="sr-'+it.k+'" data-sv="'+it.k+'"><div class="svchk">✓</div><div class="svlbl">'+it.l+'<span class="svph">'+hint+'</span></div></div>';
      if(it.u==='sf'){
        h+='<div class="sfw" id="sf-'+it.k+'"><div class="sfl">'+it.l+'</div><div class="sfr"><div class="sf"><span>Comprimento (ml)</span><input type="number" id="sw-'+it.k+'" placeholder="2.50" step="0.01" min="0" oninput="calcSF(\''+it.k+'\')" onclick="event.stopPropagation()"></div><div class="sfx">×</div><div class="sf"><span>Altura (cm)</span><input type="number" id="sh-'+it.k+'" placeholder="6" step="0.5" min="0" oninput="calcSF(\''+it.k+'\')" onclick="event.stopPropagation()"></div><div class="sf"><span>Qtd</span><input type="number" id="sq-'+it.k+'" value="1" min="1" style="width:48px;" oninput="calcSF(\''+it.k+'\')" onclick="event.stopPropagation()"></div></div><div class="sfres" id="sfr-'+it.k+'"></div></div>';
      } else if(it.u==='cuba'){
        h+='<div class="svcuba" id="sq-'+it.k+'"><span id="cdisp-'+it.k+'"></span></div>';
      } else if(it.u==='livre'){
        h+='<div class="svxtr" id="sq-'+it.k+'"><input type="number" id="si-'+it.k+'" placeholder="valor" step="1" min="0" onclick="event.stopPropagation()"><span class="svunit">reais</span></div>';
      } else if(!it.fx){
        h+='<div class="svxtr" id="sq-'+it.k+'"><input type="number" id="si-'+it.k+'" placeholder="'+(it.u==='ml'?'metros':'qtd')+'" step="0.1" min="0" onclick="event.stopPropagation()"><span class="svunit">'+it.u+'</span></div>';
      } else {
        h+='<div id="sq-'+it.k+'" style="display:none;"></div>';
      }
    });
    h+='</div>';
  });
  document.getElementById('svArea').innerHTML=h;
}

function calcSF(k){
  var ml=+document.getElementById('sw-'+k).value||0;
  var altCm=+document.getElementById('sh-'+k).value||0;
  var q=+document.getElementById('sq-'+k).value||1;
  var el=document.getElementById('sfr-'+k);if(!el)return;
  if(ml&&altCm){
    var m2=ml*(altCm/100)*q;
    var mat=CFG.stones.find(function(s){return s.id===selMat;});
    var pv=mat?m2*mat.pr:0;
    var mo=ml*q*getPr(k);
    el.innerHTML='<span style="color:var(--grn)">Pedra: '+m2.toFixed(3)+'m² → R$ '+fm(pv)+'</span>  <span style="color:var(--gold2)">M.O.: R$ '+fm(mo)+'</span>';
  }else{el.textContent='';}
}

// ═══ CUBA PICKER ═══
function openCubaPick(tipo,svKey){
  _cubaPickKey=svKey;
  var lista=tipo==='coz'?CFG.coz:CFG.lav;
  document.getElementById('cpTitle').textContent=tipo==='coz'?'Cubas para Cozinha':'Cubas para Banheiro/Lavabo';
  document.getElementById('cpSub').textContent='Cubas HR (fornecemos) ou cliente traz (só mão de obra)';
  var h='';
  // Cliente option
  var instCli=tipo==='coz'?160:280;
  h+='<div class="cpcard" data-pcuba="__cli__" data-ctype="'+tipo+'"><div class="cpthumb" style="background:var(--s3);font-size:1.4rem;color:var(--t3);display:grid;place-items:center;">📦</div><div><div class="cpbrand">Cliente Fornece</div><div class="cpnm">Só Mão de Obra</div><div class="cpdim">Cliente compra, HR instala</div><div class="cppr">M.O.: <b>R$ '+instCli+'</b></div></div></div>';
  h+='<div style="font-size:.57rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:600;margin:13px 0 8px;">Cubas HR — fornecemos e instalamos</div>';
  lista.filter(function(c){return c.pr>0;}).forEach(function(c){
    var tot=c.pr+c.inst;
    var _prStr=c.pr>0?'Cuba <b>R$ '+c.pr+'</b> + M.O. R$ '+c.inst+' = <b>R$ '+tot+'</b>':'M.O. <b>R$ '+c.inst+'</b> (produto a consultar)';
    h+='<div class="cpcard" data-pcuba="'+c.id+'" data-ctype="'+tipo+'"><div class="cpthumb">'+(c.photo?'<img src="'+c.photo+'" alt="">':(c.tipo?'🚿':'🔧'))+'</div><div><div class="cpbrand">'+c.brand+'</div><div class="cpnm">'+c.nm+'</div><div class="cpdim">'+c.dim+'</div><div class="cppr">'+_prStr+'</div></div></div>';
  });
  // Esculpidas — disponível para cozinha e banheiro/lavabo
  // Para cozinha usa CFG.lav (esculpidas estão lá) pois lav tem tipo Esculpida
  var escLista=CFG.lav.filter(function(x){return x.tipo==='Esculpida';});
  if(escLista.length){
    h+='<div style="font-size:.57rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:600;margin:13px 0 8px;">🪨 Cuba Esculpida na Pedra</div>';
    h+='<div style="background:var(--s3);border:1px solid var(--bd2);border-radius:11px;padding:13px 14px;margin-bottom:6px;">';
    h+='<div style="font-size:.7rem;color:var(--t2);line-height:1.6;margin-bottom:10px;">Cuba escavada direto na pedra. Informe as dimensões para calcular pedra + mão de obra.</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px;">';
    h+='<div><div style="font-size:.6rem;color:var(--t3);margin-bottom:3px;">Comprimento (cm)</div><input type="number" id="escW" placeholder="50" min="20" onclick="event.stopPropagation()" style="width:100%;background:var(--s2);border:1px solid var(--bd2);border-radius:8px;padding:8px 10px;color:var(--tx);font-family:Outfit,sans-serif;font-size:.85rem;outline:none;"></div>';
    h+='<div><div style="font-size:.6rem;color:var(--t3);margin-bottom:3px;">Largura (cm)</div><input type="number" id="escH" placeholder="40" min="20" onclick="event.stopPropagation()" style="width:100%;background:var(--s2);border:1px solid var(--bd2);border-radius:8px;padding:8px 10px;color:var(--tx);font-family:Outfit,sans-serif;font-size:.85rem;outline:none;"></div>';
    h+='<div><div style="font-size:.6rem;color:var(--t3);margin-bottom:3px;">Profundidade (cm)</div><input type="number" id="escD" placeholder="20" min="10" onclick="event.stopPropagation()" style="width:100%;background:var(--s2);border:1px solid var(--bd2);border-radius:8px;padding:8px 10px;color:var(--tx);font-family:Outfit,sans-serif;font-size:.85rem;outline:none;"></div>';
    h+='</div>';
    h+='<div id="escPreviewBox" style="font-size:.72rem;color:var(--t3);margin-bottom:10px;">Preencha as dimensões e selecione o tipo abaixo</div>';
    h+='<div style="font-size:.6rem;color:var(--t3);margin-bottom:8px;">Tipo de acabamento:</div>';
    escLista.forEach(function(esc){
      h+='<button onclick="pickEsculpida(\''+esc.id+'\',\''+tipo+'\')" style="width:100%;background:var(--gdim);border:1px solid var(--gold3);border-radius:10px;padding:12px 14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-family:Outfit,sans-serif;">';
      h+='<div style="text-align:left;"><div style="font-size:.82rem;font-weight:700;color:var(--tx);">'+esc.nm+'</div><div style="font-size:.65rem;color:var(--t3);margin-top:2px;">M.O. base: R$ '+esc.inst+'</div></div>';
      h+='<div style="font-size:.72rem;color:var(--gold2);font-weight:700;">Selecionar →</div>';
      h+='</button>';
    });
    h+='</div>';
  }
  document.getElementById('cpList').innerHTML=h;
  showMd('cubaPickMd');
}
function pickEsculpida(escId, tipo){
  var escW=+(document.getElementById('escW')||{}).value||0;
  var escH=+(document.getElementById('escH')||{}).value||0;
  var escD=+(document.getElementById('escD')||{}).value||0;
  if(!escW||!escH||!escD){toast('Informe comprimento, largura e profundidade da cuba');return;}

  var esc=CFG.lav.find(function(x){return x.id===escId;});
  if(!esc)return;

  // Cálculo da pedra removida:
  // Fundo (comprimento × largura) + 4 paredes internas
  var aFundo=(escW*escH)/10000;
  var aParedes=(2*(escW*escD)+2*(escH*escD))/10000;
  var aExtra=+(aFundo+aParedes).toFixed(4);

  // Mão de obra: base + R$8 por litro removido
  var volumeLt=(escW*escH*escD)/1000;
  var moBase=esc.inst;
  var moExtra=Math.round(volumeLt*8);
  var moTotal=moBase+moExtra;

  // Pedra: área removida × preço/m²
  var mat=CFG.stones.find(function(s){return s.id===selMat;})||{pr:0,nm:''};
  var valorPedra=Math.round(aExtra*mat.pr);
  var totalCuba=moTotal+valorPedra;

  var tipoFinal=tipo||'lav';
  var svKey=tipoFinal==='coz'?'cuba_coz':'cuba_lav';
  var dim=escW+'×'+escH+'×'+escD+'cm';
  var nm=esc.nm+' '+dim;

  var cubaObj={
    id:esc.id,
    nm:nm,
    total:totalCuba,
    tipo:tipoFinal,
    escExtra:{aExtra:aExtra,moBase:moBase,moExtra:moExtra,valorPedra:valorPedra,
              dim:dim,w:escW,h:escH,d:escD,volumeLt:+volumeLt.toFixed(1)}
  };

  if(_cubaPickAmbId!==null){
    var amb=ambientes.find(function(a){return a.id==_cubaPickAmbId;});
    if(amb){
      amb.selCuba=cubaObj;
      if(!amb.svState)amb.svState={};
      amb.svState[svKey]={};
    }
    closeAll();
    renderAmbientes();
    toast('✓ '+nm+' — R$ '+fm(totalCuba)+' | M.O. R$ '+fm(moTotal)+' + Pedra R$ '+fm(valorPedra));
    _cubaPickAmbId=null;
  }
}

function pickCuba(id,tipo){
  var lista=tipo==='coz'?CFG.coz:CFG.lav;
  var instCli=tipo==='coz'?160:280;
  var cubaObj;
  if(id==='__cli__'){
    cubaObj={id:'__cli__',nm:'Cuba do cliente',total:instCli,tipo:tipo};
  } else {
    var c=lista.find(function(x){return x.id===id;});
    if(!c)return;
    var isEsc=c.tipo==='Esculpida';
    cubaObj={id:c.id,nm:(c.brand?' '+c.brand:'')+(c.nm?(' '+c.nm):''),total:isEsc?c.inst:(c.pr+c.inst),tipo:tipo};
  }
  // Apply to correct ambiente
  if(_cubaPickAmbId!==null){
    var amb=ambientes.find(function(a){return a.id==_cubaPickAmbId;});
    if(amb){
      amb.selCuba=cubaObj;
      // Ensure the sv key is marked on
      var k=tipo==='coz'?'cuba_coz':'cuba_lav';
      if(!amb.svState)amb.svState={};
      amb.svState[k]={};
    }
    closeAll();
    renderAmbientes();
    toast('✓ '+cubaObj.nm.trim());
    _cubaPickAmbId=null;
  } else {
    // Legacy fallback
    closeAll();
    toast('✓ '+cubaObj.nm.trim());
  }
}

// ═══ AMBIENTES ═══
var TIPOS_AMBIENTE=['Cozinha','Banheiro','Lavabo','Soleira','Peitoril','Escada','Fachada','Outro'];

function addAmbiente(){
  var id=Date.now();
  ambientes.push({id:id,tipo:'Cozinha',pecas:[],selCuba:null,svState:{},acState:{},customSvs:[]});
  addPecaAmb(id);
  renderAmbientes();
}

function rmAmbiente(id){
  if(ambientes.length<=1){toast('Precisa ter pelo menos 1 ambiente');return;}
  ambientes=ambientes.filter(function(a){return a.id!=id;});
  renderAmbientes();
}

function setAmbTipo(id,tipo){
  var amb=ambientes.find(function(a){return a.id==id;});
  if(!amb)return;
  amb.tipo=tipo;
  amb.selCuba=null;
  amb.svState={};
  amb.acState={};
  renderAmbientes();
}

function addPecaAmb(ambId){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb)return;
  amb.pecas.push({id:Date.now(),desc:'',w:0,h:0,q:1});
  renderAmbientes();
}

function rmPecaAmb(ambId,pcId){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb)return;
  if(amb.pecas.length<=1){toast('Precisa ter pelo menos 1 peça');return;}
  amb.pecas=amb.pecas.filter(function(p){return p.id!=pcId;});
  renderAmbientes();
}

function updPcAmb(ambId,pcId,prop,val){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb)return;
  var pc=amb.pecas.find(function(p){return p.id===pcId;});
  if(pc)pc[prop]=val;
}

// Legacy - kept for AI apply compatibility
function addPeca(){if(ambientes.length>0)addPecaAmb(ambientes[0].id);}
function updPc(id,prop,val){ambientes.forEach(function(a){var p=a.pecas.find(function(x){return x.id===id;});if(p)p[prop]=val;});}
function remPeca(id){ambientes.forEach(function(a){if(a.pecas.length>1){a.pecas=a.pecas.filter(function(p){return p.id!==id;});}});renderAmbientes();}

function renderAmbientes(){
  try{
  var container=document.getElementById('ambientesList');
  if(!container)return;
  var h='';
  ambientes.forEach(function(amb,idx){
    var num=idx+1;
    h+='<div class="ambiente">';
    // Header
    h+='<div class="amb-header">';
    h+='<span class="amb-title">'+num+'º Ambiente — '+amb.tipo+'</span>';
    h+='<button class="amb-rm" data-rm-amb="'+amb.id+'">✕ Remover</button>';
    h+='</div>';
    h+='<div class="amb-body">';
    // Tipo selector
    h+='<div style="font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:7px;">Tipo de Ambiente</div>';
    h+='<div class="amb-tipo">';
    TIPOS_AMBIENTE.forEach(function(t){
      h+='<button class="amb-tip'+(amb.tipo===t?' on':'')+'" data-amb-tipo="'+t+'" data-amb-id="'+amb.id+'">'+t+'</button>';
    });
    h+='</div>';
    // Peças
    h+='<div style="font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:600;margin:10px 0 7px;">Peças</div>';
    h+='<div class="amb-pecas">';
    amb.pecas.forEach(function(pc,pi){
      var rm=amb.pecas.length>1?'<button style="background:none;border:none;color:var(--red);font-size:.7rem;cursor:pointer;padding:2px 5px;font-family:Outfit,sans-serif;" onclick="rmPecaAmb('+amb.id+','+pc.id+')">✕</button>':'';
      h+='<div class="peca">';
      h+='<div class="ptop"><span class="pnum">Peça '+(pi+1)+'</span>'+rm+'</div>';
      h+='<div class="f"><label>Descrição</label><input id="pd-'+pc.id+'" placeholder="Ex: Bancada" type="text" style="background:var(--s3);" value="'+escH(pc.desc||'')+'" oninput="updPcAmb('+amb.id+','+pc.id+',\'desc\',this.value)"></div>';
      h+='<div class="r2"><div class="f"><label>Comprimento (cm)</label><input id="pw-'+pc.id+'" placeholder="300" type="number" style="background:var(--s3);" value="'+(pc.w||'')+'" oninput="updPcAmb('+amb.id+','+pc.id+',\'w\',+this.value)"></div>';
      h+='<div class="f"><label>Largura (cm)</label><input id="ph-'+pc.id+'" placeholder="60" type="number" style="background:var(--s3);" value="'+(pc.h||'')+'" oninput="updPcAmb('+amb.id+','+pc.id+',\'h\',+this.value)"></div></div>';
      h+='<div style="max-width:130px;"><div class="f"><label>Quantidade</label><input id="pq-'+pc.id+'" type="number" style="background:var(--s3);" value="'+(pc.q||1)+'" oninput="updPcAmb('+amb.id+','+pc.id+',\'q\',+this.value||1)"></div></div>';
      h+='</div>';
    });
    h+='</div>';
    // Botões de peça + IA
    h+='<div class="row" style="gap:7px;margin-bottom:10px;">';
    h+='<button class="btn btn-o" style="font-size:.73rem;padding:8px;flex:1;" data-add-peca="'+amb.id+'">+ Peça</button>';
    h+='<button class="btn-ai-sm" data-ai-amb="'+amb.id+'">✨ Descrever</button>';
    h+='</div>';
    // Serviços
    h+='<div style="font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:7px;">Serviços</div>';
    h+=buildSVHtml(amb);
    h+='</div></div>';
  });
  container.innerHTML=h;
  }catch(e2){console.error('renderAmbientes:',e2);toast('Erro: '+e2.message);}
}

function buildSVHtml(amb){
  var g=SV_DEFS[amb.tipo]||SV_DEFS.Cozinha;
  var sv=amb.svState||{};
  var h='';
  g.forEach(function(grp){
    h+='<div class="svblk"><div class="svhd">'+grp.g+'</div>';
    grp.its.forEach(function(it){
      var pr=getPr(it.k);
      var isOn=!!sv[it.k];
      var hint=it.u==='sf'?'R$ '+pr+'/ml + m² pedra':it.u==='ml'?'R$ '+pr+'/ml':it.u==='km'?'R$ '+pr+'/km':it.u==='cuba'?'Selecionar modelo':it.u==='livre'?'Valor livre':'R$ '+pr;
      h+='<div class="svrow'+(isOn?' on':'')+'" data-sv="'+it.k+'" data-amb="'+amb.id+'">';
      h+='<div class="svchk">✓</div><div class="svlbl">'+it.l+'<span class="svph">'+hint+'</span></div></div>';
      if(it.u==='sf'&&isOn){
        var sfv=sv[it.k]||{};
        h+='<div class="sfw on" id="sf-'+amb.id+'-'+it.k+'">';
        h+='<div class="sfl">'+it.l+'</div><div class="sfr">';
        h+='<div class="sf"><span>Comprimento (ml)</span><input type="number" id="sw-'+amb.id+'-'+it.k+'" placeholder="2.50" step="0.01" value="'+(sfv.ml||'')+'" oninput="updSVAmb('+amb.id+',\''+it.k+'\',\'ml\',+this.value);calcSFAmb('+amb.id+',\''+it.k+'\')" onclick="event.stopPropagation()"></div>';
        h+='<div class="sfx">×</div>';
        h+='<div class="sf"><span>Altura (cm)</span><input type="number" id="sh-'+amb.id+'-'+it.k+'" placeholder="6" step="0.5" value="'+(sfv.altCm||'')+'" oninput="updSVAmb('+amb.id+',\''+it.k+'\',\'altCm\',+this.value);calcSFAmb('+amb.id+',\''+it.k+'\')" onclick="event.stopPropagation()"></div>';
        h+='<div class="sf"><span>Qtd</span><input type="number" id="sq-'+amb.id+'-'+it.k+'" value="'+(sfv.q||1)+'" min="1" style="width:48px;" oninput="updSVAmb('+amb.id+',\''+it.k+'\',\'q\',+this.value||1);calcSFAmb('+amb.id+',\''+it.k+'\')" onclick="event.stopPropagation()"></div>';
        h+='</div><div class="sfres" id="sfr-'+amb.id+'-'+it.k+'"></div></div>';
      } else if(it.u==='cuba'&&isOn){
        var cubaInfo=amb.selCuba?('✓ '+amb.selCuba.nm.trim()+' — R$ '+fm(amb.selCuba.total)):'Toque para escolher';
        h+='<div class="svcuba on" id="sq-'+amb.id+'-'+it.k+'" onclick="openCubaPickAmb('+amb.id+',\''+it.ctp+'\')" style="cursor:pointer;">'+cubaInfo+'</div>';
      } else if((it.u==='ml'||it.u==='km'||it.u==='un')&&!it.fx&&isOn){
        var sv2=sv[it.k]||{};
        h+='<div class="svxtr on" id="sq-'+amb.id+'-'+it.k+'"><input type="number" id="si-'+amb.id+'-'+it.k+'" placeholder="'+(it.u==='ml'?'metros':'qtd')+'" step="0.1" value="'+(sv2.qty||'')+'" oninput="updSVAmb('+amb.id+',\''+it.k+'\',\'qty\',+this.value)" onclick="event.stopPropagation()"><span class="svunit">'+it.u+'</span></div>';
      } else if(it.u==='livre'&&isOn){
        var sv3=sv[it.k]||{};
        h+='<div class="svxtr on" id="sq-'+amb.id+'-'+it.k+'"><input type="number" id="si-'+amb.id+'-'+it.k+'" placeholder="valor" value="'+(sv3.qty||'')+'" oninput="updSVAmb('+amb.id+',\''+it.k+'\',\'qty\',+this.value)" onclick="event.stopPropagation()"><span class="svunit">reais</span></div>';
      }
    });
    h+='</div>';
  });

  // ── ACESSÓRIOS DO CATÁLOGO ──
  var acList=CFG.ac||[];
  var tiposComAcess=['Cozinha','Banheiro','Lavabo','Outro'];
  if(acList.length&&tiposComAcess.indexOf(amb.tipo)>=0){
    if(!amb.acState)amb.acState={};
    h+='<div class="svblk"><div class="svhd">🔩 Acessórios</div>';
    acList.forEach(function(a,ai){
      var acKey='ac_cat_'+a.id;
      var isOn=!!amb.acState[acKey];
      var prStr=a.pr>0?'R$ '+a.pr.toLocaleString('pt-BR'):'Consultar';
      h+='<div class="svrow'+(isOn?' on':'')+'" data-tog-ac="'+acKey+'" data-amb-ac="'+amb.id+'">';
      h+='<div class="svchk">✓</div>';
      h+='<div class="svlbl">'+a.nm+'<span class="svph">'+prStr+'</span></div></div>';
      if(isOn){
        var qv=amb.acState[acKey]||1;
        h+='<div class="svxtr on"><input type="number" min="1" value="'+qv+'" style="width:60px;" data-upd-ac="'+acKey+'" data-amb-ac2="'+amb.id+'" oninput="updAcAmb('+amb.id+',\''+acKey+'\',+this.value||1)"><span class="svunit">un</span></div>';
      }
    });
    h+='</div>';
  }

  // ── SERVIÇOS PERSONALIZADOS ─────────────────────────────────────────────
  var customSvs=amb.customSvs||[];
  h+='<div class="svblk">';
  h+='<div class="svhd">✏️ Serviços Personalizados</div>';
  if(customSvs.length){
    customSvs.forEach(function(cs,ci){
      h+='<div class="svrow on" style="flex-direction:column;align-items:flex-start;padding:10px 13px;gap:4px;border-left:3px solid var(--gold3);">';
      h+='<div style="display:flex;align-items:center;justify-content:space-between;width:100%;">';
      h+='<span style="font-size:.82rem;color:var(--gold2);font-weight:700;">'+escH(cs.nome)+'</span>';
      h+='<span style="color:var(--grn);font-size:.85rem;font-weight:800;">R$ '+fm(cs.valor||0)+'</span>';
      h+='</div>';
      if(cs.desc){h+='<span style="font-size:.72rem;color:var(--t3);font-style:italic;">'+escH(cs.desc)+'</span>';}
      h+='<div style="display:flex;gap:8px;margin-top:6px;">';
      h+='<button onclick="editCustomSv('+amb.id+','+ci+')" class="btn btn-o" style="font-size:.65rem;padding:5px 12px;">✏️ Editar</button>';
      h+='<button onclick="removeCustomSv('+amb.id+','+ci+')" class="btn" style="font-size:.65rem;padding:5px 12px;background:#1a0000;color:#e55;border:1px solid #3a1010;">✕ Remover</button>';
      h+='</div>';
      h+='</div>';
    });
  } else {
    h+='<div style="padding:8px 13px;font-size:.72rem;color:var(--t4);font-style:italic;">Nenhum serviço personalizado adicionado</div>';
  }
  h+='<button onclick="openCustomSvModal('+amb.id+')" style="width:100%;padding:11px 13px;font-size:.78rem;font-family:Outfit,sans-serif;font-weight:700;cursor:pointer;background:transparent;color:var(--gold2);border:none;border-top:1px solid var(--bd);text-align:left;display:flex;align-items:center;gap:8px;">+ Adicionar serviço personalizado</button>';
  h+='</div>';

  return h;
}

function togSV(k,ambId){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb)return;
  if(!amb.svState)amb.svState={};
  var sv=amb.svState;
  var g=SV_DEFS[amb.tipo]||SV_DEFS.Cozinha;
  var it=null;
  g.forEach(function(grp){grp.its.forEach(function(i){if(i.k===k)it=i;});});
  if(!it)return;
  if(sv[k]){
    delete sv[k];
    if(it.u==='cuba')amb.selCuba=null;
  } else {
    sv[k]={ml:0,altCm:6,q:1,qty:1};
    if(it.u==='cuba'){openCubaPickAmb(ambId,it.ctp);return;}
  }
  renderAmbientes();
}

function updSVAmb(ambId,k,prop,val){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb||!amb.svState||!amb.svState[k])return;
  amb.svState[k][prop]=val;
}

function togAcAmb(ambId,acKey){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb)return;
  if(!amb.acState)amb.acState={};
  if(amb.acState[acKey]){
    delete amb.acState[acKey];
  } else {
    amb.acState[acKey]=1;
  }
  renderAmbientes();
}

function updAcAmb(ambId,acKey,qty){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb||!amb.acState)return;
  amb.acState[acKey]=qty;
}

// ═══ SERVIÇOS PERSONALIZADOS ═══

var _customSvAmbId=null;
var _customSvEditIdx=null;

function openCustomSvModal(ambId){
  _customSvAmbId=ambId;
  _customSvEditIdx=null;
  document.getElementById('customSvNome').value='';
  document.getElementById('customSvDesc').value='';
  document.getElementById('customSvValor').value='';
  document.getElementById('customSvMdTitle').textContent='Serviço Personalizado';
  showMd('customSvMd');
}

function editCustomSv(ambId,idx){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb||!amb.customSvs||!amb.customSvs[idx])return;
  _customSvAmbId=ambId;
  _customSvEditIdx=idx;
  var cs=amb.customSvs[idx];
  document.getElementById('customSvNome').value=cs.nome||'';
  document.getElementById('customSvDesc').value=cs.desc||'';
  document.getElementById('customSvValor').value=cs.valor||'';
  document.getElementById('customSvMdTitle').textContent='Editar Serviço';
  showMd('customSvMd');
}

function saveCustomSv(){
  var nome=(document.getElementById('customSvNome').value||'').trim();
  var desc=(document.getElementById('customSvDesc').value||'').trim();
  var valor=parseFloat(document.getElementById('customSvValor').value)||0;
  if(!nome){toast('Informe o nome do serviço');return;}
  if(valor<=0){toast('Informe um valor válido');return;}
  var amb=ambientes.find(function(a){return a.id==_customSvAmbId;});
  if(!amb)return;
  if(!amb.customSvs)amb.customSvs=[];
  var cs={id:Date.now(),nome:nome,desc:desc,valor:valor};
  if(_customSvEditIdx!==null){
    amb.customSvs[_customSvEditIdx]=cs;
    toast('✓ Serviço atualizado!');
  } else {
    amb.customSvs.push(cs);
    toast('✓ Serviço adicionado!');
  }
  closeAll();
  renderAmbientes();
}

function removeCustomSv(ambId,idx){
  var amb=ambientes.find(function(a){return a.id==ambId;});
  if(!amb||!amb.customSvs)return;
  amb.customSvs.splice(idx,1);
  renderAmbientes();
  toast('Serviço removido');
}

function calcSFAmb(ambId,k){
  var amb=ambientes.find(function(a){return a.id===ambId;});
  if(!amb||!amb.svState||!amb.svState[k])return;
  var sv=amb.svState[k];
  var el=document.getElementById('sfr-'+ambId+'-'+k);if(!el)return;
  var ml=sv.ml||0,altCm=sv.altCm||0,q=sv.q||1;
  if(ml&&altCm){
    var m2=ml*(altCm/100)*q;
    var mat=CFG.stones.find(function(s){return s.id===selMat;});
    var pv=mat?m2*mat.pr:0;
    var mo=ml*q*getPr(k);
    el.innerHTML='<span style="color:var(--grn)">Pedra: '+m2.toFixed(3)+'m² → R$ '+fm(pv)+'</span>  <span style="color:var(--gold2)">M.O.: R$ '+fm(mo)+'</span>';
  } else {el.textContent='';}
}

// Cuba picker per ambiente
var _cubaPickAmbId=null,_cubaPickSvKey2=null;
function openCubaPickAmb(ambId,tipo){
  _cubaPickAmbId=ambId;
  _cubaPickKey=tipo==='coz'?'cuba_coz':'cuba_lav';
  openCubaPick(tipo,tipo==='coz'?'cuba_coz':'cuba_lav');
}

// AI per ambiente
var _aiAmbId=null;
function abrirAIMd(ambId){
  _aiAmbId=ambId;
  var amb=ambientes.find(function(a){return a.id===ambId;});
  document.getElementById('aiDesc').value='';
  document.getElementById('aiStatus').textContent='Ambiente: '+(amb?amb.tipo:'');
  document.getElementById('aiStatus').className='ai-status';
  document.getElementById('aiResultBox').style.display='none';
  document.getElementById('btnAIAplicar').style.display='none';
  showMd('aiMd');
}

// ═══ CALCULAR ═══
function calcular(){
  var cli=document.getElementById('oCliente').value.trim()||'Cliente';
  var tel=document.getElementById('oTel').value.trim()||'';
  var cidade=document.getElementById('oCidade').value.trim()||'';
  var end=document.getElementById('oEnd').value.trim()||'';
  var obs=document.getElementById('oObs').value.trim()||'';
  var mat=CFG.stones.find(function(s){return s.id===selMat;});
  if(!mat){toast('Selecione o material');return;}
  if(!ambientes.length){toast('Adicione pelo menos um ambiente');return;}

  var totalM2=0,totalAcT=0;
  var detHtml='';
  var txtAmbientes='';
  var allAcN=[];
  var allPds=[];

  ambientes.forEach(function(amb,idx){
    var tipo=amb.tipo;
    var sv=amb.svState||{};
    var g=SV_DEFS[tipo]||SV_DEFS.Cozinha;
    var m2=0,acT=0,acL=[],acN=[],sfPcs=[],pds=[];

    // Peças
    amb.pecas.forEach(function(p){
      if(p.w&&p.h){
        var a=(p.w/100)*(p.h/100)*(p.q||1);
        m2+=a;
        pds.push({desc:p.desc||'Peça',w:p.w,h:p.h,q:p.q||1,m2:a});
        allPds.push({desc:(tipo+': '+(p.desc||'Peça')),w:p.w,h:p.h,q:p.q||1,m2:a});
      }
    });

    // Serviços
    g.forEach(function(grp){grp.its.forEach(function(it){
      if(!sv[it.k])return;
      var svd=sv[it.k];
      if(it.u==='sf'){
        var ml=svd.ml||0,altCm=svd.altCm||0,q=svd.q||1;
        if(ml&&altCm){
          var sfM2=ml*(altCm/100)*q;
          var sfMo=ml*q*getPr(it.k);
          m2+=sfM2;acT+=sfMo;
          acL.push({l:it.l+' '+ml+'ml×'+altCm+'cm',v:sfMo});
          acN.push(it.l+' ('+ml+'ml, '+sfM2.toFixed(3)+'m²)');
          sfPcs.push({l:it.l,w:ml,h:altCm,q:q,m2:sfM2,mo:sfMo});
        }
        return;
      }
      if(it.u==='cuba'){
        if(amb.selCuba){acT+=amb.selCuba.total;acL.push({l:'Cuba: '+amb.selCuba.nm.trim(),v:amb.selCuba.total});acN.push('Cuba: '+amb.selCuba.nm.trim());}
        return;
      }
      if(it.u==='livre'){var v=svd.qty||0;if(v>0){acT+=v;acL.push({l:it.l,v:v});acN.push(it.l);}return;}
      if(it.fx===1){var p2=getPr(it.k);if(p2>0){acT+=p2;acL.push({l:it.l,v:p2});acN.push(it.l);}return;}
      var qty=svd.qty||1;
      var vv=getPr(it.k)*qty;acT+=vv;acL.push({l:it.l+(qty>1?' ('+qty+it.u+')':''),v:vv});acN.push(it.l);
    });});

    // Acessórios do catálogo
    var acState=amb.acState||{};
    var acList=CFG.ac||[];
    Object.keys(acState).forEach(function(acKey){
      var qty=acState[acKey]||1;
      var acId=acKey.replace('ac_cat_','');
      var aItem=acList.find(function(x){return x.id===acId;});
      if(!aItem)return;
      var val=aItem.pr>0?aItem.pr*qty:0;
      var label=aItem.nm+(qty>1?' ×'+qty:'');
      if(val>0){acT+=val;acL.push({l:label,v:val});}
      acN.push(label);
    });

    // ── Serviços personalizados ──────────────────────────────────────────
    (amb.customSvs||[]).forEach(function(cs){
      var v=cs.valor||0;
      var label=cs.nome+(cs.desc?' ('+cs.desc+')':'');
      if(v>0){acT+=v;acL.push({l:label,v:v});}
      acN.push(label);
    });

    totalM2+=m2;totalAcT+=acT;
    allAcN=allAcN.concat(acN);

    var pedTamb=m2*mat.pr;
    var ambLabel=(idx+1)+'º Ambiente — '+tipo;
    detHtml+='<div style="font-size:.62rem;color:var(--gold);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:8px 0 4px;">'+ambLabel+'</div>';
    if(pds.length){
      pds.forEach(function(p){
        detHtml+='<div class="rrow"><span class="rk">'+p.desc+' '+p.w+'×'+p.h+'cm'+(p.q>1?' ×'+p.q:'')+'</span><span class="rv">'+p.m2.toFixed(3)+'m²</span></div>';
      });
    }
    if(sfPcs.length){sfPcs.forEach(function(p){
      detHtml+='<div class="rrow"><span class="rk">'+p.l+' '+p.w+'ml×'+p.h+'cm'+(p.q>1?' ×'+p.q:'')+'</span><span class="rv">'+p.m2.toFixed(3)+'m²</span></div>';
    });}
    detHtml+='<div class="rrow"><span class="rk">'+mat.nm+' — '+m2.toFixed(3)+'m²</span><span class="rv" style="color:var(--gold2)">R$ '+fm(pedTamb)+'</span></div>';
    acL.forEach(function(a){detHtml+='<div class="rrow"><span class="rk">'+a.l+'</span><span class="rv">R$ '+fm(a.v)+'</span></div>';});
    if(acL.length===0&&m2===0)detHtml+='<div style="font-size:.72rem;color:var(--t4);padding:2px 0;">Nenhuma peça ou serviço neste ambiente</div>';

    // Texto WA por ambiente
    var pTxt=pds.map(function(p){return '• '+(p.desc||'Peça')+' — '+p.w+'×'+p.h+'cm'+(p.q>1?' ×'+p.q:'');}).join('\n');
    if(sfPcs.length)pTxt+=(pTxt?'\n':'')+sfPcs.map(function(p){return '• '+p.l+' — '+p.w+'ml×'+p.h+'cm'+(p.q>1?' ×'+p.q:'');}).join('\n');
    var aTxt=acN.length?acN.map(function(a){return '• '+a;}).join('\n'):'';
    txtAmbientes+='\n─── '+ambLabel+' ───\n'+(pTxt||'(sem peças)')+(aTxt?'\nInclusos:\n'+aTxt:'');
  });

  var pedT=totalM2*mat.pr;
  var bruto=pedT+totalAcT;
  var vista=bruto;
  var parc=vista*1.12;
  var p8=parc/8,ent=vista/2;

  detHtml+='<div style="border-top:1px solid var(--bd);margin:10px 0 6px;"></div>';
  detHtml+='<div class="rrow"><span class="rk">Total m² de pedra</span><span class="rv">'+totalM2.toFixed(3)+'m²</span></div>';
  detHtml+='<div class="rrow"><span class="rk">Parcelado 8×</span><span class="rv" style="color:var(--t3)">R$ '+fm(parc)+' — 8× R$ '+fm(p8)+'</span></div>';
  detHtml+='<div class="rtot"><span class="k">À Vista</span><span class="v">R$ '+fm(vista)+'</span></div>';
  document.getElementById('resDetail').innerHTML=detHtml;

  // PAINEL INTERNO
  var pi='';
  var dtHP=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
  pi+='<div style="background:linear-gradient(135deg,#0d0d18,#12100a);padding:14px 16px;border-bottom:1px solid var(--bd);">';
  pi+='<div style="font-size:.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold3);font-weight:700;">Resumo do Orçamento</div>';
  pi+='<div style="font-family:Cormorant Garamond,serif;font-size:1.4rem;color:var(--gold2);font-weight:700;margin-top:2px;">'+escH(cli)+'</div>';
  pi+='<div style="font-size:.72rem;color:var(--t3);margin-top:2px;">'+dtHP+'</div></div>';
  pi+='<div style="padding:12px 16px;border-bottom:1px solid var(--bd);">';
  pi+='<div style="font-size:.55rem;letter-spacing:2px;text-transform:uppercase;color:var(--t4);margin-bottom:6px;">Material</div>';
  pi+='<div style="display:flex;justify-content:space-between;">';
  pi+='<b style="font-size:.85rem;color:var(--tx);">'+mat.nm+' — '+mat.fin+'</b>';
  pi+='<b style="color:var(--gold2);">R$ '+fm(mat.pr)+'/m²</b></div>';
  pi+='<div style="font-size:.72rem;color:var(--t3);margin-top:3px;">Área: '+fm(totalM2)+' m² → Pedra: R$ '+fm(pedT)+'</div></div>';
  var acbNmP={borda_reta:'Borda Reta',borda_45:'Borda 45°',borda_boleada:'Borda Boleada',borda_chf:'Borda Chanfrada',cant:'Cantoneira',rodape:'Rodapé'};
  ambientes.forEach(function(ambP){
    var gP=SV_DEFS[ambP.tipo]||SV_DEFS.Cozinha;
    var svP=ambP.svState||{};
    var rowsP='';
    gP.forEach(function(grpP){grpP.its.forEach(function(itP){
      if(!svP[itP.k])return;
      var sdP=svP[itP.k];
      var mlP=sdP.ml||sdP.w||0,hP=sdP.altCm||sdP.h||0,qP=sdP.q||1;
      var vP=0,dP=itP.l;
      if(itP.u==='sf'){vP=mlP*qP*getPr(itP.k);dP+=' '+mlP+'ml×'+hP+'cm'+(qP>1?' ×'+qP:'');}
      else if(itP.u==='sf_slim'||itP.u==='ml_only'){vP=mlP*qP*getPr(itP.k);dP+=' '+mlP+'ml (só MO)';}
      else if(itP.u==='cuba'){if(ambP.selCuba){vP=ambP.selCuba.total;dP+=': '+ambP.selCuba.nm.trim();}}
      else if(!itP.fx){vP=(sdP.w||0)*getPr(itP.k);if(sdP.w)dP+=' '+sdP.w+(itP.u==='un'?'un':'ml');}
      else{vP=getPr(itP.k);}
      if(vP>0){rowsP+='<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #0d0d10;"><span style="font-size:.75rem;color:var(--t2);">'+dP+'</span><span style="font-size:.75rem;color:var(--gold2);font-weight:600;">R$ '+fm(vP)+'</span></div>';}
    });});
    ambP.pecas.forEach(function(pP){
      if(!pP.acb)return;
      Object.keys(pP.acb).forEach(function(akP){
        var mlA=pP.acb[akP].ml||0;if(!mlA)return;
        var vA=mlA*getPr(akP);
        rowsP+='<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #0d0d10;"><span style="font-size:.75rem;color:var(--t2);">'+(acbNmP[akP]||akP)+' '+mlA+'ml ('+escH(pP.desc||'')+')</span><span style="font-size:.75rem;color:var(--gold2);font-weight:600;">R$ '+fm(vA)+'</span></div>';
      });
    });
    if(rowsP){
      pi+='<div style="padding:10px 16px;border-bottom:1px solid var(--bd);">';
      pi+='<div style="font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold3);opacity:.7;margin-bottom:6px;">'+ambP.tipo+'</div>'+rowsP+'</div>';
    }

    // Serviços personalizados no painel interno
    (ambP.customSvs||[]).forEach(function(cs){
      var v=cs.valor||0;
      if(v<=0)return;
      var dP=(cs.nome||'Serviço')+(cs.desc?' — '+cs.desc:'');
      if(!rowsP)pi+='<div style="padding:10px 16px;border-bottom:1px solid var(--bd);"><div style="font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold3);opacity:.7;margin-bottom:6px;">'+ambP.tipo+'</div>';
      pi+='<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #0d0d10;"><span style="font-size:.75rem;color:var(--gold3);">✏️ '+escH(dP)+'</span><span style="font-size:.75rem;color:var(--gold2);font-weight:600;">R$ '+fm(v)+'</span></div>';
      if(!rowsP)pi+='</div>';
    });
  });
  pi+='<div style="padding:14px 16px;background:var(--s2);">';
  pi+='<div style="display:flex;justify-content:space-between;margin-bottom:7px;"><span style="font-size:.72rem;color:var(--t3);">Custo Pedra</span><b style="color:var(--grn);">R$ '+fm(pedT)+'</b></div>';
  pi+='<div style="display:flex;justify-content:space-between;margin-bottom:7px;"><span style="font-size:.72rem;color:var(--t3);">Mão de Obra</span><b style="color:var(--gold2);">R$ '+fm(totalAcT)+'</b></div>';
  pi+='<div style="border-top:1px solid var(--bd);padding-top:8px;margin-bottom:7px;display:flex;justify-content:space-between;"><span style="font-size:.78rem;font-weight:700;">Total Custo</span><b style="font-family:Cormorant Garamond,serif;font-size:1.1rem;">R$ '+fm(pedT+totalAcT)+'</b></div>';
  pi+='<div style="border-top:2px solid rgba(201,168,76,.3);padding-top:10px;display:flex;justify-content:space-between;align-items:baseline;"><span style="font-size:.72rem;color:var(--gold3);">Valor à Vista (cliente)</span><b style="font-family:Cormorant Garamond,serif;font-size:1.4rem;color:var(--gold2);">R$ '+fm(vista)+'</b></div>';
  pi+='<div style="display:flex;justify-content:space-between;margin-top:6px;"><span style="font-size:.72rem;color:var(--t4);">Margem estimada</span><b style="color:var(--grn);">R$ '+fm(vista-(pedT+totalAcT))+'</b></div></div>';
  var piEl=document.getElementById('painelInterno');if(piEl)piEl.innerHTML=pi;

  var txt='HR MARMORES E GRANITOS\nORCAMENTO — '+cli+'\n\nMaterial: '+mat.nm+' ('+mat.fin+')\n'+txtAmbientes+'\n\n• Fabricacao e acabamento completo\n\n==================\nPARCELADO\nR$ '+fm(parc)+' — ate 8x de R$ '+fm(p8)+'\n\nA VISTA\nR$ '+fm(vista)+'\n\nEntrada 50%: R$ '+fm(ent)+'\nEntrega 50%: R$ '+fm(ent)+'\n==================\n'+CFG.emp.nome+'\n'+CFG.emp.tel;
  if(cidade)txt+='\n'+cidade;
  document.getElementById('quoteBox').textContent=txt;
  document.getElementById('resArea').style.display='block';
  document.getElementById('resArea').scrollIntoView({behavior:'smooth',block:'start'});

  // Salvar snapshot dos ambientes para poder recarregar depois
  var ambSnap=ambientes.map(function(a){
    return {tipo:a.tipo,pecas:JSON.parse(JSON.stringify(a.pecas)),selCuba:a.selCuba,svState:JSON.parse(JSON.stringify(a.svState||{})),acState:JSON.parse(JSON.stringify(a.acState||{})),customSvs:JSON.parse(JSON.stringify(a.customSvs||[]))};
  });
  var q={id:Date.now(),date:td(),cli:cli,tel:tel,cidade:cidade,end:end,obs:obs,tipo:ambientes.map(function(a){return a.tipo;}).join('+'),mat:mat.nm,matPr:mat.pr,m2:totalM2,pedT:pedT,acT:totalAcT,acN:allAcN,pds:allPds,sfPcs:[],vista:vista,parc:parc,p8:p8,ent:ent,ambSnap:ambSnap};
  DB.q.unshift(q);DB.sv();pendQ=q;
}
function selectQuote(){
  var el=document.getElementById('quoteBox');
  if(!el)return;
  var range=document.createRange();
  range.selectNodeContents(el);
  var sel=window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
function copiar(){
  var t=document.getElementById('quoteBox').textContent;
  // Strategy 1: modern clipboard API
  if(navigator.clipboard&&window.isSecureContext){
    navigator.clipboard.writeText(t).then(function(){toast('✓ Copiado!');}).catch(function(){_copiarFallback(t);});
    return;
  }
  _copiarFallback(t);
}
function _copiarFallback(t){
  // Strategy 2: execCommand on hidden textarea
  var ta=document.createElement('textarea');
  ta.value=t;
  ta.setAttribute('readonly','');
  ta.style.cssText='position:fixed;top:-9999px;left:-9999px;font-size:12px;';
  document.body.appendChild(ta);
  var isIOS=/ipad|iphone/i.test(navigator.userAgent);
  var copied=false;
  if(isIOS){
    var range=document.createRange();
    range.selectNodeContents(ta);
    var sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    ta.setSelectionRange(0,999999);
  } else {
    ta.focus();
    ta.select();
  }
  try{
    copied=document.execCommand('copy');
  }catch(e){}
  document.body.removeChild(ta);
  if(copied){toast('✓ Copiado!');return;}
  // Strategy 3: show modal with selectable text
  _copiarModal(t);
}
function _copiarModal(t){
  var ov=document.createElement('div');
  ov.id='copyOv';
  ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.94);z-index:9999;display:flex;align-items:flex-end;justify-content:center;';
  ov.innerHTML='<div style="background:#141418;border-radius:18px 18px 0 0;width:100%;max-width:480px;padding:16px 16px 32px;border-top:1px solid #28282f;">'
    +'<div style="font-size:.85rem;font-weight:700;color:#C9A84C;margin-bottom:10px;">Selecione e copie o texto</div>'
    +'<textarea id="copyTa" rows="10" readonly style="width:100%;background:#0e0e12;border:1px solid #28282f;border-radius:10px;color:#F4EFE8;padding:11px 12px;font-size:.76rem;font-family:Outfit,sans-serif;resize:none;outline:none;-webkit-user-select:text;user-select:text;">'+t+'</textarea>'
    +'<div style="font-size:.68rem;color:#7a7570;margin:8px 0 12px;">Toque na caixa acima → Selecionar tudo → Copiar</div>'
    +'<button onclick="document.getElementById(\'copyOv\').remove();" style="width:100%;padding:12px;background:#22222a;border:1px solid #28282f;color:#bfb9b0;border-radius:11px;font-size:.84rem;font-weight:600;cursor:pointer;font-family:Outfit,sans-serif;">Fechar</button>'
    +'</div>';
  document.body.appendChild(ov);
  // Auto-select the textarea
  setTimeout(function(){
    var ta=document.getElementById('copyTa');
    if(ta){ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);}
  },150);
}




// ═══════════════════════════════════════════════════════
// CONTRATOS (originalmente contratos.js)
// ═══════════════════════════════════════════════════════

// ═══ GERAR CONTRATO ═══
var _contrId=null;

// ── ETAPA 2: monta objeto q-compatível a partir de um snapshot DB.c ───
// Permite que _gerarContratoHtml() receba dados do snapshot em vez do
// orçamento ao vivo (DB.q), tornando o PDF independente de pendQ e de
// DB.q. Campos espelhados 1:1 com os usados pelo gerador HTML.
function _qFromContrato(c){
  if(!c) return null;
  return {
    id:      c.qid,                        // ID original do orçamento (para exibir Nº)
    date:    c.dataCriacao,
    cli:     c.cliente.nome,
    tel:     c.cliente.tel,
    end:     c.cliente.end,
    cidade:  c.cliente.cidade,
    tipo:    c.servicos.tipo,
    mat:     c.servicos.mat,
    matPr:   c.servicos.matPr,
    m2:      c.servicos.m2,
    pds:     c.servicos.pds     || [],
    sfPcs:   [],                           // sempre [] no orçamento original — compatibilidade
    acN:     c.servicos.acN     || [],
    obs:     c.servicos.obs     || '',
    ambSnap: c.servicos.ambSnap || [],
    vista:   c.valorTotal,
    ent:     c.entrada,
    pedT:    c.servicos.m2 * c.servicos.matPr
  };
}

// ── ETAPA 2: gera PDF de contrato direto do snapshot DB.c ─────────────
// Chamado pelo botão "📜 Contrato" no histórico e por qualquer contexto
// onde o modal não precisa ser reaberto (dados já estão em DB.c).
// Fallback: se o snapshot não existir (contrato pré-Etapa 1), abre o
// modal como antes — compatibilidade total com contratos antigos.
function gerarContratoFromDB(qid){
  var snap=(DB.c||[]).find(function(c){return String(c.qid)===String(qid);});
  if(!snap){
    // Sem snapshot — usa fluxo antigo (modal + confirmarContrato)
    gerarContrato(qid);
    return;
  }
  var q      =_qFromContrato(snap);
  var pgConds=snap.pgConds    || [];
  var prazo  =snap.prazoUtil  || 15;
  var valid  =snap.validadeOrc|| 7;
  var parc   =snap.parcelas.qtd  || 1;
  var taxa   =snap.parcelas.taxa || 0;
  var pgTipo =snap.parcelas.tipo || '50_50';
  _gerarContratoHtml(q,pgConds,prazo,valid,parc,taxa,pgTipo);
}

function gerarContrBtn(id,e){if(e)e.stopPropagation();gerarContrato(+id||id,e);}
function gerarContrId(el,e){if(e)e.stopPropagation();var id=+el.dataset.cid;gerarContratoFromDB(id);}
function gerarContrato(id, e){
  try{
    if(e)e.stopPropagation();
    var q=DB.q.find(function(x){return x.id==id;});
    if(!q){toast('Orçamento não encontrado');return;}
    _contrId=id;
    var obsEl=document.getElementById('contrObs');
    if(obsEl)obsEl.value=q.obs||'';
    try{
      var hoje=new Date();
      var startDt=new Date(hoje);
      if(DB.j&&DB.j.length){
        var jobs=DB.j.filter(function(j){return j.dt;});
        jobs.sort(function(a,b){return (b.dt||'').localeCompare(a.dt||'');});
        if(jobs.length&&jobs[0].dt){
          var ld=new Date(jobs[0].dt+'T12:00:00');
          if(ld>hoje)startDt=new Date(ld);
        }
      }
      startDt.setDate(startDt.getDate()+1);
      while(startDt.getDay()===0||startDt.getDay()===6)startDt.setDate(startDt.getDate()+1);
      var el=document.getElementById('contrDataInicio');
      if(el)el.value=startDt.toISOString().slice(0,10);
      var agInfo=document.getElementById('contrAgendaInfo');
      if(agInfo){agInfo.style.display='block';agInfo.textContent='📅 Início sugerido: '+startDt.toLocaleDateString('pt-BR');}
      setTimeout(contrCalcEntrega,100);
    }catch(dateErr){console.warn('date err:',dateErr);}
    // reset payment selection
    selContrPg('50_50');
    showMd('contrMd');
  }catch(err){
    console.error('gerarContrato error:',err);
    toast('Erro ao abrir contrato: '+err.message);
  }
}

function selContrPg(tipo){
  document.querySelectorAll('.contr-pg-btn').forEach(function(b){b.classList.remove('on');});
  var btn=document.querySelector('[data-pg="'+tipo+'"]');if(btn)btn.classList.add('on');
  // Mostrar/ocultar seções conforme tipo
  var custom=document.getElementById('contrPgCustom');
  var parcSection=document.getElementById('contrParcSection');
  var debitoSection=document.getElementById('contrDebitoSection');
  var boletoSection=document.getElementById('contrBoletoSection');
  if(custom)custom.style.display=(tipo==='personalizado')?'flex':'none';
  if(parcSection)parcSection.style.display=(tipo==='cartao_parc')?'flex':'none';
  if(debitoSection)debitoSection.style.display=(tipo==='debito')?'flex':'none';
  if(boletoSection)boletoSection.style.display=(tipo==='boleto')?'flex':'none';
}

function contrCalcEntrega(){
  var ini=document.getElementById('contrDataInicio');
  var prazoEl=document.getElementById('contrPrazo');
  var entEl=document.getElementById('contrDataEntrega');
  if(!ini||!ini.value||!entEl)return;
  var dt=new Date(ini.value+'T12:00:00');
  var dias=0,prazo=+prazoEl.value||15;
  while(dias<prazo){dt.setDate(dt.getDate()+1);if(dt.getDay()!==0&&dt.getDay()===6)dias++; else if(dt.getDay()!==0)dias++;}
  // fix: count only weekdays
  dt=new Date(ini.value+'T12:00:00');
  dias=0;
  while(dias<prazo){dt.setDate(dt.getDate()+1);if(dt.getDay()!==0&&dt.getDay()!==6)dias++;}
  entEl.value=dt.toISOString().slice(0,10);
}

function confirmarContrato(){
  try{
  var id=_contrId;
  var q=DB.q.find(function(x){return x.id==id;});
  if(!q){toast('Orçamento não encontrado');return;}
  var pgBtn=document.querySelector('.contr-pg-btn.on');
  var pgTipo=pgBtn?pgBtn.dataset.pg:'50_50';
  // Dados de parcelamento no cartão
  var parc=+document.getElementById('contrParc').value||0;
  var taxa=+document.getElementById('contrTaxa').value||12;
  // Dados de débito
  var debitoPct=+(document.getElementById('contrDebitoPct')||{value:'50'}).value||50;
  // Dados de boleto
  var boletoParc=+(document.getElementById('contrBoletoParc')||{value:'2'}).value||2;
  var boletoInt=+(document.getElementById('contrBoletoInt')||{value:'30'}).value||30;
  var prazo=+document.getElementById('contrPrazo').value||15;
  var valid=+document.getElementById('contrValid').value||7;
  var obsContr=document.getElementById('contrObs').value.trim();
  var dataInicio=document.getElementById('contrDataInicio').value||'';
  var dataEntrega=document.getElementById('contrDataEntrega').value||'';

  // Mapas de % entrada/entrega por tipo
  var entPct=50,entgPct=50;
  var pgMap={'50_50':[50,50],'vista':[100,0],'30_70':[30,70],'40_60':[40,60],'60_40':[60,40],'3x':[33,67],'debito_50':[50,50],'debito_100':[100,0]};
  if(pgMap[pgTipo]){entPct=pgMap[pgTipo][0];entgPct=pgMap[pgTipo][1];}
  else if(pgTipo==='personalizado'){
    entPct=+document.getElementById('contrEntPct').value||50;
    entgPct=+document.getElementById('contrEntgPct').value||50;
  } else if(pgTipo==='debito'){
    entPct=debitoPct; entgPct=100-debitoPct;
  } else if(pgTipo==='cartao_parc'){
    // cartão parcelado: 0% entrada, 100% parcelado
    entPct=0; entgPct=0;
  } else if(pgTipo==='boleto'){
    entPct=0; entgPct=0;
  }

  closeAll();

  var vista=q.vista||0;
  var pgConds=[];
  var entVal=vista*(entPct/100);
  var entgVal=vista*(entgPct/100);

  var tipoLower=(q.tipo||'').toLowerCase();
  var ehEntregaTotal=tipoLower.indexOf('peitoril')>=0||tipoLower.indexOf('soleira')>=0;

  // Montar condições de pagamento por tipo
  if(pgTipo==='cartao_parc'){
    var taxaVal=taxa/100;
    var totalComTaxa=vista*(1+taxaVal);
    var vlParcela=totalComTaxa/parc;
    pgConds.push({icon:'💳',txt:'<strong>Crédito Parcelado: '+parc+'× de R$ '+fm(vlParcela)+'</strong> (acréscimo de '+taxa+'%)'});
    pgConds.push({icon:'💳',txt:'Valor total com acréscimo: R$ '+fm(totalComTaxa)});
  } else if(pgTipo==='debito'){
    if(entPct===100){
      pgConds.push({icon:'💳',txt:'<strong>Débito: 100% no ato — R$ '+fm(vista)+'</strong>'});
    } else {
      pgConds.push({icon:'💳',txt:'<strong>Débito ('+entPct+'%) na assinatura: R$ '+fm(entVal)+'</strong>'});
      pgConds.push({icon:'💳',txt:'<strong>Débito ('+entgPct+'%) na entrega: R$ '+fm(entgVal)+'</strong>'});
    }
  } else if(pgTipo==='boleto'){
    var vlBoleto=vista/boletoParc;
    for(var b=0;b<boletoParc;b++){
      var diasBol=b===0?0:b*boletoInt;
      pgConds.push({icon:'🎫',txt:'<strong>'+(b+1)+'º Boleto:</strong> R$ '+fm(vlBoleto)+(b===0?' — à vista / entrada':' — '+diasBol+' dias')});
    }
  } else {
    if(entPct>0)pgConds.push({icon:'💰',txt:'<strong>Entrada ('+entPct+'%):</strong> R$ '+fm(entVal)+' no ato da assinatura'});
    if(entgPct>0&&pgTipo!=='3x')pgConds.push({icon:'💰',txt:'<strong>Entrega ('+entgPct+'%):</strong> R$ '+fm(entgVal)+' na entrega e instalação'});
    if(pgTipo==='3x'){var v3=vista/3;pgConds.push({icon:'💰',txt:'<strong>1ª:</strong> R$ '+fm(v3)+' na assinatura'},{icon:'💰',txt:'<strong>2ª:</strong> R$ '+fm(v3)+' na metade'},{icon:'💰',txt:'<strong>3ª:</strong> R$ '+fm(v3)+' na entrega'});}
  }
  pgConds.push({icon:'📅',txt:'Orçamento válido por '+valid+' dias'});
  if(dataInicio){var di=new Date(dataInicio+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});pgConds.push({icon:'🔨',txt:'<strong>Início:</strong> '+di});}
  if(dataEntrega){var de=new Date(dataEntrega+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});pgConds.push({icon:'🚚',txt:'<strong>Previsão de entrega:</strong> '+de+' ('+prazo+' dias úteis)'});}
  if(obsContr)pgConds.push({icon:'📝',txt:obsContr});

  if(!DB.j)DB.j=[];
  if(!DB.t)DB.t=[];
  var _td=(q.tipo||'Serviço')+(q.mat?' · '+q.mat:'');

  // Limpa lançamentos antigos deste orçamento e re-registra com a forma de pagamento atual
  DB.t = DB.t.filter(function(t){ return String(t.qid) !== String(q.id); });

  if(ehEntregaTotal){
    DB.t.unshift({id:Date.now(),type:'pend',desc:'💎 A receber 100% na entrega — '+escH(q.cli||'Cliente')+' ('+_td+')',value:vista,date:dataEntrega||new Date().toISOString().slice(0,10),qid:q.id});
    toast('⏳ Peitoril/Soleira: R$ '+fm(vista)+' registrado como a receber na entrega');
  } else if(pgTipo==='cartao_parc'){
    var totalCC=vista*(1+(taxa/100));
    DB.t.unshift({id:Date.now(),type:'pend',desc:'💳 Cartão '+parc+'× — '+escH(q.cli||'Cliente')+' ('+_td+')',value:totalCC,date:dataEntrega||new Date().toISOString().slice(0,10),qid:q.id});
    toast('💳 Cartão parcelado: R$ '+fm(totalCC)+' registrado como a receber');
  } else if(pgTipo==='debito'){
    if(entPct===100){
      DB.t.unshift({id:Date.now(),type:'in',desc:'💳 Débito 100% — '+escH(q.cli||'Cliente')+' ('+_td+')',value:vista,date:new Date().toISOString().slice(0,10),qid:q.id});
      toast('💳 Débito integral: R$ '+fm(vista)+' lançado como recebido!');
    } else {
      if(entVal>0)DB.t.unshift({id:Date.now(),type:'in',desc:'💳 Débito entrada '+entPct+'% — '+escH(q.cli||'Cliente')+' ('+_td+')',value:entVal,date:new Date().toISOString().slice(0,10),qid:q.id});
      if(entgVal>0)DB.t.unshift({id:Date.now()+1,type:'pend',desc:'💳 Débito entrega '+entgPct+'% — '+escH(q.cli||'Cliente')+' ('+_td+')',value:entgVal,date:dataEntrega||new Date().toISOString().slice(0,10),qid:q.id});
      toast('💳 Débito: R$ '+fm(entVal)+' entrada baixado + R$ '+fm(entgVal)+' a receber!');
    }
  } else if(pgTipo==='boleto'){
    var vlBol=vista/boletoParc;
    for(var bb=0;bb<boletoParc;bb++){
      var dtBol=new Date(); dtBol.setDate(dtBol.getDate()+bb*boletoInt);
      var tipo_t=bb===0?'in':'pend';
      DB.t.unshift({id:Date.now()+bb,type:tipo_t,desc:'🎫 Boleto '+(bb+1)+'/'+boletoParc+' — '+escH(q.cli||'Cliente')+' ('+_td+')',value:vlBol,date:dtBol.toISOString().slice(0,10),qid:q.id});
    }
    toast('🎫 Boleto: '+boletoParc+'× de R$ '+fm(vlBol)+' registrados!');
  } else {
    if(entVal>0)DB.t.unshift({id:Date.now(),type:'in',desc:'💰 Entrada '+entPct+'% — '+escH(q.cli||'Cliente')+' ('+_td+')',value:entVal,date:new Date().toISOString().slice(0,10),qid:q.id});
    if(entgVal>0)DB.t.unshift({id:Date.now()+1,type:'pend',desc:'⏳ A receber '+entgPct+'% — '+escH(q.cli||'Cliente')+' ('+_td+')',value:entgVal,date:dataEntrega||new Date().toISOString().slice(0,10),qid:q.id});
    if(entVal>0)toast('💰 Entrada R$ '+fm(entVal)+' baixada! A receber: R$ '+fm(entgVal));
  }

  // Agenda — limpa entradas antigas do orçamento antes de re-registrar
  DB.j = DB.j.filter(function(j){ return String(j.qid) !== String(q.id); });
  if(pgTipo==='debito'&&entPct===100){
    DB.j.push({id:Date.now()+2,tipo:'r',desc:'Débito integral — '+escH(q.cli||'Cliente')+' ('+q.tipo+')',val:vista,dt:new Date().toISOString().slice(0,10),status:'pendente',qid:q.id});
  } else if(pgTipo==='cartao_parc'){
    var totalCC2=vista*(1+(taxa/100));
    DB.j.push({id:Date.now()+2,tipo:'r',desc:'Cartão '+parc+'× — '+escH(q.cli||'Cliente')+' ('+q.tipo+')',val:totalCC2,dt:dataEntrega||new Date().toISOString().slice(0,10),status:'pendente',qid:q.id});
  } else if(!ehEntregaTotal&&entVal>0){
    DB.j.push({id:Date.now()+2,tipo:'r',desc:'Entrada — '+escH(q.cli||'Cliente')+' ('+q.tipo+')',val:entVal,dt:new Date().toISOString().slice(0,10),status:'pendente',qid:q.id});
    if(entgVal>0)DB.j.push({id:Date.now()+3,tipo:'r',desc:'Entrega — '+escH(q.cli||'Cliente')+' ('+q.tipo+')',val:entgVal,dt:dataEntrega||new Date().toISOString().slice(0,10),status:'pendente',qid:q.id});
  } else if(ehEntregaTotal){
    DB.j.push({id:Date.now()+4,tipo:'r',desc:'Entrega — '+escH(q.cli||'Cliente')+' ('+q.tipo+')',val:vista,dt:dataEntrega||new Date().toISOString().slice(0,10),status:'pendente',qid:q.id});
  }

  // ── ETAPA 1: Snapshot fixo do contrato ────────────────────────────────
  // Este objeto é independente de pendQ, da tela atual e do histórico.
  // Uma vez salvo, representa o estado EXATO no momento do fechamento.
  var _contrato = {
    // ── Identificação ──
    id:          'C-' + Date.now(),          // ID único do contrato
    qid:         q.id,                        // referência ao orçamento de origem
    status:      'ativo',                     // ativo | cancelado | concluido
    dataCriacao: new Date().toISOString().slice(0,10),

    // ── Snapshot do cliente ────────────────────────────────────────────
    cliente: {
      nome:   q.cli    || '',
      tel:    q.tel    || '',
      end:    q.end    || '',
      cidade: q.cidade || ''
    },

    // ── Snapshot financeiro ────────────────────────────────────────────
    valorTotal: vista,
    entrada:    entVal,
    saldo:      entgVal,
    parcelas: {
      tipo:        pgTipo,
      qtd:         parc        || 1,
      taxa:        taxa        || 0,
      totalComTaxa: (pgTipo==='cartao_parc') ? vista*(1+(taxa/100)) : 0,
      entPct:      entPct,
      entgPct:     entgPct,
      boleto: {
        qtd:       boletoParc  || 0,
        intervalo: boletoInt   || 0
      }
    },

    // ── Datas e prazos ─────────────────────────────────────────────────
    dataInicio:  dataInicio  || '',
    dataEntrega: dataEntrega || '',
    prazoUtil:   prazo,
    validadeOrc: valid,

    // ── Snapshot dos serviços ──────────────────────────────────────────
    servicos: {
      tipo:    q.tipo    || '',
      mat:     q.mat     || '',
      matPr:   q.matPr   || 0,
      m2:      q.m2      || 0,
      pds:     q.pds     || [],      // peças/pedras
      acN:     q.acN     || [],      // acessórios (nomes)
      obs:     obsContr  || q.obs || '',
      ambSnap: q.ambSnap || []       // snapshot dos ambientes
    },

    // ── Condições de pagamento (texto gerado na tela) ──────────────────
    pgConds: pgConds
  };

  if(!DB.c) DB.c = [];
  // Se o mesmo orçamento for refechado, substitui o contrato anterior
  DB.c = DB.c.filter(function(c){ return String(c.qid) !== String(q.id); });
  DB.c.unshift(_contrato);
  // ── fim ETAPA 1 ────────────────────────────────────────────────────

  DB.sv(); renderFin();
  setTimeout(function(){
    // ── ETAPA 2: usa snapshot DB.c como fonte de dados para o PDF ──────
    // O snapshot foi salvo logo acima (DB.c.unshift(_contrato)).
    // Isso garante que o PDF usa dados fixos e não depende mais de DB.q.
    var snap=(DB.c||[]).find(function(c){return String(c.qid)===String(q.id);});
    if(snap){
      var qSnap=_qFromContrato(snap);
      _gerarContratoHtml(qSnap,snap.pgConds||pgConds,prazo,valid,parc,taxa,pgTipo);
    }else{
      _gerarContratoHtml(q,pgConds,prazo,valid,parc,taxa,pgTipo); // fallback
    }
  },50);
  }catch(err){console.error('confirmarContrato:',err);toast('Erro: '+err.message);}
}

function _gerarContratoHtml(q,pgConds,prazo,valid,parc,taxa,pgTipo){
  if(!q){toast('Orçamento não encontrado');return;}
  var emp=CFG.emp;
  var hoje=new Date();
  var dataStr=hoje.toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
  var dataSimples=hoje.toLocaleDateString('pt-BR');
  var tipo=(q.tipo||'Outro');
  var garantiaMeses=12;

  var pecasHtml='';
  (q.pds||[]).forEach(function(p,i){
    pecasHtml+='<tr><td>'+(i+1)+'</td><td>'+(p.desc||'Peça')+'</td><td>'+p.w+'×'+p.h+' cm</td><td>'+(p.q||1)+'</td><td>'+((p.w/100)*(p.h/100)*(p.q||1)).toFixed(3)+' m²</td></tr>';
  });
  (q.sfPcs||[]).forEach(function(p,i){
    pecasHtml+='<tr><td>+</td><td>'+(p.l||'Serviço')+'</td><td>'+p.w+'ml × '+p.h+' cm</td><td>'+(p.q||1)+'</td><td>'+p.m2.toFixed(3)+' m²</td></tr>';
  });

  var svHtml=(q.acN&&q.acN.length)?q.acN.map(function(s){return '<li>'+s+'</li>';}).join(''):'<li>Acabamento e instalação profissional</li>';

  // Serviços personalizados: separar do acN para destaque visual no contrato
  var customSvsContr=[];
  if(q.ambSnap&&q.ambSnap.length){
    q.ambSnap.forEach(function(snap){
      (snap.customSvs||[]).forEach(function(cs){
        if(cs.nome&&(cs.valor||0)>0)customSvsContr.push(cs);
      });
    });
  }
  var svHtmlCustom=customSvsContr.length
    ?customSvsContr.map(function(cs){
        return '<li style="color:#7a4400;"><strong>'+cs.nome+'</strong>'+(cs.desc?' — '+cs.desc:'')+' <span style="color:#C9A84C;font-weight:900;">R$ '+fm(cs.valor)+'</span></li>';
      }).join('')
    :'';

  // Montar bloco de condições dinâmico
  var condsHtml='';
  pgConds.forEach(function(c,i){
    condsHtml+='<div class="cond-item"><div class="cond-num">'+c.icon+'</div><div class="cond-text">'+c.txt+'</div></div>';
  });

  // Label de forma de pagamento para o contrato
  var pgLabel='50% Entrada + 50% Entrega';
  var pgLabels={'50_50':'50% Entrada + 50% Entrega','vista':'À Vista','30_70':'30% Entrada + 70% Entrega','40_60':'40% Entrada + 60% Entrega','60_40':'60% Entrada + 40% Entrega','3x':'3 parcelas iguais','cartao_parc':'Cartão de Crédito Parcelado','debito':'Cartão de Débito','boleto':'Boleto Bancário'};
  if(pgLabels[pgTipo])pgLabel=pgLabels[pgTipo];
  else if(pgTipo==='personalizado')pgLabel='Forma Personalizada';

  var html='<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">'
  +'<meta name="viewport" content="width=device-width,initial-scale=1">'
  +'<title>Contrato — '+q.cli+'</title>'
  +'<style>'
  +'*{margin:0;padding:0;box-sizing:border-box;}'
  +'body{font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#1a1a1a;background:#fff;padding:0;}'
  +'.page{max-width:780px;margin:0 auto;padding:0 0 40px;}'
  +'.hdr{background:#0f0c00;padding:22px 36px;display:flex;justify-content:space-between;align-items:center;}'
  +'.hdr-logo{font-size:22px;font-weight:900;color:#C9A84C;letter-spacing:-.3px;}'
  +'.hdr-tag{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:rgba(201,168,76,.5);margin-top:3px;}'
  +'.hdr-info{text-align:right;color:rgba(255,255,255,.7);font-size:10px;line-height:1.7;}'
  +'.hdr-info span{color:#C9A84C;font-weight:700;}'
  +'.title-strip{background:#f7f2e8;border-bottom:3px solid #C9A84C;padding:14px 36px;display:flex;justify-content:space-between;align-items:center;}'
  +'.title-main{font-size:16px;font-weight:900;color:#3a2000;letter-spacing:-.2px;}'
  +'.title-num{font-size:10px;color:#999;}'
  +'.body{padding:24px 36px;}'
  +'.section{margin-bottom:22px;}'
  +'.sec-title{font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;border-bottom:1px solid #e8d89c;padding-bottom:5px;margin-bottom:12px;}'
  +'.row2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}'
  +'.field{margin-bottom:8px;}'
  +'.field label{display:block;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#999;margin-bottom:2px;}'
  +'.field span{font-size:12px;font-weight:700;color:#1a1a1a;}'
  +'table{width:100%;border-collapse:collapse;font-size:11px;}'
  +'th{background:#0f0c00;color:#C9A84C;padding:7px 10px;text-align:left;font-size:9px;letter-spacing:1px;text-transform:uppercase;}'
  +'td{padding:7px 10px;border-bottom:1px solid #f0e8d8;}'
  +'tr:last-child td{border-bottom:none;}'
  +'tr:nth-child(even) td{background:#faf5ea;}'
  +'.price-box{background:#0f0c00;border-radius:10px;padding:16px 20px;margin-bottom:16px;}'
  +'.price-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;}'
  +'.price-label{font-size:10px;color:rgba(255,255,255,.5);letter-spacing:1px;text-transform:uppercase;}'
  +'.price-val{font-size:14px;font-weight:900;color:#C9A84C;}'
  +'.price-val.main{font-size:22px;}'
  +'.price-val.gray{color:rgba(255,255,255,.4);font-size:12px;}'
  +'.price-divider{border:none;border-top:1px solid rgba(201,168,76,.2);margin:8px 0;}'
  +'.pg-badge{display:inline-block;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.4);border-radius:6px;padding:4px 10px;font-size:10px;font-weight:700;color:#C9A84C;margin-bottom:12px;}'
  +'.cond-item{display:flex;gap:10px;align-items:flex-start;margin-bottom:9px;padding:9px 12px;background:#f9f5ef;border-left:3px solid #C9A84C;border-radius:0 6px 6px 0;}'
  +'.cond-num{font-size:11px;font-weight:900;color:#C9A84C;min-width:18px;}'
  +'.cond-text{font-size:11px;color:#333;line-height:1.5;}'
  +'.guarantee{background:#e8f4e8;border:1px solid #a8d4a8;border-radius:8px;padding:14px 16px;margin-bottom:16px;}'
  +'.guarantee-title{font-size:11px;font-weight:900;color:#2a6a2a;margin-bottom:6px;}'
  +'.guarantee-text{font-size:11px;color:#2a4a2a;line-height:1.6;}'
  +'.sig-area{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:40px;}'
  +'.sig-line{border-top:1px solid #333;padding-top:8px;}'
  +'.sig-name{font-size:11px;font-weight:700;}'
  +'.sig-role{font-size:9px;color:#666;margin-top:2px;}'
  +'.foot{background:#0f0c00;padding:12px 36px;display:flex;justify-content:space-between;align-items:center;margin-top:24px;}'
  +'.foot span{font-size:9px;color:rgba(201,168,76,.4);}'
  +'ul{padding-left:16px;}'
  +'ul li{margin-bottom:4px;font-size:11px;color:#333;}'
  +'@media print{body{padding:0;}.page{max-width:100%;}}'
  +'</style></head><body>'
  +'<div class="page">'

  +'<div class="hdr">'
    +'<div style="display:flex;align-items:center;gap:12px;">'
    +(typeof HR_LOGO!=='undefined'?'<img src="'+HR_LOGO+'" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid rgba(201,168,76,.4);">':'<div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(145deg,#C9A84C,#8B6014);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.2rem;color:#1a0e00;">HR</div>')
    +'<div><div class="hdr-logo">'+emp.nome+'</div><div class="hdr-tag">Mármores · Granitos · Quartzitos</div></div>'
    +'</div>'
    +'<div class="hdr-info">'
      +'<span>'+emp.tel+'</span><br>'
      +emp.end+'<br>'
      +emp.cidade+'<br>'
      +'CNPJ: '+emp.cnpj
    +'</div>'
  +'</div>'

  +'<div class="title-strip">'
    +'<div class="title-main">📜 CONTRATO DE FORNECIMENTO E INSTALAÇÃO</div>'
    +'<div class="title-num">Nº '+String(q.id).slice(-6)+' · '+dataSimples+'</div>'
  +'</div>'

  +'<div class="body">'

  +'<div class="section">'
  +'<div class="sec-title">Partes Contratantes</div>'
  +'<div class="row2">'
    +'<div>'
      +'<div class="field"><label>Contratada</label><span>'+emp.nome+'</span></div>'
      +'<div class="field"><label>CNPJ</label><span>'+emp.cnpj+'</span></div>'
      +'<div class="field"><label>Endereço</label><span>'+emp.end+'</span></div>'
      +'<div class="field"><label>Telefone</label><span>'+emp.tel+'</span></div>'
    +'</div>'
    +'<div>'
      +'<div class="field"><label>Contratante (Cliente)</label><span>'+escH(q.cli||'')+'</span></div>'
      +(q.tel?'<div class="field"><label>Telefone</label><span>'+escH(q.tel)+'</span></div>':'')
      +(q.end?'<div class="field"><label>Endereço de entrega</label><span>'+escH(q.end)+'</span></div>':'')
      +(q.cidade?'<div class="field"><label>Cidade</label><span>'+escH(q.cidade)+'</span></div>':'')
    +'</div>'
  +'</div>'
  +'</div>'

  +'<div class="section">'
  +'<div class="sec-title">Objeto do Contrato</div>'
  +'<div class="field" style="margin-bottom:12px;"><label>Tipo de Serviço</label><span>'+tipo+'</span></div>'
  +'<div class="field" style="margin-bottom:12px;"><label>Material</label><span>'+(q.mat||'Granito/Mármore')+' — R$ '+(q.matPr||0).toLocaleString('pt-BR',{minimumFractionDigits:2})+'/m²</span></div>'
  +(pecasHtml?'<table><thead><tr><th>Nº</th><th>Descrição</th><th>Medidas</th><th>Qtd</th><th>Área</th></tr></thead><tbody>'+pecasHtml+'</tbody></table>':'')
  +'<div style="margin-top:12px;"><div class="field"><label>Total de m²</label><span>'+fm(q.m2||0)+' m²</span></div></div>'
  +'</div>'

  +'<div class="section">'
  +'<div class="sec-title">Serviços Inclusos</div>'
  +'<ul>'+svHtml+'<li>Fabricação e acabamento completo</li></ul>'
  +(svHtmlCustom?'<div style="margin-top:12px;background:#fffbf0;border:1px solid #e8d89c;border-radius:8px;padding:12px 14px;">'
    +'<div style="font-size:9px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;margin-bottom:8px;">✏️ Serviços Personalizados</div>'
    +'<ul>'+svHtmlCustom+'</ul>'
    +'</div>':'')
  +(q.obs?'<div style="margin-top:10px;" class="field"><label>Observações</label><span>'+escH(q.obs)+'</span></div>':'')
  +'</div>'

  +'<div class="section">'
  +'<div class="sec-title">Valores e Pagamento</div>'
  +'<div class="price-box">'
    +'<div class="price-row"><span class="price-label">Valor à vista</span><span class="price-val main">R$ '+fm(q.vista||0)+'</span></div>'
    +'<hr class="price-divider">'
    +(pgTipo==='cartao_parc'
      ?'<div class="price-row"><span class="price-label">Cartão '+parc+'× (acréscimo '+taxa+'%)</span><span class="price-val gray">R$ '+fm((q.vista||0)*(1+taxa/100))+'</span></div>'
      :pgTipo==='boleto'
      ?'<div class="price-row"><span class="price-label">Boleto Bancário (sem acréscimo)</span><span class="price-val gray">'+pgLabel+'</span></div>'
      :'<div class="price-row"><span class="price-label">Forma de pagamento</span><span class="price-val gray">'+pgLabel+'</span></div>'
    )
  +'</div>'
  +'<div class="pg-badge">💳 '+pgLabel+'</div>'
  +condsHtml
  +'</div>'

  +'<div class="section">'
  +'<div class="sec-title">Condições Gerais</div>'
  +'<div class="cond-item"><div class="cond-num">1</div><div class="cond-text">A <strong>'+emp.nome+'</strong> se compromete a fornecer o material e executar os serviços descritos neste contrato dentro do prazo acordado entre as partes.</div></div>'
  +'<div class="cond-item"><div class="cond-num">2</div><div class="cond-text">O prazo de entrega começa a contar após o pagamento da entrada (ou do primeiro boleto/parcela) e confirmação das medidas definitivas pelo cliente.</div></div>'
  +'<div class="cond-item"><div class="cond-num">3</div><div class="cond-text">Variações naturais de cor, veios e textura são características próprias de pedras naturais (granito, mármore, quartzito) e não constituem defeito de fabricação.</div></div>'
  +'<div class="cond-item"><div class="cond-num">4</div><div class="cond-text">O cliente é responsável por garantir o acesso ao local, bem como que a estrutura de apoio (gabinetes, paredes) esteja pronta e nivelada no dia da instalação.</div></div>'
  +'<div class="cond-item"><div class="cond-num">5</div><div class="cond-text">Alterações no projeto após a aprovação das medidas poderão gerar custos adicionais, sujeitos a novo orçamento.</div></div>'
  +'<div class="cond-item"><div class="cond-num">6</div><div class="cond-text">A rescisão do contrato após o início da produção implicará cobrança mínima de 40% do valor total para cobrir materiais e mão de obra já executados.</div></div>'
  +'<div class="cond-item"><div class="cond-num">7</div><div class="cond-text"><strong>Prazo e brindes por atraso:</strong> Prazo de entrega: <strong>'+prazo+' dias úteis</strong> após pagamento da entrada. Em caso de atraso por responsabilidade da contratada, a cada <strong>5 dias</strong> de atraso será concedido um brinde ao cliente como compensação.</div></div>'
  +'</div>'

  +'<div class="section">'
  +'<div class="sec-title">Garantia</div>'
  +'<div class="guarantee">'
    +'<div class="guarantee-title">✅ Garantia de '+garantiaMeses+' meses</div>'
    +'<div class="guarantee-text">'
      +'A <strong>'+emp.nome+'</strong> oferece garantia de <strong>'+garantiaMeses+' ('+_numPorExtenso(garantiaMeses)+') meses</strong> contra defeitos de fabricação e instalação, a contar da data de entrega.<br><br>'
      +'<strong>Coberto:</strong> Trincas por má execução, falhas no acabamento, problemas de instalação causados pela contratada.<br><br>'
      +'<strong>Não coberto:</strong> Danos por mau uso, impactos físicos, produtos químicos inadequados, infiltrações ou problemas estruturais do imóvel.'
    +'</div>'
  +'</div>'
  +'</div>'

  +'<div class="section">'
  +'<div class="sec-title">Assinaturas</div>'
  +'<div style="text-align:center;font-size:11px;color:#666;margin-bottom:24px;">'+q.cidade+', '+dataStr+'</div>'
  +'<div class="sig-area">'
    +'<div><div class="sig-line"><div class="sig-name">'+emp.nome+'</div><div class="sig-role">Contratada · CNPJ: '+emp.cnpj+'</div></div></div>'
    +'<div><div class="sig-line"><div class="sig-name">'+escH(q.cli||'')+'</div><div class="sig-role">Contratante · CPF: ___________________</div></div></div>'
  +'</div>'
  +'</div>'

  +'</div>'

  +'<div class="foot">'
    +'<span>'+emp.nome+' · '+emp.cnpj+'</span>'
    +'<span>Contrato gerado em '+dataSimples+' · HR App</span>'
  +'</div>'
  +'</div>'

  +'<script>window.addEventListener("load",function(){setTimeout(function(){window.print();},500);});<\/script>'
  +'</body></html>';

  _abrirContratoOverlay(q, html);
}

function _abrirContratoOverlay(q, html){
  try{
    var nomeCliente=(q.cli||'cliente').replace(/\s+/g,'_').toLowerCase();
    var fileName='Contrato_'+nomeCliente+'_HR.pdf';

    // Remove overlay anterior se existir
    var antigo=document.getElementById('contrPdfOv');
    if(antigo)antigo.remove();

    var ov=document.createElement('div');
    ov.id='contrPdfOv';
    ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.97);z-index:9999;display:flex;flex-direction:column;';
    ov.addEventListener('click',function(e){e.stopPropagation();});

    var temShare=!!(navigator.share);
    var barEl=document.createElement('div');
    barEl.style.cssText='display:flex;align-items:center;gap:8px;padding:10px 13px;background:#0f0c00;border-bottom:1px solid rgba(201,168,76,.55);flex-shrink:0;flex-wrap:wrap;';
    barEl.innerHTML=''
      +'<span style="flex:1;font-size:.75rem;color:#C9A84C;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">📜 Contrato — '+escH(q.cli||'')+'</span>'
      +'<button id="ctrBtnClose" style="background:transparent;border:1px solid rgba(201,168,76,.35);color:rgba(201,168,76,.7);padding:7px 11px;border-radius:8px;font-size:.72rem;cursor:pointer;font-family:Outfit,sans-serif;">✕ Fechar</button>'
      +'<button id="ctrBtnDown" disabled style="background:#1e1800;border:1px solid rgba(201,168,76,.2);color:rgba(201,168,76,.35);padding:7px 13px;border-radius:8px;font-size:.72rem;cursor:pointer;font-family:Outfit,sans-serif;white-space:nowrap;">⏳ Gerando...</button>'
      +(temShare?'<button id="ctrBtnShare" disabled style="background:#1e1800;border:1px solid rgba(201,168,76,.2);color:rgba(201,168,76,.35);padding:7px 13px;border-radius:8px;font-size:.72rem;cursor:pointer;font-family:Outfit,sans-serif;white-space:nowrap;">↗ Compartilhar</button>':'')
      +'<button id="ctrBtnPrint" style="background:#C9A84C;border:none;color:#000;padding:7px 13px;border-radius:8px;font-size:.72rem;font-weight:800;cursor:pointer;font-family:Outfit,sans-serif;white-space:nowrap;">🖨 Imprimir / PDF</button>';

    var preview=document.createElement('div');
    preview.style.cssText='flex:1;overflow-y:auto;background:#555;display:flex;justify-content:center;align-items:flex-start;padding:16px 8px;';
    preview.innerHTML='<div style="text-align:center;color:#C9A84C;padding:60px 20px;font-family:Outfit,sans-serif;font-size:.85rem;letter-spacing:.5px;">⏳ Gerando visualização, aguarde...</div>';

    ov.appendChild(barEl);
    ov.appendChild(preview);
    document.body.appendChild(ov);

    // Botão fechar
    var btnClose=document.getElementById('ctrBtnClose');
    if(btnClose)btnClose.onclick=function(e){e.stopPropagation();ov.remove();};

    // Botão imprimir — abre nova aba com o HTML completo e aciona print
    var btnPrint=document.getElementById('ctrBtnPrint');
    if(btnPrint)btnPrint.onclick=function(e){
      e.stopPropagation();
      var w=window.open('','_blank');
      if(w){
        w.document.open();
        w.document.write(html);
        w.document.close();
      } else {
        toast('⚠️ Popup bloqueado. Libere popups para imprimir.');
      }
    };

    // Gerar preview via div offscreen (sem iframe para evitar problemas de sandbox)
    var cssMatch=html.match(/<style>([\s\S]*?)<\/style>/);
    var css=cssMatch?cssMatch[1]:'';
    // Pega tudo entre <body> e </body> (ou o conteudo todo se não encontrar)
    var bodyMatch=html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    var bodyContent=bodyMatch?bodyMatch[1]:html;
    // Remove a tag de script de auto-print
    bodyContent=bodyContent.replace(/<script[\s\S]*?<\/script>/gi,'');

    var offscreen=document.createElement('div');
    offscreen.style.cssText='position:absolute;left:-9999px;top:0;width:780px;background:#fff;pointer-events:none;';
    offscreen.innerHTML='<style>'+css+'@media print{body{padding:0;}}</style>'+bodyContent;
    document.body.appendChild(offscreen);

    function _loadScript(src,cb){
      var s=document.createElement('script');s.src=src;
      s.onload=cb;s.onerror=function(){cb(new Error('load fail'));};
      document.head.appendChild(s);
    }

    function _mostrarFallback(msg){
      if(document.body.contains(offscreen))document.body.removeChild(offscreen);
      preview.innerHTML='<div style="text-align:center;color:#f0a020;padding:40px 20px;font-family:Outfit,sans-serif;font-size:.85rem;line-height:1.7;">'
        +'⚠️ '+(msg||'Erro na visualização.')+'<br><br>'
        +'<strong style="color:#fff;">Use 🖨 Imprimir / PDF acima para salvar o contrato.</strong></div>';
      var bd=document.getElementById('ctrBtnDown');
      if(bd){bd.innerHTML='N/A';bd.disabled=true;}
    }

    function _renderPDF(){
      var target=offscreen.querySelector('.page')||offscreen;
      setTimeout(function(){
        try{
          html2canvas(target,{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false,width:780,windowWidth:780})
          .then(function(canvas){
            if(document.body.contains(offscreen))document.body.removeChild(offscreen);
            try{
              var jsPDF=window.jspdf&&window.jspdf.jsPDF;
              if(!jsPDF)throw new Error('jsPDF não carregou');
              var pageW=595.28;
              var pageH=pageW*(canvas.height/canvas.width);
              var pdf=new jsPDF({orientation:'portrait',unit:'pt',format:[pageW,pageH]});
              pdf.addImage(canvas.toDataURL('image/jpeg',0.92),'JPEG',0,0,pageW,pageH);
              var pdfBlob=pdf.output('blob');

              // Mostra preview como imagem
              var img=document.createElement('img');
              img.src=canvas.toDataURL('image/jpeg',0.85);
              img.style.cssText='width:100%;max-width:780px;display:block;box-shadow:0 4px 32px rgba(0,0,0,.6);';
              preview.innerHTML='';preview.appendChild(img);

              function enableBtn(id,label,cb){
                var b=document.getElementById(id);if(!b)return;
                b.innerHTML=label;b.disabled=false;
                b.style.color='#C9A84C';b.style.borderColor='rgba(201,168,76,.55)';b.style.background='#1e1800';
                b.onclick=function(e){e.stopPropagation();cb();};
              }
              enableBtn('ctrBtnDown','⬇ Salvar PDF',function(){
                var url=URL.createObjectURL(pdfBlob);
                var a=document.createElement('a');
                a.href=url;a.download=fileName;
                document.body.appendChild(a);a.click();document.body.removeChild(a);
                setTimeout(function(){URL.revokeObjectURL(url);},30000);
                toast('📄 Contrato salvo!');
              });
              if(temShare){
                enableBtn('ctrBtnShare','↗ Compartilhar',function(){
                  var pdfFile=new File([pdfBlob],fileName,{type:'application/pdf'});
                  var sd={title:'Contrato — '+(q.cli||''),text:CFG.emp.nome||'HR Mármores'};
                  if(navigator.canShare&&navigator.canShare({files:[pdfFile]}))sd.files=[pdfFile];
                  navigator.share(sd).catch(function(){});
                });
              }
              toast('✓ Contrato pronto!');
            }catch(pdfErr){
              _mostrarFallback('Erro ao gerar PDF: '+pdfErr.message);
            }
          }).catch(function(canvasErr){
            _mostrarFallback('Erro na captura da imagem.');
            console.error('html2canvas error:',canvasErr);
          });
        }catch(renderErr){
          _mostrarFallback('Erro inesperado: '+renderErr.message);
        }
      },600);
    }

    // Carrega bibliotecas se necessário
    function _ensureLibs(cb){
      if(typeof html2canvas!=='undefined'&&typeof window.jspdf!=='undefined'){cb();return;}
      if(typeof html2canvas==='undefined'){
        toast('Carregando bibliotecas...');
        _loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',function(err){
          if(err){_mostrarFallback('Sem conexão para carregar bibliotecas.');return;}
          if(typeof window.jspdf==='undefined'){
            _loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',function(err2){
              if(err2){_mostrarFallback('Sem conexão para carregar bibliotecas.');return;}
              cb();
            });
          } else {cb();}
        });
      } else if(typeof window.jspdf==='undefined'){
        _loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',function(err){
          if(err){_mostrarFallback('Sem conexão para carregar bibliotecas.');return;}
          cb();
        });
      }
    }

    _ensureLibs(_renderPDF);

  }catch(overlayErr){
    console.error('_abrirContratoOverlay error:',overlayErr);
    toast('Erro ao abrir contrato: '+overlayErr.message);
  }
}

function _numPorExtenso(n){
  var m={6:'seis',12:'doze',3:'três',1:'um'};
  return m[n]||String(n);
}

// ═══ FECHAR SERVIÇO ═══
function fecharServico(id,e){
  if(e){e.stopPropagation();e.preventDefault();}
  var q=DB.q.find(function(x){return x.id==id;});
  if(!q){toast('Orçamento não encontrado');return;}
  if(q.status==='fechado'){toast('Serviço já fechado');return;}
  toast('✔ Fechando serviço de '+(q.cli||'cliente')+'...');
  setTimeout(function(){
    q.status='fechado';
    if(!DB.t)DB.t=[];
    DB.sv(); renderOrc();
    toast('✅ Serviço fechado! Defina a forma de pagamento no contrato.');
    setTimeout(function(){gerarContrato(id,null);},400);
  },200);
}

// ═══ LANÇAR FINANCEIRO HISTÓRICO ═══
function lancFinHist(id,e){
  if(e){e.stopPropagation();e.preventDefault();}
  var q=(DB.q||[]).find(function(x){return x.id==id;});
  if(!q){toast('Não encontrado');return;}
  if(!DB.t)DB.t=[];
  if(DB.t.some(function(t){return t.qid==id;})){toast('✅ Já lançado!');return;}
  var ent=Math.round((q.vista||0)*0.5),rest=(q.vista||0)-ent;
  var td=(q.tipo||'Serviço')+(q.mat?' · '+q.mat:'');
  DB.t.unshift({id:Date.now(),type:'in',desc:'Entrada 50% — '+(q.cli||'Cliente')+' ('+td+')',value:ent,date:new Date().toISOString().slice(0,10),qid:id});
  DB.t.unshift({id:Date.now()+1,type:'pend',desc:'A receber 50% — '+(q.cli||'Cliente')+' ('+td+')',value:rest,date:new Date().toISOString().slice(0,10),qid:id});
  DB.sv(); renderFin();
  toast('💰 Lançado! R$ '+fm(ent)+' entrada + R$ '+fm(rest)+' a receber');
}
function orcIrFinancas(id,e){
  if(e){e.stopPropagation();e.preventDefault();}
  go(4);
  setTimeout(function(){
    if(!(DB.t||[]).some(function(t){return t.qid==id;})) lancFinHist(id,null);
    else toast('✅ Já nas Finanças');
  },320);
}
// ═══ BACKUP ═══
function baixarBackup(){
  var dados={cfg:CFG,q:DB.q,j:DB.j,t:DB.t};
  var json=JSON.stringify(dados);
  var dt=new Date().toLocaleDateString('pt-BR').replace(/\//g,'-');
  var fname='HR_Backup_'+dt+'.json';
  var blob=new Blob([json],{type:'application/json'});
  if(navigator.share){
    var file=new File([blob],fname,{type:'application/json'});
    navigator.share({files:[file],title:'Backup HR Mármores'})
      .then(function(){toast('✓ Backup compartilhado!');})
      .catch(function(){_baixarViaLink(json,fname);});
    return;
  }
  _baixarViaLink(json,fname);
}
function _baixarViaLink(json,fname){
  var uri='data:application/json;charset=utf-8,'+encodeURIComponent(json);
  var a=document.createElement('a');
  a.href=uri;a.download=fname;a.target='_blank';
  document.body.appendChild(a);a.click();
  setTimeout(function(){document.body.removeChild(a);},1000);
  toast('📥 Backup salvo! Verifique seus Downloads.');
}

function carregarBackup(input){
  var file=input.files[0];if(!file)return;
  var reader=new FileReader();
  reader.onload=function(e){
    try{
      var d=JSON.parse(e.target.result);
      if(d.cfg){CFG=d.cfg;localStorage.setItem('hr_cfg',JSON.stringify(CFG));}
      if(d.q)DB.q=d.q;if(d.j)DB.j=d.j;if(d.t)DB.t=d.t;
      DB.sv();
      toast('✓ Backup restaurado! Recarregando...');
      setTimeout(function(){location.reload();},900);
    }catch(err){toast('❌ Arquivo inválido');}
  };
  reader.readAsText(file);
}



// ═══ IA — INTERPRETAR DESCRIÇÃO ═══
var _aiResultData = null;

function aiInterpretar(){
  var desc = document.getElementById('aiDesc').value.trim();
  if(!desc){toast('Descreva o projeto primeiro');return;}

  var st = document.getElementById('aiStatus');
  var btn = document.getElementById('btnAIEnviar');
  st.className='ai-status loading';
  st.textContent='⏳ Interpretando...';
  btn.disabled=true;btn.textContent='⏳ Aguarde...';
  document.getElementById('aiResultBox').style.display='none';
  document.getElementById('btnAIAplicar').style.display='none';

  var prompt = 'Você é um assistente especializado em orçamentos de mármore e granito.\n'
    +'O cliente descreveu o projeto:\n"'+desc+'"\n\n'
    +'Extraia os itens e retorne APENAS JSON válido, sem markdown:\n'
    +'{\n'
    +'  "pecas":[\n'
    +'    {"desc":"Bancada principal","w":350,"h":60,"q":1}\n'
    +'  ],\n'
    +'  "servicos":[\n'
    +'    {"k":"s_reta","label":"Sainha Reta","ml":4.2,"altCm":6},\n'
    +'    {"k":"forn","label":"Furo Torneira","un":1},\n'
    +'    {"k":"inst","label":"Instalação Padrão"},\n'
    +'    {"k":"ac_sifao","label":"Sifão","un":1}\n'
    +'  ]\n'
    +'}\n\n'
    +'Keys de serviços válidas:\n'
    +'Sainha: s_reta, s_45, s_boleada, s_slim\n'
    +'Frontão: frontao (inclua ml e altCm)\n'
    +'Soleira: sol1, sol2 (inclua ml)\n'
    +'Peitoril: peit_reto, peit_ping, peit_col, peit_portal (inclua ml)\n'
    +'Furos/recortes: forn, fralo, cook (inclua un)\n'
    +'Rebaixo: reb_n, reb_a\n'
    +'Fixação: tubo, cant (inclua un)\n'
    +'Instalação: inst, inst_c\n'
    +'Acessórios: ac_sifao, ac_flex, ac_veda, ac_sil, ac_paraf, ac_sup (inclua un)\n'
    +'Deslocamento: desl_for (inclua km como un)\n\n'
    +'Regras: w e h em cm; sainha/frontão sempre com ml e altCm (padrão 6cm); retorne SÓ o JSON.';

  fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+((CFG.emp&&CFG.emp.apiKey)||'')
    },
    body:JSON.stringify({
      model:'gpt-4o',
      max_tokens:1500,
      messages:[{role:'user',content:prompt}]
    })
  })
  .then(function(r){return r.json();})
  .then(function(data){
    btn.disabled=false;btn.textContent='✨ Interpretar com ChatGPT';
    if(data.error){
      st.className='ai-status err';
      st.textContent='❌ '+data.error.message+'\n\nDica: configure sua API Key em Config → Empresa.';
      return;
    }
    var txt=(data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content)||'';
    txt=txt.replace(/```json\s*/gi,'').replace(/```\s*/g,'').trim();
    var parsed;
    try{parsed=JSON.parse(txt);}
    catch(e){
      st.className='ai-status err';
      st.textContent='❌ Não consegui interpretar. Descreva com mais detalhes.';
      return;
    }
    _aiResultData=parsed;
    aiMostrarResultado(parsed);
    st.className='ai-status ok';
    st.textContent='✓ Projeto interpretado! Revise e aplique.';
  })
  .catch(function(){
    btn.disabled=false;btn.textContent='✨ Interpretar com ChatGPT';
    aiFallbackLocal(desc,st);
  });
}

function aiFallbackLocal(desc,st){
  var d=desc.toLowerCase();
  var parsed={pecas:[],servicos:[]};
  var dimRe=/(\d+)\s*[x×]\s*(\d+)/g;
  var dims=[];var m;
  while((m=dimRe.exec(d))!==null)dims.push({w:+m[1],h:+m[2]});
  if(dims.length===0){
    var nums=d.match(/\d+/g)||[];
    if(nums.length>=2)dims.push({w:+nums[0],h:+nums[1]});
  }
  var labels=['Bancada principal','Bancada lateral','Peça 3','Peça 4'];
  dims.forEach(function(dim,i){
    parsed.pecas.push({desc:labels[i]||('Peça '+(i+1)),w:dim.w,h:dim.h,q:1});
  });
  var svMap=[
    {keys:['sainha reta','reta'],k:'s_reta',label:'Sainha Reta',ml:dims.length?dims[0].w/100:2,altCm:6},
    {keys:['sainha 45','45°','45 grau'],k:'s_45',label:'Sainha 45°',ml:2,altCm:6},
    {keys:['boleada','boleado'],k:'s_boleada',label:'Sainha Boleada',ml:2,altCm:6},
    {keys:['slim'],k:'s_slim',label:'Sainha Slim',ml:2,altCm:4},
    {keys:['frontão','frontao'],k:'frontao',label:'Frontão',ml:dims.length>1?dims[1].w/100:1.2,altCm:30},
    {keys:['furo torneira','torneira'],k:'forn',label:'Furo Torneira',un:1},
    {keys:['furo ralo','ralo'],k:'fralo',label:'Furo Ralo',un:1},
    {keys:['cooktop','cook top'],k:'cook',label:'Recorte Cooktop',un:1},
    {keys:['rebaixo americano','americano'],k:'reb_a',label:'Rebaixo Americano'},
    {keys:['rebaixo'],k:'reb_n',label:'Rebaixo Normal'},
    {keys:['cuba inox','cuba'],k:'cuba_coz',label:'Cuba Inox',u:'cuba'},
    {keys:['cantoneira'],k:'cant',label:'Cantoneira',un:2},
    {keys:['tubo metálico','tubo'],k:'tubo',label:'Tubo Metálico',un:2},
    {keys:['instalação complexa','instalacao complexa','complexa'],k:'inst_c',label:'Instalação Complexa'},
    {keys:['instalação','instalacao'],k:'inst',label:'Instalação Padrão'},
    {keys:['sifão','sifao'],k:'ac_sifao',label:'Sifão',un:1},
    {keys:['flexível','flexivel','flex'],k:'ac_flex',label:'Flexível',un:1},
    {keys:['silicone'],k:'ac_sil',label:'Silicone',un:1},
    {keys:['suporte','mão francesa','mao francesa'],k:'ac_sup',label:'Suporte',un:2},
    {keys:['soleira 2','dois lados'],k:'sol2',label:'Soleira 2 lados',ml:1},
    {keys:['soleira'],k:'sol1',label:'Soleira 1 lado',ml:1},
    {keys:['peitoril'],k:'peit_reto',label:'Peitoril',ml:1.4}
  ];
  var added={};
  svMap.forEach(function(sv){
    if(added[sv.k])return;
    if(sv.keys.some(function(kw){return d.indexOf(kw)>=0;})){
      var item={k:sv.k,label:sv.label};
      if(sv.ml!==undefined){item.ml=sv.ml;item.altCm=sv.altCm||6;}
      if(sv.un!==undefined)item.un=sv.un;
      parsed.servicos.push(item);
      added[sv.k]=true;
    }
  });
  if(parsed.pecas.length===0&&parsed.servicos.length===0){
    st.className='ai-status err';
    st.textContent='❌ Sem internet e não consegui interpretar. Descreva com dimensões como "350×60cm".';
    return;
  }
  _aiResultData=parsed;
  aiMostrarResultado(parsed);
  st.className='ai-status ok';
  st.textContent='✓ Interpretado localmente (sem internet). Revise os itens!';
}

function aiMostrarResultado(parsed){
  var h='';
  if(parsed.pecas&&parsed.pecas.length){
    h+='<div style="font-size:.6rem;color:var(--t3);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">📐 Peças</div>';
    parsed.pecas.forEach(function(p,i){
      var mat=CFG.stones.find(function(s){return s.id===selMat;});
      var m2=p.w&&p.h?(p.w/100)*(p.h/100)*(p.q||1):0;
      var prev=mat&&m2?'≈ R$ '+fm(m2*mat.pr):'';
      h+='<div class="ai-piece">'
       +'<div class="ai-piece-chk on" data-aipc="'+i+'">✓</div>'
       +'<div class="ai-piece-info">'
       +'<div class="ai-piece-name">'+(p.desc||'Peça')+'</div>'
       +'<div class="ai-piece-dim">'+p.w+'×'+p.h+'cm'+(p.q>1?' × '+p.q:'')+(prev?' · <span style="color:var(--grn)">'+prev+'</span>':'')+'</div>'
       +'</div></div>';
    });
  }
  var svs=(parsed.servicos||[]).filter(function(s){return !s.k.startsWith('ac_');});
  var acs=(parsed.servicos||[]).filter(function(s){return s.k.startsWith('ac_');});
  if(svs.length){
    h+='<div style="font-size:.6rem;color:var(--t3);letter-spacing:1.5px;text-transform:uppercase;margin:10px 0 6px;">🔧 Serviços</div>';
    svs.forEach(function(s,i){
      var detalhe='';
      if(s.ml)detalhe=' — '+s.ml+'ml'+(s.altCm?' × '+s.altCm+'cm':'');
      else if(s.un&&s.un>1)detalhe=' — '+s.un+'×';
      var pr=getPr(s.k);
      h+='<div class="ai-piece">'
       +'<div class="ai-piece-chk on" data-aisv="'+(parsed.servicos.indexOf(s))+'">✓</div>'
       +'<div class="ai-piece-info">'
       +'<div class="ai-piece-name">'+(s.label||s.k)+'</div>'
       +'<div class="ai-piece-dim">'+(pr?'R$ '+pr:'')+''+detalhe+'</div>'
       +'</div></div>';
    });
  }
  if(acs.length){
    h+='<div style="font-size:.6rem;color:var(--t3);letter-spacing:1.5px;text-transform:uppercase;margin:10px 0 6px;">🔩 Acessórios</div>';
    acs.forEach(function(s){
      var detalhe=s.un?(' — '+s.un+'×'):'';
      var pr=getPr(s.k);
      h+='<div class="ai-piece">'
       +'<div class="ai-piece-chk on" data-aisv="'+(parsed.servicos.indexOf(s))+'">✓</div>'
       +'<div class="ai-piece-info">'
       +'<div class="ai-piece-name">'+(s.label||s.k)+'</div>'
       +'<div class="ai-piece-dim">'+(pr?'R$ '+pr:'')+''+detalhe+'</div>'
       +'</div></div>';
    });
  }
  if(!parsed.pecas.length&&!parsed.servicos.length){
    h='<div style="color:var(--t3);font-size:.8rem;text-align:center;padding:16px;">Nenhum item identificado. Tente descrever com mais detalhes.</div>';
  }
  document.getElementById('aiResultList').innerHTML=h;
  document.getElementById('aiResultBox').style.display='block';
  document.getElementById('btnAIAplicar').style.display='block';
  document.getElementById('aiResultList').addEventListener('click',function(e){
    var chk=e.target.closest('[data-aipc],[data-aisv]');
    if(chk)chk.classList.toggle('on');
  });
}

function aiAplicar(){
  if(!_aiResultData)return;
  var ambId=_aiAmbId;
  var amb=ambientes.find(function(a){return a.id===ambId;});
  if(!amb)amb=ambientes[0];
  if(!amb)return;
  var applied=0;
  (_aiResultData.pecas||[]).forEach(function(p,i){
    var chk=document.querySelector('[data-aipc="'+i+'"]');
    if(!chk||!chk.classList.contains('on'))return;
    var existing=amb.pecas[0];
    if(existing&&!existing.w&&!existing.h&&!existing.desc){
      existing.desc=p.desc||'Peça';
      existing.w=+p.w||0;
      existing.h=+p.h||0;
      existing.q=+p.q||1;
    } else {
      amb.pecas.push({id:Date.now()+i,desc:p.desc||'Peça',w:+p.w||0,h:+p.h||0,q:+p.q||1});
    }
    applied++;
  });
  if(!amb.svState)amb.svState={};
  (_aiResultData.servicos||[]).forEach(function(s,i){
    var chk=document.querySelector('[data-aisv="'+i+'"]');
    if(!chk||!chk.classList.contains('on'))return;
    var sv={ml:s.ml||0,altCm:s.altCm||6,q:s.q||1,qty:s.un||1};
    amb.svState[s.k]=sv;
    applied++;
  });
  closeAll();
  _aiResultData=null;
  _aiAmbId=null;
  renderAmbientes();
  toast('✓ '+applied+' itens aplicados!');
}

// ═══ TESTAR API KEY ═══
function testarAPIKey(){
  var key=CFG.emp&&CFG.emp.apiKey;
  var el=document.getElementById('apiTestResult');
  if(!key){if(el)el.textContent='⚠️ Nenhuma chave configurada';return;}
  if(el)el.textContent='⏳ Testando...';
  fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
    body:JSON.stringify({model:'gpt-4o-mini',max_tokens:10,messages:[{role:'user',content:'oi'}]})
  }).then(function(r){return r.json();}).then(function(d){
    if(el)el.textContent=d.error?'❌ '+d.error.message:'✅ Conectado!';
  }).catch(function(){if(el)el.textContent='❌ Sem conexão';});
}

function escH(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

// Admin PIN
var _adB='';
var _adOn=localStorage.getItem('hr_adm')==='1';
function openAdminPin(){
  if(_adOn){
    _adOn=false;
    localStorage.setItem('hr_adm','0');
    _applyMode();
    toast('Modo funcionario ativado');
    return;
  }
  _adB='';
  _adDots();
  var m=document.getElementById('adMsg');
  if(m)m.textContent='';
  showMd('adminPinMd');
}
function adPin(d){
  if(_adB.length>=4)return;
  _adB+=d;
  _adDots();
  if(_adB.length===4)setTimeout(_adOk,120);
}
function adPinDel(){
  _adB=_adB.slice(0,-1);
  _adDots();
}
function _adDots(){
  for(var i=0;i<4;i++){
    var d=document.getElementById('ad'+i);
    if(!d)continue;
    d.style.background=i<_adB.length?'var(--gold2)':'transparent';
    d.style.borderColor=i<_adB.length?'var(--gold)':'var(--bd2)';
  }
}
function _adOk(){
  var p=(typeof CFG!=='undefined'&&CFG&&CFG.emp&&CFG.emp.adminPin)?CFG.emp.adminPin:'1818';
  if(_adB===p){
    _adOn=true;
    localStorage.setItem('hr_adm','1');
    closeAll();
    _applyMode();
    toast('Bem-vindo, proprietario!');
  } else {
    var m=document.getElementById('adMsg');
    if(m)m.textContent='Senha incorreta';
    _adB='';
    _adDots();
  }
}
function _spPart(){
  var h=document.querySelector('.sp-hero');
  var s=document.getElementById('sSplash');
  if(!h||!s||!s.classList.contains('on'))return;
  for(var i=0;i<7;i++){
    (function(){
      var p=document.createElement('div');
      var sz=2+Math.random()*7;
      var dur=(1.8+Math.random()*2.4).toFixed(1);
      var hue=Math.random()>.5?'rgba(201,168,76,':'rgba(255,230,120,';
      var op=(.15+Math.random()*.35).toFixed(2);
      p.style.cssText=(
        'position:absolute;border-radius:50%;'
        +'background:'+hue+op+');'
        +'width:'+sz+'px;height:'+sz+'px;'
        +'left:'+(5+Math.random()*90)+'%;'
        +'bottom:'+(5+Math.random()*20)+'%;'
        +'animation:spFloat '+dur+'s ease-out forwards;'
        +'pointer-events:none;'
      );
      h.appendChild(p);
      setTimeout(function(){try{h.removeChild(p);}catch(e){}},( +dur+.5)*1000);
    })();
  }
  setTimeout(_spPart,1800);
}
setTimeout(function(){
  _applyMode();
  _spPart();
},400);

function _applyMode(){
  if(_adOn){
    document.body.classList.remove('func-mode');
    var btn=document.getElementById('btnAdm');
    if(btn){btn.innerHTML='&#x1F451;';btn.style.color='var(--gold2)';btn.style.borderColor='rgba(201,168,76,.3)';}
    document.querySelectorAll('[data-pg="5"],[data-pg="6"]').forEach(function(el){
      el.style.opacity='';el.style.pointerEvents='';
      var lk=el.querySelector('.nav-lock');if(lk)lk.remove();
    });
  } else {
    document.body.classList.add('func-mode');
    var btn=document.getElementById('btnAdm');
    if(btn){btn.innerHTML='&#x1F512;';btn.style.color='var(--t3)';btn.style.borderColor='var(--bd)';}
    document.querySelectorAll('[data-pg="5"],[data-pg="6"]').forEach(function(el){
      el.style.opacity='.4';el.style.pointerEvents='auto';
      if(!el.querySelector('.nav-lock')){
        var lk=document.createElement('span');
        lk.className='nav-lock';lk.textContent='🔒';
        el.appendChild(lk);
      }
    });
  }
}

function selDebitoPct(pct){
  document.querySelectorAll('[data-debpct]').forEach(function(b){b.classList.remove('on');});
  var btn=document.querySelector('[data-debpct="'+pct+'"]');if(btn)btn.classList.add('on');
  var inp=document.getElementById('contrDebitoPct');if(inp)inp.value=pct;
}
