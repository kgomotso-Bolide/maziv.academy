  /* ---- AI in Action: typewriter demo ---- */
  (function(){
    const chat=document.getElementById('aiChat'),tabs=document.getElementById('aiTabs');if(!chat||!tabs)return;
    const SCENES=[
      {u:"Draft a reply to a customer asking why their fibre link still isn't live — the cable is in the street but the install is waiting on a wayleave.",
       b:"<b>Subject: Order FB-40221 — waiting on the wayleave</b><br><br>Hi Nomsa,<br><br>The fibre serving your building is <b>already in the street</b> — the trench and blow were finished on Tuesday.<br><br>What's outstanding is the <b>wayleave for the final drop</b> across the pavement, which the municipality has to approve before we may dig. It was lodged on the 6th and the usual turnaround is ten working days.<br><br>The moment it comes back we'll book the install, and we'll hold the first available slot for you.<br><br>Kind regards,<br>Maziv Customer Support"},
      {u:"Summarise this month's network performance report into 3 points for the ops meeting.",
       b:"Three things worth raising:<br><br>• <b>Availability up to 99.94%</b> from 99.89% — both of last month's worst routes improved after the ring was closed in the north.<br>• <b>Fibre breaks down to 11 from 19</b>, but <b>seven were third-party digs in one corridor</b> — that's a conversation with the contractor, not with the field team.<br>• <b>Mean time to repair up to 6.4 hours</b> from 5.1, and all of the increase is after-hours calls. The standby roster is the thing to look at."},
      {u:"Here's a month of link data for 5,000 connections. Which ones look wrong?",
       b:"Three patterns stand out:<br><br>• <b>140 links running under half their provisioned speed</b> for 20+ days — nearly all on one ONT model, so this looks like firmware rather than the network.<br>• <b>One route drops for four minutes nightly at 02:00</b> — too regular to be a fault. Check what's scheduled on that ring.<br>• <b>Optical power drifting on 18 links in the same area</b>, all the same direction, which usually means one joint rather than eighteen problems."},
      {u:"Plan a 6-week fibre build for 480 homes in a new suburb.",
       b:"Here's a phased plan:<br><br>• <b>Wk 1:</b> Route survey and wayleave applications; confirm pole and trench routes and where we join the existing network.<br>• <b>Wk 2–4:</b> Two teams trenching and blowing, about 40 homes passed a day, each recorded as it's completed.<br>• <b>Wk 5:</b> Splicing, testing and labelling; first installs booked for the homes that pre-ordered.<br>• <b>Wk 6:</b> Commission the ring, reconcile the as-built against the plan, hand over to network operations."}
    ];
    let active=-1,timer=null;
    const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    function clearTimers(){if(timer){clearTimeout(timer);timer=null;}}
    function typeHTML(el,html,done){
      // tokens are either HTML tags (injected whole) or text runs (typed char-by-char)
      const tokens=html.match(/<[^>]+>|[^<]+/g)||[];
      const caret='<span class="ai-caret"></span>';
      let ti=0,ci=0,built='';
      (function step(){
        if(ti>=tokens.length){el.innerHTML=html;done&&done();return;}
        const tk=tokens[ti];
        if(tk[0]==='<'){built+=tk;ti++;ci=0;el.innerHTML=built+caret;timer=setTimeout(step,12);return;}
        ci++;
        el.innerHTML=built+tk.slice(0,ci)+caret;
        if(ci>=tk.length){built+=tk;ti++;ci=0;}
        timer=setTimeout(step,tk.length>40?7:16);
      })();
    }
    function run(i){
      if(i===active)return;active=i;clearTimers();chat.innerHTML='';
      [...tabs.children].forEach((b,bi)=>b.classList.toggle('active',bi===i));
      const sc=SCENES[i];
      const u=document.createElement('div');u.className='ai-msg user';
      u.innerHTML='<div class="av">You</div><div class="bubble">'+sc.u+'</div>';
      chat.appendChild(u);
      timer=setTimeout(()=>{
        const b=document.createElement('div');b.className='ai-msg bot';
        b.innerHTML='<div class="av">AI</div><div class="bubble"></div>';
        chat.appendChild(b);
        typeHTML(b.querySelector('.bubble'),sc.b);
      },450);
    }
    tabs.addEventListener('click',e=>{const t=e.target.closest('.ai-tab');if(t)run(+t.dataset.i);});
    // start when section scrolls into view
    new IntersectionObserver((es,ob)=>es.forEach(e=>{if(e.isIntersecting){run(0);ob.disconnect();}}),{threshold:.35}).observe(chat);
  })();

  /* ---- Animated stat counters ---- */
  (function(){
    const nums=[...document.querySelectorAll('.ai-stats .num')];if(!nums.length)return;
    const obs=new IntersectionObserver((es,ob)=>es.forEach(e=>{
      if(!e.isIntersecting)return;ob.unobserve(e.target);
      const el=e.target,txt=el.dataset.txt;
      if(txt){el.textContent=txt;return;}
      const to=+el.dataset.to,suf=el.dataset.suf||'';let s=null;
      (function tick(t){if(!s)s=t;const p=Math.min((t-s)/1100,1);el.textContent=Math.round(p*to)+suf;if(p<1)requestAnimationFrame(tick);})(performance.now());
    }),{threshold:.6});
    nums.forEach(n=>obs.observe(n));
  })();

