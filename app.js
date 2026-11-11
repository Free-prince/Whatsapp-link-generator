/* ==========================================================================
   Watslink - WhatsApp Link Generator
   Application Logic
   ========================================================================== */

// ============================================================================
// Country Code Data
// ============================================================================

const COUNTRIES = [
  { code: 'US', name: 'United States', dialCode: '+1', mask: '(###) ###-####' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', mask: '#### ######' },
  { code: 'CA', name: 'Canada', dialCode: '+1', mask: '(###) ###-####' },
  { code: 'AU', name: 'Australia', dialCode: '+61', mask: '#### ### ###' },
  { code: 'DE', name: 'Germany', dialCode: '+49', mask: '## #### ####' },
  { code: 'FR', name: 'France', dialCode: '+33', mask: '# ## ## ## ##' },
  { code: 'IN', name: 'India', dialCode: '+91', mask: '##### #####' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', mask: '## #####-####' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', mask: '## #### ####' },
  { code: 'ES', name: 'Spain', dialCode: '+34', mask: '### ### ###' },
  { code: 'IT', name: 'Italy', dialCode: '+39', mask: '## #### ####' },
  { code: 'JP', name: 'Japan', dialCode: '+81', mask: '## #### ####' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', mask: '## #### ####' },
  { code: 'CN', name: 'China', dialCode: '+86', mask: '### #### ####' },
  { code: 'RU', name: 'Russia', dialCode: '+7', mask: '### ### ## ##' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', mask: '## ### ####' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', mask: '### ### ####' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', mask: '## ### ####' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', mask: '### ### ###' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', mask: '## ### ####' },
  { code: 'AE', name: 'UAE', dialCode: '+971', mask: '## ### ####' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', mask: '## ### ####' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', mask: '#### ####' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', mask: '## #### ####' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', mask: '## #### ####' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', mask: '## #### ####' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', mask: '### #### ####' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', mask: '## ### ####' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', mask: '### #######' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', mask: '## #### ####' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', mask: '## #### ####' },
  { code: 'CL', name: 'Chile', dialCode: '+56', mask: '## #### ####' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', mask: '### #### ####' },
  { code: 'PE', name: 'Peru', dialCode: '+51', mask: '### ### ###' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', mask: '### #### ####' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', mask: '## #### ####' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', mask: '## ### ## ##' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', mask: '## ### ## ##' },
  { code: 'AT', name: 'Austria', dialCode: '+43', mask: '# ### ####' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', mask: '## #### ###' },
  { code: 'NO', name: 'Norway', dialCode: '+47', mask: '#### ####' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', mask: '#### ####' },
  { code: 'FI', name: 'Finland', dialCode: '+358', mask: '## #### ####' },
  { code: 'PL', name: 'Poland', dialCode: '+48', mask: '### ### ###' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', mask: '### ### ###' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', mask: '# ## ### ###' },
  { code: 'RO', name: 'Romania', dialCode: '+40', mask: '### ### ###' },
  { code: 'GR', name: 'Greece', dialCode: '+30', mask: '## ### ####' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', mask: '### ### ###' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', mask: '## ### ####' },
  { code: 'IL', name: 'Israel', dialCode: '+972', mask: '## #######' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', mask: '### ### ## ##' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', mask: '# ### ####' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', mask: '#### ####' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', mask: '# #### ####' },
  { code: 'MO', name: 'Macau', dialCode: '+853', mask: '#### ####' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', mask: '#### ####' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', mask: '#### ####' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', mask: '#### ####' },
  { code: 'OM', name: 'Oman', dialCode: '+968', mask: '#### ####' },
  { code: 'JO', name: 'Jordan', dialCode: '+962', mask: '## #######' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961', mask: '## #######' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964', mask: '## #######' },
  { code: 'IR', name: 'Iran', dialCode: '+98', mask: '### ### ####' },
  { code: 'MA', name: 'Morocco', dialCode: '+212', mask: '#### ####' },
  { code: 'TN', name: 'Tunisia', dialCode: '+216', mask: '## ### ###' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', mask: '## ## ## ##' },
  { code: 'LY', name: 'Libya', dialCode: '+218', mask: '## ### ###' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251', mask: '## ### ####' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', mask: '## ### ####' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', mask: '## ### ####' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250', mask: '### ### ###' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', mask: '## #######' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', mask: '## ### ####' },
  { code: 'BW', name: 'Botswana', dialCode: '+267', mask: '## ### ###' },
  { code: 'NA', name: 'Namibia', dialCode: '+264', mask: '## ### ###' },
  { code: 'MU', name: 'Mauritius', dialCode: '+230', mask: '### ####' },
  { code: 'SC', name: 'Seychelles', dialCode: '+248', mask: '### ###' },
  { code: 'MV', name: 'Maldives', dialCode: '+960', mask: '### ####' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', mask: '## ### ####' },
  { code: 'NP', name: 'Nepal', dialCode: '+977', mask: '# #### ####' },
  { code: 'BT', name: 'Bhutan', dialCode: '+975', mask: '## #######' },
  { code: 'MM', name: 'Myanmar', dialCode: '+95', mask: '# #######' },
  { code: 'KH', name: 'Cambodia', dialCode: '+855', mask: '## ### ###' },
  { code: 'LA', name: 'Laos', dialCode: '+856', mask: '## ### ###' },
  { code: 'MN', name: 'Mongolia', dialCode: '+976', mask: '#### ####' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', mask: '### ### ###' },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', mask: '## ### ###' },
  { code: 'KG', name: 'Kyrgyzstan', dialCode: '+996', mask: '### ### ###' },
  { code: 'TJ', name: 'Tajikistan', dialCode: '+992', mask: '## ### ###' },
  { code: 'TM', name: 'Turkmenistan', dialCode: '+993', mask: '## ### ###' },
  { code: 'AZ', name: 'Azerbaijan', dialCode: '+994', mask: '## ### ###' },
  { code: 'GE', name: 'Georgia', dialCode: '+995', mask: '### ### ###' },
  { code: 'AM', name: 'Armenia', dialCode: '+374', mask: '## ### ###' },
  { code: 'BY', name: 'Belarus', dialCode: '+375', mask: '## ### ###' },
  { code: 'MD', name: 'Moldova', dialCode: '+373', mask: '## ### ###' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', mask: '## ### ###' },
  { code: 'RS', name: 'Serbia', dialCode: '+381', mask: '## ### ###' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', mask: '# #######' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', mask: '# #######' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', mask: '### ### ###' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', mask: '### ### ###' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', mask: '### ### ###' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', mask: '#### ###' },
  { code: 'IS', name: 'Iceland', dialCode: '+354', mask: '### ####' },
  { code: 'FO', name: 'Faroe Islands', dialCode: '+298', mask: '#######' },
  { code: 'GL', name: 'Greenland', dialCode: '+299', mask: '## ####' },
  { code: 'BM', name: 'Bermuda', dialCode: '+1', mask: '### ###-####' },
  { code: 'KY', name: 'Cayman Islands', dialCode: '+1', mask: '### ###-####' },
  { code: 'VG', name: 'British Virgin Islands', dialCode: '+1', mask: '### ###-####' },
  { code: 'VI', name: 'US Virgin Islands', dialCode: '+1', mask: '### ###-####' },
  { code: 'PR', name: 'Puerto Rico', dialCode: '+1', mask: '### ###-####' },
  { code: 'DO', name: 'Dominican Republic', dialCode: '+1', mask: '### ###-####' },
  { code: 'JM', name: 'Jamaica', dialCode: '+1', mask: '### ###-####' },
  { code: 'TT', name: 'Trinidad & Tobago', dialCode: '+1', mask: '### ###-####' },
  { code: 'BB', name: 'Barbados', dialCode: '+1', mask: '### ###-####' },
  { code: 'BS', name: 'Bahamas', dialCode: '+1', mask: '### ###-####' },
  { code: 'AG', name: 'Antigua & Barbuda', dialCode: '+1', mask: '### ###-####' },
  { code: 'DM', name: 'Dominica', dialCode: '+1', mask: '### ###-####' },
  { code: 'GD', name: 'Grenada', dialCode: '+1', mask: '### ###-####' },
  { code: 'KN', name: 'St. Kitts & Nevis', dialCode: '+1', mask: '### ###-####' },
  { code: 'LC', name: 'St. Lucia', dialCode: '+1', mask: '### ###-####' },
  { code: 'VC', name: 'St. Vincent', dialCode: '+1', mask: '### ###-####' },
  { code: 'WS', name: 'Samoa', dialCode: '+685', mask: '#####' },
  { code: 'TO', name: 'Tonga', dialCode: '+676', mask: '#####' },
  { code: 'FJ', name: 'Fiji', dialCode: '+679', mask: '### ###' },
  { code: 'PG', name: 'Papua New Guinea', dialCode: '+675', mask: '### ### ###' },
  { code: 'SB', name: 'Solomon Islands', dialCode: '+677', mask: '##### ###' },
  { code: 'VU', name: 'Vanuatu', dialCode: '+678', mask: '#####' },
  { code: 'NC', name: 'New Caledonia', dialCode: '+687', mask: '## ## ##' },
  { code: 'PF', name: 'French Polynesia', dialCode: '+689', mask: '## ## ## ##' },
  { code: 'WF', name: 'Wallis & Futuna', dialCode: '+681', mask: '## ## ##' },
  { code: 'TK', name: 'Tokelau', dialCode: '+690', mask: '####' },
  { code: 'NU', name: 'Niue', dialCode: '+683', mask: '####' },
  { code: 'CK', name: 'Cook Islands', dialCode: '+682', mask: '#####' },
  { code: 'TV', name: 'Tuvalu', dialCode: '+688', mask: '####' },
  { code: 'FM', name: 'Micronesia', dialCode: '+691', mask: '### ####' },
  { code: 'MH', name: 'Marshall Islands', dialCode: '+692', mask: '### ####' },
  { code: 'PW', name: 'Palau', dialCode: '+680', mask: '#####' },
  { code: 'NR', name: 'Nauru', dialCode: '+674', mask: '#####' },
  { code: 'KI', name: 'Kiribati', dialCode: '+686', mask: '#####' },
];

// ============================================================================
// Short Link Storage (In-Memory for Demo, Use Vercel KV/Redis for Production)
// ============================================================================

// For production: Replace this with Vercel KV, Upstash Redis, or any database
// This in-memory store is for demo purposes only - data is lost on page refresh
const shortLinkStore = new Map();

// Generate a random slug if user doesn't provide one
function generateRandomSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Store short link mapping (slug -> WhatsApp URL) - local cache
function storeShortLink(slug, whatsappUrl) {
  shortLinkStore.set(slug, {
    url: whatsappUrl,
    createdAt: Date.now(),
    clicks: 0
  });
}

/**
 * Call API to create short link in Vercel Edge Function store
 */
async function createShortLinkViaAPI(whatsappUrl, customSlug = null) {
  try {
    const response = await fetch('/api/short', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        whatsappUrl,
        customSlug,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create short link');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API call failed, using local store only:', error);
    // Fallback to local store
    return null;
  }
}

// Get WhatsApp URL from slug (local cache)
function getShortLink(slug) {
  return shortLinkStore.get(slug);
}

// Increment click count (local)
function incrementClick(slug) {
  const entry = shortLinkStore.get(slug);
  if (entry) {
    entry.clicks++;
  }
}

// ============================================================================
// State
// ============================================================================

const state = {
  selectedCountry: COUNTRIES.find(c => c.code === 'US') || COUNTRIES[0],
  generatedLink: null,
  shortLink: null,
  currentSlug: null,
};

// ============================================================================
// DOM Elements
// ============================================================================

const elements = {
  form: document.getElementById('whatsapp-form'),
  countrySelect: document.getElementById('country-code'),
  phoneInput: document.getElementById('phone-number'),
  messageInput: document.getElementById('message'),
  charCount: document.getElementById('char-count-current'),
  customLinkToggle: document.getElementById('custom-link-toggle'),
  customLinkField: document.getElementById('custom-link-field'),
  customSlugInput: document.getElementById('custom-slug'),
  customSlugWrapper: document.querySelector('.custom-link-input-wrapper'),
  slugError: document.getElementById('slug-error'),
  generateBtn: document.getElementById('generate-btn'),
  btnText: document.querySelector('.btn-text'),
  btnLoader: document.querySelector('.btn-loader'),
  resetBtn: document.getElementById('reset-btn'),
  resultsSection: document.getElementById('results-section'),
  whatsappLink: document.getElementById('whatsapp-link'),
  shortLinkItem: document.getElementById('short-link-item'),
  shortLink: document.getElementById('short-link'),
  copyMainLink: document.getElementById('copy-main-link'),
  copyShortLink: document.getElementById('copy-short-link'),
  qrPlaceholder: document.getElementById('qr-placeholder'),
  qrCanvas: document.getElementById('qr-canvas'),
  downloadQr: document.getElementById('download-qr'),
  testLink: document.getElementById('test-link'),
  toastContainer: document.getElementById('toast-container'),
  // Navigation elements
  navToggle: document.getElementById('nav-toggle'),
  headerNav: document.getElementById('header-nav'),
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Sanitize phone number - keep only digits
 */
function sanitizePhoneNumber(input) {
  return input.replace(/\D/g, '');
}

/**
 * Validate phone number for selected country
 */
function validatePhoneNumber(phone, country) {
  const cleaned = sanitizePhoneNumber(phone);
  // Basic validation - at least 7 digits, max 15
  if (cleaned.length < 7 || cleaned.length > 15) {
    return false;
  }
  return true;
}

/**
 * Format phone number for WhatsApp (country code + number, no + or spaces)
 */
function formatPhoneForWhatsApp(phone, dialCode) {
  const cleaned = sanitizePhoneNumber(phone);
  const countryCode = dialCode.replace('+', '');
  return countryCode + cleaned;
}

/**
 * Generate WhatsApp link
 */
function generateWhatsAppLink(phone, dialCode, message) {
  const formattedPhone = formatPhoneForWhatsApp(phone, dialCode);
  const baseUrl = 'https://wa.me/';
  const params = new URLSearchParams();

  if (message && message.trim()) {
    params.set('text', message.trim());
  }

  const queryString = params.toString();
  return queryString ? `${baseUrl}${formattedPhone}?${queryString}` : `${baseUrl}${formattedPhone}`;
}

/**
 * Generate short link - creates a working watslink.io/short-link
 * In production, this would call a Vercel Edge Function API
 */
function generateShortLink(slug) {
  // For demo: return the watslink.io URL pattern
  // In production, this would be created via API call to Vercel Edge Function
  return `https://watslink.io/${slug}`;
}

/**
 * Generate a unique slug
 */
function generateUniqueSlug(customSlug = null) {
  if (customSlug && customSlug.trim()) {
    return customSlug.trim();
  }
  // Generate random slug
  let slug;
  let attempts = 0;
  do {
    slug = generateRandomSlug(6);
    attempts++;
  } while (shortLinkStore.has(slug) && attempts < 100);
  return slug;
}

/**
 * Validate custom slug
 */
function validateSlug(slug) {
  if (!slug || !slug.trim()) {
    return { valid: false, error: 'Please enter a custom link name' };
  }
  const trimmed = slug.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Link name must be at least 2 characters' };
  }
  if (trimmed.length > 50) {
    return { valid: false, error: 'Link name must be 50 characters or less' };
  }
  if (!/^[a-zA-Z0-9\-_]+$/.test(trimmed)) {
    return { valid: false, error: 'Only letters, numbers, hyphens, and underscores allowed' };
  }
  // Reserved words
  const reserved = ['api', 'admin', 'app', 'www', 'mail', 'ftp', 'blog', 'shop', 'store', 'support', 'help', 'docs', 'status', 'legal', 'privacy', 'terms', 'contact', 'about', 'login', 'signup', 'register', 'signin', 'signout', 'logout', 'auth', 'oauth', 'callback', 'redirect', 'webhook', 'cdn', 'static', 'assets', 'media', 'images', 'img', 'css', 'js', 'api', 'v1', 'v2', 'v3', 'go', 'link', 'short', 'qr', 'qr-code', 'generate', 'create', 'new', 'edit', 'delete', 'settings', 'account', 'profile', 'dashboard', 'analytics', 'stats'];
  if (reserved.includes(trimmed.toLowerCase())) {
    return { valid: false, error: 'This name is reserved. Please choose another.' };
  }
  // Check if already exists
  if (shortLinkStore.has(trimmed)) {
    return { valid: false, error: 'This link name is already taken. Please choose another.' };
  }
  return { valid: true, slug: trimmed };
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : ''}
      ${type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' : ''}
      ${type === 'info' ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>' : ''}
    </svg>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Dismiss">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => toast.remove());

  elements.toastContainer.appendChild(toast);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage, 'success');
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage, 'success');
      return true;
    } catch (e) {
      showToast('Failed to copy. Please try manually.', 'error');
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

/**
 * Set loading state on generate button
 */
function setLoading(loading) {
  if (loading) {
    elements.generateBtn.disabled = true;
    elements.btnText.classList.add('hidden');
    elements.btnLoader.classList.remove('hidden');
  } else {
    elements.generateBtn.disabled = false;
    elements.btnText.classList.remove('hidden');
    elements.btnLoader.classList.add('hidden');
  }
}

/**
 * Generate QR code using QRCode.js library
 */
function generateQRCode(text) {
  return new Promise((resolve, reject) => {
    // Clear previous QR code
    elements.qrCanvas.width = 256;
    elements.qrCanvas.height = 256;
    const ctx = elements.qrCanvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 256, 256);

    try {
      // Use QRCode.js library
      if (typeof QRCode !== 'undefined') {
        // Create a temporary div for QRCode.js
        const tempDiv = document.createElement('div');
        new QRCode(tempDiv, {
          text: text,
          width: 256,
          height: 256,
          colorDark: '#0F172A',
          colorLight: '#FFFFFF',
          correctLevel: QRCode.CorrectLevel.M
        });

        // Wait for canvas to be drawn
        setTimeout(() => {
          const tempCanvas = tempDiv.querySelector('canvas');
          if (tempCanvas) {
            ctx.drawImage(tempCanvas, 0, 0, 256, 256);
          }
          elements.qrPlaceholder.hidden = true;
          elements.qrCanvas.hidden = false;
          resolve(elements.qrCanvas.toDataURL('image/png'));
        }, 100);
      } else {
        // Fallback: simple pattern
        drawFallbackQR(ctx, text);
        elements.qrPlaceholder.hidden = true;
        elements.qrCanvas.hidden = false;
        resolve(elements.qrCanvas.toDataURL('image/png'));
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Fallback QR code drawing (simple pattern)
 */
function drawFallbackQR(ctx, text) {
  const size = 256;
  const moduleCount = 25;
  const moduleSize = size / moduleCount;

  // Generate deterministic pattern from text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  // Seed random
  const seededRandom = (() => {
    let seed = hash;
    return () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return seed / 0xffffffff;
    };
  })();

  // Draw quiet zone
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  // Draw pattern
  ctx.fillStyle = '#0F172A';
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      // Finder patterns (corners)
      const inFinder =
        (row < 7 && col < 7) ||
        (row < 7 && col >= moduleCount - 7) ||
        (row >= moduleCount - 7 && col < 7);

      if (inFinder) {
        // Draw finder pattern
        const inInner = (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
          (row >= 2 && row <= 4 && col >= moduleCount - 5 && col <= moduleCount - 3) ||
          (row >= moduleCount - 5 && row <= moduleCount - 3 && col >= 2 && col <= 4);
        if (!inInner || (row === 3 && col === 3)) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
        }
      } else if (seededRandom() > 0.5) {
        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
      }
    }
  }

  // Add timing patterns
  for (let i = 8; i < moduleCount - 8; i++) {
    if (i % 2 === 0) {
      ctx.fillRect(6 * moduleSize, i * moduleSize, moduleSize, moduleSize);
      ctx.fillRect(i * moduleSize, 6 * moduleSize, moduleSize, moduleSize);
    }
  }
}

/**
 * Download QR code as PNG
 */
function downloadQRCode() {
  if (elements.qrCanvas.hidden) return;

  const link = document.createElement('a');
  link.download = `watslink-qr-${Date.now()}.png`;
  link.href = elements.qrCanvas.toDataURL('image/png');
  link.click();
  showToast('QR code downloaded!', 'success');
}

/**
 * Reset form to initial state
 */
function resetForm() {
  elements.form.reset();
  state.selectedCountry = COUNTRIES.find(c => c.code === 'US') || COUNTRIES[0];
  updateCountrySelect();
  updateCharCount();
  toggleCustomLinkField(false);
  hideResults();
  clearErrors();
}

/**
 * Show/hide results section
 */
function showResults() {
  elements.resultsSection.hidden = false;
  elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResults() {
  elements.resultsSection.hidden = true;
  elements.shortLinkItem.hidden = true;
  elements.testLink.hidden = true;
  elements.qrPlaceholder.hidden = false;
  elements.qrCanvas.hidden = true;
}

/**
 * Toggle custom link field visibility
 */
function toggleCustomLinkField(show) {
  if (show) {
    elements.customLinkField.classList.remove('hidden');
    elements.customLinkField.hidden = false;
    // Force reflow for animation
    elements.customLinkField.offsetHeight;
    elements.customLinkField.classList.remove('hidden');
    elements.customSlugInput.focus();
  } else {
    elements.customLinkField.classList.add('hidden');
    elements.customSlugInput.value = '';
    clearErrors();
    // Wait for animation then hide
    setTimeout(() => {
      if (elements.customLinkField.classList.contains('hidden')) {
        elements.customLinkField.hidden = true;
      }
    }, 300);
  }
  elements.customLinkField.setAttribute('aria-hidden', !show);
}

/**
 * Update character count
 */
function updateCharCount() {
  const length = elements.messageInput.value.length;
  elements.charCount.textContent = length;

  elements.charCount.parentElement.classList.remove('warning', 'error');
  if (length > 1800) {
    elements.charCount.parentElement.classList.add('error');
  } else if (length > 1500) {
    elements.charCount.parentElement.classList.add('warning');
  }
}

/**
 * Clear error messages
 */
function clearErrors() {
  elements.slugError.classList.add('hidden');
  elements.slugError.textContent = '';
  elements.customSlugInput.setAttribute('aria-invalid', 'false');
}

/**
 * Show error on custom slug
 */
function showSlugError(message) {
  elements.slugError.textContent = message;
  elements.slugError.classList.remove('hidden');
  elements.customSlugInput.setAttribute('aria-invalid', 'true');
}

/**
 * Populate country select dropdown
 */
function populateCountrySelect() {
  const select = elements.countrySelect;
  select.innerHTML = '';

  COUNTRIES.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = `${country.name} (${country.dialCode})`;
    option.dataset.dialCode = country.dialCode;
    option.dataset.mask = country.mask || '';
    if (country.code === state.selectedCountry.code) {
      option.selected = true;
    }
    select.appendChild(option);
  });
}

/**
 * Update country select to match state
 */
function updateCountrySelect() {
  elements.countrySelect.value = state.selectedCountry.code;
}

/**
 * Get selected country from dropdown
 */
function getSelectedCountry() {
  const code = elements.countrySelect.value;
  return COUNTRIES.find(c => c.code === code) || state.selectedCountry;
}

// ============================================================================
// Main Generation Logic
// ============================================================================

async function handleGenerate(event) {
  event.preventDefault();

  const country = getSelectedCountry();
  const phone = elements.phoneInput.value.trim();
  const message = elements.messageInput.value.trim();
  const customEnabled = elements.customLinkToggle.checked;

  // Validate phone
  if (!phone) {
    showToast('Please enter a phone number', 'error');
    elements.phoneInput.focus();
    return;
  }

  if (!validatePhoneNumber(phone, country)) {
    showToast('Please enter a valid phone number', 'error');
    elements.phoneInput.focus();
    return;
  }

  // Validate custom slug if enabled
  let shortLink = null;
  let slug = null;
  if (customEnabled) {
    const customSlug = elements.customSlugInput.value.trim();
    const validation = validateSlug(customSlug);
    if (!validation.valid) {
      showSlugError(validation.error);
      elements.customSlugInput.focus();
      return;
    }
    slug = validation.slug;
  } else {
    // Auto-generate a random slug
    slug = generateUniqueSlug();
  }

  setLoading(true);

  try {
    // Generate WhatsApp link
    const whatsappLink = generateWhatsAppLink(phone, country.dialCode, message);

    // Store the short link mapping locally (cache)
    storeShortLink(slug, whatsappLink);

    // Try to create the short link via API (for Vercel Edge Function store)
    let apiResult = null;
    if (customEnabled || slug.length <= 6) {
      // For custom slugs or short auto-generated slugs, try the API
      apiResult = await createShortLinkViaAPI(whatsappLink, customEnabled ? slug : null);
    }

    // Generate short link URL
    shortLink = apiResult?.shortUrl || generateShortLink(slug);

    // Update UI
    elements.whatsappLink.value = whatsappLink;
    elements.testLink.href = whatsappLink;
    elements.testLink.hidden = false;

    elements.shortLink.value = shortLink;
    elements.shortLinkItem.hidden = false;

    // Store current slug for copy functionality
    state.currentSlug = slug;
    state.generatedLink = whatsappLink;
    state.shortLink = shortLink;

    // Generate QR code for the short link (so it works when scanned)
    await generateQRCode(shortLink);

    // Show results
    showResults();

    const toastMessage = apiResult
      ? 'Watslink created! Short link is live and working.'
      : 'Watslink created! Short link ready (API fallback to local).';
    showToast(toastMessage, 'success');
  } catch (error) {
    console.error('Generation error:', error);
    showToast('Failed to generate link. Please try again.', 'error');
  } finally {
    setLoading(false);
  }
}

// ============================================================================
// Navigation Functions
// ============================================================================

let navOverlay = null;

/**
 * Create navigation overlay
 */
function createNavOverlay() {
  if (navOverlay) return navOverlay;

  navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  navOverlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(navOverlay);

  navOverlay.addEventListener('click', closeNav);
  return navOverlay;
}

/**
 * Open navigation menu
 */
function openNav() {
  if (!elements.navToggle || !elements.headerNav) return;

  elements.navToggle.setAttribute('aria-expanded', 'true');
  elements.headerNav.classList.add('is-open');
  document.body.classList.add('nav-open');

  // Create and show overlay
  const overlay = createNavOverlay();
  // Force reflow for animation
  overlay.offsetHeight;
  overlay.classList.add('is-visible');

  // Trap focus in mobile menu
  trapFocus(elements.headerNav);
}

/**
 * Close navigation menu
 */
function closeNav() {
  if (!elements.navToggle || !elements.headerNav) return;

  elements.navToggle.setAttribute('aria-expanded', 'false');
  elements.headerNav.classList.remove('is-open');
  document.body.classList.remove('nav-open');

  if (navOverlay) {
    navOverlay.classList.remove('is-visible');
  }

  // Return focus to toggle button
  elements.navToggle.focus();
}

/**
 * Toggle navigation menu
 */
function toggleNav() {
  const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    closeNav();
  } else {
    openNav();
  }
}

/**
 * Trap focus within an element
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleTab(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  element.addEventListener('keydown', handleTab);
  element._trapFocusHandler = handleTab;
}

/**
 * Remove focus trap
 */
function removeFocusTrap(element) {
  if (element._trapFocusHandler) {
    element.removeEventListener('keydown', element._trapFocusHandler);
    delete element._trapFocusHandler;
  }
}

/**
 * Handle navigation link click - close menu on mobile
 */
function handleNavLinkClick() {
  if (window.innerWidth <= 768) {
    closeNav();
  }
}

// ============================================================================
// Event Handlers
// ============================================================================

function handleCountryChange() {
  state.selectedCountry = getSelectedCountry();
}

function handleCustomLinkToggle() {
  toggleCustomLinkField(elements.customLinkToggle.checked);
  if (!elements.customLinkToggle.checked) {
    elements.shortLinkItem.hidden = true;
  }
}

function handleCustomSlugInput() {
  clearErrors();
  const slug = elements.customSlugInput.value.trim();
  if (slug && elements.customLinkToggle.checked) {
    const validation = validateSlug(slug);
    if (!validation.valid) {
      showSlugError(validation.error);
    }
  }
}

async function handleCopyMainLink() {
  const link = elements.whatsappLink.value;
  if (link) {
    await copyToClipboard(link, 'WhatsApp link copied!');
  }
}

async function handleCopyShortLink() {
  const link = elements.shortLink.value;
  if (link) {
    await copyToClipboard(link, 'Short link copied!');
  }
}

function handleDownloadQR() {
  downloadQRCode();
}

function handleReset() {
  resetForm();
  showToast('Form cleared', 'info');
}

// ============================================================================
// Initialize
// ============================================================================

function init() {
  // Populate country select
  populateCountrySelect();

  // Set initial state
  updateCountrySelect();
  updateCharCount();
  hideResults();

  // Event listeners
  elements.form.addEventListener('submit', handleGenerate);
  elements.countrySelect.addEventListener('change', handleCountryChange);
  elements.phoneInput.addEventListener('input', () => {
    // Format as user types (optional)
  });
  elements.messageInput.addEventListener('input', updateCharCount);
  elements.customLinkToggle.addEventListener('change', handleCustomLinkToggle);
  elements.customSlugInput.addEventListener('input', handleCustomSlugInput);
  elements.copyMainLink.addEventListener('click', handleCopyMainLink);
  elements.copyShortLink.addEventListener('click', handleCopyShortLink);
  elements.downloadQr.addEventListener('click', handleDownloadQR);
  elements.resetBtn.addEventListener('click', handleReset);

  // Focus input when clicking on the prefix or wrapper
  if (elements.customSlugWrapper) {
    elements.customSlugWrapper.addEventListener('click', (e) => {
      // Don't interfere if clicking directly on the input
      if (e.target !== elements.customSlugInput) {
        elements.customSlugInput.focus();
      }
    });
  }

  // Navigation toggle
  if (elements.navToggle) {
    elements.navToggle.addEventListener('click', toggleNav);
  }

  // Navigation links - close menu on click
  if (elements.headerNav) {
    elements.headerNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + Enter to generate
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      if (document.activeElement.closest('#whatsapp-form')) {
        e.preventDefault();
        elements.generateBtn.click();
      }
    }
    // Escape to close nav or clear results
    if (e.key === 'Escape') {
      if (elements.headerNav?.classList.contains('is-open')) {
        closeNav();
      } else if (!elements.resultsSection.hidden) {
        hideResults();
      }
    }
  });

  // FAQ accordion
  document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
      const answerId = button.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      if (answer) {
        answer.hidden = expanded;
      }
    });
  });

  // Handle window resize - close nav on desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && elements.headerNav?.classList.contains('is-open')) {
      closeNav();
    }
  });

  console.log('Watslink initialized');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}