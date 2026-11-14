// Full-screen viewer: click a thumbnail, then step through the works on that page.
(function () {
  var dlg = document.getElementById("lightbox");
  if (!dlg || !dlg.showModal) return;
  var img = dlg.querySelector(".lb-img"), ph = dlg.querySelector(".lb-ph");
  var title = dlg.querySelector(".lb-title"), desc = dlg.querySelector(".lb-desc"), count = dlg.querySelector(".lb-count");
  var items = [], index = 0, x0 = null;
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function show(i) {
    index = (i + items.length) % items.length;
    var fig = items[index], pic = fig.querySelector(".thumb img");
    if (pic) { img.src = pic.currentSrc || pic.src; img.alt = pic.alt; img.hidden = false; ph.hidden = true; }
    else { img.hidden = true; ph.hidden = false; }
    title.textContent = fig.querySelector(".title").textContent;
    desc.textContent = fig.querySelector(".desc").textContent;
    count.textContent = pad(index + 1) + " / " + pad(items.length);
  }
  document.querySelectorAll(".thumb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var fig = btn.closest(".item");
      items = Array.prototype.slice.call(fig.closest(".grid").querySelectorAll(".item"));
      document.body.classList.add("lb-open");
      dlg.showModal();
      show(items.indexOf(fig));
    });
  });
  dlg.querySelector(".lb-prev").addEventListener("click", function () { show(index - 1); });
  dlg.querySelector(".lb-next").addEventListener("click", function () { show(index + 1); });
  img.addEventListener("click", function () { show(index + 1); });
  ph.addEventListener("click", function () { show(index + 1); });
  dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("close", function () { document.body.classList.remove("lb-open"); });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  dlg.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  });
})();
