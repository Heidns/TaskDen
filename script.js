// ── State ──
// Updated to separate TaskDen data from previous versions
let tasks = JSON.parse(localStorage.getItem('taskden_tasks') || '[]');
let currentFilter = 'all';

// ── Date display ──
const now = new Date();
document.getElementById('date-display').innerHTML =
  now.toLocaleDateString('en-IN', { weekday: 'long' }) + '<br>' +
  now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// ── Save ──
function save() {
  localStorage.setItem('taskden_tasks', JSON.stringify(tasks));
}

// ── Add task ──
function addTask() {
  const input = document.getElementById('task-input');
  const tag = document.getElementById('tag-select').value;
  const priority = document.getElementById('priority-select').value;
  const text = input.value.trim();

  if (!text) {
    input.classList.add('error');
    document.getElementById('error-msg').classList.add('show');
    setTimeout(() => {
      input.classList.remove('error');
      document.getElementById('error-msg').classList.remove('show');
    }, 2000);
    return;
  }

  tasks.unshift({
    id: Date.now(),
    text,
    tag,
    priority,
    done: false,
    createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  });

  input.value = '';
  document.getElementById('tag-select').value = 'none';
  document.getElementById('priority-select').value = 'medium';
  save();
  render();
}

// ── Toggle done ──
function toggleDone(id) {
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = !t.done; save(); render(); }
}

// ── Delete ──
function deleteTask(id) {
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el) {
    el.classList.add('removing');
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      save();
      render();
    }, 300);
  }
}

// ── Clear completed ──
document.getElementById('clear-done').addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
});

// ── Filters ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// ── Render ──
function render() {
  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-state');
  const emptyText = document.getElementById('empty-text');

  let filtered = tasks;
  if (currentFilter === 'active') filtered = tasks.filter(t => !t.done);
  else if (currentFilter === 'done') filtered = tasks.filter(t => t.done);
  else if (currentFilter === 'high') filtered = tasks.filter(t => t.priority === 'high');

  list.innerHTML = '';

  if (filtered.length === 0) {
    empty.style.display = 'block';
    emptyText.textContent = currentFilter === 'done'
      ? 'No completed tasks yet.'
      : currentFilter === 'high'
      ? 'No high priority tasks!'
      : tasks.length === 0
      ? 'Your den is quiet — add some tasks!'
      : 'Nothing to show here.';
  } else {
    empty.style.display = 'none';
    filtered.forEach(t => {
      const el = document.createElement('div');
      el.className = `task-item p-${t.priority}${t.done ? ' done' : ''}`;
      el.dataset.id = t.id;
      el.innerHTML = `
        <button class="check-btn" onclick="toggleDone(${t.id})" title="${t.done ? 'Mark undone' : 'Mark done'}">
          ${t.done ? '✓' : ''}
        </button>
        <div class="task-content">
          <div class="task-text">${escapeHtml(t.text)}</div>
          <div class="task-meta">
            <span class="tag-badge ${t.tag}">${t.tag !== 'none' ? t.tag : ''}</span>
            <span class="priority-badge ${t.priority}">${t.priority}</span>
            <span class="task-time">${t.createdAt}</span>
          </div>
        </div>
        <button class="delete-btn" onclick="deleteTask(${t.id})" title="Delete">✕</button>
      `;
      list.appendChild(el);
    });
  }

  // Stats
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const left = total - done;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-done').textContent = done;
  document.getElementById('stat-left').textContent = left;

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
}

// ── Escape HTML ──
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Event listeners ──
document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

// ── Init ──
render();