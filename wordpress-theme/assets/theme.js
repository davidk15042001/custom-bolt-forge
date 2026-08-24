(function () {
  "use strict";

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var toggle = document.querySelector(".source-menu-toggle");
    var panel = document.querySelector(".source-mobile-navigation");
    var close = document.querySelector(".source-mobile-close");
    if (!toggle || !panel) return;

    var closePanel = function () {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("source-mobile-open");
    };

    var openPanel = function () {
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("source-mobile-open");
      var firstLink = panel.querySelector("a");
      if (firstLink) firstLink.focus();
    };

    toggle.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) closePanel();
      else openPanel();
    });

    if (close) close.addEventListener("click", closePanel);

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closePanel);
    });

    document.addEventListener("click", function (event) {
      if (
        panel.classList.contains("is-open") &&
        !panel.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closePanel();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        closePanel();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1280px)").matches) closePanel();
    });

    var rfqStorageKey = "xjx-rfq-list";
    var readRfqItems = function () {
      try {
        var raw = window.localStorage.getItem(rfqStorageKey);
        var parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    };
    var writeRfqItems = function (items) {
      try {
        window.localStorage.setItem(rfqStorageKey, JSON.stringify(items));
      } catch (error) {
        /* Storage can be unavailable in privacy mode. */
      }
    };
    var escapeHtml = function (value) {
      return String(value || "").replace(/[&<>"']/g, function (character) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        }[character];
      });
    };
    var updateRfqButtons = function (items) {
      document.querySelectorAll("[data-rfq-id]").forEach(function (button) {
        var exists = items.some(function (item) {
          return item.id === button.getAttribute("data-rfq-id");
        });
        button.setAttribute("aria-pressed", String(exists));
        button.classList.toggle("is-added", exists);
        var icon = button.querySelector(".source-rfq-icon");
        var label = button.querySelector(".source-rfq-label");
        if (icon) icon.textContent = exists ? "✓" : "+";
        if (label) {
          label.textContent = exists
            ? button.getAttribute("data-rfq-in-label")
            : button.getAttribute("data-rfq-add-label");
        }
      });
    };
    var renderRfqPage = function (items) {
      document.querySelectorAll("[data-rfq-count]").forEach(function (count) {
        count.textContent = String(items.length);
      });
      updateRfqButtons(items);
      document.querySelectorAll("[data-rfq-page]").forEach(function (page) {
        var empty = page.querySelector("[data-rfq-empty]");
        var list = page.querySelector("[data-rfq-items]");
        var actions = page.querySelector("[data-rfq-actions]");
        if (empty) empty.hidden = items.length > 0;
        if (actions) actions.hidden = items.length === 0;
        if (!list) return;
        list.innerHTML = items
          .map(function (item) {
            return (
              '<div class="source-rfq-item" data-rfq-item="' +
              escapeHtml(item.id) +
              '">' +
              '<div class="source-rfq-item-heading"><div><p class="eyebrow">' +
              escapeHtml(item.category) +
              "</p><h2>" +
              escapeHtml(item.name) +
              '</h2><p class="source-spec-value">' +
              escapeHtml(item.spec) +
              '</p></div><button class="source-rfq-remove" type="button" data-rfq-remove="' +
              escapeHtml(item.id) +
              '" aria-label="Remove ' +
              escapeHtml(item.name) +
              '">×</button></div><div class="source-rfq-fields"><input type="text" data-rfq-field="quantity" value="' +
              escapeHtml(item.quantity) +
              '" maxlength="40" placeholder="Quantity (e.g. 5,000 pcs)"><input type="text" data-rfq-field="note" value="' +
              escapeHtml(item.note) +
              '" maxlength="200" placeholder="Size / grade / notes (e.g. M20, 10.9, HDG)"></div></div>'
            );
          })
          .join("");
      });
    };
    renderRfqPage(readRfqItems());

    document.querySelectorAll("[data-rfq-id]").forEach(function (button) {
      button.addEventListener("click", function () {
        var items = readRfqItems();
        var id = button.getAttribute("data-rfq-id");
        if (
          !id ||
          items.some(function (item) {
            return item.id === id;
          })
        ) {
          renderRfqPage(items);
          return;
        }
        items.push({
          id: id,
          name: button.getAttribute("data-rfq-name") || "",
          category: button.getAttribute("data-rfq-category") || "",
          spec: button.getAttribute("data-rfq-spec") || "",
          quantity: "",
          note: "",
        });
        writeRfqItems(items);
        renderRfqPage(items);
      });
    });

    document.addEventListener("click", function (event) {
      var remove = event.target.closest("[data-rfq-remove]");
      if (remove) {
        var removeId = remove.getAttribute("data-rfq-remove");
        var remaining = readRfqItems().filter(function (item) {
          return item.id !== removeId;
        });
        writeRfqItems(remaining);
        renderRfqPage(remaining);
        return;
      }
      if (event.target.closest("[data-rfq-clear]")) {
        writeRfqItems([]);
        renderRfqPage([]);
      }
    });

    document.addEventListener("input", function (event) {
      var field = event.target.closest("[data-rfq-field]");
      var itemElement = event.target.closest("[data-rfq-item]");
      if (!field || !itemElement) return;
      var fieldName = field.getAttribute("data-rfq-field");
      var itemId = itemElement.getAttribute("data-rfq-item");
      var items = readRfqItems().map(function (item) {
        if (item.id === itemId) item[fieldName] = field.value;
        return item;
      });
      writeRfqItems(items);
      document.querySelectorAll("[data-rfq-count]").forEach(function (count) {
        count.textContent = String(items.length);
      });
      updateRfqButtons(items);
    });

    document.querySelectorAll("[data-source-tabs]").forEach(function (tabs) {
      var buttons = tabs.querySelectorAll("[data-source-tab]");
      var panels = tabs.querySelectorAll("[data-source-panel]");
      var setTab = function (target) {
        var selected = null;
        buttons.forEach(function (button) {
          var active = button.getAttribute("data-source-tab") === target;
          button.setAttribute("aria-selected", String(active));
          if (active) selected = button;
        });
        panels.forEach(function (panelItem) {
          panelItem.classList.toggle(
            "is-active",
            panelItem.getAttribute("data-source-panel") === target,
          );
        });
        return selected;
      };
      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          setTab(button.getAttribute("data-source-tab"));
        });
      });
      var queryTab = new URLSearchParams(window.location.search).get("tab");
      var hashTab = window.location.hash.replace(/^#/, "");
      var initialTab = queryTab || hashTab;
      if (initialTab && setTab(initialTab)) return;
      setTab(buttons[0] ? buttons[0].getAttribute("data-source-tab") : "");
    });

    document.querySelectorAll("[data-rfq-files]").forEach(function (input) {
      var list = input.parentElement.querySelector("[data-rfq-file-list]");
      if (!list) return;
      input.addEventListener("change", function () {
        var files = Array.from(input.files || []).slice(0, 10);
        list.innerHTML = files
          .map(function (file) {
            return "<li>· " + escapeHtml(file.name) + "</li>";
          })
          .join("");
        list.hidden = files.length === 0;
      });
    });

    var chatToggle = document.querySelector("[data-source-chat-toggle]");
    var chatPanel = document.querySelector("[data-source-chat-panel]");
    var chatClose = document.querySelector("[data-source-chat-close]");
    if (chatToggle && chatPanel) {
      chatToggle.addEventListener("click", function () {
        chatPanel.hidden = !chatPanel.hidden;
      });
      if (chatClose) {
        chatClose.addEventListener("click", function () {
          chatPanel.hidden = true;
        });
      }
    }
  });
})();
