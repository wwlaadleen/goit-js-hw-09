!function(){var t={bodyEl:document.querySelector("body"),startBtnEl:document.querySelector("[data-start]"),stopBtnEl:document.querySelector("[data-stop]")},e=null;t.startBtnEl.addEventListener("click",(function(){t.startBtnEl.setAttribute("disabled",""),e=setInterval((function(){t.bodyEl.style.backgroundColor="".concat("#".concat(Math.floor(16777215*Math.random()).toString(16)))}),1e3)})),t.stopBtnEl.addEventListener("click",(function(){t.startBtnEl.removeAttribute("disabled"),clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.cd689b5c.js.map