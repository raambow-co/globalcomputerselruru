/**
 * GLOBAL COMPUTERS — 3D SPATIAL INTERACTION & AVAILABILITY ENGINE
 * 60 FPS LERP Physics, Multi-Plane Depth Tracking, Modal Engine & Hardware Tooltips
 */

(function () {
  'use strict';

  // State Management
  const state = {
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    scrollY: 0,
    isHoveringProduct: false,
    activeModal: false,
    audioCtx: null
  };

  // DOM Elements
  const header = document.getElementById('mainHeader');
  const depthLayers = document.querySelectorAll('.depth-layer');
  const floatingProducts = document.querySelectorAll('.floating-product-wrap');
  const hudTooltip = document.getElementById('productHudTooltip');
  const hudTitle = document.getElementById('hudTitle');
  const hudSpec = document.getElementById('hudSpec');
  const hudStatus = document.getElementById('hudStatus');

  // Modal Elements
  const modalOverlay = document.getElementById('availabilityModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openEnquiryBtn = document.getElementById('openEnquiryBtn');
  const heroCheckAvailabilityBtn = document.getElementById('heroCheckAvailabilityBtn');
  const mobileEnquireBtn = document.getElementById('mobileEnquireBtn');
  const quickBrowseBtn = document.getElementById('quickBrowseBtn');
  const availabilityForm = document.getElementById('availabilityForm');
  const productCategory = document.getElementById('productCategory');
  const productModel = document.getElementById('productModel');
  const modalSuccessState = document.getElementById('modalSuccessState');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const enquiryTrackingCode = document.getElementById('enquiryTrackingCode');

  // Mobile Drawer Elements
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Solution Grid Action Buttons
  const solutionButtons = document.querySelectorAll('.btn-card-check');

  /* ==========================================================================
     1. SUBTLE HAPTIC WEB AUDIO FEEDBACK (Luxury Tactile Feel)
     ========================================================================== */
  function playHapticBeep(freq = 520, type = 'sine', duration = 0.04) {
    try {
      if (!state.audioCtx) {
        state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, state.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, state.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(state.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not supported or blocked, fail silently
    }
  }

  /* ==========================================================================
     2. 60 FPS LERP PARALLAX ENGINE
     ========================================================================== */
  const lerp = (start, end, factor) => start + (end - start) * factor;

  // Window center reference
  let winCenterX = window.innerWidth / 2;
  let winCenterY = window.innerHeight / 2;

  function updateWindowCenter() {
    winCenterX = window.innerWidth / 2;
    winCenterY = window.innerHeight / 2;
  }
  window.addEventListener('resize', updateWindowCenter);

  // Mouse move listener
  window.addEventListener('mousemove', (e) => {
    // Normalize coordinates from -1 to 1
    state.targetX = (e.clientX - winCenterX) / winCenterX;
    state.targetY = (e.clientY - winCenterY) / winCenterY;

    // Position Product HUD Tooltip if visible
    if (state.isHoveringProduct && hudTooltip) {
      const offsetX = 20;
      const offsetY = 20;
      hudTooltip.style.left = `${e.clientX + offsetX}px`;
      hudTooltip.style.top = `${e.clientY + offsetY}px`;
    }
  });

  // Touch move listener for mobile tilt/pan
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      state.targetX = (e.touches[0].clientX - winCenterX) / winCenterX;
      state.targetY = (e.touches[0].clientY - winCenterY) / winCenterY;
    }
  }, { passive: true });

  // Main Render Loop for Butter-Smooth Parallax Physics
  function renderFrame() {
    // Smooth dampening interpolation
    state.mouseX = lerp(state.mouseX, state.targetX, 0.06);
    state.mouseY = lerp(state.mouseY, state.targetY, 0.06);
    state.scrollY = window.scrollY;

    // Apply parallax translation & slight 3D rotation per depth layer
    depthLayers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-depth') || '0.05');
      const moveX = state.mouseX * depth * 320;
      const moveY = state.mouseY * depth * 220;
      const rotY = state.mouseX * depth * 14;
      const rotX = -state.mouseY * depth * 14;
      const scrollOffset = state.scrollY * depth * 0.45;

      layer.style.transform = `translate3d(${moveX}px, ${moveY - scrollOffset}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);

  /* ==========================================================================
     3. PRODUCT HOVER INSPECTION & SPEC HUD
     ========================================================================== */
  floatingProducts.forEach((prod) => {
    const prodName = prod.getAttribute('data-product') || 'Commercial Component';
    const prodSpec = prod.getAttribute('data-spec') || 'Enterprise Specification';
    const prodStatus = prod.getAttribute('data-status') || '● Verified In Stock';

    prod.addEventListener('mouseenter', (e) => {
      state.isHoveringProduct = true;
      hudTitle.textContent = prodName;
      hudSpec.textContent = prodSpec;
      hudStatus.textContent = prodStatus;
      hudTooltip.classList.add('active');
      playHapticBeep(480, 'sine', 0.03);
    });

    prod.addEventListener('mouseleave', () => {
      state.isHoveringProduct = false;
      hudTooltip.classList.remove('active');
    });

    // Clicking a floating product opens the availability modal with prefilled data
    prod.addEventListener('click', () => {
      openAvailabilityModalWithItem(prodName);
      playHapticBeep(640, 'triangle', 0.06);
    });
  });

  /* ==========================================================================
     4. AVAILABILITY MODAL & ENQUIRY WORKFLOW
     ========================================================================== */
  function openModal() {
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    state.activeModal = true;
    playHapticBeep(520, 'sine', 0.05);

    // Focus first input
    setTimeout(() => {
      const firstInput = availabilityForm.querySelector('input, select');
      if (firstInput) firstInput.focus();
    }, 100);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.activeModal = false;

    // Reset success state after fade out
    setTimeout(() => {
      availabilityForm.style.display = 'block';
      modalSuccessState.style.display = 'none';
      availabilityForm.reset();
    }, 350);
  }

  function openAvailabilityModalWithItem(itemTitle) {
    openModal();
    if (productModel) {
      productModel.value = itemTitle;
    }

    // Auto-select corresponding category
    const titleLower = itemTitle.toLowerCase();
    if (titleLower.includes('printer') || titleLower.includes('epson')) {
      productCategory.value = 'printers';
    } else if (titleLower.includes('monitor') || titleLower.includes('display')) {
      productCategory.value = 'displays';
    } else if (titleLower.includes('gpu') || titleLower.includes('graphics')) {
      productCategory.value = 'gpus';
    } else if (titleLower.includes('keyboard')) {
      productCategory.value = 'accessories';
    } else {
      productCategory.value = 'components';
    }
  }

  // Trigger Open Buttons
  if (heroCheckAvailabilityBtn) {
    heroCheckAvailabilityBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (openEnquiryBtn) {
    openEnquiryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (mobileEnquireBtn) {
    mobileEnquireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileDrawer();
      openModal();
    });
  }

  if (quickBrowseBtn) {
    quickBrowseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // Solution Card Buttons
  solutionButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemName = btn.getAttribute('data-item') || 'Corporate Hardware Package';
      openAvailabilityModalWithItem(itemName);
    });
  });

  // Close Listeners
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.activeModal) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (availabilityForm) {
    availabilityForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Generate random stylish tracking code
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const categoryCode = (productCategory.value || 'GEN').toUpperCase().slice(0, 3);
      const trackingCode = `GC-${randomNum}-${categoryCode}`;
      
      if (enquiryTrackingCode) {
        enquiryTrackingCode.textContent = trackingCode;
      }

      // Transition to Success State
      availabilityForm.style.display = 'none';
      modalSuccessState.style.display = 'block';
      playHapticBeep(880, 'sine', 0.12);
    });
  }

  /* ==========================================================================
     5. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  function openMobileDrawer() {
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    mobileToggleBtn.classList.add('active');
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    mobileToggleBtn.classList.remove('active');
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      const isExpanded = mobileDrawer.classList.contains('active');
      if (isExpanded) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  /* ==========================================================================
     6. HEADER SCROLL SHADOW BEHAVIOR
     ========================================================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  console.log('Global Computers Hero Experience initialized with 3D Spatial Physics.');
})();
