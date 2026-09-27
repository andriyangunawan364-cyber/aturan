(() => {
  "use strict";

  /*
    GANTI NOMOR DI BAWAH:
    Format WhatsApp internasional tanpa +, spasi, atau tanda -.
    Contoh Indonesia: 6281234567890
  */
  const WHATSAPP_NUMBER = "6285782329752";

  const PS_RULES = [
    { icon: "💳", title: "Bayar sebelum bermain", text: "Rental PS wajib dibayar dan dikonfirmasi sebelum sesi dimulai.", type: "wajib" },
    { icon: "⏱️", title: "Gunakan waktu sesuai paket", text: "Sesi berakhir sesuai durasi yang telah dibayar. Perpanjangan dapat ditanyakan kepada petugas.", type: "wajib" },
    { icon: "🎮", title: "Jaga controller", text: "Gunakan controller dengan wajar dan jangan membanting perangkat.", type: "perangkat" },
    { icon: "🖥️", title: "Jaga layar dan perangkat", text: "Jangan menyentuh atau memindahkan perangkat tanpa izin petugas.", type: "perangkat" },
    { icon: "🔌", title: "Jangan ubah kabel", text: "Dilarang mencabut, memindahkan, atau mengubah kabel perangkat.", type: "perangkat" },
    { icon: "🥤", title: "Jauhkan cairan dari perangkat", text: "Letakkan minuman di tempat yang aman agar tidak mengenai perangkat elektronik.", type: "perangkat" },
    { icon: "🤝", title: "Bermain dengan sportif", text: "Hormati lawan bermain dan hindari tindakan yang mengganggu pelanggan lain.", type: "sportif" },
    { icon: "🗣️", title: "Jaga suara", text: "Hindari berteriak atau membuat keributan yang mengganggu area sekitar.", type: "sportif" },
    { icon: "👮", title: "Ikuti arahan petugas", text: "Petugas dapat memberikan arahan demi keamanan dan kenyamanan bersama.", type: "wajib" }
  ];

  const state = {
    filter: "all"
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function getWhatsAppUrl() {
    const message = encodeURIComponent(
      "Halo Petugas PLAYZONE, saya membutuhkan bantuan. Terima kasih."
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }

  function setWhatsAppLinks() {
    const url = getWhatsAppUrl();

    ["#whatsappTop", "#whatsappHero", "#whatsappContact"].forEach(selector => {
      const element = $(selector);
      if (element) element.href = url;
    });

    const phone = $("#phoneDisplay");
    if (phone) {
      phone.textContent = `Nomor WhatsApp: +${WHATSAPP_NUMBER}`;
    }
  }

  function renderRules() {
    const grid = $("#psRules");
    if (!grid) return;

    const rules = state.filter === "all"
      ? PS_RULES
      : PS_RULES.filter(rule => rule.type === state.filter);

    grid.innerHTML = rules.map(rule => `
      <article class="rule-card">
        <span class="icon">${rule.icon}</span>
        <h3>${escapeHTML(rule.title)}</h3>
        <p>${escapeHTML(rule.text)}</p>
        <span class="label">${getTypeLabel(rule.type)}</span>
      </article>
    `).join("");
  }

  function getTypeLabel(type) {
    const labels = {
      wajib: "Wajib",
      perangkat: "Perangkat",
      sportif: "Sportif"
    };
    return labels[type] || "Aturan";
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  $$("#psTabs .tab").forEach(button => {
    button.addEventListener("click", () => {
      $$("#psTabs .tab").forEach(tab => tab.classList.remove("active"));
      button.classList.add("active");

      state.filter = button.dataset.filter || "all";
      renderRules();
    });
  });

  $("#copyNumber")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(`+${WHATSAPP_NUMBER}`);
      showToast("Nomor WhatsApp berhasil disalin.");
    } catch (error) {
      showToast(`Nomor WhatsApp: +${WHATSAPP_NUMBER}`);
    }
  });

  setWhatsAppLinks();
  renderRules();
})();
