// SMART WALL · APPLE IPADOS DESIGN · TEMUCO, CHILE
// Compatible con iPad Mini 2 (iOS 12.5.7 Safari)
// Incluye: 19 Radios Chilenas, 3 Últimas Elegidas, Clima Mañana, Bluetooth Guide & Smart Connect

(function() {
  'use strict';

  // ==========================================
  // 0. CATÁLOGO VERIFICADO DE 19 RADIOS CHILENAS (HTTPS)
  // ==========================================
  const RADIO_CATALOG = [
    {
      id: 'adn',
      name: 'Radio ADN',
      mono: 'ADN',
      dial: '91.7 FM',
      sub: 'Noticias & Deportes',
      cat: 'news',
      color: '#ff3b30',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/ADNAAC.aac'
    },
    {
      id: 'biobio_temuco',
      name: 'Bío-Bío Temuco',
      mono: 'BÍO',
      dial: '88.1 FM',
      sub: 'Local Temuco & Araucanía',
      cat: 'news',
      color: '#0a84ff',
      url: 'https://unlimited3-cl.dps.live/biobiotemuco/mp3/icecast.audio'
    },
    {
      id: 'biobio',
      name: 'Bío-Bío Nacional',
      mono: 'BÍO',
      dial: '99.7 FM',
      sub: 'Noticias y Opinión',
      cat: 'news',
      color: '#0066cc',
      url: 'https://unlimited3-cl.dps.live/biobiosantiago/mp3/icecast.audio'
    },
    {
      id: 'cooperativa',
      name: 'Cooperativa',
      mono: 'COOP',
      dial: '93.3 FM',
      sub: 'Noticias & País',
      cat: 'news',
      color: '#30d158',
      url: 'https://unlimited3-cl.dps.live/cooperativafm/mp3/icecast.audio'
    },
    {
      id: 'futuro',
      name: 'Radio Futuro',
      mono: 'FUT',
      dial: '88.9 FM',
      sub: 'La Radio del Rock',
      cat: 'rock',
      color: '#ff9f0a',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/FUTUROAAC.aac'
    },
    {
      id: 'rockpop',
      name: 'Rock & Pop',
      mono: 'R&P',
      dial: '94.1 FM',
      sub: 'Rock, Pop & Alternativo',
      cat: 'rock',
      color: '#bf5af2',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/ROCK_AND_POPAAC.aac'
    },
    {
      id: 'sonar',
      name: 'Sonar FM',
      mono: 'SNR',
      dial: '105.3 FM',
      sub: 'Rock & Actualidad',
      cat: 'rock',
      color: '#ff453a',
      url: 'https://mdstrm.com/audio/5c915724519bce27671c4d15/icecast.audio'
    },
    {
      id: 'concierto',
      name: 'Concierto',
      mono: 'CON',
      dial: '88.5 FM',
      sub: 'Clásicos 80s & 90s',
      cat: 'classics',
      color: '#5e5ce6',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CONCIERTOAAC.aac'
    },
    {
      id: 'universo',
      name: 'Radio Universo',
      mono: 'UNI',
      dial: '93.7 FM',
      sub: 'Clásicos Anglo',
      cat: 'classics',
      color: '#64d2ff',
      url: 'https://unlimited3-cl.dps.live/universo/mp3/icecast.audio'
    },
    {
      id: 'retro80',
      name: 'La Retro 80s',
      mono: '80s',
      dial: 'Online',
      sub: 'Éxitos de los 80s',
      cat: 'classics',
      color: '#ff375f',
      url: 'https://s2.radio.co/s9ecef4f68/listen'
    },
    {
      id: 'playfm',
      name: 'Play FM',
      mono: 'PLAY',
      dial: '100.9 FM',
      sub: 'Pop & Anglo',
      cat: 'pop',
      color: '#ff2d55',
      url: 'https://mdstrm.com/audio/5c8d6406f98fbf269f57c82c/icecast.audio'
    },
    {
      id: 'los40',
      name: 'LOS40 Chile',
      mono: '40',
      dial: '101.7 FM',
      sub: 'Hits & Música Urbana',
      cat: 'pop',
      color: '#ff9500',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_CHILEAAC.aac'
    },
    {
      id: 'fmokey',
      name: 'FM Okey',
      mono: 'OKEY',
      dial: '97.7 FM',
      sub: 'Pop & Éxitos',
      cat: 'pop',
      color: '#32ade6',
      url: 'https://streaming.fmokey.cl/moviles.mp3'
    },
    {
      id: 'digital',
      name: 'Digital FM',
      mono: 'DIG',
      dial: '91.1 FM',
      sub: 'Pop & Regional',
      cat: 'pop',
      color: '#00c7be',
      url: 'https://unlimited11-cl.dps.live/digitalfm/aac/icecast.audio'
    },
    {
      id: 'fmdos',
      name: 'FM Dos',
      mono: 'FM2',
      dial: '98.5 FM',
      sub: 'Romántica & Pop',
      cat: 'pop',
      color: '#ff375f',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/FMDOSAAC.aac'
    },
    {
      id: 'pudahuel',
      name: 'Radio Pudahuel',
      mono: 'PUD',
      dial: '90.5 FM',
      sub: 'Baladas & Latina',
      cat: 'classics',
      color: '#ff6961',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/PUDAHUELAAC.aac'
    },
    {
      id: 'imagina',
      name: 'Radio Imagina',
      mono: 'IMG',
      dial: '88.1 FM',
      sub: 'Clásicos & Melódica',
      cat: 'classics',
      color: '#ac8e68',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/IMAGINAAAC.aac'
    },
    {
      id: 'activa',
      name: 'Radio Activa',
      mono: 'ACT',
      dial: '92.5 FM',
      sub: 'Fiesta & Tropical',
      cat: 'pop',
      color: '#e5a900',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/ACTIVAAAC.aac'
    },
    {
      id: '13c',
      name: '13c Radio',
      mono: '13c',
      dial: '102.1 FM',
      sub: 'Cultura & Conversación',
      cat: 'news',
      color: '#636366',
      url: 'https://mdstrm.com/audio/5c915497c6fd7c085b29169d/icecast.audio'
    }
  ];

  const STATIONS_MAP = {};
  RADIO_CATALOG.forEach(function(st) {
    STATIONS_MAP[st.id] = st;
  });

  // ==========================================
  // 1. UTILIDADES Y CONFIGURACIÓN DE SALA
  // ==========================================
  function getQueryParam(name) {
    const search = window.location.search;
    if (!search || search.length < 2) return null;
    const pairs = search.substring(1).split('&');
    for (let i = 0; i < pairs.length; i++) {
      const parts = pairs[i].split('=');
      if (decodeURIComponent(parts[0]) === name) {
        return parts.length > 1 ? decodeURIComponent(parts[1]) : '';
      }
    }
    return null;
  }

  function generateRoomCode() {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function sanitizeRoomCode(raw) {
    return String(raw || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').substring(0, 20);
  }

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  const myClientId = 'cli_' + Math.random().toString(36).substring(2, 9);
  let hostRoomId = localStorage.getItem('smartwall_room_id');
  if (!hostRoomId) {
    hostRoomId = generateRoomCode();
    localStorage.setItem('smartwall_room_id', hostRoomId);
  }

  const urlControlParam = getQueryParam('control');
  let isRemoteMode = false;
  let activeRoomId = hostRoomId;

  if (urlControlParam) {
    const cleanParam = sanitizeRoomCode(urlControlParam);
    if (cleanParam) {
      isRemoteMode = true;
      activeRoomId = cleanParam;
      localStorage.setItem('smartwall_remote_room', cleanParam);
    }
  }

  // ==========================================
  // 2. RELOJ STANDBY APPLE
  // ==========================================
  const elHours = document.getElementById('clock-hours');
  const elMinutes = document.getElementById('clock-minutes');
  const elSeconds = document.getElementById('clock-seconds');
  const elDate = document.getElementById('date-display');
  const elGreeting = document.getElementById('greeting-text');

  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  function updateClock() {
    if (isRemoteMode) return;
    const now = new Date();
    elHours.textContent = pad2(now.getHours());
    elMinutes.textContent = pad2(now.getMinutes());
    elSeconds.textContent = pad2(now.getSeconds());

    const diaNombre = diasSemana[now.getDay()];
    const diaNum = now.getDate();
    const mesNombre = meses[now.getMonth()];

    elDate.textContent = diaNombre + ', ' + diaNum + ' de ' + mesNombre;

    const currentHour = now.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      elGreeting.textContent = 'Buenos días';
    } else if (currentHour >= 12 && currentHour < 20) {
      elGreeting.textContent = 'Buenas tardes';
    } else {
      elGreeting.textContent = 'Buenas noches';
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // ==========================================
  // 3. CLIMA APPLE WEATHER (HOY + MAÑANA + 2 DÍAS)
  // ==========================================
  const LAT_TEMUCO = -38.7397;
  const LON_TEMUCO = -72.5986;

  const elWidgetWeather = document.getElementById('widget-weather');
  const elTemp = document.getElementById('weather-temp');
  const elApparent = document.getElementById('weather-apparent');
  const elDesc = document.getElementById('weather-desc');
  const elHumidity = document.getElementById('weather-humidity');
  const elWind = document.getElementById('weather-wind');
  const elMinMax = document.getElementById('weather-minmax');
  const elIcon = document.getElementById('weather-icon');
  const elForecast = document.getElementById('weather-forecast');

  function getAppleWeatherIcon(code, isDay, size) {
    const s = size || 64;
    if (code === 0) {
      if (isDay) {
        return {
          text: 'Despejado',
          svg: '<svg viewBox="0 0 64 64" width="' + s + '" height="' + s + '" fill="none">' +
            '<circle cx="32" cy="32" r="14" fill="#ffd60a"/>' +
            '<circle cx="32" cy="32" r="20" fill="#ffd60a" opacity="0.22"/>' +
            '<path d="M32 6v5M32 53v5M6 32h5M53 32h5M13.6 13.6l3.6 3.6M46.8 46.8l3.6 3.6M13.6 50.4l3.6-3.6M46.8 17.2l3.6-3.6" stroke="#ffd60a" stroke-width="3.5" stroke-linecap="round"/>' +
            '</svg>'
        };
      }
      return {
        text: 'Despejado',
        svg: '<svg viewBox="0 0 64 64" width="' + s + '" height="' + s + '" fill="none">' +
          '<path d="M43 38.5A16 16 0 0 1 25.5 21a15.8 15.8 0 0 1 2.2-8.1A17 17 0 1 0 51.1 36.3a15.8 15.8 0 0 1-8.1 2.2z" fill="#e5e7eb"/>' +
          '<circle cx="46" cy="18" r="2" fill="#ffd60a"/>' +
          '</svg>'
      };
    } else if (code === 1 || code === 2) {
      return {
        text: code === 1 ? 'Mayormente despejado' : 'Parcialmente nublado',
        svg: '<svg viewBox="0 0 64 64" width="' + s + '" height="' + s + '" fill="none">' +
          (isDay
            ? '<circle cx="24" cy="24" r="10.5" fill="#ffd60a"/><circle cx="24" cy="24" r="14" fill="#ffd60a" opacity="0.2"/>'
            : '<path d="M28 28a10 10 0 0 1-10-10 10 10 0 0 1 1.5-5.2A11 11 0 1 0 33.2 26.5 10 10 0 0 1 28 28z" fill="#d1d5db"/>') +
          '<path d="M46 47H21a10 10 0 0 1-1.5-19.8A13.5 13.5 0 0 1 46 30a8.5 8.5 0 0 1 0 17z" fill="#f3f4f6" opacity="0.94"/>' +
          '</svg>'
      };
    } else if (code === 3) {
      return {
        text: 'Nublado',
        svg: '<svg viewBox="0 0 64 64" width="' + s + '" height="' + s + '" fill="none">' +
          '<path d="M49 40H26a8 8 0 0 1-1.2-15.9A11 11 0 0 1 46.5 26a7 7 0 0 1 2.5 14z" fill="#9ca3af" opacity="0.55"/>' +
          '<path d="M46 48H20a10 10 0 0 1-1.5-19.8A13.5 13.5 0 0 1 45 31a8.5 8.5 0 0 1 1 17z" fill="#e5e7eb"/>' +
          '</svg>'
      };
    } else if (code >= 45 && code <= 48) {
      return {
        text: 'Niebla / Neblina',
        svg: '<svg viewBox="0 0 64 64" width="' + s + '" height="' + s + '" fill="none">' +
          '<path d="M46 36H20a9 9 0 0 1-1.4-17.8A12.5 12.5 0 0 1 45 21a7.5 7.5 0 0 1 1 15z" fill="#d1d5db" opacity="0.85"/>' +
          '<path d="M14 43h36M18 50h28" stroke="#9ca3af" stroke-width="4" stroke-linecap="round"/>' +
          '</svg>'
      };
    } else if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
      const label = code <= 55 ? 'Llovizna' : (code >= 63 || code >= 81 ? 'Lluvia' : 'Lluvia débil');
      return {
        text: label,
        svg: '<svg viewBox="0 0 64 64" width="' + s + '" height="' + s + '" fill="none">' +
          '<path d="M46 39H20a9.5 9.5 0 0 1-1.4-18.8A13 13 0 0 1 45 23a8 8 0 0 1 1 16z" fill="#cbd5e1"/>' +
          '<path d="M22 45l-2 7M31 45l-2 7M40 45l-2 7" stroke="#64d2ff" stroke-width="3.5" stroke-linecap="round"/>' +
          '</svg>'
      };
    } else if (code >= 95) {
      return {
        text: 'Tormenta',
        svg: '<svg viewBox="0 0 64 64" width="' + s + '" height="' + s + '" fill="none">' +
          '<path d="M46 37H20a9.5 9.5 0 0 1-1.4-18.8A13 13 0 0 1 45 21a8 8 0 0 1 1 16z" fill="#94a3b8"/>' +
          '<path d="M33 38l-5 9h6l-3 9 10-11h-6l4-7h-6z" fill="#ffd60a"/>' +
          '</svg>'
      };
    }
    return {
      text: 'Nuboso',
      svg: '<svg viewBox="0 0 64 64" width="' + s + '" height="' + s + '" fill="none">' +
        '<path d="M46 46H20a10 10 0 0 1-1.5-19.8A13.5 13.5 0 0 1 45 29a8.5 8.5 0 0 1 1 17z" fill="#d1d5db"/>' +
        '</svg>'
    };
  }

  function fetchWeather() {
    if (isRemoteMode) return;
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + LAT_TEMUCO +
      '&longitude=' + LON_TEMUCO +
      '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=8&timezone=America%2FSantiago';

    fetch(url)
      .then(function(res) {
        if (!res.ok) throw new Error('Error clima');
        return res.json();
      })
      .then(function(data) {
        if (!data || !data.current) return;

        const current = data.current;
        const daily = data.daily;

        if (current.is_day === 1) {
          elWidgetWeather.classList.add('daytime');
        } else {
          elWidgetWeather.classList.remove('daytime');
        }

        elTemp.textContent = Math.round(current.temperature_2m);
        elApparent.textContent = Math.round(current.apparent_temperature) + '°';
        elHumidity.textContent = Math.round(current.relative_humidity_2m) + '%';
        elWind.textContent = Math.round(current.wind_speed_10m) + ' km/h';

        if (daily && daily.temperature_2m_min && daily.temperature_2m_max) {
          const minToday = Math.round(daily.temperature_2m_min[0]);
          const maxToday = Math.round(daily.temperature_2m_max[0]);
          elMinMax.textContent = 'Máx ' + maxToday + '° · Mín ' + minToday + '°';
        }

        const currentInfo = getAppleWeatherIcon(current.weather_code, current.is_day === 1, 46);
        elDesc.textContent = currentInfo.text;
        elIcon.innerHTML = currentInfo.svg;

        // Pronóstico de 7 días (Mañana + siguientes 6 días)
        if (daily && daily.time && daily.time.length > 1) {
          let html = '';
          const totalDays = Math.min(7, daily.time.length - 1);
          for (let i = 1; i <= totalDays; i++) {
            const dateStr = daily.time[i];
            const d = new Date(dateStr + 'T12:00:00');
            const isTomorrow = (i === 1);
            const dayLabel = isTomorrow ? 'Mañana' : diasSemana[d.getDay()];
            const dayCode = daily.weather_code[i];
            const dayInfo = getAppleWeatherIcon(dayCode, true, 22);
            const dayMax = Math.round(daily.temperature_2m_max[i]);
            const dayMin = Math.round(daily.temperature_2m_min[i]);

            html += '<div class="forecast-row' + (isTomorrow ? ' tomorrow' : '') + '">' +
              '<div class="forecast-day-col">' + dayLabel + '</div>' +
              '<div class="forecast-icon-col">' + dayInfo.svg + '</div>' +
              '<div class="forecast-cond-col">' + dayInfo.text + '</div>' +
              '<div class="forecast-temps-col">' +
                '<span class="forecast-min">' + dayMin + '°</span>' +
                '<span class="forecast-bar"></span>' +
                '<span class="forecast-max">' + dayMax + '°</span>' +
              '</div>' +
            '</div>';
          }
          elForecast.innerHTML = html;
        }
      })
      .catch(function(err) {
        console.error('Clima error:', err);
        elDesc.textContent = 'Sin conexión';
      });
  }

  fetchWeather();
  setInterval(fetchWeather, 15 * 60 * 1000);

  // ==========================================
  // 4. REPRODUCTOR DE RADIOS + 3 ÚLTIMAS + CATÁLOGO DE 19
  // ==========================================
  const radioAudio = document.getElementById('radio-audio');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const streamStatus = document.getElementById('stream-status');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');
  const artworkSquircle = document.getElementById('album-art');
  const artworkMonogram = document.getElementById('artwork-monogram');
  const soundWave = document.getElementById('sound-wave');
  const elRecentGrid = document.getElementById('recent-radios-grid');
  const elRemoteRecentGrid = document.getElementById('remote-recents-grid');

  // Cargar las 3 últimas radios elegidas desde localStorage
  let recentIds = ['adn', 'biobio_temuco', 'futuro'];
  try {
    const savedRecents = JSON.parse(localStorage.getItem('smartwall_recent_radios') || 'null');
    if (Array.isArray(savedRecents) && savedRecents.length > 0) {
      const valid = savedRecents.filter(function(id) { return Boolean(STATIONS_MAP[id]); });
      if (valid.length > 0) {
        recentIds = valid.slice(0, 3);
      }
    }
  } catch (e) {}

  // Rellenar hasta 3 si faltan
  ['adn', 'biobio_temuco', 'futuro'].forEach(function(fallbackId) {
    if (recentIds.length < 3 && recentIds.indexOf(fallbackId) === -1) {
      recentIds.push(fallbackId);
    }
  });

  let currentStationId = recentIds[0] || 'adn';
  let currentStation = STATIONS_MAP[currentStationId] || RADIO_CATALOG[0];
  let isPlaying = false;
  let audioUnlocked = false;
  let lastStatusText = 'En pausa · Toca Play';

  function pushRecentRadio(id) {
    if (!STATIONS_MAP[id]) return;
    const next = [id];
    for (let i = 0; i < recentIds.length; i++) {
      if (recentIds[i] !== id && next.length < 3) {
        next.push(recentIds[i]);
      }
    }
    recentIds = next;
    if (!isRemoteMode) {
      localStorage.setItem('smartwall_recent_radios', JSON.stringify(recentIds));
    }
    renderRecentRadios();
  }

  function renderRecentRadios() {
    if (!elRecentGrid) return;
    let html = '';
    for (let i = 0; i < recentIds.length; i++) {
      const st = STATIONS_MAP[recentIds[i]];
      if (!st) continue;
      const activeCls = st.id === currentStationId ? ' active' : '';
      html += '<button class="recent-radio-tile' + activeCls + '" data-id="' + st.id + '" type="button">' +
        '<div class="mini-top-row">' +
          '<span class="mini-badge" style="background:' + st.color + ';">' + st.mono + '</span>' +
          '<span class="mini-dial">' + st.dial + '</span>' +
        '</div>' +
        '<div class="mini-name">' + st.name + '</div>' +
      '</button>';
    }
    elRecentGrid.innerHTML = html;

    elRecentGrid.querySelectorAll('.recent-radio-tile').forEach(function(tile) {
      tile.addEventListener('click', function() {
        const id = tile.getAttribute('data-id');
        audioUnlocked = true;
        selectStationById(id, true);
        startStream(false);
      });
    });
  }

  function updateArtworkVisual(st) {
    if (!st) return;
    if (artworkMonogram) artworkMonogram.textContent = st.mono;
    if (artworkSquircle) {
      artworkSquircle.style.background = 'linear-gradient(135deg, ' + st.color + ' 0%, #1c1c1e 130%)';
    }
  }

  function selectStationById(stationId, pushToRecents) {
    const st = STATIONS_MAP[stationId];
    if (!st) return false;

    currentStationId = st.id;
    currentStation = st;

    trackTitle.textContent = st.name;
    trackArtist.textContent = st.dial + ' · ' + st.sub;
    updateArtworkVisual(st);

    if (pushToRecents !== false) {
      pushRecentRadio(st.id);
    } else {
      renderRecentRadios();
    }
    return true;
  }

  function unlockAudioSilently() {
    if (audioUnlocked || isRemoteMode || isPlaying) return;
    audioUnlocked = true;
    try {
      radioAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      const p = radioAudio.play();
      if (p && typeof p.then === 'function') {
        p.then(function() {
          if (!isPlaying && lastStatusText.indexOf('Toca la pantalla') !== -1) {
            lastStatusText = 'Listo para control remoto';
            streamStatus.textContent = lastStatusText;
            streamStatus.style.color = '#30d158';
            publishState();
          }
        }).catch(function() {});
      }
    } catch (e) {}
  }

  document.addEventListener('touchstart', function(e) {
    if (isRemoteMode) return;
    if (e.target && (e.target.closest('#btn-play-pause') || e.target.closest('.recent-radio-tile') || e.target.closest('.catalog-station-card'))) {
      return;
    }
    unlockAudioSilently();
  }, { passive: true });

  function setPlayingState(playing, customStatus) {
    isPlaying = playing;
    if (playing) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline-block';
      btnPlayPause.classList.add('playing');
      lastStatusText = customStatus || '● EN VIVO';
      streamStatus.textContent = lastStatusText;
      streamStatus.style.color = '#30d158';
      if (soundWave) soundWave.classList.remove('paused');
    } else {
      playIcon.style.display = 'inline-block';
      pauseIcon.style.display = 'none';
      btnPlayPause.classList.remove('playing');
      lastStatusText = customStatus || 'En pausa';
      streamStatus.textContent = lastStatusText;
      streamStatus.style.color = customStatus && customStatus.indexOf('Toca') !== -1 ? '#ffd60a' : 'rgba(235, 235, 245, 0.45)';
      if (soundWave) soundWave.classList.add('paused');
    }
  }

  function startStream(fromRemote) {
    if (!fromRemote) {
      audioUnlocked = true;
    }
    lastStatusText = 'Conectando...';
    streamStatus.textContent = lastStatusText;
    streamStatus.style.color = '#64d2ff';
    publishState();

    radioAudio.src = currentStation.url;
    radioAudio.load();
    const playPromise = radioAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        audioUnlocked = true;
        setPlayingState(true, '● EN VIVO');
        publishState();
      }).catch(function(err) {
        console.error('Error radio:', err);
        const msg = String(err || '');
        const isAutoplayBlock = (err && err.name === 'NotAllowedError') ||
          msg.indexOf('not allowed') !== -1 ||
          msg.indexOf('gesture') !== -1;

        if (fromRemote && isAutoplayBlock) {
          setPlayingState(false, 'Toca la pantalla del iPad 1 vez');
        } else {
          setPlayingState(false, 'Error · Reintentar');
        }
        publishState();
      });
    } else {
      setPlayingState(true, '● EN VIVO');
      publishState();
    }
  }

  function stopStream() {
    radioAudio.pause();
    radioAudio.removeAttribute('src');
    radioAudio.load();
    setPlayingState(false, 'En pausa');
    publishState();
  }

  btnPlayPause.addEventListener('click', function() {
    if (isPlaying) {
      stopStream();
    } else {
      startStream(false);
    }
  });

  radioAudio.addEventListener('playing', function() {
    if (!isPlaying || lastStatusText !== '● EN VIVO') {
      setPlayingState(true, '● EN VIVO');
      publishState();
    }
  });

  radioAudio.addEventListener('waiting', function() {
    if (isPlaying) {
      lastStatusText = 'Cargando audio...';
      streamStatus.textContent = lastStatusText;
    }
  });

  radioAudio.addEventListener('error', function() {
    if (radioAudio.getAttribute('src') && radioAudio.getAttribute('src').indexOf('http') === 0) {
      setPlayingState(false, 'Stream no disponible');
      publishState();
    }
  });

  // Inicializar estación visual por defecto
  selectStationById(currentStationId, false);

  // ==========================================
  // 5. CATÁLOGO MODAL DE 19 RADIOS CHILENAS
  // ==========================================
  const modalRadios = document.getElementById('modal-radios');
  const elCatalogGrid = document.getElementById('radios-catalog-grid');
  const filterPills = document.querySelectorAll('#radio-filter-bar .filter-pill');
  let activeCategory = 'all';

  function renderRadioCatalog(cat) {
    activeCategory = cat || 'all';
    let html = '';
    RADIO_CATALOG.forEach(function(st) {
      if (activeCategory !== 'all' && st.cat !== activeCategory) return;
      const isSelected = st.id === currentStationId ? ' active' : '';
      html += '<button class="catalog-station-card' + isSelected + '" data-id="' + st.id + '" type="button">' +
        '<span class="mini-badge" style="background:' + st.color + ';">' + st.mono + '</span>' +
        '<div class="catalog-meta">' +
          '<div class="catalog-name">' + st.name + '</div>' +
          '<div class="catalog-sub">' + st.dial + ' · ' + st.sub + '</div>' +
        '</div>' +
      '</button>';
    });
    elCatalogGrid.innerHTML = html;

    elCatalogGrid.querySelectorAll('.catalog-station-card').forEach(function(card) {
      card.addEventListener('click', function() {
        const id = card.getAttribute('data-id');
        modalRadios.style.display = 'none';

        if (isRemoteMode) {
          const st = STATIONS_MAP[id];
          if (st) {
            elRemoteTrackTitle.textContent = st.name;
            elRemoteTrackStatus.textContent = 'Cambiando en el iPad...';
            elRemoteTrackStatus.style.color = '#64d2ff';
          }
          sendSyncPayload({ type: 'cmd', action: 'play_station', stationId: id });
        } else {
          audioUnlocked = true;
          selectStationById(id, true);
          startStream(false);
        }
      });
    });
  }

  filterPills.forEach(function(pill) {
    pill.addEventListener('click', function() {
      filterPills.forEach(function(p) { p.classList.remove('active'); });
      pill.classList.add('active');
      renderRadioCatalog(pill.getAttribute('data-cat'));
    });
  });

  document.getElementById('btn-all-radios').addEventListener('click', function() {
    renderRadioCatalog(activeCategory);
    modalRadios.style.display = 'flex';
  });

  document.getElementById('btn-remote-all-radios').addEventListener('click', function() {
    renderRadioCatalog(activeCategory);
    modalRadios.style.display = 'flex';
  });

  // ==========================================
  // 6. HOGAR INTELIGENTE (APPLE HOME)
  // ==========================================
  const deviceTiles = document.querySelectorAll('#dashboard-view .home-tile');
  const elCount = document.getElementById('active-devices-count');

  function getDevicesStateMap() {
    const map = {};
    deviceTiles.forEach(function(tile) {
      const id = tile.getAttribute('data-device');
      map[id] = tile.classList.contains('on');
    });
    return map;
  }

  function updateDeviceCount() {
    const active = document.querySelectorAll('#dashboard-view .home-tile.on').length;
    elCount.textContent = active + (active === 1 ? ' encendido' : ' encendidos');
  }

  function setDeviceState(deviceId, isOn) {
    deviceTiles.forEach(function(tile) {
      if (tile.getAttribute('data-device') === deviceId) {
        if (isOn) {
          tile.classList.add('on');
        } else {
          tile.classList.remove('on');
        }
        const stateEl = tile.querySelector('.home-tile-state');
        if (stateEl) {
          stateEl.textContent = isOn ? 'Encendida' : 'Apagada';
        }
        localStorage.setItem('device_' + deviceId, isOn ? 'true' : 'false');
      }
    });
    updateDeviceCount();
  }

  deviceTiles.forEach(function(tile) {
    const id = tile.getAttribute('data-device');
    const isSavedOn = localStorage.getItem('device_' + id) === 'true';
    if (isSavedOn) {
      setDeviceState(id, true);
    }

    tile.addEventListener('click', function() {
      const nextOn = !tile.classList.contains('on');
      setDeviceState(id, nextOn);
      publishState();
    });
  });

  updateDeviceCount();

  // ==========================================
  // 7. SMART CONNECT (CONTROL REMOTO EN RED)
  // ==========================================
  let syncEventSource = null;

  function getTopicName() {
    return 'smartwall-temuco-v1-' + activeRoomId;
  }

  function setSyncDotColor(color, glow) {
    const dot = isRemoteMode
      ? document.getElementById('remote-sync-dot')
      : document.getElementById('sync-dot');
    if (dot) {
      dot.style.backgroundColor = color;
      dot.style.boxShadow = '0 0 8px ' + glow;
    }
  }

  function sendSyncPayload(payload) {
    payload.sender = myClientId;
    payload.ts = Date.now();
    return fetch('https://ntfy.sh/' + encodeURIComponent(getTopicName()), {
      method: 'POST',
      body: JSON.stringify(payload)
    }).catch(function(err) {
      console.error('Sync POST error:', err);
    });
  }

  function publishState() {
    if (isRemoteMode) return;
    sendSyncPayload({
      type: 'state',
      stationId: currentStationId,
      stationName: currentStation.name,
      stationSub: currentStation.dial + ' · ' + currentStation.sub,
      recentIds: recentIds,
      isPlaying: isPlaying,
      status: lastStatusText,
      devices: getDevicesStateMap()
    });
  }

  function handleIncomingCommand(msg) {
    if (!msg || !msg.action) return;

    if (msg.action === 'get_state') {
      publishState();
    } else if (msg.action === 'play_station' && msg.stationId) {
      if (selectStationById(msg.stationId, true)) {
        startStream(true);
      }
    } else if (msg.action === 'toggle_play') {
      if (isPlaying) {
        stopStream();
      } else {
        startStream(true);
      }
    } else if (msg.action === 'play') {
      startStream(true);
    } else if (msg.action === 'pause') {
      stopStream();
    } else if (msg.action === 'toggle_device' && msg.deviceId) {
      const currentMap = getDevicesStateMap();
      setDeviceState(msg.deviceId, !currentMap[msg.deviceId]);
      publishState();
    } else if (msg.action === 'reload') {
      window.location.reload(true);
    }
  }

  const elDashboardView = document.getElementById('dashboard-view');
  const elRemoteView = document.getElementById('remote-view');
  const elRemoteRoomLabel = document.getElementById('remote-room-label');
  const elRemoteTrackTitle = document.getElementById('remote-track-title');
  const elRemoteTrackStatus = document.getElementById('remote-track-status');
  const elRemotePlayBtn = document.getElementById('remote-btn-play');
  const elRemotePlayLabel = document.getElementById('remote-play-label');
  const remoteDeviceTiles = document.querySelectorAll('.remote-device');

  function renderRemoteRecents(idsList, activeId) {
    if (!elRemoteRecentGrid) return;
    const list = Array.isArray(idsList) && idsList.length > 0 ? idsList : recentIds;
    let html = '';
    for (let i = 0; i < list.length; i++) {
      const st = STATIONS_MAP[list[i]];
      if (!st) continue;
      const activeCls = st.id === activeId ? ' active' : '';
      html += '<button class="recent-radio-tile' + activeCls + '" data-id="' + st.id + '" type="button">' +
        '<span class="mini-badge" style="background:' + st.color + ';">' + st.mono + '</span>' +
        '<div class="mini-meta">' +
          '<div class="mini-name">' + st.name + '</div>' +
          '<div class="mini-dial">' + st.dial + ' · ' + st.sub + '</div>' +
        '</div>' +
      '</button>';
    }
    elRemoteRecentGrid.innerHTML = html;

    elRemoteRecentGrid.querySelectorAll('.recent-radio-tile').forEach(function(tile) {
      tile.addEventListener('click', function() {
        const sid = tile.getAttribute('data-id');
        const st = STATIONS_MAP[sid];
        if (st) {
          elRemoteTrackTitle.textContent = st.name;
          elRemoteTrackStatus.textContent = 'Enviando orden al iPad...';
          elRemoteTrackStatus.style.color = '#64d2ff';
        }
        sendSyncPayload({ type: 'cmd', action: 'play_station', stationId: sid });
      });
    });
  }

  function applyStateToRemoteUI(state) {
    if (!state) return;
    if (state.stationId && STATIONS_MAP[state.stationId]) {
      currentStationId = state.stationId;
    }
    if (Array.isArray(state.recentIds) && state.recentIds.length > 0) {
      recentIds = state.recentIds;
    }
    if (state.stationName) {
      elRemoteTrackTitle.textContent = state.stationName;
    }
    if (state.status) {
      elRemoteTrackStatus.textContent = state.status + (state.stationSub ? ' · ' + state.stationSub : '');
      elRemoteTrackStatus.style.color = state.isPlaying ? '#30d158' : '#ffd60a';
    }
    if (state.isPlaying) {
      elRemotePlayBtn.classList.add('playing');
      elRemotePlayLabel.textContent = 'Pausar en iPad';
    } else {
      elRemotePlayBtn.classList.remove('playing');
      elRemotePlayLabel.textContent = 'Reproducir en iPad';
    }

    renderRemoteRecents(recentIds, currentStationId);

    if (state.devices) {
      remoteDeviceTiles.forEach(function(tile) {
        const devId = tile.getAttribute('data-device');
        const isOn = Boolean(state.devices[devId]);
        if (isOn) {
          tile.classList.add('on');
        } else {
          tile.classList.remove('on');
        }
        const stEl = tile.querySelector('.home-tile-state');
        if (stEl) {
          stEl.textContent = isOn ? 'Encendida' : 'Apagada';
        }
      });
    }
  }

  function connectSync() {
    if (syncEventSource) {
      try { syncEventSource.close(); } catch (e) {}
      syncEventSource = null;
    }

    if (typeof EventSource === 'undefined') return;

    const sseUrl = 'https://ntfy.sh/' + encodeURIComponent(getTopicName()) + '/sse';
    syncEventSource = new EventSource(sseUrl);

    syncEventSource.onopen = function() {
      setSyncDotColor('#30d158', 'rgba(48, 209, 88, 0.7)');
      if (isRemoteMode) {
        sendSyncPayload({ type: 'cmd', action: 'get_state' });
      }
    };

    syncEventSource.onerror = function() {
      setSyncDotColor('#ff9f0a', 'rgba(255, 159, 10, 0.7)');
    };

    syncEventSource.onmessage = function(event) {
      try {
        const wrapper = JSON.parse(event.data);
        if (!wrapper || !wrapper.message) return;
        const msg = JSON.parse(wrapper.message);
        if (!msg || msg.sender === myClientId) return;

        if (!isRemoteMode && msg.type === 'cmd') {
          handleIncomingCommand(msg);
        } else if (isRemoteMode && msg.type === 'state') {
          applyStateToRemoteUI(msg);
        }
      } catch (e) {}
    };
  }

  setInterval(function() {
    if (!syncEventSource || syncEventSource.readyState === 2) {
      connectSync();
    }
  }, 20000);

  function enterRemoteMode(roomCode) {
    isRemoteMode = true;
    activeRoomId = sanitizeRoomCode(roomCode) || hostRoomId;
    localStorage.setItem('smartwall_remote_room', activeRoomId);

    document.body.classList.add('is-remote');
    elDashboardView.style.display = 'none';
    elRemoteView.style.display = 'flex';
    elRemoteRoomLabel.textContent = activeRoomId.toUpperCase();
    elRemoteTrackTitle.textContent = 'Conectando...';
    elRemoteTrackStatus.textContent = 'Buscando estado del iPad';
    renderRemoteRecents(recentIds, currentStationId);

    connectSync();
  }

  function exitRemoteMode() {
    isRemoteMode = false;
    activeRoomId = hostRoomId;
    document.body.classList.remove('is-remote');
    elRemoteView.style.display = 'none';
    elDashboardView.style.display = 'flex';
    updateClock();
    fetchWeather();
    connectSync();
  }

  elRemotePlayBtn.addEventListener('click', function() {
    elRemoteTrackStatus.textContent = 'Enviando orden al iPad...';
    sendSyncPayload({ type: 'cmd', action: 'toggle_play' });
  });

  remoteDeviceTiles.forEach(function(tile) {
    tile.addEventListener('click', function() {
      const devId = tile.getAttribute('data-device');
      sendSyncPayload({ type: 'cmd', action: 'toggle_device', deviceId: devId });
    });
  });

  document.getElementById('btn-remote-refresh').addEventListener('click', function() {
    elRemoteTrackStatus.textContent = 'Solicitando estado...';
    sendSyncPayload({ type: 'cmd', action: 'get_state' });
  });

  document.getElementById('btn-remote-reload-ipad').addEventListener('click', function() {
    elRemoteTrackStatus.textContent = 'Reiniciando pantalla del iPad...';
    sendSyncPayload({ type: 'cmd', action: 'reload' });
  });

  document.getElementById('btn-exit-remote').addEventListener('click', function() {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    exitRemoteMode();
  });

  // ==========================================
  // 8. MODALES (BLUETOOTH & CONTROL REMOTO)
  // ==========================================
  const modalBluetooth = document.getElementById('modal-bluetooth');
  const modalConnect = document.getElementById('modal-connect');
  const btnBluetooth = document.getElementById('btn-bluetooth');
  const btnConnect = document.getElementById('btn-connect');
  const elConnectRoomCode = document.getElementById('connect-room-code');
  const elConnectUrlText = document.getElementById('connect-url-text');
  const elConnectQrImg = document.getElementById('connect-qr-img');

  function updateConnectModalInfo() {
    const baseUrl = window.location.origin + window.location.pathname;
    const remoteUrl = baseUrl + '?control=' + encodeURIComponent(hostRoomId);
    elConnectRoomCode.textContent = hostRoomId.toUpperCase();
    elConnectUrlText.textContent = remoteUrl;
    elConnectQrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(remoteUrl);
  }

  if (btnBluetooth) {
    btnBluetooth.addEventListener('click', function() {
      modalBluetooth.style.display = 'flex';
    });
  }

  if (btnConnect) {
    btnConnect.addEventListener('click', function() {
      updateConnectModalInfo();
      modalConnect.style.display = 'flex';
    });
  }

  document.getElementById('btn-new-room-code').addEventListener('click', function() {
    hostRoomId = generateRoomCode();
    localStorage.setItem('smartwall_room_id', hostRoomId);
    activeRoomId = hostRoomId;
    updateConnectModalInfo();
    connectSync();
  });

  document.getElementById('btn-switch-to-remote').addEventListener('click', function() {
    const savedRemote = localStorage.getItem('smartwall_remote_room') || hostRoomId;
    const entered = window.prompt('Ingresa el código de sala que aparece en el iPad de la pared:', savedRemote);
    if (entered) {
      modalConnect.style.display = 'none';
      enterRemoteMode(entered);
    }
  });

  document.querySelectorAll('.modal-close').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const targetId = btn.getAttribute('data-close');
      const modal = document.getElementById(targetId);
      if (modal) modal.style.display = 'none';
    });
  });

  [modalRadios, modalBluetooth, modalConnect].forEach(function(modal) {
    if (!modal) return;
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // ==========================================
  // 9. BOTÓN RECARGAR & PANTALLA COMPLETA
  // ==========================================
  const btnReload = document.getElementById('btn-reload');
  if (btnReload) {
    btnReload.addEventListener('click', function() {
      window.location.reload(true);
    });
  }

  const btnFullscreen = document.getElementById('btn-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', function() {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
  }

  if (isRemoteMode) {
    enterRemoteMode(activeRoomId);
  } else {
    connectSync();
  }

})();
