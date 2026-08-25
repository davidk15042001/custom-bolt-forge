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
    var rfqStorageKey = "xjx-rfq-list";
    var focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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

    var cleanRfqItem = function (item) {
      var clean = {};
      ["id", "name", "category", "spec", "quantity", "note"].forEach(
        function (key) {
          clean[key] = String((item && item[key]) || "").slice(
            0,
            key === "note" ? 200 : 160,
          );
        },
      );
      return clean.id && clean.name ? clean : null;
    };

    var readRfqItems = function () {
      try {
        var raw = window.localStorage.getItem(rfqStorageKey);
        var parsed = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed)) return [];
        return parsed.map(cleanRfqItem).filter(Boolean).slice(0, 50);
      } catch (error) {
        return [];
      }
    };

    var writeRfqItems = function (items) {
      try {
        window.localStorage.setItem(
          rfqStorageKey,
          JSON.stringify(items.map(cleanRfqItem).filter(Boolean).slice(0, 50)),
        );
      } catch (error) {
        /* Storage can be unavailable in privacy mode. */
      }
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

    var updateRfqForms = function (items) {
      document.querySelectorAll("[data-rfq-cart-field]").forEach(function (field) {
        field.value = JSON.stringify(items);
      });
    };

    var renderRfqPage = function (items) {
      document.querySelectorAll("[data-rfq-count]").forEach(function (count) {
        count.textContent = String(items.length);
      });
      updateRfqButtons(items);
      updateRfqForms(items);
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
              '<article class="source-rfq-item" data-rfq-item="' +
              escapeHtml(item.id) +
              '"><div class="source-rfq-item-heading"><div><p class="eyebrow">' +
              escapeHtml(item.category) +
              "</p><h2>" +
              escapeHtml(item.name) +
              '</h2><p class="source-spec-value">' +
              escapeHtml(item.spec) +
              '</p></div><button class="source-rfq-remove" type="button" data-rfq-remove="' +
              escapeHtml(item.id) +
              '" aria-label="Remove ' +
              escapeHtml(item.name) +
              '">×</button></div><div class="source-rfq-fields"><label><span class="screen-reader-text">Quantity</span><input type="text" data-rfq-field="quantity" value="' +
              escapeHtml(item.quantity) +
              '" maxlength="40" placeholder="Quantity (e.g. 5,000 pcs)"></label><label><span class="screen-reader-text">Size, grade or notes</span><input type="text" data-rfq-field="note" value="' +
              escapeHtml(item.note) +
              '" maxlength="200" placeholder="Size / grade / notes (e.g. M20, 10.9, HDG)"></label></div></article>'
            );
          })
          .join("");
      });
    };

    if (new URLSearchParams(window.location.search).get("lulu_rfq") === "success") {
      writeRfqItems([]);
    }
    renderRfqPage(readRfqItems());

    document.querySelectorAll("[data-rfq-id]").forEach(function (button) {
      button.addEventListener("click", function () {
        var items = readRfqItems();
        var id = button.getAttribute("data-rfq-id");
        if (!id) return;
        var existingIndex = items.findIndex(function (item) {
          return item.id === id;
        });
        if (existingIndex >= 0) {
          items.splice(existingIndex, 1);
        } else {
          items.push({
            id: id,
            name: button.getAttribute("data-rfq-name") || "",
            category: button.getAttribute("data-rfq-category") || "",
            spec: button.getAttribute("data-rfq-spec") || "",
            quantity: "",
            note: "",
          });
        }
        writeRfqItems(items);
        renderRfqPage(readRfqItems());
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
      updateRfqForms(items);
    });

    document.querySelectorAll("[data-rfq-form]").forEach(function (form) {
      form.addEventListener("submit", function () {
        updateRfqForms(readRfqItems());
      });
    });

    document.querySelectorAll("[data-source-tabs]").forEach(function (tabs) {
      var buttons = Array.from(tabs.querySelectorAll("[data-source-tab]"));
      var panels = tabs.querySelectorAll("[data-source-panel]");
      var setTab = function (target, focusTab) {
        var selected = null;
        buttons.forEach(function (button) {
          var active = button.getAttribute("data-source-tab") === target;
          button.setAttribute("aria-selected", String(active));
          button.setAttribute("tabindex", active ? "0" : "-1");
          if (active) selected = button;
        });
        panels.forEach(function (panel) {
          var active = panel.getAttribute("data-source-panel") === target;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });
        if (selected && focusTab) selected.focus();
        return selected;
      };
      buttons.forEach(function (button, index) {
        button.addEventListener("click", function () {
          setTab(button.getAttribute("data-source-tab"), false);
        });
        button.addEventListener("keydown", function (event) {
          var nextIndex = null;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % buttons.length;
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + buttons.length) % buttons.length;
          } else if (event.key === "Home") {
            nextIndex = 0;
          } else if (event.key === "End") {
            nextIndex = buttons.length - 1;
          }
          if (nextIndex === null) return;
          event.preventDefault();
          setTab(buttons[nextIndex].getAttribute("data-source-tab"), true);
        });
      });
      var queryTab = new URLSearchParams(window.location.search).get("tab");
      var hashTab = window.location.hash.replace(/^#/, "");
      var initialTab = queryTab || hashTab;
      if (!initialTab || !setTab(initialTab, false)) {
        setTab(buttons[0] ? buttons[0].getAttribute("data-source-tab") : "", false);
      }
    });

    document.querySelectorAll("[data-rfq-files]").forEach(function (input) {
      var list = input.parentElement.querySelector("[data-rfq-file-list]");
      if (!list) return;
      input.addEventListener("change", function () {
        var files = Array.from(input.files || []);
        input.setCustomValidity(
          files.length > 10 ? "Please select no more than 10 files." : "",
        );
        list.innerHTML = files
          .slice(0, 10)
          .map(function (file) {
            var size =
              file.size > 1048576
                ? (file.size / 1048576).toFixed(1) + " MB"
                : Math.max(1, Math.round(file.size / 1024)) + " KB";
            return "<li>· " + escapeHtml(file.name) + " <small>(" + size + ")</small></li>";
          })
          .join("");
        list.hidden = files.length === 0;
      });
    });

    var toggle = document.querySelector(".source-menu-toggle");
    var mobilePanel = document.querySelector(".source-mobile-navigation");
    var mobileClose = document.querySelector(".source-mobile-close");
    if (toggle && mobilePanel) {
      var closeMobilePanel = function (restoreFocus) {
        mobilePanel.classList.remove("is-open");
        mobilePanel.setAttribute("aria-hidden", "true");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("source-mobile-open");
        if (restoreFocus) toggle.focus();
      };
      var openMobilePanel = function () {
        mobilePanel.classList.add("is-open");
        mobilePanel.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("source-mobile-open");
        var first = mobilePanel.querySelector(focusableSelector);
        if (first) first.focus();
      };
      toggle.addEventListener("click", function () {
        mobilePanel.classList.contains("is-open")
          ? closeMobilePanel(false)
          : openMobilePanel();
      });
      if (mobileClose) {
        mobileClose.addEventListener("click", function () {
          closeMobilePanel(true);
        });
      }
      mobilePanel.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          closeMobilePanel(false);
        });
      });
      document.addEventListener("keydown", function (event) {
        if (!mobilePanel.classList.contains("is-open")) return;
        if (event.key === "Escape") {
          closeMobilePanel(true);
          return;
        }
        if (event.key !== "Tab") return;
        var focusable = Array.from(mobilePanel.querySelectorAll(focusableSelector));
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });
      window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 1280px)").matches) {
          closeMobilePanel(false);
        }
      });
    }

    var dropdowns = document.querySelectorAll(".source-nav-dropdown");
    dropdowns.forEach(function (dropdown) {
      var button = dropdown.querySelector(":scope > button");
      if (!button) return;
      button.addEventListener("click", function () {
        var willOpen = !dropdown.classList.contains("is-open");
        dropdowns.forEach(function (item) {
          item.classList.remove("is-open");
          var itemButton = item.querySelector(":scope > button");
          if (itemButton) itemButton.setAttribute("aria-expanded", "false");
        });
        dropdown.classList.toggle("is-open", willOpen);
        button.setAttribute("aria-expanded", String(willOpen));
      });
    });
    document.addEventListener("click", function (event) {
      if (event.target.closest(".source-nav-dropdown")) return;
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("is-open");
        var button = dropdown.querySelector(":scope > button");
        if (button) button.setAttribute("aria-expanded", "false");
      });
    });

    var chatToggle = document.querySelector("[data-source-chat-toggle]");
    var chatPanel = document.querySelector("[data-source-chat-panel]");
    var chatClose = document.querySelector("[data-source-chat-close]");
    if (chatToggle && chatPanel) {
      var closeChat = function (restoreFocus) {
        chatPanel.hidden = true;
        chatToggle.setAttribute("aria-expanded", "false");
        if (restoreFocus) chatToggle.focus();
      };
      chatToggle.addEventListener("click", function () {
        var opening = chatPanel.hidden;
        chatPanel.hidden = !opening;
        chatToggle.setAttribute("aria-expanded", String(opening));
        if (opening) {
          var first = chatPanel.querySelector(focusableSelector);
          if (first) first.focus();
        }
      });
      if (chatClose) {
        chatClose.addEventListener("click", function () {
          closeChat(true);
        });
      }
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !chatPanel.hidden) closeChat(true);
      });
    }
  });
})();
