import{j as t,h as c}from"./app-ZfayjrXk.js";import{c as s}from"./createLucideIcon-CctrZLMq.js";/**
 * @license lucide-react v0.508.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],b=s("chevron-left",d);/**
 * @license lucide-react v0.508.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],g=s("chevron-right",p);/**
 * @license lucide-react v0.508.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],x=s("ellipsis",h);function y({value:r,preserveStateBool:n,preserveScrollBool:l}){if(!r.links)return null;const a=e=>{c.visit(e,{preserveState:n,preserveScroll:l})};return t.jsxs("nav",{className:"mt-6 flex items-center justify-center space-x-1","aria-label":"Pagination",children:[t.jsx("button",{onClick:()=>a(r.prev_page_url),disabled:!r.prev_page_url,className:`px-2 py-1 rounded-md border transition disabled:opacity-50 disabled:cursor-not-allowed
          ${r.prev_page_url?"bg-white hover:bg-gray-100":"bg-gray-50"}`,"aria-label":"",children:t.jsx(b,{size:20})}),r.links.map((e,o)=>{if(e.label==="...")return t.jsx("span",{className:"px-3 py-1 rounded-md border bg-white text-gray-500",children:t.jsx(x,{size:16})},o);const i=e.active;return Number.isNaN(+e.label)?e.label:+e.label,t.jsx("button",{onClick:()=>e.url&&a(e.url),dangerouslySetInnerHTML:{__html:e.label},className:`px-3 py-1 rounded-md border transition
              ${i?"bg-blue-600 text-white border-transparent":"bg-white text-blue-600 hover:bg-blue-50"}
            `,"aria-current":i?"page":void 0},o)}),t.jsx("button",{onClick:()=>a(r.next_page_url),disabled:!r.next_page_url,className:`px-2 py-1 rounded-md border transition disabled:opacity-50 disabled:cursor-not-allowed
          ${r.next_page_url?"bg-white hover:bg-gray-100":"bg-gray-50"}`,"aria-label":"",children:t.jsx(g,{size:20})})]})}export{y as C};
