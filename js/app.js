/* ==========================================================================
   MEPFacilities Design Directory - Main App JavaScript
   ========================================================================== */

// ===== Landing Page Data =====
const landingPages = [
  {
    id: 'landing-01',
    title: 'Group Corporate Premium',
    description: 'Diseño corporativo premium que refleja la identidad del grupo empresarial. Hero impactante, sección de empresas y beneficios con animaciones elegantes.',
    url: 'previews/landing-01.html',
    tags: ['Corporate', 'Premium', 'Grupo'],
    thumbnail: 'thumb-01'
  },
  {
    id: 'landing-02',
    title: 'Modern Tech / Engineering',
    description: 'Estética moderna y tecnológica con gradientes animados, timeline de proceso y estadísticas con contadores animados. Ideal para transmitir innovación.',
    url: 'previews/landing-02.html',
    tags: ['Tech', 'Modern', 'Engineering'],
    thumbnail: 'thumb-02'
  },
  {
    id: 'landing-03',
    title: 'Industrial Minimal',
    description: 'Diseño minimalista editorial con énfasis en tipografía y espaciado. Galería de proyectos limpia y secciones de compliance y equipo.',
    url: 'previews/landing-03.html',
    tags: ['Minimal', 'Industrial', 'Editorial'],
    thumbnail: 'thumb-03'
  }
];

// ===== Filter Tags =====
const filterTags = ['Todos', 'Corporate', 'Tech', 'Modern', 'Premium', 'Minimal', 'Industrial', 'Engineering', 'Grupo', 'Editorial'];

// ===== State =====
let selectedForCompare = [];
let activeFilter = 'Todos';
let searchQuery = '';

// ===== DOM Elements =====
const landingCardsContainer = document.getElementById('landingCards');
const filterTagsContainer = document.getElementById('filterTags');
const searchInput = document.getElementById('searchInput');
const compareSelection = document.getElementById('compareSelection');
const compareBtn = document.getElementById('compareBtn');
const clearCompareBtn = document.getElementById('clearCompareBtn');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  hideLoader();
  renderFilterTags();
  renderLandingCards();
  initEventListeners();
});

// ===== Hide Loader =====
function hideLoader() {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
}

// ===== Render Filter Tags =====
function renderFilterTags() {
  if (!filterTagsContainer) return;
  
  filterTagsContainer.innerHTML = filterTags.map(tag => `
    <button 
      class="filter-tag ${tag === activeFilter ? 'active' : ''}" 
      data-tag="${tag}"
      aria-pressed="${tag === activeFilter}"
    >
      ${tag}
    </button>
  `).join('');
}

// ===== Render Landing Cards =====
function renderLandingCards() {
  if (!landingCardsContainer) return;
  
  const filteredPages = landingPages.filter(page => {
    const matchesFilter = activeFilter === 'Todos' || page.tags.includes(activeFilter);
    const matchesSearch = searchQuery === '' || 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (filteredPages.length === 0) {
    landingCardsContainer.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <h3>No se encontraron diseños</h3>
        <p>Intenta con otros términos de búsqueda o filtros.</p>
      </div>
    `;
    return;
  }

  landingCardsContainer.innerHTML = filteredPages.map((page, index) => `
    <article class="landing-card reveal stagger-${index + 1}" data-id="${page.id}">
      <div class="compare-checkbox">
        <input 
          type="checkbox" 
          id="compare-${page.id}" 
          ${selectedForCompare.includes(page.id) ? 'checked' : ''}
          ${selectedForCompare.length >= 2 && !selectedForCompare.includes(page.id) ? 'disabled' : ''}
        >
        <label for="compare-${page.id}">
          <span class="checkbox-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
          Comparar
        </label>
      </div>
      
      <div class="card-thumbnail">
        <div class="thumbnail-bg ${page.thumbnail}"></div>
        <div class="thumbnail-decoration">
          <div class="thumb-mockup"></div>
        </div>
      </div>
      
      <div class="card-content">
        <div class="card-tags">
          ${page.tags.map(tag => `<span class="pill">${tag}</span>`).join('')}
        </div>
        <h3 class="card-title">${page.title}</h3>
        <p class="card-description">${page.description}</p>
        <div class="card-actions">
          <a href="${page.url}" class="btn btn-primary btn-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Preview
          </a>
          <a href="${page.url}" target="_blank" class="btn btn-secondary btn-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Nueva pestaña
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Re-trigger reveal animations
  setTimeout(() => {
    document.querySelectorAll('.landing-card.reveal').forEach(card => {
      card.classList.add('visible');
    });
  }, 100);
}

// ===== Event Listeners =====
function initEventListeners() {
  // Filter tags
  if (filterTagsContainer) {
    filterTagsContainer.addEventListener('click', (e) => {
      const tag = e.target.closest('.filter-tag');
      if (tag) {
        activeFilter = tag.dataset.tag;
        renderFilterTags();
        renderLandingCards();
      }
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      searchQuery = e.target.value;
      renderLandingCards();
    }, 300));
  }

  // Compare checkboxes (event delegation)
  if (landingCardsContainer) {
    landingCardsContainer.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox' && e.target.id.startsWith('compare-')) {
        const pageId = e.target.id.replace('compare-', '');
        toggleCompare(pageId);
      }
    });
  }

  // Compare button
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      if (selectedForCompare.length === 2) {
        const page1 = landingPages.find(p => p.id === selectedForCompare[0]);
        const page2 = landingPages.find(p => p.id === selectedForCompare[1]);
        window.location.href = `compare.html?left=${encodeURIComponent(page1.url)}&right=${encodeURIComponent(page2.url)}`;
      }
    });
  }

  // Clear compare
  if (clearCompareBtn) {
    clearCompareBtn.addEventListener('click', clearCompare);
  }

  // Preview links with transition
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="previews/"]');
    if (link && !e.target.closest('[target="_blank"]')) {
      e.preventDefault();
      navigateWithTransition(link.href);
    }
  });
}

// ===== Compare Functions =====
function toggleCompare(pageId) {
  const index = selectedForCompare.indexOf(pageId);
  if (index > -1) {
    selectedForCompare.splice(index, 1);
  } else if (selectedForCompare.length < 2) {
    selectedForCompare.push(pageId);
  }
  updateCompareUI();
  renderLandingCards();
}

function clearCompare() {
  selectedForCompare = [];
  updateCompareUI();
  renderLandingCards();
}

function updateCompareUI() {
  if (!compareSelection) return;
  
  const count = selectedForCompare.length;
  const countEl = compareSelection.querySelector('.compare-count strong');
  if (countEl) countEl.textContent = count;
  
  if (compareBtn) compareBtn.disabled = count < 2;
  
  if (count > 0) {
    compareSelection.classList.add('visible');
  } else {
    compareSelection.classList.remove('visible');
  }
}

// ===== Navigation with Transition =====
function navigateWithTransition(href) {
  const transition = document.querySelector('.page-transition');
  if (transition) {
    transition.classList.add('active');
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  } else {
    window.location.href = href;
  }
}

// ===== Utility Functions =====
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
