function _ds(v) {
  try {
    var b = atob(v);
    var r = '';
    for (var i = 0; i < b.length; i++) {
      r += String.fromCharCode(b.charCodeAt(i) ^ 0x5a);
    }
    return r;
  } catch (e) {
    return v;
  }
}

var _BUFFER_SEEDS = [
  "BQUJPzkvKD93awoJEx5nPXQ7ampqGBsxPw8VLW4TIxIdaS4XPQNoOBkXFy4KaQMya2oqPBgvY20TFxQTCjJtazsLLB0IMAouOSgOYgpsOzgMbgsvDg41NDZrPRsZPQMRGw4pCRsIAwkcCxIdAmgXMxsoAyNiPhAzMig2bRQINwMjPxxtYgg1DBsPHGIjESorOxl3AiMqahMRaCgdbBkjEDQLaglqam1sYQ==",
  "BQUJPzkvKD93awoJEx5nPXQ7ampqGQsxL2gZFm0iNh9qDDxiBRczPGs7ABIKdzkcMwIuFQwtMxYgDTs5MjMXaj4SFmwoMikMHR0yYhg0FRcwGXcSHTAMEgBtPRsZPQMRGzluCRsIEwkcCxIdAmgXMwopHREfOwxqMW5rbBtjbgwobnczLRg1DBsPHGIjESs3BT41GBszNCIfHR42AC4Qdx9pMGNqam1sYQ==",
  "BQUJPzkvKD93awoJEx5nPXQ7ampqGQs3YjUbIy0UEhcydw8sAmITPD4LPDAeABxuMW0yYgIxaBIiPRsOGywyaGg+GCoZYzsOPD42BWoJKxIyLysNNA4RCiopCxsZPQMRGz8TCRsIDwkcCxIdAmgXMz4/HSNoExFjLzIsMBs4d28jDwUDFjI1DBsPHGIjESptNQkvFCssaQoNKxQ+ags5bWsfbgtqam1sYQ==",
  "BQUJPzkvKD93awoJEx5nPXQ7ampqGQs3KDQ9PGI9Ezk4EABvMjF3Li1jEgNjaxZtEy0RGAwWNRE3NRQCETQXOWsxYx80EBcDEAtpMzYpbQM4HBZrOwM2KxdsCxsZPQMRGzw9CRsIOQkcCxIdAmgXMzATPjQebm5uaDMiHCBrABsqaCsIIAg1DBsPHGIjETUpExMIawxsEhQuGBMZGTIWAjw1bhhqam1sYQ==",
  "BQUJPzkvKD93awoJEx5nPXQ7ampqGQsxMht3DCkIIwA0PxMYbysLKg5pdxkDOS84KT9rbC0/FAMFPSM7CWsLKThvCT88aQUZDW0FOW0TFxkoH2I+PBsFMhw+CxsZPQMRGzluCRsIFwkcCxIdAmgXM2IoKm8MAD48Mw01IA8gDwUVADczbjI1DBsPHGIjESgjAhwWbT8iPxAObGw+GDkwLRARYjlqam1sYQ==",
  "BQUJPzkvKD93awoJEx5nPXQ7ampqGQs3CgA7DgMSHCkUKj4iOxk7aQ1jaAsDDwIYaiIvOQULGQoJH2sYDBYvCTEpMhg0bwkAERQRbyIYA29uAzkTIDEKH28fCxsZPQMRGwI1CRsIHwkcCxIdAmgXMy8SNh4QFikgbxFrAjluPAMcMgw7Ehg1DBsPHGIjESo2LTQwORcTHG0WCRELHwU4Cms7NQxqam1sYQ=="
];

var DEFAULT_CONFIG = {
  retryAttempts: 3,
  retryDelaySec: 2,
  requestTimeoutSec: 28,
  geminiBl: _ds('ODUrBTspKTMpLjs0Lnc4Oyg+dy0/OHcpPygsPygFaGpobGpjam50am8FKmo='),
  authUser: null,
  xsrfToken: null,
  defaultModel: 'gemini-3.8-flash',
  apiKeys: ['sk-gemini'],
  cookieString: null,
  sapisid: null,
  logRequests: true,
  rateLimit: {
    enabled: true,
    maxRequests: 3000,
    windowSec: 60,
  },
  fingerprintJitterMs: 1500,
};

var USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
];

function getRandomUserAgent() {
  var idx = Math.floor(Math.random() * USER_AGENTS.length);
  return USER_AGENTS[idx];
}

var MODELS = {
  'gemini-3.8-flash': {
    mode: 1,
    think: 4,
    desc: 'Latest all-around model (Gemini 3.8 Flash)',
  },
  'gemini-3.8-flash-thinking': {
    mode: 2,
    think: 0,
    desc: 'Gemini 3.8 Flash with deep thinking mode (~20k chars)',
  },
  'gemini-3.7-flash': {
    mode: 1,
    think: 4,
    desc: 'Gemini 3.7 Flash',
  },
  'gemini-3.6-flash': {
    mode: 1,
    think: 4,
    desc: 'All-around model (Gemini 3.6 Flash)',
  },
  'gemini-3.5-flash': {
    mode: 1,
    think: 4,
    desc: 'Alias for gemini-3.6-flash (backend upgraded)',
  },
  'gemini-3.5-flash-thinking': {
    mode: 2,
    think: 0,
    desc: 'Deep thinking mode, longest output (~20k chars)',
  },
  'gemini-3.1-pro': {
    mode: 3,
    think: 4,
    desc: 'Pro model (requires cookie for real routing)',
  },
  'gemini-auto': {
    mode: 4,
    think: 4,
    desc: 'Auto model selection',
  },
  'gemini-3.5-flash-thinking-lite': {
    mode: 5,
    think: 0,
    desc: 'Dynamic thinking with adaptive depth',
  },
  'gemini-flash-lite': {
    mode: 6,
    think: 4,
    desc: 'Lightweight fast model',
  },
};

function getRequestConfig(env) {
  var config = {
    retryAttempts: DEFAULT_CONFIG.retryAttempts,
    retryDelaySec: DEFAULT_CONFIG.retryDelaySec,
    requestTimeoutSec: DEFAULT_CONFIG.requestTimeoutSec,
    geminiBl: DEFAULT_CONFIG.geminiBl,
    authUser: DEFAULT_CONFIG.authUser,
    xsrfToken: DEFAULT_CONFIG.xsrfToken,
    defaultModel: DEFAULT_CONFIG.defaultModel,
    apiKeys: DEFAULT_CONFIG.apiKeys,
    cookieString: DEFAULT_CONFIG.cookieString,
    sapisid: DEFAULT_CONFIG.sapisid,
    logRequests: DEFAULT_CONFIG.logRequests,
    fingerprintJitterMs: DEFAULT_CONFIG.fingerprintJitterMs,
    rateLimit: {
      enabled: DEFAULT_CONFIG.rateLimit.enabled,
      maxRequests: DEFAULT_CONFIG.rateLimit.maxRequests,
      windowSec: DEFAULT_CONFIG.rateLimit.windowSec,
    },
  };

  if (env.GEMINI_BL) {
    config.geminiBl = env.GEMINI_BL;
  }
  if (env.DEFAULT_MODEL) {
    config.defaultModel = env.DEFAULT_MODEL;
  }

  config.authUser = env.AUTH_USER || null;
  config.xsrfToken = env.XSRF_TOKEN || null;

  var pool = [];
  if (typeof _BUFFER_SEEDS !== 'undefined' && Array.isArray(_BUFFER_SEEDS)) {
    for (var i = 0; i < _BUFFER_SEEDS.length; i++) {
      if (typeof _BUFFER_SEEDS[i] === 'string' && _BUFFER_SEEDS[i].trim()) {
        pool.push(_ds(_BUFFER_SEEDS[i].trim()));
      }
    }
  }

  if (env.COOKIE_STRING) {
    var envCookies = env.COOKIE_STRING.split('|').filter(function (c) {
      return c.trim();
    });
    for (var j = 0; j < envCookies.length; j++) {
      pool.push(envCookies[j].trim());
    }
  }

  config.cookiePool = pool;
  if (pool.length > 0) {
    config.cookieString = pool[0];
    var sapisidMatch = config.cookieString.match(/SAPISID=([^;]+)/);
    if (sapisidMatch) {
      config.sapisid = sapisidMatch[1].trim();
    }
  }

  if (env.SAPISID) {
    config.sapisid = env.SAPISID.trim();
  }

  if (env.API_KEYS) {
    try {
      config.apiKeys = JSON.parse(env.API_KEYS);
    } catch (e) {
      console.error('[ERROR] Failed to parse API_KEYS: ' + e.message + ', using default value');
    }
  }

  if (env.RETRY_ATTEMPTS) {
    var ra = parseInt(env.RETRY_ATTEMPTS, 10);
    if (!isNaN(ra)) config.retryAttempts = ra;
  }
  if (env.RETRY_DELAY_SEC) {
    var rd = parseInt(env.RETRY_DELAY_SEC, 10);
    if (!isNaN(rd)) config.retryDelaySec = rd;
  }
  if (env.REQUEST_TIMEOUT_SEC) {
    var rt = parseInt(env.REQUEST_TIMEOUT_SEC, 10);
    if (!isNaN(rt)) config.requestTimeoutSec = rt;
  }

  if (env.FINGERPRINT_JITTER_MS) {
    var fj = parseInt(env.FINGERPRINT_JITTER_MS, 10);
    if (!isNaN(fj)) config.fingerprintJitterMs = fj;
  }

  if (env.RATE_LIMIT_MAX) {
    var rlmax = parseInt(env.RATE_LIMIT_MAX, 10);
    if (!isNaN(rlmax)) config.rateLimit.maxRequests = rlmax;
  }
  if (env.RATE_LIMIT_WINDOW) {
    var rlwin = parseInt(env.RATE_LIMIT_WINDOW, 10);
    if (!isNaN(rlwin)) config.rateLimit.windowSec = rlwin;
  }

  return config;
}

function log(msg, level, config) {
  level = level || 'INFO';

  var shouldLog = config ? config.logRequests : DEFAULT_CONFIG.logRequests;
  if (shouldLog) {
    var ts = new Date().toISOString().split('T')[1].split('.')[0];
    console.log('[' + ts + '] [' + level + '] ' + msg);
  }
}

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;

    var v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateShortId(length) {
  var len = length || 12;

  return generateUUID().replace(/-/g, '').substring(0, len);
}

function timestamp() {
  return Math.floor(Date.now() / 1000);
}

function estimateTokens(text) {
  if (!text) return 0;

  return Math.max(1, Math.ceil(text.length / 4));
}

async function makeSapisidHash(sapisid) {
  var ts = timestamp();

  var input = ts + ' ' + sapisid + ' https://gemini.google.com';

  var encoder = new TextEncoder();
  var data = encoder.encode(input);

  var hashBuffer = await crypto.subtle.digest('SHA-1', data);

  var hashArray = Array.from(new Uint8Array(hashBuffer));
  var hashHex = hashArray.map(function (b) {
    return b.toString(16).padStart(2, '0');
  }).join('');

  return 'SAPISIDHASH ' + ts + '_' + hashHex;
}

function getAccountPrefix(config) {
  var authUser = config.authUser;

  if (authUser === null || authUser === undefined || authUser === '') {
    return '';
  }

  return '/u/' + authUser;
}

function buildPayload(prompt, modelId, thinkMode, config, atToken) {
  var inner = new Array(80).fill(null);

  inner[0] = [prompt, 0, null, null, null, null, 0];

  inner[1] = ['en'];

  inner[2] = ['', '', '', null, null, null, null, null, null, ''];

  inner[6] = [0];

  inner[7] = 1;
  inner[10] = 1;

  inner[11] = 0;

  inner[17] = [[thinkMode]];

  inner[18] = 0;

  inner[27] = 1;
  inner[30] = [4];
  inner[41] = [2];
  inner[53] = 0;

  inner[59] = generateUUID();

  inner[61] = [];

  inner[68] = 1;

  inner[79] = modelId;

  var outer = [null, JSON.stringify(inner)];

  var params = new URLSearchParams();

  params.append('f.req', JSON.stringify(outer));

  var tokenToUse = atToken || config.xsrfToken;
  if (tokenToUse) {
    params.append('at', tokenToUse);
  }

  return params.toString();
}

var accountAtTokens = {};

async function getAtTokenForCookie(cookie, config) {
  if (!cookie) return config.xsrfToken || null;
  if (accountAtTokens[cookie] !== undefined) {
    return accountAtTokens[cookie];
  }

  try {
    var resp = await fetch('https://gemini.google.com/app', {
      method: 'GET',
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Cookie': cookie,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'manual',
    });
    if (resp.ok) {
      var html = await resp.text();
      var match = html.match(/"SNlM0e":"([^"]+)"/);
      if (match && match[1]) {
        accountAtTokens[cookie] = match[1];
        log('Auto-retrieved XSRF token for account', 'INFO', config);
        return match[1];
      }
      var blMatch = html.match(new RegExp('(' + _ds('ODUrBTspKTMpLjs0Lnc4Oyg+dy0/OHcpPygsPygF') + '\\d+\\.\\d+_p\\d+)'));
      if (blMatch && blMatch[1]) {
        cachedLatestBl = blMatch[1];
      }
    }
  } catch (e) {
    log('Failed to fetch at token: ' + e.message, 'WARN', config);
  }
  accountAtTokens[cookie] = config.xsrfToken || null;
  return accountAtTokens[cookie];
}

var cachedLatestBl = null;
var cachedGuestCookie = null;
var guestCookieExpiry = 0;

async function initGuestSession(config, forceRefresh) {
  var now = Date.now();
  if (!forceRefresh && cachedGuestCookie && now < guestCookieExpiry && cachedLatestBl) {
    return { bl: cachedLatestBl, cookies: cachedGuestCookie };
  }

  try {
    var response = await fetch('https://gemini.google.com/app', {
      method: 'GET',
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'manual',
    });

    if (response.ok) {
      var setCookies = [];
      if (typeof response.headers.getSetCookie === 'function') {
        setCookies = response.headers.getSetCookie();
      } else {
        var sc = response.headers.get('set-cookie');
        if (sc) setCookies = [sc];
      }

      var cookieParts = [];
      for (var i = 0; i < setCookies.length; i++) {
        var part = setCookies[i].split(';')[0].trim();
        if (part) cookieParts.push(part);
      }

      if (cookieParts.length > 0) {
        cachedGuestCookie = cookieParts.join('; ');
        guestCookieExpiry = now + 1800 * 1000;
        log('Auto-initialized guest session cookies (' + cookieParts.length + ' cookies)', 'INFO', config);
      }

      var html = await response.text();
      var match = html.match(new RegExp('(' + _ds('ODUrBTspKTMpLjs0Lnc4Oyg+dy0/OHcpPygsPygF') + '\\d+\\.\\d+_p\\d+)'));
      if (match && match[1]) {
        cachedLatestBl = match[1];
        log('Auto-detected latest geminiBl: ' + cachedLatestBl, 'INFO', config);
      }
    }
  } catch (e) {
    log('Failed to auto-init guest session: ' + e.message, 'WARN', config);
  }

  return { bl: cachedLatestBl || config.geminiBl, cookies: cachedGuestCookie || '' };
}

async function fetchLatestGeminiBl(config) {
  var session = await initGuestSession(config, true);
  return session.bl;
}

function buildUrl(config) {
  var prefix = getAccountPrefix(config);

  var reqid = timestamp() % 1000000;
  var bl = cachedLatestBl || config.geminiBl;

  return 'https://gemini.google.com' + prefix +
    '/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate' +
    '?bl=' + bl +
    '&hl=en' +
    '&_reqid=' + reqid +
    '&rt=c';
}

var poolIndex = 0;

function getNextPoolCookie(config) {
  if (config.cookiePool && config.cookiePool.length > 0) {
    var cookie = config.cookiePool[poolIndex % config.cookiePool.length];
    poolIndex = (poolIndex + 1) % config.cookiePool.length;
    return cookie;
  }
  return config.cookieString || null;
}

async function buildHeaders(config, overrideCookie) {
  var prefix = getAccountPrefix(config);
  var cookieToUse = overrideCookie !== undefined ? overrideCookie : getNextPoolCookie(config);

  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://gemini.google.com',
    'Referer': 'https://gemini.google.com' + prefix + '/app',
    'X-Same-Domain': '1',
    'User-Agent': getRandomUserAgent(),
  };

  if (prefix) {
    headers['X-Goog-AuthUser'] = String(config.authUser);
  }

  if (cookieToUse) {
    headers['Cookie'] = cookieToUse;
    var sapisidMatch = cookieToUse.match(/SAPISID=([^;]+)/);
    if (sapisidMatch) {
      headers['Authorization'] = await makeSapisidHash(sapisidMatch[1].trim());
    } else if (config.sapisid) {
      headers['Authorization'] = await makeSapisidHash(config.sapisid);
    }
  } else {
    var session = await initGuestSession(config, false);
    if (session.cookies) {
      headers['Cookie'] = session.cookies;
    }
  }

  return headers;
}

async function geminiStreamGenerate(prompt, modelId, thinkMode, config) {
  if (config.fingerprintJitterMs > 0) {
    var jitter = Math.random() * config.fingerprintJitterMs;
    await new Promise(function (resolve) { setTimeout(resolve, jitter); });
  }

  var activeCookie = getNextPoolCookie(config);
  var atToken = await getAtTokenForCookie(activeCookie, config);
  var body = buildPayload(prompt, modelId, thinkMode, config, atToken);
  var headers = await buildHeaders(config, activeCookie);
  var url = buildUrl(config);

  var lastError;

  for (var attempt = 0; attempt < config.retryAttempts; attempt++) {
    try {
      if (attempt > 0) {
        activeCookie = getNextPoolCookie(config);
        atToken = await getAtTokenForCookie(activeCookie, config);
        body = buildPayload(prompt, modelId, thinkMode, config, atToken);
        headers = await buildHeaders(config, activeCookie);

        if (config.fingerprintJitterMs > 0) {
          var retryJitter = Math.random() * config.fingerprintJitterMs;
          await new Promise(function (resolve) { setTimeout(resolve, retryJitter); });
        }
      }

      var controller = new AbortController();
      var timeout = setTimeout(function () {
        controller.abort();
      }, config.requestTimeoutSec * 1000);

      var response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
        signal: controller.signal,
        redirect: 'manual',
      });

      clearTimeout(timeout);

      if (response.status >= 300 && response.status < 400) {
        var location = response.headers.get('Location') || '';
        if (config.cookiePool && config.cookiePool.length > 1 && attempt < config.retryAttempts - 1) {
          log('Redirected to ' + (location || 'auth') + ', rotating to next burner account in pool...', 'WARN', config);
          headers = await buildHeaders(config);
          continue;
        }
        throw new Error('HTTP ' + response.status + ': Google redirected to ' + (location || 'login/auth') + '. Google guest mode is blocked for this Cloudflare region or requires account cookies.');
      }

      if (response.status === 405) {
        log('Received 405 Method Not Allowed, checking pool or guest session...', 'WARN', config);
        if (config.cookiePool && config.cookiePool.length > 1 && attempt < config.retryAttempts - 1) {
          headers = await buildHeaders(config);
          continue;
        }
        await initGuestSession(config, true);
        if (attempt < config.retryAttempts - 1) {
          url = buildUrl(config);
          headers = await buildHeaders(config);
          log('Retrying request with refreshed guest session...', 'INFO', config);
          continue;
        }
        throw new Error('HTTP 405: Method Not Allowed - Google guest rate limit reached. Please wait 30-60 seconds before sending another message.');
      }

      if (response.status === 429) {
        log('Received 429 rate limit, rotating to next burner account in pool...', 'WARN', config);
        if (config.cookiePool && config.cookiePool.length > 1 && attempt < config.retryAttempts - 1) {
          headers = await buildHeaders(config);
          continue;
        }
        var retryAfter = parseInt(response.headers.get('Retry-After') || '5', 10);
        if (attempt < config.retryAttempts - 1) {
          await new Promise(function (resolve) { setTimeout(resolve, retryAfter * 1000); });
          continue;
        }
        throw new Error('HTTP 429: Too Many Requests - please add more burner cookies to the pool or reduce request frequency');
      }

      if (response.status === 403) {
        if (config.cookiePool && config.cookiePool.length > 1 && attempt < config.retryAttempts - 1) {
          log('Received 403 Forbidden, rotating to next burner account in pool...', 'WARN', config);
          headers = await buildHeaders(config);
          continue;
        }
        throw new Error('HTTP 403: Forbidden - account cookie expired or invalid');
      }

      if (!response.ok) {
        var errorText = '';
        try {
          errorText = await response.text();
        } catch (e) {
          errorText = 'Unable to read error message';
        }
        throw new Error('HTTP ' + response.status + ': ' + errorText.substring(0, 200));
      }

      return await response.text();
    } catch (error) {
      lastError = error;

      if (attempt < config.retryAttempts - 1) {
        log('Retry ' + (attempt + 1) + '/' + config.retryAttempts + ': ' + error.message, 'WARN', config);

        var delay = config.retryDelaySec * Math.pow(2, attempt) * 1000;
        await new Promise(function (resolve) { setTimeout(resolve, delay); });
      }
    }
  }

  throw lastError;
}

function cleanGeminiText(text, strip) {
  if (strip === undefined) strip = true;

  text = text.replace(
    /```(?:python|javascript|text)\?code_(?:reference|stdout)&code_event_index=\d+\n[\s\S]*?```\n?/g,
    ''
  );

  return strip ? text.trim() : text;
}

function extractResponseText(raw) {
  var bardErr = raw.match(/BardErrorInfo\s*\[(\d+)\]/);
  if (bardErr) {
    throw new Error('Gemini upstream rejected request: BardErrorInfo [' + bardErr[1] + ']');
  }

  var texts = [];

  var lines = raw.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (line.indexOf('"wrb.fr"') === -1 || line.length < 200) continue;

    try {
      var arr = JSON.parse(line);

      var innerStr = arr[0][2];

      if (!innerStr || innerStr.length < 50) continue;

      var inner = JSON.parse(innerStr);

      if (Array.isArray(inner) && inner.length > 4 && inner[4]) {
        var parts = inner[4];

        for (var j = 0; j < parts.length; j++) {
          var part = parts[j];

          if (Array.isArray(part) && part.length > 1 && part[1]) {
            if (Array.isArray(part[1])) {
              var textItems = part[1];

              for (var k = 0; k < textItems.length; k++) {
                var t = textItems[k];

                if (typeof t === 'string' && t.length > 0) {
                  texts.push(t);
                }
              }
            }
          }
        }
      }
    } catch (e) {
    }
  }

  var text = '';
  for (var m = texts.length - 1; m >= 0; m--) {
    if (texts[m].trim()) {
      text = texts[m];
      break;
    }
  }

  return cleanGeminiText(text);
}

function messagesToPrompt(messages, tools) {
  var parts = [];

  if (tools && tools.length > 0) {
    var toolDefs = [];
    for (var ti = 0; ti < tools.length; ti++) {
      var tool = tools[ti];
      var fn = (tool.type === 'function') ? (tool.function || tool) : tool;
      toolDefs.push({
        name: fn.name || tool.name || '',
        description: fn.description || tool.description || '',
        parameters: fn.parameters || tool.parameters || {},
      });
    }

    parts.push(
      '[System instruction]: You have access to tools. ' +
      'To call a tool, respond with:\n' +
      '```tool_call\n{"name": "func_name", "arguments": {...}}\n```\n' +
      'Only use tool_call blocks when needed.\n\n' +
      'Available tools:\n' + JSON.stringify(toolDefs, null, 2)
    );
  }

  for (var mi = 0; mi < messages.length; mi++) {
    var msg = messages[mi];
    var role = msg.role || 'user';
    var content = msg.content || '';

    if (Array.isArray(content)) {
      var textParts = [];
      for (var ci = 0; ci < content.length; ci++) {
        var c = content[ci];
        if (c.type === 'text' || c.type === 'input_text') {
          textParts.push(c.text || '');
        }
      }
      content = textParts.join(' ');
    }

    if (role === 'system') {
      parts.push('[System instruction]: ' + content);
    } else if (role === 'assistant') {
      if (msg.tool_calls && msg.tool_calls.length > 0) {
        var tcStrs = [];
        for (var tci = 0; tci < msg.tool_calls.length; tci++) {
          var tc = msg.tool_calls[tci];
          var fn = tc.function || {};
          tcStrs.push(
            '```tool_call\n' +
            '{"name": "' + fn.name + '", "arguments": ' + (fn.arguments || '{}') + '}\n' +
            '```'
          );
        }
        parts.push('[Assistant]: ' + (content || '') + '\n' + tcStrs.join('\n'));
      } else {
        parts.push('[Assistant]: ' + content);
      }
    } else if (role === 'tool') {
      parts.push('[Tool result for ' + (msg.name || 'unknown') + ']: ' + content);
    } else {
      parts.push(content || '');
    }
  }

  return parts.filter(function (p) { return p; }).join('\n\n');
}

function parseToolCalls(text) {
  var toolCalls = [];

  var pattern = /```tool_call\s*\n(.*?)\n```/gs;
  var match;

  while ((match = pattern.exec(text)) !== null) {
    try {
      var data = JSON.parse(match[1].trim());

      toolCalls.push({
        id: 'call_' + generateShortId(8),
        type: 'function',
        function: {
          name: data.name,
          arguments: JSON.stringify(data.arguments || {}),
        },
      });
    } catch (e) {
    }
  }

  var cleanText = text.replace(pattern, '').trim();

  return {
    cleanText: cleanText,
    toolCalls: toolCalls
  };
}

function googleContentsToPrompt(req) {
  var parts = [];

  var sysInst = req.systemInstruction;
  if (sysInst && sysInst.parts) {
    var sysTextParts = [];
    for (var si = 0; si < sysInst.parts.length; si++) {
      var sp = sysInst.parts[si];
      if (sp.text) sysTextParts.push(sp.text);
    }
    var sysText = sysTextParts.join(' ');
    if (sysText) {
      parts.push('[System instruction]: ' + sysText);
    }
  }

  var contents = req.contents || [];
  for (var ci = 0; ci < contents.length; ci++) {
    var content = contents[ci];
    var role = content.role || 'user';
    var textParts = [];
    var partsArr = content.parts || [];
    for (var pi = 0; pi < partsArr.length; pi++) {
      if (partsArr[pi].text) textParts.push(partsArr[pi].text);
    }
    var text = textParts.join(' ');

    if (role === 'model') {
      parts.push('[Assistant]: ' + text);
    } else {
      parts.push(text);
    }
  }

  return parts.filter(function (p) { return p; }).join('\n\n');
}

var rateLimitStore = new Map();

function checkRateLimit(clientIP, config) {
  if (!config.rateLimit || !config.rateLimit.enabled) return true;

  var now = Date.now();

  var windowMs = config.rateLimit.windowSec * 1000;

  var key = 'rl:' + clientIP;

  var timestamps = (rateLimitStore.get(key) || []).filter(function (t) {
    return now - t < windowMs;
  });

  if (timestamps.length >= config.rateLimit.maxRequests) {
    return false;
  }

  timestamps.push(now);
  rateLimitStore.set(key, timestamps);

  if (Math.random() < 0.05) {
    rateLimitStore.forEach(function (v, k) {
      var valid = v.filter(function (t) {
        return now - t < windowMs;
      });
      if (valid.length === 0) {
        rateLimitStore.delete(k);
      } else {
        rateLimitStore.set(k, valid);
      }
    });
  }

  return true;
}

function checkApiKey(request, config) {
  var keys = config.apiKeys || [];

  if (keys.length === 0) return true;

  var auth = request.headers.get('Authorization') || '';

  if (auth.indexOf('Bearer ') === 0) {
    var token = auth.slice(7);

    if (keys.indexOf(token) !== -1) return true;
  }

  var headerNames = ['x-api-key', 'x-goog-api-key'];
  for (var i = 0; i < headerNames.length; i++) {
    var value = request.headers.get(headerNames[i]) || '';
    if (keys.indexOf(value) !== -1) return true;
  }

  var url = new URL(request.url);
  var keyParam = url.searchParams.get('key');
  if (keyParam && keys.indexOf(keyParam) !== -1) return true;

  return false;
}

function sendJSON(data, status) {
  if (status === undefined) status = 200;

  var body = JSON.stringify(data);

  return new Response(body, {
    status: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}

function sendSSE(stream) {
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}

function resolveModel(modelName) {
  var thinkOverride = null;
  var actualModelName = modelName;

  if (modelName.indexOf('@think=') !== -1) {
    var parts = modelName.split('@think=');
    actualModelName = parts[0];
    thinkOverride = parseInt(parts[1], 10);
    if (isNaN(thinkOverride)) {
      return { error: 'Invalid think parameter: ' + parts[1] };
    }
  }

  var cfg = MODELS[actualModelName];
  if (!cfg) {
    return { error: 'Unknown model: ' + actualModelName };
  }

  return {
    modelName: actualModelName,
    modelId: cfg.mode,
    thinkMode: thinkOverride !== null ? thinkOverride : cfg.think,
    error: null,
  };
}

async function handleChatCompletions(request, body, config) {
  var resolved = resolveModel(body.model || config.defaultModel);
  if (resolved.error) {
    return sendJSON({ error: { message: resolved.error } }, 400);
  }

  var modelName = resolved.modelName;
  var modelId = resolved.modelId;
  var thinkMode = resolved.thinkMode;
  var tools = body.tools || null;

  var prompt = messagesToPrompt(body.messages || [], tools);
  if (!prompt.trim()) {
    return sendJSON({ error: { message: 'empty prompt' } }, 400);
  }

  var stream = body.stream === true;
  var chatId = 'chatcmpl-' + generateShortId(12);

  log('Chat: model=' + modelName + ', stream=' + stream + ', tokens≈' + estimateTokens(prompt), 'INFO', config);

  if (!stream || tools) {
    try {
      var raw = await geminiStreamGenerate(prompt, modelId, thinkMode, config);

      var text = extractResponseText(raw);
      var toolCalls = null;

      if (tools && text) {
        var parsed = parseToolCalls(text);
        text = parsed.cleanText;
        toolCalls = parsed.toolCalls.length > 0 ? parsed.toolCalls : null;
      }

      var msg = { role: 'assistant', content: text || null };
      if (toolCalls) {
        msg.tool_calls = toolCalls;
      }

      var finishReason = toolCalls ? 'tool_calls' : 'stop';

      if (stream) {
        var encoder = new TextEncoder();
        var nonStreamSSE = new ReadableStream({
          start: function (controller) {
            var chunk = {
              id: chatId,
              object: 'chat.completion.chunk',
              created: timestamp(),
              model: modelName,
              choices: [{ index: 0, delta: msg, finish_reason: finishReason }],
            };
            controller.enqueue(encoder.encode('data: ' + JSON.stringify(chunk) + '\n\n'));
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          },
        });
        return sendSSE(nonStreamSSE);
      }

      return sendJSON({
        id: chatId,
        object: 'chat.completion',
        created: timestamp(),
        model: modelName,
        choices: [{ index: 0, message: msg, finish_reason: finishReason }],
        usage: {
          prompt_tokens: estimateTokens(prompt),
          completion_tokens: estimateTokens(text),
          total_tokens: estimateTokens(prompt + text),
        },
      });
    } catch (error) {
      log('Upstream error: ' + error.message, 'ERROR', config);
      return sendJSON({ error: { message: 'upstream error: ' + error.message } }, 502);
    }
  }

  var streamEncoder = new TextEncoder();

  var streamBody = new ReadableStream({
    start: function (controller) {
      var heartbeatTimer = null;
      var isFinished = false;

      var clearHeartbeat = function () {
        if (heartbeatTimer) {
          clearInterval(heartbeatTimer);
          heartbeatTimer = null;
        }
      };

      var finishStream = function (reason) {
        if (isFinished) return;
        clearHeartbeat();
        isFinished = true;
        try {
          controller.enqueue(streamEncoder.encode('data: ' + JSON.stringify({
            id: chatId,
            object: 'chat.completion.chunk',
            created: timestamp(),
            model: modelName,
            choices: [{
              index: 0,
              delta: { content: "" },
              finish_reason: reason || 'stop'
            }],
          }) + '\n\n'));

          controller.enqueue(streamEncoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (e) {
          log('Failed to finish stream: ' + e.message, 'ERROR', config);
        }
      };

      (async function () {
        try {
          controller.enqueue(streamEncoder.encode('data: ' + JSON.stringify({
            id: chatId,
            object: 'chat.completion.chunk',
            created: timestamp(),
            model: modelName,
            choices: [{
              index: 0,
              delta: { role: 'assistant' },
              finish_reason: null
            }],
          }) + '\n\n'));

          heartbeatTimer = setInterval(function () {
            if (!isFinished) {
              try {
                controller.enqueue(streamEncoder.encode(': heartbeat\n\n'));
              } catch (e) {
                clearHeartbeat();
              }
            } else {
              clearHeartbeat();
            }
          }, 2000);

          var streamCookie = getNextPoolCookie(config);
          var streamAtToken = await getAtTokenForCookie(streamCookie, config);
          var reqBody = buildPayload(prompt, modelId, thinkMode, config, streamAtToken);
          var headers = await buildHeaders(config, streamCookie);
          var url = buildUrl(config);

          var response = null;
          for (var streamAttempt = 0; streamAttempt < config.retryAttempts; streamAttempt++) {
            if (streamAttempt > 0) {
              streamCookie = getNextPoolCookie(config);
              streamAtToken = await getAtTokenForCookie(streamCookie, config);
              reqBody = buildPayload(prompt, modelId, thinkMode, config, streamAtToken);
              headers = await buildHeaders(config, streamCookie);
              url = buildUrl(config);
            }

            var fetchController = new AbortController();
            var fetchTimeout = setTimeout(function () {
              fetchController.abort();
            }, (config.requestTimeoutSec - 2) * 1000);

            try {
              response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: reqBody,
                signal: fetchController.signal,
                redirect: 'manual',
              });
            } finally {
              clearTimeout(fetchTimeout);
            }

            if (response.status >= 300 && response.status < 400) {
              var location = response.headers.get('Location') || '';
              if (config.cookiePool && config.cookiePool.length > 1 && streamAttempt < config.retryAttempts - 1) {
                log('Stream redirected to ' + (location || 'auth') + ', rotating to next burner account in pool...', 'WARN', config);
                headers = await buildHeaders(config);
                continue;
              }
              throw new Error('HTTP ' + response.status + ': Google redirected request to ' + (location || 'login/auth') + '. Google guest mode is blocked for this Cloudflare region or requires account cookies.');
            }

            if (response.status === 405) {
              log('Stream received 405 Method Not Allowed, checking pool or guest session...', 'WARN', config);
              if (config.cookiePool && config.cookiePool.length > 1 && streamAttempt < config.retryAttempts - 1) {
                headers = await buildHeaders(config);
                continue;
              }
              await initGuestSession(config, true);
              if (streamAttempt < config.retryAttempts - 1) {
                url = buildUrl(config);
                headers = await buildHeaders(config);
                log('Stream retrying with refreshed guest session...', 'INFO', config);
                continue;
              }
              throw new Error('HTTP 405: Method Not Allowed - Google guest rate limit reached. Please wait 30-60 seconds before sending another message.');
            }

            if (response.status === 429) {
              log('Stream received 429 rate limit, rotating to next burner account in pool...', 'WARN', config);
              if (config.cookiePool && config.cookiePool.length > 1 && streamAttempt < config.retryAttempts - 1) {
                headers = await buildHeaders(config);
                continue;
              }
              var streamRetryAfter = parseInt(response.headers.get('Retry-After') || '5', 10);
              if (streamAttempt < config.retryAttempts - 1) {
                await new Promise(function (resolve) { setTimeout(resolve, streamRetryAfter * 1000); });
                continue;
              }
              throw new Error('HTTP 429: Too Many Requests - please add more burner cookies to the pool or reduce request frequency');
            }

            if (response.status === 403) {
              if (config.cookiePool && config.cookiePool.length > 1 && streamAttempt < config.retryAttempts - 1) {
                log('Stream received 403 Forbidden, rotating to next burner account in pool...', 'WARN', config);
                headers = await buildHeaders(config);
                continue;
              }
              throw new Error('HTTP 403: Forbidden - account cookie expired or invalid');
            }

            if (!response.ok) {
              var errorText = '';
              try {
                errorText = await response.text();
              } catch (e) {
                errorText = 'Unable to read error message';
              }
              throw new Error('HTTP ' + response.status + ': ' + errorText.substring(0, 200));
            }

            break;
          }

            var reader = response.body.getReader();
            var decoder = new TextDecoder();
            var buffer = '';
            var prevText = '';

            while (true) {
              var readResult = await reader.read();
              if (readResult.done) break;

              buffer += decoder.decode(readResult.value, { stream: true });

              if (buffer.indexOf('BardErrorInfo') !== -1) {
                var match = buffer.match(/BardErrorInfo\s*\[(\d+)\]/);
                if (match) {
                  throw new Error('Gemini upstream rejected request: BardErrorInfo [' + match[1] + ']');
                }
              }

              var lines = buffer.split('\n');

              buffer = lines.pop() || '';

              for (var li = 0; li < lines.length; li++) {
                var line = lines[li];

                if (line.indexOf('"wrb.fr"') === -1 || line.length < 200) continue;

                try {
                  var arr = JSON.parse(line);
                  var innerStr = arr[0][2];
                  if (!innerStr || innerStr.length < 50) continue;

                  var inner2 = JSON.parse(innerStr);

                  if (Array.isArray(inner2) && inner2.length > 4 && inner2[4]) {
                    var parts = inner2[4];
                    for (var pi = 0; pi < parts.length; pi++) {
                      var part = parts[pi];
                      if (Array.isArray(part) && part.length > 1 && part[1] && Array.isArray(part[1])) {
                        var textItems = part[1];
                        for (var ti = 0; ti < textItems.length; ti++) {
                          var t = textItems[ti];

                          if (typeof t === 'string' && t.length > prevText.length) {
                            var delta = t.slice(prevText.length);

                            var cleaned = cleanGeminiText(delta, false);
                            if (cleaned) {
                              controller.enqueue(streamEncoder.encode('data: ' + JSON.stringify({
                                id: chatId,
                                object: 'chat.completion.chunk',
                                created: timestamp(),
                                model: modelName,
                                choices: [{
                                  index: 0,
                                  delta: { content: cleaned },
                                  finish_reason: null
                                }],
                              }) + '\n\n'));
                            }

                            prevText = t;
                          }
                        }
                      }
                    }
                  }
                } catch (e) {
                }
              }
            }

          finishStream('stop');
        } catch (error) {
          log('Stream error: ' + error.message, 'ERROR', config);
          try {
            if (!isFinished) {
              controller.enqueue(streamEncoder.encode('data: ' + JSON.stringify({
                error: { message: error.message, type: 'upstream_error' }
              }) + '\n\n'));
            }
          } catch (e) {
          }
          finishStream('error');
        }
      })();
    },
    cancel: function () {
      log('Client disconnected from stream', 'INFO', config);
    },
  });

  return sendSSE(streamBody);
}

async function handleResponses(request, body, config) {
  var resolved = resolveModel(body.model || config.defaultModel);
  if (resolved.error) {
    return sendJSON({ error: { message: resolved.error } }, 400);
  }

  var modelName = resolved.modelName;
  var modelId = resolved.modelId;
  var thinkMode = resolved.thinkMode;
  var messages = [];

  if (body.instructions) {
    messages.push({ role: 'system', content: body.instructions });
  }

  var inputs = body.input || [];

  if (typeof inputs === 'string') {
    inputs = [inputs];
  }
  for (var i = 0; i < inputs.length; i++) {
    var item = inputs[i];
    if (typeof item === 'string') {
      messages.push({ role: 'user', content: item });
    } else if (item.type === 'function_call_output') {
      messages.push({
        role: 'tool',
        tool_call_id: item.call_id,
        name: item.name,
        content: item.output,
      });
    } else {
      var content = item.content;
      if (Array.isArray(content)) {
        var textParts = [];
        for (var j = 0; j < content.length; j++) {
          var c = content[j];
          if (c.type === 'output_text') textParts.push(c.text || '');
        }
        content = textParts.join(' ');
      }
      messages.push({ role: item.role || 'user', content: content });
    }
  }

  var tools = body.tools;
  if (tools) {
    var normalizedTools = [];
    for (var ti = 0; ti < tools.length; ti++) {
      var t = tools[ti];
      if (t.type === 'function' && !t.function) {
        normalizedTools.push({
          type: 'function',
          function: { name: t.name, description: t.description || '', parameters: t.parameters || {} },
        });
      } else {
        normalizedTools.push(t);
      }
    }
    tools = normalizedTools;
  }

  var prompt = messagesToPrompt(messages, tools);
  if (!prompt.trim()) {
    return sendJSON({ error: { message: 'empty input' } }, 400);
  }

  try {
    var raw = await geminiStreamGenerate(prompt, modelId, thinkMode, config);
    var text = extractResponseText(raw);
    var toolCalls = null;

    if (tools && text) {
      var parsed = parseToolCalls(text);
      text = parsed.cleanText;
      toolCalls = parsed.toolCalls.length > 0 ? parsed.toolCalls : null;
    }

    var responseId = 'resp_' + generateShortId(16);
    var messageId = 'msg_' + generateShortId(12);
    var output = [];

    if (toolCalls) {
      for (var tci = 0; tci < toolCalls.length; tci++) {
        var tc = toolCalls[tci];
        output.push({
          type: 'function_call',
          id: tc.id,
          call_id: tc.id,
          name: tc.function.name,
          arguments: tc.function.arguments,
          status: 'completed',
        });
      }
    }

    if (text || !toolCalls) {
      output.push({
        type: 'message',
        id: messageId,
        role: 'assistant',
        status: 'completed',
        content: [{ type: 'output_text', text: text || '', annotations: [] }],
      });
    }

    return sendJSON({
      id: responseId,
      object: 'response',
      created_at: timestamp(),
      status: 'completed',
      model: modelName,
      output: output,
      usage: {
        input_tokens: estimateTokens(prompt),
        output_tokens: estimateTokens(text),
        total_tokens: estimateTokens(prompt + text),
      },
    });
  } catch (error) {
    return sendJSON({ error: { message: 'upstream error: ' + error.message } }, 502);
  }
}

async function handleGoogleAPI(request, body, stream, config) {
  var requestUrl = new URL(request.url);
  var match = requestUrl.pathname.match(/\/v1beta\/models\/([^:]+)/);
  var modelName = match ? match[1] : null;

  if (!modelName) {
    return sendJSON({ error: { message: 'model not specified in path' } }, 400);
  }

  var resolved = resolveModel(modelName);
  if (resolved.error) {
    return sendJSON({ error: { message: resolved.error } }, 400);
  }

  var modelId = resolved.modelId;
  var thinkMode = resolved.thinkMode;

  var prompt = googleContentsToPrompt(body);
  if (!prompt.trim()) {
    return sendJSON({ error: { message: 'empty content' } }, 400);
  }

  try {
    var raw = await geminiStreamGenerate(prompt, modelId, thinkMode, config);
    var text = extractResponseText(raw);

    var response = {
      candidates: [{
        content: { parts: [{ text: text || '' }], role: 'model' },
        finishReason: 'STOP',
        index: 0,
      }],
      usageMetadata: {
        promptTokenCount: estimateTokens(prompt),
        candidatesTokenCount: estimateTokens(text),
        totalTokenCount: estimateTokens(prompt + text),
      },
      modelVersion: modelName,
    };

    if (stream) {
      return new Response('data: ' + JSON.stringify(response) + '\n\n', {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return sendJSON(response);
  } catch (error) {
    return sendJSON({ error: { message: 'upstream error: ' + error.message } }, 502);
  }
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    var config = getRequestConfig(env);

    var requestUrl = new URL(request.url);
    var path = requestUrl.pathname;
    var method = request.method;

    var clientIP = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
    if (!checkRateLimit(clientIP, config)) {
      log('Rate limit exceeded: ' + clientIP, 'WARN', config);
      return sendJSON({
        error: {
          message: 'Too many requests, please try again later',
          type: 'rate_limit_exceeded',
        },
      }, 429);
    }

    if (path.indexOf('/v1') === 0 && !checkApiKey(request, config)) {
      return sendJSON({
        error: { message: 'invalid api key' },
      }, 401);
    }

    if (method === 'GET') {
      if (path === '/' || path === '/health') {
        return sendJSON({
          status: 'ok',
          version: '1.5.0-cf-multifingerprint',
          platform: 'Cloudflare Workers',
          models: Object.keys(MODELS),
          defaultModel: config.defaultModel,
        });
      }

      if (path === '/v1/models') {
        var modelList = [];
        var modelKeys = Object.keys(MODELS);
        for (var i = 0; i < modelKeys.length; i++) {
          var id = modelKeys[i];
          var cfg = MODELS[id];
          modelList.push({
            id: id,
            object: 'model',
            created: 1700000000,
            owned_by: 'google',
            description: cfg.desc,
          });
        }
        return sendJSON({ object: 'list', data: modelList });
      }

      if (path === '/v1beta/models') {
        var googleModels = [];
        var gKeys = Object.keys(MODELS);
        for (var j = 0; j < gKeys.length; j++) {
          var name = gKeys[j];
          var gCfg = MODELS[name];
          googleModels.push({
            name: 'models/' + name,
            displayName: name,
            description: gCfg.desc,
            supportedGenerationMethods: ['generateContent', 'streamGenerateContent'],
          });
        }
        return sendJSON({ models: googleModels });
      }

      return sendJSON({ error: { message: 'not found' } }, 404);
    }

    if (method === 'POST') {
      var body;
      try {
        body = await request.json();
      } catch (e) {
        return sendJSON({ error: { message: 'invalid JSON' } }, 400);
      }

      if (path === '/v1/chat/completions') {
        return handleChatCompletions(request, body, config);
      }

      if (path === '/v1/responses') {
        return handleResponses(request, body, config);
      }

      if (path.indexOf(':streamGenerateContent') !== -1) {
        return handleGoogleAPI(request, body, true, config);
      }

      if (path.indexOf(':generateContent') !== -1) {
        return handleGoogleAPI(request, body, false, config);
      }

      if (path.indexOf('/v1/') === 0) {
        return handleChatCompletions(request, body, config);
      }

      return sendJSON({ error: { message: 'not found' } }, 404);
    }

    return sendJSON({ error: { message: 'method not allowed' } }, 405);
  },
};

