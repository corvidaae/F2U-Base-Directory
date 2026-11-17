(() => {
  const cfg = window.BASE_DIRECTORY_CONFIG || {};
  const $ = (s) => document.querySelector(s);
  let all = [], filtered = [], shown = 0;
  const pageSize = Number(cfg.pageSize) || 24;
  const els = {search:$("#search"),sort:$("#sort"),category:$("#category"),permission:$("#permission"),type:$("#type"),site:$("#site"),preview:$("#has-preview"),cards:$("#cards"),count:$("#result-count"),total:$("#total-count"),cats:$("#category-count"),empty:$("#empty"),more:$("#load-more"),filters:$("#filters"),active:$("#active-filters"),dialog:$("#detail-dialog")};

  const safe = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const uniq = (arr) => [...new Set(arr.flat().filter(Boolean).map(x=>String(x).trim()))].sort((a,b)=>a.localeCompare(b));
  const validUrl = (url) => { try { const u=new URL(url); return ["http:","https:"].includes(u.protocol) ? u.href : ""; } catch { return ""; } };
  const tagsOf = x => Array.isArray(x.tags) ? x.tags : String(x.tags||"").split(",");
  const catsOf = x => Array.isArray(x.categories) ? x.categories : String(x.categories||x.category||"").split(",");
  function normalize(x,i) {
    const baseName=String(x.baseName||x["BASE NAME"]||x.label||x.name||"").trim();
    return {id:String(x.id ?? i+1),baseName,label:baseName||"Untitled base",credit:x.credit||"",creator:x.creator||"",permission:x.permission||x.exclusivity||"",type:x.type||"",tags:tagsOf(x).map(t=>String(t).trim()).filter(Boolean),categories:catsOf(x).map(t=>String(t).trim()).filter(Boolean),preview:validUrl(x.preview||x.image||x.previewImage),site:x.site||x.platform||"",link:validUrl(x.link||x.url||""),creatorLink:validUrl(x.creatorLink||""),source:x.source||""};
  }
  function fillSelect(el, values, first) {
    const current=el.value; el.innerHTML=`<option value="">${first}</option>`+values.map(v=>`<option value="${safe(v)}">${safe(v)}</option>`).join("");
    if(values.includes(current)) el.value=current;
  }
  function setupFilters() {
    fillSelect(els.category,uniq(all.flatMap(catsOf)),"All categories");
    fillSelect(els.permission,uniq(all.map(x=>x.permission)),"Any permission");
    fillSelect(els.type,uniq(all.map(x=>x.type)),"Any type");
    fillSelect(els.site,uniq(all.map(x=>x.site)),"Any platform");
    els.total.textContent=all.length.toLocaleString();
    els.cats.textContent=uniq(all.flatMap(catsOf)).length.toLocaleString();
  }
  function matches(x,q) {
    const hay=[x.baseName,x.label,x.credit,x.creator,x.permission,x.type,x.site,...x.tags,...x.categories].join(" ").toLowerCase();
    return !q || hay.includes(q);
  }
  function apply() {
    const q=els.search.value.trim().toLowerCase(), c=els.category.value,p=els.permission.value,t=els.type.value,s=els.site.value;
    filtered=all.filter(x=>matches(x,q)&&(!c||catsOf(x).includes(c))&&(!p||x.permission===p)&&(!t||x.type===t)&&(!s||x.site===s)&&(!els.preview.checked||!!x.preview));
    const sort=els.sort.value;
    if(sort==="name-asc") filtered.sort((a,b)=>a.label.localeCompare(b.label));
    if(sort==="creator-asc") filtered.sort((a,b)=>(a.creator||a.credit).localeCompare(b.creator||b.credit));
    if(sort==="permission") filtered.sort((a,b)=>a.permission.localeCompare(b.permission)||a.label.localeCompare(b.label));
    shown=0; els.cards.innerHTML=""; renderMore();
    els.count.textContent=`${filtered.length.toLocaleString()} ${filtered.length===1?"entry":"entries"}`;
    els.empty.hidden=filtered.length!==0;
    renderChips();
  }
  function renderChips() {
    const filters=[["category",els.category],["permission",els.permission],["type",els.type],["site",els.site]];
    els.active.innerHTML=filters.filter(([k,e])=>e.value).map(([k,e])=>`<button data-clear="${k}">${safe(e.value)} ×</button>`).join("")+(els.preview.checked?'<button data-clear="preview">Has preview ×</button>':"");
  }
  function card(x) {
    const image=x.preview?`<img loading="lazy" src="${safe(x.preview)}" alt="" onerror="this.parentElement.innerHTML='<span class=&quot;no-image&quot;>PREVIEW UNAVAILABLE</span>'">`:'<span class="no-image">NO PREVIEW IMAGE</span>';
    const tags=x.tags.slice(0,4).map(t=>`<span class="tag">${safe(t)}</span>`).join("");
    return `<article class="base-card" tabindex="0" role="button" data-id="${safe(x.id)}" aria-label="View ${safe(x.label)}"><div class="card-image">${image}</div><div class="card-body"><div class="card-kicker"><span>${safe(x.categories[0]||"BASE")}</span><span>${safe(x.permission)}</span></div><h3 class="card-title">${safe(x.label)}</h3><div class="card-creator">Creator: ${safe(x.creator||x.credit||"Unknown creator")}</div><div class="tag-list">${tags}</div><div class="card-footer"><span>${safe(x.type||"Unspecified type")}</span><span>View details ↗</span></div></div></article>`;
  }
  function renderMore() {
    const next=filtered.slice(shown,shown+pageSize);
    els.cards.insertAdjacentHTML("beforeend",next.map(card).join(""));
    shown+=next.length; els.more.hidden=shown>=filtered.length;
  }
  function openDetail(id) {
    const x=all.find(v=>v.id===id); if(!x)return;
    const image=x.preview?`<img class="detail-image" src="${safe(x.preview)}" alt="Preview for ${safe(x.label)}">`:"";
    const tags=x.tags.map(t=>`<span class="tag">${safe(t)}</span>`).join("");
    const cats=x.categories.map(t=>safe(t)).join(", ");
    $("#detail-content").innerHTML=`<p class="eyebrow">${safe(cats||"BASE DIRECTORY")}</p><h2 class="detail-title">${safe(x.label)}</h2><p class="card-creator">Credit: ${safe(x.credit||"Not listed")}</p>${image}<div class="detail-meta"><div><small>Usage permission</small><strong>${safe(x.permission||"Not listed")}</strong></div><div><small>Base type</small><strong>${safe(x.type||"Not listed")}</strong></div><div><small>Platform</small><strong>${safe(x.site||"Not listed")}</strong></div><div><small>Creator</small><strong>${safe(x.creator||x.credit||"Not listed")}</strong></div></div><h3>Tags</h3><div class="detail-tags">${tags||'<span class="card-creator">No tags listed.</span>'}</div><p class="filter-note">Usage labels are generalized. Read the original creator's terms before using, editing, or redistributing this base.</p><div class="detail-actions">${x.link?`<a href="${safe(x.link)}" target="_blank" rel="noopener noreferrer">Visit original listing ↗</a>`:""}${x.creatorLink?`<a class="secondary" href="${safe(x.creatorLink)}" target="_blank" rel="noopener noreferrer">Creator profile ↗</a>`:""}</div>`;
    if(!els.dialog.open) els.dialog.showModal();
    const url=new URL(location.href); url.searchParams.set("base",x.id); history.replaceState({}, "",url);
  }
  async function loadData() {
    let rows;
    try {
      if(cfg.apiUrl) {
        const res=await fetch(cfg.apiUrl,{cache:"no-store"});
        if(!res.ok) throw new Error("API response "+res.status);
        const data=await res.json(); rows=Array.isArray(data)?data:(data.entries||[]);
      } else {
        const res=await fetch(cfg.dataUrl||"data.json");
        if(!res.ok) throw new Error("Could not load directory data");
        rows=await res.json();
      }
    } catch(err) {
      $("#result-count").textContent="Unable to load directory";
      $("#cards").innerHTML=`<div class="empty-state"><h3>Directory data could not be loaded</h3><p>${safe(err.message)}. Check the setup instructions and data source URL.</p></div>`;
      return;
    }
    all=rows.map(normalize).filter(x=>x.label);
    setupFilters(); apply();
    const id=new URLSearchParams(location.search).get("base"); if(id) openDetail(id);
  }
  [els.search,els.category,els.permission,els.type,els.site,els.preview,els.sort].forEach(el=>el.addEventListener(el===els.search?"input":"change",apply));
  $("#clear-filters").addEventListener("click",clearFilters); $("#empty-clear").addEventListener("click",clearFilters);
  function clearFilters(){els.search.value="";els.category.value="";els.permission.value="";els.type.value="";els.site.value="";els.preview.checked=false;apply();}
  els.more.addEventListener("click",renderMore);
  els.cards.addEventListener("click",e=>{const c=e.target.closest("[data-id]");if(c)openDetail(c.dataset.id);});
  els.cards.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-id]")){e.preventDefault();openDetail(e.target.dataset.id);}});
  els.active.addEventListener("click",e=>{const k=e.target.dataset.clear;if(!k)return;if(k==="preview")els.preview.checked=false;else els[k].value="";apply();});
  $("#filter-toggle").addEventListener("click",()=>{const open=els.filters.classList.toggle("open");$("#filter-toggle").setAttribute("aria-expanded",String(open));});
  $("#dialog-close").addEventListener("click",()=>els.dialog.close());
  els.dialog.addEventListener("click",e=>{if(e.target===els.dialog)els.dialog.close();});
  els.dialog.addEventListener("close",()=>{const url=new URL(location.href);url.searchParams.delete("base");history.replaceState({}, "",url);});
  document.addEventListener("keydown",e=>{if(e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();els.search.focus();}});
  $("#submission-form").addEventListener("submit",async e=>{
    e.preventDefault(); const form=e.currentTarget, status=$("#form-status"), data=Object.fromEntries(new FormData(form).entries());
    if(data.website){status.textContent="Thanks.";form.reset();return;}
    if(!cfg.apiUrl){status.textContent="Submission form is not connected yet. The administrator must deploy the Apps Script and add its URL in config.js.";return;}
    const btn=form.querySelector("button[type=submit]");btn.disabled=true;btn.textContent="Sending…";
    try {
      await fetch(cfg.apiUrl,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:new URLSearchParams(data)});
      status.textContent="Your submission was sent for review. Thank you!";
      form.reset();
    } catch(err){status.textContent="Could not send submission. Please try again later.";}
    finally{btn.disabled=false;btn.innerHTML='Send for review <span>↗</span>';}
  });
  loadData();
})();
