"use strict";exports.id=67,exports.ids=[67],exports.modules={27989:(a,b,c)=>{c.d(b,{L:()=>k});var d=c(38301),e=c(64246);let f="undefined"!=typeof document?d.useLayoutEffect:d.useEffect,g=a=>a&&!Array.isArray(a)&&"object"==typeof a,h=[],i={},j=e.Ay,k=(a,b=h)=>{let c=i;g(a)?(c=a,a=null,b="dependencies"in c?c.dependencies:h):g(b)&&(b="dependencies"in(c=b)?c.dependencies:h),a&&"function"!=typeof a&&console.warn("First parameter must be a function or config object");let{scope:e,revertOnUpdate:k}=c,l=(0,d.useRef)(!1),m=(0,d.useRef)(j.context(()=>{},e)),n=(0,d.useRef)(a=>m.current.add(null,a)),o=b&&b.length&&!k;return o&&f(()=>(l.current=!0,()=>m.current.revert()),h),f(()=>{if(a&&m.current.add(a,e),!o||!l.current)return()=>m.current.revert()},b),{context:m.current,contextSafe:n.current}};k.register=a=>{j=a},k.headless=!0},47399:(a,b,c)=>{c.d(b,{default:()=>o});var d=c(21124),e=c(38301),f=c(64246),g=c(27989),h=c(42378);let i=["LEADERSHIP AND\nMANAGEMENT STRUCTURE","INFRASTRUCTURE AND\nOPERATIONAL EXCELLENCE","INSTITUTIONAL\nSYSTEMS & LEADERSHIP"],j=["Leadership","Infrastructure","Institutional"],k=[[{n:"01",t:"Strategic Leadership",img:"/images/card1.webp"},{n:"02",t:"Structured Academics",img:"/images/card2.webp"},{n:"03",t:"Operational Discipline",img:"/images/card3.webp"},{n:"04",t:"Community-Rooted Vision",img:"/images/card4.webp"},{n:"05",t:"Faculty-Centric Approach",img:"/images/card5.webp"},{n:"06",t:"Infrastructure Excellence",img:"/images/card6.webp"},{n:"07",t:"Sports & Exposure Integration",img:"/images/card7.webp"},{n:"08",t:"Value-Anchored Education",img:"/images/card8.webp"}],[{n:"01",t:"Academic Planning Support",img:"/images/cardinfra1.webp"},{n:"02",t:"Active involvement of Trust leadership",img:"/images/cardinfra2.webp"},{n:"03",t:"Direct relationship with Principals & HODs",img:"/images/cardinfra3.webp"},{n:"04",t:"Regular review meetings",img:"/images/cardinfra3.webp"}],[{n:"01",t:"Amphitheatre & cultural spaces",img:"/images/cardinstit1.webp"},{n:"02",t:"Modern classrooms & labs",img:"/images/institute.webp"},{n:"03",t:"Sports grounds & athletics facilities",img:"/images/cardinstit3.webp"},{n:"04",t:"Community-Rooted Vision",img:"/images/cardinstit4.webp"}]],l=[{showText:!1,fullWidth:!0,showArrows:!0},{showText:!1,fullWidth:!0,showArrows:!1},{showText:!0,fullWidth:!1,showArrows:!0}],m=({active:a})=>(0,d.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",style:{transform:a?"rotate(90deg)":"none",transition:"transform 0.3s cubic-bezier(.34,1.56,.64,1)"},children:(0,d.jsx)("path",{d:"M2 6h8M6 2l4 4-4 4",stroke:a?"white":"#888",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})}),n=({direction:a,onClick:b})=>(0,d.jsx)("button",{onClick:b,"aria-label":"left"===a?"Scroll left":"Scroll right",className:"   group flex-none flex items-center justify-center   w-[42px] h-[42px] rounded-full   border-[2px] border-[#cfcfcf] bg-transparent   transition-all duration-300 ease-out cursor-pointer   hover:bg-[#ae1431] hover:border-[#ae1431]   hover:scale-110 hover:shadow-lg   active:scale-95   ",children:(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",className:"transition-colors duration-300 stroke-white",children:"left"===a?(0,d.jsx)("path",{d:"M10 13L5 8L10 3",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"}):(0,d.jsx)("path",{d:"M6 3L11 8L6 13",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})});function o(){let a=(0,h.useRouter)(),[b,c]=(0,e.useState)(0),[o,p]=(0,e.useState)(0),q=(0,e.useRef)(!1),[r,s]=(0,e.useState)(!1),t=(0,e.useRef)(null),u=(0,e.useRef)(null),v=(0,e.useRef)(null),w=(0,e.useRef)([]),x=(0,e.useRef)([]),y=(0,e.useRef)([]),z=(0,e.useRef)([]),A=(0,e.useRef)(null),B=(0,e.useRef)(null),C=k[b],D=l[b];(0,e.useCallback)(a=>{let b=w.current[a],c=u.current;if(!b||!c||!v.current)return;let{left:d,width:e}=b.getBoundingClientRect();f.Ay.to(v.current,{left:d-c.getBoundingClientRect().left,width:e,duration:.3,ease:"power2.out",overwrite:!0})},[]);let E=(0,e.useCallback)(a=>{let b=A.current;b&&b.scrollBy({left:("right"===a?1:-1)*676,behavior:"smooth"})},[]);(0,e.useCallback)((a,b)=>{let c=a.current[b];c&&f.Ay.timeline().to(c,{scale:.94,duration:.1,ease:"power2.in"}).to(c,{scale:1,duration:.45,ease:"elastic.out(1,0.42)"})},[]);let F=(0,e.useCallback)(a=>{q.current||a===b||(q.current=!0,c(a),p(0))},[b]);return(0,e.useCallback)(a=>{let b=x.current[a];b&&f.Ay.fromTo(b,{scale:.9,opacity:.5},{scale:1,opacity:1,duration:.38,ease:"back.out(2)"})},[]),(0,g.L)(()=>{if(!r)return;let a=f.Ay.matchMedia();return a.add("(min-width: 900px)",()=>{let a={trigger:t.current,start:"top 78%"};f.Ay.fromTo(".desk-tabbar",{opacity:0,y:-20},{opacity:1,y:0,duration:.75,ease:"expo.out",scrollTrigger:a}),f.Ay.fromTo(".desk-content",{opacity:0,y:36},{opacity:1,y:0,duration:.85,ease:"expo.out",delay:.18,scrollTrigger:a}),f.Ay.fromTo(".desk-cta",{opacity:0,y:16},{opacity:1,y:0,duration:.6,ease:"power3.out",delay:.35,scrollTrigger:a})}),a.add("(max-width: 899px)",()=>{let a=(a,b="top 82%")=>({scrollTrigger:{trigger:a,start:b}});f.Ay.fromTo(".mob-heading",{opacity:0,y:28},{opacity:1,y:0,duration:.7,ease:"expo.out",...a(t.current)}),f.Ay.fromTo(".mob-para",{opacity:0,y:18},{opacity:1,y:0,duration:.6,ease:"power3.out",delay:.14,...a(t.current)}),f.Ay.fromTo(".mob-tabbar",{opacity:0,y:-14},{opacity:1,y:0,duration:.55,ease:"expo.out",...a(t.current,"top 76%")}),f.Ay.fromTo(".mob-card",{opacity:0,x:44,scale:.97},{opacity:1,x:0,scale:1,duration:.6,stagger:.07,ease:"expo.out",...a(".mob-cards","top 88%")})}),()=>a.revert()},{scope:t,dependencies:[r]}),(0,d.jsxs)("section",{ref:t,id:"facilities",className:"bg-[#ae1431] py-[90px] max-[899px]:pt-[24px] max-[899px]:pb-[48px] overflow-hidden",children:[(0,d.jsxs)("div",{className:"hidden min-[900px]:block",children:[(0,d.jsx)("div",{className:"desk-tabbar flex justify-center mb-[70px] px-[20px]",children:(0,d.jsxs)("div",{ref:u,className:"relative flex gap-[160px] border-b-[4px] border-[#d8a9b4]",children:[i.map((a,c)=>(0,d.jsx)("button",{ref:a=>{w.current[c]=a},onClick:()=>F(c),className:"relative pb-[18px] text-[18px] font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300 cursor-pointer",style:{color:b===c?"#ffffff":"rgba(255,255,255,0.65)"},children:a.split("\n").map((a,b)=>(0,d.jsx)("span",{className:"block",children:a},b))},c)),(0,d.jsx)("span",{ref:v,className:"absolute -bottom-[4px] h-[6px] rounded-t-full bg-white pointer-events-none",style:{left:0,width:0}})]})}),(0,d.jsxs)("div",{className:`desk-content mx-auto w-[min(1200px,calc(100vw-120px))] flex items-start gap-[80px] ${!D.showText?"justify-center":""}`,children:[D.showText&&(0,d.jsxs)("div",{ref:B,className:"max-w-[420px] ml-[40px] flex-shrink-0",children:[(0,d.jsxs)("h2",{className:"font-display mb-[32px] text-[42px] leading-[1.1] text-white",children:["Systems That",(0,d.jsx)("br",{}),"Sustain Excellence"]}),(0,d.jsx)("p",{className:"font-rethink text-[14.5px] leading-[1.8] text-white",children:"An integrated framework of management oversight, faculty excellence, and purpose-built infrastructure sustaining quality across every institution, ensuring continuous assessment, teacher development, institutional monitoring, and transparent processes."})]}),(0,d.jsxs)("div",{className:`flex items-center gap-[14px] min-w-0 ${D.showText?"flex-1":"w-full"}`,children:[D.showArrows&&(0,d.jsx)(n,{direction:"left",onClick:()=>E("left")}),(0,d.jsx)("div",{ref:A,className:"flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth pb-[20px] scrollbar-hide flex-1 min-w-0",children:C.map((a,c)=>(0,d.jsxs)("div",{ref:a=>{y.current[c]=a},className:"will-change-transform group relative cursor-pointer flex flex-shrink-0 snap-start overflow-hidden rounded-[22px] p-[34px] bg-black",style:{width:D.fullWidth?"calc(25% - 14px)":"320px",height:D.fullWidth?"320px":"220px"},children:[(0,d.jsx)("img",{src:a.img,alt:a.t,loading:"lazy",decoding:"async",className:"absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"}),(0,d.jsx)("div",{className:"absolute inset-0 bg-black/55 transition-all duration-500 group-hover:bg-black/35"}),(0,d.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"}),(0,d.jsxs)("div",{className:"relative z-10 flex h-full w-full flex-col justify-between",children:[(0,d.jsxs)("span",{style:{color:o===c?"#f1d7dd":"rgba(255,255,255,0.7)"},children:["/",a.n]}),(0,d.jsx)("span",{className:"font-rethink flex justify-end text-[26px] font-medium leading-[1.2] text-[#f8f8f8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]",children:a.t})]})]},`${b}-${c}`))}),D.showArrows&&(0,d.jsx)(n,{direction:"right",onClick:()=>E("right")})]})]}),(0,d.jsx)("div",{className:"desk-cta mt-[70px] flex justify-center px-[20px]",children:(0,d.jsx)("button",{onClick:()=>a.push("/about-us"),className:"font-rethink rounded-[8px] border border-white/70 px-[36px] py-[14px] text-[12px] font-[500] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#a80c2d] cursor-pointer",children:"EXPLORE OUR SYSTEMS & STANDARDS"})})]}),(0,d.jsxs)("div",{className:"min-[900px]:hidden px-[22px] pb-[10px]",children:[(0,d.jsxs)("div",{className:"relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111] px-[22px] pt-[26px] pb-[28px] mb-[18px]",children:[(0,d.jsx)("div",{className:"absolute top-[-120px] right-[-60px] w-[220px] h-[220px] rounded-full bg-[#ae1431]/20 blur-[90px]"}),(0,d.jsx)("div",{className:"absolute inset-0 opacity-[0.04]",style:{backgroundImage:"linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",backgroundSize:"22px 22px"}}),(0,d.jsxs)("div",{className:"relative z-[2]",children:[(0,d.jsxs)("div",{className:"flex items-center gap-[10px] mb-[18px]",children:[(0,d.jsx)("span",{className:"w-[32px] h-px bg-[#ae1431]"}),(0,d.jsx)("span",{className:"font-rethink text-[10px] tracking-[0.28em] uppercase text-white/45",children:"Institutional Framework"})]}),(0,d.jsxs)("h2",{className:"   mob-heading   font-display   text-[36px]   leading-[0.96]   tracking-[-0.05em]   text-white   ",children:["Systems That",(0,d.jsx)("br",{}),"Sustain Excellence"]}),(0,d.jsx)("p",{className:"   mob-para   mt-[18px]   font-rethink   text-[13.5px]   leading-[1.8]   text-white/70   max-w-[420px]   ",children:"An integrated framework of management oversight, faculty excellence, and purpose-built infrastructure sustaining quality across every institution, ensuring continuous assessment, teacher development, institutional monitoring, and transparent processes."})]})]}),(0,d.jsx)("div",{className:"mob-tabbar flex gap-[10px] mb-[18px] overflow-x-auto scrollbar-hide pb-[2px]",children:j.map((a,c)=>{let e=b===c;return(0,d.jsxs)("button",{ref:a=>{x.current[c]=a},onClick:()=>{b!==c&&requestAnimationFrame(()=>{p(0),F(c)})},className:`
            relative
            overflow-hidden
            min-w-[108px]
            flex
            flex-col
            items-start
            gap-[8px]
            rounded-[18px]
            px-[16px]
            py-[14px]
            border
            flex-shrink-0

            transform-gpu
            will-change-transform

            transition-[background-color,border-color,transform]
            duration-300
            ease-out

            active:scale-[0.98]

            ${e?"scale-[1]":"scale-[0.985]"}
          `,style:{backgroundColor:e?"#ae1431":"#111",borderColor:e?"#ae1431":"#262626"},children:[(0,d.jsx)("div",{className:"   absolute   inset-0   opacity-[0.04]   pointer-events-none   ",style:{backgroundImage:"linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",backgroundSize:"18px 18px"}}),(0,d.jsx)("div",{className:`
              absolute
              inset-0
              bg-[#ae1431]
              transition-opacity
              duration-300
              pointer-events-none
              ${e?"opacity-100":"opacity-0"}
            `}),(0,d.jsxs)("span",{className:`
              relative
              z-[2]
              text-[10px]
              font-rethink
              tracking-[0.2em]
              transition-colors
              duration-300
              ${e?"text-white/55":"text-[#777]"}
            `,children:["0",c+1]}),(0,d.jsx)("span",{className:`
              relative
              z-[2]
              text-[11px]
              font-rethink
              leading-[1.35]
              tracking-[0.04em]
              text-left
              transition-colors
              duration-300
              ${e?"text-white":"text-[#d1d1d1]"}
            `,children:a}),(0,d.jsx)("span",{className:`
              absolute
              left-[16px]
              bottom-0
              h-[2px]
              rounded-full
              bg-white

              transition-all
              duration-300
              ease-out

              ${e?"w-[38px] opacity-100":"w-0 opacity-0"}
            `})]},c)})}),(0,d.jsx)("div",{className:"mob-cards flex flex-col gap-[12px] mb-[24px]",children:C.map((a,c)=>{let e=o===c;return(0,d.jsxs)("div",{ref:a=>{z.current[c]=a},onClick:()=>{o!==c&&requestAnimationFrame(()=>{p(c)})},className:`
            will-change-transform
            transform-gpu

            mob-card
            relative
            overflow-hidden
            rounded-[22px]
            border
            px-[22px]
            py-[22px]
            cursor-pointer

            transition-[background-color,border-color,transform]
            duration-300
            ease-out

            active:scale-[0.985]

            ${e?"scale-[1]":"scale-[0.992]"}
          `,style:{backgroundColor:e?"#ae1431":"#111",borderColor:e?"#ae1431":"#202020"},children:[(0,d.jsx)("div",{className:"absolute inset-0 opacity-[0.04]",style:{backgroundImage:"linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",backgroundSize:"22px 22px"}}),(0,d.jsx)("div",{className:`
              absolute
              top-[-40px]
              right-[-20px]
              w-[120px]
              h-[120px]
              rounded-full
              bg-white/10
              blur-[50px]

              transition-opacity
              duration-300

              ${e?"opacity-100":"opacity-0"}
            `}),(0,d.jsxs)("div",{className:"relative z-[2] flex items-center justify-between",children:[(0,d.jsxs)("div",{className:"flex items-center gap-[18px]",children:[(0,d.jsxs)("span",{className:`
                  text-[11px]
                  font-rethink
                  tracking-[0.16em]
                  tabular-nums
                  w-[26px]

                  transition-colors
                  duration-300

                  ${e?"text-white/45":"text-[#8e8e8e]"}
                `,children:["/",a.n]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("span",{className:`
                    block
                    text-[17px]
                    font-rethink
                    leading-[1.3]
                    tracking-[-0.02em]

                    transition-colors
                    duration-300

                    ${e?"text-white":"text-[#f5f5f5]"}
                  `,children:a.t}),(0,d.jsx)("span",{className:`
                    block
                    mt-[4px]
                    text-[10px]
                    uppercase
                    tracking-[0.18em]

                    transition-colors
                    duration-300

                    ${e?"text-white/50":"text-[#666]"}
                  `,children:"Institutional Standard"})]})]}),(0,d.jsx)("div",{className:`
                flex-shrink-0
                w-[38px]
                h-[38px]
                rounded-full
                flex
                items-center
                justify-center

                transition-[background-color,border-color,transform]
                duration-300
                ease-out

                ${e?"bg-white/15 border border-white/10":"bg-[#1b1b1b] border border-[#2a2a2a]"}
              `,children:(0,d.jsx)(m,{active:e})})]})]},`${b}-${c}`)})}),(0,d.jsxs)("button",{onClick:()=>a.push("/about-us"),className:"   group   relative   overflow-hidden   isolate      w-full      rounded-[24px]   border   border-white/[0.08]      bg-[#0d0d0d]      px-[20px]   py-[20px]      transform-gpu   will-change-transform      transition-all   duration-500   ease-out      active:scale-[0.985]   ",children:[(0,d.jsxs)("div",{className:"   absolute   inset-0   opacity-100   transition-opacity   duration-500   ",children:[(0,d.jsx)("div",{className:"absolute inset-0 bg-[linear-gradient(135deg,#ae1431_0%,#8f0f29_45%,#5a0818_100%)]"}),(0,d.jsx)("div",{className:"absolute top-[-120px] right-[-80px] w-[240px] h-[240px] rounded-full bg-white/10 blur-[80px]"}),(0,d.jsx)("div",{className:"absolute bottom-[-100px] left-[-80px] w-[180px] h-[180px] rounded-full bg-[#ff6a85]/10 blur-[70px]"})]}),(0,d.jsx)("div",{className:"   absolute   inset-0   opacity-[0.045]   pointer-events-none   ",style:{backgroundImage:"linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",backgroundSize:"22px 22px"}}),(0,d.jsx)("div",{className:"absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"}),(0,d.jsx)("div",{className:"   absolute   inset-0   opacity-0   group-hover:opacity-100   transition-opacity   duration-700   ",children:(0,d.jsx)("div",{className:"   absolute   top-0   left-[-120%]   h-full   w-[60%]   rotate-[18deg]   bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.16),transparent)]      group-hover:left-[140%]   transition-all   duration-[1200ms]   ease-out   "})}),(0,d.jsxs)("div",{className:"relative z-[2] flex items-center justify-between",children:[(0,d.jsxs)("div",{className:"text-left",children:[(0,d.jsxs)("div",{className:"flex items-center gap-[8px] mb-[10px]",children:[(0,d.jsx)("span",{className:"w-[24px] h-px bg-white/40"}),(0,d.jsx)("span",{className:"   text-[10px]   tracking-[0.26em]   uppercase   text-white/50   font-rethink   ",children:"Learn More"})]}),(0,d.jsxs)("span",{className:"   block   text-[12px]   font-[600]   uppercase   tracking-[0.18em]   leading-[1.5]   text-white   font-rethink   max-w-[220px]   ",children:["Explore Our",(0,d.jsx)("br",{}),"Systems & Standards"]})]}),(0,d.jsxs)("div",{className:"   relative   w-[48px]   h-[48px]   rounded-full      flex   items-center   justify-center      border   border-white/10      bg-white/[0.08]   backdrop-blur-[8px]      transition-all   duration-500      group-hover:scale-[1.08]   group-hover:bg-white/[0.14]   ",children:[(0,d.jsx)("div",{className:"absolute inset-0 rounded-full bg-white/10 blur-[16px]"}),(0,d.jsx)("div",{className:"   absolute   inset-[-2px]   rounded-full   border   border-white/10      group-hover:rotate-180   transition-transform   duration-[1200ms]   ease-out   "}),(0,d.jsx)("div",{className:"relative z-[2]",children:(0,d.jsx)(m,{active:!0})})]})]}),(0,d.jsx)("div",{className:"   absolute   left-0   bottom-0   h-[2px]   w-0      bg-white/70      group-hover:w-full      transition-all   duration-700   ease-out   "})]})]})]})}},85401:(a,b,c)=>{c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"D:\\\\eram - next.js\\\\Eram\\\\src\\\\components\\\\sections\\\\home\\\\SystemsSection.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\eram - next.js\\Eram\\src\\components\\sections\\home\\SystemsSection.tsx","default")}};