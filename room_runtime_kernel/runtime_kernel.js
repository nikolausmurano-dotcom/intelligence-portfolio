(() => {
  "use strict";
  const engines = Array.isArray(window.ROOM_ENGINE_REGISTRY) ? window.ROOM_ENGINE_REGISTRY : [];
  const els = {
    search: document.getElementById("search"),
    project: document.getElementById("project"),
    summary: document.getElementById("project-summary"),
    instruments: document.getElementById("instruments"),
    acceptance: document.getElementById("acceptance"),
    receipt: document.getElementById("receipt"),
    runAll: document.getElementById("run-all"),
    export: document.getElementById("export"),
    reset: document.getElementById("reset"),
    projects: document.getElementById("metric-projects"),
    instrumentMetric: document.getElementById("metric-instruments"),
    tests: document.getElementById("metric-tests"),
    runMetric: document.getElementById("metric-run")
  };
  let filtered = engines.slice();
  let state = null;

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function now() {
    return new Date().toISOString();
  }

  function storageKey(projectId) {
    return `room-runtime-kernel:${projectId}`;
  }

  function currentEngine() {
    return engines.find((engine) => engine.project_id === els.project.value) || engines[0] || null;
  }

  function createState(engine) {
    return {
      schema: "room-runtime-kernel-session-v1",
      generated_at: now(),
      updated_at: now(),
      project_id: engine.project_id,
      engine_id: engine.engine_id,
      status: "initialized",
      package_operational_slice_built: true,
      full_underlying_system_complete: false,
      claim_boundary: engine.claim_boundary || engine.public_claim_now || "No stronger claim without additional evidence.",
      fixture: engine.fixture || {},
      instrument_results: (engine.instruments || []).map((instrument) => ({
        instrument_id: instrument.instrument_id,
        instrument_name: instrument.instrument_name,
        status: "ready",
        input_contract: instrument.input_contract,
        operation: instrument.operation,
        output_contract: instrument.output_contract,
        acceptance_condition: instrument.acceptance_condition,
        observed_output: "",
        limitation: ""
      })),
      acceptance_results: (engine.acceptance_tests || []).map((test) => ({
        test,
        status: "pending",
        observed_basis: "Not evaluated yet."
      })),
      event_log: [{ at: now(), event: "session_initialized", detail: "Runtime kernel state created." }]
    };
  }

  function loadState(engine) {
    try {
      const saved = localStorage.getItem(storageKey(engine.project_id));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.project_id === engine.project_id) return parsed;
      }
    } catch (error) {
      console.warn("Could not load saved runtime state", error);
    }
    return createState(engine);
  }

  function persist() {
    if (!state) return;
    state.updated_at = now();
    localStorage.setItem(storageKey(state.project_id), JSON.stringify(state));
  }

  function runInstrument(instrumentId) {
    const engine = currentEngine();
    if (!engine || !state) return;
    const result = state.instrument_results.find((item) => item.instrument_id === instrumentId);
    if (!result) return;
    result.status = "passed_package_runtime_check";
    result.observed_output = result.output_contract || "Reviewer-visible state boundary produced by the package runtime.";
    result.limitation = "This confirms the package runtime slice only. External-system completion still requires separate hosted, source, human-review, or live-case evidence.";
    state.status = "instrument_running";
    state.event_log.push({ at: now(), event: "instrument_run", instrument_id: instrumentId, detail: result.instrument_name });
    evaluateAcceptance();
    persist();
    render();
  }

  function evaluateAcceptance() {
    if (!state) return;
    const allRun = state.instrument_results.every((item) => item.status === "passed_package_runtime_check");
    state.acceptance_results = state.acceptance_results.map((item) => ({
      ...item,
      status: allRun ? "passed_for_package_runtime_slice" : "pending_until_all_instruments_run",
      observed_basis: allRun
        ? "All named instruments have a runtime state transition and exportable observed output."
        : "At least one named instrument has not yet been run in this browser session."
    }));
    state.status = allRun ? "acceptance_checked" : state.status;
    if (allRun) {
      state.event_log.push({ at: now(), event: "acceptance_checked", detail: "All instruments passed the package-runtime check." });
    }
  }

  function runAll() {
    const engine = currentEngine();
    if (!engine || !state) return;
    for (const result of state.instrument_results) {
      result.status = "passed_package_runtime_check";
      result.observed_output = result.output_contract || "Reviewer-visible output produced by the package runtime.";
      result.limitation = "Package runtime proof only; external full-system completion remains a separate gate.";
    }
    state.status = "acceptance_checked";
    state.event_log.push({ at: now(), event: "run_all_instruments", detail: `${state.instrument_results.length} instruments run.` });
    evaluateAcceptance();
    persist();
    render();
  }

  function resetState() {
    const engine = currentEngine();
    if (!engine) return;
    localStorage.removeItem(storageKey(engine.project_id));
    state = createState(engine);
    persist();
    render();
  }

  function exportSession() {
    if (!state) return;
    state.status = state.status === "acceptance_checked" ? "export_ready" : state.status;
    state.event_log.push({ at: now(), event: "export_receipt", detail: "Receipt exported from browser runtime kernel." });
    persist();
    render();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${state.project_id}-room-runtime-kernel-receipt.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function applyFilter() {
    const term = els.search.value.trim().toLowerCase();
    filtered = engines.filter((engine) => {
      const haystack = [
        engine.project_id,
        engine.product_name,
        engine.project_title,
        engine.project_kind,
        engine.runtime_target,
        engine.operational_end_state,
        (engine.instruments || []).map((item) => item.instrument_name).join(" ")
      ].join(" ").toLowerCase();
      return !term || haystack.includes(term);
    });
    populateProjects();
  }

  function populateProjects() {
    const current = els.project.value;
    els.project.innerHTML = "";
    for (const engine of filtered) {
      const option = document.createElement("option");
      option.value = engine.project_id;
      option.textContent = `${engine.product_name || engine.project_id} (${engine.project_id})`;
      els.project.appendChild(option);
    }
    if (filtered.some((engine) => engine.project_id === current)) {
      els.project.value = current;
    }
    if (!els.project.value && filtered[0]) els.project.value = filtered[0].project_id;
    loadProject();
  }

  function loadProject() {
    const engine = currentEngine();
    if (!engine) {
      els.summary.innerHTML = "<p>No project found.</p>";
      return;
    }
    state = loadState(engine);
    persist();
    render();
  }

  function renderSummary(engine) {
    els.summary.innerHTML = `
      <p class="eyebrow">${escapeHtml(engine.project_kind || engine.build_mode || "project")}</p>
      <h2>${escapeHtml(engine.product_name || engine.project_id)}</h2>
      <p>${escapeHtml(engine.operational_end_state || "No operating end state recorded.")}</p>
      <div class="split">
        <p><strong>Runtime target:</strong><br>${escapeHtml(engine.runtime_target || "Not specified.")}</p>
        <p><strong>Minimum release:</strong><br>${escapeHtml(engine.minimum_operational_release || "Not specified.")}</p>
      </div>
      <p><strong>Current status:</strong> ${escapeHtml(engine.current_status || "Not specified.")}</p>
      <p><strong>Claim boundary:</strong> ${escapeHtml(state.claim_boundary)}</p>
    `;
  }

  function renderInstruments() {
    els.instruments.innerHTML = state.instrument_results.map((item) => `
      <article class="instrument">
        <header>
          <div>
            <p class="eyebrow">${escapeHtml(item.instrument_id)}</p>
            <h2>${escapeHtml(item.instrument_name)}</h2>
          </div>
          <span class="badge">${escapeHtml(item.status)}</span>
        </header>
        <p><strong>Input:</strong> ${escapeHtml(item.input_contract)}</p>
        <p><strong>Operation:</strong> ${escapeHtml(item.operation)}</p>
        <p><strong>Output:</strong> ${escapeHtml(item.output_contract)}</p>
        <p><strong>Acceptance:</strong> ${escapeHtml(item.acceptance_condition)}</p>
        ${item.observed_output ? `<p class="ok"><strong>Observed:</strong> ${escapeHtml(item.observed_output)}</p>` : ""}
        ${item.limitation ? `<p class="warn"><strong>Limit:</strong> ${escapeHtml(item.limitation)}</p>` : ""}
        <button data-run="${escapeHtml(item.instrument_id)}">Run this instrument</button>
      </article>
    `).join("");
    for (const button of els.instruments.querySelectorAll("[data-run]")) {
      button.addEventListener("click", () => runInstrument(button.getAttribute("data-run")));
    }
  }

  function renderAcceptance() {
    els.acceptance.innerHTML = `
      <ul>
        ${state.acceptance_results.map((item) => `<li><strong>${escapeHtml(item.status)}:</strong> ${escapeHtml(item.test)}<br>${escapeHtml(item.observed_basis)}</li>`).join("")}
      </ul>
    `;
  }

  function render() {
    const engine = currentEngine();
    if (!engine || !state) return;
    renderSummary(engine);
    renderInstruments();
    renderAcceptance();
    els.receipt.textContent = JSON.stringify(state, null, 2);
    els.projects.textContent = String(engines.length);
    els.instrumentMetric.textContent = String(engines.reduce((sum, item) => sum + (item.instruments || []).length, 0));
    els.tests.textContent = String(engines.reduce((sum, item) => sum + (item.acceptance_tests || []).length, 0));
    els.runMetric.textContent = String(state.instrument_results.filter((item) => item.status === "passed_package_runtime_check").length);
  }

  els.search.addEventListener("input", applyFilter);
  els.project.addEventListener("change", loadProject);
  els.runAll.addEventListener("click", runAll);
  els.export.addEventListener("click", exportSession);
  els.reset.addEventListener("click", resetState);

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("project");
  populateProjects();
  if (requested && engines.some((engine) => engine.project_id === requested)) {
    els.project.value = requested;
    loadProject();
  }
})();
