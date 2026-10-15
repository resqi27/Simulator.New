const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

function setView(name) {
  $$('.view').forEach(v => v.classList.toggle('active', v.id === `${name}-view`));
  $$('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  if (name === 'simulator') {
    const panel = $('#simulator-view');
    panel.scrollIntoView({behavior:'smooth', block:'start'});
  } else window.scrollTo({top:0, behavior:'smooth'});
}
$$('[data-view]').forEach(el => el.addEventListener('click', e => {
  e.preventDefault();
  const view = el.dataset.view;
  setView(view);
  if (el.dataset.tab) setSimTab(el.dataset.tab);
  if (el.dataset.scroll) setTimeout(() => {
    selectLesson(el.dataset.scroll);
    $('#lesson-content').scrollIntoView({behavior:'smooth',block:'start'});
  }, 180);
}));

function setSimTab(tab) {
  $$('.sim-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $$('.sim-panel').forEach(p => p.classList.toggle('active', p.id === `${tab}-panel`));
}
$$('.sim-tab').forEach(b => b.addEventListener('click', () => setSimTab(b.dataset.tab)));

const lessonData = {
  deadlock: `<div class="eyebrow">01 / FUNDAMENTALS</div><h2>Apa itu deadlock?</h2><p>Deadlock adalah kondisi ketika dua atau lebih proses saling menunggu resource yang sedang dipegang proses lain. Karena tidak ada yang bisa melanjutkan, semua proses yang terlibat dapat berhenti menunggu.</p><div class="concept-callout"><b>Analogi sederhana:</b> dua orang masing-masing memegang satu kunci, tetapi setiap orang membutuhkan kunci yang sedang dipegang orang lain. Tidak ada yang bisa menyelesaikan tugasnya tanpa kunci tambahan.</div><h3>Mengapa ini penting?</h3><p>Sistem operasi mengelola resource seperti CPU, memori, file, dan perangkat I/O. Jika resource tidak dikelola dengan baik, proses dapat saling menunggu tanpa akhir.</p><div class="mini-flow"><span>Proses P1 memegang R1</span><i>→</i><span>P1 meminta R2</span><i>↔</i><span>P2 memegang R2</span></div><p>Di simulator, pilih skenario RAG untuk melihat bagaimana pola saling menunggu dapat membentuk siklus.</p><button class="button primary" data-view="simulator" data-tab="rag">Coba Resource Graph →</button>`,
  rag: `<div class="eyebrow">02 / VISUAL MODEL</div><h2>Resource Allocation Graph</h2><p>RAG adalah diagram yang memperlihatkan hubungan antara proses dan resource.</p><ul><li><b>Lingkaran / node proses:</b> mewakili proses, seperti P1 atau P2.</li><li><b>Kotak / node resource:</b> mewakili resource, seperti CPU atau printer.</li><li><b>Resource → Process:</b> resource sedang dialokasikan kepada proses.</li><li><b>Process → Resource:</b> proses sedang meminta resource.</li></ul><div class="concept-callout">Jika setiap resource hanya memiliki satu instance, siklus dalam RAG berarti deadlock. Jika resource memiliki banyak instance, siklus saja belum cukup untuk memastikan deadlock.</div><p>Gunakan tombol analisis pada Simulator 01 untuk menyorot hubungan secara bertahap.</p><button class="button primary" data-view="simulator" data-tab="rag">Buka Simulator 01 →</button>`,
  banker: `<div class="eyebrow">03 / SAFETY ALGORITHM</div><h2>Banker’s Algorithm</h2><p>Banker’s Algorithm memeriksa apakah pemberian resource masih memungkinkan semua proses selesai dalam suatu urutan yang aman.</p><h3>Empat istilah utama</h3><ul><li><b>Allocation:</b> resource yang sedang dipegang proses.</li><li><b>Max:</b> kebutuhan maksimum proses.</li><li><b>Need:</b> sisa resource yang dibutuhkan, dihitung dengan Max − Allocation.</li><li><b>Available:</b> resource yang tersedia saat ini.</li></ul><div class="concept-callout"><b>SAFE</b> berarti ada urutan aman untuk menyelesaikan semua proses. <b>UNSAFE</b> berarti tidak ditemukan jaminan urutan aman; itu tidak otomatis berarti deadlock sudah terjadi.</div><p>Simulator menggunakan contoh angka kecil agar setiap perubahan mudah diikuti.</p><button class="button primary" data-view="simulator" data-tab="banker">Buka Simulator 02 →</button>`,
  conditions: `<div class="eyebrow">04 / THEORY CHECK</div><h2>Empat kondisi deadlock</h2><p>Deadlock dapat terjadi jika empat kondisi berikut muncul secara bersamaan:</p><h3>1. Mutual exclusion</h3><p>Resource hanya dapat digunakan satu proses pada satu waktu.</p><h3>2. Hold and wait</h3><p>Proses memegang satu resource sambil menunggu resource lain.</p><h3>3. No preemption</h3><p>Resource tidak bisa diambil paksa; proses harus melepasnya sendiri.</p><h3>4. Circular wait</h3><p>Ada rantai proses yang saling menunggu membentuk lingkaran.</p><div class="concept-callout">Jika salah satu kondisi dapat dicegah, kemungkinan deadlock dapat dikurangi atau dihindari.</div>`,
  quiz: `<div class="eyebrow">05 / CHECK YOUR UNDERSTANDING</div><h2>Mini quiz</h2><p>Pilih jawaban yang paling tepat. Tekan “Periksa jawaban” untuk melihat hasilnya.</p><form id="quiz-form"><div class="quiz-question"><b>1. Apa arti Need dalam Banker’s Algorithm?</b><label><input type="radio" name="q1" value="a"> Resource yang sudah dimiliki proses</label><label><input type="radio" name="q1" value="b"> Sisa resource yang dibutuhkan proses</label><label><input type="radio" name="q1" value="c"> Semua resource dalam sistem</label></div><div class="quiz-question"><b>2. Jika sistem UNSAFE, apa yang paling tepat disimpulkan?</b><label><input type="radio" name="q2" value="a"> Deadlock pasti sudah terjadi</label><label><input type="radio" name="q2" value="b"> Sistem tidak bisa menjamin adanya safe sequence</label><label><input type="radio" name="q2" value="c"> Semua proses sudah selesai</label></div><div class="quiz-question"><b>3. Panah dari proses menuju resource berarti...</b><label><input type="radio" name="q3" value="a"> Proses meminta resource</label><label><input type="radio" name="q3" value="b"> Resource telah dilepas</label><label><input type="radio" name="q3" value="c"> Proses sudah selesai</label></div><button class="button primary" type="submit">Periksa jawaban →</button><div id="quiz-feedback" class="quiz-feedback" aria-live="polite"></div></form>`
};
function selectLesson(name) {
  $$('.lesson-link').forEach(b => b.classList.toggle('active', b.dataset.lesson === name));
  $('#lesson-content').innerHTML = lessonData[name] || lessonData.deadlock;
  const content = $('#lesson-content');
  $$('[data-view]', content).forEach(el => el.addEventListener('click', e => {
    e.preventDefault(); setView(el.dataset.view); if (el.dataset.tab) setSimTab(el.dataset.tab);
  }));
  const form = $('#quiz-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const answers = {q1:'b',q2:'b',q3:'a'};
    const data = new FormData(form);
    let score = 0;
    Object.keys(answers).forEach(k => { if (data.get(k) === answers[k]) score++; });
    const feedback = $('#quiz-feedback');
    feedback.textContent = `Skor kamu: ${score}/3. ${score===3?'Hebat! Semua jawaban benar.':score===2?'Bagus! Coba tinjau lagi satu konsep.':'Tidak apa-apa—baca kembali materi lalu coba lagi.'}`;
    feedback.style.color = score===3 ? '#47764d' : '#92763d';
  });
}
$$('.lesson-link').forEach(b => b.addEventListener('click', () => selectLesson(b.dataset.lesson)));
selectLesson('deadlock');

const ragSvg = $('#rag-svg');
let ragTimer = [];
function clearRagTimers(){ ragTimer.forEach(clearTimeout); ragTimer=[]; }
function drawRag(scenario, step=0) {
  const dead = scenario === 'deadlock';
  const edges = dead ? [
    {d:'M160 88 L258 88',type:'allocation',step:0},
    {d:'M382 88 L480 88',type:'request',step:1},
    {d:'M480 258 L382 258',type:'allocation',step:2},
    {d:'M258 258 L160 258',type:'request',step:3}
  ] : [
    {d:'M160 88 L258 88',type:'allocation',step:0},
    {d:'M382 88 L480 88',type:'request',step:1},
    {d:'M480 258 L382 258',type:'allocation',step:2}
  ];
  let markup = `<defs><marker id="ragArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#879b89"/></marker><marker id="ragRequest" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#8b86b7"/></marker><marker id="ragDanger" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#bd5c53"/></marker></defs>`;
  edges.forEach(e => {
    const visible = step > e.step;
    if (!visible) return;
    const isHighlight = dead && step >= 4;
    markup += `<path class="edge ${e.type==='request'?'request':''} ${isHighlight?'highlight':''}" d="${e.d}" marker-end="url(#${isHighlight?'ragDanger':e.type==='request'?'ragRequest':'ragArrow'})"/>`;
  });
  const nodes = [
    {x:75,y:88,kind:'process',label:'P1',sub:'PROCESS'},
    {x:320,y:88,kind:'resource',label:'R1',sub:'CPU'},
    {x:520,y:88,kind:'process',label:'P2',sub:'PROCESS'},
    {x:320,y:258,kind:'resource',label:'R2',sub:'PRINTER'}
  ];
  nodes.forEach((n,i) => {
    const visible = step > 0 || step === 0;
    if (!visible) return;
    const x=n.x, y=n.y;
    const w=n.kind==='process'?76:66, h=n.kind==='process'?56:60;
    markup += `<g class="rag-node" style="animation:fadeUp .35s ease both;animation-delay:${i*.06}s"><rect class="${n.kind==='process'?'node-process':'node-resource'}" x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="${n.kind==='process'?15:10}"/>`;
    if (dead && step>=4 && (i===0||i===2)) markup += `<rect class="node-halo active" x="${x-w/2-5}" y="${y-h/2-5}" width="${w+10}" height="${h+10}" rx="18"/>`;
    markup += `<text class="node-label" x="${x}" y="${y+4}">${n.label}</text><text class="node-sub" x="${x}" y="${y+h/2+15}">${n.sub}</text></g>`;
  });
  if (step >= 4 && dead) markup += `<text x="320" y="177" text-anchor="middle" font-family="DM Mono,monospace" font-size="11" fill="#b85b55" letter-spacing="1">CYCLE DETECTED</text>`;
  ragSvg.innerHTML = markup;
}
function setRagState(text, kind='neutral') { const el=$('#rag-state');el.textContent=text;el.className=`state-pill ${kind}`; }
function runRag() {
  clearRagTimers();
  const scenario = $('input[name="rag-scenario"]:checked').value;
  const steps = scenario==='deadlock' ? [
    ['Langkah 1/4: R1 dialokasikan ke P1.',1],
    ['Langkah 2/4: P2 meminta R1 yang masih dipegang P1.',2],
    ['Langkah 3/4: R2 dialokasikan ke P2.',3],
    ['Langkah 4/4: P1 meminta R2. Terbentuk siklus P1 → R2 → P2 → R1 → P1.',4]
  ] : [
    ['Langkah 1/3: R1 dialokasikan ke P1.',1],
    ['Langkah 2/3: P2 meminta R1.',2],
    ['Langkah 3/3: Tidak ada panah permintaan balik ke P1, sehingga tidak terbentuk siklus.',3]
  ];
  $('#rag-result').className='result-box';$('#rag-result').innerHTML='<span class="result-symbol">◌</span><div><b>Analisis berjalan</b><p>Ikuti panah yang muncul pada diagram.</p></div>';
  setRagState('MENGANALISIS'); let i=0;
  function next(){
    if(i>=steps.length){
      if(scenario==='deadlock'){
        setRagState('SIKLUS / DEADLOCK','danger');
        $('#rag-result').className='result-box danger';
        $('#rag-result').innerHTML='<span class="result-symbol">×</span><div><b>Potensi deadlock terdeteksi</b><p>Siklus terbentuk. Dengan satu instance tiap resource, kondisi ini menunjukkan deadlock.</p></div>';
      } else {
        setRagState('TIDAK ADA SIKLUS','success');
        $('#rag-result').className='result-box success';
        $('#rag-result').innerHTML='<span class="result-symbol">✓</span><div><b>Siklus tidak terbentuk</b><p>Dalam skenario ini tidak ditemukan siklus RAG.</p></div>';
      }
      return;
    }
    const [message, step] = steps[i++];
    drawRag(scenario,step);
    $('#rag-step').textContent=message;
    ragTimer.push(setTimeout(next, scenario==='deadlock'?950:900));
  }
  drawRag(scenario,0);next();
}
$('#rag-run').addEventListener('click',runRag);
$('#rag-reset').addEventListener('click',()=>{
  clearRagTimers();drawRag($('input[name="rag-scenario"]:checked').value,0);
  $('#rag-step').textContent='Siap. Tekan tombol untuk mulai.';
  $('#rag-result').className='result-box';$('#rag-result').innerHTML='<span class="result-symbol">◎</span><div><b>Menunggu simulasi</b><p>Analisis akan muncul di sini.</p></div>';
  setRagState('SIAP DIJALANKAN');
});
$$('input[name="rag-scenario"]').forEach(input=>input.addEventListener('change',()=>{
  $$('.scenario-option').forEach(l=>l.classList.toggle('selected', $('input',l).checked));
  clearRagTimers();drawRag(input.value,0);$('#rag-step').textContent='Skenario berubah. Jalankan analisis untuk memulai.';
  $('#rag-result').className='result-box';$('#rag-result').innerHTML='<span class="result-symbol">◎</span><div><b>Menunggu simulasi</b><p>Analisis akan muncul di sini.</p></div>';setRagState('SIAP DIJALANKAN');
}));
drawRag('deadlock',0);

const defaultProcesses = [
  {name:'P1',allocation:[1,0],max:[3,2]},
  {name:'P2',allocation:[1,1],max:[1,2]},
  {name:'P3',allocation:[1,1],max:[2,2]}
];
let processes = defaultProcesses.map(p=>({name:p.name,allocation:[...p.allocation],max:[...p.max]}));
let initialAvailable=[3,2];
let bankerState={step:-1,sequence:[],work:[...initialAvailable],finished:[],safe:true,complete:false};
function need(p){return [p.max[0]-p.allocation[0],p.max[1]-p.allocation[1]];}
function renderBanker(){
  const tbody=$('#banker-table');
  tbody.innerHTML=processes.map((p,i)=>{
    const n=need(p), done=bankerState.finished.includes(i), current=bankerState.sequence.length && bankerState.sequence[bankerState.sequence.length-1]===i && bankerState.step>=0;
    let cls=done?'done':(current?'current':'');
    let tag=done?'<span class="status-tag ready">SELESAI</span>':(current?'<span class="status-tag current">DIPROSES</span>':'<span class="status-tag">MENUNGGU</span>');
    if(bankerState.complete && !bankerState.safe) {cls='blocked';tag='<span class="status-tag blocked">TIDAK AMAN</span>';}
    return `<tr class="${cls}"><td>${p.name}</td><td><input class="banker-cell-input" aria-label="${p.name} Allocation A" type="number" min="0" step="1" value="${p.allocation[0]}" data-process="${i}" data-field="allocation" data-resource="0"></td><td><input class="banker-cell-input" aria-label="${p.name} Allocation B" type="number" min="0" step="1" value="${p.allocation[1]}" data-process="${i}" data-field="allocation" data-resource="1"></td><td><input class="banker-cell-input" aria-label="${p.name} Max A" type="number" min="0" step="1" value="${p.max[0]}" data-process="${i}" data-field="max" data-resource="0"></td><td><input class="banker-cell-input" aria-label="${p.name} Max B" type="number" min="0" step="1" value="${p.max[1]}" data-process="${i}" data-field="max" data-resource="1"></td><td>${n[0]}</td><td>${n[1]}</td><td>${tag}</td></tr>`;
  }).join('');
  $('#available-display').innerHTML=`A = ${bankerState.work[0]} <i>/</i> B = ${bankerState.work[1]}`;
  $('#available-a').value=initialAvailable[0]; $('#available-b').value=initialAvailable[1];
  const seq=$('#sequence-display');
  seq.innerHTML=bankerState.sequence.length?bankerState.sequence.map((i,j)=>`${j?'<span class="sequence-arrow">→</span>':''}<span class="sequence-step">${processes[i].name}</span>`).join(''):'<span class="sequence-empty">Belum ada urutan yang dihitung</span>';
  $('#banker-prev').disabled=bankerState.step<=-1;
  $('#banker-next').disabled=bankerState.complete;
  $('#banker-next').textContent=bankerState.step===-1?'Mulai analisis →':bankerState.complete?'Analisis selesai':'Langkah berikutnya →';
}
function setBankerMessage(html){$('#banker-log-content').innerHTML=html;}
function resetBanker(){
  bankerState={step:-1,sequence:[],work:[...initialAvailable],finished:[],safe:true,complete:false};
  $('#banker-state').className='state-pill neutral';$('#banker-state').textContent='BELUM DIANALISIS';
  setBankerMessage('Tekan “Mulai analisis” untuk memeriksa proses satu per satu.');
  renderBanker();
}
function applyBankerInputs(){
  const nums=[...$$('.banker-cell-input'),$('#available-a'),$('#available-b')];
  for(const input of nums){
    const v=Number(input.value);
    if(input.value.trim()==='' || !Number.isInteger(v) || v<0){
      $('#banker-validation').textContent='Input harus berupa bilangan bulat 0 atau lebih. Periksa angka yang ditandai.';
      input.focus(); return false;
    }
  }
  const proposed=processes.map(p=>({name:p.name,allocation:[...p.allocation],max:[...p.max]}));
  $$('.banker-cell-input').forEach(input=>{proposed[Number(input.dataset.process)][input.dataset.field][Number(input.dataset.resource)]=Number(input.value);});
  const invalid=proposed.find(p=>p.max.some((v,i)=>v<p.allocation[i]));
  if(invalid){
    $('#banker-validation').textContent=`Data ${invalid.name} tidak valid: Max tidak boleh lebih kecil daripada Allocation.`;
    const first=$$('.banker-cell-input').find(input=>Number(input.dataset.process)===proposed.indexOf(invalid)&&input.dataset.field==='max');
    if(first) first.focus(); return false;
  }
  processes=proposed;
  initialAvailable=[Number($('#available-a').value),Number($('#available-b').value)];
  $('#banker-validation').textContent='Angka berhasil diterapkan. Tekan “Mulai analisis” untuk mengecek SAFE atau UNSAFE.';
  resetBanker();
  return true;
}
function showBankerDecision(isSafe){
  const overlay=$('#banker-decision-overlay');
  if(!overlay)return;
  overlay.classList.toggle('is-unsafe',!isSafe);
  $('#decision-kicker').textContent=isSafe?'SEMUA PROSES DAPAT SELESAI':'URUTAN AMAN TIDAK DITEMUKAN';
  $('#decision-title').textContent=isSafe?'SYSTEM SAFE':'SYSTEM UNSAFE';
  $('#decision-description').textContent=isSafe
    ?`Safe sequence ditemukan: ${bankerState.sequence.map(i=>processes[i].name).join(' → ')}. Sistem memiliki urutan agar semua proses dapat selesai.`
    :'Tidak ada proses tersisa yang kebutuhannya dapat dipenuhi dari Available saat ini. Sistem tidak dapat menjamin urutan aman.';
  overlay.classList.remove('is-visible');
  overlay.setAttribute('aria-hidden','false');
  // Force a fresh entrance animation each time a completed analysis is shown.
  void overlay.offsetWidth;
  overlay.classList.add('is-visible');
  $('#decision-dismiss').focus({preventScroll:true});
}
function hideBankerDecision(){
  const overlay=$('#banker-decision-overlay');
  if(!overlay)return;
  overlay.classList.remove('is-visible');
  overlay.setAttribute('aria-hidden','true');
}
$('#decision-dismiss').addEventListener('click',hideBankerDecision);
$('#decision-restore').addEventListener('click',()=>{
  // Restore the built-in example so the user can demonstrate SAFE again.
  processes=defaultProcesses.map(p=>({name:p.name,allocation:[...p.allocation],max:[...p.max]}));
  initialAvailable=[3,2];
  hideBankerDecision();
  $('#banker-validation').textContent='Contoh awal dipulihkan: Available A = 3 dan B = 2. Tekan “Mulai analisis” untuk melihat hasil SAFE.';
  resetBanker();
});
$('#banker-decision-overlay').addEventListener('click',e=>{if(e.target.classList.contains('decision-backdrop'))hideBankerDecision();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideBankerDecision();});

function nextBanker(){
  if(bankerState.complete)return;

  // Ambil input terbaru secara otomatis saat analisis pertama dimulai.
  // Pengguna tidak perlu menekan tombol "Terapkan angka" terlebih dahulu.
  if(bankerState.step === -1 && bankerState.sequence.length === 0){
    const applied = applyBankerInputs();
    if(!applied) return;
  }

  const candidates=processes.map((p,i)=>({p,i,n:need(p)})).filter(x=>!bankerState.finished.includes(x.i)&&x.n[0]<=bankerState.work[0]&&x.n[1]<=bankerState.work[1]);
  if(!candidates.length){
    bankerState.complete=true;bankerState.safe=false;
    $('#banker-state').className='state-pill warning';$('#banker-state').textContent='UNSAFE';
    const blocked=processes.filter((p,i)=>!bankerState.finished.includes(i)).map(p=>`${p.name} membutuhkan (${need(p).join(', ')})`).join('; ');
    setBankerMessage(`<strong>Tidak ditemukan safe sequence.</strong><br>Available saat ini (${bankerState.work.join(', ')}). Tidak ada proses tersisa yang Need-nya dapat dipenuhi. ${blocked}. Coba tambah Available atau ubah Allocation/Max, lalu tekan “Terapkan angka”.`);
    renderBanker();showBankerDecision(false);return;
  }
  const candidate=candidates[0], p=candidate.p, i=candidate.i;
  bankerState.step++;bankerState.sequence.push(i);bankerState.finished.push(i);
  const before=[...bankerState.work];
  bankerState.work=bankerState.work.map((v,j)=>v+p.allocation[j]);
  const n=need(p);
  setBankerMessage(`<strong>Langkah ${bankerState.sequence.length}: ${p.name} dapat selesai.</strong><br>Need (${n.join(', ')}) ≤ Available (${before.join(', ')}).<br>Setelah ${p.name} selesai, Allocation (${p.allocation.join(', ')}) dikembalikan.<br>Available menjadi <strong>(${bankerState.work.join(', ')})</strong>.`);
  if(bankerState.finished.length===processes.length){
    bankerState.complete=true;bankerState.safe=true;
    $('#banker-state').className='state-pill success';$('#banker-state').textContent='SAFE ✓';
    $('#banker-validation').textContent='SAFE: semua proses dapat selesai dengan urutan aman.';
    setBankerMessage($('#banker-log-content').innerHTML+`<br><br><strong>Semua proses selesai.</strong> Safe sequence: ${bankerState.sequence.map(i=>processes[i].name).join(' → ')}.`);
  } else {
    $('#banker-state').className='state-pill current';$('#banker-state').textContent='LANGKAH '+bankerState.sequence.length;
  }
  renderBanker();
  if(bankerState.complete && bankerState.safe) showBankerDecision(true);
}
function prevBanker(){
  if(bankerState.step<=-1)return;
  const target=bankerState.sequence.slice(0,-1);
  bankerState={step:target.length-1,sequence:target,work:[...initialAvailable],finished:[],safe:true,complete:false};
  target.forEach(i=>{bankerState.finished.push(i);bankerState.work=bankerState.work.map((v,j)=>v+processes[i].allocation[j]);});
  if(!target.length){$('#banker-state').className='state-pill neutral';$('#banker-state').textContent='BELUM DIANALISIS';setBankerMessage('Tekan “Mulai analisis” untuk memeriksa proses satu per satu.');}
  else {const i=target[target.length-1],p=processes[i],n=need(p);$('#banker-state').className='state-pill current';$('#banker-state').textContent='LANGKAH '+target.length;setBankerMessage(`Langkah ${target.length} telah dijalankan. ${p.name} dapat selesai karena Need (${n.join(', ')}) bisa dipenuhi.`);}
  renderBanker();
}
$('#banker-next').addEventListener('click',nextBanker);
$('#banker-prev').addEventListener('click',prevBanker);
$('#banker-reset').addEventListener('click',resetBanker);
$('#banker-apply').addEventListener('click',applyBankerInputs);
renderBanker();
