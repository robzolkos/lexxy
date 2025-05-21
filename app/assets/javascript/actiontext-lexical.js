import { DirectUpload } from '@rails/activestorage';

class LexicalToolbarElement extends HTMLElement {
  setEditor(editor) {
    this.#bindButtons(editor);
  }

  #bindButtons(editor) {
    const buttons = this.querySelectorAll("[data-command]");
    for (const button of buttons) {
      const command = button.getAttribute("data-command");
      const payload = button.getAttribute("data-payload") || undefined;

      button.addEventListener("click", () => {
        editor.dispatchCommand(command, payload);
      });
    }
  }
}

customElements.define("lexical-toolbar", LexicalToolbarElement);

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function t(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const t of e)r.append("v",t);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const e="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement,n=e&&"documentMode"in document?document.documentMode:null,r=e&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),i=e&&/^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent),s=!(!e||!("InputEvent"in window)||n)&&"getTargetRanges"in new window.InputEvent("input"),o=e&&/Version\/[\d.]+.*Safari/.test(navigator.userAgent),l=e&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,c=e&&/Android/.test(navigator.userAgent),a=e&&/^(?=.*Chrome).*/i.test(navigator.userAgent),u=e&&c&&a,f$1=e&&/AppleWebKit\/[\d.]+/.test(navigator.userAgent)&&!a;function d$1(...t){const e=[];for(const n of t)if(n&&"string"==typeof n)for(const[t]of n.matchAll(/\S+/g))e.push(t);return e}const h$2=1,g$2=3,_$1=9,p$1=11,y$2=0,m$1=1,x$1=2,C$1=0,S$1=1,v$1=2,b$1=4,N$1=8,A$2=128,O$2=1792|(112|(3|b$1|N$1)|A$2),D$3=1,P$2=2,F$1=3,L$2=4,I$4=5,z$3=6,K$2=o||l||f$1?" ":"​",B$4="\n\n",R$4=i?" ":K$2,W$2="֑-߿יִ-﷽ﹰ-ﻼ",J$4="A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿",U$2=new RegExp("^[^"+J$4+"]*["+W$2+"]"),$$1=new RegExp("^[^"+W$2+"]*["+J$4+"]"),j$3={bold:1,capitalize:1024,code:16,highlight:A$2,italic:2,lowercase:256,strikethrough:b$1,subscript:32,superscript:64,underline:N$1,uppercase:512},V$2={directionless:1,unmergeable:2},Y$3={center:P$2,end:z$3,justify:L$2,left:D$3,right:F$1,start:I$4},H$2={[P$2]:"center",[z$3]:"end",[L$2]:"justify",[D$3]:"left",[F$1]:"right",[I$4]:"start"},q$3={normal:0,segmented:2,token:1},G$2={[C$1]:"normal",[v$1]:"segmented",[S$1]:"token"},X$2="$";function Q$1(t,e,n,r,i,s){let o=t.getFirstChild();for(;null!==o;){const t=o.__key;o.__parent===e&&(di(o)&&Q$1(o,t,n,r,i,s),n.has(t)||s.delete(t),i.push(t)),o=o.getNextSibling();}}const Z$3=100;let tt$3=false,et$3=0;function nt$3(t){et$3=t.timeStamp;}function rt$3(t,e,n){const r="BR"===t.nodeName,i=e.__lexicalLineBreak;return i&&(t===i||r&&t.previousSibling===i)||r&&void 0!==fs(t,n)}function it$4(t,e,n){const r=oo(Gs(n));let i=null,s=null;null!==r&&r.anchorNode===t&&(i=r.anchorOffset,s=r.focusOffset);const o=t.nodeValue;null!==o&&bs(e,o,i,s,false);}function st$3(t,e,n){if(cr(t)){const e=t.anchor.getNode();if(e.is(n)&&t.format!==e.getFormat())return  false}return Zi(e)&&n.isAttached()}function ot$3(t,e,n,r){for(let i=t;i&&!bo(i);i=Us(i)){const t=fs(i,e);if(void 0!==t){const e=as(t,n);if(e)return _i(e)||!uo(i)?void 0:[i,e]}else if(i===r)return [r,ps(n)]}}function lt$3(t,e,n){tt$3=true;const r=performance.now()-et$3>Z$3;try{ci(t,(()=>{const s=Nr()||function(t){return t.getEditorState().read((()=>{const t=Nr();return null!==t?t.clone():null}))}(t),o=new Map,l=t.getRootElement(),c=t._editorState,a=t._blockCursorElement;let u=!1,f="";for(let n=0;n<e.length;n++){const d=e[n],h=d.type,g=d.target,_=ot$3(g,t,c,l);if(!_)continue;const[p,y]=_;if("characterData"===h)r&&Qn(y)&&Zi(g)&&st$3(s,g,y)&&it$4(g,y,t);else if("childList"===h){u=!0;const e=d.addedNodes;for(let n=0;n<e.length;n++){const r=e[n],s=us(r),o=r.parentNode;if(null!=o&&r!==a&&null===s&&!rt$3(r,o,t)){if(i){const t=(uo(r)?r.innerText:null)||r.nodeValue;t&&(f+=t);}o.removeChild(r);}}const n=d.removedNodes,r=n.length;if(r>0){let e=0;for(let i=0;i<r;i++){const r=n[i];(rt$3(r,g,t)||a===r)&&(g.appendChild(r),e++);}r!==e&&o.set(p,y);}}}if(o.size>0)for(const[e,n]of o)n.reconcileObservedMutation(e,t);const d=n.takeRecords();if(d.length>0){for(let e=0;e<d.length;e++){const n=d[e],r=n.addedNodes,i=n.target;for(let e=0;e<r.length;e++){const n=r[e],s=n.parentNode;null==s||"BR"!==n.nodeName||rt$3(n,i,t)||s.removeChild(n);}}n.takeRecords();}null!==s&&(u&&ys(s),i&&Bs(t)&&s.insertRawText(f));}));}finally{tt$3=false;}}function ct$4(t){const e=t._observer;if(null!==e){lt$3(t,e.takeRecords(),e);}}function at$2(t){!function(t){0===et$3&&Gs(t).addEventListener("textInput",nt$3,true);}(t),t._observer=new MutationObserver(((e,n)=>{lt$3(t,e,n);}));}let pt$3 = class pt{constructor(t,e=new Map,n=void 0,r=new Map,i=void 0){this.node=t,this.sharedConfigMap=e,this.unknownState=n,this.knownState=r;const s=void 0!==i?i:function(t,e,n){let r=n.size;if(e)for(const i in e){const e=t.get(i);e&&n.has(e)||r++;}return r}(e,n,r);this.size=s;}getValue(t){const e=this.knownState.get(t);if(void 0!==e)return e;this.sharedConfigMap.set(t.key,t);let n=t.defaultValue;if(this.unknownState&&t.key in this.unknownState){const e=this.unknownState[t.key];void 0!==e&&(n=t.parse(e)),this.updateFromKnown(t,n);}return n}getInternalState(){return [this.unknownState,this.knownState]}toJSON(){const t={...this.unknownState};for(const[e,n]of this.knownState)e.isEqual(n,e.defaultValue)?delete t[e.key]:t[e.key]=e.unparse(n);return yt$5(t)?{[X$2]:t}:{}}getWritable(t){if(this.node===t)return this;const e=new Map(this.knownState),n=yt$5(r=this.unknownState)&&{...r};var r;if(n)for(const t of e.keys())delete n[t.key];return new pt(t,this.sharedConfigMap,yt$5(n),e,this.size)}updateFromKnown(t,e){const n=t.key;this.sharedConfigMap.set(n,t);const{knownState:r,unknownState:i}=this;r.has(t)||i&&n in i||this.size++,r.set(t,e);}updateFromUnknown(t,e){const n=this.sharedConfigMap.get(t);n?this.updateFromKnown(n,n.parse(e)):(this.unknownState=this.unknownState||{},t in this.unknownState||this.size++,this.unknownState[t]=e);}updateFromJSON(t){const{knownState:e}=this;for(const t of e.keys())e.set(t,t.defaultValue);if(this.size=e.size,this.unknownState={},t)for(const[e,n]of Object.entries(t))this.updateFromUnknown(e,n);this.unknownState=yt$5(this.unknownState);}};function yt$5(t){if(t)for(const e in t)return t}function mt$3(t){const e=t.getWritable(),n=e.__state?e.__state.getWritable(e):new pt$3(e);return e.__state=n,n}function xt$4(t,e){const n=t.__mode,r=t.__format,i=t.__style,s=e.__mode,o=e.__format,l=e.__style,c=t.__state,a=e.__state;return (null===n||n===s)&&(null===r||r===o)&&(null===i||i===l)&&(null===t.__state||c===a||function(t,e){if(t===e)return  true;if(t&&e&&t.size!==e.size)return  false;const n=new Set,r=(t,e)=>{for(const[r,i]of t.knownState){if(n.has(r.key))continue;n.add(r.key);const t=e?e.getValue(r):r.defaultValue;if(t!==i&&!r.isEqual(t,i))return  true}return  false},i=(t,e)=>{const{unknownState:r}=t,i=e?e.unknownState:void 0;if(r)for(const[t,e]of Object.entries(r))if(!n.has(t)&&(n.add(t),e!==(i?i[t]:void 0)))return  true;return  false};return !(t&&r(t,e)||e&&r(e,t)||t&&i(t,e)||e&&i(e,t))}(c,a))}function Ct$2(t,e){const n=t.mergeWithSibling(e),r=qr()._normalizedNodes;return r.add(t.__key),r.add(e.__key),n}function St$2(t){let e,n,r=t;if(""!==r.__text||!r.isSimpleText()||r.isUnmergeable()){for(;null!==(e=r.getPreviousSibling())&&Qn(e)&&e.isSimpleText()&&!e.isUnmergeable();){if(""!==e.__text){if(xt$4(e,r)){r=Ct$2(e,r);break}break}e.remove();}for(;null!==(n=r.getNextSibling())&&Qn(n)&&n.isSimpleText()&&!n.isUnmergeable();){if(""!==n.__text){if(xt$4(r,n)){r=Ct$2(r,n);break}break}n.remove();}}else r.remove();}function vt$3(t){return kt$1(t.anchor),kt$1(t.focus),t}function kt$1(t){for(;"element"===t.type;){const e=t.getNode(),n=t.offset;let r,i;if(n===e.getChildrenSize()?(r=e.getChildAtIndex(n-1),i=true):(r=e.getChildAtIndex(n),i=false),Qn(r)){t.set(r.__key,i?r.getTextContentSize():0,"text",true);break}if(!di(r))break;t.set(r.__key,i?r.getChildrenSize():0,"element",true);}}let Tt$3,bt$1,Nt$2,wt$3,Et$2,Mt$1,At$1,Ot$1,Dt$1,Pt$2,Ft$3="",Lt$2="",It$2=null,zt="",Kt$1="",Bt$1=false,Rt$1=false,Wt=null;function Jt(t,e){const n=At$1.get(t);if(null!==e){const n=se(t);n.parentNode===e&&e.removeChild(n);}if(Ot$1.has(t)||bt$1._keyToDOMMap.delete(t),di(n)){const t=te(n,At$1);Ut(t,0,t.length-1,null);} void 0!==n&&Ls(Pt$2,Nt$2,wt$3,n,"destroyed");}function Ut(t,e,n,r){let i=e;for(;i<=n;++i){const e=t[i];void 0!==e&&Jt(e,r);}}function $t$1(t,e){t.setProperty("text-align",e);}const jt="40px";function Vt(t,e){const n=Tt$3.theme.indent;if("string"==typeof n){const r=t.classList.contains(n);e>0&&!r?t.classList.add(n):e<1&&r&&t.classList.remove(n);}const r=getComputedStyle(t).getPropertyValue("--lexical-indent-base-value")||jt;t.style.setProperty("padding-inline-start",0===e?"":`calc(${e} * ${r})`);}function Yt(t,e){const n=t.style;0===e?$t$1(n,""):e===D$3?$t$1(n,"left"):e===P$2?$t$1(n,"center"):e===F$1?$t$1(n,"right"):e===L$2?$t$1(n,"justify"):e===I$4?$t$1(n,"start"):e===z$3&&$t$1(n,"end");}function Ht$1(e,n){const r=Ot$1.get(e);void 0===r&&t(60);const i=r.createDOM(Tt$3,bt$1);if(function(t,e,n){const r=n._keyToDOMMap;((function(t,e,n){const r=`__lexicalKey_${e._key}`;t[r]=n;}))(e,n,t),r.set(t,e);}(e,i,bt$1),Qn(r)?i.setAttribute("data-lexical-text","true"):_i(r)&&i.setAttribute("data-lexical-decorator","true"),di(r)){const t=r.__indent,e=r.__size;if(0!==t&&Vt(i,t),0!==e){const t=e-1;!function(t,e,n,r){const i=Lt$2;Lt$2="",qt(t,n,0,e,n.getDOMSlot(r)),Qt(n,r),Lt$2=i;}(te(r,Ot$1),t,r,i);}const n=r.__format;0!==n&&Yt(i,n),r.isInline()||Xt(null,r,i),Ws(r)&&(Ft$3+=B$4,Kt$1+=B$4);}else {const t=r.getTextContent();if(_i(r)){const t=r.decorate(bt$1,Tt$3);null!==t&&ne(e,t),i.contentEditable="false";}else Qn(r)&&(r.isDirectionless()||(Lt$2+=t));Ft$3+=t,Kt$1+=t;}return null!==n&&n.insertChild(i),Ls(Pt$2,Nt$2,wt$3,r,"created"),i}function qt(t,e,n,r,i){const s=Ft$3;Ft$3="";let o=n;for(;o<=r;++o){Ht$1(t[o],i);const e=Ot$1.get(t[o]);null!==e&&Qn(e)&&(null===It$2&&(It$2=e.getFormat()),""===zt&&(zt=e.getStyle()));}Ws(e)&&(Ft$3+=B$4);i.element.__lexicalTextContent=Ft$3,Ft$3=s+Ft$3;}function Gt(t,e){if(t){const n=t.__last;if(n){const t=e.get(n);if(t)return Fn(t)?"line-break":_i(t)&&t.isInline()?"decorator":null}return "empty"}return null}function Xt(t,e,n){const r=Gt(t,At$1),i=Gt(e,Ot$1);r!==i&&e.getDOMSlot(n).setManagedLineBreak(i);}function Qt(t,e){const n=e.__lexicalDirTextContent||"",r=e.__lexicalDir||"";if(n!==Lt$2||r!==Wt){const n=""===Lt$2,i=n?Wt:function(t){if(U$2.test(t))return "rtl";if($$1.test(t))return "ltr";return null}(Lt$2);if(i!==r){const s=e.classList,o=Tt$3.theme;let l=null!==r?o[r]:void 0,c=null!==i?o[i]:void 0;if(void 0!==l){if("string"==typeof l){const t=d$1(l);l=o[r]=t;}s.remove(...l);}if(null===i||n&&"ltr"===i)e.removeAttribute("dir");else {if(void 0!==c){if("string"==typeof c){const t=d$1(c);c=o[i]=t;} void 0!==c&&s.add(...c);}e.dir=i;}if(!Rt$1){t.getWritable().__dir=i;}}Wt=i,e.__lexicalDirTextContent=Lt$2,e.__lexicalDir=i;}}function Zt(e,n,r){const i=Lt$2;var s;Lt$2="",It$2=null,zt="",function(e,n,r){const i=Ft$3,s=e.__size,o=n.__size;Ft$3="";const l=r.element;if(1===s&&1===o){const t=e.__first,r=n.__first;if(t===r)ee(t,l);else {const e=se(t),n=Ht$1(r,null);try{l.replaceChild(n,e);}catch(i){if("object"==typeof i&&null!=i){const s=`${i.toString()} Parent: ${l.tagName}, new child: {tag: ${n.tagName} key: ${r}}, old child: {tag: ${e.tagName}, key: ${t}}.`;throw new Error(s)}throw i}Jt(t,null);}const i=Ot$1.get(r);Qn(i)&&(null===It$2&&(It$2=i.getFormat()),""===zt&&(zt=i.getStyle()));}else {const i=te(e,At$1),c=te(n,Ot$1);if(i.length!==s&&t(227),c.length!==o&&t(228),0===s)0!==o&&qt(c,n,0,o-1,r);else if(0===o){if(0!==s){const t=null==r.after&&null==r.before&&null==r.element.__lexicalLineBreak;Ut(i,0,s-1,t?null:l),t&&(l.textContent="");}}else !function(t,e,n,r,i,s){const o=r-1,l=i-1;let c,a,u=s.getFirstChild(),f=0,d=0;for(;f<=o&&d<=l;){const t=e[f],r=n[d];if(t===r)u=re(ee(r,s.element)),f++,d++;else { void 0===c&&(c=new Set(e)),void 0===a&&(a=new Set(n));const i=a.has(t),o=c.has(r);if(i)if(o){const t=Js(bt$1,r);t===u?u=re(ee(r,s.element)):(s.withBefore(u).insertChild(t),ee(r,s.element)),f++,d++;}else Ht$1(r,s.withBefore(u)),d++;else u=re(se(t)),Jt(t,s.element),f++;}const i=Ot$1.get(r);null!==i&&Qn(i)&&(null===It$2&&(It$2=i.getFormat()),""===zt&&(zt=i.getStyle()));}const h=f>o,g=d>l;if(h&&!g){const e=n[l+1],r=void 0===e?null:bt$1.getElementByKey(e);qt(n,t,d,l,s.withBefore(r));}else g&&!h&&Ut(e,f,o,s.element);}(n,i,c,s,o,r);}Ws(n)&&(Ft$3+=B$4);l.__lexicalTextContent=Ft$3,Ft$3=i+Ft$3;}(e,n,n.getDOMSlot(r)),Qt(n,r),s=n,null==It$2||It$2===s.__textFormat||Rt$1||s.setTextFormat(It$2),function(t){""===zt||zt===t.__textStyle||Rt$1||t.setTextStyle(zt);}(n),Lt$2=i;}function te(e,n){const r=[];let i=e.__first;for(;null!==i;){const e=n.get(i);void 0===e&&t(101),r.push(i),i=e.__next;}return r}function ee(e,n){const r=At$1.get(e);let i=Ot$1.get(e);void 0!==r&&void 0!==i||t(61);const s=Bt$1||Mt$1.has(e)||Et$2.has(e),o=Js(bt$1,e);if(r===i&&!s){if(di(r)){const t=o.__lexicalTextContent;void 0!==t&&(Ft$3+=t,Kt$1+=t);const e=o.__lexicalDirTextContent;void 0!==e&&(Lt$2+=e);}else {const t=r.getTextContent();Qn(r)&&!r.isDirectionless()&&(Lt$2+=t),Kt$1+=t,Ft$3+=t;}return o}if(r!==i&&s&&Ls(Pt$2,Nt$2,wt$3,i,"updated"),i.updateDOM(r,o,Tt$3)){const r=Ht$1(e,null);return null===n&&t(62),n.replaceChild(r,o),Jt(e,null),r}if(di(r)&&di(i)){const t=i.__indent;t!==r.__indent&&Vt(o,t);const e=i.__format;e!==r.__format&&Yt(o,e),s&&(Zt(r,i,o),yi(i)||i.isInline()||Xt(r,i,o)),Ws(i)&&(Ft$3+=B$4,Kt$1+=B$4);}else {const t=i.getTextContent();if(_i(i)){const t=i.decorate(bt$1,Tt$3);null!==t&&ne(e,t);}else Qn(i)&&!i.isDirectionless()&&(Lt$2+=t);Ft$3+=t,Kt$1+=t;}if(!Rt$1&&yi(i)&&i.__cachedText!==Kt$1){const t=i.getWritable();t.__cachedText=Kt$1,i=t;}return o}function ne(t,e){let n=bt$1._pendingDecorators;const r=bt$1._decorators;if(null===n){if(r[t]===e)return;n=hs(bt$1);}n[t]=e;}function re(t){let e=t.nextSibling;return null!==e&&e===bt$1._blockCursorElement&&(e=e.nextSibling),e}function ie(t,e,n,r,i,s){Ft$3="",Kt$1="",Lt$2="",Bt$1=r===x$1,Wt=null,bt$1=n,Tt$3=n._config,Nt$2=n._nodes,wt$3=bt$1._listeners.mutation,Et$2=i,Mt$1=s,At$1=t._nodeMap,Ot$1=e._nodeMap,Rt$1=e._readOnly,Dt$1=new Map(n._keyToDOMMap);const o=new Map;return Pt$2=o,ee("root",null),bt$1=void 0,Nt$2=void 0,Et$2=void 0,Mt$1=void 0,At$1=void 0,Ot$1=void 0,Tt$3=void 0,Dt$1=void 0,Pt$2=void 0,o}function se(e){const n=Dt$1.get(e);return void 0===n&&t(75,e),n}function oe(t){return {type:t}}const le=oe("SELECTION_CHANGE_COMMAND"),ce=oe("SELECTION_INSERT_CLIPBOARD_NODES_COMMAND"),ae=oe("CLICK_COMMAND"),ue=oe("DELETE_CHARACTER_COMMAND"),fe=oe("INSERT_LINE_BREAK_COMMAND"),de=oe("INSERT_PARAGRAPH_COMMAND"),he=oe("CONTROLLED_TEXT_INSERTION_COMMAND"),ge=oe("PASTE_COMMAND"),_e=oe("REMOVE_TEXT_COMMAND"),pe=oe("DELETE_WORD_COMMAND"),ye$1=oe("DELETE_LINE_COMMAND"),me=oe("FORMAT_TEXT_COMMAND"),xe$1=oe("UNDO_COMMAND"),Ce=oe("REDO_COMMAND"),Se=oe("KEYDOWN_COMMAND"),ve$1=oe("KEY_ARROW_RIGHT_COMMAND"),ke$1=oe("MOVE_TO_END"),Te=oe("KEY_ARROW_LEFT_COMMAND"),be$1=oe("MOVE_TO_START"),Ne$1=oe("KEY_ARROW_UP_COMMAND"),we$1=oe("KEY_ARROW_DOWN_COMMAND"),Ee$1=oe("KEY_ENTER_COMMAND"),Me$1=oe("KEY_SPACE_COMMAND"),Ae$1=oe("KEY_BACKSPACE_COMMAND"),Oe$1=oe("KEY_ESCAPE_COMMAND"),De=oe("KEY_DELETE_COMMAND"),Pe=oe("KEY_TAB_COMMAND"),Fe$1=oe("INSERT_TAB_COMMAND"),Le$1=oe("INDENT_CONTENT_COMMAND"),Ie=oe("OUTDENT_CONTENT_COMMAND"),ze=oe("DROP_COMMAND"),Ke$1=oe("FORMAT_ELEMENT_COMMAND"),Be=oe("DRAGSTART_COMMAND"),Re$1=oe("DRAGOVER_COMMAND"),We=oe("DRAGEND_COMMAND"),Je=oe("COPY_COMMAND"),Ue=oe("CUT_COMMAND"),$e=oe("SELECT_ALL_COMMAND"),qe=oe("FOCUS_COMMAND"),Ge=oe("BLUR_COMMAND"),Xe=oe("KEY_MODIFIER_COMMAND"),Qe=Object.freeze({}),Ze=30,tn=[["keydown",function(t,e){if(en=t.timeStamp,nn=t.key,e.isComposing())return;if(Rs(e,Se,t))return;if(null==t.key)return;if(fn&&Os(t))return ci(e,(()=>{Sn(e,dn$1);})),fn=false,void(dn$1="");if(function(t){return Es(t,"ArrowRight",{shiftKey:"any"})}(t))Rs(e,ve$1,t);else if(function(t){return Es(t,"ArrowRight",Ms)}(t))Rs(e,ke$1,t);else if(function(t){return Es(t,"ArrowLeft",{shiftKey:"any"})}(t))Rs(e,Te,t);else if(function(t){return Es(t,"ArrowLeft",Ms)}(t))Rs(e,be$1,t);else if(function(t){return Es(t,"ArrowUp",{altKey:"any",shiftKey:"any"})}(t))Rs(e,Ne$1,t);else if(function(t){return Es(t,"ArrowDown",{altKey:"any",shiftKey:"any"})}(t))Rs(e,we$1,t);else if(function(t){return Es(t,"Enter",{altKey:"any",ctrlKey:"any",metaKey:"any",shiftKey:true})}(t))an$1=true,Rs(e,Ee$1,t);else if(function(t){return " "===t.key}(t))Rs(e,Me$1,t);else if(function(t){return r&&Es(t,"o",{ctrlKey:true})}(t))t.preventDefault(),an$1=true,Rs(e,fe,true);else if(function(t){return Es(t,"Enter",{altKey:"any",ctrlKey:"any",metaKey:"any"})}(t))an$1=false,Rs(e,Ee$1,t);else if(function(t){return Es(t,"Backspace",{shiftKey:"any"})||r&&Es(t,"h",{ctrlKey:true})}(t))Os(t)?Rs(e,Ae$1,t):(t.preventDefault(),Rs(e,ue,true));else if(function(t){return "Escape"===t.key}(t))Rs(e,Oe$1,t);else if(function(t){return Es(t,"Delete",{})||r&&Es(t,"d",{ctrlKey:true})}(t))!function(t){return "Delete"===t.key}(t)?(t.preventDefault(),Rs(e,ue,false)):Rs(e,De,t);else if(function(t){return Es(t,"Backspace",As)}(t))t.preventDefault(),Rs(e,pe,true);else if(function(t){return Es(t,"Delete",As)}(t))t.preventDefault(),Rs(e,pe,false);else if(function(t){return r&&Es(t,"Backspace",{metaKey:true})}(t))t.preventDefault(),Rs(e,ye$1,true);else if(function(t){return r&&(Es(t,"Delete",{metaKey:true})||Es(t,"k",{ctrlKey:true}))}(t))t.preventDefault(),Rs(e,ye$1,false);else if(function(t){return Es(t,"b",Ms)}(t))t.preventDefault(),Rs(e,me,"bold");else if(function(t){return Es(t,"u",Ms)}(t))t.preventDefault(),Rs(e,me,"underline");else if(function(t){return Es(t,"i",Ms)}(t))t.preventDefault(),Rs(e,me,"italic");else if(function(t){return Es(t,"Tab",{shiftKey:"any"})}(t))Rs(e,Pe,t);else if(function(t){return Es(t,"z",Ms)}(t))t.preventDefault(),Rs(e,xe$1,void 0);else if(function(t){if(r)return Es(t,"z",{metaKey:true,shiftKey:true});return Es(t,"y",{ctrlKey:true})||Es(t,"z",{ctrlKey:true,shiftKey:true})}(t))t.preventDefault(),Rs(e,Ce,void 0);else {const n=e._editorState._selection;null===n||cr(n)?!i&&Ds(t)&&(t.preventDefault(),Rs(e,$e,t)):!function(t){return Es(t,"c",Ms)}(t)?!function(t){return Es(t,"x",Ms)}(t)?Ds(t)&&(t.preventDefault(),Rs(e,$e,t)):(t.preventDefault(),Rs(e,Ue,t)):(t.preventDefault(),Rs(e,Je,t));}(function(t){return t.ctrlKey||t.shiftKey||t.altKey||t.metaKey})(t)&&Rs(e,Xe,t);}],["pointerdown",function(t,e){const n=t.target,r=t.pointerType;fo(n)&&"touch"!==r&&0===t.button&&ci(e,(()=>{Vi(n)||(cn=true);}));}],["compositionstart",function(t,e){ci(e,(()=>{const n=Nr();if(cr(n)&&!e.isComposing()){const r=n.anchor,i=n.anchor.getNode();ls(r.key),(t.timeStamp<en+Ze||"element"===r.type||!n.isCollapsed()||i.getFormat()!==n.format||Qn(i)&&i.getStyle()!==n.style)&&Rs(e,he,R$4);}}));}],["compositionend",function(t,e){i?un=true:l||!o&&!f$1?ci(e,(()=>{Sn(e,t.data);})):(fn=true,dn$1=t.data);}],["input",function(t,e){t.stopPropagation(),ci(e,(()=>{if(uo(t.target)&&Vi(t.target))return;const n=Nr(),r=t.data,c=Cn(t);if(null!=r&&cr(n)&&_n(n,c,r,t.timeStamp,false)){un&&(Sn(e,r),un=false);const c=n.anchor.getNode(),a=oo(Gs(e));if(null===a)return;const u=n.isBackward(),d=u?n.anchor.offset:n.focus.offset,h=u?n.focus.offset:n.anchor.offset;s&&!n.isCollapsed()&&Qn(c)&&null!==a.anchorNode&&c.getTextContent().slice(0,d)+r+c.getTextContent().slice(d+h)===ks(a.anchorNode)||Rs(e,he,r);const g=r.length;i&&g>1&&"insertCompositionText"===t.inputType&&!e.isComposing()&&(n.anchor.offset-=g),o||l||f$1||!e.isComposing()||(en=0,ls(null));}else {Ts(false,e,null!==r?r:void 0),un&&(Sn(e,r||void 0),un=false);}!function(){Vr();const t=qr();ct$4(t);}();}),{event:t}),sn$1=null;}],["click",function(t,e){ci(e,(()=>{const n=Nr(),r=oo(Gs(e)),i=wr();if(r)if(cr(n)){const e=n.anchor,s=e.getNode();if("element"===e.type&&0===e.offset&&n.isCollapsed()&&!yi(s)&&1===_s().getChildrenSize()&&s.getTopLevelElementOrThrow().isEmpty()&&null!==i&&n.is(i))r.removeAllRanges(),n.dirty=true;else if(3===t.detail&&!n.isCollapsed()){if(s!==n.focus.getNode()){const t=function(t,e){let n=t;for(;n!==_s()&&null!=n;){if(e(n))return n;n=n.getParent();}return null}(s,(t=>di(t)&&!t.isInline()));di(t)&&t.select(0);}}}else if("touch"===t.pointerType){const n=r.anchorNode;if(uo(n)||Zi(n)){ys(br(i,r,e,t));}}Rs(e,ae,t);}));}],["cut",Qe],["copy",Qe],["dragstart",Qe],["dragover",Qe],["dragend",Qe],["paste",Qe],["focus",Qe],["blur",Qe],["drop",Qe]];s&&tn.push(["beforeinput",(e,n)=>function(e,n){const r=e.inputType,s=Cn(e);if("deleteCompositionText"===r||i&&Bs(n))return;if("insertCompositionText"===r)return;ci(n,(()=>{const i=Nr();if("deleteContentBackward"===r){if(null===i){const t=wr();if(!cr(t))return;ys(t.clone());}if(cr(i)){const r=i.anchor.key===i.focus.key;if(o=e.timeStamp,"MediaLast"===nn&&o<en+Ze&&n.isComposing()&&r){if(ls(null),en=0,setTimeout((()=>{ci(n,(()=>{ls(null);}));}),Ze),cr(i)){const e=i.anchor.getNode();e.markDirty(),Qn(e)||t(142),xn(i,e);}}else {ls(null),e.preventDefault();const t=i.anchor.getNode(),s=t.getTextContent(),o=t.canInsertTextAfter(),l=0===i.anchor.offset&&i.focus.offset===s.length;let c=u&&r&&!l&&o;if(c&&i.isCollapsed()&&(c=!_i(Ks(i.anchor,true))),!c){Rs(n,ue,true);const t=Nr();u&&cr(t)&&t.isCollapsed()&&(hn$1=t,setTimeout((()=>hn$1=null)));}}return}}var o;if(!cr(i))return;const c=e.data;null!==sn$1&&Ts(false,n,sn$1),i.dirty&&null===sn$1||!i.isCollapsed()||yi(i.anchor.getNode())||null===s||i.applyDOMRange(s),sn$1=null;const a=i.anchor,f=i.focus,d=a.getNode(),h=f.getNode();if("insertText"!==r&&"insertTranspose"!==r)switch(e.preventDefault(),r){case "insertFromYank":case "insertFromDrop":case "insertReplacementText":Rs(n,he,e);break;case "insertFromComposition":ls(null),Rs(n,he,e);break;case "insertLineBreak":ls(null),Rs(n,fe,false);break;case "insertParagraph":ls(null),an$1&&!l?(an$1=false,Rs(n,fe,false)):Rs(n,de,void 0);break;case "insertFromPaste":case "insertFromPasteAsQuotation":Rs(n,ge,e);break;case "deleteByComposition":(function(t,e){return t!==e||di(t)||di(e)||!t.isToken()||!e.isToken()})(d,h)&&Rs(n,_e,e);break;case "deleteByDrag":case "deleteByCut":Rs(n,_e,e);break;case "deleteContent":Rs(n,ue,false);break;case "deleteWordBackward":Rs(n,pe,true);break;case "deleteWordForward":Rs(n,pe,false);break;case "deleteHardLineBackward":case "deleteSoftLineBackward":Rs(n,ye$1,true);break;case "deleteContentForward":case "deleteHardLineForward":case "deleteSoftLineForward":Rs(n,ye$1,false);break;case "formatStrikeThrough":Rs(n,me,"strikethrough");break;case "formatBold":Rs(n,me,"bold");break;case "formatItalic":Rs(n,me,"italic");break;case "formatUnderline":Rs(n,me,"underline");break;case "historyUndo":Rs(n,xe$1,void 0);break;case "historyRedo":Rs(n,Ce,void 0);}else {if("\n"===c)e.preventDefault(),Rs(n,fe,false);else if(c===B$4)e.preventDefault(),Rs(n,de,void 0);else if(null==c&&e.dataTransfer){const t=e.dataTransfer.getData("text/plain");e.preventDefault(),i.insertRawText(t);}else null!=c&&_n(i,s,c,e.timeStamp,true)?(e.preventDefault(),Rs(n,he,c)):sn$1=c;rn$1=e.timeStamp;}}));}(e,n)]);let en=0,nn=null,rn$1=0,sn$1=null;const on$1=new WeakMap;let ln$1=false,cn=false,an$1=false,un=false,fn=false,dn$1="",hn$1=null,gn=[0,"",0,"root",0];function _n(t,e,n,r,i){const o=t.anchor,l=t.focus,c=o.getNode(),a=qr(),u=oo(Gs(a)),f=null!==u?u.anchorNode:null,d=o.key,h=a.getElementByKey(d),g=n.length;return d!==l.key||!Qn(c)||(!i&&(!s||rn$1<r+50)||c.isDirty()&&g<2||Cs(n))&&o.offset!==l.offset&&!c.isComposing()||Qi(c)||c.isDirty()&&g>1||(i||!s)&&null!==h&&!c.isComposing()&&f!==es(h)||null!==u&&null!==e&&(!e.collapsed||e.startContainer!==u.anchorNode||e.startOffset!==u.anchorOffset)||c.getFormat()!==t.format||c.getStyle()!==t.style||function(t,e){if(e.isSegmented())return  true;if(!t.isCollapsed())return  false;const n=t.anchor.offset,r=e.getParentOrThrow(),i=e.isToken();return 0===n?!e.canInsertTextBefore()||!r.canInsertTextBefore()&&!e.isComposing()||i||function(t){const e=t.getPreviousSibling();return (Qn(e)||di(e)&&e.isInline())&&!e.canInsertTextAfter()}(e):n===e.getTextContentSize()&&(!e.canInsertTextAfter()||!r.canInsertTextAfter()&&!e.isComposing()||i)}(t,c)}function pn(t,e){return Zi(t)&&null!==t.nodeValue&&0!==e&&e!==t.nodeValue.length}function yn(e,n,r){const{anchorNode:i,anchorOffset:s,focusNode:o,focusOffset:l}=e;ln$1&&(ln$1=false,pn(i,s)&&pn(o,l)&&!hn$1)||ci(n,(()=>{if(!r)return void ys(null);if(!Hi(n,i,o))return;let c=Nr();if(hn$1&&cr(c)&&c.isCollapsed()){const t=c.anchor,e=hn$1.anchor;(t.key===e.key&&t.offset===e.offset+1||1===t.offset&&e.getNode().is(t.getNode().getPreviousSibling()))&&(c=hn$1.clone(),ys(c));}if(hn$1=null,cr(c)){const r=c.anchor,i=r.getNode();if(c.isCollapsed()){"Range"===e.type&&e.anchorNode===e.focusNode&&(c.dirty=true);const s=Gs(n).event,o=s?s.timeStamp:performance.now(),[l,a,u,f,d]=gn,h=_s(),g=false===n.isComposing()&&""===h.getTextContent();if(o<d+200&&r.offset===u&&r.key===f)mn(c,l,a);else if("text"===r.type)Qn(i)||t(141),xn(c,i);else if("element"===r.type&&!g){di(i)||t(259);const e=r.getNode();e.isEmpty()?function(t,e){const n=e.getTextFormat(),r=e.getTextStyle();mn(t,n,r);}(c,e):mn(c,0,"");}}else {const t=r.key,e=c.focus.key,n=c.getNodes(),i=n.length,o=c.isBackward(),a=o?l:s,u=o?s:l,f=o?e:t,d=o?t:e;let h=O$2,g=false;for(let t=0;t<i;t++){const e=n[t],r=e.getTextContentSize();if(Qn(e)&&0!==r&&!(0===t&&e.__key===f&&a===r||t===i-1&&e.__key===d&&0===u)&&(g=true,h&=e.getFormat(),0===h))break}c.format=g?h:0;}}Rs(n,le,void 0);}));}function mn(t,e,n){t.format===e&&t.style===n||(t.format=e,t.style=n,t.dirty=true);}function xn(t,e){mn(t,e.getFormat(),e.getStyle());}function Cn(t){if(!t.getTargetRanges)return null;const e=t.getTargetRanges();return 0===e.length?null:e[0]}function Sn(t,e){const n=t._compositionKey;if(ls(null),null!==n&&null!=e){if(""===e){const e=as(n),r=es(t.getElementByKey(n));return void(null!==r&&null!==r.nodeValue&&Qn(e)&&bs(e,r.nodeValue,null,null,true))}if("\n"===e[e.length-1]){const e=Nr();if(cr(e)){const n=e.focus;return e.anchor.set(n.key,n.offset,n.type),void Rs(t,Ee$1,null)}}}Ts(true,t,e);}function vn(t){let e=t.__lexicalEventHandles;return void 0===e&&(e=[],t.__lexicalEventHandles=e),e}const kn=new Map;function Tn(t){const e=lo(t.target);if(null===e)return;const n=Gi(e.anchorNode);if(null===n)return;cn&&(cn=false,ci(n,(()=>{const r=wr(),i=e.anchorNode;if(uo(i)||Zi(i)){ys(br(r,e,n,t));}})));const r=Ss(n),i=r[r.length-1],s=i._key,o=kn.get(s),l=o||i;l!==n&&yn(e,l,false),yn(e,n,true),n!==i?kn.set(s,n):o&&kn.delete(s);}function bn(t){t._lexicalHandled=true;}function Nn(t){return  true===t._lexicalHandled}function En(e){const n=e.ownerDocument,r=on$1.get(n);if(void 0===r)return void 0;const i=r-1;i>=0||t(164),on$1.set(n,i),0===i&&n.removeEventListener("selectionchange",Tn);const s=Xi(e);qi(s)?(!function(t){if(null!==t._parentEditor){const e=Ss(t),n=e[e.length-1]._key;kn.get(n)===t&&kn.delete(n);}else kn.delete(t._key);}(s),e.__lexicalEditor=null):s&&t(198);const o=vn(e);for(let t=0;t<o.length;t++)o[t]();e.__lexicalEventHandles=[];}function Mn(t,e,n){Vr();const r=t.__key,i=t.getParent();if(null===i)return;const s=function(t){const e=Nr();if(!cr(e)||!di(t))return e;const{anchor:n,focus:r}=e,i=n.getNode(),s=r.getNode();Hs(i,t)&&n.set(t.__key,0,"element");Hs(s,t)&&r.set(t.__key,0,"element");return e}(t);let o=false;if(cr(s)&&e){const e=s.anchor,n=s.focus;e.key===r&&(Ar(e,t,i,t.getPreviousSibling(),t.getNextSibling()),o=true),n.key===r&&(Ar(n,t,i,t.getPreviousSibling(),t.getNextSibling()),o=true);}else ur(s)&&e&&t.isSelected()&&t.selectPrevious();if(cr(s)&&e&&!o){const e=t.getIndexWithinParent();ss(t),Er(s,i,e,-1);}else ss(t);n||Zs(i)||i.canBeEmpty()||!i.isEmpty()||Mn(i,e),e&&s&&yi(i)&&i.isEmpty()&&i.selectEnd();}class An{static getType(){t(64,this.name);}static clone(e){t(65,this.name);}afterCloneFrom(t){this.__parent=t.__parent,this.__next=t.__next,this.__prev=t.__prev,this.__state=t.__state;}constructor(t){this.__type=this.constructor.getType(),this.__parent=null,this.__prev=null,this.__next=null,Object.defineProperty(this,"__state",{configurable:true,enumerable:false,value:void 0,writable:true}),is(this,t);}getType(){return this.__type}isInline(){t(137,this.constructor.name);}isAttached(){let t=this.__key;for(;null!==t;){if("root"===t)return  true;const e=as(t);if(null===e)break;t=e.__parent;}return  false}isSelected(t){const e=t||Nr();if(null==e)return  false;const n=e.getNodes().some((t=>t.__key===this.__key));if(Qn(this))return n;if(cr(e)&&"element"===e.anchor.type&&"element"===e.focus.type){if(e.isCollapsed())return  false;const t=this.getParent();if(_i(this)&&this.isInline()&&t){const n=e.isBackward()?e.focus:e.anchor;if(t.is(n.getNode())&&n.offset===t.getChildrenSize()&&this.is(t.getLastChild()))return  false}}return n}getKey(){return this.__key}getIndexWithinParent(){const t=this.getParent();if(null===t)return  -1;let e=t.getFirstChild(),n=0;for(;null!==e;){if(this.is(e))return n;n++,e=e.getNextSibling();}return  -1}getParent(){const t=this.getLatest().__parent;return null===t?null:as(t)}getParentOrThrow(){const e=this.getParent();return null===e&&t(66,this.__key),e}getTopLevelElement(){let e=this;for(;null!==e;){const n=e.getParent();if(Zs(n))return di(e)||e===this&&_i(e)||t(194),e;e=n;}return null}getTopLevelElementOrThrow(){const e=this.getTopLevelElement();return null===e&&t(67,this.__key),e}getParents(){const t=[];let e=this.getParent();for(;null!==e;)t.push(e),e=e.getParent();return t}getParentKeys(){const t=[];let e=this.getParent();for(;null!==e;)t.push(e.__key),e=e.getParent();return t}getPreviousSibling(){const t=this.getLatest().__prev;return null===t?null:as(t)}getPreviousSiblings(){const t=[],e=this.getParent();if(null===e)return t;let n=e.getFirstChild();for(;null!==n&&!n.is(this);)t.push(n),n=n.getNextSibling();return t}getNextSibling(){const t=this.getLatest().__next;return null===t?null:as(t)}getNextSiblings(){const t=[];let e=this.getNextSibling();for(;null!==e;)t.push(e),e=e.getNextSibling();return t}getCommonAncestor(t){const e=di(this)?this:this.getParent(),n=di(t)?t:t.getParent(),r=e&&n?sl(e,n):null;return r?r.commonAncestor:null}is(t){return null!=t&&this.__key===t.__key}isBefore(e){const n=sl(this,e);return null!==n&&("descendant"===n.type||("branch"===n.type?-1===nl(n):("same"!==n.type&&"ancestor"!==n.type&&t(279),false)))}isParentOf(t){const e=sl(this,t);return null!==e&&"ancestor"===e.type}getNodesBetween(e){const n=this.isBefore(e),r=[],i=new Set;let s=this;for(;null!==s;){const o=s.__key;if(i.has(o)||(i.add(o),r.push(s)),s===e)break;const l=di(s)?n?s.getFirstChild():s.getLastChild():null;if(null!==l){s=l;continue}const c=n?s.getNextSibling():s.getPreviousSibling();if(null!==c){s=c;continue}const a=s.getParentOrThrow();if(i.has(a.__key)||r.push(a),a===e)break;let u=null,f=a;do{if(null===f&&t(68),u=n?f.getNextSibling():f.getPreviousSibling(),f=f.getParent(),null===f)break;null!==u||i.has(f.__key)||r.push(f);}while(null===u);s=u;}return n||r.reverse(),r}isDirty(){const t=qr()._dirtyLeaves;return null!==t&&t.has(this.__key)}getLatest(){const e=as(this.__key);return null===e&&t(113),e}getWritable(){Vr();const t=Hr(),e=qr(),n=t._nodeMap,r=this.__key,i=this.getLatest(),s=e._cloneNotNeeded,o=Nr();if(null!==o&&o.setCachedNodes(null),s.has(r))return os(i),i;const l=vo(i);return s.add(r),os(l),n.set(r,l),l}getTextContent(){return ""}getTextContentSize(){return this.getTextContent().length}createDOM(e,n){t(70);}updateDOM(e,n,r){t(71);}exportDOM(t){return {element:this.createDOM(t._config,t)}}exportJSON(){const t=this.__state?this.__state.toJSON():void 0;return {type:this.__type,version:1,...t}}static importJSON(e){t(18,this.name);}updateFromJSON(t){return function(t,e){const n=t.getWritable();return (e||n.__state)&&mt$3(t).updateFromJSON(e),n}(this,t.$)}static transform(){return null}remove(t){Mn(this,true,t);}replace(e,n){Vr();let r=Nr();null!==r&&(r=r.clone()),no(this,e);const i=this.getLatest(),s=this.__key,o=e.__key,l=e.getWritable(),c=this.getParentOrThrow().getWritable(),a=c.__size;ss(l);const u=i.getPreviousSibling(),f=i.getNextSibling(),d=i.__prev,h=i.__next,g=i.__parent;if(Mn(i,false,true),null===u)c.__first=o;else {u.getWritable().__next=o;}if(l.__prev=d,null===f)c.__last=o;else {f.getWritable().__prev=o;}if(l.__next=h,l.__parent=g,c.__size=a,n&&(di(this)&&di(l)||t(139),this.getChildren().forEach((t=>{l.append(t);}))),cr(r)){ys(r);const t=r.anchor,e=r.focus;t.key===s&&or(t,l),e.key===s&&or(e,l);}return cs()===s&&ls(o),l}insertAfter(t,e=true){Vr(),no(this,t);const n=this.getWritable(),r=t.getWritable(),i=r.getParent(),s=Nr();let o=false,l=false;if(null!==i){const e=t.getIndexWithinParent();if(ss(r),cr(s)){const t=i.__key,n=s.anchor,r=s.focus;o="element"===n.type&&n.key===t&&n.offset===e+1,l="element"===r.type&&r.key===t&&r.offset===e+1;}}const c=this.getNextSibling(),a=this.getParentOrThrow().getWritable(),u=r.__key,f=n.__next;if(null===c)a.__last=u;else {c.getWritable().__prev=u;}if(a.__size++,n.__next=u,r.__next=f,r.__prev=n.__key,r.__parent=n.__parent,e&&cr(s)){const t=this.getIndexWithinParent();Er(s,a,t+1);const e=a.__key;o&&s.anchor.set(e,t+2,"element"),l&&s.focus.set(e,t+2,"element");}return t}insertBefore(t,e=true){Vr(),no(this,t);const n=this.getWritable(),r=t.getWritable(),i=r.__key;ss(r);const s=this.getPreviousSibling(),o=this.getParentOrThrow().getWritable(),l=n.__prev,c=this.getIndexWithinParent();if(null===s)o.__first=i;else {s.getWritable().__next=i;}o.__size++,n.__prev=i,r.__prev=l,r.__next=n.__key,r.__parent=n.__parent;const a=Nr();if(e&&cr(a)){Er(a,this.getParentOrThrow(),c);}return t}isParentRequired(){return  false}createParentElementNode(){return Pi()}selectStart(){return this.selectPrevious()}selectEnd(){return this.selectNext(0,0)}selectPrevious(t,e){Vr();const n=this.getPreviousSibling(),r=this.getParentOrThrow();if(null===n)return r.select(0,0);if(di(n))return n.select();if(!Qn(n)){const t=n.getIndexWithinParent()+1;return r.select(t,t)}return n.select(t,e)}selectNext(t,e){Vr();const n=this.getNextSibling(),r=this.getParentOrThrow();if(null===n)return r.select();if(di(n))return n.select(0,0);if(!Qn(n)){const t=n.getIndexWithinParent();return r.select(t,t)}return n.select(t,e)}markDirty(){this.getWritable();}reconcileObservedMutation(t,e){this.markDirty();}}class On extends An{static getType(){return "linebreak"}static clone(t){return new On(t.__key)}constructor(t){super(t);}getTextContent(){return "\n"}createDOM(){return document.createElement("br")}updateDOM(){return  false}isInline(){return  true}static importDOM(){return {br:t=>function(t){const e=t.parentElement;if(null!==e&&_o(e)){const n=e.firstChild;if(n===t||n.nextSibling===t&&Ln(n)){const n=e.lastChild;if(n===t||n.previousSibling===t&&Ln(n))return  true}}return  false}(t)||function(t){const e=t.parentElement;if(null!==e&&_o(e)){const n=e.firstChild;if(n===t||n.nextSibling===t&&Ln(n))return  false;const r=e.lastChild;if(r===t||r.previousSibling===t&&Ln(r))return  true}return  false}(t)?null:{conversion:Dn,priority:0}}}static importJSON(t){return Pn().updateFromJSON(t)}}function Dn(t){return {node:Pn()}}function Pn(){return eo(new On)}function Fn(t){return t instanceof On}function Ln(t){return Zi(t)&&/^( |\t|\r?\n)+$/.test(t.textContent||"")}function In(t,e){return 16&e?"code":e&A$2?"mark":32&e?"sub":64&e?"sup":null}function zn(t,e){return 1&e?"strong":2&e?"em":"span"}function Kn(t,e,n,r,i){const s=r.classList;let o=Fs(i,"base");void 0!==o&&s.add(...o),o=Fs(i,"underlineStrikethrough");let l=false;const c=e&N$1&&e&b$1;void 0!==o&&(n&N$1&&n&b$1?(l=true,c||s.add(...o)):c&&s.remove(...o));for(const t in j$3){const r=j$3[t];if(o=Fs(i,t),void 0!==o)if(n&r){if(l&&("underline"===t||"strikethrough"===t)){e&r&&s.remove(...o);continue}e&r&&(!c||"underline"!==t)&&"strikethrough"!==t||s.add(...o);}else e&r&&s.remove(...o);}}function Bn(t,e,n){const r=e.firstChild,s=n.isComposing(),o=t+(s?K$2:"");if(null==r)e.textContent=o;else {const t=r.nodeValue;if(t!==o)if(s||i){const[e,n,i]=function(t,e){const n=t.length,r=e.length;let i=0,s=0;for(;i<n&&i<r&&t[i]===e[i];)i++;for(;s+i<n&&s+i<r&&t[n-s-1]===e[r-s-1];)s++;return [i,n-i-s,e.slice(i,r-s)]}(t,o);0!==n&&r.deleteData(e,n),r.insertData(e,i);}else r.nodeValue=o;}}function Rn(t,e,n,r,i,s){Bn(i,t,e);const o=s.theme.text;void 0!==o&&Kn(0,0,r,t,o);}function Wn(t,e){const n=document.createElement(e);return n.appendChild(t),n}class Jn extends An{static getType(){return "text"}static clone(t){return new Jn(t.__text,t.__key)}afterCloneFrom(t){super.afterCloneFrom(t),this.__text=t.__text,this.__format=t.__format,this.__style=t.__style,this.__mode=t.__mode,this.__detail=t.__detail;}constructor(t="",e){super(e),this.__text=t,this.__format=0,this.__style="",this.__mode=0,this.__detail=0;}getFormat(){return this.getLatest().__format}getDetail(){return this.getLatest().__detail}getMode(){const t=this.getLatest();return G$2[t.__mode]}getStyle(){return this.getLatest().__style}isToken(){return 1===this.getLatest().__mode}isComposing(){return this.__key===cs()}isSegmented(){return 2===this.getLatest().__mode}isDirectionless(){return !!(1&this.getLatest().__detail)}isUnmergeable(){return !!(2&this.getLatest().__detail)}hasFormat(t){const e=j$3[t];return !!(this.getFormat()&e)}isSimpleText(){return "text"===this.__type&&0===this.__mode}getTextContent(){return this.getLatest().__text}getFormatFlags(t,e){return ns(this.getLatest().__format,t,e)}canHaveFormat(){return  true}isInline(){return  true}createDOM(t,e){const n=this.__format,r=In(0,n),i=zn(0,n),s=null===r?i:r,o=document.createElement(s);let l=o;this.hasFormat("code")&&o.setAttribute("spellcheck","false"),null!==r&&(l=document.createElement(i),o.appendChild(l));Rn(l,this,0,n,this.__text,t);const c=this.__style;return ""!==c&&(o.style.cssText=c),o}updateDOM(e,n,r){const i=this.__text,s=e.__format,o=this.__format,l=In(0,s),c=In(0,o),a=zn(0,s),u=zn(0,o);if((null===l?a:l)!==(null===c?u:c))return  true;if(l===c&&a!==u){const e=n.firstChild;null==e&&t(48);const s=document.createElement(u);return Rn(s,this,0,o,i,r),n.replaceChild(s,e),false}let f=n;null!==c&&null!==l&&(f=n.firstChild,null==f&&t(49)),Bn(i,f,this);const d=r.theme.text;void 0!==d&&s!==o&&Kn(0,s,o,f,d);const h=e.__style,g=this.__style;return h!==g&&(n.style.cssText=g),false}static importDOM(){return {"#text":()=>({conversion:Yn,priority:0}),b:()=>({conversion:$n,priority:0}),code:()=>({conversion:Gn,priority:0}),em:()=>({conversion:Gn,priority:0}),i:()=>({conversion:Gn,priority:0}),mark:()=>({conversion:Gn,priority:0}),s:()=>({conversion:Gn,priority:0}),span:()=>({conversion:Un,priority:0}),strong:()=>({conversion:Gn,priority:0}),sub:()=>({conversion:Gn,priority:0}),sup:()=>({conversion:Gn,priority:0}),u:()=>({conversion:Gn,priority:0})}}static importJSON(t){return Xn().updateFromJSON(t)}updateFromJSON(t){return super.updateFromJSON(t).setTextContent(t.text).setFormat(t.format).setDetail(t.detail).setMode(t.mode).setStyle(t.style)}exportDOM(e){let{element:n}=super.exportDOM(e);return uo(n)||t(132),n.style.whiteSpace="pre-wrap",this.hasFormat("lowercase")?n.style.textTransform="lowercase":this.hasFormat("uppercase")?n.style.textTransform="uppercase":this.hasFormat("capitalize")&&(n.style.textTransform="capitalize"),this.hasFormat("bold")&&(n=Wn(n,"b")),this.hasFormat("italic")&&(n=Wn(n,"i")),this.hasFormat("strikethrough")&&(n=Wn(n,"s")),this.hasFormat("underline")&&(n=Wn(n,"u")),{element:n}}exportJSON(){return {detail:this.getDetail(),format:this.getFormat(),mode:this.getMode(),style:this.getStyle(),text:this.getTextContent(),...super.exportJSON()}}selectionTransform(t,e){}setFormat(t){const e=this.getWritable();return e.__format="string"==typeof t?j$3[t]:t,e}setDetail(t){const e=this.getWritable();return e.__detail="string"==typeof t?V$2[t]:t,e}setStyle(t){const e=this.getWritable();return e.__style=t,e}toggleFormat(t){const e=ns(this.getFormat(),t,null);return this.setFormat(e)}toggleDirectionless(){const t=this.getWritable();return t.__detail^=1,t}toggleUnmergeable(){const t=this.getWritable();return t.__detail^=2,t}setMode(t){const e=q$3[t];if(this.__mode===e)return this;const n=this.getWritable();return n.__mode=e,n}setTextContent(t){if(this.__text===t)return this;const e=this.getWritable();return e.__text=t,e}select(t,e){Vr();let n=t,r=e;const i=Nr(),s=this.getTextContent(),o=this.__key;if("string"==typeof s){const t=s.length;void 0===n&&(n=t),void 0===r&&(r=t);}else n=0,r=0;if(!cr(i))return Sr(o,n,o,r,"text","text");{const t=cs();t!==i.anchor.key&&t!==i.focus.key||ls(o),i.setTextNodeRange(this,n,this,r);}return i}selectStart(){return this.select(0,0)}selectEnd(){const t=this.getTextContentSize();return this.select(t,t)}spliceText(t,e,n,r){const i=this.getWritable(),s=i.__text,o=n.length;let l=t;l<0&&(l=o+l,l<0&&(l=0));const c=Nr();if(r&&cr(c)){const e=t+o;c.setTextNodeRange(i,e,i,e);}const a=s.slice(0,l)+n+s.slice(l+e);return i.__text=a,i}canInsertTextBefore(){return  true}canInsertTextAfter(){return  true}splitText(...t){Vr();const e=this.getLatest(),n=e.getTextContent();if(""===n)return [];const r=e.__key,i=cs(),s=n.length;t.sort(((t,e)=>t-e)),t.push(s);const o=[],l=t.length;for(let e=0,r=0;e<s&&r<=l;r++){const i=t[r];i>e&&(o.push(n.slice(e,i)),e=i);}const c=o.length;if(1===c)return [e];const a=o[0],u=e.getParent();let f;const d=e.getFormat(),h=e.getStyle(),g=e.__detail;let _=false,p=null,y=null;const m=Nr();if(cr(m)){const[t,e]=m.isBackward()?[m.focus,m.anchor]:[m.anchor,m.focus];"text"===t.type&&t.key===r&&(p=t),"text"===e.type&&e.key===r&&(y=e);}e.isSegmented()?(f=Xn(a),f.__format=d,f.__style=h,f.__detail=g,_=true):(f=e.getWritable(),f.__text=a);const x=[f];for(let t=1;t<c;t++){const e=Xn(o[t]);e.__format=d,e.__style=h,e.__detail=g;const n=e.__key;i===r&&ls(n),x.push(e);}const C=p?p.offset:null,S=y?y.offset:null;let v=0;for(const t of x){if(!p&&!y)break;const e=v+t.getTextContentSize();if(null!==p&&null!==C&&C<=e&&C>=v&&(p.set(t.getKey(),C-v,"text"),C<e&&(p=null)),null!==y&&null!==S&&S<=e&&S>=v){y.set(t.getKey(),S-v,"text");break}v=e;}if(null!==u){!function(t){const e=t.getPreviousSibling(),n=t.getNextSibling();null!==e&&os(e);null!==n&&os(n);}(this);const t=u.getWritable(),e=this.getIndexWithinParent();_?(t.splice(e,0,x),this.remove()):t.splice(e,1,x),cr(m)&&Er(m,u,e,c-1);}return x}mergeWithSibling(e){const n=e===this.getPreviousSibling();n||e===this.getNextSibling()||t(50);const r=this.__key,i=e.__key,s=this.__text,o=s.length;cs()===i&&ls(r);const l=Nr();if(cr(l)){const t=l.anchor,s=l.focus;null!==t&&t.key===i&&Or(t,n,r,e,o),null!==s&&s.key===i&&Or(s,n,r,e,o);}const c=e.__text,a=n?c+s:s+c;this.setTextContent(a);const u=this.getWritable();return e.remove(),u}isTextEntity(){return  false}}function Un(t){return {forChild:Zn(t.style),node:null}}function $n(t){const e=t,n="normal"===e.style.fontWeight;return {forChild:Zn(e.style,n?void 0:"bold"),node:null}}const jn=new WeakMap;function Vn(t){if(!uo(t))return  false;if("PRE"===t.nodeName)return  true;const e=t.style.whiteSpace;return "string"==typeof e&&e.startsWith("pre")}function Yn(e){const n=e;null===e.parentElement&&t(129);let r=n.textContent||"";if(null!==function(t){let e,n=t.parentNode;const r=[t];for(;null!==n&&void 0===(e=jn.get(n))&&!Vn(n);)r.push(n),n=n.parentNode;const i=void 0===e?n:e;for(let t=0;t<r.length;t++)jn.set(r[t],i);return i}(n)){const t=r.split(/(\r?\n|\t)/),e=[],n=t.length;for(let r=0;r<n;r++){const n=t[r];"\n"===n||"\r\n"===n?e.push(Pn()):"\t"===n?e.push(er()):""!==n&&e.push(Xn(n));}return {node:e}}if(r=r.replace(/\r/g,"").replace(/[ \t\n]+/g," "),""===r)return {node:null};if(" "===r[0]){let t=n,e=true;for(;null!==t&&null!==(t=Hn(t,false));){const n=t.textContent||"";if(n.length>0){/[ \t\n]$/.test(n)&&(r=r.slice(1)),e=false;break}}e&&(r=r.slice(1));}if(" "===r[r.length-1]){let t=n,e=true;for(;null!==t&&null!==(t=Hn(t,true));){if((t.textContent||"").replace(/^( |\t|\r?\n)+/,"").length>0){e=false;break}}e&&(r=r.slice(0,r.length-1));}return ""===r?{node:null}:{node:Xn(r)}}function Hn(t,e){let n=t;for(;;){let t;for(;null===(t=e?n.nextSibling:n.previousSibling);){const t=n.parentElement;if(null===t)return null;n=t;}if(n=t,uo(n)){const t=n.style.display;if(""===t&&!go(n)||""!==t&&!t.startsWith("inline"))return null}let r=n;for(;null!==(r=e?n.firstChild:n.lastChild);)n=r;if(Zi(n))return n;if("BR"===n.nodeName)return null}}const qn={code:"code",em:"italic",i:"italic",mark:"highlight",s:"strikethrough",strong:"bold",sub:"subscript",sup:"superscript",u:"underline"};function Gn(t){const e=qn[t.nodeName.toLowerCase()];return void 0===e?{node:null}:{forChild:Zn(t.style,e),node:null}}function Xn(t=""){return eo(new Jn(t))}function Qn(t){return t instanceof Jn}function Zn(t,e){const n=t.fontWeight,r=t.textDecoration.split(" "),i="700"===n||"bold"===n,s=r.includes("line-through"),o="italic"===t.fontStyle,l=r.includes("underline"),c=t.verticalAlign;return t=>Qn(t)?(i&&!t.hasFormat("bold")&&t.toggleFormat("bold"),s&&!t.hasFormat("strikethrough")&&t.toggleFormat("strikethrough"),o&&!t.hasFormat("italic")&&t.toggleFormat("italic"),l&&!t.hasFormat("underline")&&t.toggleFormat("underline"),"sub"!==c||t.hasFormat("subscript")||t.toggleFormat("subscript"),"super"!==c||t.hasFormat("superscript")||t.toggleFormat("superscript"),e&&!t.hasFormat(e)&&t.toggleFormat(e),t):t}class tr extends Jn{static getType(){return "tab"}static clone(t){return new tr(t.__key)}constructor(t){super("\t",t),this.__detail=2;}static importDOM(){return null}createDOM(t){const e=super.createDOM(t),n=Fs(t.theme,"tab");if(void 0!==n){e.classList.add(...n);}return e}static importJSON(t){return er().updateFromJSON(t)}setTextContent(e){return "\t"!==e&&""!==e&&t(126),super.setTextContent(e)}setDetail(e){return 2!==e&&t(127),this}setMode(e){return "normal"!==e&&t(128),this}canInsertTextBefore(){return  false}canInsertTextAfter(){return  false}}function er(){return eo(new tr)}function nr(t){return t instanceof tr}class rr{constructor(t,e,n){this._selection=null,this.key=t,this.offset=e,this.type=n;}is(t){return this.key===t.key&&this.offset===t.offset&&this.type===t.type}isBefore(t){if(this.key===t.key)return this.offset<t.offset;return el(_l(ol(this,"next")),_l(ol(t,"next")))<0}getNode(){const e=as(this.key);return null===e&&t(20),e}set(t,e,n,r){const i=this._selection,s=this.key;r&&this.key===t&&this.offset===e&&this.type===n||(this.key=t,this.offset=e,this.type=n,jr()||(cs()===s&&ls(t),null!==i&&(i.setCachedNodes(null),i.dirty=true)));}}function ir(t,e,n){return new rr(t,e,n)}function sr(t,e){let n=e.__key,r=t.offset,i="element";if(Qn(e)){i="text";const t=e.getTextContentSize();r>t&&(r=t);}else if(!di(e)){const t=e.getNextSibling();if(Qn(t))n=t.__key,r=0,i="text";else {const t=e.getParent();t&&(n=t.__key,r=e.getIndexWithinParent()+1);}}t.set(n,r,i);}function or(t,e){if(di(e)){const n=e.getLastDescendant();di(n)||Qn(n)?sr(t,n):sr(t,e);}else sr(t,e);}class lr{constructor(t){this._cachedNodes=null,this._nodes=t,this.dirty=false;}getCachedNodes(){return this._cachedNodes}setCachedNodes(t){this._cachedNodes=t;}is(t){if(!ur(t))return  false;const e=this._nodes,n=t._nodes;return e.size===n.size&&Array.from(e).every((t=>n.has(t)))}isCollapsed(){return  false}isBackward(){return  false}getStartEndPoints(){return null}add(t){this.dirty=true,this._nodes.add(t),this._cachedNodes=null;}delete(t){this.dirty=true,this._nodes.delete(t),this._cachedNodes=null;}clear(){this.dirty=true,this._nodes.clear(),this._cachedNodes=null;}has(t){return this._nodes.has(t)}clone(){return new lr(new Set(this._nodes))}extract(){return this.getNodes()}insertRawText(t){}insertText(){}insertNodes(t){const e=this.getNodes(),n=e.length,r=e[n-1];let i;if(Qn(r))i=r.select();else {const t=r.getIndexWithinParent()+1;i=r.getParentOrThrow().select(t,t);}i.insertNodes(t);for(let t=0;t<n;t++)e[t].remove();}getNodes(){const t=this._cachedNodes;if(null!==t)return t;const e=this._nodes,n=[];for(const t of e){const e=as(t);null!==e&&n.push(e);}return jr()||(this._cachedNodes=n),n}getTextContent(){const t=this.getNodes();let e="";for(let n=0;n<t.length;n++)e+=t[n].getTextContent();return e}deleteNodes(){const t=this.getNodes();if((Nr()||wr())===this&&t[0]){const e=Wo(t[0],"next");cl(Zo(e,e));}for(const e of t)e.remove();}}function cr(t){return t instanceof ar}class ar{constructor(t,e,n,r){this.anchor=t,this.focus=e,t._selection=this,e._selection=this,this._cachedNodes=null,this.format=n,this.style=r,this.dirty=false;}getCachedNodes(){return this._cachedNodes}setCachedNodes(t){this._cachedNodes=t;}is(t){return !!cr(t)&&(this.anchor.is(t.anchor)&&this.focus.is(t.focus)&&this.format===t.format&&this.style===t.style)}isCollapsed(){return this.anchor.is(this.focus)}getNodes(){const t=this._cachedNodes;if(null!==t)return t;const e=function(t){const e=[],[n,r]=t.getTextSlices();n&&e.push(n.caret.origin);const i=new Set,s=new Set;for(const n of t)if(zo(n)){const{origin:t}=n;0===e.length?i.add(t):(s.add(t),e.push(t));}else {const{origin:t}=n;di(t)&&s.has(t)||e.push(t);}r&&e.push(r.caret.origin);if(Io(t.focus)&&di(t.focus.origin)&&null===t.focus.getNodeAtCaret())for(let n=jo(t.focus.origin,"previous");zo(n)&&i.has(n.origin)&&!n.origin.isEmpty()&&n.origin.is(e[e.length-1]);n=Yo(n))i.delete(n.origin),e.pop();for(;e.length>1;){const t=e[e.length-1];if(!di(t)||s.has(t)||t.isEmpty()||i.has(t))break;e.pop();}if(0===e.length&&t.isCollapsed()){const n=_l(t.anchor),r=_l(t.anchor.getFlipped()),i=t=>Fo(t)?t.origin:t.getNodeAtCaret(),s=i(n)||i(r)||(t.anchor.getNodeAtCaret()?n.origin:r.origin);e.push(s);}return e}(ml(ul(this),"next"));return jr()||(this._cachedNodes=e),e}setTextNodeRange(t,e,n,r){this.anchor.set(t.__key,e,"text"),this.focus.set(n.__key,r,"text");}getTextContent(){const t=this.getNodes();if(0===t.length)return "";const e=t[0],n=t[t.length-1],r=this.anchor,i=this.focus,s=r.isBefore(i),[o,l]=dr(this);let c="",a=true;for(let u=0;u<t.length;u++){const f=t[u];if(di(f)&&!f.isInline())a||(c+="\n"),a=!f.isEmpty();else if(a=false,Qn(f)){let t=f.getTextContent();f===e?f===n?"element"===r.type&&"element"===i.type&&i.offset!==r.offset||(t=o<l?t.slice(o,l):t.slice(l,o)):t=s?t.slice(o):t.slice(l):f===n&&(t=s?t.slice(0,l):t.slice(0,o)),c+=t;}else !_i(f)&&!Fn(f)||f===n&&this.isCollapsed()||(c+=f.getTextContent());}return c}applyDOMRange(t){const e=qr(),n=e.getEditorState()._selection,r=xr(t.startContainer,t.startOffset,t.endContainer,t.endOffset,e,n);if(null===r)return;const[i,s]=r;this.anchor.set(i.key,i.offset,i.type,true),this.focus.set(s.key,s.offset,s.type,true),vt$3(this);}clone(){const t=this.anchor,e=this.focus;return new ar(ir(t.key,t.offset,t.type),ir(e.key,e.offset,e.type),this.format,this.style)}toggleFormat(t){this.format=ns(this.format,t,null),this.dirty=true;}setStyle(t){this.style=t,this.dirty=true;}hasFormat(t){const e=j$3[t];return !!(this.format&e)}insertRawText(t){const e=t.split(/(\r?\n|\t)/),n=[],r=e.length;for(let t=0;t<r;t++){const r=e[t];"\n"===r||"\r\n"===r?n.push(Pn()):"\t"===r?n.push(er()):n.push(Xn(r));}this.insertNodes(n);}insertText(e){const n=this.anchor,r=this.focus,i=this.format,s=this.style;let o=n,l=r;!this.isCollapsed()&&r.isBefore(n)&&(o=r,l=n),"element"===o.type&&function(t,e,n,r){const i=t.getNode(),s=i.getChildAtIndex(t.offset),o=Xn(),l=yi(i)?Pi().append(o):o;o.setFormat(n),o.setStyle(r),null===s?i.append(l):s.insertBefore(l),t.is(e)&&e.set(o.__key,0,"text"),t.set(o.__key,0,"text");}(o,l,i,s),"element"===l.type&&ll(l,_l(ol(l,"next")));const c=o.offset;let a=l.offset;const u=this.getNodes(),f=u.length;let d=u[0];Qn(d)||t(26);const h=d.getTextContent().length,g=d.getParentOrThrow();let _=u[f-1];if(1===f&&"element"===l.type&&(a=h,l.set(o.key,a,"text")),this.isCollapsed()&&c===h&&(d.isSegmented()||d.isToken()||!d.canInsertTextAfter()||!g.canInsertTextAfter()&&null===d.getNextSibling())){let t=d.getNextSibling();if(Qn(t)&&t.canInsertTextBefore()&&!Qi(t)||(t=Xn(),t.setFormat(i),t.setStyle(s),g.canInsertTextAfter()?d.insertAfter(t):g.insertAfter(t)),t.select(0,0),d=t,""!==e)return void this.insertText(e)}else if(this.isCollapsed()&&0===c&&(d.isSegmented()||d.isToken()||!d.canInsertTextBefore()||!g.canInsertTextBefore()&&null===d.getPreviousSibling())){let t=d.getPreviousSibling();if(Qn(t)&&!Qi(t)||(t=Xn(),t.setFormat(i),g.canInsertTextBefore()?d.insertBefore(t):g.insertBefore(t)),t.select(),d=t,""!==e)return void this.insertText(e)}else if(d.isSegmented()&&c!==h){const t=Xn(d.getTextContent());t.setFormat(i),d.replace(t),d=t;}else if(!this.isCollapsed()&&""!==e){const t=_.getParent();if(!g.canInsertTextBefore()||!g.canInsertTextAfter()||di(t)&&(!t.canInsertTextBefore()||!t.canInsertTextAfter()))return this.insertText(""),mr(this.anchor,this.focus,null),void this.insertText(e)}if(1===f){if(d.isToken()){const t=Xn(e);return t.select(),void d.replace(t)}const t=d.getFormat(),n=d.getStyle();if(c!==a||t===i&&n===s){if(nr(d)){const t=Xn(e);return t.setFormat(i),t.setStyle(s),t.select(),void d.replace(t)}}else {if(""!==d.getTextContent()){const t=Xn(e);if(t.setFormat(i),t.setStyle(s),t.select(),0===c)d.insertBefore(t,false);else {const[e]=d.splitText(c);e.insertAfter(t,false);}return void(t.isComposing()&&"text"===this.anchor.type&&(this.anchor.offset-=e.length))}d.setFormat(i),d.setStyle(s);}const r=a-c;d=d.spliceText(c,r,e,true),""===d.getTextContent()?d.remove():"text"===this.anchor.type&&(d.isComposing()?this.anchor.offset-=e.length:(this.format=t,this.style=n));}else {const t=new Set([...d.getParentKeys(),..._.getParentKeys()]),n=di(d)?d:d.getParentOrThrow();let r=di(_)?_:_.getParentOrThrow(),i=_;if(!n.is(r)&&r.isInline())do{i=r,r=r.getParentOrThrow();}while(r.isInline());if("text"===l.type&&(0!==a||""===_.getTextContent())||"element"===l.type&&_.getIndexWithinParent()<a)if(Qn(_)&&!_.isToken()&&a!==_.getTextContentSize()){if(_.isSegmented()){const t=Xn(_.getTextContent());_.replace(t),_=t;}yi(l.getNode())||"text"!==l.type||(_=_.spliceText(0,a,"")),t.add(_.__key);}else {const t=_.getParentOrThrow();t.canBeEmpty()||1!==t.getChildrenSize()?_.remove():t.remove();}else t.add(_.__key);const s=r.getChildren(),o=new Set(u),g=n.is(r),p=n.isInline()&&null===d.getNextSibling()?n:d;for(let t=s.length-1;t>=0;t--){const e=s[t];if(e.is(d)||di(e)&&e.isParentOf(d))break;e.isAttached()&&(!o.has(e)||e.is(i)?g||p.insertAfter(e,false):e.remove());}if(!g){let e=r,n=null;for(;null!==e;){const r=e.getChildren(),i=r.length;(0===i||r[i-1].is(n))&&(t.delete(e.__key),n=e),e=e.getParent();}}if(d.isToken())if(c===h)d.select();else {const t=Xn(e);t.select(),d.replace(t);}else d=d.spliceText(c,h-c,e,true),""===d.getTextContent()?d.remove():d.isComposing()&&"text"===this.anchor.type&&(this.anchor.offset-=e.length);for(let e=1;e<f;e++){const n=u[e],r=n.__key;t.has(r)||n.remove();}}}removeText(){const t=Nr()===this;al(this,gl(ul(this))),t&&Nr()!==this&&ys(this);}formatText(t,e=null){if(this.isCollapsed())return this.toggleFormat(t),void ls(null);const n=this.getNodes(),r=[];for(const t of n)Qn(t)&&r.push(t);const i=e=>{n.forEach((n=>{if(di(n)){const r=n.getFormatFlags(t,e);n.setTextFormat(r);}}));},s=r.length;if(0===s)return this.toggleFormat(t),ls(null),void i(e);const o=this.anchor,l=this.focus,c=this.isBackward(),a=c?l:o,u=c?o:l;let f=0,d=r[0],h="element"===a.type?0:a.offset;if("text"===a.type&&h===d.getTextContentSize()&&(f=1,d=r[1],h=0),null==d)return;const g=d.getFormatFlags(t,e);i(g);const _=s-1;let p=r[_];const y="text"===u.type?u.offset:p.getTextContentSize();if(d.is(p)){if(h===y)return;if(Qi(d)||0===h&&y===d.getTextContentSize())d.setFormat(g);else {const t=d.splitText(h,y),e=0===h?t[0]:t[1];e.setFormat(g),"text"===a.type&&a.set(e.__key,0,"text"),"text"===u.type&&u.set(e.__key,y-h,"text");}return void(this.format=g)}0===h||Qi(d)||([,d]=d.splitText(h),h=0),d.setFormat(g);const m=p.getFormatFlags(t,g);y>0&&(y===p.getTextContentSize()||Qi(p)||([p]=p.splitText(y)),p.setFormat(m));for(let e=f+1;e<_;e++){const n=r[e],i=n.getFormatFlags(t,m);n.setFormat(i);}"text"===a.type&&a.set(d.__key,h,"text"),"text"===u.type&&u.set(p.__key,y,"text"),this.format=g|m;}insertNodes(e){if(0===e.length)return;if(this.isCollapsed()||this.removeText(),"root"===this.anchor.key){this.insertParagraph();const n=Nr();return cr(n)||t(134),n.insertNodes(e)}const n=(this.isBackward()?this.focus:this.anchor).getNode(),r=yo(n,po),i=e[e.length-1];if(di(r)&&"__language"in r){if("__language"in e[0])this.insertText(e[0].getTextContent());else {const t=Ir(this);r.splice(t,0,e),i.selectEnd();}return}if(!e.some((t=>(di(t)||_i(t))&&!t.isInline()))){di(r)||t(211,n.constructor.name,n.getType());const s=Ir(this);return r.splice(s,0,e),void i.selectEnd()}const s=function(t){const e=Pi();let n=null;for(let r=0;r<t.length;r++){const i=t[r],s=Fn(i);if(s||_i(i)&&i.isInline()||di(i)&&i.isInline()||Qn(i)||i.isParentRequired()){if(null===n&&(n=i.createParentElementNode(),e.append(n),s))continue;null!==n&&n.append(i);}else e.append(i),n=null;}return e}(e),o=s.getLastDescendant(),l=s.getChildren(),c=!di(r)||!r.isEmpty()?this.insertParagraph():null,a=l[l.length-1];let u=l[0];var f;di(f=u)&&po(f)&&!f.isEmpty()&&di(r)&&(!r.isEmpty()||r.canMergeWhenEmpty())&&(di(r)||t(211,n.constructor.name,n.getType()),r.append(...u.getChildren()),u=l[1]),u&&(null===r&&t(212,n.constructor.name,n.getType()),function(e,n,r){const i=n.getParentOrThrow().getLastChild();let s=n;const o=[n];for(;s!==i;)s.getNextSibling()||t(140),s=s.getNextSibling(),o.push(s);let l=e;for(const t of o)l=l.insertAfter(t);}(r,u));const d=yo(o,po);c&&di(d)&&(c.canMergeWhenEmpty()||po(a))&&(d.append(...c.getChildren()),c.remove()),di(r)&&r.isEmpty()&&r.remove(),o.selectEnd();const h=di(r)?r.getLastChild():null;Fn(h)&&d!==r&&h.remove();}insertParagraph(){if("root"===this.anchor.key){const t=Pi();return _s().splice(this.anchor.offset,0,[t]),t.select(),t}const e=Ir(this),n=yo(this.anchor.getNode(),po);di(n)||t(213);const r=n.getChildAtIndex(e),i=r?[r,...r.getNextSiblings()]:[],s=n.insertNewAfter(this,false);return s?(s.append(...i),s.selectStart(),s):null}insertLineBreak(t){const e=Pn();if(this.insertNodes([e]),t){const t=e.getParentOrThrow(),n=e.getIndexWithinParent();t.select(n,n);}}extract(){const t=this.getNodes(),e=t.length,n=e-1,r=this.anchor,i=this.focus;let s=t[0],o=t[n];const[l,c]=dr(this);if(0===e)return [];if(1===e){if(Qn(s)&&!this.isCollapsed()){const t=l>c?c:l,e=l>c?l:c,n=s.splitText(t,e),r=0===t?n[0]:n[1];return null!=r?[r]:[]}return [s]}const a=r.isBefore(i);if(Qn(s)){const e=a?l:c;e===s.getTextContentSize()?t.shift():0!==e&&([,s]=s.splitText(e),t[0]=s);}if(Qn(o)){const e=o.getTextContent().length,r=a?c:l;0===r?t.pop():r!==e&&([o]=o.splitText(r),t[n]=o);}return t}modify(t,e,n){if(Kr(this,t,e,n))return;const r="move"===t,i=qr(),s=oo(Gs(i));if(!s)return;const o=i._blockCursorElement,l=i._rootElement,c=this.focus.getNode();if(null===l||null===o||!di(c)||c.isInline()||c.canBeEmpty()||so(o,i,l),this.dirty){let t=Js(i,this.anchor.key),e=Js(i,this.focus.key);"text"===this.anchor.type&&(t=es(t)),"text"===this.focus.type&&(e=es(e)),t&&e&&Dr(s,t,this.anchor.offset,e,this.focus.offset);}if(function(t,e,n,r){t.modify(e,n,r);}(s,t,e?"backward":"forward",n),s.rangeCount>0){const t=s.getRangeAt(0),n=this.anchor.getNode(),i=yi(n)?n:Qs(n);if(this.applyDOMRange(t),this.dirty=true,!r){const n=this.getNodes(),r=[];let o=false;for(let t=0;t<n.length;t++){const e=n[t];Hs(e,i)?r.push(e):o=true;}if(o&&r.length>0)if(e){const t=r[0];di(t)?t.selectStart():t.getParentOrThrow().selectStart();}else {const t=r[r.length-1];di(t)?t.selectEnd():t.getParentOrThrow().selectEnd();}s.anchorNode===t.startContainer&&s.anchorOffset===t.startOffset||function(t){const e=t.focus,n=t.anchor,r=n.key,i=n.offset,s=n.type;n.set(e.key,e.offset,e.type,true),e.set(r,i,s,true);}(this);}}"lineboundary"===n&&Kr(this,t,e,n,"decorators");}forwardDeletion(t,e,n){if(!n&&("element"===t.type&&di(e)&&t.offset===e.getChildrenSize()||"text"===t.type&&t.offset===e.getTextContentSize())){const t=e.getParent(),n=e.getNextSibling()||(null===t?null:t.getNextSibling());if(di(n)&&n.isShadowRoot())return  true}return  false}deleteCharacter(t){const e=this.isCollapsed();if(this.isCollapsed()){const e=this.anchor;let n=e.getNode();if(this.forwardDeletion(e,n,t))return;const r=Xo(ol(e,t?"previous":"next"));if(r.getTextSlices().every((t=>null===t||0===t.distance))){let t={type:"initial"};for(const e of r.iterNodeCarets("shadowRoot"))if(zo(e))if(e.origin.isInline());else {if(e.origin.isShadowRoot()){if("merge-block"===t.type)break;if(di(r.anchor.origin)&&r.anchor.origin.isEmpty()){const t=_l(e);al(this,Zo(t,t)),r.anchor.origin.remove();}return}"merge-next-block"!==t.type&&"merge-block"!==t.type||(t={block:t.block,caret:e,type:"merge-block"});}else {if("merge-block"===t.type)break;if(Io(e)){if(di(e.origin)){if(e.origin.isInline()){if(!e.origin.isParentOf(r.anchor.origin))break}else t={block:e.origin,type:"merge-next-block"};continue}if(_i(e.origin)){if(e.origin.isIsolated());else if("merge-next-block"===t.type&&(e.origin.isKeyboardSelectable()||!e.origin.isInline())&&di(r.anchor.origin)&&r.anchor.origin.isEmpty()){r.anchor.origin.remove();const t=kr();t.add(e.origin.getKey()),ys(t);}else e.origin.remove();return}break}}if("merge-block"===t.type){const{caret:e,block:n}=t;return al(this,Zo(!e.origin.isEmpty()&&n.isEmpty()?fl(Wo(n,e.direction)):r.anchor,e)),this.removeText()}}const i=this.focus;if(this.modify("extend",t,"character"),this.isCollapsed()){if(t&&0===e.offset&&hr(this,e.getNode()))return}else {const r="text"===i.type?i.getNode():null;if(n="text"===e.type?e.getNode():null,null!==r&&r.isSegmented()){const e=i.offset,s=r.getTextContentSize();if(r.is(n)||t&&e!==s||!t&&0!==e)return void _r(r,t,e)}else if(null!==n&&n.isSegmented()){const i=e.offset,s=n.getTextContentSize();if(n.is(r)||t&&0!==i||!t&&i!==s)return void _r(n,t,i)}!function(t,e){const n=t.anchor,r=t.focus,i=n.getNode(),s=r.getNode();if(i===s&&"text"===n.type&&"text"===r.type){const t=n.offset,s=r.offset,o=t<s,l=o?t:s,c=o?s:t,a=c-1;if(l!==a){(function(t){return !(Cs(t)||gr(t))})(i.getTextContent().slice(l,c))&&(e?r.set(r.key,a,r.type):n.set(n.key,a,n.type));}}}(this,t);}}if(this.removeText(),t&&!e&&this.isCollapsed()&&"element"===this.anchor.type&&0===this.anchor.offset){const t=this.anchor.getNode();t.isEmpty()&&yi(t.getParent())&&null===t.getPreviousSibling()&&hr(this,t);}}deleteLine(t){this.isCollapsed()&&this.modify("extend",t,"lineboundary"),this.isCollapsed()?this.deleteCharacter(t):this.removeText();}deleteWord(t){if(this.isCollapsed()){const e=this.anchor,n=e.getNode();if(this.forwardDeletion(e,n,t))return;this.modify("extend",t,"word");}this.removeText();}isBackward(){return this.focus.isBefore(this.anchor)}getStartEndPoints(){return [this.anchor,this.focus]}}function ur(t){return t instanceof lr}function fr(t){const e=t.offset;if("text"===t.type)return e;const n=t.getNode();return e===n.getChildrenSize()?n.getTextContent().length:0}function dr(t){const e=t.getStartEndPoints();if(null===e)return [0,0];const[n,r]=e;return "element"===n.type&&"element"===r.type&&n.key===r.key&&n.offset===r.offset?[0,0]:[fr(n),fr(r)]}function hr(t,e){for(let n=e;n;n=n.getParent()){if(di(n)){if(n.collapseAtStart(t))return  true;if(Zs(n))break}if(n.getPreviousSibling())break}return  false}const gr=(()=>{try{const t=new RegExp("\\p{Emoji}","u"),e=t.test.bind(t);if(e("❤️")&&e("#️⃣")&&e("👍"))return e}catch(t){}return ()=>false})();function _r(t,e,n){const r=t,i=r.getTextContent().split(/(?=\s)/g),s=i.length;let o=0,l=0;for(let t=0;t<s;t++){const r=t===s-1;if(l=o,o+=i[t].length,e&&o===n||o>n||r){i.splice(t,1),r&&(l=void 0);break}}const c=i.join("").trim();""===c?r.remove():(r.setTextContent(c),r.select(l,l));}function pr(e,n,r,i){let s,o=n;if(uo(e)){let l=false;const c=e.childNodes,a=c.length,u=i._blockCursorElement;o===a&&(l=true,o=a-1);let f=c[o],d=false;if(f===u)f=c[o+1],d=true;else if(null!==u){const t=u.parentNode;if(e===t){n>Array.prototype.indexOf.call(t.children,u)&&o--;}}if(s=ms(f),Qn(s))o=xs(s,l);else {let c=ms(e);if(null===c)return null;if(di(c)){const a=i.getElementByKey(c.getKey());null===a&&t(214);const u=c.getDOMSlot(a);[c,o]=u.resolveChildIndex(c,a,e,n),di(c)||t(215),l&&o>=c.getChildrenSize()&&(o=Math.max(0,c.getChildrenSize()-1));let f=c.getChildAtIndex(o);if(di(f)&&function(t,e,n){const r=t.getParent();return null===n||null===r||!r.canBeEmpty()||r!==n.getNode()}(f,0,r)){const t=l?f.getLastDescendant():f.getFirstDescendant();null===t?c=f:(f=t,c=di(f)?f:f.getParentOrThrow()),o=0;}Qn(f)?(s=f,c=null,o=xs(f,l)):f!==c&&l&&!d&&(di(c)||t(216),o=Math.min(c.getChildrenSize(),o+1));}else {const t=c.getIndexWithinParent();o=0===n&&_i(c)&&ms(e)===c?t:t+1,c=c.getParentOrThrow();}if(di(c))return ir(c.__key,o,"element")}}else s=ms(e);return Qn(s)?ir(s.__key,o,"text"):null}function yr(t,e,n){const r=t.offset,i=t.getNode();if(0===r){const r=i.getPreviousSibling(),s=i.getParent();if(e){if((n||!e)&&null===r&&di(s)&&s.isInline()){const e=s.getPreviousSibling();Qn(e)&&t.set(e.__key,e.getTextContent().length,"text");}}else di(r)&&!n&&r.isInline()?t.set(r.__key,r.getChildrenSize(),"element"):Qn(r)&&t.set(r.__key,r.getTextContent().length,"text");}else if(r===i.getTextContent().length){const r=i.getNextSibling(),s=i.getParent();if(e&&di(r)&&r.isInline())t.set(r.__key,0,"element");else if((n||e)&&null===r&&di(s)&&s.isInline()&&!s.canInsertTextAfter()){const e=s.getNextSibling();Qn(e)&&t.set(e.__key,0,"text");}}}function mr(t,e,n){if("text"===t.type&&"text"===e.type){const r=t.isBefore(e),i=t.is(e);yr(t,r,i),yr(e,!r,i),i&&e.set(t.key,t.offset,t.type);const s=qr();if(s.isComposing()&&s._compositionKey!==t.key&&cr(n)){const r=n.anchor,i=n.focus;t.set(r.key,r.offset,r.type,true),e.set(i.key,i.offset,i.type,true);}}}function xr(t,e,n,r,i,s){if(null===t||null===n||!Hi(i,t,n))return null;const o=pr(t,e,cr(s)?s.anchor:null,i);if(null===o)return null;const l=pr(n,r,cr(s)?s.focus:null,i);if(null===l)return null;if("element"===o.type&&"element"===l.type){const e=ms(t),r=ms(n);if(_i(e)&&_i(r))return null}return mr(o,l,s),[o,l]}function Cr(t){return di(t)&&!t.isInline()}function Sr(t,e,n,r,i,s){const o=Hr(),l=new ar(ir(t,e,i),ir(n,r,s),0,"");return l.dirty=true,o._selection=l,l}function vr(){const t=ir("root",0,"element"),e=ir("root",0,"element");return new ar(t,e,0,"")}function kr(){return new lr(new Set)}function br(t,e,n,r){const i=n._window;if(null===i)return null;const s=r||i.event,o=s?s.type:void 0,l="selectionchange"===o,c=!tt$3&&(l||"beforeinput"===o||"compositionstart"===o||"compositionend"===o||"click"===o&&s&&3===s.detail||"drop"===o||void 0===o);let a,u,f,d;if(cr(t)&&!c)return t.clone();if(null===e)return null;if(a=e.anchorNode,u=e.focusNode,f=e.anchorOffset,d=e.focusOffset,l&&cr(t)&&!Hi(n,a,u))return t.clone();const h=xr(a,f,u,d,n,t);if(null===h)return null;const[g,_]=h;return new ar(g,_,cr(t)?t.format:0,cr(t)?t.style:"")}function Nr(){return Hr()._selection}function wr(){return qr()._editorState._selection}function Er(t,e,n,r=1){const i=t.anchor,s=t.focus,o=i.getNode(),l=s.getNode();if(!e.is(o)&&!e.is(l))return;const c=e.__key;if(t.isCollapsed()){const e=i.offset;if(n<=e&&r>0||n<e&&r<0){const n=Math.max(0,e+r);i.set(c,n,"element"),s.set(c,n,"element"),Mr(t);}}else {const o=t.isBackward(),l=o?s:i,a=l.getNode(),u=o?i:s,f=u.getNode();if(e.is(a)){const t=l.offset;(n<=t&&r>0||n<t&&r<0)&&l.set(c,Math.max(0,t+r),"element");}if(e.is(f)){const t=u.offset;(n<=t&&r>0||n<t&&r<0)&&u.set(c,Math.max(0,t+r),"element");}}Mr(t);}function Mr(t){const e=t.anchor,n=e.offset,r=t.focus,i=r.offset,s=e.getNode(),o=r.getNode();if(t.isCollapsed()){if(!di(s))return;const t=s.getChildrenSize(),i=n>=t,o=i?s.getChildAtIndex(t-1):s.getChildAtIndex(n);if(Qn(o)){let t=0;i&&(t=o.getTextContentSize()),e.set(o.__key,t,"text"),r.set(o.__key,t,"text");}}else {if(di(s)){const t=s.getChildrenSize(),r=n>=t,i=r?s.getChildAtIndex(t-1):s.getChildAtIndex(n);if(Qn(i)){let t=0;r&&(t=i.getTextContentSize()),e.set(i.__key,t,"text");}}if(di(o)){const t=o.getChildrenSize(),e=i>=t,n=e?o.getChildAtIndex(t-1):o.getChildAtIndex(i);if(Qn(n)){let t=0;e&&(t=n.getTextContentSize()),r.set(n.__key,t,"text");}}}}function Ar(t,e,n,r,i){let s=null,o=0,l=null;null!==r?(s=r.__key,Qn(r)?(o=r.getTextContentSize(),l="text"):di(r)&&(o=r.getChildrenSize(),l="element")):null!==i&&(s=i.__key,Qn(i)?l="text":di(i)&&(l="element")),null!==s&&null!==l?t.set(s,o,l):(o=e.getIndexWithinParent(),-1===o&&(o=n.getChildrenSize()),t.set(n.__key,o,"element"));}function Or(t,e,n,r,i){"text"===t.type?t.set(n,t.offset+(e?0:i),"text"):t.offset>r.getIndexWithinParent()&&t.set(t.key,t.offset-1,"element");}function Dr(t,e,n,r,i){try{t.setBaseAndExtent(e,n,r,i);}catch(t){}}function Pr(t,e,n,r,i,s,o){const l=r.anchorNode,c=r.focusNode,a=r.anchorOffset,u=r.focusOffset,f=document.activeElement;if(i.has(Ni)&&f!==s||null!==f&&Yi(f))return;if(!cr(e))return void(null!==t&&Hi(n,l,c)&&r.removeAllRanges());const d=e.anchor,h=e.focus,g=d.key,_=h.key,p=Js(n,g),y=Js(n,_),m=d.offset,x=h.offset,C=e.format,S=e.style,v=e.isCollapsed();let k=p,T=y,b=false;if("text"===d.type){k=es(p);const t=d.getNode();b=t.getFormat()!==C||t.getStyle()!==S;}else cr(t)&&"text"===t.anchor.type&&(b=true);var N,w,E,M,A;if(("text"===h.type&&(T=es(y)),null!==k&&null!==T)&&(v&&(null===t||b||cr(t)&&(t.format!==C||t.style!==S))&&(N=C,w=S,E=m,M=g,A=performance.now(),gn=[N,w,E,M,A]),a!==m||u!==x||l!==k||c!==T||"Range"===r.type&&v||(null!==f&&s.contains(f)||s.focus({preventScroll:true}),"element"===d.type))){if(Dr(r,k,m,T,x),!i.has(Ei)&&e.isCollapsed()&&null!==s&&s===document.activeElement){const t=cr(e)&&"element"===e.anchor.type?k.childNodes[m]||null:r.rangeCount>0?r.getRangeAt(0):null;if(null!==t){let e;if(t instanceof Text){const n=document.createRange();n.selectNode(t),e=n.getBoundingClientRect();}else e=t.getBoundingClientRect();!function(t,e,n){const r=$s(n),i=qs(r);if(null===r||null===i)return;let{top:s,bottom:o}=e,l=0,c=0,a=n;for(;null!==a;){const e=a===r.body;if(e)l=0,c=Gs(t).innerHeight;else {const t=a.getBoundingClientRect();l=t.top,c=t.bottom;}let n=0;if(s<l?n=-(l-s):o>c&&(n=o-c),0!==n)if(e)i.scrollBy(0,n);else {const t=a.scrollTop;a.scrollTop+=n;const e=a.scrollTop-t;s-=e,o-=e;}if(e)break;a=Us(a);}}(n,e,s);}}ln$1=true;}}function Fr(t){let e=Nr()||wr();null===e&&(e=_s().selectEnd()),e.insertNodes(t);}function Ir(e){let n=e;e.isCollapsed()||n.removeText();const r=Nr();cr(r)&&(n=r),cr(n)||t(161);const i=n.anchor;let s=i.getNode(),o=i.offset;for(;!po(s);){const t=s;if([s,o]=zr(s,o),t.is(s))break}return o}function zr(t,e){const n=t.getParent();if(!n){const t=Pi();return _s().append(t),t.select(),[_s(),0]}if(Qn(t)){const r=t.splitText(e);if(0===r.length)return [n,t.getIndexWithinParent()];const i=0===e?0:1;return [n,r[0].getIndexWithinParent()+i]}if(!di(t)||0===e)return [n,t.getIndexWithinParent()];const r=t.getChildAtIndex(e);if(r){const n=new ar(ir(t.__key,e,"element"),ir(t.__key,e,"element"),0,""),i=t.insertNewAfter(n);i&&i.append(r,...r.getNextSiblings());}return [n,t.getIndexWithinParent()+1]}function Kr(t,e,n,r,i="decorators-and-blocks"){if("move"===e&&"character"===r&&!t.isCollapsed()){const[e,r]=n===t.isBackward()?[t.focus,t.anchor]:[t.anchor,t.focus];return r.set(e.key,e.offset,e.type),true}const s=ol(t.focus,n?"previous":"next"),o="lineboundary"===r,l="move"===e;let c=s,a="decorators-and-blocks"===i;if(!pl(c)){for(const t of c){a=false;const{origin:e}=t;if(!_i(e)||e.isIsolated()||(c=t,!o||!e.isInline()))break}if(a)for(const t of Xo(s).iterNodeCarets("extend"===e?"shadowRoot":"root")){if(zo(t))t.origin.isInline()||(c=t);else {if(di(t.origin))continue;_i(t.origin)&&!t.origin.isInline()&&(c=t);}break}}if(c===s)return  false;if(l&&!o&&_i(c.origin)&&c.origin.isKeyboardSelectable()){const t=kr();return t.add(c.origin.getKey()),ys(t),true}return c=_l(c),l&&ll(t.anchor,c),ll(t.focus,c),a||!o}let Br=null,Rr=null,Wr=false,Jr=false,Ur=0;const $r={characterData:true,childList:true,subtree:true};function jr(){return Wr||null!==Br&&Br._readOnly}function Vr(){Wr&&t(13);}function Yr(){Ur>99&&t(14);}function Hr(){return null===Br&&t(195,Gr()),Br}function qr(){return null===Rr&&t(196,Gr()),Rr}function Gr(){let t=0;const e=new Set,n=Ji.version;if("undefined"!=typeof window)for(const r of document.querySelectorAll("[contenteditable]")){const i=Xi(r);if(qi(i))t++;else if(i){let t=String(i.constructor.version||"<0.17.1");t===n&&(t+=" (separately built, likely a bundler configuration issue)"),e.add(t);}}let r=` Detected on the page: ${t} compatible editor(s) with version ${n}`;return e.size&&(r+=` and incompatible editors with versions ${Array.from(e).join(", ")}`),r}function Xr(){return Rr}function Qr(e,n,r){const i=n.__type,s=function(e,n){const r=e._nodes.get(n);void 0===r&&t(30,n);return r}(e,i);let o=r.get(i);void 0===o&&(o=Array.from(s.transforms),r.set(i,o));const l=o.length;for(let t=0;t<l&&(o[t](n),n.isAttached());t++);}function Zr(t,e){return void 0!==t&&t.__key!==e&&t.isAttached()}function ti(t,e){if(!e)return;const n=t._updateTags;let r=e;Array.isArray(e)||(r=[e]);for(const t of r)n.add(t);}function ei(t){return ni(t,qr()._nodes)}function ni(e,n){const r=e.type,i=n.get(r);void 0===i&&t(17,r);const s=i.klass;e.type!==s.getType()&&t(18,s.name);const o=s.importJSON(e),l=e.children;if(di(o)&&Array.isArray(l))for(let t=0;t<l.length;t++){const e=ni(l[t],n);o.append(e);}return o}function ri(t,e,n){const r=Br,i=Wr,s=Rr;Br=e,Wr=true,Rr=t;try{return n()}finally{Br=r,Wr=i,Rr=s;}}function ii(t,e){const n=t._pendingEditorState,r=t._rootElement,i=t._headless||null===r;if(null===n)return;const s=t._editorState,o=s._selection,l=n._selection,c=t._dirtyType!==y$2,a=Br,u=Wr,f=Rr,h=t._updating,g=t._observer;let _=null;if(t._pendingEditorState=null,t._editorState=n,!i&&c&&null!==g){Rr=t,Br=n,Wr=false,t._updating=true;try{const e=t._dirtyType,r=t._dirtyElements,i=t._dirtyLeaves;g.disconnect(),_=ie(s,n,t,e,r,i);}catch(e){if(e instanceof Error&&t._onError(e),Jr)throw e;return Ri(t,null,r,n),at$2(t),t._dirtyType=x$1,Jr=true,ii(t,s),void(Jr=false)}finally{g.observe(r,$r),t._updating=h,Br=a,Wr=u,Rr=f;}}n._readOnly||(n._readOnly=true);const p=t._dirtyLeaves,m=t._dirtyElements,C=t._normalizedNodes,S=t._updateTags,v=t._deferred;c&&(t._dirtyType=y$2,t._cloneNotNeeded.clear(),t._dirtyLeaves=new Set,t._dirtyElements=new Map,t._normalizedNodes=new Set,t._updateTags=new Set),function(t,e){const n=t._decorators;let r=t._pendingDecorators||n;const i=e._nodeMap;let s;for(s in r)i.has(s)||(r===n&&(r=hs(t)),delete r[s]);}(t,n);const k=i?null:oo(Gs(t));if(t._editable&&null!==k&&(c||null===l||l.dirty)&&null!==r&&!S.has(Mi)){Rr=t,Br=n;try{if(null!==g&&g.disconnect(),c||null===l||l.dirty){const e=t._blockCursorElement;null!==e&&so(e,t,r),Pr(o,l,t,k,S,r);}!function(t,e,n){let r=t._blockCursorElement;if(cr(n)&&n.isCollapsed()&&"element"===n.anchor.type&&e.contains(document.activeElement)){const i=n.anchor,s=i.getNode(),o=i.offset;let l=!1,c=null;if(o===s.getChildrenSize()){io(s.getChildAtIndex(o-1))&&(l=!0);}else {const e=s.getChildAtIndex(o);if(null!==e&&io(e)){const n=e.getPreviousSibling();(null===n||io(n))&&(l=!0,c=t.getElementByKey(e.__key));}}if(l){const n=t.getElementByKey(s.__key);return null===r&&(t._blockCursorElement=r=function(t){const e=t.theme,n=document.createElement("div");n.contentEditable="false",n.setAttribute("data-lexical-cursor","true");let r=e.blockCursor;if(void 0!==r){if("string"==typeof r){const t=d$1(r);r=e.blockCursor=t;}void 0!==r&&n.classList.add(...r);}return n}(t._config)),e.style.caretColor="transparent",void(null===c?n.appendChild(r):n.insertBefore(r,c))}}null!==r&&so(r,t,e);}(t,r,l);}finally{null!==g&&g.observe(r,$r),Rr=f,Br=a;}}null!==_&&function(t,e,n,r,i){const s=Array.from(t._listeners.mutation),o=s.length;for(let t=0;t<o;t++){const[o,l]=s[t],c=e.get(l);void 0!==c&&o(c,{dirtyLeaves:r,prevEditorState:i,updateTags:n});}}(t,_,S,p,s),cr(l)||null===l||null!==o&&o.is(l)||t.dispatchCommand(le,void 0);const T=t._pendingDecorators;null!==T&&(t._decorators=T,t._pendingDecorators=null,si("decorator",t,true,T)),function(t,e,n){const r=gs(e),i=gs(n);r!==i&&si("textcontent",t,true,i);}(t,e||s,n),si("update",t,true,{dirtyElements:m,dirtyLeaves:p,editorState:n,mutatedNodes:_,normalizedNodes:C,prevEditorState:e||s,tags:S}),function(t,e){if(t._deferred=[],0!==e.length){const n=t._updating;t._updating=true;try{for(let t=0;t<e.length;t++)e[t]();}finally{t._updating=n;}}}(t,v),function(t){const e=t._updates;if(0!==e.length){const n=e.shift();if(n){const[e,r]=n;li(t,e,r);}}}(t);}function si(t,e,n,...r){const i=e._updating;e._updating=n;try{const n=Array.from(e._listeners[t]);for(let t=0;t<n.length;t++)n[t].apply(null,r);}finally{e._updating=i;}}function oi(e,n){const r=e._updates;let i=n||false;for(;0!==r.length;){const n=r.shift();if(n){const[r,s]=n;let o;if(void 0!==s){if(o=s.onUpdate,s.skipTransforms&&(i=true),s.discrete){const n=e._pendingEditorState;null===n&&t(191),n._flushSync=true;}o&&e._deferred.push(o),ti(e,s.tag);}r();}}return i}function li(e,n,r){const i=e._updateTags;let s,o=false,l=false;void 0!==r&&(s=r.onUpdate,ti(e,r.tag),o=r.skipTransforms||false,l=r.discrete||false),s&&e._deferred.push(s);const c=e._editorState;let a=e._pendingEditorState,u=false;(null===a||a._readOnly)&&(a=e._pendingEditorState=mi(a||c),u=true),a._flushSync=l;const f=Br,d=Wr,h=Rr,g=e._updating;Br=a,Wr=false,e._updating=true,Rr=e;const _=e._headless||null===e.getRootElement();try{u&&(_?null!==c._selection&&(a._selection=c._selection.clone()):a._selection=function(t,e){const n=t.getEditorState()._selection,r=oo(Gs(t));return cr(n)||null==n?br(n,r,t,e):n.clone()}(e,r&&r.event||null));const i=e._compositionKey;n(),o=oi(e,o),function(t,e){const n=e.getEditorState()._selection,r=t._selection;if(cr(r)){const t=r.anchor,e=r.focus;let i;if("text"===t.type&&(i=t.getNode(),i.selectionTransform(n,r)),"text"===e.type){const t=e.getNode();i!==t&&t.selectionTransform(n,r);}}}(a,e),e._dirtyType!==y$2&&(o?function(t,e){const n=e._dirtyLeaves,r=t._nodeMap;for(const t of n){const e=r.get(t);Qn(e)&&e.isAttached()&&e.isSimpleText()&&!e.isUnmergeable()&&St$2(e);}}(a,e):function(t,e){const n=e._dirtyLeaves,r=e._dirtyElements,i=t._nodeMap,s=cs(),o=new Map;let l=n,c=l.size,a=r,u=a.size;for(;c>0||u>0;){if(c>0){e._dirtyLeaves=new Set;for(const t of l){const r=i.get(t);Qn(r)&&r.isAttached()&&r.isSimpleText()&&!r.isUnmergeable()&&St$2(r),void 0!==r&&Zr(r,s)&&Qr(e,r,o),n.add(t);}if(l=e._dirtyLeaves,c=l.size,c>0){Ur++;continue}}e._dirtyLeaves=new Set,e._dirtyElements=new Map,a.delete("root")&&a.set("root",!0);for(const t of a){const n=t[0],l=t[1];if(r.set(n,l),!l)continue;const c=i.get(n);void 0!==c&&Zr(c,s)&&Qr(e,c,o);}l=e._dirtyLeaves,c=l.size,a=e._dirtyElements,u=a.size,Ur++;}e._dirtyLeaves=n,e._dirtyElements=r;}(a,e),oi(e),function(t,e,n,r){const i=t._nodeMap,s=e._nodeMap,o=[];for(const[t]of r){const e=s.get(t);void 0!==e&&(e.isAttached()||(di(e)&&Q$1(e,t,i,s,o,r),i.has(t)||r.delete(t),o.push(t)));}for(const t of o)s.delete(t);for(const t of n){const e=s.get(t);void 0===e||e.isAttached()||(i.has(t)||n.delete(t),s.delete(t));}}(c,a,e._dirtyLeaves,e._dirtyElements));i!==e._compositionKey&&(a._flushSync=!0);const s=a._selection;if(cr(s)){const e=a._nodeMap,n=s.anchor.key,r=s.focus.key;void 0!==e.get(n)&&void 0!==e.get(r)||t(19);}else ur(s)&&0===s._nodes.size&&(a._selection=null);}catch(t){return t instanceof Error&&e._onError(t),e._pendingEditorState=c,e._dirtyType=x$1,e._cloneNotNeeded.clear(),e._dirtyLeaves=new Set,e._dirtyElements.clear(),void ii(e)}finally{Br=f,Wr=d,Rr=h,e._updating=g,Ur=0;}const p=e._dirtyType!==y$2||e._deferred.length>0||function(t,e){const n=e.getEditorState()._selection,r=t._selection;if(null!==r){if(r.dirty||!r.is(n))return  true}else if(null!==n)return  true;return  false}(a,e);p?a._flushSync?(a._flushSync=false,ii(e)):u&&ji((()=>{ii(e);})):(a._flushSync=false,u&&(i.clear(),e._deferred=[],e._pendingEditorState=null));}function ci(t,e,n){Rr===t&&void 0===n?e():li(t,e,n);}class ai{constructor(t,e,n){this.element=t,this.before=e||null,this.after=n||null;}withBefore(t){return new ai(this.element,t,this.after)}withAfter(t){return new ai(this.element,this.before,t)}withElement(t){return this.element===t?this:new ai(t,this.before,this.after)}insertChild(e){const n=this.before||this.getManagedLineBreak();return null!==n&&n.parentElement!==this.element&&t(222),this.element.insertBefore(e,n),this}removeChild(e){return e.parentElement!==this.element&&t(223),this.element.removeChild(e),this}replaceChild(e,n){return n.parentElement!==this.element&&t(224),this.element.replaceChild(e,n),this}getFirstChild(){const t=this.after?this.after.nextSibling:this.element.firstChild;return t===this.before||t===this.getManagedLineBreak()?null:t}getManagedLineBreak(){return this.element.__lexicalLineBreak||null}setManagedLineBreak(t){if(null===t)this.removeManagedLineBreak();else {const e="decorator"===t&&(l||o);this.insertManagedLineBreak(e);}}removeManagedLineBreak(){const t=this.getManagedLineBreak();if(t){const e=this.element,n="IMG"===t.nodeName?t.nextSibling:null;n&&e.removeChild(n),e.removeChild(t),e.__lexicalLineBreak=void 0;}}insertManagedLineBreak(t){const e=this.getManagedLineBreak();if(e){if(t===("IMG"===e.nodeName))return;this.removeManagedLineBreak();}const n=this.element,r=this.before,i=document.createElement("br");if(n.insertBefore(i,r),t){const t=document.createElement("img");t.setAttribute("data-lexical-linebreak","true"),t.style.cssText="display: inline !important; border: 0px !important; margin: 0px !important;",t.alt="",n.insertBefore(t,i),n.__lexicalLineBreak=t;}else n.__lexicalLineBreak=i;}getFirstChildOffset(){let t=0;for(let e=this.after;null!==e;e=e.previousSibling)t++;return t}resolveChildIndex(t,e,n,r){if(n===this.element){const e=this.getFirstChildOffset();return [t,Math.min(e+t.getChildrenSize(),Math.max(e,r))]}const i=ui(e,n);i.push(r);const s=ui(e,this.element);let o=t.getIndexWithinParent();for(let t=0;t<s.length;t++){const e=i[t],n=s[t];if(void 0===e||e<n)break;if(e>n){o+=1;break}}return [t.getParentOrThrow(),o]}}function ui(e,n){const r=[];let i=n;for(;i!==e&&null!==i;i=n.parentNode){let t=0;for(let e=i.previousSibling;null!==e;e=e.previousSibling)t++;r.push(t);}return i!==e&&t(225),r.reverse()}class fi extends An{constructor(t){super(t),this.__first=null,this.__last=null,this.__size=0,this.__format=0,this.__style="",this.__indent=0,this.__dir=null,this.__textFormat=0,this.__textStyle="";}afterCloneFrom(t){super.afterCloneFrom(t),this.__first=t.__first,this.__last=t.__last,this.__size=t.__size,this.__indent=t.__indent,this.__format=t.__format,this.__style=t.__style,this.__dir=t.__dir,this.__textFormat=t.__textFormat,this.__textStyle=t.__textStyle;}getFormat(){return this.getLatest().__format}getFormatType(){const t=this.getFormat();return H$2[t]||""}getStyle(){return this.getLatest().__style}getIndent(){return this.getLatest().__indent}getChildren(){const t=[];let e=this.getFirstChild();for(;null!==e;)t.push(e),e=e.getNextSibling();return t}getChildrenKeys(){const t=[];let e=this.getFirstChild();for(;null!==e;)t.push(e.__key),e=e.getNextSibling();return t}getChildrenSize(){return this.getLatest().__size}isEmpty(){return 0===this.getChildrenSize()}isDirty(){const t=qr()._dirtyElements;return null!==t&&t.has(this.__key)}isLastChild(){const t=this.getLatest(),e=this.getParentOrThrow().getLastChild();return null!==e&&e.is(t)}getAllTextNodes(){const t=[];let e=this.getFirstChild();for(;null!==e;){if(Qn(e)&&t.push(e),di(e)){const n=e.getAllTextNodes();t.push(...n);}e=e.getNextSibling();}return t}getFirstDescendant(){let t=this.getFirstChild();for(;di(t);){const e=t.getFirstChild();if(null===e)break;t=e;}return t}getLastDescendant(){let t=this.getLastChild();for(;di(t);){const e=t.getLastChild();if(null===e)break;t=e;}return t}getDescendantByIndex(t){const e=this.getChildren(),n=e.length;if(t>=n){const t=e[n-1];return di(t)&&t.getLastDescendant()||t||null}const r=e[t];return di(r)&&r.getFirstDescendant()||r||null}getFirstChild(){const t=this.getLatest().__first;return null===t?null:as(t)}getFirstChildOrThrow(){const e=this.getFirstChild();return null===e&&t(45,this.__key),e}getLastChild(){const t=this.getLatest().__last;return null===t?null:as(t)}getLastChildOrThrow(){const e=this.getLastChild();return null===e&&t(96,this.__key),e}getChildAtIndex(t){const e=this.getChildrenSize();let n,r;if(t<e/2){for(n=this.getFirstChild(),r=0;null!==n&&r<=t;){if(r===t)return n;n=n.getNextSibling(),r++;}return null}for(n=this.getLastChild(),r=e-1;null!==n&&r>=t;){if(r===t)return n;n=n.getPreviousSibling(),r--;}return null}getTextContent(){let t="";const e=this.getChildren(),n=e.length;for(let r=0;r<n;r++){const i=e[r];t+=i.getTextContent(),di(i)&&r!==n-1&&!i.isInline()&&(t+=B$4);}return t}getTextContentSize(){let t=0;const e=this.getChildren(),n=e.length;for(let r=0;r<n;r++){const i=e[r];t+=i.getTextContentSize(),di(i)&&r!==n-1&&!i.isInline()&&(t+=B$4.length);}return t}getDirection(){return this.getLatest().__dir}getTextFormat(){return this.getLatest().__textFormat}hasFormat(t){if(""!==t){const e=Y$3[t];return !!(this.getFormat()&e)}return  false}hasTextFormat(t){const e=j$3[t];return !!(this.getTextFormat()&e)}getFormatFlags(t,e){return ns(this.getLatest().__textFormat,t,e)}getTextStyle(){return this.getLatest().__textStyle}select(t,e){Vr();const n=Nr();let r=t,i=e;const s=this.getChildrenSize();if(!this.canBeEmpty())if(0===t&&0===e){const t=this.getFirstChild();if(Qn(t)||di(t))return t.select(0,0)}else if(!(void 0!==t&&t!==s||void 0!==e&&e!==s)){const t=this.getLastChild();if(Qn(t)||di(t))return t.select()} void 0===r&&(r=s),void 0===i&&(i=s);const o=this.__key;return cr(n)?(n.anchor.set(o,r,"element"),n.focus.set(o,i,"element"),n.dirty=true,n):Sr(o,r,o,i,"element","element")}selectStart(){const t=this.getFirstDescendant();return t?t.selectStart():this.select()}selectEnd(){const t=this.getLastDescendant();return t?t.selectEnd():this.select()}clear(){const t=this.getWritable();return this.getChildren().forEach((t=>t.remove())),t}append(...t){return this.splice(this.getChildrenSize(),0,t)}setDirection(t){const e=this.getWritable();return e.__dir=t,e}setFormat(t){return this.getWritable().__format=""!==t?Y$3[t]:0,this}setStyle(t){return this.getWritable().__style=t||"",this}setTextFormat(t){const e=this.getWritable();return e.__textFormat=t,e}setTextStyle(t){const e=this.getWritable();return e.__textStyle=t,e}setIndent(t){return this.getWritable().__indent=t,this}splice(e,n,r){const i=r.length,s=this.getChildrenSize(),o=this.getWritable();e+n<=s||t(226,String(e),String(n),String(s));const l=o.__key,c=[],a=[],u=this.getChildAtIndex(e+n);let f=null,d=s-n+i;if(0!==e)if(e===s)f=this.getLastChild();else {const t=this.getChildAtIndex(e);null!==t&&(f=t.getPreviousSibling());}if(n>0){let e=null===f?this.getFirstChild():f.getNextSibling();for(let r=0;r<n;r++){null===e&&t(100);const n=e.getNextSibling(),r=e.__key;ss(e.getWritable()),a.push(r),e=n;}}let h=f;for(let e=0;e<i;e++){const n=r[e];null!==h&&n.is(h)&&(f=h=h.getPreviousSibling());const i=n.getWritable();i.__parent===l&&d--,ss(i);const s=n.__key;if(null===h)o.__first=s,i.__prev=null;else {const t=h.getWritable();t.__next=s,i.__prev=t.__key;}n.__key===l&&t(76),i.__parent=l,c.push(s),h=n;}if(e+n===s){if(null!==h){h.getWritable().__next=null,o.__last=h.__key;}}else if(null!==u){const t=u.getWritable();if(null!==h){const e=h.getWritable();t.__prev=h.__key,e.__next=u.__key;}else t.__prev=null;}if(o.__size=d,a.length){const t=Nr();if(cr(t)){const e=new Set(a),n=new Set(c),{anchor:r,focus:i}=t;hi(r,e,n)&&Ar(r,r.getNode(),this,f,u),hi(i,e,n)&&Ar(i,i.getNode(),this,f,u),0!==d||this.canBeEmpty()||Zs(this)||this.remove();}}return o}getDOMSlot(t){return new ai(t)}exportDOM(t){const{element:e}=super.exportDOM(t);if(uo(e)){const t=this.getIndent();t>0&&(e.style.paddingInlineStart=40*t+"px");const n=this.getDirection();n&&(e.dir=n);}return {element:e}}exportJSON(){const t={children:[],direction:this.getDirection(),format:this.getFormatType(),indent:this.getIndent(),...super.exportJSON()},e=this.getTextFormat(),n=this.getTextStyle();return 0!==e&&(t.textFormat=e),""!==n&&(t.textStyle=n),t}updateFromJSON(t){return super.updateFromJSON(t).setFormat(t.format).setIndent(t.indent).setDirection(t.direction).setTextFormat(t.textFormat||0).setTextStyle(t.textStyle||"")}insertNewAfter(t,e){return null}canIndent(){return  true}collapseAtStart(t){return  false}excludeFromCopy(t){return  false}canReplaceWith(t){return  true}canInsertAfter(t){return  true}canBeEmpty(){return  true}canInsertTextBefore(){return  true}canInsertTextAfter(){return  true}isInline(){return  false}isShadowRoot(){return  false}canMergeWith(t){return  false}extractWithChild(t,e,n){return  false}canMergeWhenEmpty(){return  false}reconcileObservedMutation(t,e){const n=this.getDOMSlot(t);let r=n.getFirstChild();for(let t=this.getFirstChild();t;t=t.getNextSibling()){const i=e.getElementByKey(t.getKey());null!==i&&(null==r?(n.insertChild(i),r=i):r!==i&&n.replaceChild(i,r),r=r.nextSibling);}}}function di(t){return t instanceof fi}function hi(t,e,n){let r=t.getNode();for(;r;){const t=r.__key;if(e.has(t)&&!n.has(t))return  true;r=r.getParent();}return  false}class gi extends An{decorate(e,n){t(47);}isIsolated(){return  false}isInline(){return  true}isKeyboardSelectable(){return  true}}function _i(t){return t instanceof gi}class pi extends fi{static getType(){return "root"}static clone(){return new pi}constructor(){super("root"),this.__cachedText=null;}getTopLevelElementOrThrow(){t(51);}getTextContent(){const t=this.__cachedText;return !jr()&&qr()._dirtyType!==y$2||null===t?super.getTextContent():t}remove(){t(52);}replace(e){t(53);}insertBefore(e){t(54);}insertAfter(e){t(55);}updateDOM(t,e){return  false}splice(e,n,r){for(const e of r)di(e)||_i(e)||t(282);return super.splice(e,n,r)}static importJSON(t){return _s().updateFromJSON(t)}collapseAtStart(){return  true}}function yi(t){return t instanceof pi}function mi(t){return new Si(new Map(t._nodeMap))}function xi(){return new Si(new Map([["root",new pi]]))}function Ci(e){const n=e.exportJSON(),r=e.constructor;if(n.type!==r.getType()&&t(130,r.name),di(e)){const i=n.children;Array.isArray(i)||t(59,r.name);const s=e.getChildren();for(let t=0;t<s.length;t++){const e=Ci(s[t]);i.push(e);}}return n}class Si{constructor(t,e){this._nodeMap=t,this._selection=e||null,this._flushSync=false,this._readOnly=false;}isEmpty(){return 1===this._nodeMap.size&&null===this._selection}read(t,e){return ri(e&&e.editor||null,this,t)}clone(t){const e=new Si(this._nodeMap,void 0===t?this._selection:t);return e._readOnly=true,e}toJSON(){return ri(null,this,(()=>({root:Ci(_s())})))}}const vi="historic",Ti="history-merge",bi="paste",Ni="collaboration",Ei="skip-scroll-into-view",Mi="skip-dom-selection";class Ai extends fi{static getType(){return "artificial"}createDOM(t){return document.createElement("div")}}class Oi extends fi{static getType(){return "paragraph"}static clone(t){return new Oi(t.__key)}createDOM(t){const e=document.createElement("p"),n=Fs(t.theme,"paragraph");if(void 0!==n){e.classList.add(...n);}return e}updateDOM(t,e,n){return  false}static importDOM(){return {p:t=>({conversion:Di,priority:0})}}exportDOM(t){const{element:e}=super.exportDOM(t);if(uo(e)){this.isEmpty()&&e.append(document.createElement("br"));const t=this.getFormatType();e.style.textAlign=t;}return {element:e}}static importJSON(t){return Pi().updateFromJSON(t)}exportJSON(){return {...super.exportJSON(),textFormat:this.getTextFormat(),textStyle:this.getTextStyle()}}insertNewAfter(t,e){const n=Pi();n.setTextFormat(t.format),n.setTextStyle(t.style);const r=this.getDirection();return n.setDirection(r),n.setFormat(this.getFormatType()),n.setStyle(this.getStyle()),this.insertAfter(n,e),n}collapseAtStart(){const t=this.getChildren();if(0===t.length||Qn(t[0])&&""===t[0].getTextContent().trim()){if(null!==this.getNextSibling())return this.selectNext(),this.remove(),true;if(null!==this.getPreviousSibling())return this.selectPrevious(),this.remove(),true}return  false}}function Di(t){const e=Pi();return t.style&&(e.setFormat(t.style.textAlign),ko(t,e)),{node:e}}function Pi(){return eo(new Oi)}function Fi(t){return t instanceof Oi}const Li=0,Ii=1,Bi=4;function Ri(t,e,n,r){const i=t._keyToDOMMap;i.clear(),t._editorState=xi(),t._pendingEditorState=r,t._compositionKey=null,t._dirtyType=y$2,t._cloneNotNeeded.clear(),t._dirtyLeaves=new Set,t._dirtyElements.clear(),t._normalizedNodes=new Set,t._updateTags=new Set,t._updates=[],t._blockCursorElement=null;const s=t._observer;null!==s&&(s.disconnect(),t._observer=null),null!==e&&(e.textContent=""),null!==n&&(n.textContent="",i.set("root",n));}function Wi(t){const e=t||{},n=Xr(),r=e.theme||{},i=void 0===t?n:e.parentEditor||null,s=e.disableEvents||false,o=xi(),l=e.namespace||(null!==i?i._config.namespace:vs()),c=e.editorState,a=[pi,Jn,On,tr,Oi,Ai,...e.nodes||[]],{onError:u,html:f}=e,d=void 0===e.editable||e.editable;let h;if(void 0===t&&null!==n)h=n._nodes;else {h=new Map;for(let t=0;t<a.length;t++){let e=a[t],n=null,r=null;if("function"!=typeof e){const t=e;e=t.replace,n=t.with,r=t.withKlass||null;}const i=e.getType(),s=e.transform(),o=new Set;null!==s&&o.add(s),h.set(i,{exportDOM:f&&f.export?f.export.get(e):void 0,klass:e,replace:n,replaceWithKlass:r,transforms:o});}}const g=new Ji(o,i,h,{disableEvents:s,namespace:l,theme:r},u||console.error,function(t,e){const n=new Map,r=new Set,i=t=>{Object.keys(t).forEach((e=>{let r=n.get(e);void 0===r&&(r=[],n.set(e,r)),r.push(t[e]);}));};return t.forEach((t=>{const e=t.klass.importDOM;if(null==e||r.has(e))return;r.add(e);const n=e.call(t.klass);null!==n&&i(n);})),e&&i(e),n}(h,f?f.import:void 0),d,t);return void 0!==c&&(g._pendingEditorState=c,g._dirtyType=x$1),g}class Ji{constructor(t,e,n,r,i,s,o,l){this._createEditorArgs=l,this._parentEditor=e,this._rootElement=null,this._editorState=t,this._pendingEditorState=null,this._compositionKey=null,this._deferred=[],this._keyToDOMMap=new Map,this._updates=[],this._updating=false,this._listeners={decorator:new Set,editable:new Set,mutation:new Map,root:new Set,textcontent:new Set,update:new Set},this._commands=new Map,this._config=r,this._nodes=n,this._decorators={},this._pendingDecorators=null,this._dirtyType=y$2,this._cloneNotNeeded=new Set,this._dirtyLeaves=new Set,this._dirtyElements=new Map,this._normalizedNodes=new Set,this._updateTags=new Set,this._observer=null,this._key=vs(),this._onError=i,this._htmlConversions=s,this._editable=o,this._headless=null!==e&&e._headless,this._window=null,this._blockCursorElement=null;}isComposing(){return null!=this._compositionKey}registerUpdateListener(t){const e=this._listeners.update;return e.add(t),()=>{e.delete(t);}}registerEditableListener(t){const e=this._listeners.editable;return e.add(t),()=>{e.delete(t);}}registerDecoratorListener(t){const e=this._listeners.decorator;return e.add(t),()=>{e.delete(t);}}registerTextContentListener(t){const e=this._listeners.textcontent;return e.add(t),()=>{e.delete(t);}}registerRootListener(t){const e=this._listeners.root;return t(this._rootElement,null),e.add(t),()=>{t(null,this._rootElement),e.delete(t);}}registerCommand(e,n,r){ void 0===r&&t(35);const i=this._commands;i.has(e)||i.set(e,[new Set,new Set,new Set,new Set,new Set]);const s=i.get(e);void 0===s&&t(36,String(e));const o=s[r];return o.add(n),()=>{o.delete(n),s.every((t=>0===t.size))&&i.delete(e);}}registerMutationListener(t,e,n){const r=this.resolveRegisteredNodeAfterReplacements(this.getRegisteredNode(t)).klass,i=this._listeners.mutation;i.set(e,r);const s=n&&n.skipInitialization;return void 0!==s&&s||this.initializeMutationListener(e,r),()=>{i.delete(e);}}getRegisteredNode(e){const n=this._nodes.get(e.getType());return void 0===n&&t(37,e.name),n}resolveRegisteredNodeAfterReplacements(t){for(;t.replaceWithKlass;)t=this.getRegisteredNode(t.replaceWithKlass);return t}initializeMutationListener(t,e){const n=this._editorState,r=So(n).get(e.getType());if(!r)return;const i=new Map;for(const t of r.keys())i.set(t,"created");i.size>0&&t(i,{dirtyLeaves:new Set,prevEditorState:n,updateTags:new Set(["registerMutationListener"])});}registerNodeTransformToKlass(t,e){const n=this.getRegisteredNode(t);return n.transforms.add(e),n}registerNodeTransform(t,e){const n=this.registerNodeTransformToKlass(t,e),r=[n],i=n.replaceWithKlass;if(null!=i){const t=this.registerNodeTransformToKlass(i,e);r.push(t);}return function(t,e){const n=So(t.getEditorState()),r=[];for(const t of e){const e=n.get(t);e&&r.push(e);}if(0===r.length)return;t.update((()=>{for(const t of r)for(const e of t.keys()){const t=as(e);t&&t.markDirty();}}),null===t._pendingEditorState?{tag:Ti}:void 0);}(this,r.map((t=>t.klass.getType()))),()=>{r.forEach((t=>t.transforms.delete(e)));}}hasNode(t){return this._nodes.has(t.getType())}hasNodes(t){return t.every(this.hasNode.bind(this))}dispatchCommand(t,e){return Rs(this,t,e)}getDecorators(){return this._decorators}getRootElement(){return this._rootElement}getKey(){return this._key}setRootElement(t){const e=this._rootElement;if(t!==e){const n=Fs(this._config.theme,"root"),r=this._pendingEditorState||this._editorState;if(this._rootElement=t,Ri(this,e,t,r),null!==e&&(this._config.disableEvents||En(e),null!=n&&e.classList.remove(...n)),null!==t){const e=qs(t),r=t.style;r.userSelect="text",r.whiteSpace="pre-wrap",r.wordBreak="break-word",t.setAttribute("data-lexical-editor","true"),this._window=e,this._dirtyType=x$1,at$2(this),this._updateTags.add(Ti),ii(this),this._config.disableEvents||function(t,e){const n=t.ownerDocument,r=on$1.get(n);(void 0===r||r<1)&&n.addEventListener("selectionchange",Tn),on$1.set(n,(r||0)+1),t.__lexicalEditor=e;const i=vn(t);for(let n=0;n<tn.length;n++){const[r,s]=tn[n],o="function"==typeof s?t=>{Nn(t)||(bn(t),(e.isEditable()||"click"===r)&&s(t,e));}:t=>{if(Nn(t))return;bn(t);const n=e.isEditable();switch(r){case "cut":return n&&Rs(e,Ue,t);case "copy":return Rs(e,Je,t);case "paste":return n&&Rs(e,ge,t);case "dragstart":return n&&Rs(e,Be,t);case "dragover":return n&&Rs(e,Re$1,t);case "dragend":return n&&Rs(e,We,t);case "focus":return n&&Rs(e,qe,t);case "blur":return n&&Rs(e,Ge,t);case "drop":return n&&Rs(e,ze,t)}};t.addEventListener(r,o),i.push((()=>{t.removeEventListener(r,o);}));}}(t,this),null!=n&&t.classList.add(...n);}else this._window=null,this._updateTags.add(Ti),ii(this);si("root",this,false,t,e);}}getElementByKey(t){return this._keyToDOMMap.get(t)||null}getEditorState(){return this._editorState}setEditorState(e,n){e.isEmpty()&&t(38);let r=e;r._readOnly&&(r=mi(e),r._selection=e._selection?e._selection.clone():null),ct$4(this);const i=this._pendingEditorState,s=this._updateTags,o=void 0!==n?n.tag:null;null===i||i.isEmpty()||(null!=o&&s.add(o),ii(this)),this._pendingEditorState=r,this._dirtyType=x$1,this._dirtyElements.set("root",false),this._compositionKey=null,null!=o&&s.add(o),this._updating||ii(this);}parseEditorState(t,e){return function(t,e,n){const r=xi(),i=Br,s=Wr,o=Rr,l=e._dirtyElements,c=e._dirtyLeaves,a=e._cloneNotNeeded,u=e._dirtyType;e._dirtyElements=new Map,e._dirtyLeaves=new Set,e._cloneNotNeeded=new Set,e._dirtyType=0,Br=r,Wr=false,Rr=e;try{const i=e._nodes;ni(t.root,i),n&&n(),r._readOnly=!0;}catch(t){t instanceof Error&&e._onError(t);}finally{e._dirtyElements=l,e._dirtyLeaves=c,e._cloneNotNeeded=a,e._dirtyType=u,Br=i,Wr=s,Rr=o;}return r}("string"==typeof t?JSON.parse(t):t,this,e)}read(t){return ii(this),this.getEditorState().read(t,{editor:this})}update(t,e){!function(t,e,n){t._updating?t._updates.push([e,n]):li(t,e,n);}(this,t,e);}focus(t,e={}){const n=this._rootElement;null!==n&&(n.setAttribute("autocapitalize","off"),ci(this,(()=>{const r=Nr(),i=_s();null!==r?r.dirty||ys(r.clone()):0!==i.getChildrenSize()&&("rootStart"===e.defaultSelection?i.selectStart():i.selectEnd()),Vs("focus"),Ys((()=>{n.removeAttribute("autocapitalize"),t&&t();}));})),null===this._pendingEditorState&&n.removeAttribute("autocapitalize"));}blur(){const t=this._rootElement;null!==t&&t.blur();const e=oo(this._window);null!==e&&e.removeAllRanges();}isEditable(){return this._editable}setEditable(t){this._editable!==t&&(this._editable=t,si("editable",this,true,t));}toJSON(){return {editorState:this._editorState.toJSON()}}}Ji.version="0.31.1+prod.esm";let Ui=1;const ji="function"==typeof queueMicrotask?queueMicrotask:t=>{Promise.resolve().then(t);};function Vi(t){return _i(ds(t))}function Yi(t){const e=document.activeElement;if(!uo(e))return  false;const n=e.nodeName;return _i(ds(t))&&("INPUT"===n||"TEXTAREA"===n||"true"===e.contentEditable&&null==Xi(e))}function Hi(t,e,n){const r=t.getRootElement();try{return null!==r&&r.contains(e)&&r.contains(n)&&null!==e&&!Yi(e)&&Gi(e)===t}catch(t){return  false}}function qi(t){return t instanceof Ji}function Gi(t){let e=t;for(;null!=e;){const t=Xi(e);if(qi(t))return t;e=Us(e);}return null}function Xi(t){return t?t.__lexicalEditor:null}function Qi(t){return t.isToken()||t.isSegmented()}function Zi(t){return fo(t)&&t.nodeType===g$2}function ts(t){return fo(t)&&t.nodeType===_$1}function es(t){let e=t;for(;null!=e;){if(Zi(e))return e;e=e.firstChild;}return null}function ns(t,e,n){const r=j$3[e];if(null!==n&&(t&r)==(n&r))return t;let i=t^r;return "subscript"===e?i&=-65:"superscript"===e?i&=-33:"lowercase"===e?(i&=-513,i&=-1025):"uppercase"===e?(i&=-257,i&=-1025):"capitalize"===e&&(i&=-257,i&=-513),i}function rs(t){return Qn(t)||Fn(t)||_i(t)}function is(t,e){if(null!=e)return void(t.__key=e);Vr(),Yr();const n=qr(),r=Hr(),i=""+Ui++;r._nodeMap.set(i,t),di(t)?n._dirtyElements.set(i,true):n._dirtyLeaves.add(i),n._cloneNotNeeded.add(i),n._dirtyType=m$1,t.__key=i;}function ss(t){const e=t.getParent();if(null!==e){const n=t.getWritable(),r=e.getWritable(),i=t.getPreviousSibling(),s=t.getNextSibling(),o=null!==s?s.__key:null,l=null!==i?i.__key:null,c=null!==i?i.getWritable():null,a=null!==s?s.getWritable():null;null===i&&(r.__first=o),null===s&&(r.__last=l),null!==c&&(c.__next=o),null!==a&&(a.__prev=l),n.__prev=null,n.__next=null,n.__parent=null,r.__size--;}}function os(t){Yr();const e=t.getLatest(),n=e.__parent,r=Hr(),i=qr(),s=r._nodeMap,o=i._dirtyElements;null!==n&&function(t,e,n){let r=t;for(;null!==r;){if(n.has(r))return;const t=e.get(r);if(void 0===t)break;n.set(r,false),r=t.__parent;}}(n,s,o);const l=e.__key;i._dirtyType=m$1,di(t)?o.set(l,true):i._dirtyLeaves.add(l);}function ls(t){Vr();const e=qr(),n=e._compositionKey;if(t!==n){if(e._compositionKey=t,null!==n){const t=as(n);null!==t&&t.getWritable();}if(null!==t){const e=as(t);null!==e&&e.getWritable();}}}function cs(){if(jr())return null;return qr()._compositionKey}function as(t,e){const n=(e||Hr())._nodeMap.get(t);return void 0===n?null:n}function us(t,e){const n=fs(t,qr());return void 0!==n?as(n,e):null}function fs(t,e){return t[`__lexicalKey_${e._key}`]}function ds(t,e){let n=t;for(;null!=n;){const t=us(n,e);if(null!==t)return t;n=Us(n);}return null}function hs(t){const e=t._decorators,n=Object.assign({},e);return t._pendingDecorators=n,n}function gs(t){return t.read((()=>_s().getTextContent()))}function _s(){return ps(Hr())}function ps(t){return t._nodeMap.get("root")}function ys(t){Vr();const e=Hr();null!==t&&(t.dirty=true,t.setCachedNodes(null)),e._selection=t;}function ms(t){const e=qr(),n=function(t,e){let n=t;for(;null!=n;){const t=fs(n,e);if(void 0!==t)return t;n=Us(n);}return null}(t,e);if(null===n){return t===e.getRootElement()?as("root"):null}return as(n)}function xs(t,e){return e?t.getTextContentSize():0}function Cs(t){return /[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(t)}function Ss(t){const e=[];let n=t;for(;null!==n;)e.push(n),n=n._parentEditor;return e}function vs(){return Math.random().toString(36).replace(/[^a-z]+/g,"").substring(0,5)}function ks(t){return Zi(t)?t.nodeValue:null}function Ts(t,e,n){const r=oo(Gs(e));if(null===r)return;const i=r.anchorNode;let{anchorOffset:s,focusOffset:o}=r;if(null!==i){let e=ks(i);const r=ds(i);if(null!==e&&Qn(r)){if(e===K$2&&n){const t=n.length;e=n,s=t,o=t;}null!==e&&bs(r,e,s,o,t);}}}function bs(t,e,n,r,i){let s=t;if(s.isAttached()&&(i||!s.isDirty())){const c=s.isComposing();let a=e;(c||i)&&e[e.length-1]===K$2&&(a=e.slice(0,-1));const u=s.getTextContent();if(i||a!==u){if(""===a){if(ls(null),o||l||f$1)s.remove();else {const t=qr();setTimeout((()=>{t.update((()=>{s.isAttached()&&s.remove();}));}),20);}return}const e=s.getParent(),i=wr(),u=s.getTextContentSize(),d=cs(),h=s.getKey();if(s.isToken()||null!==d&&h===d&&!c||cr(i)&&(null!==e&&!e.canInsertTextBefore()&&0===i.anchor.offset||i.anchor.key===t.__key&&0===i.anchor.offset&&!s.canInsertTextBefore()&&!c||i.focus.key===t.__key&&i.focus.offset===u&&!s.canInsertTextAfter()&&!c))return void s.markDirty();const g=Nr();if(!cr(g)||null===n||null===r)return void s.setTextContent(a);if(g.setTextNodeRange(s,n,s,r),s.isSegmented()){const t=Xn(s.getTextContent());s.replace(t),s=t;}s.setTextContent(a);}}}function Ns(t,e,n){const r=e[n]||false;return "any"===r||r===t[n]}function ws(t,e){return Ns(t,e,"altKey")&&Ns(t,e,"ctrlKey")&&Ns(t,e,"shiftKey")&&Ns(t,e,"metaKey")}function Es(t,e,n){return ws(t,n)&&t.key.toLowerCase()===e.toLowerCase()}const Ms={ctrlKey:!r,metaKey:r},As={altKey:r,ctrlKey:!r};function Os(t){return "Backspace"===t.key}function Ds(t){return Es(t,"a",Ms)}function Ps(t){const e=_s();if(cr(t)){const e=t.anchor,n=t.focus,r=e.getNode().getTopLevelElementOrThrow().getParentOrThrow();return e.set(r.getKey(),0,"element"),n.set(r.getKey(),r.getChildrenSize(),"element"),vt$3(t),t}{const t=e.select(0,e.getChildrenSize());return ys(vt$3(t)),t}}function Fs(t,e){ void 0===t.__lexicalClassNameCache&&(t.__lexicalClassNameCache={});const n=t.__lexicalClassNameCache,r=n[e];if(void 0!==r)return r;const i=t[e];if("string"==typeof i){const t=d$1(i);return n[e]=t,t}return i}function Ls(e,n,r,i,s){if(0===r.size)return;const o=i.__type,l=i.__key,c=n.get(o);void 0===c&&t(33,o);const a=c.klass;let u=e.get(a);void 0===u&&(u=new Map,e.set(a,u));const f=u.get(l),d="destroyed"===f&&"created"===s;(void 0===f||d)&&u.set(l,d?"updated":s);}function zs(t,e,n){const r=t.getParent();let i=n,s=t;return null!==r&&(e&&0===n?(i=s.getIndexWithinParent(),s=r):e||n!==s.getChildrenSize()||(i=s.getIndexWithinParent()+1,s=r)),s.getChildAtIndex(e?i-1:i)}function Ks(t,e){const n=t.offset;if("element"===t.type){return zs(t.getNode(),e,n)}{const r=t.getNode();if(e&&0===n||!e&&n===r.getTextContentSize()){const t=e?r.getPreviousSibling():r.getNextSibling();return null===t?zs(r.getParentOrThrow(),e,r.getIndexWithinParent()+(e?0:1)):t}}return null}function Bs(t){const e=Gs(t).event,n=e&&e.inputType;return "insertFromPaste"===n||"insertFromPasteAsQuotation"===n}function Rs(t,e,n){return function(t,e,n){const r=Ss(t);for(let i=4;i>=0;i--)for(let s=0;s<r.length;s++){const o=r[s],l=o._commands.get(e);if(void 0!==l){const e=l[i];if(void 0!==e){const r=Array.from(e),i=r.length;let s=false;if(ci(o,(()=>{for(let e=0;e<i;e++)if(r[e](n,t))return void(s=true)})),s)return s}}}return  false}(t,e,n)}function Ws(t){return !yi(t)&&!t.isLastChild()&&!t.isInline()}function Js(e,n){const r=e._keyToDOMMap.get(n);return void 0===r&&t(75,n),r}function Us(t){const e=t.assignedSlot||t.parentElement;return ho(e)?e.host:e}function $s(t){return ts(t)?t:uo(t)?t.ownerDocument:null}function Vs(t){Vr();qr()._updateTags.add(t);}function Ys(t){Vr();qr()._deferred.push(t);}function Hs(t,e){let n=t.getParent();for(;null!==n;){if(n.is(e))return  true;n=n.getParent();}return  false}function qs(t){const e=$s(t);return e?e.defaultView:null}function Gs(e){const n=e._window;return null===n&&t(78),n}function Xs(t){return di(t)&&t.isInline()||_i(t)&&t.isInline()}function Qs(t){let e=t.getParentOrThrow();for(;null!==e;){if(Zs(e))return e;e=e.getParentOrThrow();}return e}function Zs(t){return yi(t)||di(t)&&t.isShadowRoot()}function eo(e){const n=qr(),r=e.constructor.getType(),i=n._nodes.get(r);void 0===i&&t(200,e.constructor.name,r);const{replace:s,replaceWithKlass:o}=i;if(null!==s){const n=s(e),i=n.constructor;return null!==o?n instanceof o||t(201,o.name,o.getType(),i.name,i.getType(),e.constructor.name,r):n instanceof e.constructor&&i!==e.constructor||t(202,i.name,i.getType(),e.constructor.name,r),n.__key===e.__key&&t(203,e.constructor.name,r,i.name,i.getType()),n}return e}function no(e,n){!yi(e.getParent())||di(n)||_i(n)||t(99);}function ro(e){const n=as(e);return null===n&&t(63,e),n}function io(t){return (_i(t)||di(t)&&!t.canBeEmpty())&&!t.isInline()}function so(t,e,n){n.style.removeProperty("caret-color"),e._blockCursorElement=null;const r=t.parentElement;null!==r&&r.removeChild(t);}function oo(t){return e?(t||window).getSelection():null}function lo(t){const e=qs(t);return e?e.getSelection():null}function ao(t){return uo(t)&&"A"===t.tagName}function uo(t){return fo(t)&&t.nodeType===h$2}function fo(t){return "object"==typeof t&&null!==t&&"nodeType"in t&&"number"==typeof t.nodeType}function ho(t){return fo(t)&&t.nodeType===p$1}function go(t){const e=new RegExp(/^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|mark|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var|#text)$/,"i");return null!==t.nodeName.match(e)}function _o(t){const e=new RegExp(/^(address|article|aside|blockquote|canvas|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hr|li|main|nav|noscript|ol|p|pre|section|table|td|tfoot|ul|video)$/,"i");return null!==t.nodeName.match(e)}function po(t){if(_i(t)&&!t.isInline())return  true;if(!di(t)||Zs(t))return  false;const e=t.getFirstChild(),n=null===e||Fn(e)||Qn(e)||e.isInline();return !t.isInline()&&false!==t.canBeEmpty()&&n}function yo(t,e){let n=t;for(;null!==n&&null!==n.getParent()&&!e(n);)n=n.getParentOrThrow();return e(n)?n:null}function mo(){return qr()}const xo=new WeakMap,Co=new Map;function So(e){if(!e._readOnly&&e.isEmpty())return Co;e._readOnly||t(192);let n=xo.get(e);return n||(n=function(t){const e=new Map;for(const[n,r]of t._nodeMap){const t=r.__type;let i=e.get(t);i||(i=new Map,e.set(t,i)),i.set(n,r);}return e}(e),xo.set(e,n)),n}function vo(t){const e=t.constructor.clone(t);return e.afterCloneFrom(t),e}function ko(t,e){const n=parseInt(t.style.paddingInlineStart,10)||0,r=Math.round(n/40);e.setIndent(r);}function To(t){t.__lexicalUnmanaged=true;}function bo(t){return  true===t.__lexicalUnmanaged}const No={next:"previous",previous:"next"};class wo{constructor(t){this.origin=t;}[Symbol.iterator](){return tl({hasNext:Io,initial:this.getAdjacentCaret(),map:t=>t,step:t=>t.getAdjacentCaret()})}getAdjacentCaret(){return Wo(this.getNodeAtCaret(),this.direction)}getSiblingCaret(){return Wo(this.origin,this.direction)}remove(){const t=this.getNodeAtCaret();return t&&t.remove(),this}replaceOrInsert(t,e){const n=this.getNodeAtCaret();return t.is(this.origin)||t.is(n)||(null===n?this.insert(t):n.replace(t,e)),this}splice(e,n,r="next"){const i=r===this.direction?n:Array.from(n).reverse();let s=this;const o=this.getParentAtCaret(),l=new Map;for(let t=s.getAdjacentCaret();null!==t&&l.size<e;t=t.getAdjacentCaret()){const e=t.origin.getWritable();l.set(e.getKey(),e);}for(const e of i){if(l.size>0){const n=s.getNodeAtCaret();if(n)if(l.delete(n.getKey()),l.delete(e.getKey()),n.is(e)||s.origin.is(e));else {const t=e.getParent();t&&t.is(o)&&e.remove(),n.replace(e);}else null===n&&t(263,Array.from(l).join(" "));}else s.insert(e);s=Wo(e,this.direction);}for(const t of l.values())t.remove();return this}}class Eo extends wo{type="child";getLatest(){const t=this.origin.getLatest();return t===this.origin?this:jo(t,this.direction)}getParentCaret(t="root"){return Wo(Oo(this.getParentAtCaret(),t),this.direction)}getFlipped(){const t=Ao(this.direction);return Wo(this.getNodeAtCaret(),t)||jo(this.origin,t)}getParentAtCaret(){return this.origin}getChildCaret(){return this}isSameNodeCaret(t){return t instanceof Eo&&this.direction===t.direction&&this.origin.is(t.origin)}isSamePointCaret(t){return this.isSameNodeCaret(t)}}const Mo={root:yi,shadowRoot:Zs};function Ao(t){return No[t]}function Oo(t,e="root"){return Mo[e](t)?null:t}class Do extends wo{type="sibling";getLatest(){const t=this.origin.getLatest();return t===this.origin?this:Wo(t,this.direction)}getSiblingCaret(){return this}getParentAtCaret(){return this.origin.getParent()}getChildCaret(){return di(this.origin)?jo(this.origin,this.direction):null}getParentCaret(t="root"){return Wo(Oo(this.getParentAtCaret(),t),this.direction)}getFlipped(){const t=Ao(this.direction);return Wo(this.getNodeAtCaret(),t)||jo(this.origin.getParentOrThrow(),t)}isSamePointCaret(t){return t instanceof Do&&this.direction===t.direction&&this.origin.is(t.origin)}isSameNodeCaret(t){return (t instanceof Do||t instanceof Po)&&this.direction===t.direction&&this.origin.is(t.origin)}}class Po extends wo{type="text";constructor(t,e){super(t),this.offset=e;}getLatest(){const t=this.origin.getLatest();return t===this.origin?this:Jo(t,this.direction,this.offset)}getParentAtCaret(){return this.origin.getParent()}getChildCaret(){return null}getParentCaret(t="root"){return Wo(Oo(this.getParentAtCaret(),t),this.direction)}getFlipped(){return Jo(this.origin,Ao(this.direction),this.offset)}isSamePointCaret(t){return t instanceof Po&&this.direction===t.direction&&this.origin.is(t.origin)&&this.offset===t.offset}isSameNodeCaret(t){return (t instanceof Do||t instanceof Po)&&this.direction===t.direction&&this.origin.is(t.origin)}getSiblingCaret(){return Wo(this.origin,this.direction)}}function Fo(t){return t instanceof Po}function Io(t){return t instanceof Do}function zo(t){return t instanceof Eo}const Ko={next:class extends Po{direction="next";getNodeAtCaret(){return this.origin.getNextSibling()}insert(t){return this.origin.insertAfter(t),this}},previous:class extends Po{direction="previous";getNodeAtCaret(){return this.origin.getPreviousSibling()}insert(t){return this.origin.insertBefore(t),this}}},Bo={next:class extends Do{direction="next";getNodeAtCaret(){return this.origin.getNextSibling()}insert(t){return this.origin.insertAfter(t),this}},previous:class extends Do{direction="previous";getNodeAtCaret(){return this.origin.getPreviousSibling()}insert(t){return this.origin.insertBefore(t),this}}},Ro={next:class extends Eo{direction="next";getNodeAtCaret(){return this.origin.getFirstChild()}insert(t){return this.origin.splice(0,0,[t]),this}},previous:class extends Eo{direction="previous";getNodeAtCaret(){return this.origin.getLastChild()}insert(t){return this.origin.splice(this.origin.getChildrenSize(),0,[t]),this}}};function Wo(t,e){return t?new Bo[e](t):null}function Jo(t,e,n){return t?new Ko[e](t,Uo(t,n)):null}function Uo(t,e){const n=t.getTextContentSize();let r="next"===e?n:"previous"===e?0:e;return (r<0||r>n)&&(!function(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const t of e)r.append("v",t);n.search=r.toString(),console.warn(`Minified Lexical warning #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);}(284,String(e),String(n),t.getKey()),r=r<0?0:n),r}function $o(t,e){return new qo(t,e)}function jo(t,e){return di(t)?new Ro[e](t):null}function Vo(t){return t&&t.getChildCaret()||t}function Yo(t){return t&&Vo(t.getAdjacentCaret())}class Ho{type="node-caret-range";constructor(t,e,n){this.anchor=t,this.focus=e,this.direction=n;}getLatest(){const t=this.anchor.getLatest(),e=this.focus.getLatest();return t===this.anchor&&e===this.focus?this:new Ho(t,e,this.direction)}isCollapsed(){return this.anchor.isSamePointCaret(this.focus)}getTextSlices(){const t=t=>{const e=this[t].getLatest();return Fo(e)?function(t,e){const{direction:n,origin:r}=t,i=Uo(r,"focus"===e?Ao(n):n);return $o(t,i-t.offset)}(e,t):null},e=t("anchor"),n=t("focus");if(e&&n){const{caret:t}=e,{caret:r}=n;if(t.isSameNodeCaret(r))return [$o(t,r.offset-t.offset),null]}return [e,n]}iterNodeCarets(t="root"){const e=Fo(this.anchor)?this.anchor.getSiblingCaret():this.anchor.getLatest(),n=this.focus.getLatest(),r=Fo(n),i=e=>e.isSameNodeCaret(n)?null:Yo(e)||e.getParentCaret(t);return tl({hasNext:t=>null!==t&&!(r&&n.isSameNodeCaret(t)),initial:e.isSameNodeCaret(n)?null:i(e),map:t=>t,step:i})}[Symbol.iterator](){return this.iterNodeCarets("root")}}class qo{type="slice";constructor(t,e){this.caret=t,this.distance=e;}getSliceIndices(){const{distance:t,caret:{offset:e}}=this,n=e+t;return n<e?[n,e]:[e,n]}getTextContent(){const[t,e]=this.getSliceIndices();return this.caret.origin.getTextContent().slice(t,e)}getTextContentSize(){return Math.abs(this.distance)}removeTextSlice(){const{caret:{origin:t,direction:e}}=this,[n,r]=this.getSliceIndices(),i=t.getTextContent();return Jo(t.setTextContent(i.slice(0,n)+i.slice(r)),e,n)}}function Xo(t){return Zo(t,Wo(_s(),t.direction))}function Qo(t){return Zo(t,t)}function Zo(e,n){return e.direction!==n.direction&&t(265),new Ho(e,n,e.direction)}function tl(t){const{initial:e,hasNext:n,step:r,map:i}=t;let s=e;return {[Symbol.iterator](){return this},next(){if(!n(s))return {done:true,value:void 0};const t={done:false,value:i(s)};return s=r(s),t}}}function el(e,n){const r=sl(e.origin,n.origin);switch(null===r&&t(275,e.origin.getKey(),n.origin.getKey()),r.type){case "same":{const t="text"===e.type,r="text"===n.type;return t&&r?function(t,e){return Math.sign(t-e)}(e.offset,n.offset):e.type===n.type?0:t?-1:r?1:"child"===e.type?-1:1}case "ancestor":return "child"===e.type?-1:1;case "descendant":return "child"===n.type?1:-1;case "branch":return nl(r)}}function nl(t){const{a:e,b:n}=t,r=e.__key,i=n.__key;let s=e,o=n;for(;s&&o;s=s.getNextSibling(),o=o.getNextSibling()){if(s.__key===i)return  -1;if(o.__key===r)return 1}return null===s?1:-1}function rl(t,e){return e.is(t)}function il(t){return di(t)?[t.getLatest(),null]:[t.getParent(),t.getLatest()]}function sl(e,n){if(e.is(n))return {commonAncestor:e,type:"same"};const r=new Map;for(let[t,n]=il(e);t;n=t,t=t.getParent())r.set(t,n);for(let[i,s]=il(n);i;s=i,i=i.getParent()){const o=r.get(i);if(void 0!==o)return null===o?(rl(e,i)||t(276),{commonAncestor:i,type:"ancestor"}):null===s?(rl(n,i)||t(277),{commonAncestor:i,type:"descendant"}):((di(o)||rl(e,o))&&(di(s)||rl(n,s))&&i.is(o.getParent())&&i.is(s.getParent())||t(278),{a:o,b:s,commonAncestor:i,type:"branch"})}return null}function ol(e,n){const{type:r,key:i,offset:s}=e,o=ro(e.key);return "text"===r?(Qn(o)||t(266,o.getType(),i),Jo(o,n,s)):(di(o)||t(267,o.getType(),i),xl(o,e.offset,n))}function ll(e,n){const{origin:r,direction:i}=n,s="next"===i;Fo(n)?e.set(r.getKey(),n.offset,"text"):Io(n)?Qn(r)?e.set(r.getKey(),Uo(r,i),"text"):e.set(r.getParentOrThrow().getKey(),r.getIndexWithinParent()+(s?1:0),"element"):(zo(n)&&di(r)||t(268),e.set(r.getKey(),s?0:r.getChildrenSize(),"element"));}function cl(t){const e=Nr(),n=cr(e)?e:vr();return al(n,t),ys(n),n}function al(t,e){ll(t.anchor,e.anchor),ll(t.focus,e.focus);}function ul(t){const{anchor:e,focus:n}=t,r=ol(e,"next"),i=ol(n,"next"),s=el(r,i)<=0?"next":"previous";return Zo(yl(r,s),yl(i,s))}function fl(t){const{direction:e,origin:n}=t,r=Wo(n,Ao(e)).getNodeAtCaret();return r?Wo(r,e):jo(n.getParentOrThrow(),e)}function dl(t,e="root"){const n=[t];for(let r=zo(t)?t.getParentCaret(e):t.getSiblingCaret();null!==r;r=r.getParentCaret(e))n.push(fl(r));return n}function hl(t){return !!t&&t.origin.isAttached()}function gl(e,n="removeEmptySlices"){if(e.isCollapsed())return e;const r="root",i="next";let s=n;const o=ml(e,i),l=dl(o.anchor,r),c=dl(o.focus.getFlipped(),r),a=new Set,u=[];for(const t of o.iterNodeCarets(r))if(zo(t))a.add(t.origin.getKey());else if(Io(t)){const{origin:e}=t;di(e)&&!a.has(e.getKey())||u.push(e);}for(const t of u)t.remove();for(const t of o.getTextSlices()){if(!t)continue;const{origin:e}=t.caret,n=e.getTextContentSize(),r=fl(Wo(e,i)),o=e.getMode();if(Math.abs(t.distance)===n&&"removeEmptySlices"===s||"token"===o&&0!==t.distance)r.remove();else if(0!==t.distance){s="removeEmptySlices";let e=t.removeTextSlice();const n=t.caret.origin;if("segmented"===o){const t=e.origin,n=Xn(t.getTextContent()).setStyle(t.getStyle()).setFormat(t.getFormat());r.replaceOrInsert(n),e=Jo(n,i,e.offset);}n.is(l[0].origin)&&(l[0]=e),n.is(c[0].origin)&&(c[0]=e.getFlipped());}}let f,d;for(const t of l)if(hl(t)){f=_l(t);break}for(const t of c)if(hl(t)){d=_l(t);break}const h=function(t,e,n){if(!t||!e)return null;const r=t.getParentAtCaret(),i=e.getParentAtCaret();if(!r||!i)return null;const s=r.getParents().reverse();s.push(r);const o=i.getParents().reverse();o.push(i);const l=Math.min(s.length,o.length);let c;for(c=0;c<l&&s[c]===o[c];c++);const a=(t,e)=>{let n;for(let r=c;r<t.length;r++){const i=t[r];if(Zs(i))return;!n&&e(i)&&(n=i);}return n},u=a(s,po),f=u&&a(o,(t=>n.has(t.getKey())&&po(t)));return u&&f?[u,f]:null}(f,d,a);if(h){const[t,e]=h;jo(t,"previous").splice(0,e.getChildren()),e.remove();}const g=[f,d,...l,...c].find(hl);if(g){return Qo(yl(_l(g),e.direction))}t(269,JSON.stringify(l.map((t=>t.origin.__key))));}function _l(t){const e=function(t){let e=t;for(;zo(e);){const t=Yo(e);if(!zo(t))break;e=t;}return e}(t.getLatest()),{direction:n}=e;if(Qn(e.origin))return Fo(e)?e:Jo(e.origin,n,n);const r=e.getAdjacentCaret();return Io(r)&&Qn(r.origin)?Jo(r.origin,n,Ao(n)):e}function pl(t){return Fo(t)&&t.offset!==Uo(t.origin,t.direction)}function yl(t,e){return t.direction===e?t:t.getFlipped()}function ml(t,e){return t.direction===e?t:Zo(yl(t.focus,e),yl(t.anchor,e))}function xl(t,e,n){let r=jo(t,"next");for(let t=0;t<e;t++){const t=r.getAdjacentCaret();if(null===t)break;r=t;}return yl(r,n)}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const C=new Map;function I$3(e){const t={};if(!e)return t;const n=e.split(";");for(const e of n)if(""!==e){const[n,o]=e.split(/:([^]+)/);n&&o&&(t[n.trim()]=o.trim());}return t}function B$3(e){let t=C.get(e);return void 0===t&&(t=I$3(e),C.set(e,t)),t}function b(e,n){const o=e.getStartEndPoints();if(n.isSelected(e)&&!n.isSegmented()&&!n.isToken()&&null!==o){const[r,l]=o,s=e.isBackward(),i=r.getNode(),c=l.getNode(),f=n.is(i),u=n.is(c);if(f||u){const[o,r]=dr(e),l=i.is(c),f=n.is(s?c:i),u=n.is(s?i:c);let g,a=0;if(l)a=o>r?r:o,g=o>r?o:r;else if(f){a=s?r:o,g=void 0;}else if(u){a=0,g=s?o:r;}return n.__text=n.__text.slice(a,g),n}}return n}function z$2(e){const t=e.getStyle(),n=I$3(t);C.set(t,n);}function W$1(e){const t=e.anchor.getNode(),n=yi(t)?t:t.getParentOrThrow(),r=mo().getElementByKey(n.getKey());if(null===r)return  false;const l=r.ownerDocument.defaultView;if(null===l)return  false;return "vertical-rl"===l.getComputedStyle(r).writingMode}function X$1(e,t){const o=W$1(e)?!t:t,r=ol(e.focus,o?"previous":"next");if(pl(r))return  false;for(const e of Xo(r)){if(zo(e))return !e.origin.isInline();if(!di(e.origin)){if(_i(e.origin))return  true;break}}return  false}function q$2(e,t,n,o){e.modify(t?"extend":"move",n,o);}function G$1(e){const t=e.anchor.getNode();return "rtl"===(yi(t)?t:t.getParentOrThrow()).getDirection()}function J$3(e,t,n){const o=G$1(e);let r;r=W$1(e)||o?!n:n,q$2(e,t,r,"character");}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function P$1(t,...e){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const t of e)o.append("v",t);throw n.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const M$4="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement,R$3=M$4&&"documentMode"in document?document.documentMode:null;!(!M$4||!("InputEvent"in window)||R$3)&&"getTargetRanges"in new window.InputEvent("input");function I$2(...t){const e=[];for(const n of t)if(n&&"string"==typeof n)for(const[t]of n.matchAll(/\S+/g))e.push(t);return e}function j$2(...t){return ()=>{for(let e=t.length-1;e>=0;e--)t[e]();t.length=0;}}function rt$2(t,...e){const n=I$2(...e);n.length>0&&t.classList.add(...n);}function it$3(t,...e){const n=I$2(...e);n.length>0&&t.classList.remove(...n);}function ct$3(t){return t?t.getAdjacentCaret():null}function vt$2(t,e){let n=t;for(;null!=n;){if(n instanceof e)return n;n=n.getParent();}return null}function yt$4(t){const e=wt$2(t,(t=>di(t)&&!t.isInline()));return di(e)||P$1(4,t.__key),e}const wt$2=(t,e)=>{let n=t;for(;n!==_s()&&null!=n;){if(e(n))return n;n=n.getParent();}return null};function Lt$1(t,e){return null!==t&&Object.getPrototypeOf(t).constructor.name===e.name}function _t$3(t,e){const n=[],r=Array.from(t).reverse();for(let t=r.pop();void 0!==t;t=r.pop())if(e(t))n.push(t);else if(di(t))for(const e of Kt(t))r.push(e);return n}function Kt(t){return Ht(jo(t,"previous"))}function Ht(t){return tl({hasNext:Io,initial:t.getAdjacentCaret(),map:t=>t.origin.getLatest(),step:t=>t.getAdjacentCaret()})}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function I$1(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const t of e)r.append("v",t);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function w$1(t){let e=1,n=t.getParent();for(;null!=n;){if(nt$2(n)){const t=n.getParent();if(at$1(t)){e++,n=t.getParent();continue}I$1(40);}return e}return e}function D$2(t){let e=t.getParent();at$1(e)||I$1(40);let n=e;for(;null!==n;)n=n.getParent(),at$1(n)&&(e=n);return e}function M$3(t){let e=[];const n=t.getChildren().filter(nt$2);for(let t=0;t<n.length;t++){const r=n[t],i=r.getFirstChild();at$1(i)?e=e.concat(M$3(i)):e.push(r);}return e}function R$2(t){return nt$2(t)&&at$1(t.getFirstChild())}function J$2(t){return et$2().append(t)}function B$2(t,e){return nt$2(t)&&(0===e.length||1===e.length&&t.is(e[0])&&0===t.getChildrenSize())}function W(t){const e=Nr();if(null!==e){let n=e.getNodes();if(cr(e)){const r=e.getStartEndPoints();null===r&&I$1(143);const[i]=r,s=i.getNode(),o=s.getParent();if(Zs(s)){const t=s.getFirstChild();if(t)n=t.selectStart().getNodes();else {const t=Pi();s.append(t),n=t.select().getNodes();}}else if(B$2(s,n)){const e=ct$2(t);if(Zs(o)){s.replace(e);const t=et$2();di(s)&&(t.setFormat(s.getFormatType()),t.setIndent(s.getIndent())),e.append(t);}else if(nt$2(s)){const t=s.getParentOrThrow();K$1(e,t.getChildren()),t.replace(e);}return}}const r=new Set;for(let e=0;e<n.length;e++){const i=n[e];if(di(i)&&i.isEmpty()&&!nt$2(i)&&!r.has(i.getKey())){U$1(i,t);continue}let s=rs(i)?i.getParent():nt$2(i)&&i.isEmpty()?i:null;for(;null!=s;){const e=s.getKey();if(at$1(s)){if(!r.has(e)){const n=ct$2(t);K$1(n,s.getChildren()),s.replace(n),r.add(e);}break}{const n=s.getParent();if(Zs(n)&&!r.has(e)){r.add(e),U$1(s,t);break}s=n;}}}}}function K$1(t,e){t.splice(t.getChildrenSize(),0,e);}function U$1(t,e){if(at$1(t))return t;const n=t.getPreviousSibling(),r=t.getNextSibling(),i=et$2();let s;if(K$1(i,t.getChildren()),at$1(n)&&e===n.getListType())n.append(i),at$1(r)&&e===r.getListType()&&(K$1(n,r.getChildren()),r.remove()),s=n;else if(at$1(r)&&e===r.getListType())r.getFirstChildOrThrow().insertBefore(i),s=r;else {const n=ct$2(e);n.append(i),t.replace(n),s=n;}return i.setFormat(t.getFormatType()),i.setIndent(t.getIndent()),t.remove(),s}function V$1(t,e){const n=t.getLastChild(),r=e.getFirstChild();n&&r&&R$2(n)&&R$2(r)&&(V$1(n.getFirstChild(),r.getFirstChild()),r.remove());const i=e.getChildren();i.length>0&&t.append(...i),e.remove();}function z$1(){const e=Nr();if(cr(e)){const n=new Set,r=e.getNodes(),i=e.anchor.getNode();if(B$2(i,r))n.add(D$2(i));else for(let e=0;e<r.length;e++){const i=r[e];if(rs(i)){const e=vt$2(i,G);null!=e&&n.add(D$2(e));}}for(const t of n){let n=t;const r=M$3(t);for(const t of r){const r=Pi().setTextStyle(e.style).setTextFormat(e.format);K$1(r,t.getChildren()),n.insertAfter(r),n=r,t.__key===e.anchor.key&&ll(e.anchor,_l(jo(r,"next"))),t.__key===e.focus.key&&ll(e.focus,_l(jo(r,"next"))),t.remove();}t.remove();}}}function $(t){const e=new Set;if(R$2(t)||e.has(t.getKey()))return;const n=t.getParent(),r=t.getNextSibling(),i=t.getPreviousSibling();if(R$2(r)&&R$2(i)){const n=i.getFirstChild();if(at$1(n)){n.append(t);const i=r.getFirstChild();if(at$1(i)){K$1(n,i.getChildren()),r.remove(),e.add(r.getKey());}}}else if(R$2(r)){const e=r.getFirstChild();if(at$1(e)){const n=e.getFirstChild();null!==n&&n.insertBefore(t);}}else if(R$2(i)){const e=i.getFirstChild();at$1(e)&&e.append(t);}else if(at$1(n)){const e=et$2().setTextFormat(t.getTextFormat()).setTextStyle(t.getTextStyle()),s=ct$2(n.getListType()).setTextFormat(n.getTextFormat()).setTextStyle(n.getTextStyle());e.append(s),s.append(t),i?i.insertAfter(e):r?r.insertBefore(e):n.append(e);}}function q$1(t){if(R$2(t))return;const e=t.getParent(),n=e?e.getParent():void 0;if(at$1(n?n.getParent():void 0)&&nt$2(n)&&at$1(e)){const r=e?e.getFirstChild():void 0,i=e?e.getLastChild():void 0;if(t.is(r))n.insertBefore(t),e.isEmpty()&&n.remove();else if(t.is(i))n.insertAfter(t),e.isEmpty()&&n.remove();else {const r=e.getListType(),i=et$2(),s=ct$2(r);i.append(s),t.getPreviousSiblings().forEach((t=>s.append(t)));const o=et$2(),l=ct$2(r);o.append(l),K$1(l,t.getNextSiblings()),n.insertBefore(i),n.insertAfter(o),n.replace(t);}}}function H$1(){const t=Nr();if(!cr(t)||!t.isCollapsed())return  false;const e=t.anchor.getNode();if(!nt$2(e)||0!==e.getChildrenSize())return  false;const n=D$2(e),r=e.getParent();at$1(r)||I$1(40);const i=r.getParent();let s;if(Zs(i))s=Pi(),n.insertAfter(s);else {if(!nt$2(i))return  false;s=et$2(),i.insertAfter(s);}s.setTextStyle(t.style).setTextFormat(t.format).select();const o=e.getNextSiblings();if(o.length>0){const t=ct$2(r.getListType());if(nt$2(s)){const e=et$2();e.append(t),s.insertAfter(e);}else s.insertAfter(t);t.append(...o);}return function(t){let e=t;for(;null==e.getNextSibling()&&null==e.getPreviousSibling();){const t=e.getParent();if(null==t||!nt$2(t)&&!at$1(t))break;e=t;}e.remove();}(e),true}function X(...t){const e=[];for(const n of t)if(n&&"string"==typeof n)for(const[t]of n.matchAll(/\S+/g))e.push(t);return e}function j$1(t,e,n){const r=B$3(e.__textStyle);for(const e in r)t.style.setProperty(`--listitem-marker-${e}`,r[e]);if(n)for(const e in B$3(n.__textStyle))e in r||t.style.removeProperty(`--listitem-marker-${e}`);}class G extends fi{static getType(){return "listitem"}static clone(t){return new G(t.__value,t.__checked,t.__key)}constructor(t,e,n){super(n),this.__value=void 0===t?1:t,this.__checked=e;}createDOM(t){const e=document.createElement("li"),n=this.getParent();at$1(n)&&"check"===n.getListType()&&Y$2(e,this,null),e.value=this.__value,Q(e,t.theme,this);const r=this.__style;return r&&(e.style.cssText=r),j$1(e,this,null),e}updateDOM(t,e,n){const r=this.getParent();at$1(r)&&"check"===r.getListType()&&Y$2(e,this,t),e.value=this.__value,Q(e,n.theme,this);const i=t.__style,s=this.__style;return i!==s&&(""===s?e.removeAttribute("style"):e.style.cssText=s),j$1(e,this,t),false}static transform(){return t=>{if(nt$2(t)||I$1(144),null==t.__checked)return;const e=t.getParent();at$1(e)&&"check"!==e.getListType()&&null!=t.getChecked()&&t.setChecked(void 0);}}static importDOM(){return {li:()=>({conversion:Z$2,priority:0})}}static importJSON(t){return et$2().updateFromJSON(t)}updateFromJSON(t){return super.updateFromJSON(t).setValue(t.value).setChecked(t.checked)}exportDOM(t){const e=this.createDOM(t._config);e.style.textAlign=this.getFormatType();const n=this.getDirection();return n&&(e.dir=n),{element:e}}exportJSON(){return {...super.exportJSON(),checked:this.getChecked(),value:this.getValue()}}append(...t){for(let e=0;e<t.length;e++){const n=t[e];if(di(n)&&this.canMergeWith(n)){const t=n.getChildren();this.append(...t),n.remove();}else super.append(n);}return this}replace(t,e){if(nt$2(t))return super.replace(t);this.setIndent(0);const n=this.getParentOrThrow();if(!at$1(n))return t;if(n.__first===this.getKey())n.insertBefore(t);else if(n.__last===this.getKey())n.insertAfter(t);else {const e=ct$2(n.getListType());let r=this.getNextSibling();for(;r;){const t=r;r=r.getNextSibling(),e.append(t);}n.insertAfter(t),t.insertAfter(e);}return e&&(di(t)||I$1(139),this.getChildren().forEach((e=>{t.append(e);}))),this.remove(),0===n.getChildrenSize()&&n.remove(),t}insertAfter(t,e=true){const n=this.getParentOrThrow();if(at$1(n)||I$1(39),nt$2(t))return super.insertAfter(t,e);const r=this.getNextSiblings();if(n.insertAfter(t,e),0!==r.length){const i=ct$2(n.getListType());r.forEach((t=>i.append(t))),t.insertAfter(i,e);}return t}remove(t){const e=this.getPreviousSibling(),n=this.getNextSibling();super.remove(t),e&&n&&R$2(e)&&R$2(n)&&(V$1(e.getFirstChild(),n.getFirstChild()),n.remove());}insertNewAfter(t,e=true){const n=et$2().updateFromJSON(this.exportJSON()).setChecked(!this.getChecked()&&void 0);return this.insertAfter(n,e),n}collapseAtStart(t){const e=Pi();this.getChildren().forEach((t=>e.append(t)));const n=this.getParentOrThrow(),r=n.getParentOrThrow(),i=nt$2(r);if(1===n.getChildrenSize())if(i)n.remove(),r.select();else {n.insertBefore(e),n.remove();const r=t.anchor,i=t.focus,s=e.getKey();"element"===r.type&&r.getNode().is(this)&&r.set(s,r.offset,"element"),"element"===i.type&&i.getNode().is(this)&&i.set(s,i.offset,"element");}else n.insertBefore(e),this.remove();return  true}getValue(){return this.getLatest().__value}setValue(t){const e=this.getWritable();return e.__value=t,e}getChecked(){const t=this.getLatest();let e;const n=this.getParent();return at$1(n)&&(e=n.getListType()),"check"===e?Boolean(t.__checked):void 0}setChecked(t){const e=this.getWritable();return e.__checked=t,e}toggleChecked(){const t=this.getWritable();return t.setChecked(!t.__checked)}getIndent(){const t=this.getParent();if(null===t||!this.isAttached())return this.getLatest().__indent;let e=t.getParentOrThrow(),n=0;for(;nt$2(e);)e=e.getParentOrThrow().getParentOrThrow(),n++;return n}setIndent(t){"number"!=typeof t&&I$1(117),(t=Math.floor(t))>=0||I$1(199);let e=this.getIndent();for(;e!==t;)e<t?($(this),e++):(q$1(this),e--);return this}canInsertAfter(t){return nt$2(t)}canReplaceWith(t){return nt$2(t)}canMergeWith(t){return nt$2(t)||Fi(t)}extractWithChild(t,e){if(!cr(e))return  false;const n=e.anchor.getNode(),r=e.focus.getNode();return this.isParentOf(n)&&this.isParentOf(r)&&this.getTextContent().length===e.getTextContent().length}isParentRequired(){return  true}createParentElementNode(){return ct$2("bullet")}canMergeWhenEmpty(){return  true}}function Q(t,r,i){const s=[],o=[],l=r.list,c=l?l.listitem:void 0;let a;if(l&&l.nested&&(a=l.nested.listitem),void 0!==c&&s.push(...X(c)),l){const t=i.getParent(),e=at$1(t)&&"check"===t.getListType(),n=i.getChecked();e&&!n||o.push(l.listitemUnchecked),e&&n||o.push(l.listitemChecked),e&&s.push(n?l.listitemChecked:l.listitemUnchecked);}if(void 0!==a){const t=X(a);i.getChildren().some((t=>at$1(t)))?s.push(...t):o.push(...t);}o.length>0&&it$3(t,...o),s.length>0&&rt$2(t,...s);}function Y$2(t,e,n,r){at$1(e.getFirstChild())?(t.removeAttribute("role"),t.removeAttribute("tabIndex"),t.removeAttribute("aria-checked")):(t.setAttribute("role","checkbox"),t.setAttribute("tabIndex","-1"),n&&e.__checked===n.__checked||t.setAttribute("aria-checked",e.getChecked()?"true":"false"));}function Z$2(t){if(t.classList.contains("task-list-item"))for(const e of t.children)if("INPUT"===e.tagName)return tt$2(e);const e=t.getAttribute("aria-checked");return {node:et$2("true"===e||"false"!==e&&void 0)}}function tt$2(t){if(!("checkbox"===t.getAttribute("type")))return {node:null};return {node:et$2(t.hasAttribute("checked"))}}function et$2(t){return eo(new G(void 0,t))}function nt$2(t){return t instanceof G}let rt$1 = class rt extends fi{static getType(){return "list"}static clone(t){const e=t.__listType||lt$2[t.__tag];return new rt(e,t.__start,t.__key)}constructor(t="number",e=1,n){super(n);const r=lt$2[t]||t;this.__listType=r,this.__tag="number"===r?"ol":"ul",this.__start=e;}getTag(){return this.__tag}setListType(t){const e=this.getWritable();return e.__listType=t,e.__tag="number"===t?"ol":"ul",e}getListType(){return this.__listType}getStart(){return this.__start}setStart(t){const e=this.getWritable();return e.__start=t,e}createDOM(t,e){const n=this.__tag,r=document.createElement(n);return 1!==this.__start&&r.setAttribute("start",String(this.__start)),r.__lexicalListType=this.__listType,it$2(r,t.theme,this),r}updateDOM(t,e,n){return t.__tag!==this.__tag||(it$2(e,n.theme,this),false)}static transform(){return t=>{at$1(t)||I$1(163),function(t){const e=t.getNextSibling();at$1(e)&&t.getListType()===e.getListType()&&V$1(t,e);}(t),function(t){const e="check"!==t.getListType();let n=t.getStart();for(const r of t.getChildren())nt$2(r)&&(r.getValue()!==n&&r.setValue(n),e&&null!=r.getLatest().__checked&&r.setChecked(void 0),at$1(r.getFirstChild())||n++);}(t);}}static importDOM(){return {ol:()=>({conversion:ot$2,priority:0}),ul:()=>({conversion:ot$2,priority:0})}}static importJSON(t){return ct$2().updateFromJSON(t)}updateFromJSON(t){return super.updateFromJSON(t).setListType(t.listType).setStart(t.start)}exportDOM(t){const e=this.createDOM(t._config,t);return uo(e)&&(1!==this.__start&&e.setAttribute("start",String(this.__start)),"check"===this.__listType&&e.setAttribute("__lexicalListType","check")),{element:e}}exportJSON(){return {...super.exportJSON(),listType:this.getListType(),start:this.getStart(),tag:this.getTag()}}canBeEmpty(){return  false}canIndent(){return  false}splice(t,e,n){let r=n;for(let t=0;t<n.length;t++){const e=n[t];nt$2(e)||(r===n&&(r=[...n]),r[t]=et$2().append(!di(e)||at$1(e)||e.isInline()?e:Xn(e.getTextContent())));}return super.splice(t,e,r)}extractWithChild(t){return nt$2(t)}};function it$2(t,r,i){const s=[],o=[],l=r.list;if(void 0!==l){const t=l[`${i.__tag}Depth`]||[],e=w$1(i)-1,n=e%t.length,r=t[n],c=l[i.__tag];let a;const u=l.nested,g=l.checklist;if(void 0!==u&&u.list&&(a=u.list),void 0!==c&&s.push(c),void 0!==g&&"check"===i.__listType&&s.push(g),void 0!==r){s.push(...X(r));for(let e=0;e<t.length;e++)e!==n&&o.push(i.__tag+e);}if(void 0!==a){const t=X(a);e>1?s.push(...t):o.push(...t);}}o.length>0&&it$3(t,...o),s.length>0&&rt$2(t,...s);}function st$2(t){const e=[];for(let n=0;n<t.length;n++){const r=t[n];if(nt$2(r)){e.push(r);const t=r.getChildren();t.length>1&&t.forEach((t=>{at$1(t)&&e.push(J$2(t));}));}else e.push(J$2(r));}return e}function ot$2(t){const e=t.nodeName.toLowerCase();let n=null;if("ol"===e){n=ct$2("number",t.start);}else "ul"===e&&(n=function(t){if("check"===t.getAttribute("__lexicallisttype")||t.classList.contains("contains-task-list"))return  true;for(const e of t.childNodes)if(uo(e)&&e.hasAttribute("aria-checked"))return  true;return  false}(t)?ct$2("check"):ct$2("bullet"));return {after:st$2,node:n}}const lt$2={ol:"number",ul:"bullet"};function ct$2(t="number",e=1){return eo(new rt$1(t,e))}function at$1(t){return t instanceof rt$1}const _t$2=oe("INSERT_UNORDERED_LIST_COMMAND"),yt$3=oe("INSERT_ORDERED_LIST_COMMAND"),Ct$1=oe("REMOVE_LIST_COMMAND");function Tt$2(t){return j$2(t.registerCommand(yt$3,(()=>(W("number"),true)),Ii),t.registerCommand(_t$2,(()=>(W("bullet"),true)),Ii),t.registerCommand(Ct$1,(()=>(z$1(),true)),Ii),t.registerCommand(de,(()=>H$1()),Ii),t.registerNodeTransform(G,(t=>{const e=t.getFirstChild();if(e){if(Qn(e)){const n=e.getStyle(),r=e.getFormat();t.getTextStyle()!==n&&t.setTextStyle(n),t.getTextFormat()!==r&&t.setTextFormat(r);}}else {const e=Nr();cr(e)&&(e.style!==t.getTextStyle()||e.format!==t.getTextFormat())&&e.isCollapsed()&&t.is(e.anchor.getNode())&&t.setTextStyle(e.style).setTextFormat(e.format);}})),t.registerNodeTransform(Jn,(t=>{const e=t.getParent();if(nt$2(e)&&t.is(e.getFirstChild())){const n=t.getStyle(),r=t.getFormat();n===e.getTextStyle()&&r===e.getTextFormat()||e.setTextStyle(n).setTextFormat(r);}})))}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const h$1=new Set(["http:","https:","mailto:","sms:","tel:"]);let g$1 = class g extends fi{static getType(){return "link"}static clone(t){return new g(t.__url,{rel:t.__rel,target:t.__target,title:t.__title},t.__key)}constructor(t="",e={},r){super(r);const{target:n=null,rel:i=null,title:s=null}=e;this.__url=t,this.__target=n,this.__rel=i,this.__title=s;}createDOM(e){const r=document.createElement("a");return r.href=this.sanitizeUrl(this.__url),null!==this.__target&&(r.target=this.__target),null!==this.__rel&&(r.rel=this.__rel),null!==this.__title&&(r.title=this.__title),rt$2(r,e.theme.link),r}updateDOM(t,r,n){if(ao(r)){const e=this.__url,n=this.__target,i=this.__rel,s=this.__title;e!==t.__url&&(r.href=e),n!==t.__target&&(n?r.target=n:r.removeAttribute("target")),i!==t.__rel&&(i?r.rel=i:r.removeAttribute("rel")),s!==t.__title&&(s?r.title=s:r.removeAttribute("title"));}return  false}static importDOM(){return {a:t=>({conversion:f,priority:1})}}static importJSON(t){return d().updateFromJSON(t)}updateFromJSON(t){return super.updateFromJSON(t).setURL(t.url).setRel(t.rel||null).setTarget(t.target||null).setTitle(t.title||null)}sanitizeUrl(t){try{const e=new URL(t);if(!h$1.has(e.protocol))return "about:blank"}catch(e){return t}return t}exportJSON(){return {...super.exportJSON(),rel:this.getRel(),target:this.getTarget(),title:this.getTitle(),url:this.getURL()}}getURL(){return this.getLatest().__url}setURL(t){const e=this.getWritable();return e.__url=t,e}getTarget(){return this.getLatest().__target}setTarget(t){const e=this.getWritable();return e.__target=t,e}getRel(){return this.getLatest().__rel}setRel(t){const e=this.getWritable();return e.__rel=t,e}getTitle(){return this.getLatest().__title}setTitle(t){const e=this.getWritable();return e.__title=t,e}insertNewAfter(t,e=true){const r=d(this.__url,{rel:this.__rel,target:this.__target,title:this.__title});return this.insertAfter(r,e),r}canInsertTextBefore(){return  false}canInsertTextAfter(){return  false}canBeEmpty(){return  false}isInline(){return  true}extractWithChild(t,e,r){if(!cr(e))return  false;const n=e.anchor.getNode(),i=e.focus.getNode();return this.isParentOf(n)&&this.isParentOf(i)&&e.getTextContent().length>0}isEmailURI(){return this.__url.startsWith("mailto:")}isWebSiteURI(){return this.__url.startsWith("https://")||this.__url.startsWith("http://")}};function f(t){let r=null;if(ao(t)){const e=t.textContent;(null!==e&&""!==e||t.children.length>0)&&(r=d(t.getAttribute("href")||"",{rel:t.getAttribute("rel"),target:t.getAttribute("target"),title:t.getAttribute("title")}));}return {node:r}}function d(t="",e){return eo(new g$1(t,e))}function p(t){return t instanceof g$1}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function h(e,n){const t=n.body?n.body.childNodes:[];let o=[];const l=[];for(let n=0;n<t.length;n++){const r=t[n];if(!x.has(r.nodeName)){const n=y$1(r,e,l,false);null!==n&&(o=o.concat(n));}}return function(e){for(const n of e)n.getNextSibling()instanceof Ai&&n.insertAfter(Pn());for(const n of e){const e=n.getChildren();for(const t of e)n.insertBefore(t);n.remove();}}(l),o}function m(e,n){if("undefined"==typeof document||"undefined"==typeof window&&void 0===global.window)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const t=document.createElement("div"),l=_s().getChildren();for(let o=0;o<l.length;o++){g(e,l[o],t,n);}return t.innerHTML}function g(t,o,c,u=null){let f=null===u||o.isSelected(u);const a=di(o)&&o.excludeFromCopy("html");let d=o;if(null!==u){let n=vo(o);n=Qn(n)&&null!==u?b(u,n):n,d=n;}const p=di(d)?d.getChildren():[],h=t._nodes.get(d.getType());let m;m=h&&void 0!==h.exportDOM?h.exportDOM(t,d):d.exportDOM(t);const{element:x,after:y}=m;if(!x)return  false;const w=document.createDocumentFragment();for(let e=0;e<p.length;e++){const n=p[e],r=g(t,n,w,u);!f&&di(o)&&r&&o.extractWithChild(n,u,"html")&&(f=true);}if(f&&!a){if((uo(x)||ho(x))&&x.append(w),c.append(x),y){const e=y.call(d,x);e&&(ho(x)?x.replaceChildren(e):x.replaceWith(e));}}else c.append(w);return f}const x=new Set(["STYLE","SCRIPT"]);function y$1(e,n,o,r,i=new Map,s){let h=[];if(x.has(e.nodeName))return h;let m=null;const g=function(e,n){const{nodeName:t}=e,o=n._htmlConversions.get(t.toLowerCase());let l=null;if(void 0!==o)for(const n of o){const t=n(e);null!==t&&(null===l||(l.priority||0)<=(t.priority||0))&&(l=t);}return null!==l?l.conversion:null}(e,n),b=g?g(e):null;let C=null;if(null!==b){C=b.after;const n=b.node;if(m=Array.isArray(n)?n[n.length-1]:n,null!==m){for(const[,e]of i)if(m=e(m,s),!m)break;m&&h.push(...Array.isArray(n)?n:[m]);}null!=b.forChild&&i.set(e.nodeName,b.forChild);}const S=e.childNodes;let v=[];const N=(null==m||!Zs(m))&&(null!=m&&Cr(m)||r);for(let e=0;e<S.length;e++)v.push(...y$1(S[e],n,o,N,new Map(i),m));return null!=C&&(v=C(v)),_o(e)&&(v=w(e,v,N?()=>{const e=new Ai;return o.push(e),e}:Pi)),null==m?v.length>0?h=h.concat(v):_o(e)&&function(e){if(null==e.nextSibling||null==e.previousSibling)return  false;return go(e.nextSibling)&&go(e.previousSibling)}(e)&&(h=h.concat(Pn())):di(m)&&m.append(...v),h}function w(e,n,t){const o=e.style.textAlign,l=[];let r=[];for(let e=0;e<n.length;e++){const i=n[e];if(Cr(i))o&&!i.getFormat()&&i.setFormat(o),l.push(i);else if(r.push(i),e===n.length-1||e<n.length-1&&Cr(n[e+1])){const e=t();e.setFormat(o),e.append(...r),l.push(e),r=[];}}return l}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function y(t,...e){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const t of e)o.append("v",t);throw n.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function T(e,n=Nr()){return null==n&&y(166),cr(n)&&n.isCollapsed()||0===n.getNodes().length?"":m(e,n)}function v(t,e=Nr()){return null==e&&y(166),cr(e)&&e.isCollapsed()||0===e.getNodes().length?null:JSON.stringify(R$1(t,e))}function D$1(t,n,o){const r=t.getData("application/x-lexical-editor");if(r)try{const t=JSON.parse(r);if(t.namespace===o._config.namespace&&Array.isArray(t.nodes)){return N(o,A$1(t.nodes),n)}}catch(t){}const c=t.getData("text/html"),a=t.getData("text/plain");if(c&&a!==c)try{const t=(new DOMParser).parseFromString(function(t){if(window.trustedTypes&&window.trustedTypes.createPolicy){return window.trustedTypes.createPolicy("lexical",{createHTML:t=>t}).createHTML(t)}return t}(c),"text/html");return N(o,h(o,t),n)}catch(t){}const u=a||t.getData("text/uri-list");if(null!=u)if(cr(n)){const t=u.split(/(\r?\n|\t)/);""===t[t.length-1]&&t.pop();for(let e=0;e<t.length;e++){const n=Nr();if(cr(n)){const o=t[e];"\n"===o||"\r\n"===o?n.insertParagraph():"\t"===o?n.insertNodes([er()]):n.insertText(o);}}}else n.insertRawText(u);}function N(t,e,n){t.dispatchCommand(ce,{nodes:e,selection:n})||n.insertNodes(e);}function S(t,e,n,r=[]){let i=null===e||n.isSelected(e);const l=di(n)&&n.excludeFromCopy("html");let s=n;if(null!==e){let t=vo(n);t=Qn(t)&&null!==e?b(e,t):t,s=t;}const c=di(s)?s.getChildren():[],a=function(t){const e=t.exportJSON(),n=t.constructor;if(e.type!==n.getType()&&y(58,n.name),di(t)){const t=e.children;Array.isArray(t)||y(59,n.name);}return e}(s);if(Qn(s)){const t=s.__text;t.length>0?a.text=t:i=false;}for(let o=0;o<c.length;o++){const r=c[o],l=S(t,e,r,a.children);!i&&di(n)&&l&&n.extractWithChild(r,e,"clone")&&(i=true);}if(i&&!l)r.push(a);else if(Array.isArray(a.children))for(let t=0;t<a.children.length;t++){const e=a.children[t];r.push(e);}return i}function R$1(t,e){const n=[],o=_s().getChildren();for(let r=0;r<o.length;r++){S(t,e,o[r],n);}return {namespace:t._config.namespace,nodes:n}}function A$1(t){const e=[];for(let o=0;o<t.length;o++){const r=t[o],i=ei(r);Qn(i)&&z$2(i),e.push(i);}return e}let P=null;async function _(t,e,n){if(null!==P)return  false;if(null!==e)return new Promise(((o,r)=>{t.update((()=>{o(E$1(t,e,n));}));}));const o=t.getRootElement(),i=t._window||window,l=window.document,s=oo(i);if(null===o||null===s)return  false;const c=l.createElement("span");c.style.cssText="position: fixed; top: -1000px;",c.append(l.createTextNode("#")),o.append(c);const a=new Range;return a.setStart(c,0),a.setEnd(c,1),s.removeAllRanges(),s.addRange(a),new Promise(((e,o)=>{const i=t.registerCommand(Je,(o=>(Lt$1(o,ClipboardEvent)&&(i(),null!==P&&(window.clearTimeout(P),P=null),e(E$1(t,o,n))),true)),Bi);P=window.setTimeout((()=>{i(),P=null,e(false);}),50),l.execCommand("copy"),c.remove();}))}function E$1(t,e,n){if(void 0===n){const e=oo(t._window);if(!e)return  false;const o=e.anchorNode,r=e.focusNode;if(null!==o&&null!==r&&!Hi(t,o,r))return  false;const i=Nr();if(null===i)return  false;n=M$2(i);}e.preventDefault();const o=e.clipboardData;return null!==o&&(O$1(o,n),true)}const L$1=[["text/html",T],["application/x-lexical-editor",v]];function M$2(t=Nr()){const e={"text/plain":t?t.getTextContent():""};if(t){const n=mo();for(const[o,r]of L$1){const i=r(n,t);null!==i&&(e[o]=i);}}return e}function O$1(t,e){for(const n in e){const o=e[n];void 0!==o&&t.setData(n,o);}}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function dt$2(t,e){if(void 0!==document.caretRangeFromPoint){const n=document.caretRangeFromPoint(t,e);return null===n?null:{node:n.startContainer,offset:n.startOffset}}if("undefined"!==document.caretPositionFromPoint){const n=document.caretPositionFromPoint(t,e);return null===n?null:{node:n.offsetNode,offset:n.offset}}return null}const mt$2="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement,ft$1=mt$2&&"documentMode"in document?document.documentMode:null,gt$2=!(!mt$2||!("InputEvent"in window)||ft$1)&&"getTargetRanges"in new window.InputEvent("input"),pt$2=mt$2&&/Version\/[\d.]+.*Safari/.test(navigator.userAgent),ht$3=mt$2&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,Ct=mt$2&&/^(?=.*Chrome).*/i.test(navigator.userAgent),vt$1=mt$2&&/AppleWebKit\/[\d.]+/.test(navigator.userAgent)&&!Ct,yt$2=oe("DRAG_DROP_PASTE_FILE");class Dt extends fi{static getType(){return "quote"}static clone(t){return new Dt(t.__key)}createDOM(t){const e=document.createElement("blockquote");return rt$2(e,t.theme.quote),e}updateDOM(t,e){return  false}static importDOM(){return {blockquote:t=>({conversion:Tt$1,priority:0})}}exportDOM(t){const{element:e}=super.exportDOM(t);if(uo(e)){this.isEmpty()&&e.append(document.createElement("br"));const t=this.getFormatType();e.style.textAlign=t;const n=this.getDirection();n&&(e.dir=n);}return {element:e}}static importJSON(t){return xt$3().updateFromJSON(t)}insertNewAfter(t,e){const n=Pi(),r=this.getDirection();return n.setDirection(r),this.insertAfter(n,e),n}collapseAtStart(){const t=Pi();return this.getChildren().forEach((e=>t.append(e))),this.replace(t),true}canMergeWhenEmpty(){return  true}}function xt$3(){return eo(new Dt)}function wt$1(t){return t instanceof Dt}let Nt$1 = class Nt extends fi{static getType(){return "heading"}static clone(t){return new Nt(t.__tag,t.__key)}constructor(t,e){super(e),this.__tag=t;}getTag(){return this.__tag}setTag(t){const e=this.getWritable();return this.__tag=t,e}createDOM(t){const e=this.__tag,n=document.createElement(e),r=t.theme.heading;if(void 0!==r){const t=r[e];rt$2(n,t);}return n}updateDOM(t,e,n){return t.__tag!==this.__tag}static importDOM(){return {h1:t=>({conversion:Ot,priority:0}),h2:t=>({conversion:Ot,priority:0}),h3:t=>({conversion:Ot,priority:0}),h4:t=>({conversion:Ot,priority:0}),h5:t=>({conversion:Ot,priority:0}),h6:t=>({conversion:Ot,priority:0}),p:t=>{const e=t.firstChild;return null!==e&&Et$1(e)?{conversion:()=>({node:null}),priority:3}:null},span:t=>Et$1(t)?{conversion:t=>({node:_t$1("h1")}),priority:3}:null}}exportDOM(t){const{element:e}=super.exportDOM(t);if(uo(e)){this.isEmpty()&&e.append(document.createElement("br"));const t=this.getFormatType();e.style.textAlign=t;const n=this.getDirection();n&&(e.dir=n);}return {element:e}}static importJSON(t){return _t$1(t.tag).updateFromJSON(t)}updateFromJSON(t){return super.updateFromJSON(t).setTag(t.tag)}exportJSON(){return {...super.exportJSON(),tag:this.getTag()}}insertNewAfter(t,e=true){const n=t?t.anchor.offset:0,r=this.getLastDescendant(),o=!r||t&&t.anchor.key===r.getKey()&&n===r.getTextContentSize()||!t?Pi():_t$1(this.getTag()),i=this.getDirection();if(o.setDirection(i),this.insertAfter(o,e),0===n&&!this.isEmpty()&&t){const t=Pi();t.select(),this.replace(t,true);}return o}collapseAtStart(){const t=this.isEmpty()?Pi():_t$1(this.getTag());return this.getChildren().forEach((e=>t.append(e))),this.replace(t),true}extractWithChild(){return  true}};function Et$1(t){return "span"===t.nodeName.toLowerCase()&&"26pt"===t.style.fontSize}function Ot(t){const e=t.nodeName.toLowerCase();let n=null;return "h1"!==e&&"h2"!==e&&"h3"!==e&&"h4"!==e&&"h5"!==e&&"h6"!==e||(n=_t$1(e),null!==t.style&&(ko(t,n),n.setFormat(t.style.textAlign))),{node:n}}function Tt$1(t){const e=xt$3();return null!==t.style&&(e.setFormat(t.style.textAlign),ko(t,e)),{node:e}}function _t$1(t="h1"){return eo(new Nt$1(t))}function At(t){return t instanceof Nt$1}function Ft$2(t){let e=null;if(Lt$1(t,DragEvent)?e=t.dataTransfer:Lt$1(t,ClipboardEvent)&&(e=t.clipboardData),null===e)return [false,[],false];const n=e.types,r=n.includes("Files"),o=n.includes("text/html")||n.includes("text/plain");return [r,Array.from(e.files),o]}function St$1(t){const e=Nr();if(!cr(e))return  false;const n=new Set,r=e.getNodes();for(let e=0;e<r.length;e++){const o=r[e],i=o.getKey();if(n.has(i))continue;const s=wt$2(o,(t=>di(t)&&!t.isInline()));if(null===s)continue;const a=s.getKey();s.canIndent()&&!n.has(a)&&(n.add(a),t(s));}return n.size>0}function It$1(t){const e=ds(t);return _i(e)}function Pt$1(t){for(const e of ["lowercase","uppercase","capitalize"])t.hasFormat(e)&&t.toggleFormat(e);}function Mt(o){return j$2(o.registerCommand(ae,(t=>{const e=Nr();return !!ur(e)&&(e.clear(),true)}),0),o.registerCommand(ue,(t=>{const e=Nr();return cr(e)?(e.deleteCharacter(t),true):!!ur(e)&&(e.deleteNodes(),true)}),Li),o.registerCommand(pe,(t=>{const e=Nr();return !!cr(e)&&(e.deleteWord(t),true)}),Li),o.registerCommand(ye$1,(t=>{const e=Nr();return !!cr(e)&&(e.deleteLine(t),true)}),Li),o.registerCommand(he,(e=>{const n=Nr();if("string"==typeof e)null!==n&&n.insertText(e);else {if(null===n)return  false;const r=e.dataTransfer;if(null!=r)D$1(r,n,o);else if(cr(n)){const t=e.data;return t&&n.insertText(t),true}}return  true}),Li),o.registerCommand(_e,(()=>{const t=Nr();return !!cr(t)&&(t.removeText(),true)}),Li),o.registerCommand(me,(t=>{const e=Nr();return !!cr(e)&&(e.formatText(t),true)}),Li),o.registerCommand(Ke$1,(t=>{const e=Nr();if(!cr(e)&&!ur(e))return  false;const n=e.getNodes();for(const e of n){const n=wt$2(e,(t=>di(t)&&!t.isInline()));null!==n&&n.setFormat(t);}return  true}),Li),o.registerCommand(fe,(t=>{const e=Nr();return !!cr(e)&&(e.insertLineBreak(t),true)}),Li),o.registerCommand(de,(()=>{const t=Nr();return !!cr(t)&&(t.insertParagraph(),true)}),Li),o.registerCommand(Fe$1,(()=>(Fr([er()]),true)),Li),o.registerCommand(Le$1,(()=>St$1((t=>{const e=t.getIndent();t.setIndent(e+1);}))),Li),o.registerCommand(Ie,(()=>St$1((t=>{const e=t.getIndent();e>0&&t.setIndent(Math.max(0,e-1));}))),Li),o.registerCommand(Ne$1,(t=>{const e=Nr();if(ur(e)){const t=e.getNodes();if(t.length>0)return t[0].selectPrevious(),true}else if(cr(e)){const n=Ks(e.focus,true);if(!t.shiftKey&&_i(n)&&!n.isIsolated()&&!n.isInline())return n.selectPrevious(),t.preventDefault(),true}return  false}),Li),o.registerCommand(we$1,(t=>{const e=Nr();if(ur(e)){const t=e.getNodes();if(t.length>0)return t[0].selectNext(0,0),true}else if(cr(e)){if(function(t){const e=t.focus;return "root"===e.key&&e.offset===_s().getChildrenSize()}(e))return t.preventDefault(),true;const n=Ks(e.focus,false);if(!t.shiftKey&&_i(n)&&!n.isIsolated()&&!n.isInline())return n.selectNext(),t.preventDefault(),true}return  false}),Li),o.registerCommand(Te,(t=>{const e=Nr();if(ur(e)){const n=e.getNodes();if(n.length>0)return t.preventDefault(),n[0].selectPrevious(),true}if(!cr(e))return  false;if(X$1(e,true)){const n=t.shiftKey;return t.preventDefault(),J$3(e,n,true),true}return  false}),Li),o.registerCommand(ve$1,(t=>{const e=Nr();if(ur(e)){const n=e.getNodes();if(n.length>0)return t.preventDefault(),n[0].selectNext(0,0),true}if(!cr(e))return  false;const o=t.shiftKey;return !!X$1(e,false)&&(t.preventDefault(),J$3(e,o,false),true)}),Li),o.registerCommand(Ae$1,(t=>{if(It$1(t.target))return  false;const e=Nr();if(cr(e)){if(function(t){if(!t.isCollapsed())return  false;const{anchor:e}=t;if(0!==e.offset)return  false;const n=e.getNode();if(yi(n))return  false;const r=yt$4(n);return r.getIndent()>0&&(r.is(n)||n.is(r.getFirstDescendant()))}(e))return t.preventDefault(),o.dispatchCommand(Ie,void 0);if(ht$3&&"ko-KR"===navigator.language)return  false}else if(!ur(e))return  false;return t.preventDefault(),o.dispatchCommand(ue,true)}),Li),o.registerCommand(De,(t=>{if(It$1(t.target))return  false;const e=Nr();return !(!cr(e)&&!ur(e))&&(t.preventDefault(),o.dispatchCommand(ue,false))}),Li),o.registerCommand(Ee$1,(t=>{const e=Nr();if(!cr(e))return  false;if(Pt$1(e),null!==t){if((ht$3||pt$2||vt$1)&&gt$2)return  false;if(t.preventDefault(),t.shiftKey)return o.dispatchCommand(fe,false)}return o.dispatchCommand(de,void 0)}),Li),o.registerCommand(Oe$1,(()=>{const t=Nr();return !!cr(t)&&(o.blur(),true)}),Li),o.registerCommand(ze,(t=>{const[,e]=Ft$2(t);if(e.length>0){const n=dt$2(t.clientX,t.clientY);if(null!==n){const{offset:t,node:r}=n,i=ds(r);if(null!==i){const e=vr();if(Qn(i))e.anchor.set(i.getKey(),t,"text"),e.focus.set(i.getKey(),t,"text");else {const t=i.getParentOrThrow().getKey(),n=i.getIndexWithinParent()+1;e.anchor.set(t,n,"element"),e.focus.set(t,n,"element");}const n=vt$3(e);ys(n);}o.dispatchCommand(yt$2,e);}return t.preventDefault(),true}const n=Nr();return !!cr(n)}),Li),o.registerCommand(Be,(t=>{const[e]=Ft$2(t),n=Nr();return !(e&&!cr(n))}),Li),o.registerCommand(Re$1,(t=>{const[e]=Ft$2(t),n=Nr();if(e&&!cr(n))return  false;const r=dt$2(t.clientX,t.clientY);if(null!==r){const e=ds(r.node);_i(e)&&t.preventDefault();}return  true}),Li),o.registerCommand($e,(()=>(Ps(),true)),Li),o.registerCommand(Je,(t=>(_(o,Lt$1(t,ClipboardEvent)?t:null),true)),Li),o.registerCommand(Ue,(t=>(async function(t,n){await _(n,Lt$1(t,ClipboardEvent)?t:null),n.update((()=>{const t=Nr();cr(t)?t.removeText():ur(t)&&t.getNodes().forEach((t=>t.remove()));}));}(t,o),true)),Li),o.registerCommand(ge,(e=>{const[,n,r]=Ft$2(e);if(n.length>0&&!r)return o.dispatchCommand(yt$2,n),true;if(fo(e.target)&&Yi(e.target))return  false;return null!==Nr()&&(function(e,n){e.preventDefault(),n.update((()=>{const r=Nr(),o=Lt$1(e,InputEvent)||Lt$1(e,KeyboardEvent)?null:e.clipboardData;null!=o&&null!==r&&D$1(o,r,n);}),{tag:bi});}(e,o),true)}),Li),o.registerCommand(Me$1,(t=>{const e=Nr();return cr(e)&&Pt$1(e),false}),Li),o.registerCommand(Pe,(t=>{const e=Nr();return cr(e)&&Pt$1(e),false}),Li))}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const we=/^(\d+(?:\.\d+)?)px$/,be={BOTH:3,COLUMN:2,NO_STATUS:0,ROW:1};class ye extends fi{static getType(){return "tablecell"}static clone(e){return new ye(e.__headerState,e.__colSpan,e.__width,e.__key)}afterCloneFrom(e){super.afterCloneFrom(e),this.__rowSpan=e.__rowSpan,this.__backgroundColor=e.__backgroundColor,this.__verticalAlign=e.__verticalAlign;}static importDOM(){return {td:e=>({conversion:ve,priority:0}),th:e=>({conversion:ve,priority:0})}}static importJSON(e){return xe().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setHeaderStyles(e.headerState).setColSpan(e.colSpan||1).setRowSpan(e.rowSpan||1).setWidth(e.width||void 0).setBackgroundColor(e.backgroundColor||null).setVerticalAlign(e.verticalAlign||void 0)}constructor(e=be.NO_STATUS,t=1,n,o){super(o),this.__colSpan=t,this.__rowSpan=1,this.__headerState=e,this.__width=n,this.__backgroundColor=null,this.__verticalAlign=void 0;}createDOM(t){const n=document.createElement(this.getTag());return this.__width&&(n.style.width=`${this.__width}px`),this.__colSpan>1&&(n.colSpan=this.__colSpan),this.__rowSpan>1&&(n.rowSpan=this.__rowSpan),null!==this.__backgroundColor&&(n.style.backgroundColor=this.__backgroundColor),Ne(this.__verticalAlign)&&(n.style.verticalAlign=this.__verticalAlign),rt$2(n,t.theme.tableCell,this.hasHeader()&&t.theme.tableCellHeader),n}exportDOM(e){const t=super.exportDOM(e);if(uo(t.element)){const e=t.element;e.setAttribute("data-temporary-table-cell-lexical-key",this.getKey()),e.style.border="1px solid black",this.__colSpan>1&&(e.colSpan=this.__colSpan),this.__rowSpan>1&&(e.rowSpan=this.__rowSpan),e.style.width=`${this.getWidth()||75}px`,e.style.verticalAlign=this.getVerticalAlign()||"top",e.style.textAlign="start",null===this.__backgroundColor&&this.hasHeader()&&(e.style.backgroundColor="#f2f3f5");}return t}exportJSON(){return {...super.exportJSON(),...Ne(this.__verticalAlign)&&{verticalAlign:this.__verticalAlign},backgroundColor:this.getBackgroundColor(),colSpan:this.__colSpan,headerState:this.__headerState,rowSpan:this.__rowSpan,width:this.getWidth()}}getColSpan(){return this.getLatest().__colSpan}setColSpan(e){const t=this.getWritable();return t.__colSpan=e,t}getRowSpan(){return this.getLatest().__rowSpan}setRowSpan(e){const t=this.getWritable();return t.__rowSpan=e,t}getTag(){return this.hasHeader()?"th":"td"}setHeaderStyles(e,t=be.BOTH){const n=this.getWritable();return n.__headerState=e&t|n.__headerState&~t,n}getHeaderStyles(){return this.getLatest().__headerState}setWidth(e){const t=this.getWritable();return t.__width=e,t}getWidth(){return this.getLatest().__width}getBackgroundColor(){return this.getLatest().__backgroundColor}setBackgroundColor(e){const t=this.getWritable();return t.__backgroundColor=e,t}getVerticalAlign(){return this.getLatest().__verticalAlign}setVerticalAlign(e){const t=this.getWritable();return t.__verticalAlign=e||void 0,t}toggleHeaderStyle(e){const t=this.getWritable();return (t.__headerState&e)===e?t.__headerState-=e:t.__headerState+=e,t}hasHeaderState(e){return (this.getHeaderStyles()&e)===e}hasHeader(){return this.getLatest().__headerState!==be.NO_STATUS}updateDOM(e){return e.__headerState!==this.__headerState||e.__width!==this.__width||e.__colSpan!==this.__colSpan||e.__rowSpan!==this.__rowSpan||e.__backgroundColor!==this.__backgroundColor||e.__verticalAlign!==this.__verticalAlign}isShadowRoot(){return  true}collapseAtStart(){return  true}canBeEmpty(){return  false}canIndent(){return  false}}function Ne(e){return "middle"===e||"bottom"===e}function ve(e){const t=e,n=e.nodeName.toLowerCase();let o;we.test(t.style.width)&&(o=parseFloat(t.style.width));const r=xe("th"===n?be.ROW:be.NO_STATUS,t.colSpan,o);r.__rowSpan=t.rowSpan;const l=t.style.backgroundColor;""!==l&&(r.__backgroundColor=l);const s=t.style.verticalAlign;Ne(s)&&(r.__verticalAlign=s);const i=t.style,c=(i&&i.textDecoration||"").split(" "),a="700"===i.fontWeight||"bold"===i.fontWeight,u=c.includes("line-through"),h="italic"===i.fontStyle,p=c.includes("underline");return {after:e=>{const t=[];let n=null;const o=()=>{if(n){const e=n.getFirstChild();Fn(e)&&1===n.getChildrenSize()&&e.remove();}};for(const r of e)Xs(r)||Qn(r)||Fn(r)?(Qn(r)&&(a&&r.toggleFormat("bold"),u&&r.toggleFormat("strikethrough"),h&&r.toggleFormat("italic"),p&&r.toggleFormat("underline")),n?n.append(r):(n=Pi().append(r),t.push(n))):(t.push(r),o(),n=null);return o(),0===t.length&&t.push(Pi()),t},node:r}}function xe(e=be.NO_STATUS,t=1,n){return eo(new ye(e,t,n))}function Re(e){return e instanceof ye}function Fe(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const e of t)o.append("v",e);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}class Oe extends fi{static getType(){return "tablerow"}static clone(e){return new Oe(e.__height,e.__key)}static importDOM(){return {tr:e=>({conversion:Ae,priority:0})}}static importJSON(e){return Ke().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setHeight(e.height)}constructor(e,t){super(t),this.__height=e;}exportJSON(){const e=this.getHeight();return {...super.exportJSON(),...void 0===e?void 0:{height:e}}}createDOM(t){const n=document.createElement("tr");return this.__height&&(n.style.height=`${this.__height}px`),rt$2(n,t.theme.tableRow),n}extractWithChild(e,t,n){return "html"===n}isShadowRoot(){return  true}setHeight(e){const t=this.getWritable();return t.__height=e,t}getHeight(){return this.getLatest().__height}updateDOM(e){return e.__height!==this.__height}canBeEmpty(){return  false}canIndent(){return  false}}function Ae(e){const n=e;let o;return we.test(n.style.height)&&(o=parseFloat(n.style.height)),{after:e=>_t$3(e,Re),node:Ke(o)}}function Ke(e){return eo(new Oe(e))}function Ee(e){return e instanceof Oe}const ke="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement,Me=ke&&"documentMode"in document?document.documentMode:null;function Le(e,t,n=true){const o=dn();for(let r=0;r<e;r++){const e=Ke();for(let o=0;o<t;o++){let t=be.NO_STATUS;"object"==typeof n?(0===r&&n.rows&&(t|=be.ROW),0===o&&n.columns&&(t|=be.COLUMN)):n&&(0===r&&(t|=be.ROW),0===o&&(t|=be.COLUMN));const l=xe(t),s=Pi();s.append(Xn()),l.append(s),e.append(l);}o.append(e);}return o}ke&&"InputEvent"in window&&!Me&&new window.InputEvent("input");function ht$2(e,t,n){const o=[];let r=null,l=null;function s(e){let t=o[e];return void 0===t&&(o[e]=t=[]),t}const i=e.getChildren();for(let e=0;e<i.length;e++){const o=i[e];Ee(o)||Fe(209);const c=s(e);for(let a=o.getFirstChild(),u=0;null!=a;a=a.getNextSibling()){for(Re(a)||Fe(147);void 0!==c[u];)u++;const o={cell:a,startColumn:u,startRow:e},{__rowSpan:h,__colSpan:d}=a;for(let t=0;t<h&&!(e+t>=i.length);t++){const n=s(e+t);for(let e=0;e<d;e++)n[u+e]=o;}}}return [o,r,l]}function xt$2(e){return uo(e)&&"TABLE"===e.nodeName}function Ft$1(e,t){for(let n=t,o=null;null!==n;n=n.getParent()){if(e.is(n))return o;Re(n)&&(o=n);}return null}function on(e,t,n){return Ft$1(e,ds(t,n))}function rn(t,n,r){if(!n.theme.tableAlignment)return;const l=[],s=[];for(const e of ["center","right"]){const t=n.theme.tableAlignment[e];t&&(e===r?s:l).push(t);}it$3(t,...l),rt$2(t,...s);}const ln=new WeakSet;function sn(e=mo()){return ln.has(e)}class an extends fi{static getType(){return "table"}getColWidths(){return this.getLatest().__colWidths}setColWidths(e){const t=this.getWritable();return t.__colWidths=e,t}static clone(e){return new an(e.__key)}afterCloneFrom(e){super.afterCloneFrom(e),this.__colWidths=e.__colWidths,this.__rowStriping=e.__rowStriping,this.__frozenColumnCount=e.__frozenColumnCount,this.__frozenRowCount=e.__frozenRowCount;}static importDOM(){return {table:e=>({conversion:hn,priority:1})}}static importJSON(e){return dn().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setRowStriping(e.rowStriping||false).setFrozenColumns(e.frozenColumnCount||0).setFrozenRows(e.frozenRowCount||0).setColWidths(e.colWidths)}constructor(e){super(e),this.__rowStriping=false,this.__frozenColumnCount=0,this.__frozenRowCount=0;}exportJSON(){return {...super.exportJSON(),colWidths:this.getColWidths(),frozenColumnCount:this.__frozenColumnCount?this.__frozenColumnCount:void 0,frozenRowCount:this.__frozenRowCount?this.__frozenRowCount:void 0,rowStriping:this.__rowStriping?this.__rowStriping:void 0}}extractWithChild(e,t,n){return "html"===n}getDOMSlot(e){const t=xt$2(e)?e:e.querySelector("table");return xt$2(t)||Fe(229),super.getDOMSlot(e).withElement(t).withAfter(t.querySelector("colgroup"))}createDOM(t,n){const o=document.createElement("table");this.__style&&(o.style.cssText=this.__style);const r=document.createElement("colgroup");if(o.appendChild(r),To(r),rt$2(o,t.theme.table),this.updateTableElement(null,o,t),sn(n)){const n=document.createElement("div"),r=t.theme.tableScrollableWrapper;return r?rt$2(n,r):n.style.cssText="overflow-x: auto;",n.appendChild(o),this.updateTableWrapper(null,n,o,t),n}return o}updateTableWrapper(t,n,r,l){this.__frozenColumnCount!==(t?t.__frozenColumnCount:0)&&function(t,n,r,l){l>0?(rt$2(t,r.theme.tableFrozenColumn),n.setAttribute("data-lexical-frozen-column","true")):(it$3(t,r.theme.tableFrozenColumn),n.removeAttribute("data-lexical-frozen-column"));}(n,r,l,this.__frozenColumnCount),this.__frozenRowCount!==(t?t.__frozenRowCount:0)&&function(t,n,r,l){l>0?(rt$2(t,r.theme.tableFrozenRow),n.setAttribute("data-lexical-frozen-row","true")):(it$3(t,r.theme.tableFrozenRow),n.removeAttribute("data-lexical-frozen-row"));}(n,r,l,this.__frozenRowCount);}updateTableElement(t,n,r){this.__style!==(t?t.__style:"")&&(n.style.cssText=this.__style),this.__rowStriping!==(!!t&&t.__rowStriping)&&function(t,n,r){r?(rt$2(t,n.theme.tableRowStriping),t.setAttribute("data-lexical-row-striping","true")):(it$3(t,n.theme.tableRowStriping),t.removeAttribute("data-lexical-row-striping"));}(n,r,this.__rowStriping),function(e,t,n,o){const r=e.querySelector("colgroup");if(!r)return;const l=[];for(let e=0;e<n;e++){const t=document.createElement("col"),n=o&&o[e];n&&(t.style.width=`${n}px`),l.push(t);}r.replaceChildren(...l);}(n,0,this.getColumnCount(),this.getColWidths()),rn(n,r,this.getFormatType());}updateDOM(e,t,n){const o=this.getDOMSlot(t).element;return t===o===sn()||(uo(r=t)&&"DIV"===r.nodeName&&this.updateTableWrapper(e,t,o,n),this.updateTableElement(e,o,n),false);var r;}exportDOM(e){const t=super.exportDOM(e),{element:n}=t;return {after:n=>{if(t.after&&(n=t.after(n)),!xt$2(n)&&uo(n)&&(n=n.querySelector("table")),!xt$2(n))return null;rn(n,e._config,this.getFormatType());const[o]=ht$2(this),r=new Map;for(const e of o)for(const t of e){const e=t.cell.getKey();r.has(e)||r.set(e,{colSpan:t.cell.getColSpan(),startColumn:t.startColumn});}const s=new Set;for(const e of n.querySelectorAll(":scope > tr > [data-temporary-table-cell-lexical-key]")){const t=e.getAttribute("data-temporary-table-cell-lexical-key");if(t){const n=r.get(t);if(e.removeAttribute("data-temporary-table-cell-lexical-key"),n){r.delete(t);for(let e=0;e<n.colSpan;e++)s.add(e+n.startColumn);}}}const i=n.querySelector(":scope > colgroup");if(i){const e=Array.from(n.querySelectorAll(":scope > colgroup > col")).filter(((e,t)=>s.has(t)));i.replaceChildren(...e);}const c=n.querySelectorAll(":scope > tr");if(c.length>0){const e=document.createElement("tbody");for(const t of c)e.appendChild(t);n.append(e);}return n},element:!xt$2(n)&&uo(n)?n.querySelector("table"):n}}canBeEmpty(){return  false}isShadowRoot(){return  true}getCordsFromCellNode(e,t){const{rows:n,domRows:o}=t;for(let t=0;t<n;t++){const n=o[t];if(null!=n)for(let o=0;o<n.length;o++){const r=n[o];if(null==r)continue;const{elem:l}=r,s=on(this,l);if(null!==s&&e.is(s))return {x:o,y:t}}}throw new Error("Cell not found in table.")}getDOMCellFromCords(e,t,n){const{domRows:o}=n,r=o[t];if(null==r)return null;const l=r[e<r.length?e:r.length-1];return null==l?null:l}getDOMCellFromCordsOrThrow(e,t,n){const o=this.getDOMCellFromCords(e,t,n);if(!o)throw new Error("Cell not found at cords.");return o}getCellNodeFromCords(e,t,n){const o=this.getDOMCellFromCords(e,t,n);if(null==o)return null;const r=ds(o.elem);return Re(r)?r:null}getCellNodeFromCordsOrThrow(e,t,n){const o=this.getCellNodeFromCords(e,t,n);if(!o)throw new Error("Node at cords not TableCellNode.");return o}getRowStriping(){return Boolean(this.getLatest().__rowStriping)}setRowStriping(e){const t=this.getWritable();return t.__rowStriping=e,t}setFrozenColumns(e){const t=this.getWritable();return t.__frozenColumnCount=e,t}getFrozenColumns(){return this.getLatest().__frozenColumnCount}setFrozenRows(e){const t=this.getWritable();return t.__frozenRowCount=e,t}getFrozenRows(){return this.getLatest().__frozenRowCount}canSelectBefore(){return  true}canIndent(){return  false}getColumnCount(){const e=this.getFirstChild();if(!e)return 0;let t=0;return e.getChildren().forEach((e=>{Re(e)&&(t+=e.getColSpan());})),t}}function hn(e){const n=dn();e.hasAttribute("data-lexical-row-striping")&&n.setRowStriping(true),e.hasAttribute("data-lexical-frozen-column")&&n.setFrozenColumns(1),e.hasAttribute("data-lexical-frozen-row")&&n.setFrozenRows(1);const o=e.querySelector(":scope > colgroup");if(o){let e=[];for(const t of o.querySelectorAll(":scope > col")){let n=t.style.width||"";if(!we.test(n)&&(n=t.getAttribute("width")||"",!/^\d+$/.test(n))){e=void 0;break}e.push(parseFloat(n));}e&&n.setColWidths(e);}return {after:e=>_t$3(e,Ee),node:n}}function dn(){return eo(new an)}

/* **********************************************
     Begin prism-core.js
********************************************** */

/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism$1 = (function (_self) {

	// Private helper vars
	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		manual: _self.Prism && _self.Prism.manual,
		/**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element) {
					var m = lang.exec(element.className);
					if (m) {
						return m[1].toLowerCase();
					}
					element = element.parentElement;
				}
				return 'none';
			},

			/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */
			setLanguage: function (element, language) {
				// remove all `language-xxxx` classes
				// (this might leave behind a leading space)
				element.className = element.className.replace(RegExp(lang, 'gi'), '');

				// add the new `language-xxxx` class
				// (using `classList` will automatically clean up spaces for us)
				element.classList.add('language-' + language);
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null;
				}
				if (document.currentScript && document.currentScript.tagName === 'SCRIPT' && 1 < 2 /* hack to trip TS' flow analysis */) {
					return /** @type {any} */ (document.currentScript);
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error();
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
					if (src) {
						var scripts = document.getElementsByTagName('script');
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i];
							}
						}
					}
					return null;
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run('before-highlightall', env);

			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			_.hooks.run('before-all-elements-highlight', env);

			for (var i = 0, element; (element = env.elements[i++]);) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element);
			var grammar = _.languages[language];

			// Set language on the element, if not present
			_.util.setLanguage(element, language);

			// Set language on the parent, for styling
			var parent = element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				_.util.setLanguage(parent, language);
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
			}

			_.hooks.run('before-sanity-check', env);

			// plugins may change/add the parent/element
			parent = env.element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
				parent.setAttribute('tabindex', '0');
			}

			if (!env.code) {
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code));
				return;
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			if (!env.grammar) {
				throw new Error('The language "' + env.language + '" has no grammar.');
			}
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};
	_self.Prism = _;


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match || match.index >= text.length) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}


	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _;
	}

	// Get current script and highlight
	var script = _.util.currentScript();

	if (script) {
		_.filename = script.src;

		if (script.hasAttribute('data-manual')) {
			_.manual = true;
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll();
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState;
		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback);
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16);
			}
		}
	}

	return _;

}(_self));

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism$1;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism$1;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism$1.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism$1.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism$1.languages.markup['entity'];
Prism$1.languages.markup['doctype'].inside['internal-subset'].inside = Prism$1.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism$1.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism$1.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism$1.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism$1.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism$1.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism$1.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism$1.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism$1.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism$1.languages.html = Prism$1.languages.markup;
Prism$1.languages.mathml = Prism$1.languages.markup;
Prism$1.languages.svg = Prism$1.languages.markup;

Prism$1.languages.xml = Prism$1.languages.extend('markup', {});
Prism$1.languages.ssml = Prism$1.languages.xml;
Prism$1.languages.atom = Prism$1.languages.xml;
Prism$1.languages.rss = Prism$1.languages.xml;


/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism$1));


/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism$1.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	'boolean': /\b(?:false|true)\b/,
	'function': /\b\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism$1.languages.javascript = Prism$1.languages.extend('clike', {
	'class-name': [
		Prism$1.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism$1.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism$1.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism$1.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism$1.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism$1.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism$1.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism$1.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism$1.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism$1.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism$1.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism$1.languages.markup) {
	Prism$1.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism$1.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism$1.languages.js = Prism$1.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {

	if (typeof Prism$1 === 'undefined' || typeof document === 'undefined') {
		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var LOADING_MESSAGE = 'Loading…';
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message;
	};
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

	var EXTENSIONS = {
		'js': 'javascript',
		'py': 'python',
		'rb': 'ruby',
		'ps1': 'powershell',
		'psm1': 'powershell',
		'sh': 'bash',
		'bat': 'batch',
		'h': 'c',
		'tex': 'latex'
	};

	var STATUS_ATTR = 'data-src-status';
	var STATUS_LOADING = 'loading';
	var STATUS_LOADED = 'loaded';
	var STATUS_FAILED = 'failed';

	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

	/**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */
	function loadFile(src, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status < 400 && xhr.responseText) {
					success(xhr.responseText);
				} else {
					if (xhr.status >= 400) {
						error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
					} else {
						error(FAILURE_EMPTY_MESSAGE);
					}
				}
			}
		};
		xhr.send(null);
	}

	/**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */
	function parseRange(range) {
		var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
		if (m) {
			var start = Number(m[1]);
			var comma = m[2];
			var end = m[3];

			if (!comma) {
				return [start, start];
			}
			if (!end) {
				return [start, undefined];
			}
			return [start, Number(end)];
		}
		return undefined;
	}

	Prism$1.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR;
	});

	Prism$1.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element);
		if (pre.matches(SELECTOR)) {
			env.code = ''; // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'));
			code.textContent = LOADING_MESSAGE;

			var src = pre.getAttribute('data-src');

			var language = env.language;
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
				language = EXTENSIONS[extension] || extension;
			}

			// set language classes
			Prism$1.util.setLanguage(code, language);
			Prism$1.util.setLanguage(pre, language);

			// preload the language
			var autoloader = Prism$1.plugins.autoloader;
			if (autoloader) {
				autoloader.loadLanguages(language);
			}

			// load file
			loadFile(
				src,
				function (text) {
					// mark as loaded
					pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

					// handle data-range
					var range = parseRange(pre.getAttribute('data-range'));
					if (range) {
						var lines = text.split(/\r\n?|\n/g);

						// the range is one-based and inclusive on both ends
						var start = range[0];
						var end = range[1] == null ? lines.length : range[1];

						if (start < 0) { start += lines.length; }
						start = Math.max(0, Math.min(start - 1, lines.length));
						if (end < 0) { end += lines.length; }
						end = Math.max(0, Math.min(end, lines.length));

						text = lines.slice(start, end).join('\n');

						// add data-start for line numbers
						if (!pre.hasAttribute('data-start')) {
							pre.setAttribute('data-start', String(start + 1));
						}
					}

					// highlight code
					code.textContent = text;
					Prism$1.highlightElement(code);
				},
				function (error) {
					// mark as failed
					pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

					code.textContent = error;
				}
			);
		}
	});

	Prism$1.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);

			for (var i = 0, element; (element = elements[i++]);) {
				Prism$1.highlightElement(element);
			}
		}
	};

	var logged = false;
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism$1.fileHighlight = function () {
		if (!logged) {
			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
			logged = true;
		}
		Prism$1.plugins.fileHighlight.highlight.apply(this, arguments);
	};

}());

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	'boolean': /\b(?:false|true)\b/,
	'function': /\b\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;

Prism.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;

(function (Prism) {

	// Allow only one line break
	var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;

	/**
	 * This function is intended for the creation of the bold or italic pattern.
	 *
	 * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
	 *
	 * _Note:_ Keep in mind that this adds a capturing group.
	 *
	 * @param {string} pattern
	 * @returns {RegExp}
	 */
	function createInline(pattern) {
		pattern = pattern.replace(/<inner>/g, function () { return inner; });
		return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
	}


	var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
	var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () { return tableCell; });
	var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;


	Prism.languages.markdown = Prism.languages.extend('markup', {});
	Prism.languages.insertBefore('markdown', 'prolog', {
		'front-matter-block': {
			pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
			lookbehind: true,
			greedy: true,
			inside: {
				'punctuation': /^---|---$/,
				'front-matter': {
					pattern: /\S+(?:\s+\S+)*/,
					alias: ['yaml', 'language-yaml'],
					inside: Prism.languages.yaml
				}
			}
		},
		'blockquote': {
			// > ...
			pattern: /^>(?:[\t ]*>)*/m,
			alias: 'punctuation'
		},
		'table': {
			pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
			inside: {
				'table-data-rows': {
					pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
					lookbehind: true,
					inside: {
						'table-data': {
							pattern: RegExp(tableCell),
							inside: Prism.languages.markdown
						},
						'punctuation': /\|/
					}
				},
				'table-line': {
					pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
					lookbehind: true,
					inside: {
						'punctuation': /\||:?-{3,}:?/
					}
				},
				'table-header-row': {
					pattern: RegExp('^' + tableRow + '$'),
					inside: {
						'table-header': {
							pattern: RegExp(tableCell),
							alias: 'important',
							inside: Prism.languages.markdown
						},
						'punctuation': /\|/
					}
				}
			}
		},
		'code': [
			{
				// Prefixed by 4 spaces or 1 tab and preceded by an empty line
				pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
				lookbehind: true,
				alias: 'keyword'
			},
			{
				// ```optional language
				// code block
				// ```
				pattern: /^```[\s\S]*?^```$/m,
				greedy: true,
				inside: {
					'code-block': {
						pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
						lookbehind: true
					},
					'code-language': {
						pattern: /^(```).+/,
						lookbehind: true
					},
					'punctuation': /```/
				}
			}
		],
		'title': [
			{
				// title 1
				// =======

				// title 2
				// -------
				pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
				alias: 'important',
				inside: {
					punctuation: /==+$|--+$/
				}
			},
			{
				// # title 1
				// ###### title 6
				pattern: /(^\s*)#.+/m,
				lookbehind: true,
				alias: 'important',
				inside: {
					punctuation: /^#+|#+$/
				}
			}
		],
		'hr': {
			// ***
			// ---
			// * * *
			// -----------
			pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'list': {
			// * item
			// + item
			// - item
			// 1. item
			pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'url-reference': {
			// [id]: http://example.com "Optional title"
			// [id]: http://example.com 'Optional title'
			// [id]: http://example.com (Optional title)
			// [id]: <http://example.com> "Optional title"
			pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
			inside: {
				'variable': {
					pattern: /^(!?\[)[^\]]+/,
					lookbehind: true
				},
				'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
				'punctuation': /^[\[\]!:]|[<>]/
			},
			alias: 'url'
		},
		'bold': {
			// **strong**
			// __strong__

			// allow one nested instance of italic text using the same delimiter
			pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^..)[\s\S]+(?=..$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /\*\*|__/
			}
		},
		'italic': {
			// *em*
			// _em_

			// allow one nested instance of bold text using the same delimiter
			pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^.)[\s\S]+(?=.$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /[*_]/
			}
		},
		'strike': {
			// ~~strike through~~
			// ~strike~
			// eslint-disable-next-line regexp/strict
			pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^~~?)[\s\S]+(?=\1$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /~~?/
			}
		},
		'code-snippet': {
			// `code`
			// ``code``
			pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
			lookbehind: true,
			greedy: true,
			alias: ['code', 'keyword']
		},
		'url': {
			// [example](http://example.com "Optional title")
			// [example][id]
			// [example] [id]
			pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'operator': /^!/,
				'content': {
					pattern: /(^\[)[^\]]+(?=\])/,
					lookbehind: true,
					inside: {} // see below
				},
				'variable': {
					pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
					lookbehind: true
				},
				'url': {
					pattern: /(^\]\()[^\s)]+/,
					lookbehind: true
				},
				'string': {
					pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
					lookbehind: true
				}
			}
		}
	});

	['url', 'bold', 'italic', 'strike'].forEach(function (token) {
		['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (inside) {
			if (token !== inside) {
				Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
			}
		});
	});

	Prism.hooks.add('after-tokenize', function (env) {
		if (env.language !== 'markdown' && env.language !== 'md') {
			return;
		}

		function walkTokens(tokens) {
			if (!tokens || typeof tokens === 'string') {
				return;
			}

			for (var i = 0, l = tokens.length; i < l; i++) {
				var token = tokens[i];

				if (token.type !== 'code') {
					walkTokens(token.content);
					continue;
				}

				/*
				 * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
				 * is optional. But the grammar is defined so that there is only one case we have to handle:
				 *
				 * token.content = [
				 *     <span class="punctuation">```</span>,
				 *     <span class="code-language">xxxx</span>,
				 *     '\n', // exactly one new lines (\r or \n or \r\n)
				 *     <span class="code-block">...</span>,
				 *     '\n', // exactly one new lines again
				 *     <span class="punctuation">```</span>
				 * ];
				 */

				var codeLang = token.content[1];
				var codeBlock = token.content[3];

				if (codeLang && codeBlock &&
					codeLang.type === 'code-language' && codeBlock.type === 'code-block' &&
					typeof codeLang.content === 'string') {

					// this might be a language that Prism does not support

					// do some replacements to support C++, C#, and F#
					var lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp');
					// only use the first word
					lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase();
					var alias = 'language-' + lang;

					// add alias
					if (!codeBlock.alias) {
						codeBlock.alias = [alias];
					} else if (typeof codeBlock.alias === 'string') {
						codeBlock.alias = [codeBlock.alias, alias];
					} else {
						codeBlock.alias.push(alias);
					}
				}
			}
		}

		walkTokens(env.tokens);
	});

	Prism.hooks.add('wrap', function (env) {
		if (env.type !== 'code-block') {
			return;
		}

		var codeLang = '';
		for (var i = 0, l = env.classes.length; i < l; i++) {
			var cls = env.classes[i];
			var match = /language-(.+)/.exec(cls);
			if (match) {
				codeLang = match[1];
				break;
			}
		}

		var grammar = Prism.languages[codeLang];

		if (!grammar) {
			if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
				var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
				env.attributes['id'] = id;

				Prism.plugins.autoloader.loadLanguages(codeLang, function () {
					var ele = document.getElementById(id);
					if (ele) {
						ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
					}
				});
			}
		} else {
			env.content = Prism.highlight(textContent(env.content), grammar, codeLang);
		}
	});

	var tagPattern = RegExp(Prism.languages.markup.tag.pattern.source, 'gi');

	/**
	 * A list of known entity names.
	 *
	 * This will always be incomplete to save space. The current list is the one used by lowdash's unescape function.
	 *
	 * @see {@link https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/unescape.js#L2}
	 */
	var KNOWN_ENTITY_NAMES = {
		'amp': '&',
		'lt': '<',
		'gt': '>',
		'quot': '"',
	};

	// IE 11 doesn't support `String.fromCodePoint`
	var fromCodePoint = String.fromCodePoint || String.fromCharCode;

	/**
	 * Returns the text content of a given HTML source code string.
	 *
	 * @param {string} html
	 * @returns {string}
	 */
	function textContent(html) {
		// remove all tags
		var text = html.replace(tagPattern, '');

		// decode known entities
		text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (m, code) {
			code = code.toLowerCase();

			if (code[0] === '#') {
				var value;
				if (code[1] === 'x') {
					value = parseInt(code.slice(2), 16);
				} else {
					value = Number(code.slice(1));
				}

				return fromCodePoint(value);
			} else {
				var known = KNOWN_ENTITY_NAMES[code];
				if (known) {
					return known;
				}

				// unable to decode
				return m;
			}
		});

		return text;
	}

	Prism.languages.md = Prism.languages.markdown;

}(Prism));

Prism.languages.c = Prism.languages.extend('clike', {
	'comment': {
		pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: true
	},
	'string': {
		// https://en.cppreference.com/w/c/language/string_literal
		pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
		lookbehind: true
	},
	'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
	'function': /\b[a-z_]\w*(?=\s*\()/i,
	'number': /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
	'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
});

Prism.languages.insertBefore('c', 'string', {
	'char': {
		// https://en.cppreference.com/w/c/language/character_constant
		pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
		greedy: true
	}
});

Prism.languages.insertBefore('c', 'string', {
	'macro': {
		// allow for multiline macro definitions
		// spaces after the # character compile fine with gcc
		pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
		lookbehind: true,
		greedy: true,
		alias: 'property',
		inside: {
			'string': [
				{
					// highlight the path of the include statement as a string
					pattern: /^(#\s*include\s*)<[^>]+>/,
					lookbehind: true
				},
				Prism.languages.c['string']
			],
			'char': Prism.languages.c['char'],
			'comment': Prism.languages.c['comment'],
			'macro-name': [
				{
					pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
					lookbehind: true
				},
				{
					pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
					lookbehind: true,
					alias: 'function'
				}
			],
			// highlight macro directives as keywords
			'directive': {
				pattern: /^(#\s*)[a-z]+/,
				lookbehind: true,
				alias: 'keyword'
			},
			'directive-hash': /^#/,
			'punctuation': /##|\\(?=[\r\n])/,
			'expression': {
				pattern: /\S[\s\S]*/,
				inside: Prism.languages.c
			}
		}
	}
});

Prism.languages.insertBefore('c', 'function', {
	// highlight predefined macros as constants
	'constant': /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
});

delete Prism.languages.c['boolean'];

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism));

Prism.languages.objectivec = Prism.languages.extend('c', {
	'string': {
		pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
		greedy: true
	},
	'keyword': /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
	'operator': /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
});

delete Prism.languages.objectivec['class-name'];

Prism.languages.objc = Prism.languages.objectivec;

Prism.languages.sql = {
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
		lookbehind: true
	},
	'variable': [
		{
			pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
			greedy: true
		},
		/@[\w.$]+/
	],
	'string': {
		pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
		greedy: true,
		lookbehind: true
	},
	'identifier': {
		pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
		greedy: true,
		lookbehind: true,
		inside: {
			'punctuation': /^`|`$/
		}
	},
	'function': /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i, // Should we highlight user defined functions too?
	'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
	'boolean': /\b(?:FALSE|NULL|TRUE)\b/i,
	'number': /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
	'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
	'punctuation': /[;[\]()`,.]/
};

(function (Prism) {

	var powershell = Prism.languages.powershell = {
		'comment': [
			{
				pattern: /(^|[^`])<#[\s\S]*?#>/,
				lookbehind: true
			},
			{
				pattern: /(^|[^`])#.*/,
				lookbehind: true
			}
		],
		'string': [
			{
				pattern: /"(?:`[\s\S]|[^`"])*"/,
				greedy: true,
				inside: null // see below
			},
			{
				pattern: /'(?:[^']|'')*'/,
				greedy: true
			}
		],
		// Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices
		// Supports two levels of nested brackets (e.g. `[OutputType([System.Collections.Generic.List[int]])]`)
		'namespace': /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
		'boolean': /\$(?:false|true)\b/i,
		'variable': /\$\w+\b/,
		// Cmdlets and aliases. Aliases should come last, otherwise "write" gets preferred over "write-host" for example
		// Get-Command | ?{ $_.ModuleName -match "Microsoft.PowerShell.(Util|Core|Management)" }
		// Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match "Microsoft.PowerShell.(Util|Core|Management)" }
		'function': [
			/\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
			/\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i
		],
		// per http://technet.microsoft.com/en-us/library/hh847744.aspx
		'keyword': /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
		'operator': {
			pattern: /(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
			lookbehind: true
		},
		'punctuation': /[|{}[\];(),.]/
	};

	// Variable interpolation inside strings, and nested expressions
	powershell.string[0].inside = {
		'function': {
			// Allow for one level of nesting
			pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
			lookbehind: true,
			inside: powershell
		},
		'boolean': powershell.boolean,
		'variable': powershell.variable,
	};

}(Prism));

Prism.languages.python = {
	'comment': {
		pattern: /(^|[^\\])#.*/,
		lookbehind: true,
		greedy: true
	},
	'string-interpolation': {
		pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
		greedy: true,
		inside: {
			'interpolation': {
				// "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
				pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
				lookbehind: true,
				inside: {
					'format-spec': {
						pattern: /(:)[^:(){}]+(?=\}$)/,
						lookbehind: true
					},
					'conversion-option': {
						pattern: /![sra](?=[:}]$)/,
						alias: 'punctuation'
					},
					rest: null
				}
			},
			'string': /[\s\S]+/
		}
	},
	'triple-quoted-string': {
		pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
		greedy: true,
		alias: 'string'
	},
	'string': {
		pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
		greedy: true
	},
	'function': {
		pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
		lookbehind: true
	},
	'class-name': {
		pattern: /(\bclass\s+)\w+/i,
		lookbehind: true
	},
	'decorator': {
		pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
		lookbehind: true,
		alias: ['annotation', 'punctuation'],
		inside: {
			'punctuation': /\./
		}
	},
	'keyword': /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
	'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	'boolean': /\b(?:False|None|True)\b/,
	'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
	'operator': /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;

Prism.languages.py = Prism.languages.python;

(function (Prism) {

	var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
	for (var i = 0; i < 2; i++) {
		// support 4 levels of nested comments
		multilineComment = multilineComment.replace(/<self>/g, function () { return multilineComment; });
	}
	multilineComment = multilineComment.replace(/<self>/g, function () { return /[^\s\S]/.source; });


	Prism.languages.rust = {
		'comment': [
			{
				pattern: RegExp(/(^|[^\\])/.source + multilineComment),
				lookbehind: true,
				greedy: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}
		],
		'string': {
			pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
			greedy: true
		},
		'char': {
			pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
			greedy: true
		},
		'attribute': {
			pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
			greedy: true,
			alias: 'attr-name',
			inside: {
				'string': null // see below
			}
		},

		// Closure params should not be confused with bitwise OR |
		'closure-params': {
			pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
			lookbehind: true,
			greedy: true,
			inside: {
				'closure-punctuation': {
					pattern: /^\||\|$/,
					alias: 'punctuation'
				},
				rest: null // see below
			}
		},

		'lifetime-annotation': {
			pattern: /'\w+/,
			alias: 'symbol'
		},

		'fragment-specifier': {
			pattern: /(\$\w+:)[a-z]+/,
			lookbehind: true,
			alias: 'punctuation'
		},
		'variable': /\$\w+/,

		'function-definition': {
			pattern: /(\bfn\s+)\w+/,
			lookbehind: true,
			alias: 'function'
		},
		'type-definition': {
			pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
			lookbehind: true,
			alias: 'class-name'
		},
		'module-declaration': [
			{
				pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
				lookbehind: true,
				alias: 'namespace'
			},
			{
				pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
				lookbehind: true,
				alias: 'namespace',
				inside: {
					'punctuation': /::/
				}
			}
		],
		'keyword': [
			// https://github.com/rust-lang/reference/blob/master/src/keywords.md
			/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
			// primitives and str
			// https://doc.rust-lang.org/stable/rust-by-example/primitives.html
			/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/
		],

		// functions can technically start with an upper-case letter, but this will introduce a lot of false positives
		// and Rust's naming conventions recommend snake_case anyway.
		// https://doc.rust-lang.org/1.0.0/style/style/naming/README.html
		'function': /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
		'macro': {
			pattern: /\b\w+!/,
			alias: 'property'
		},
		'constant': /\b[A-Z_][A-Z_\d]+\b/,
		'class-name': /\b[A-Z]\w*\b/,

		'namespace': {
			pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
			inside: {
				'punctuation': /::/
			}
		},

		// Hex, oct, bin, dec numbers with visual separators and type suffix
		'number': /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
		'boolean': /\b(?:false|true)\b/,
		'punctuation': /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
		'operator': /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
	};

	Prism.languages.rust['closure-params'].inside.rest = Prism.languages.rust;
	Prism.languages.rust['attribute'].inside['string'] = Prism.languages.rust['string'];

}(Prism));

Prism.languages.swift = {
	'comment': {
		// Nested comments are supported up to 2 levels
		pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
		lookbehind: true,
		greedy: true
	},
	'string-literal': [
		// https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html
		{
			pattern: RegExp(
				/(^|[^"#])/.source
				+ '(?:'
				// single-line string
				+ /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source
				+ '|'
				// multi-line string
				+ /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source
				+ ')'
				+ /(?!["#])/.source
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
					lookbehind: true,
					inside: null // see below
				},
				'interpolation-punctuation': {
					pattern: /^\)|\\\($/,
					alias: 'punctuation'
				},
				'punctuation': /\\(?=[\r\n])/,
				'string': /[\s\S]+/
			}
		},
		{
			pattern: RegExp(
				/(^|[^"#])(#+)/.source
				+ '(?:'
				// single-line string
				+ /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source
				+ '|'
				// multi-line string
				+ /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source
				+ ')'
				+ '\\2'
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
					lookbehind: true,
					inside: null // see below
				},
				'interpolation-punctuation': {
					pattern: /^\)|\\#+\($/,
					alias: 'punctuation'
				},
				'string': /[\s\S]+/
			}
		},
	],

	'directive': {
		// directives with conditions
		pattern: RegExp(
			/#/.source
			+ '(?:'
			+ (
				/(?:elseif|if)\b/.source
				+ '(?:[ \t]*'
				// This regex is a little complex. It's equivalent to this:
				//   (?:![ \t]*)?(?:\b\w+\b(?:[ \t]*<round>)?|<round>)(?:[ \t]*(?:&&|\|\|))?
				// where <round> is a general parentheses expression.
				+ /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source
				+ ')+'
			)
			+ '|'
			+ /(?:else|endif)\b/.source
			+ ')'
		),
		alias: 'property',
		inside: {
			'directive-name': /^#\w+/,
			'boolean': /\b(?:false|true)\b/,
			'number': /\b\d+(?:\.\d+)*\b/,
			'operator': /!|&&|\|\||[<>]=?/,
			'punctuation': /[(),]/
		}
	},
	'literal': {
		pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
		alias: 'constant'
	},
	'other-directive': {
		pattern: /#\w+\b/,
		alias: 'property'
	},

	'attribute': {
		pattern: /@\w+/,
		alias: 'atrule'
	},

	'function-definition': {
		pattern: /(\bfunc\s+)\w+/,
		lookbehind: true,
		alias: 'function'
	},
	'label': {
		// https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID141
		pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
		lookbehind: true,
		alias: 'important'
	},

	'keyword': /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
	'boolean': /\b(?:false|true)\b/,
	'nil': {
		pattern: /\bnil\b/,
		alias: 'constant'
	},

	'short-argument': /\$\d+\b/,
	'omit': {
		pattern: /\b_\b/,
		alias: 'keyword'
	},
	'number': /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,

	// A class name must start with an upper-case letter and be either 1 letter long or contain a lower-case letter.
	'class-name': /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
	'function': /\b[a-z_]\w*(?=\s*\()/i,
	'constant': /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,

	// Operators are generic in Swift. Developers can even create new operators (e.g. +++).
	// https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html#ID481
	// This regex only supports ASCII operators.
	'operator': /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
	'punctuation': /[{}[\]();,.:\\]/
};

Prism.languages.swift['string-literal'].forEach(function (rule) {
	rule.inside['interpolation'].inside = Prism.languages.swift;
});

(function (Prism) {

	Prism.languages.typescript = Prism.languages.extend('javascript', {
		'class-name': {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
			lookbehind: true,
			greedy: true,
			inside: null // see below
		},
		'builtin': /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
	});

	// The keywords TypeScript adds to JavaScript
	Prism.languages.typescript.keyword.push(
		/\b(?:abstract|declare|is|keyof|readonly|require)\b/,
		// keywords that have to be followed by an identifier
		/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
		// This is for `import type *, {}`
		/\btype\b(?=\s*(?:[\{*]|$))/
	);

	// doesn't work with TS because TS is too complex
	delete Prism.languages.typescript['parameter'];
	delete Prism.languages.typescript['literal-property'];

	// a version of typescript specifically for highlighting types
	var typeInside = Prism.languages.extend('typescript', {});
	delete typeInside['class-name'];

	Prism.languages.typescript['class-name'].inside = typeInside;

	Prism.languages.insertBefore('typescript', 'function', {
		'decorator': {
			pattern: /@[$\w\xA0-\uFFFF]+/,
			inside: {
				'at': {
					pattern: /^@/,
					alias: 'operator'
				},
				'function': /^[\s\S]+/
			}
		},
		'generic-function': {
			// e.g. foo<T extends "bar" | "baz">( ...
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
			greedy: true,
			inside: {
				'function': /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
				'generic': {
					pattern: /<[\s\S]+/, // everything after the first <
					alias: 'class-name',
					inside: typeInside
				}
			}
		}
	});

	Prism.languages.ts = Prism.languages.typescript;

}(Prism));

(function (Prism) {

	var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;

	// full package (optional) + parent classes (optional)
	var classNamePrefix = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;

	// based on the java naming conventions
	var className = {
		pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
		lookbehind: true,
		inside: {
			'namespace': {
				pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
				inside: {
					'punctuation': /\./
				}
			},
			'punctuation': /\./
		}
	};

	Prism.languages.java = Prism.languages.extend('clike', {
		'string': {
			pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
			lookbehind: true,
			greedy: true
		},
		'class-name': [
			className,
			{
				// variables, parameters, and constructor references
				// this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
				pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),
				lookbehind: true,
				inside: className.inside
			},
			{
				// class names based on keyword
				// this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
				pattern: RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source + classNamePrefix + /[A-Z]\w*\b/.source),
				lookbehind: true,
				inside: className.inside
			}
		],
		'keyword': keywords,
		'function': [
			Prism.languages.clike.function,
			{
				pattern: /(::\s*)[a-z_]\w*/,
				lookbehind: true
			}
		],
		'number': /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
		'operator': {
			pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
			lookbehind: true
		},
		'constant': /\b[A-Z][A-Z_\d]+\b/
	});

	Prism.languages.insertBefore('java', 'string', {
		'triple-quoted-string': {
			// http://openjdk.java.net/jeps/355#Description
			pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
			greedy: true,
			alias: 'string'
		},
		'char': {
			pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
			greedy: true
		}
	});

	Prism.languages.insertBefore('java', 'class-name', {
		'annotation': {
			pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
			lookbehind: true,
			alias: 'punctuation'
		},
		'generics': {
			pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
			inside: {
				'class-name': className,
				'keyword': keywords,
				'punctuation': /[<>(),.:]/,
				'operator': /[?&|]/
			}
		},
		'import': [
			{
				pattern: RegExp(/(\bimport\s+)/.source + classNamePrefix + /(?:[A-Z]\w*|\*)(?=\s*;)/.source),
				lookbehind: true,
				inside: {
					'namespace': className.inside.namespace,
					'punctuation': /\./,
					'operator': /\*/,
					'class-name': /\w+/
				}
			},
			{
				pattern: RegExp(/(\bimport\s+static\s+)/.source + classNamePrefix + /(?:\w+|\*)(?=\s*;)/.source),
				lookbehind: true,
				alias: 'static',
				inside: {
					'namespace': className.inside.namespace,
					'static': /\b\w+$/,
					'punctuation': /\./,
					'operator': /\*/,
					'class-name': /\w+/
				}
			}
		],
		'namespace': {
			pattern: RegExp(
				/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/
					.source.replace(/<keyword>/g, function () { return keywords.source; })),
			lookbehind: true,
			inside: {
				'punctuation': /\./,
			}
		}
	});
}(Prism));

(function (Prism) {

	var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
	var modName = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function () { return keyword.source; });

	Prism.languages.cpp = Prism.languages.extend('c', {
		'class-name': [
			{
				pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source
					.replace(/<keyword>/g, function () { return keyword.source; })),
				lookbehind: true
			},
			// This is intended to capture the class name of method implementations like:
			//   void foo::bar() const {}
			// However! The `foo` in the above example could also be a namespace, so we only capture the class name if
			// it starts with an uppercase letter. This approximation should give decent results.
			/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
			// This will capture the class name before destructors like:
			//   Foo::~Foo() {}
			/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
			// This also intends to capture the class name of method implementations but here the class has template
			// parameters, so it can't be a namespace (until C++ adds generic namespaces).
			/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
		],
		'keyword': keyword,
		'number': {
			pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
			greedy: true
		},
		'operator': />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
		'boolean': /\b(?:false|true)\b/
	});

	Prism.languages.insertBefore('cpp', 'string', {
		'module': {
			// https://en.cppreference.com/w/cpp/language/modules
			pattern: RegExp(
				/(\b(?:import|module)\s+)/.source +
				'(?:' +
				// header-name
				/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source +
				'|' +
				// module name or partition or both
				/<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function () { return modName; }) +
				')'
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'string': /^[<"][\s\S]+/,
				'operator': /:/,
				'punctuation': /\./
			}
		},
		'raw-string': {
			pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
			alias: 'string',
			greedy: true
		}
	});

	Prism.languages.insertBefore('cpp', 'keyword', {
		'generic-function': {
			pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
			inside: {
				'function': /^\w+/,
				'generic': {
					pattern: /<[\s\S]+/,
					alias: 'class-name',
					inside: Prism.languages.cpp
				}
			}
		}
	});

	Prism.languages.insertBefore('cpp', 'operator', {
		'double-colon': {
			pattern: /::/,
			alias: 'punctuation'
		}
	});

	Prism.languages.insertBefore('cpp', 'class-name', {
		// the base clause is an optional list of parent classes
		// https://en.cppreference.com/w/cpp/language/class
		'base-clause': {
			pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
			lookbehind: true,
			greedy: true,
			inside: Prism.languages.extend('cpp', {})
		}
	});

	Prism.languages.insertBefore('inside', 'double-colon', {
		// All untokenized words that are not namespaces should be class names
		'class-name': /\b[a-z_]\w*\b(?!\s*::)/i
	}, Prism.languages.cpp['base-clause']);

}(Prism));

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function O(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const t of e)r.append("v",t);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const k=globalThis.Prism||window.Prism,L=t=>{try{return !!t&&k.languages.hasOwnProperty(t)}catch(t){return  false}};function A(e,n){for(const r of e.childNodes){if(uo(r)&&r.tagName===n)return  true;A(r,n);}return  false}const H="data-language",D="data-highlight-language";let M$1 = class M extends fi{static getType(){return "code"}static clone(t){return new M(t.__language,t.__key)}constructor(t,e){super(e),this.__language=t||void 0,this.__isSyntaxHighlightSupported=L(t);}createDOM(t){const n=document.createElement("code");rt$2(n,t.theme.code),n.setAttribute("spellcheck","false");const r=this.getLanguage();return r&&(n.setAttribute(H,r),this.getIsSyntaxHighlightSupported()&&n.setAttribute(D,r)),n}updateDOM(t,e,n){const r=this.__language,o=t.__language;return r?r!==o&&(e.setAttribute(H,r),this.__isSyntaxHighlightSupported&&e.setAttribute(D,r)):o&&(e.removeAttribute(H),t.__isSyntaxHighlightSupported&&e.removeAttribute(D)),false}exportDOM(t){const n=document.createElement("pre");rt$2(n,t._config.theme.code),n.setAttribute("spellcheck","false");const r=this.getLanguage();return r&&(n.setAttribute(H,r),this.getIsSyntaxHighlightSupported()&&n.setAttribute(D,r)),{element:n}}static importDOM(){return {code:t=>null!=t.textContent&&(/\r?\n/.test(t.textContent)||A(t,"BR"))?{conversion:E,priority:1}:null,div:()=>({conversion:F,priority:1}),pre:()=>({conversion:E,priority:0}),table:t=>K(t)?{conversion:B$1,priority:3}:null,td:t=>{const e=t,n=e.closest("table");return e.classList.contains("js-file-line")||n&&K(n)?{conversion:R,priority:3}:null},tr:t=>{const e=t.closest("table");return e&&K(e)?{conversion:R,priority:3}:null}}}static importJSON(t){return z().updateFromJSON(t)}updateFromJSON(t){return super.updateFromJSON(t).setLanguage(t.language)}exportJSON(){return {...super.exportJSON(),language:this.getLanguage()}}insertNewAfter(t,e=true){const n=this.getChildren(),r=n.length;if(r>=2&&"\n"===n[r-1].getTextContent()&&"\n"===n[r-2].getTextContent()&&t.isCollapsed()&&t.anchor.key===this.__key&&t.anchor.offset===r){n[r-1].remove(),n[r-2].remove();const t=Pi();return this.insertAfter(t,e),t}const{anchor:o,focus:i}=t,a=(o.isBefore(i)?o:i).getNode();if(Qn(a)){let t=nt$1(a);const e=[];for(;;)if(nr(t))e.push(er()),t=t.getNextSibling();else {if(!tt$1(t))break;{let n=0;const r=t.getTextContent(),o=t.getTextContentSize();for(;n<o&&" "===r[n];)n++;if(0!==n&&e.push(Z$1(" ".repeat(n))),n!==o)break;t=t.getNextSibling();}}const n=a.splitText(o.offset)[0],r=0===o.offset?0:1,i=n.getIndexWithinParent()+r,s=a.getParentOrThrow(),l=[Pn(),...e];s.splice(i,0,l);const p=e[e.length-1];p?p.select():0===o.offset?n.selectPrevious():n.getNextSibling().selectNext(0,0);}if(J$1(a)){const{offset:e}=t.anchor;a.splice(e,0,[Pn()]),a.select(e+1,e+1);}return null}canIndent(){return  false}collapseAtStart(){const t=Pi();return this.getChildren().forEach((e=>t.append(e))),this.replace(t),true}setLanguage(t){const e=this.getWritable();return e.__language=t||void 0,e.__isSyntaxHighlightSupported=L(t),e}getLanguage(){return this.getLatest().__language}getIsSyntaxHighlightSupported(){return this.getLatest().__isSyntaxHighlightSupported}};function z(t){return eo(new M$1(t))}function J$1(t){return t instanceof M$1}function E(t){return {node:z(t.getAttribute(H))}}function F(t){const e=t,n=I(e);return n||function(t){let e=t.parentElement;for(;null!==e;){if(I(e))return  true;e=e.parentElement;}return  false}(e)?{node:n?z():null}:{node:null}}function B$1(){return {node:z()}}function R(){return {node:null}}function I(t){return null!==t.style.fontFamily.match("monospace")}function K(t){return t.classList.contains("js-file-line-container")}const q="javascript";class V extends Jn{constructor(t="",e,n){super(t,n),this.__highlightType=e;}static getType(){return "code-highlight"}static clone(t){return new V(t.__text,t.__highlightType||void 0,t.__key)}getHighlightType(){return this.getLatest().__highlightType}setHighlightType(t){const e=this.getWritable();return e.__highlightType=t||void 0,e}canHaveFormat(){return  false}createDOM(t){const n=super.createDOM(t),r=Y$1(t.theme,this.__highlightType);return rt$2(n,r),n}updateDOM(t,r,o){const i=super.updateDOM(t,r,o),s=Y$1(o.theme,t.__highlightType),l=Y$1(o.theme,this.__highlightType);return s!==l&&(s&&it$3(r,s),l&&rt$2(r,l)),i}static importJSON(t){return Z$1().updateFromJSON(t)}updateFromJSON(t){return super.updateFromJSON(t).setHighlightType(t.highlightType)}exportJSON(){return {...super.exportJSON(),highlightType:this.getHighlightType()}}setFormat(t){return this}isParentRequired(){return  true}createParentElementNode(){return z()}}function Y$1(t,e){return e&&t&&t.codeHighlight&&t.codeHighlight[e]}function Z$1(t="",e){return eo(new V(t,e))}function tt$1(t){return t instanceof V}function et$1(t,e){let n=t;for(let o=Wo(t,e);o&&(tt$1(o.origin)||nr(o.origin));o=ct$3(o))n=o.origin;return n}function nt$1(t){return et$1(t,"previous")}function rt(t){return et$1(t,"next")}const ot$1={defaultLanguage:q,tokenize(t,e){return k.tokenize(t,k.languages[e||""]||k.languages[this.defaultLanguage])}};function it$1(t,e){let n=null,r=null,o=t,i=e,s=t.getTextContent();for(;;){if(0===i){if(o=o.getPreviousSibling(),null===o)break;if(tt$1(o)||nr(o)||Fn(o)||O(167),Fn(o)){n={node:o,offset:1};break}i=Math.max(0,o.getTextContentSize()-1),s=o.getTextContent();}else i--;const t=s[i];tt$1(o)&&" "!==t&&(r={node:o,offset:i});}if(null!==r)return r;let l=null;if(e<t.getTextContentSize())tt$1(t)&&(l=t.getTextContent()[e]);else {const e=t.getNextSibling();tt$1(e)&&(l=e.getTextContent()[0]);}if(null!==l&&" "!==l)return n;{const r=function(t,e){let n=t,r=e,o=t.getTextContent(),i=t.getTextContentSize();for(;;){if(!tt$1(n)||r===i){if(n=n.getNextSibling(),null===n||Fn(n))return null;tt$1(n)&&(r=0,o=n.getTextContent(),i=n.getTextContentSize());}if(tt$1(n)){if(" "!==o[r])return {node:n,offset:r};r++;}}}(t,e);return null!==r?r:n}}function st$1(t){const e=rt(t);return Fn(e)&&O(168),e}function lt$1(t,e,n){const r=t.getParent();J$1(r)?gt$1(r,e,n):tt$1(t)&&t.replace(Xn(t.__text));}function ut(t,e){const n=e.getElementByKey(t.getKey());if(null===n)return;const r=t.getChildren(),o=r.length;if(o===n.__cachedChildrenLength)return;n.__cachedChildrenLength=o;let i="1",s=1;for(let t=0;t<o;t++)Fn(r[t])&&(i+="\n"+ ++s);n.setAttribute("data-gutter",i);}const ct$1=new Set;function gt$1(t,e,n){const r=t.getKey();ct$1.has(r)||(ct$1.add(r),void 0===t.getLanguage()&&t.setLanguage(n.defaultLanguage),e.update((()=>{!function(t,e){const n=as(t);if(!J$1(n)||!n.isAttached())return;const r=Nr();if(!cr(r))return void e();const o=r.anchor,i=o.offset,s="element"===o.type&&Fn(n.getChildAtIndex(o.offset-1));let u=0;if(!s){const t=o.getNode();u=i+t.getPreviousSiblings().reduce(((t,e)=>t+e.getTextContentSize()),0);}if(!e())return;if(s)return void o.getNode().select(i,i);n.getChildren().some((t=>{const e=Qn(t);if(e||Fn(t)){const n=t.getTextContentSize();if(e&&n>=u)return t.select(u,u),true;u-=n;}return  false}));}(r,(()=>{const e=as(r);if(!J$1(e)||!e.isAttached())return  false;const o=e.getTextContent(),i=at(n.tokenize(o,e.getLanguage()||n.defaultLanguage)),s=function(t,e){let n=0;for(;n<t.length&&pt$1(t[n],e[n]);)n++;const r=t.length,o=e.length,i=Math.min(r,o)-n;let s=0;for(;s<i;)if(s++,!pt$1(t[r-s],e[o-s])){s--;break}const l=n,u=r-s,c=e.slice(n,o-s);return {from:l,nodesForReplacement:c,to:u}}(e.getChildren(),i),{from:l,to:u,nodesForReplacement:c}=s;return !(l===u&&!c.length)&&(t.splice(l,u-l,c),true)}));}),{onUpdate:()=>{ct$1.delete(r);},skipTransforms:true}));}function at(t,e){const n=[];for(const r of t)if("string"==typeof r){const t=r.split(/(\n|\t)/),o=t.length;for(let r=0;r<o;r++){const o=t[r];"\n"===o||"\r\n"===o?n.push(Pn()):"\t"===o?n.push(er()):o.length>0&&n.push(Z$1(o,e));}}else {const{content:t}=r;"string"==typeof t?n.push(...at([t],r.type)):Array.isArray(t)&&n.push(...at(t,r.type));}return n}function pt$1(t,e){return tt$1(t)&&tt$1(e)&&t.__text===e.__text&&t.__highlightType===e.__highlightType||nr(t)&&nr(e)||Fn(t)&&Fn(e)}function ft(t){if(!cr(t))return  false;const e=t.anchor.getNode(),n=t.focus.getNode();if(e.is(n)&&J$1(e))return  true;const r=e.getParent();return J$1(r)&&r.is(n.getParent())}function ht$1(t){const e=t.getNodes(),n=[[]];if(1===e.length&&J$1(e[0]))return n;let r=n[0];for(let t=0;t<e.length;t++){const o=e[t];tt$1(o)||nr(o)||Fn(o)||O(169),Fn(o)?0!==t&&r.length>0&&(r=[],n.push(r)):r.push(o);}return n}function dt$1(t){const e=Nr();if(!cr(e)||!ft(e))return  false;const n=ht$1(e),r=n.length;if(n.length>1){for(let e=0;e<r;e++){const r=n[e];if(r.length>0){let n=r[0];0===e&&(n=nt$1(n)),null!==n&&(t===Le$1?n.insertBefore(er()):nr(n)&&n.remove());}}return  true}const o=e.getNodes()[0];if(J$1(o)||tt$1(o)||nr(o)||Fn(o)||O(171),J$1(o))return t===Le$1&&e.insertNodes([er()]),true;const i=nt$1(o);return t===Le$1?Fn(i)?i.insertAfter(er()):i.insertBefore(er()):nr(i)&&i.remove(),true}function mt$1(t,e){const n=Nr();if(!cr(n))return  false;const{anchor:r,focus:o}=n,i=r.offset,s=o.offset,l=r.getNode(),c=o.getNode(),g=t===Ne$1;if(!ft(n)||!tt$1(l)&&!nr(l)||!tt$1(c)&&!nr(c))return  false;if(!e.altKey){if(n.isCollapsed()){const t=l.getParentOrThrow();if(g&&0===i&&null===l.getPreviousSibling()){if(null===t.getPreviousSibling())return t.selectPrevious(),e.preventDefault(),true}else if(!g&&i===l.getTextContentSize()&&null===l.getNextSibling()){if(null===t.getNextSibling())return t.selectNext(),e.preventDefault(),true}}return  false}let a,p;if(l.isBefore(c)?(a=nt$1(l),p=rt(c)):(a=nt$1(c),p=rt(l)),null==a||null==p)return  false;const f=a.getNodesBetween(p);for(let t=0;t<f.length;t++){const e=f[t];if(!tt$1(e)&&!nr(e)&&!Fn(e))return  false}e.preventDefault(),e.stopPropagation();const d=g?a.getPreviousSibling():p.getNextSibling();if(!Fn(d))return  true;const m=g?d.getPreviousSibling():d.getNextSibling();if(null==m)return  true;const S=tt$1(m)||nr(m)||Fn(m)?g?nt$1(m):rt(m):null;let _=null!=S?S:m;return d.remove(),f.forEach((t=>t.remove())),t===Ne$1?(f.forEach((t=>_.insertBefore(t))),_.insertBefore(d)):(_.insertAfter(d),_=d,f.forEach((t=>{_.insertAfter(t),_=t;}))),n.setTextNodeRange(l,i,c,s),true}function xt$1(t,e){const n=Nr();if(!cr(n))return  false;const{anchor:r,focus:o}=n,i=r.getNode(),s=o.getNode(),l=t===be$1;if(!ft(n)||!tt$1(i)&&!nr(i)||!tt$1(s)&&!nr(s))return  false;if(l){const t=it$1(s,o.offset);if(null!==t){const{node:e,offset:r}=t;Fn(e)?e.selectNext(0,0):n.setTextNodeRange(e,r,e,r);}else s.getParentOrThrow().selectStart();}else {st$1(s).select();}return e.preventDefault(),e.stopPropagation(),true}function yt$1(t,e){if(!t.hasNodes([M$1,V]))throw new Error("CodeHighlightPlugin: CodeNode or CodeHighlightNode not registered on editor");return null==e&&(e=ot$1),j$2(t.registerMutationListener(M$1,(e=>{t.update((()=>{for(const[n,r]of e)if("destroyed"!==r){const e=as(n);null!==e&&ut(e,t);}}));}),{skipInitialization:false}),t.registerNodeTransform(M$1,(n=>gt$1(n,t,e))),t.registerNodeTransform(Jn,(n=>lt$1(n,t,e))),t.registerNodeTransform(V,(n=>lt$1(n,t,e))),t.registerCommand(Pe,(e=>{const n=function(t){const e=Nr();if(!cr(e)||!ft(e))return null;const n=t?Ie:Le$1,r=t?Ie:Fe$1;if(ht$1(e).length>1)return n;const o=e.getNodes()[0];if(J$1(o)||tt$1(o)||nr(o)||Fn(o)||O(170),J$1(o))return n;const i=nt$1(o),s=rt(o),l=e.anchor,c=e.focus;let g,a;return c.isBefore(l)?(g=c,a=l):(g=l,a=c),null!==i&&null!==s&&g.key===i.getKey()&&0===g.offset&&a.key===s.getKey()&&a.offset===s.getTextContentSize()?n:r}(e.shiftKey);return null!==n&&(e.preventDefault(),t.dispatchCommand(n,void 0),true)}),Ii),t.registerCommand(Fe$1,(()=>!!ft(Nr())&&(Fr([er()]),true)),Ii),t.registerCommand(Le$1,(t=>dt$1(Le$1)),Ii),t.registerCommand(Ie,(t=>dt$1(Ie)),Ii),t.registerCommand(Ne$1,(t=>{const e=Nr();if(!cr(e))return  false;const{anchor:n}=e,r=n.getNode();return !!ft(e)&&(e.isCollapsed()&&0===n.offset&&null===r.getPreviousSibling()&&J$1(r.getParentOrThrow())?(t.preventDefault(),true):mt$1(Ne$1,t))}),Ii),t.registerCommand(we$1,(t=>{const e=Nr();if(!cr(e))return  false;const{anchor:n}=e,r=n.getNode();return !!ft(e)&&(e.isCollapsed()&&n.offset===r.getTextContentSize()&&null===r.getNextSibling()&&J$1(r.getParentOrThrow())?(t.preventDefault(),true):mt$1(we$1,t))}),Ii),t.registerCommand(be$1,(t=>xt$1(be$1,t)),Ii),t.registerCommand(ke$1,(t=>xt$1(ke$1,t)),Ii))}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function B(t,e){const n={};for(const o of t){const t=e(o);t&&(n[t]?n[t].push(o):n[t]=[o]);}return n}function M(t){const e=B(t,(t=>t.type));return {element:e.element||[],multilineElement:e["multiline-element"]||[],textFormat:e["text-format"]||[],textMatch:e["text-match"]||[]}}const j=/[!-/:-@[-`{-~\s]/;const U=/^\+?[0-9\s()-]{5,}$/;function J(t){return Qn(t)&&!t.hasFormat("code")}function Y(t,...e){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const t of e)o.append("v",t);throw n.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Z(t,e,n){const o=n.length;for(let r=e;r>=o;r--){const e=r-o;if(tt(t,e,n,0,o)&&" "!==t[e+o])return e}return  -1}function tt(t,e,n,o,r){for(let i=0;i<r;i++)if(t[e+i]!==n[o+i])return  false;return  true}function et(t,n=Bt){const o=M(n),r=B(o.textFormat,(({tag:t})=>t[t.length-1])),l=B(o.textMatch,(({trigger:t})=>t));for(const e of n){const n=e.type;if("element"===n||"text-match"===n||"multiline-element"===n){const n=e.dependencies;for(const e of n)t.hasNode(e)||Y(173,e.getType());}}const c=(t,n,c)=>{(function(t,e,n,o){const r=t.getParent();if(!Zs(r)||t.getFirstChild()!==e)return  false;const i=e.getTextContent();if(" "!==i[n-1])return  false;for(const{regExp:r,replace:s}of o){const o=i.match(r);if(o&&o[0].length===(o[0].endsWith(" ")?n:n-1)){const r=e.getNextSiblings(),[i,l]=e.splitText(n);if(i.remove(),false!==s(t,l?[l,...r]:r,o,false))return  true}}return  false})(t,n,c,o.element)||function(t,e,n,o){const r=t.getParent();if(!Zs(r)||t.getFirstChild()!==e)return  false;const i=e.getTextContent();if(" "!==i[n-1])return  false;for(const{regExpStart:r,replace:s,regExpEnd:l}of o){if(l&&!("optional"in l)||l&&"optional"in l&&!l.optional)continue;const o=i.match(r);if(o&&o[0].length===(o[0].endsWith(" ")?n:n-1)){const r=e.getNextSiblings(),[i,l]=e.splitText(n);if(i.remove(),false!==s(t,l?[l,...r]:r,o,null,null,false))return  true}}return  false}(t,n,c,o.multilineElement)||function(t,e,n){let o=t.getTextContent();const r=n[o[e-1]];if(null==r)return  false;e<o.length&&(o=o.slice(0,e));for(const e of r){if(!e.replace||!e.regExp)continue;const n=o.match(e.regExp);if(null===n)continue;const r=n.index||0,i=r+n[0].length;let s;return 0===r?[s]=t.splitText(i):[,s]=t.splitText(r,i),s.selectNext(0,0),e.replace(s,n),true}return  false}(n,c,l)||function(t,n,o){const r=t.getTextContent(),l=n-1,c=r[l],f=o[c];if(!f)return  false;for(const n of f){const{tag:o}=n,f=o.length,a=l-f+1;if(f>1&&!tt(r,a,o,0,f))continue;if(" "===r[a-1])continue;const u=r[l+1];if(false===n.intraword&&u&&!j.test(u))continue;const p=t;let h=p,x=Z(r,a,o),T=h;for(;x<0&&(T=T.getPreviousSibling())&&!Fn(T);)if(Qn(T)){if(T.hasFormat("code"))continue;const t=T.getTextContent();h=T,x=Z(t,t.length,o);}if(x<0)continue;if(h===p&&x+f===a)continue;const C=h.getTextContent();if(x>0&&C[x-1]===c)continue;const E=C[x-1];if(false===n.intraword&&E&&!j.test(E))continue;const y=p.getTextContent(),$=y.slice(0,a)+y.slice(l+1);p.setTextContent($);const v=h===p?$:C;h.setTextContent(v.slice(0,x)+v.slice(x+f));const S=Nr(),b=vr();ys(b);const F=l-f*(h===p?2:1)+1;b.anchor.set(h.__key,x,"text"),b.focus.set(p.__key,F,"text");for(const t of n.format)b.hasFormat(t)||b.formatText(t);b.anchor.set(b.focus.key,b.focus.offset,b.focus.type);for(const t of n.format)b.hasFormat(t)&&b.toggleFormat(t);return cr(S)&&(b.format=S.format),true}}(n,c,r);};return t.registerUpdateListener((({tags:n,dirtyLeaves:o,editorState:r,prevEditorState:i})=>{if(n.has(Ni)||n.has(vi))return;if(t.isComposing())return;const l=r.read(Nr),f=i.read(Nr);if(!cr(f)||!cr(l)||!l.isCollapsed()||l.is(f))return;const p=l.anchor.key,d=l.anchor.offset,m=r._nodeMap.get(p);!Qn(m)||!o.has(p)||1!==d&&d>f.anchor.offset+1||t.update((()=>{if(!J(m))return;const t=m.getParent();null===t||J$1(t)||c(t,m,l.anchor.offset);}));}))}const nt=/^(\s*)(\d{1,})\.\s/,ot=/^(\s*)[-*+]\s/,it=/^(#{1,6})\s/,st=/^>\s/,lt=/^[ \t]*```(\w+)?/,ct=/[ \t]*```$/,gt=t=>(e,n,o)=>{const r=t(o);r.append(...n),e.replace(r),r.select(0,0);};const pt=t=>(e,n,o)=>{const r=e.getPreviousSibling(),i=e.getNextSibling(),s=et$2("check"===t?"x"===o[3]:void 0);if(at$1(i)&&i.getListType()===t){const t=i.getFirstChild();null!==t?t.insertBefore(s):i.append(s),e.remove();}else if(at$1(r)&&r.getListType()===t)r.append(s),e.remove();else {const n=ct$2(t,"number"===t?Number(o[2]):void 0);n.append(s),e.replace(n);}s.append(...n),s.select(0,0);const l=function(t){const e=t.match(/\t/g),n=t.match(/ /g);let o=0;return e&&(o+=e.length),n&&(o+=Math.floor(n.length/4)),o}(o[1]);l&&s.setIndent(l);},dt=(t,e,n)=>{const o=[],r=t.getChildren();let i=0;for(const s of r)if(nt$2(s)){if(1===s.getChildrenSize()){const t=s.getFirstChild();if(at$1(t)){o.push(dt(t,e,n+1));continue}}const r=" ".repeat(4*n),l=t.getListType(),c="number"===l?`${t.getStart()+i}. `:"check"===l?`- [${s.getChecked()?"x":" "}] `:"- ";o.push(r+c+e(s)),i++;}return o.join("\n")},mt={dependencies:[Nt$1],export:(t,e)=>{if(!At(t))return null;const n=Number(t.getTag().slice(1));return "#".repeat(n)+" "+e(t)},regExp:it,replace:gt((t=>{const e="h"+t[1].length;return _t$1(e)})),type:"element"},ht={dependencies:[Dt],export:(t,e)=>{if(!wt$1(t))return null;const n=e(t).split("\n"),o=[];for(const t of n)o.push("> "+t);return o.join("\n")},regExp:st,replace:(t,e,n,o)=>{if(o){const n=t.getPreviousSibling();if(wt$1(n))return n.splice(n.getChildrenSize(),0,[Pn(),...e]),n.select(0,0),void t.remove()}const r=xt$3();r.append(...e),t.replace(r),r.select(0,0);},type:"element"},xt={dependencies:[M$1],export:t=>{if(!J$1(t))return null;const e=t.getTextContent();return "```"+(t.getLanguage()||"")+(e?"\n"+e:"")+"\n```"},regExpEnd:{optional:true,regExp:ct},regExpStart:lt,replace:(t,e,n,o,r,i)=>{let s,c;if(!e&&r){if(1===r.length)o?(s=z(),c=n[1]+r[0]):(s=z(n[1]),c=r[0].startsWith(" ")?r[0].slice(1):r[0]);else {if(s=z(n[1]),0===r[0].trim().length)for(;r.length>0&&!r[0].length;)r.shift();else r[0]=r[0].startsWith(" ")?r[0].slice(1):r[0];for(;r.length>0&&!r[r.length-1].length;)r.pop();c=r.join("\n");}const e=Xn(c);s.append(e),t.append(s);}else e&&gt((t=>z(t?t[1]:void 0)))(t,e,n,i);},type:"multiline-element"},Tt={dependencies:[rt$1,G],export:(t,e)=>at$1(t)?dt(t,e,0):null,regExp:ot,replace:pt("bullet"),type:"element"},Et={dependencies:[rt$1,G],export:(t,e)=>at$1(t)?dt(t,e,0):null,regExp:nt,replace:pt("number"),type:"element"},yt={format:["code"],tag:"`",type:"text-format"},$t={format:["highlight"],tag:"==",type:"text-format"},vt={format:["bold","italic"],tag:"***",type:"text-format"},St={format:["bold","italic"],intraword:false,tag:"___",type:"text-format"},bt={format:["bold"],tag:"**",type:"text-format"},Ft={format:["bold"],intraword:false,tag:"__",type:"text-format"},It={format:["strikethrough"],tag:"~~",type:"text-format"},Nt={format:["italic"],tag:"*",type:"text-format"},wt={format:["italic"],intraword:false,tag:"_",type:"text-format"},kt={dependencies:[g$1],export:(t,e,n)=>{if(!p(t))return null;const o=t.getTitle(),r=e(t);return o?`[${r}](${t.getURL()} "${o}")`:`[${r}](${t.getURL()})`},importRegExp:/(?:\[([^[]+)\])(?:\((?:([^()\s]+)(?:\s"((?:[^"]*\\")*[^"]*)"\s*)?)\))/,regExp:/(?:\[([^[]+)\])(?:\((?:([^()\s]+)(?:\s"((?:[^"]*\\")*[^"]*)"\s*)?)\))$/,replace:(t,e)=>{const[,n,o,r]=e,i=(s=o).match(/^[a-z][a-z0-9+.-]*:/i)||s.match(/^[/#.]/)?s:s.includes("@")?`mailto:${s}`:U.test(s)?`tel:${s}`:`https://${s}`;var s;const c=d(i,{title:r}),f=Xn(n);return f.setFormat(t.getFormat()),c.append(f),t.replace(c),f},trigger:")",type:"text-match"};const Lt=[mt,ht,Tt,Et],Pt=[xt],Rt=[yt,vt,St,bt,Ft,$t,Nt,wt,It],_t=[kt],Bt=[...Lt,...Pt,...Rt,..._t];

var theme = {
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  }
};

function createElement(name, properties) {
  const element = document.createElement(name);
  for (const [key, value] of Object.entries(properties)) {
    if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }
  return element
}

function createFigureWithImage(properties) {
  const { image: imageProperties = {}, ...figureProperties } = properties || {};

  const figure = createElement("figure", { className: "attachment", contentEditable: false, ...figureProperties });
  const image = createElement("img", imageProperties);
  figure.appendChild(image);

  return { figure, image }
}

class ImageNode extends gi {
  static getType() {
    return "image"
  }

  static clone(node) {
    return new ImageNode(node.src, node.altText, node.__key)
  }

  static importJSON(serializedNode) {
    return new ImageNode(serializedNode.src, serializedNode.altText)
  }

  static importDOM() {
    return {
      figure: (figure) => {
        const image = figure.querySelector("img");
        if (image instanceof HTMLImageElement) {
          return { conversion: () => { new ImageNode(image.src, image.alt); }, priority: 1 }
        }
      }
    }
  }

  constructor(src, altText, contentType, key) {
    super(key);
    this.src = src;
    this.altText = altText;
    this.contentType = contentType || "";
  }

  createDOM() {
    return this.#createFigureWithImage()
  }

  updateDOM() {
    return false
  }

  exportJSON() {
    return {
      type: "image",
      version: 1,
      src: this.src,
      altText: this.altText,
    }
  }

  exportDOM() {
    const figure = this.#createFigureWithImage();
    return { element: figure }
  }

  decorate() {
    return null
  }

  #createFigureWithImage() {
    const { figure } = createFigureWithImage({ image: { src: this.src, alt: this.altText }, "data-content-type": this.contentType });
    return figure
  }
}

function loadFileIntoImage(file, image) {
  const reader = new FileReader();
  reader.onload = (event) => {
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

class UploadedImageNode extends gi {
  static getType() {
    return "uploaded_image"
  }

  static clone(node) {
    return new UploadedImageNode(node.file, node.uploadUrl, node.editor, node.__key)
  }

  static importJSON(serializedNode) {
    const node = new UploadedImageNode();
    node.src = serializedNode.src;
    return node
  }

  constructor(file, uploadUrl, editor, key) {
    super(key);
    this.file = file;
    this.uploadUrl = uploadUrl;
    this.src = null;
    this.editor = editor;
  }

  createDOM() {
    const { figure, image } = createFigureWithImage();

    const progressBar = createElement("progress", { value: 0, max: 100 });
    figure.appendChild(progressBar);
    loadFileIntoImage(this.file, image);

    this.#startUpload(progressBar, figure);

    return figure
  }

  updateDOM() {
    return false
  }

  exportJSON() {
    return {
      type: "uploaded_image",
      version: 1,
      src: this.src,
    }
  }

  exportDOM() {
    const img = document.createElement("img");
    if (this.src) {
      img.src = this.src;
    }
    img.alt = this.altText;
    img.className = "wtf-image";
    return { element: img }
  }

  decorate() {
    return null
  }

  #startUpload(progressBar, figure) {
    const upload = new DirectUpload(this.file, this.uploadUrl, this);

    upload.delegate = {
      directUploadWillStoreFileWithXHR: (request) => {
        request.upload.addEventListener("progress", (event) => {
          this.editor.update(() => {
            progressBar.value = Math.round((event.loaded / event.total) * 100);
          });
        });
      }
    };

    upload.create((error, blob) => {
      if (error) {
        this.#handleUploadError(figure);
      } else {
        this.src = `/rails/active_storage/blobs/redirect/${blob.signed_id}/${blob.filename}`;
        this.#showUploadedImage(blob);
      }
    });
  }

  #handleUploadError(figure) {
    figure.innerHTML = "";
    figure.classList.add("attachment--error");
    figure.appendChild(createElement("div", { innerText: `Error uploading ${this.file?.name ?? "image"}` }));
  }

  #showUploadedImage(blob) {
    this.editor.update(() => {
      const latest = as(this.getKey());
      if (latest) {
        latest.replace(new ImageNode(this.src, blob.filename, blob.content_type));
      }
    });
  }
}

const COMMANDS = [
  "bold",
  "formatElement",
  "italic",
  "insertUnorderedList",
  "insertOrderedList",
  "insertCodeBlock",
  "insertTable",
  "uploadAttachments"
];

class CommandDispatcher {
  static configureFor(editor) {
    new CommandDispatcher(editor);
  }

  constructor(editor) {
    this.editor = editor;
    this.editorElement = this.editor.getRootElement().closest("lexical-editor");
    this.#registerCommands();
  }

  dispatchPaste(event) {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return false

    for (const item of clipboardData.items) {
      if (!item.type.startsWith("image/")) continue
      const file = item.getAsFile();
      if (!file) continue

      this.#uploadFile(file);
    }
  }

  dispatchBold() {
    this.editor.dispatchCommand(me, "bold");
  }

  dispatchItalic() {
    this.editor.dispatchCommand(me, "italic");
  }

  dispatchInsertUnorderedList() {
    this.editor.dispatchCommand(_t$2, undefined);
  }

  dispatchInsertOrderedList() {
    this.editor.dispatchCommand(yt$3, undefined);
  }

  dispatchInsertCodeBlock() {
    this.editor.update(() => {
      const selection = Nr();
      if (!cr(selection)) return

      const codeNode = new M$1();

      if (!selection.isCollapsed()) {
        const nodes = selection.extract();

        const focusNode = selection.focus.getNode();
        const anchorNode = selection.anchor.getNode();
        const insertionPoint = (focusNode && focusNode.getParent()) ||
          (anchorNode && anchorNode.getParent());

        for (const node of nodes) {
          if (node.getParent()) {
            codeNode.append(node);
          }
        }

        if (insertionPoint && insertionPoint.getParent()) {
          insertionPoint.insertBefore(codeNode);

          if (insertionPoint.getTextContent().trim() === '') {
            insertionPoint.remove();
          }
        } else {
          _s().append(codeNode);
        }
      } else {
        _s().append(codeNode);
      }
    });
  }

  dispatchInsertTable() {
    this.editor.update(() => {
      const selection = Nr();
      if (!cr(selection)) return

      // Create a new table with 3x3 dimensions
      const tableNode = Le(3, 3);

      if (!selection.isCollapsed()) {
        // If text is selected, extract the nodes
        selection.extract();

        const focusNode = selection.focus.getNode();
        const anchorNode = selection.anchor.getNode();
        const insertionPoint = (focusNode && focusNode.getParent()) ||
          (anchorNode && anchorNode.getParent());

        if (insertionPoint && insertionPoint.getParent()) {
          // Insert the table before the insertion point
          insertionPoint.insertBefore(tableNode);

          // Remove the insertion point if it's empty
          if (insertionPoint.getTextContent().trim() === '') {
            insertionPoint.remove();
          }
        } else {
          // If no valid insertion point, append to root
          _s().append(tableNode);
        }
      } else {
        // If selection is collapsed (no text selected)
        const focusNode = selection.focus.getNode();

        if (focusNode) {
          const parent = focusNode.getParent();

          // Check if we're in an empty paragraph
          if (parent && parent.getTextContent().trim() === '' && parent.getParent()) {
            // Replace the empty paragraph with the table
            parent.insertBefore(tableNode);
            parent.remove();
          } else if (parent && parent.getParent()) {
            // Insert after the parent if it's not a root node
            parent.insertAfter(tableNode);
          } else if (focusNode.getParent()) {
            // Insert after the focus node if it's not a root node
            focusNode.insertAfter(tableNode);
          } else {
            // Append to root as last resort
            _s().append(tableNode);
          }
        } else {
          // If no focus node, append to root
          _s().append(tableNode);
        }
      }
    });
  }

  dispatchFormatElement(type) {
    this.editor.update(() => {
      const selection = Nr();
      if (!cr(selection)) return

      // Extract the selected nodes
      const nodes = selection.extract();

      // Process each node
      for (const node of nodes) {
        // Skip nodes without a parent
        if (!node.getParent()) continue

        // Create the appropriate wrapper element based on the type
        let wrapper;
        if (type === "quote") {
          wrapper = xt$3();
        } else if (type === "h1") {
          wrapper = _t$1("h1");
        } else {
          wrapper = Pi();
        }

        // Insert the wrapper before the node and move the node inside it
        node.insertBefore(wrapper);
        wrapper.append(node);
      }
    });
  }

  dispatchUploadAttachments() {
    createElement("input", {
      type: "file",
      accept: "image/*",
      multiple: true,
      onchange: ({ target }) => {
        const files = Array.from(target.files);
        if (!files.length) return

        for (const file of files) {
          this.#uploadFile(file);
        }
      }
    }).click();
  }

  #registerCommands() {
    for (const command of COMMANDS) {
      const methodName = `dispatch${capitalize(command)}`;
      this.#registerCommandHandler(command, 0, this[methodName].bind(this));
    }

    this.#registerCommandHandler(ge, Ii, this.dispatchPaste.bind(this));
  }

  #registerCommandHandler(command, priority, handler) {
    this.editor.registerCommand(command, handler, priority);
  }

  #uploadFile(file) {
    const uploadUrl = this.editorElement.directUploadUrl;

    this.editor.update(() => {
      const uploadedImageNode = new UploadedImageNode(file, uploadUrl, this.editor);
      _s().append(uploadedImageNode);
    });
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

class LexicalEditorElement extends HTMLElement {
  static formAssociated = true
  static debug = true
  static commands = [ "bold", "italic", "" ]

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    this.editor = this.#createEditor();
    CommandDispatcher.configureFor(this.editor);

    this.#loadInitialValue();
    this.#updateInternalValueOnChange();
    this.#registerComponents();
    this.#attachDebugHooks();
    this.#attachToolbar();
  }

  get toolbarElement() {
    const toolbarId = this.getAttribute("toolbar");
    return document.getElementById(toolbarId)
  }

  get directUploadUrl() {
    return this.dataset.directUploadUrl
  }

  disconnectedCallback() {
    this.editor?.destroy();
  }

  get value() {
    let html = "";
    this.editor?.getEditorState().read(() => {
      html = m(this.editor, null);
    });
    return html
  }

  set value(html) {
    this.internals.setFormValue(html);

    const parser = new DOMParser();
    const dom = parser.parseFromString(html, "text/html");

    this.editor.update(() => {
      const root = _s();
      root.clear();
      root.select();
      const nodes = h(this.editor, dom);
      root.append(...nodes);
    });
  }

  #createEditor() {
    this.editorContentElement = this.editorContentElement || this.#createEditorContentElement();

    const editor = Wi({
      namespace: "LexicalEditor",
      onError(error) {
        throw error
      },
      theme: theme,
      nodes: [
        Dt,
        Nt$1,
        rt$1,
        G,
        M$1,
        V,
        an,
        ye,
        Oe,
        g$1,

        ImageNode,
        UploadedImageNode
      ]
    });

    editor.setRootElement(this.editorContentElement);

    return editor
  }

  #createEditorContentElement() {
    const editorContentElement = document.createElement("div");
    editorContentElement.classList.add("lexical-editor__content");
    editorContentElement.setAttribute("contenteditable", "true");
    this.appendChild(editorContentElement);

    return editorContentElement
  }

  #loadInitialValue() {
    const initialHtml = this.getAttribute("value") || this.innerHTML.trim();
    if (initialHtml) { this.value = initialHtml; }
  }

  #updateInternalValueOnChange() {
    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = m(this.editor, null);
        this.internals.setFormValue(html); // <== this is the missing part
      });
    });
  }

  #registerComponents() {
    Mt(this.editor);
    Tt$2(this.editor);
    yt$1(this.editor);
    et(this.editor, Bt);
  }

  #attachDebugHooks() {
    if (!LexicalEditorElement.debug) return

    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = m(this.editor, null);
        console.debug("HTML: ", html);
      });
    });
  }

  #attachToolbar() {
    this.toolbarElement.setEditor(this.editor);
  }
}

customElements.define("lexical-editor", LexicalEditorElement);

// ParagraphNode.prototype.exportDOM = function () {
//   return {
//     element: document.createElement("p"), // no span wrapping
//   }
// }
//
// TextNode.prototype.exportDOM = function () {
//   const text = this.__text
//
//   // Determine format
//   const isBold = this.hasFormat("bold")
//   const isItalic = this.hasFormat("italic")
//   const isUnderline = this.hasFormat("underline")
//   const isStrikethrough = this.hasFormat("strikethrough")
//   const isCode = this.hasFormat("code")
//
//   let element = document.createTextNode(text)
//
//   // Wrap in formatting elements from innermost to outermost
//   if (isCode) {
//     const code = document.createElement("code")
//     code.appendChild(element)
//     element = code
//   }
//   if (isStrikethrough) {
//     const s = document.createElement("s")
//     s.appendChild(element)
//     element = s
//   }
//   if (isUnderline) {
//     const u = document.createElement("u")
//     u.appendChild(element)
//     element = u
//   }
//   if (isItalic) {
//     const em = document.createElement("em")
//     em.appendChild(element)
//     element = em
//   }
//   if (isBold) {
//     const strong = document.createElement("strong")
//     strong.appendChild(element)
//     element = strong
//   }
//
//   return { element }
// }
