/* ==========================================================================
   MEPFacilities Design Directory - Compare Page JavaScript
   ========================================================================== */

// Landing page data (same as app.js)
const landingPages = [
  {
    id: 1,
    title: 'Group Corporate Premium',
    url: 'previews/landing-01.html'
  },
  {
    id: 2,
    title: 'Modern Tech Engineering',
    url: 'previews/landing-02.html'
  },
  {
    id: 3,
    title: 'Industrial Minimal Architecture',
    url: 'previews/landing-03.html'
  }
];

// State
let selectedPages = [];
let currentDevice = 'desktop';
let syncScroll = false;
let notesContent = '';

// DOM Elements
let panel1, panel2, iframe1, iframe2, notesTextarea;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCompare();
});

function initCompare() {
  // Get selected pages from session storage
  const saved = sessionStorage.getItem('compareSelection');
  if (saved) {
    selectedPages = JSON.parse(saved);
  }
  
  // Get DOM elements
  panel1 = document.getElementById('panel1');
  panel2 = document.getElementById('panel2');
  notesTextarea = document.getElementById('notesTextarea');
  
  // Setup selects
  setupSelects();
  
  // Load pages if we have selections
  if (selectedPages.length >= 2) {
    loadPage(1, selectedPages[0]);
    loadPage(2, selectedPages[1]);
  }
  
  // Setup event listeners
  setupEventListeners();
  
  // Load notes from localStorage
  loadNotes();
}

function setupSelects() {
  const select1 = document.getElementById('select1');
  const select2 = document.getElementById('select2');
  
  if (select1) {
    renderSelectOptions(select1, selectedPages[0] || null);
    select1.querySelector('.select-trigger').addEventListener('click', () => {
      select1.classList.toggle('open');
      select2?.classList.remove('open');
    });
  }
  
  if (select2) {
    renderSelectOptions(select2, selectedPages[1] || null);
    select2.querySelector('.select-trigger').addEventListener('click', () => {
      select2.classList.toggle('open');
      select1?.classList.remove('open');
    });
  }
  
  // Close selects on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.landing-select')) {
      document.querySelectorAll('.landing-select').forEach(s => s.classList.remove('open'));
    }
  });
}

function renderSelectOptions(selectEl, selectedId) {
  const dropdown = selectEl.querySelector('.select-dropdown');
  const trigger = selectEl.querySelector('.select-trigger span');
  const panelNum = selectEl.id === 'select1' ? 1 : 2;
  
  const selectedPage = landingPages.find(p => p.id === selectedId);
  trigger.textContent = selectedPage ? selectedPage.title : 'Seleccionar landing...';
  
  dropdown.innerHTML = landingPages.map(page => `
    <div class="select-option ${page.id === selectedId ? 'selected' : ''}" 
         data-id="${page.id}"
         onclick="selectLanding(${panelNum}, ${page.id})">
      <span class="option-number">0${page.id}</span>
      <span>${page.title}</span>
    </div>
  `).join('');
}

function selectLanding(panelNum, pageId) {
  const selectEl = document.getElementById(`select${panelNum}`);
  selectEl.classList.remove('open');
  
  // Update selection
  selectedPages[panelNum - 1] = pageId;
  sessionStorage.setItem('compareSelection', JSON.stringify(selectedPages));
  
  // Re-render select
  renderSelectOptions(selectEl, pageId);
  
  // Load page
  loadPage(panelNum, pageId);
}

function loadPage(panelNum, pageId) {
  const page = landingPages.find(p => p.id === pageId);
  if (!page) return;
  
  const panel = document.getElementById(`panel${panelNum}`);
  const content = panel.querySelector('.panel-content');
  const title = panel.querySelector('.panel-title h3');
  
  // Update title
  title.textContent = page.title;
  
  // Show loading
  content.innerHTML = `
    <div class="panel-loading">
      <div class="loading-spinner"></div>
    </div>
  `;
  
  // Create iframe wrapper
  setTimeout(() => {
    content.innerHTML = `
      <div class="iframe-wrapper ${currentDevice}">
        <iframe src="${page.url}" title="${page.title}" id="iframe${panelNum}"></iframe>
      </div>
    `;
    
    // Get iframe reference
    if (panelNum === 1) {
      iframe1 = document.getElementById('iframe1');
    } else {
      iframe2 = document.getElementById('iframe2');
    }
    
    // Setup sync scroll if enabled
    if (syncScroll) {
      setupSyncScroll();
    }
  }, 500);
}

function setupEventListeners() {
  // Device toggles
  document.querySelectorAll('.device-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const device = btn.dataset.device;
      setDevice(device);
    });
  });
  
  // Sync scroll toggle
  const syncToggle = document.getElementById('syncToggle');
  if (syncToggle) {
    syncToggle.addEventListener('click', () => {
      syncScroll = !syncScroll;
      syncToggle.classList.toggle('active', syncScroll);
      
      if (syncScroll) {
        setupSyncScroll();
      } else {
        removeSyncScroll();
      }
    });
  }
  
  // Notes panel toggle
  const notesToggle = document.getElementById('notesToggle');
  const notesPanel = document.querySelector('.notes-panel');
  if (notesToggle && notesPanel) {
    notesToggle.addEventListener('click', () => {
      notesPanel.classList.toggle('collapsed');
    });
  }
  
  // Notes textarea
  if (notesTextarea) {
    notesTextarea.addEventListener('input', debounce(saveNotes, 500));
  }
  
  // Panel actions
  document.querySelectorAll('.panel-action').forEach(btn => {
    btn.addEventListener('click', handlePanelAction);
  });
}

function setDevice(device) {
  currentDevice = device;
  
  // Update toggle buttons
  document.querySelectorAll('.device-toggle').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.device === device);
  });
  
  // Update iframe wrappers
  document.querySelectorAll('.iframe-wrapper').forEach(wrapper => {
    wrapper.className = `iframe-wrapper ${device}`;
  });
}

function setupSyncScroll() {
  if (!iframe1 || !iframe2) return;
  
  // Wait for iframes to load
  iframe1.addEventListener('load', () => {
    try {
      const doc1 = iframe1.contentDocument || iframe1.contentWindow.document;
      doc1.addEventListener('scroll', () => handleSyncScroll(1));
    } catch (e) {
      console.log('Cannot access iframe content for sync scroll');
    }
  });
  
  iframe2.addEventListener('load', () => {
    try {
      const doc2 = iframe2.contentDocument || iframe2.contentWindow.document;
      doc2.addEventListener('scroll', () => handleSyncScroll(2));
    } catch (e) {
      console.log('Cannot access iframe content for sync scroll');
    }
  });
}

function removeSyncScroll() {
  // Sync scroll removal is handled automatically when iframes reload
}

let isScrolling = false;

function handleSyncScroll(sourcePanel) {
  if (!syncScroll || isScrolling) return;
  
  isScrolling = true;
  
  try {
    const sourceIframe = sourcePanel === 1 ? iframe1 : iframe2;
    const targetIframe = sourcePanel === 1 ? iframe2 : iframe1;
    
    const sourceDoc = sourceIframe.contentDocument || sourceIframe.contentWindow.document;
    const targetDoc = targetIframe.contentDocument || targetIframe.contentWindow.document;
    
    const scrollPercent = sourceDoc.documentElement.scrollTop / 
      (sourceDoc.documentElement.scrollHeight - sourceDoc.documentElement.clientHeight);
    
    const targetScrollTop = scrollPercent * 
      (targetDoc.documentElement.scrollHeight - targetDoc.documentElement.clientHeight);
    
    targetDoc.documentElement.scrollTop = targetScrollTop;
  } catch (e) {
    console.log('Sync scroll error:', e);
  }
  
  setTimeout(() => {
    isScrolling = false;
  }, 50);
}

function handlePanelAction(e) {
  const action = e.currentTarget.dataset.action;
  const panel = e.currentTarget.closest('.compare-panel');
  const panelNum = panel.id === 'panel1' ? 1 : 2;
  const pageId = selectedPages[panelNum - 1];
  const page = landingPages.find(p => p.id === pageId);
  
  if (!page) return;
  
  switch (action) {
    case 'refresh':
      loadPage(panelNum, pageId);
      break;
    case 'newtab':
      window.open(page.url, '_blank');
      break;
  }
}

function loadNotes() {
  const saved = localStorage.getItem('mep-compare-notes');
  if (saved && notesTextarea) {
    notesTextarea.value = saved;
    notesContent = saved;
  }
}

function saveNotes() {
  if (!notesTextarea) return;
  
  notesContent = notesTextarea.value;
  localStorage.setItem('mep-compare-notes', notesContent);
  
  // Show saved indicator
  const savedIndicator = document.querySelector('.notes-saved');
  if (savedIndicator) {
    savedIndicator.style.opacity = '1';
    setTimeout(() => {
      savedIndicator.style.opacity = '0.5';
    }, 2000);
  }
}

// Utility: Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export for global access
window.selectLanding = selectLanding;
