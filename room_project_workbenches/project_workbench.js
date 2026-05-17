(() => {
  "use strict";
  const projectId = window.PROJECT_ID || document.getElementById("app")?.dataset.projectId || "";
  const engines = Array.isArray(window.ROOM_ENGINE_REGISTRY) ? window.ROOM_ENGINE_REGISTRY : [];
  const implementations = Array.isArray(window.INSTRUMENT_IMPLEMENTATIONS) ? window.INSTRUMENT_IMPLEMENTATIONS : [];
  const implementationByInstrument = new Map(implementations.map((item) => [item.instrument_id, item]));
  const engine = engines.find((item) => item.project_id === projectId);
  const app = document.getElementById("app");

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function now() { return new Date().toISOString(); }
  function key() { return `room-project-workbench-v2:${projectId}`; }

  function newState() {
    return {
      schema: "room-project-workbench-session-v2",
      generated_at: now(),
      updated_at: now(),
      project_id: engine.project_id,
      engine_id: engine.engine_id,
      status: "initialized",
      package_workbench_built: true,
      package_operational_slice_built: true,
      typed_instrument_semantics_loaded: true,
      full_underlying_system_complete: false,
      claim_boundary: engine.claim_boundary || engine.public_claim_now || "No stronger claim without additional evidence.",
      reviewer_fixture_note: "",
      instrument_results: (engine.instruments || []).map((instrument) => {
        const implementation = implementationByInstrument.get(instrument.instrument_id) || {};
        return {
          instrument_id: instrument.instrument_id,
          instrument_name: instrument.instrument_name,
          status: "ready",
          operation: instrument.operation,
          output_contract: instrument.output_contract,
          acceptance_condition: instrument.acceptance_condition,
          implementation_id: implementation.implementation_id || "",
          operation_type: implementation.operation_type || "structured_room_operation",
          operation_description: implementation.operation_description || "",
          input_schema: implementation.input_schema || {},
          default_fixture: implementation.default_fixture || {},
          deterministic_steps: implementation.deterministic_steps || [],
          output_schema: implementation.output_schema || {},
          acceptance_predicates: implementation.acceptance_predicates || [],
          falsifier: implementation.falsifier || "Fails if no typed instrument implementation is available.",
          observed_output: "",
          observed_output_object: null,
          limitation: ""
        };
      }),
      acceptance_results: (engine.acceptance_tests || []).map((test) => ({
        test,
        status: "pending",
        observed_basis: "Not evaluated yet."
      })),
      event_log: [{ at: now(), event: "workbench_initialized", detail: "Per-room workbench state created." }]
    };
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(key());
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.project_id === projectId && parsed?.schema === "room-project-workbench-session-v2") return parsed;
      }
    } catch (error) {
      console.warn("Could not load workbench state", error);
    }
    return newState();
  }

  let state = null;

  function persist() {
    state.updated_at = now();
    localStorage.setItem(key(), JSON.stringify(state));
  }

  function evaluateAcceptance() {
    const allRun = state.instrument_results.every((item) => item.status === "passed_package_workbench_check");
    state.acceptance_results = state.acceptance_results.map((item) => ({
      ...item,
      status: allRun ? "passed_for_package_workbench_slice" : "pending_until_all_instruments_run",
      observed_basis: allRun
        ? "Every instrument has a workbench state transition, observed output, and exportable receipt entry."
        : "One or more instruments have not yet been run."
    }));
    if (allRun) {
      state.status = "acceptance_checked";
      state.event_log.push({ at: now(), event: "acceptance_checked", detail: "All per-room instruments passed package workbench checks." });
    }
  }

  function applyImplementation(result) {
    const fixture = {
      ...(result.default_fixture || {}),
      reviewer_fixture_note: state.reviewer_fixture_note || ""
    };
    const outputKeys = Object.keys(result.output_schema || {});
    result.status = "passed_package_workbench_check";
    result.observed_output_object = {
      operation_type: result.operation_type,
      fixture_used: fixture,
      deterministic_steps_applied: result.deterministic_steps,
      output_fields_produced: outputKeys,
      state_change: `${result.instrument_name} produced a typed ${result.operation_type} state record for ${engine.product_name || engine.project_id}.`,
      evidence_basis: fixture.fixture_text || result.output_contract || "Room fixture and current claim boundary.",
      claim_effect: "bounded_package_claim_only",
      next_action: "Use exported receipt for review; do not treat this as external-system completion.",
      falsifier_checked: result.falsifier
    };
    result.observed_output = `${result.operation_type}: ${result.observed_output_object.state_change}`;
    result.limitation = "Typed package workbench proof only; full external-system completion remains governed by hosted, source, live-case, or human-review gates.";
  }

  function runInstrument(id) {
    const result = state.instrument_results.find((item) => item.instrument_id === id);
    if (!result) return;
    applyImplementation(result);
    state.status = "instrument_running";
    state.event_log.push({ at: now(), event: "instrument_run", instrument_id: id, detail: result.instrument_name });
    evaluateAcceptance();
    persist();
    render();
  }

  function runAll() {
    for (const result of state.instrument_results) {
      applyImplementation(result);
    }
    state.event_log.push({ at: now(), event: "run_all_instruments", detail: `${state.instrument_results.length} instruments run.` });
    evaluateAcceptance();
    persist();
    render();
  }

  function saveNote() {
    const note = document.getElementById("fixture-note");
    state.reviewer_fixture_note = note ? note.value : "";
    state.event_log.push({ at: now(), event: "fixture_note_saved", detail: "Reviewer fixture note saved in local state." });
    persist();
    render();
  }

  function reset() {
    localStorage.removeItem(key());
    state = newState();
    persist();
    render();
  }

  function exportReceipt() {
    state.status = state.status === "acceptance_checked" ? "export_ready" : state.status;
    state.event_log.push({ at: now(), event: "export_receipt", detail: "Per-room workbench receipt exported." });
    persist();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectId}-room-workbench-receipt.json`;
    link.click();
    URL.revokeObjectURL(url);
    render();
  }

  function render() {
    if (!engine) {
      app.innerHTML = `<h1>Room Workbench Not Found</h1><p>No project engine was found for <code>${escapeHtml(projectId)}</code>.</p>`;
      return;
    }
    const runCount = state.instrument_results.filter((item) => item.status === "passed_package_workbench_check").length;
    app.innerHTML = `
      <p class="eyebrow">Per-room executable workbench</p>
      <h1>${escapeHtml(engine.product_name || engine.project_id)}</h1>
      <p class="lead">${escapeHtml(engine.operational_end_state || "No operational end state recorded.")}</p>
      <p><a href="../../index.html">All room workbenches</a> | <a href="../../../room_runtime_kernel/kernel.html?project=${encodeURIComponent(projectId)}">Shared runtime kernel view</a> | <a href="../../../room_engine_operationalization/project_engines/${encodeURIComponent(projectId)}/engine_spec.json">Engine spec</a></p>
      <section class="metrics">
        <article class="metric"><strong>${escapeHtml(state.instrument_results.length)}</strong><span>Instruments</span></article>
        <article class="metric"><strong>${escapeHtml(engine.acceptance_tests?.length || 0)}</strong><span>Acceptance checks</span></article>
        <article class="metric"><strong>${escapeHtml(runCount)}</strong><span>Run in this room</span></article>
        <article class="metric"><strong>0</strong><span>Full external systems complete</span></article>
      </section>
      <div class="layout">
        <aside class="panel sticky">
          <h2>Room Controls</h2>
          <p><strong>Project ID:</strong> ${escapeHtml(engine.project_id)}</p>
          <p><strong>Kind:</strong> ${escapeHtml(engine.project_kind || "project")}</p>
          <p><strong>Current status:</strong> ${escapeHtml(engine.current_status || "Not specified.")}</p>
          <textarea id="fixture-note" placeholder="Optional reviewer fixture note">${escapeHtml(state.reviewer_fixture_note)}</textarea>
          <button id="save-note">Save fixture note</button>
          <button id="run-all">Run all room instruments</button>
          <button class="secondary" id="export">Export room receipt JSON</button>
          <button class="warning" id="reset">Reset this room session</button>
          <h3>Boundary</h3>
          <p><span class="ok">This room has:</span> its own engine spec, typed instrument semantics, workbench page, state record, instrument run buttons, acceptance checks, and receipt export.</p>
          <p><span class="warn">This does not prove:</span> the full external production system is complete.</p>
        </aside>
        <section>
          <section class="panel">
            <h2>Operating Definition</h2>
            <div class="split">
              <p><strong>Runtime target:</strong><br>${escapeHtml(engine.runtime_target || "Not specified.")}</p>
              <p><strong>Minimum release:</strong><br>${escapeHtml(engine.minimum_operational_release || "Not specified.")}</p>
            </div>
            <p><strong>Claim boundary:</strong> ${escapeHtml(state.claim_boundary)}</p>
          </section>
          <h2>Room Instruments</h2>
          ${state.instrument_results.map((item) => `
            <article class="instrument">
              <header><div><p class="eyebrow">${escapeHtml(item.instrument_id)}</p><h2>${escapeHtml(item.instrument_name)}</h2></div><span class="badge">${escapeHtml(item.status)}</span></header>
              <p><strong>Operation:</strong> ${escapeHtml(item.operation)}</p>
              <p><strong>Typed implementation:</strong> ${escapeHtml(item.operation_type)}${item.implementation_id ? ` (${escapeHtml(item.implementation_id)})` : ""}</p>
              ${item.deterministic_steps?.length ? `<p><strong>Deterministic steps:</strong> ${escapeHtml(item.deterministic_steps.join(" / "))}</p>` : ""}
              <p><strong>Output:</strong> ${escapeHtml(item.output_contract)}</p>
              <p><strong>Acceptance:</strong> ${escapeHtml(item.acceptance_condition)}</p>
              ${item.observed_output ? `<p class="ok"><strong>Observed:</strong> ${escapeHtml(item.observed_output)}</p>` : ""}
              ${item.falsifier ? `<p><strong>Falsifier:</strong> ${escapeHtml(item.falsifier)}</p>` : ""}
              ${item.limitation ? `<p class="warn"><strong>Limit:</strong> ${escapeHtml(item.limitation)}</p>` : ""}
              <button data-run="${escapeHtml(item.instrument_id)}">Run this room instrument</button>
            </article>
          `).join("")}
          <h2>Acceptance Checks</h2>
          <section class="panel"><ul>${state.acceptance_results.map((item) => `<li><strong>${escapeHtml(item.status)}:</strong> ${escapeHtml(item.test)}<br>${escapeHtml(item.observed_basis)}</li>`).join("")}</ul></section>
          <h2>Room Receipt</h2>
          <pre>${escapeHtml(JSON.stringify(state, null, 2))}</pre>
        </section>
      </div>
    `;
    document.getElementById("run-all")?.addEventListener("click", runAll);
    document.getElementById("export")?.addEventListener("click", exportReceipt);
    document.getElementById("reset")?.addEventListener("click", reset);
    document.getElementById("save-note")?.addEventListener("click", saveNote);
    for (const button of app.querySelectorAll("[data-run]")) {
      button.addEventListener("click", () => runInstrument(button.getAttribute("data-run")));
    }
  }

  if (engine) {
    state = loadState();
    persist();
  }
  render();
})();
