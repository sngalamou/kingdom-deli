import{g as l,s as c,a as d}from"./Header.astro_astro_type_script_index_0_lang.BZP7ruO8.js";const s=document.getElementById("cart-lines"),u=document.getElementById("cart-empty"),m=document.getElementById("sum-count"),a=document.getElementById("checkout"),i=document.getElementById("order-err"),r=()=>{const o=l();s.innerHTML="";for(const t of o){const e=document.createElement("li");e.className="cart-line",e.innerHTML=`
          <span class="line-tile" aria-hidden="true"></span>
          <div class="line-body">
            <span class="line-name"></span>
            <button type="button" class="line-remove">Remove</button>
          </div>
          <div class="add-control is-in-cart">
            <div class="ac-stepper">
              <button type="button" class="ac-btn ac-dec" aria-label="Remove one">‹</button>
              <span class="ac-count">${t.quantity}</span>
              <button type="button" class="ac-btn ac-inc" aria-label="Add one">›</button>
            </div>
          </div>`,e.querySelector(".line-tile").textContent=(t.label.trim()[0]||"•").toUpperCase(),e.querySelector(".line-name").textContent=t.label,e.querySelector(".ac-dec").addEventListener("click",()=>c(t.variationId,t.quantity-1)),e.querySelector(".ac-inc").addEventListener("click",()=>c(t.variationId,t.quantity+1)),e.querySelector(".line-remove").addEventListener("click",()=>c(t.variationId,0)),s.appendChild(e)}const n=o.length===0;u.hidden=!n,m.textContent=String(d()),a.disabled=n};a.addEventListener("click",async()=>{i.hidden=!0,a.disabled=!0,a.textContent="Starting…";const o=l().map(({variationId:n,quantity:t})=>({variationId:n,quantity:t}));try{const n=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lineItems:o})}),t=await n.json();if(n.ok&&t.url){window.location.href=t.url;return}throw console.error("checkout failed:",t),new Error}catch{i.hidden=!1,i.textContent="Could not start checkout. Please try again.",a.disabled=!1,a.textContent="Checkout"}});window.addEventListener("cart-updated",r);window.addEventListener("storage",r);r();
