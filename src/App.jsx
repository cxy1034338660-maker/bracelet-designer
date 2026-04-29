import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ASSET_PENDANT = `${import.meta.env.BASE_URL}assets/hexagram-pendant.png`;

const BEADS = [
  { id:'rose_quartz', name:'粉晶', size:10, color:'#e67f96', shine:'#ffd6df', type:'水晶', colorType:'粉色', texture:'cloud' },
  { id:'strawberry', name:'草莓晶', size:10, color:'#d75d62', shine:'#ffc3c3', type:'水晶', colorType:'粉色', texture:'speckle' },
  { id:'cherry_agate', name:'樱花玛瑙', size:10, color:'#f2a0ad', shine:'#ffe0e6', type:'水晶', colorType:'粉色', texture:'cloud' },
  { id:'pink_tourmaline', name:'粉碧玺', size:10, color:'#ff6fa5', shine:'#ffd0e3', type:'水晶', colorType:'粉色', texture:'glass' },
  { id:'red_agate', name:'红玛瑙', size:10, color:'#b63836', shine:'#ffb4aa', type:'水晶', colorType:'红色', texture:'stripe' },
  { id:'garnet', name:'石榴石', size:10, color:'#6e1722', shine:'#d86a76', type:'水晶', colorType:'红色', texture:'glass' },
  { id:'amethyst', name:'紫水晶', size:10, color:'#7650c8', shine:'#d8caff', type:'水晶', colorType:'紫色', texture:'glass' },
  { id:'kunzite', name:'紫锂辉石', size:10, color:'#b38ad9', shine:'#eadbff', type:'水晶', colorType:'紫色', texture:'cloud' },
  { id:'green_phantom', name:'绿幽灵', size:10, color:'#7ea892', shine:'#d7fff0', type:'水晶', colorType:'绿色', texture:'moss' },
  { id:'aventurine', name:'东陵玉', size:10, color:'#6fbf8f', shine:'#c8ffd8', type:'水晶', colorType:'绿色', texture:'speckle' },
  { id:'aquamarine', name:'海蓝宝', size:10, color:'#93c4ca', shine:'#e8ffff', type:'水晶', colorType:'蓝色', texture:'glass' },
  { id:'lapis', name:'青金石', size:10, color:'#274b9f', shine:'#95b6ff', type:'水晶', colorType:'蓝色', texture:'speckle' },
  { id:'clear_quartz', name:'白水晶', size:10, color:'#d7dce1', shine:'#ffffff', type:'水晶', colorType:'白色', texture:'clear' },
  { id:'moonstone', name:'月光石', size:10, color:'#cbd7e7', shine:'#ffffff', type:'水晶', colorType:'白色', texture:'moon' },
  { id:'obsidian_c', name:'黑曜石', size:10, color:'#171717', shine:'#787878', type:'水晶', colorType:'黑色', texture:'clear' },
  { id:'smoky', name:'茶水晶', size:10, color:'#6a4c37', shine:'#d8b889', type:'水晶', colorType:'棕色', texture:'glass' },
  { id:'tiger_eye_c', name:'虎眼石', size:10, color:'#b0782b', shine:'#ffd787', type:'水晶', colorType:'棕色', texture:'stripe' },
  { id:'citrine', name:'黄水晶', size:10, color:'#d6a43c', shine:'#fff2bd', type:'水晶', colorType:'金色', texture:'glass' },
  { id:'rutilated_quartz', name:'金发晶', size:10, color:'#d7b35a', shine:'#fff2bd', type:'水晶', colorType:'金色', texture:'stripe' },

  { id:'stone_malachite', name:'孔雀石', size:10, color:'#1f8750', shine:'#85d8a5', type:'天然石', colorType:'绿色', texture:'malachite' },
  { id:'stone_turquoise', name:'绿松石', size:10, color:'#2fa7a0', shine:'#a8e7dd', type:'天然石', colorType:'蓝色', texture:'turquoise' },
  { id:'stone_lapis', name:'青金石', size:10, color:'#213f91', shine:'#8aa8ff', type:'天然石', colorType:'蓝色', texture:'lapis' },
  { id:'stone_tiger', name:'虎眼石', size:10, color:'#a86d27', shine:'#edc36a', type:'天然石', colorType:'棕色', texture:'tiger' },
  { id:'stone_snowflake_obsidian', name:'雪花黑曜石', size:10, color:'#1a1a1a', shine:'#8e8e8e', type:'天然石', colorType:'黑色', texture:'snowflake' },
  { id:'stone_labradorite', name:'拉长石', size:10, color:'#687777', shine:'#b7fff1', type:'天然石', colorType:'灰色', texture:'labradorite' },
  { id:'stone_gold_obsidian', name:'金曜石', size:10, color:'#2b2416', shine:'#d9ad58', type:'天然石', colorType:'金色', texture:'gold_obsidian' },
  { id:'stone_petrified_wood', name:'木化石', size:10, color:'#6b503c', shine:'#b99a78', type:'天然石', colorType:'棕色', texture:'petrified_wood' },

  { id:'acc_silver_spacer', name:'银隔珠', size:7, color:'#a9a9a9', shine:'#fff', type:'accessory', category:'功能件', texture:'metal', shape:'disc' },
  { id:'acc_gold_spacer', name:'金隔珠', size:7, color:'#b99955', shine:'#fff2bd', type:'accessory', category:'功能件', texture:'metal', shape:'disc' },
  { id:'acc_clasp', name:'磁吸扣件', size:11, color:'#9a9a92', shine:'#fff', type:'accessory', category:'功能件', texture:'metal', shape:'box' },
  { id:'acc_pendant_hex', name:'六芒星吊坠', size:12, color:'#d2a341', shine:'#fff2bd', type:'accessory', category:'装饰件', texture:'imagePendant', shape:'imagePendant' },
  { id:'acc_peace_buckle', name:'平安扣', size:13, color:'#b8a06c', shine:'#fff1c5', type:'accessory', category:'转运寓意', texture:'metal', shape:'ring' },
  { id:'acc_lucky_bead', name:'转运珠', size:11, color:'#c9a24d', shine:'#fff2bd', type:'accessory', category:'转运寓意', texture:'metal', shape:'sphere' },
  { id:'acc_diamond_bead', name:'镶钻珠', size:11, color:'#c7c7c7', shine:'#fff', type:'accessory', category:'金属件', texture:'metal', shape:'sphere' },
  { id:'acc_enamel', name:'珐琅件', size:11, color:'#284f8f', shine:'#cfe4ff', type:'accessory', category:'金属件', texture:'glass', shape:'box' },
  { id:'acc_ring', name:'小戒指', size:13, color:'#b99955', shine:'#fff2bd', type:'accessory', category:'戒指挂饰', texture:'metal', shape:'ring' },
  { id:'acc_chain', name:'链条连接', size:14, color:'#b99955', shine:'#fff2bd', type:'accessory', category:'特殊结构', texture:'metal', shape:'link' },
  { id:'wood', name:'沉香木', size:12, color:'#4a3327', shine:'#a37a57', type:'文玩', colorType:'棕色', texture:'wood' },
];

const typeTabs = ['水晶', '天然石', '配饰', '文玩'];
const colorTabs = ['全部', '粉色', '红色', '紫色', '绿色', '蓝色', '白色', '黑色', '棕色', '灰色', '金色'];
const accessoryTabs = ['全部', '功能件', '装饰件', '转运寓意', '金属件', '戒指挂饰', '特殊结构'];

const defaultInspirations = [
  { id:'default-pink', source:'default', title:'粉晶手串', tags:['粉晶','清新','女士'], style:'清新', color:'粉色', createdAt:'默认', image: makeDefaultImage('#e67f96', '粉晶清新手串') },
  { id:'default-black', source:'default', title:'黑曜石手串', tags:['黑曜石','男士','高级'], style:'男士', color:'黑色', createdAt:'默认', image: makeDefaultImage('#171717', '黑曜石高级感') },
  { id:'default-mix', source:'default', title:'混搭手串', tags:['混搭','多色','灵感'], style:'混搭', color:'多色', createdAt:'默认', image: makeDefaultImage('#7650c8', '混搭配色参考', ['#7650c8','#e67f96','#cbd7e7','#b0782b','#7ea892']) },
  { id:'default-luxury', source:'default', title:'高级感设计', tags:['高级','简约','金色'], style:'高级', color:'金色', createdAt:'默认', image: makeDefaultImage('#b99955', '黑金高级感', ['#b99955','#222224']) },
];

function makeBead(bead) { return { ...bead, uid: `${bead.id}-${Math.random().toString(36).slice(2)}` }; }
function saveLS(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
function loadLS(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } }

function makeDefaultImage(mainColor, title, palette = [mainColor]) {
  const cx = 260, cy = 330, r = 138;
  const circles = Array.from({ length: 14 }, (_, i) => {
    const a = i / 14 * Math.PI * 2 - Math.PI / 2;
    const color = palette[i % palette.length];
    return `<circle cx="${cx + Math.cos(a) * r}" cy="${cy + Math.sin(a) * r}" r="24" fill="${color}" stroke="rgba(255,255,255,.28)"/>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="680" viewBox="0 0 520 680"><defs><radialGradient id="bg" cx="50%" cy="30%" r="80%"><stop offset="0%" stop-color="#303a4f"/><stop offset="100%" stop-color="#080c14"/></radialGradient></defs><rect width="520" height="680" rx="34" fill="url(#bg)"/><circle cx="${cx}" cy="${cy}" r="168" fill="none" stroke="rgba(215,194,154,.16)"/>${circles}<text x="36" y="610" fill="#d7c29a" font-size="28" font-family="Arial">${title}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function beadBackground(bead, light = 'soft') {
  if (bead.texture === 'imagePendant') return 'transparent';
  const hi = light === 'cold' ? 'rgba(170,215,255,.8)' : light === 'warm' ? 'rgba(255,202,132,.8)' : 'rgba(255,255,255,.82)';
  if (bead.texture === 'metal') return `radial-gradient(circle at 22% 18%, ${hi} 0%, transparent 19%), linear-gradient(135deg, ${bead.shine}, ${bead.color} 30%, #fff 44%, #555 57%, ${bead.color} 78%, #151515)`;
  if (bead.type === '天然石') {
    const pattern = {
      malachite: 'repeating-linear-gradient(35deg, rgba(150,245,175,.24) 0 5px, rgba(9,78,43,.32) 6px 13px)',
      turquoise: 'linear-gradient(45deg, transparent 10%, rgba(0,0,0,.36) 14%, transparent 18%, transparent 48%, rgba(0,0,0,.28) 53%, transparent 59%)',
      lapis: 'radial-gradient(circle at 70% 40%, rgba(238,188,72,.72) 0%, transparent 6%), radial-gradient(circle at 42% 72%, rgba(220,170,48,.46) 0%, transparent 5%)',
      tiger: 'repeating-linear-gradient(105deg, rgba(255,205,82,.38) 0 5px, rgba(55,25,5,.45) 6px 14px)',
      snowflake: 'radial-gradient(circle at 34% 38%, rgba(230,230,230,.58) 0%, transparent 9%), radial-gradient(circle at 68% 66%, rgba(220,220,220,.48) 0%, transparent 10%)',
      labradorite: 'linear-gradient(135deg, rgba(115,255,230,.28), transparent 28%, rgba(40,95,145,.3) 64%, transparent 82%)',
      petrified_wood: 'repeating-linear-gradient(35deg, rgba(210,160,110,.20) 0 4px, rgba(40,22,12,.28) 5px 11px)',
      gold_obsidian: 'linear-gradient(115deg, transparent 18%, rgba(217,173,88,.36) 44%, transparent 72%)',
    }[bead.texture] || '';
    return `${pattern}, radial-gradient(circle at 25% 20%, rgba(255,255,255,.25), transparent 24%), radial-gradient(circle at 50% 50%, ${bead.color} 0%, ${bead.color} 46%, #151820 100%)`;
  }
  const crystalExtra = bead.texture === 'speckle' ? 'radial-gradient(circle at 38% 42%, rgba(168,22,42,.28) 0%, transparent 8%), radial-gradient(circle at 66% 64%, rgba(255,95,108,.25) 0%, transparent 10%),' : bead.texture === 'stripe' ? 'repeating-linear-gradient(70deg, rgba(255,255,255,.12) 0 2px, transparent 3px 12px),' : '';
  return `${crystalExtra} radial-gradient(circle at 24% 18%, ${hi} 0%, transparent 20%), radial-gradient(circle at 58% 48%, ${bead.shine}55, transparent 34%), radial-gradient(circle at 50% 50%, ${bead.shine} 0%, ${bead.color} 48%, #16101f 100%)`;
}

function accessoryGeometry(bead) {
  if (bead.type !== 'accessory') return 'sphere';
  if (bead.texture === 'imagePendant') return 'imagePendant';
  if (bead.shape) return bead.shape;
  return 'sphere';
}

function BeadCore({ bead, size = 44, selected = false, cleanEdge = false }) {
  const geometry = accessoryGeometry(bead);
  if (geometry === 'imagePendant') {
    return <img alt="六芒星吊坠" src={ASSET_PENDANT} draggable={false} className="pendant-img" style={{ width: size * 1.18, height: size * 1.42 }} />;
  }
  const shapeClass = `bead-core shape-${geometry}`;
  return <div className={`${shapeClass} ${selected ? 'selected' : ''} ${cleanEdge ? 'clean' : ''}`} style={{ width: size, height: geometry === 'disc' ? size * .42 : geometry === 'link' ? size * .58 : size, background: beadBackground(bead) }}>
    <span className="highlight h1" /><span className="highlight h2" />
    {geometry === 'ring' && <span className="hole" />}
    {geometry === 'link' && <span className="link-hole" />}
  </div>;
}

function PaletteBead({ bead, onClick, onDragStart, onDragEnd }) {
  return <motion.div draggable onDragStart={(e) => { e.dataTransfer.setData('application/bead-id', bead.id); onDragStart?.(bead); }} onDragEnd={onDragEnd} whileHover={{ y:-3, scale:1.035 }} whileTap={{ scale:.96 }} onClick={onClick} className="palette-bead">
    <BeadCore bead={bead} size={44} />
    <div className="palette-name">{bead.name}</div><div className="palette-size">{bead.size}mm</div>
  </motion.div>;
}

function BraceletCanvas({ layout, selected, onSelect, onDelete, dragIndex, setDragIndex, moveBead, draggingLibraryBead, addLibraryBeadAt, show3D, setShow3D, clear }) {
  const [isOver, setIsOver] = useState(false);
  const getIndex = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    let angle = Math.atan2(y - cy, x - cx) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    return Math.round(angle / (Math.PI * 2) * Math.max(layout.length, 1));
  };
  return <div className={`preview-card ${isOver ? 'drop-over' : ''}`}>
    <div className="star-bg" /><div className="magic-ring ring1" /><div className="magic-ring ring2" /><div className="magic-line" />
    <div className="bracelet-layer" onDragOver={(e) => { if (!draggingLibraryBead) return; e.preventDefault(); setIsOver(true); }} onDragLeave={() => setIsOver(false)} onDrop={(e) => { e.preventDefault(); addLibraryBeadAt(e.dataTransfer.getData('application/bead-id'), getIndex(e)); setIsOver(false); }}>
      {layout.map((b, i) => <motion.div key={b.uid} layout className="bracelet-item" draggable onDragStart={() => setDragIndex(i)} onDragEnter={() => moveBead(i)} onDragOver={(e)=>e.preventDefault()} onDragEnd={() => setDragIndex(null)} style={{ left:b.x, top:b.y }} whileHover={{ scale:1.08 }}>
        <button className="delete-bead" onClick={(e) => { e.stopPropagation(); onDelete(b.uid); }}>×</button>
        <div onClick={() => onSelect(b.uid)}><BeadCore bead={b} size={46} selected={selected === b.uid} cleanEdge /></div>
      </motion.div>)}
    </div>
    <div className="preview-controls"><button onClick={() => setShow3D(!show3D)}>{show3D ? '隐藏3D' : '预览'}</button><button onClick={clear}>清空</button></div>
  </div>;
}

function ProductPreview({ design }) {
  const [light, setLight] = useState('soft');
  const [stringMode, setStringMode] = useState('clear');
  const [offset, setOffset] = useState(0);
  const layout = useMemo(() => {
    const count = Math.max(design.length, 1);
    return design.map((b, i) => { const a = i / count * Math.PI * 2 + offset; return { ...b, x: 250 + Math.cos(a) * 145, y: 165 + Math.sin(a) * 76, depth: (Math.sin(a)+1)/2 }; });
  }, [design, offset]);
  return <div className={`product-preview light-${light}`} onPointerMove={(e) => { if (e.buttons === 1) setOffset(v => v - e.movementX * .018); }} onDoubleClick={() => setOffset(0)}>
    <div className="light-tabs">{['day','soft','warm','cold'].map(x => <button key={x} onClick={() => setLight(x)} className={light===x?'active':''}>{({day:'日光',soft:'柔光棚',warm:'暖光',cold:'冷光'})[x]}</button>)}</div>
    <div className="product-ring">
      {layout.map((b, i) => { const n = layout[(i+1)%layout.length]; return <div key={`${b.uid}-s`} className={`string string-${stringMode}`} style={{ left:b.x, top:b.y, width:Math.hypot(n.x-b.x,n.y-b.y), transform:`rotate(${Math.atan2(n.y-b.y,n.x-b.x)}rad)` }} />; })}
      {layout.sort((a,b)=>a.depth-b.depth).map(b => <div key={b.uid} className="product-bead" style={{ left:b.x, top:b.y, zIndex:Math.round(100+b.depth*100) }}><BeadCore bead={b} size={34+b.depth*8} /></div>)}
    </div>
    <div className="string-tabs"><span>串线材质</span>{['clear','white','black','gold','silver','red'].map(x => <button key={x} onClick={() => setStringMode(x)} className={stringMode===x?'active':''}>{({clear:'透明',white:'白线',black:'黑线',gold:'金线',silver:'银线',red:'红绳'})[x]}</button>)}</div>
  </div>;
}

export default function App() {
  const [page, setPage] = useState('设计');
  const [design, setDesign] = useState(() => Array.from({ length: 18 }, () => makeBead(BEADS[0])));
  const [selected, setSelected] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);
  const [draggingLibraryBead, setDraggingLibraryBead] = useState(null);
  const [typeTab, setTypeTab] = useState('水晶');
  const [colorTab, setColorTab] = useState('全部');
  const [accessoryCategory, setAccessoryCategory] = useState('全部');
  const [wrist, setWrist] = useState(15.5);
  const [show3D, setShow3D] = useState(false);
  const [savedWorks, setSavedWorks] = useState(() => loadLS('savedWorks', []));
  const [inspirations, setInspirations] = useState(() => loadLS('inspirationList', defaultInspirations));
  const [selectedInspiration, setSelectedInspiration] = useState(null);
  const [toast, setToast] = useState('');
  const [expandedWorkId, setExpandedWorkId] = useState(null);

  useEffect(() => saveLS('savedWorks', savedWorks), [savedWorks]);
  useEffect(() => { saveLS('inspirationList', inspirations); saveLS('bead-inspirations', inspirations); }, [inspirations]);

  const layout = useMemo(() => {
    const cx = 250, cy = 250, r = 180;
    return design.map((b, i) => { const a = i / Math.max(design.length, 1) * Math.PI * 2 - Math.PI / 2; return { ...b, x: cx + Math.cos(a)*r, y: cy + Math.sin(a)*r }; });
  }, [design]);
  const filtered = BEADS.filter(b => typeTab === '配饰' ? b.type === 'accessory' && (accessoryCategory === '全部' || b.category === accessoryCategory) : b.type === typeTab && (colorTab === '全部' || b.colorType === colorTab));
  const totalLength = design.reduce((s, b) => s + b.size, 0) / 10;
  const fitText = totalLength < wrist + .8 ? '偏紧' : totalLength > wrist + 2.4 ? '偏松' : '合适';

  function moveBead(to) { if (dragIndex == null || dragIndex === to) return; setDesign(items => { const copy=[...items]; const [m]=copy.splice(dragIndex,1); copy.splice(to,0,m); return copy; }); setDragIndex(to); }
  function addLibraryBeadAt(id, index) { const source = BEADS.find(b => b.id === id) || draggingLibraryBead; if (!source) return; setDesign(items => { const copy=[...items]; copy.splice(Math.max(0, Math.min(index ?? copy.length, copy.length)), 0, makeBead(source)); return copy; }); setDraggingLibraryBead(null); }
  function addOrReplace(bead) { if (!selected) return setDesign(d => [...d, makeBead(bead)]); setDesign(d => d.map(x => x.uid === selected ? makeBead(bead) : x)); setSelected(null); }
  function randomMix() { const pool = BEADS.filter(b => b.type !== '文玩'); setDesign(Array.from({length:18}, () => makeBead(pool[Math.floor(Math.random()*pool.length)]))); }
  function symmetric() { const half = design.slice(0, Math.ceil(design.length/2)); setDesign([...half, ...half.slice(0, design.length-half.length).reverse().map(makeBead)]); }
  function autoFitWrist() { const main = design[0] || BEADS[0]; const count = Math.max(12, Math.round((wrist+1.6)*10/main.size)); setDesign(Array.from({length:count}, () => makeBead(main))); }
  function previewImage() { const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="0 0 420 420"><rect width="420" height="420" rx="32" fill="#080c14"/><circle cx="210" cy="210" r="150" fill="none" stroke="rgba(215,194,154,.2)"/>${design.map((b,i)=>{const a=i/Math.max(design.length,1)*Math.PI*2-Math.PI/2;return `<circle cx="${210+Math.cos(a)*135}" cy="${210+Math.sin(a)*135}" r="17" fill="${b.color}"/>`;}).join('')}</svg>`; return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`; }
  function saveWork() { const map = {}; design.forEach(b => { const k = `${b.name}-${b.size}-${b.type}`; map[k] ||= { name:b.name, count:0, size:`${b.size}mm`, category:b.type === 'accessory' ? b.category : b.type, color:b.colorType || '' }; map[k].count++; }); setSavedWorks(w => [{ id:String(Date.now()), image:previewImage(), beadCount:design.length, length:totalLength.toFixed(1), createdAt:new Date().toLocaleString('zh-CN'), beads:Object.values(map).sort((a,b)=>b.count-a.count) }, ...w]); setToast('已保存到我的作品'); setTimeout(()=>setToast(''),1600); }
  function uploadInspiration(e) { const file = e.target.files?.[0]; if (!file || !file.type.startsWith('image/')) return; const reader = new FileReader(); reader.onload = () => setInspirations(list => [{ id:String(Date.now()), source:'upload', image:reader.result, title:file.name.replace(/\.[^/.]+$/, ''), tags:['上传','灵感'], style:'自定义', color:'多色', createdAt:new Date().toLocaleDateString('zh-CN') }, ...list]); reader.readAsDataURL(file); e.target.value=''; }
  function deleteInspiration(id) { setInspirations(prev => prev.filter(x => !(x.id === id && x.source !== 'default' && !x.id.startsWith('default-')))); }

  return <div className="app-shell">
    <aside className="sidebar"><h1>Bead Bracelet<br/>Designer</h1><nav>{['设计','我的作品','灵感'].map(item => <motion.button key={item} onClick={() => setPage(item)} whileHover={{scale:1.03}} whileTap={{scale:.97}} className={page===item?'active':''}>{page===item && <motion.span layoutId="nav-pill" className="nav-pill"/>}<span>{item}</span></motion.button>)}</nav></aside>
    <main className="main">{toast && <motion.div className="toast" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}>{toast}</motion.div>}
      {page === '灵感' ? <section className="page-card"><div className="page-head"><div><h2>灵感</h2><p>上传或收藏手串参考图，建立你的设计灵感墙。</p></div><label className="gold-btn">上传图片<input type="file" accept="image/png,image/jpeg" hidden onChange={uploadInspiration}/></label></div><div className="inspiration-grid">{inspirations.map(item => <motion.div key={item.id} className="inspiration-card" whileHover={{y:-4}} onClick={() => setSelectedInspiration(item)}>{item.source !== 'default' && <button className="delete-img" onClick={(e)=>{e.stopPropagation(); deleteInspiration(item.id);}}>×</button>}<img src={item.image} alt={item.title}/><h3>{item.title}</h3><div>{item.tags?.map(t=><span key={t}>{t}</span>)}</div></motion.div>)}</div><AnimatePresence>{selectedInspiration && <motion.div className="modal" onClick={()=>setSelectedInspiration(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><div className="modal-card" onClick={e=>e.stopPropagation()}><img src={selectedInspiration.image}/><button className="gold-btn" onClick={()=>setSelectedInspiration(null)}>关闭</button></div></motion.div>}</AnimatePresence></section>
      : page === '我的作品' ? <section className="page-card"><div className="page-head"><h2>我的作品</h2><button className="gold-btn" onClick={()=>setPage('设计')}>去设计</button></div>{savedWorks.length===0 ? <div className="empty">还没有保存作品，去设计一个手串吧</div> : <div className="works-grid">{savedWorks.map(w => { const exp = expandedWorkId === w.id; const visible = exp ? w.beads : w.beads.slice(0,3); return <button key={w.id} className="work-card" onClick={()=>setExpandedWorkId(exp?null:w.id)}><img src={w.image}/><p>保存时间：{w.createdAt}</p><p>珠子数量：{w.beadCount} 颗</p><p>预计长度：{w.length} cm</p><div className="chips">{visible.map(b=><span key={b.name}>{b.name} × {b.count}</span>)}{!exp && w.beads.length>3 && <span>+ 还有 {w.beads.length-3} 种</span>}</div></button>})}</div>}</section>
      : <><div className="top-actions"><button onClick={randomMix}>随机搭配</button><button onClick={symmetric}>自动对称</button><button className="gold-btn" onClick={saveWork}>保存</button></div><section className="design-grid"><BraceletCanvas layout={layout} selected={selected} onSelect={setSelected} onDelete={(uid)=>setDesign(d=>d.filter(b=>b.uid!==uid))} dragIndex={dragIndex} setDragIndex={setDragIndex} moveBead={moveBead} draggingLibraryBead={draggingLibraryBead} addLibraryBeadAt={addLibraryBeadAt} show3D={show3D} setShow3D={setShow3D} clear={()=>setDesign([])}/>{show3D && <ProductPreview design={design}/>}<aside className="info-panel"><div><h2>当前组合</h2><p>珠子数量 <b>{design.length} 颗</b></p><p>预计长度 <b>{totalLength.toFixed(1)} cm</b></p><p>佩戴松紧 <b>{fitText}</b></p><button onClick={()=>selected&&setDesign(d=>d.filter(b=>b.uid!==selected))}>删除选中</button></div><div><h2>手围计算</h2><div className="wrist"><button onClick={()=>setWrist(v=>Math.max(12,+(v-.1).toFixed(1)))}>−</button><b>{wrist.toFixed(1)} cm</b><button onClick={()=>setWrist(v=>Math.min(22,+(v+.1).toFixed(1)))}>+</button></div><button className="gold-btn" onClick={autoFitWrist}>按手围自动生成</button></div></aside></section><section className="library"><div className="tabs">{typeTabs.map(t=><button key={t} onClick={()=>{setTypeTab(t);setColorTab('全部');setAccessoryCategory('全部')}} className={typeTab===t?'active':''}>{t}</button>)}</div><div className="library-body"><div className="filters">{(typeTab==='配饰'?accessoryTabs:colorTabs).map(c=>{const active=typeTab==='配饰'?accessoryCategory===c:colorTab===c;return <motion.button key={c} onClick={()=>typeTab==='配饰'?setAccessoryCategory(c):setColorTab(c)} whileHover={{scale:1.03}} whileTap={{scale:.96}} className={active?'active':''}>{active&&<motion.span layoutId={typeTab==='配饰'?'acc-pill':'color-pill'} className="filter-pill"/>}<span>{c}</span></motion.button>})}</div><div className="palette-grid">{filtered.map(b=><PaletteBead key={b.id} bead={b} onClick={()=>addOrReplace(b)} onDragStart={setDraggingLibraryBead} onDragEnd={()=>setDraggingLibraryBead(null)}/>)}</div></div></section></>}
    </main>
  </div>;
}
