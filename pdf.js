function gerarPDF(){
  // FASE 1 — item 1.3: verificar pendQ e pendQ.id (não só existência)
  if(!pendQ||!pendQ.id){toast('Calcule um orçamento primeiro');return;}
  // Load PDF libs on-demand if not already loaded
  if(typeof html2canvas==='undefined'||typeof window.jspdf==='undefined'){
    toast('Carregando bibliotecas PDF...');
    var s1=document.createElement('script');
    s1.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s1.onload=function(){
      var s2=document.createElement('script');
      s2.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s2.onload=function(){gerarPDF();};
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
    return;
  }
  if(!pendQ||!pendQ.id){toast('Calcule um orçamento primeiro');return;}
  var q=pendQ;
  var emp=CFG.emp;

  // ── Numeração sequencial a partir de 0 ──
  var pdfCount=parseInt(localStorage.getItem('hr_pdf_count')||'0',10);
  var orcNum='ORC-'+String(pdfCount).padStart(4,'0');
  localStorage.setItem('hr_pdf_count', pdfCount+1);

  var fileName='Orcamento_'+orcNum+'_'+q.cli.replace(/[^a-zA-Z0-9]/g,'_')+'.pdf';
  var economia=q.parc-q.vista;
  var mat=CFG.stones.find(function(s){return s.nm===q.mat;})||{pr:q.matPr||0,nm:q.mat||'',fin:''};

  // ── Linhas da tabela ──
  // Montar linhas da tabela por ambiente
  var allRowsHtml='';
  if(q.ambSnap&&q.ambSnap.length){
    q.ambSnap.forEach(function(snap,idx){
      var tipo=snap.tipo||'Ambiente';
      allRowsHtml+='<tr><td colspan="4" style="background:#f0ece3;padding:8px 14px;font-size:8px;'
        +'letter-spacing:2px;text-transform:uppercase;color:#8a6020;font-weight:900;'
        +'border-bottom:1px solid #e0d8c8;">'+(idx+1)+'º AMBIENTE — '+tipo.toUpperCase()+'</td></tr>';
      var ambM2=0;
      (snap.pecas||[]).forEach(function(p,i){
        if(!p.w||!p.h)return;
        var a=(p.w/100)*(p.h/100)*(p.q||1);
        ambM2+=a;
        var bg=i%2===0?'#fff':'#faf6ef';
        allRowsHtml+='<tr>'
          +'<td style="padding:9px 14px;background:'+bg+';border-bottom:1px solid #ede8dc;font-size:11.5px;">'+(p.desc||'Peça')+'</td>'
          +'<td style="padding:9px 14px;background:'+bg+';border-bottom:1px solid #ede8dc;font-size:11.5px;color:#777;">'+p.w+' × '+p.h+' cm'+(p.q>1?' <b>×'+p.q+'</b>':'')+'</td>'
          +'<td style="padding:9px 14px;background:'+bg+';border-bottom:1px solid #ede8dc;font-size:11.5px;text-align:right;font-weight:700;color:#6b4400;">'+a.toFixed(3)+' m²</td>'
          +'<td style="padding:9px 14px;background:'+bg+';border-bottom:1px solid #ede8dc;font-size:11px;text-align:right;color:#999;">R$ '+fm(a*mat.pr)+'</td>'
          +'</tr>';
      });
      // Saihas/frontões do svState
      var g=SV_DEFS[tipo]||SV_DEFS.Cozinha;
      var sv=snap.svState||{};
      g.forEach(function(grp){grp.its.forEach(function(it){
        if(!sv[it.k]||it.u!=='sf')return;
        var svd=sv[it.k];
        var ml=svd.ml||0,alt=svd.altCm||0,qq=svd.q||1;
        if(!ml||!alt)return;
        var sfm2=ml*(alt/100)*qq;
        ambM2+=sfm2;
        allRowsHtml+='<tr>'
          +'<td style="padding:9px 14px;background:#f5f9ff;border-bottom:1px solid #e0e8f0;font-size:11.5px;color:#446;">'+it.l+'</td>'
          +'<td style="padding:9px 14px;background:#f5f9ff;border-bottom:1px solid #e0e8f0;font-size:11.5px;color:#777;">'+ml+'ml × '+alt+'cm'+(qq>1?' <b>×'+qq+'</b>':'')+'</td>'
          +'<td style="padding:9px 14px;background:#f5f9ff;border-bottom:1px solid #e0e8f0;font-size:11.5px;text-align:right;font-weight:700;color:#446;">'+sfm2.toFixed(3)+' m²</td>'
          +'<td style="padding:9px 14px;background:#f5f9ff;border-bottom:1px solid #e0e8f0;font-size:11px;text-align:right;color:#999;">R$ '+fm(ml*qq*(CFG.sv[it.k]||0))+'</td>'
          +'</tr>';
      });});
      if(ambM2>0){
        allRowsHtml+='<tr style="background:#ede4ce;">'
          +'<td colspan="2" style="padding:9px 14px;font-size:11px;font-weight:900;color:#5a3800;border-top:1px solid #d4c49a;">'+mat.nm+' — '+tipo+'</td>'
          +'<td style="padding:9px 14px;text-align:right;font-size:11px;font-weight:900;color:#5a3800;border-top:1px solid #d4c49a;">'+ambM2.toFixed(3)+' m²</td>'
          +'<td style="padding:9px 14px;text-align:right;font-size:11px;font-weight:700;color:#5a3800;border-top:1px solid #d4c49a;">R$ '+fm(ambM2*mat.pr)+'</td>'
          +'</tr>';
      }
      // Serviços personalizados do ambiente no PDF
      (snap.customSvs||[]).forEach(function(cs){
        if(!cs.nome||(cs.valor||0)<=0)return;
        allRowsHtml+='<tr>'
          +'<td style="padding:9px 14px;background:#fffbf0;border-bottom:1px solid #f0e8c8;font-size:11.5px;color:#7a4400;font-weight:700;">✏️ '+cs.nome+(cs.desc?' <span style=\'font-weight:400;color:#aaa;\'>— '+cs.desc+'</span>':'')+'</td>'
          +'<td style="padding:9px 14px;background:#fffbf0;border-bottom:1px solid #f0e8c8;font-size:11px;color:#999;">Serviço personalizado</td>'
          +'<td style="padding:9px 14px;background:#fffbf0;border-bottom:1px solid #f0e8c8;font-size:11px;text-align:right;color:#C9A84C;">—</td>'
          +'<td style="padding:9px 14px;background:#fffbf0;border-bottom:1px solid #f0e8c8;font-size:11px;text-align:right;font-weight:900;color:#7a4400;">R$ '+fm(cs.valor)+'</td>'
          +'</tr>';
      });
      }
    });
  } else {
    (q.pds||[]).forEach(function(p,i){
      var bg=i%2===0?'#fff':'#faf6ef';
      var m2p=p.m2||((p.w/100)*(p.h/100)*(p.q||1));
      allRowsHtml+='<tr>'
        +'<td style="padding:9px 14px;background:'+bg+';border-bottom:1px solid #ede8dc;font-size:11.5px;">'+(p.desc||'Peça')+'</td>'
        +'<td style="padding:9px 14px;background:'+bg+';border-bottom:1px solid #ede8dc;font-size:11.5px;color:#777;">'+p.w+' × '+p.h+' cm'+(p.q>1?' ×'+p.q:'')+'</td>'
        +'<td style="padding:9px 14px;background:'+bg+';border-bottom:1px solid #ede8dc;font-size:11.5px;text-align:right;font-weight:700;color:#6b4400;">'+m2p.toFixed(3)+' m²</td>'
        +'<td style="padding:9px 14px;background:'+bg+';border-bottom:1px solid #ede8dc;font-size:11px;text-align:right;color:#999;">R$ '+fm(m2p*mat.pr)+'</td>'
        +'</tr>';
    });
  }
  if(q.m2>0){
    allRowsHtml+='<tr style="background:#0f0c00;">'
      +'<td colspan="2" style="padding:10px 14px;font-size:10px;font-weight:900;color:#C9A84C;letter-spacing:1px;">TOTAL — '+mat.nm.toUpperCase()+'</td>'
      +'<td style="padding:10px 14px;text-align:right;font-size:11px;font-weight:900;color:#C9A84C;">'+q.m2.toFixed(3)+' m²</td>'
      +'<td style="padding:10px 14px;text-align:right;font-size:11px;font-weight:900;color:#C9A84C;">R$ '+fm(q.pedT||q.m2*mat.pr)+'</td>'
      +'</tr>';
  }

  // Serviços
  var svcsHtml=(q.acN&&q.acN.length?q.acN:[]).concat(['Fabricação e acabamento completo']).map(function(a){
    return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #f5f0e8;">'
      +'<span style="color:#C9A84C;font-weight:900;font-size:11px;flex-shrink:0;">✓</span>'
      +'<span style="font-size:11.5px;color:#333;line-height:1.4;">'+a+'</span>'
      +'</div>';
  }).join('');

  // Serviços personalizados para checklist do PDF
  var customSvsPdf=[];
  if(q.ambSnap&&q.ambSnap.length){
    q.ambSnap.forEach(function(snap){
      (snap.customSvs||[]).forEach(function(cs){
        if(cs.nome&&(cs.valor||0)>0)customSvsPdf.push(cs);
      });
    });
  }
  var customSvsPdfHtml=customSvsPdf.map(function(cs){
    return '<div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #f5f0e8;">'
      +'<span style="color:#C9A84C;font-weight:900;font-size:11px;margin-top:1px;flex-shrink:0;">✏</span>'
      +'<span style="font-size:12px;color:#7a4400;font-weight:700;line-height:1.4;">'+cs.nome
      +(cs.desc?' <span style="font-weight:400;color:#999;">— '+cs.desc+'</span>':'')
      +' <span style="color:#C9A84C;font-weight:900;">R$ '+fm(cs.valor)+'</span>'
      +'</span>'
      +'</div>';
  }).join('');

  var svcs=(q.acN&&q.acN.length)?q.acN.map(function(a){
    return '<div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #f5f0e8;">'
      +'<span style="color:#C9A84C;font-weight:900;font-size:11px;margin-top:1px;flex-shrink:0;">&#10003;</span>'
      +'<span style="font-size:12px;color:#333;line-height:1.4;">'+a+'</span>'
      +'</div>';
  }).join(''):'';

  var clienteInfo='';
  if(q.tel)clienteInfo+='<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#555;"><span style="color:#C9A84C;">&#128241;</span>'+q.tel+'</div>';
  if(q.cidade)clienteInfo+='<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#555;"><span style="color:#C9A84C;">&#128205;</span>'+q.cidade+'</div>';
  if(q.end)clienteInfo+='<div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#555;"><span style="color:#C9A84C;">&#127968;</span>'+q.end+'</div>';
  var obsBox=q.obs?'<div style="background:#fffbf0;border-left:4px solid #C9A84C;padding:10px 14px;margin-bottom:18px;font-size:11.5px;color:#555;border-radius:0 8px 8px 0;line-height:1.65;"><strong style="color:#7a4e00;">Observacoes:</strong> '+q.obs+'</div>':'';

  // sec header helper
  function sh(t){return '<div style="display:flex;align-items:center;gap:10px;margin:0 0 12px;"><span style="font-size:7.5px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;font-weight:900;">'+t+'</span><div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.4),transparent);"></div></div>';}

  var recHtml=''
  // ── WRAPPER
  +'<div id="pdfReceipt" style="width:700px;font-family:Arial,Helvetica,sans-serif;background:#fff;color:#1a1a1a;">'

  // ── TOP STRIPE
  +'<div style="height:6px;background:linear-gradient(90deg,#5a3a06 0%,#C9A84C 35%,#E8C96A 50%,#C9A84C 65%,#5a3a06 100%);"></div>'

  // ── HEADER
  +'<div style="background:#0f0c00;padding:28px 38px 22px;display:flex;justify-content:space-between;align-items:flex-start;gap:20px;">'
    // brand left
    +'<div style="display:flex;align-items:center;gap:14px;">'
      +(typeof HR_LOGO!=='undefined'?'<img src="'+HR_LOGO+'" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid rgba(201,168,76,.5);flex-shrink:0;">':'')
      +'<div style="display:flex;flex-direction:column;gap:6px;">'
        +'<div style="font-size:26px;font-weight:900;color:#C9A84C;letter-spacing:-0.5px;line-height:1;">'+emp.nome+'</div>'
        +'<div style="font-size:8.5px;letter-spacing:3.5px;text-transform:uppercase;color:rgba(201,168,76,0.45);">Marmore &middot; Granito &middot; Quartzito</div>'
        +'<div style="font-size:10px;color:rgba(255,255,255,0.22);font-style:italic;margin-top:2px;">Qualidade, Precisao e Acabamento Profissional</div>'
      +'</div>'
    +'</div>'
    // info right
    +'<div style="text-align:right;display:flex;flex-direction:column;gap:3px;">'
      +'<div style="font-size:10.5px;color:rgba(201,168,76,0.9);font-weight:700;">'+emp.end+'</div>'
      +'<div style="font-size:10px;color:rgba(255,255,255,0.4);">'+emp.cidade+'</div>'
      +'<div style="font-size:11px;color:rgba(201,168,76,0.9);font-weight:700;margin-top:3px;">'+emp.tel+'</div>'
      +'<div style="font-size:10px;color:rgba(255,255,255,0.4);">'+emp.ig+'</div>'
      +'<div style="font-size:8.5px;color:rgba(255,255,255,0.18);margin-top:3px;">CNPJ: '+emp.cnpj+'</div>'
    +'</div>'
  +'</div>'

  // ── BADGE BAR
  +'<div style="background:#f7f2e8;border-bottom:3px solid #C9A84C;padding:11px 38px;display:flex;justify-content:space-between;align-items:center;">'
    +'<div style="display:flex;align-items:center;gap:12px;">'
      +'<div style="background:#0f0c00;color:#C9A84C;font-size:8px;font-weight:900;padding:6px 16px;border-radius:30px;letter-spacing:3px;text-transform:uppercase;border:1px solid rgba(201,168,76,0.5);">+ ORCAMENTO +</div>'
      +'<div style="background:#C9A84C;color:#000;font-size:9px;font-weight:900;padding:4px 10px;border-radius:5px;letter-spacing:1px;">'+orcNum+'</div>'
    +'</div>'
    +'<div style="text-align:right;">'
      +'<div style="font-size:10px;color:#888;"><strong style="color:#5a3800;">EMISSAO:</strong> '+fd(q.date)+'</div>'
      +'<div style="font-size:9.5px;color:#aaa;">Validade: 7 dias</div>'
    +'</div>'
  +'</div>'

  // ── BODY
  +'<div style="padding:24px 38px 20px;">'

    // CLIENTE
    +sh('Cliente')
    +'<div style="display:flex;gap:12px;margin-bottom:20px;align-items:stretch;">'
      +'<div style="flex:1;background:#fdfaf3;border:1px solid #e8dfc4;border-radius:10px;padding:15px 18px;">'
        +'<div style="font-size:7.5px;letter-spacing:2.5px;text-transform:uppercase;color:#c0a860;margin-bottom:5px;font-weight:900;">NOME DO CLIENTE</div>'
        +'<div style="font-size:21px;font-weight:900;color:#1a1a1a;line-height:1;margin-bottom:8px;">'+q.cli+'</div>'
        +(clienteInfo?'<div style="display:flex;flex-wrap:wrap;gap:6px 16px;">'+clienteInfo+'</div>':'')
      +'</div>'
      +'<div style="background:#0f0c00;border:1px solid rgba(201,168,76,0.45);border-radius:10px;padding:14px 18px;text-align:center;display:flex;flex-direction:column;justify-content:center;min-width:110px;">'
        +'<div style="font-size:7px;letter-spacing:2px;text-transform:uppercase;color:rgba(201,168,76,0.5);margin-bottom:6px;font-weight:900;">PROJETO</div>'
        +'<div style="font-size:16px;font-weight:900;color:#C9A84C;line-height:1.2;">'+q.tipo+'</div>'
      +'</div>'
    +'</div>'
    +obsBox

    // MATERIAL E MEDIDAS
    +sh('Material e Medidas')
    +'<div style="border:1px solid #e8e0d0;border-radius:10px;overflow:hidden;margin-bottom:20px;">'
      +'<table style="width:100%;border-collapse:collapse;">'
        +'<thead>'
          +'<tr style="background:#0f0c00;">'
            +'<th style="padding:10px 13px;text-align:left;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:900;">PECA / DESCRICAO</th>'
            +'<th style="padding:10px 13px;text-align:left;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:900;">DIMENSOES</th>'
            +'<th style="padding:10px 13px;text-align:right;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:900;">AREA</th>'
            +'<th style="padding:10px 13px;text-align:right;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:900;">VALOR</th>'
          +'</tr>'
        +'</thead>'
        +'<tbody>'
          +allRowsHtml
          +'<tr style="background:#ede4ce;">'
            +'<td colspan="2" style="padding:11px 13px;font-size:12px;font-weight:900;color:#5a3800;border-top:2px solid #d4c49a;">Material: '+q.mat+'</td>'
            +'<td style="padding:11px 13px;text-align:right;font-size:12px;font-weight:900;color:#5a3800;border-top:2px solid #d4c49a;">'+q.m2.toFixed(3)+' m&sup2;</td>'
            +'<td style="padding:11px 13px;text-align:right;font-size:12px;font-weight:900;color:#5a3800;border-top:2px solid #d4c49a;">R$ '+fm(q.pedT||q.m2*mat.pr)+'</td>'
          +'</tr>'
        +'</tbody>'
      +'</table>'
    +'</div>'

    // INCLUSO
    +(svcs||customSvsPdfHtml?sh('Incluso no Projeto')
    +'<div style="background:#fdfaf3;border:1px solid #e8dfc4;border-radius:10px;padding:14px 18px;margin-bottom:'+(customSvsPdfHtml?'10':'20')+'px;">'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 16px;">'
        +svcs
        +'<div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #f5f0e8;">'
          +'<span style="color:#C9A84C;font-weight:900;font-size:11px;margin-top:1px;flex-shrink:0;">&#10003;</span>'
          +'<span style="font-size:12px;color:#333;line-height:1.4;">Fabricacao e acabamento completo</span>'
        +'</div>'
      +'</div>'
    +'</div>'
    +(customSvsPdfHtml?'<div style="background:#fffbf0;border:1px solid #e8d89c;border-radius:10px;padding:14px 18px;margin-bottom:20px;">'
      +'<div style="font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:900;margin-bottom:10px;">✏ SERVIÇOS PERSONALIZADOS</div>'
      +'<div style="display:grid;grid-template-columns:1fr;gap:0;">'+customSvsPdfHtml+'</div>'
    +'</div>':''):'')

    // VALORES
    +sh('Valores do Projeto')
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;">'
      // parcelado
      +'<div style="border:1px solid #ddd5c5;border-radius:10px;overflow:hidden;">'
        +'<div style="background:#f0ece3;padding:10px 16px;font-size:7.5px;letter-spacing:2px;text-transform:uppercase;color:#999;font-weight:900;">PARCELADO</div>'
        +'<div style="padding:14px 16px;background:#faf8f4;">'
          +'<div style="font-size:22px;font-weight:900;color:#aaa;line-height:1;margin-bottom:4px;">R$ '+fm(q.parc)+'</div>'
          +'<div style="font-size:11px;color:#bbb;">ate 8x de R$ '+fm(q.p8)+'</div>'
        +'</div>'
      +'</div>'
      // a vista — destaque
      +'<div style="border:2px solid #C9A84C;border-radius:10px;overflow:hidden;box-shadow:0 3px 16px rgba(201,168,76,0.2);">'
        +'<div style="background:#0f0c00;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;">'
          +'<span style="font-size:7.5px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;font-weight:900;">A VISTA</span>'
          +'<span style="background:#C9A84C;color:#000;font-size:8px;font-weight:900;padding:2px 8px;border-radius:20px;">MELHOR OPCAO</span>'
        +'</div>'
        +'<div style="padding:14px 16px;background:#fff;">'
          +'<div style="font-size:28px;font-weight:900;color:#7a4400;line-height:1;margin-bottom:4px;">R$ '+fm(q.vista)+'</div>'
          +'<div style="font-size:11px;color:#a06020;font-weight:700;margin-bottom:6px;">Valor final sem juros</div>'
          +'<div style="display:inline-flex;align-items:center;gap:5px;background:#edf7ed;border:1px solid #7ac47a;color:#1e6b1e;font-size:9px;font-weight:900;padding:3px 10px;border-radius:20px;">&#9660; Economia de R$ '+fm(economia)+'</div>'
        +'</div>'
      +'</div>'
    +'</div>'

    // CONDIÇÃO DE PAGAMENTO
    +sh('Condicao de Pagamento')
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:6px;">'
      +'<div style="background:#fdfaf3;border:1px solid #e8dfc4;border-radius:10px;padding:15px 18px;">'
        +'<div style="font-size:7.5px;letter-spacing:2px;text-transform:uppercase;color:#c0a860;margin-bottom:5px;font-weight:900;">ENTRADA &mdash; 50%</div>'
        +'<div style="font-size:22px;font-weight:900;color:#7a4400;line-height:1;margin-bottom:4px;">R$ '+fm(q.ent)+'</div>'
        +'<div style="font-size:11px;color:#999;">Na assinatura / medicao</div>'
      +'</div>'
      +'<div style="background:#fdfaf3;border:1px solid #e8dfc4;border-radius:10px;padding:15px 18px;">'
        +'<div style="font-size:7.5px;letter-spacing:2px;text-transform:uppercase;color:#c0a860;margin-bottom:5px;font-weight:900;">NA ENTREGA &mdash; 50%</div>'
        +'<div style="font-size:22px;font-weight:900;color:#7a4400;line-height:1;margin-bottom:4px;">R$ '+fm(q.ent)+'</div>'
        +'<div style="font-size:11px;color:#999;">Na entrega / instalacao</div>'
      +'</div>'
    +'</div>'

  +'</div>'

  // ── FOOTER
  +'<div style="background:#0f0c00;padding:18px 38px;display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:4px;">'
    +'<div>'
      +'<div style="font-size:14px;font-weight:900;color:#C9A84C;line-height:1;margin-bottom:4px;">'+emp.nome+'</div>'
      +'<div style="font-size:9.5px;color:rgba(201,168,76,0.4);">'+emp.end+' &mdash; '+emp.cidade+'</div>'
    +'</div>'
    +'<div style="text-align:right;line-height:1.9;">'
      +'<div style="font-size:10.5px;color:rgba(201,168,76,0.85);font-weight:700;">'+emp.tel+'</div>'
      +'<div style="font-size:9.5px;color:rgba(201,168,76,0.4);">'+emp.ig+'</div>'
      +'<div style="font-size:9px;color:rgba(255,255,255,0.15);">CNPJ: '+emp.cnpj+'</div>'
    +'</div>'
  +'</div>'
  +'<div style="height:5px;background:linear-gradient(90deg,#5a3a06 0%,#C9A84C 35%,#E8C96A 50%,#C9A84C 65%,#5a3a06 100%);"></div>'
  +'</div>';

  // ── Overlay ──
  var ov=document.createElement('div');
  ov.id='pdfOv';
  ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.97);z-index:9999;display:flex;flex-direction:column;';

  var barEl=document.createElement('div');
  barEl.style.cssText='display:flex;align-items:center;gap:8px;padding:10px 13px;background:#0f0c00;border-bottom:1px solid rgba(201,168,76,.55);flex-shrink:0;flex-wrap:wrap;';
  barEl.innerHTML=''
    +'<span style="flex:1;font-size:.75rem;color:#C9A84C;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">&#128196; '+orcNum+' &mdash; '+q.cli+'</span>'
    +'<button id="pdfBtnClose" style="background:transparent;border:1px solid rgba(201,168,76,.35);color:rgba(201,168,76,.7);padding:7px 11px;border-radius:8px;font-size:.72rem;cursor:pointer;font-family:Outfit,sans-serif;">&#x2715;</button>'
    +'<button id="pdfBtnDown" disabled style="background:#1e1800;border:1px solid rgba(201,168,76,.2);color:rgba(201,168,76,.35);padding:7px 13px;border-radius:8px;font-size:.72rem;cursor:pointer;font-family:Outfit,sans-serif;white-space:nowrap;">&#9203; Gerando...</button>'
    +(navigator.share?'<button id="pdfBtnShare" disabled style="background:#1e1800;border:1px solid rgba(201,168,76,.2);color:rgba(201,168,76,.35);padding:7px 13px;border-radius:8px;font-size:.72rem;cursor:pointer;font-family:Outfit,sans-serif;white-space:nowrap;">&#8599; Compartilhar</button>':'')
    +'<button id="pdfBtnPrint" style="background:#C9A84C;border:none;color:#000;padding:7px 13px;border-radius:8px;font-size:.72rem;font-weight:800;cursor:pointer;font-family:Outfit,sans-serif;white-space:nowrap;">&#128424; Imprimir</button>';

  var preview=document.createElement('div');
  preview.style.cssText='flex:1;overflow-y:auto;background:#444;display:flex;justify-content:center;align-items:flex-start;padding:16px 8px;';
  preview.innerHTML='<div style="text-align:center;color:#C9A84C;padding:60px 20px;font-family:Outfit,sans-serif;font-size:.85rem;letter-spacing:.5px;">&#9203; Gerando PDF, aguarde...</div>';

  ov.appendChild(barEl);
  ov.appendChild(preview);
  document.body.appendChild(ov);

  document.getElementById('pdfBtnClose').onclick=function(){ov.remove();};
  document.getElementById('pdfBtnPrint').onclick=function(){
    var w=window.open('','_blank');
    if(w){
      w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}body{background:#fff;}</style></head><body>'+recHtml+'<script>window.onload=function(){window.print();};<\/script></body></html>');
      w.document.close();
    }
  };

  // ── Off-screen render ──
  var offscreen=document.createElement('div');
  offscreen.style.cssText='position:fixed;left:-9999px;top:0;width:700px;background:#fff;z-index:-1;';
  offscreen.innerHTML=recHtml;
  document.body.appendChild(offscreen);

  setTimeout(function(){
    html2canvas(offscreen.querySelector('#pdfReceipt'),{
      scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false,width:700,windowWidth:700
    }).then(function(canvas){
      document.body.removeChild(offscreen);
      var jsPDF=window.jspdf.jsPDF;
      var pageW=595.28;
      var pageH=pageW*(canvas.height/canvas.width);
      var pdf=new jsPDF({orientation:'portrait',unit:'pt',format:[pageW,pageH]});
      pdf.addImage(canvas.toDataURL('image/jpeg',0.96),'JPEG',0,0,pageW,pageH);
      var pdfBlob=pdf.output('blob');

      var img=document.createElement('img');
      img.src=canvas.toDataURL('image/jpeg',0.88);
      img.style.cssText='width:100%;max-width:700px;display:block;box-shadow:0 4px 32px rgba(0,0,0,.6);';
      preview.innerHTML='';preview.appendChild(img);

      function enableBtn(id,label,cb){
        var b=document.getElementById(id);if(!b)return;
        b.innerHTML=label;b.disabled=false;
        b.style.color='#C9A84C';b.style.borderColor='rgba(201,168,76,.55)';b.style.background='#1e1800';
        b.onclick=cb;
      }

      enableBtn('pdfBtnDown','&#11015; Salvar PDF',function(){
        var url=URL.createObjectURL(pdfBlob);
        var a=document.createElement('a');
        a.href=url;a.download=fileName;
        document.body.appendChild(a);a.click();document.body.removeChild(a);
        setTimeout(function(){URL.revokeObjectURL(url);},30000);
        toast('PDF salvo: '+fileName);
      });

      if(navigator.share){
        enableBtn('pdfBtnShare','&#8599; Compartilhar',function(){
          var pdfFile=new File([pdfBlob],fileName,{type:'application/pdf'});
          var sd={title:'Orcamento '+orcNum+' — '+q.cli,text:emp.nome+'\nR$ '+fm(q.vista)+' a vista'};
          if(navigator.canShare&&navigator.canShare({files:[pdfFile]}))sd.files=[pdfFile];
          navigator.share(sd).catch(function(){});
        });
      }

      toast('✓ PDF pronto — '+orcNum);
    }).catch(function(){
      if(document.body.contains(offscreen))document.body.removeChild(offscreen);
      preview.innerHTML='<div style="text-align:center;color:#c94444;padding:40px 20px;font-family:Outfit,sans-serif;font-size:.82rem;">Erro ao gerar. Use &#128424; Imprimir.</div>';
    });
  },200);
}
