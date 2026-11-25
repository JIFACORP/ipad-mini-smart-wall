// SMART WALL DASHBOARD · TEMUCO, CHILE
// Diseñado para iPad Mini 2 (iOS 12 Safari compatible)
// Incluye Control Remoto estilo Spotify Connect (vía ntfy.sh SSE)

(function() {
  'use strict';

  // ==========================================
  // 0. UTILIDADES Y CONFIGURACIÓN DE SALA
  // ==========================================
  const STATIONS = {
    adn: {
      id: 'adn',
      name: 'Radio ADN',
      sub: 'Actualidad & Deportes · 91.7 FM',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/ADNAAC.aac'
    },
    biobio: {
      id: 'biobio',
      name: 'Radio Bío-Bío',
      sub: 'Temuco y Red Nacional · 88.1 FM',
      url: 'https://unlimited3-cl.dps.live/biobiosantiago/mp3/icecast.audio'
    },
    futuro: {
      id: 'futuro',
      name: 'Radio Futuro',
      sub: 'La Radio del Rock · 88.9 FM',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/FUTUROAAC.aac'
    },
    rockpop: {
      id: 'rockpop',
      name: 'Rock & Pop',
      sub: 'Música 24/7 · 94.1 FM',
      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/ROCK_AND_POPAAC.aac'
    }
  };

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
  // 1. RELOJ Y FECHA
  // ==========================================
  const elHours = document.getElementById('clock-hours');
  const elMinutes = document.getElementById('clock-minutes');
  const elSeconds = document.getElementById('clock-seconds');
  const elDate = document.getElementById('date-display');
  const elGreeting = document.getElementById('greeting-text');

  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function updateClock() {
    if (isRemoteMode) return;
    const now = new Date();
    elHours.textContent = pad2(now.getHours());
    elMinutes.textContent = pad2(now.getMinutes());
    elSeconds.textContent = pad2(now.getSeconds());

    const diaNombre = diasSemana[now.getDay()];
    const diaNum = now.getDate();
    const mesNombre = meses[now.getMonth()];
    const anio = now.getFullYear();

    elDate.textContent = diaNombre + ', ' + diaNum + ' de ' + mesNombre + ' ' + anio;

    const currentHour = now.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      elGreeting.textContent = '☀️ Buenos días';
    } else if (currentHour >= 12 && currentHour < 20) {
      elGreeting.textContent = '🌤️ Buenas tardes';
    } else {
      elGreeting.textContent = '🌙 Buenas noches';
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // ==========================================
  // 2. CLIMA TEMUCO (OPEN-METEO API)
  // ==========================================
  const LAT_TEMUCO = -38.7397;
  const LON_TEMUCO = -72.5986;

  const elTemp = document.getElementById('weather-temp');
  const elApparent = document.getElementById('weather-apparent');
  const elDesc = document.getElementById('weather-desc');
  const elHumidity = document.getElementById('weather-humidity');
  const elWind = document.getElementById('weather-wind');
  const elMinMax = document.getElementById('weather-minmax');
  const elIcon = document.getElementById('weather-icon');
  const elForecast = document.getElementById('weather-forecast');
  const elUpdateTime = document.getElementById('weather-update-time');

  function getWeatherDescAndIcon(code, isDay) {
    if (code === 0) {
      return {
        text: 'Cielo despejado',
        svg: isDay
          ? '<svg viewBox="0 0 64 64" width="76" height="76" fill="none"><circle cx="32" cy="32" r="15" fill="#fbbf24"/><path d="M32 5v7m0 40v7M5 32h7m40 0h7m-10-22l5-5M17 47l5-5m0-28l-5-5m33 33l-5-5" stroke="#fbbf24" stroke-width="4.5" stroke-linecap="round"/></svg>'
          : '<svg viewBox="0 0 64 64" width="76" height="76" fill="none"><path d="M42 36a16 16 0 1 1-16-16 12 12 0 0 0 16 16z" fill="#93c5fd"/></svg>'
      };
    } else if (code === 1 || code === 2) {
      return {
        text: 'Parcialmente nublado',
        svg: '<svg viewBox="0 0 64 64" width="76" height="76" fill="none"><circle cx="26" cy="26" r="11" fill="#fbbf24"/><path d="M46 48H22a11 11 0 0 1-1.8-21.8A15 15 0 0 1 49 29.5 10 10 0 0 1 46 48z" fill="#94a3b8"/></svg>'
      };
    } else if (code === 3) {
      return {
        text: 'Nublado',
        svg: '<svg viewBox="0 0 64 64" width="76" height="76" fill="none"><path d="M48 46H20a11 11 0 0 1-1.8-21.8A15 15 0 0 1 47 27.5 10 10 0 0 1 48 46z" fill="#64748b"/></svg>'
      };
    } else if (code >= 45 && code <= 48) {
      return {
        text: 'Niebla / Neblina',
        svg: '<svg viewBox="0 0 64 64" width="76" height="76" fill="none"><path d="M16 30h32M10 40h44M18 50h28" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/></svg>'
      };
    } else if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
      return {
        text: code >= 63 ? 'Lluvia' : 'Llovizna',
        svg: '<svg viewBox="0 0 64 64" width="76" height="76" fill="none"><path d="M46 38H22a10 10 0 0 1-1.6-19.8A14 14 0 0 1 47 23.5 9 9 0 0 1 46 38z" fill="#64748b"/><path d="M22 45l-2 7m11-7l-2 7m11-7l-2 7m11-7l-2 7" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/></svg>'
      };
    } else if (code >= 95) {
      return {
        text: 'Tormenta eléctrica',
        svg: '<svg viewBox="0 0 64 64" width="76" height="76" fill="none"><path d="M46 36H22a10 10 0 0 1-1.6-19.8A14 14 0 0 1 47 21.5 9 9 0 0 1 46 36z" fill="#475569"/><path d="M31 38l-4 9h7l-3 9 10-11h-7l4-7h-7z" fill="#fbbf24"/></svg>'
      };
    }
    return {
      text: 'Nuboso',
      svg: '<svg viewBox="0 0 64 64" width="76" height="76" fill="none"><path d="M48 46H20a11 11 0 0 1-1.8-21.8A15 15 0 0 1 47 27.5 10 10 0 0 1 48 46z" fill="#94a3b8"/></svg>'
    };
  }

  function fetchWeather() {
    if (isRemoteMode) return;
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + LAT_TEMUCO +
      '&longitude=' + LON_TEMUCO +
      '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSantiago';

    fetch(url)
      .then(function(res) {
        if (!res.ok) throw new Error('Error al conectar con Open-Meteo');
        return res.json();
      })
      .then(function(data) {
        if (!data || !data.current) return;

        const current = data.current;
        const daily = data.daily;

        elTemp.textContent = Math.round(current.temperature_2m);
        elApparent.textContent = Math.round(current.apparent_temperature);
        elHumidity.textContent = Math.round(current.relative_humidity_2m) + '%';
        elWind.textContent = Math.round(current.wind_speed_10m) + ' km/h';

        if (daily && daily.temperature_2m_min && daily.temperature_2m_max) {
          const min = Math.round(daily.temperature_2m_min[0]);
          const max = Math.round(daily.temperature_2m_max[0]);
          elMinMax.textContent = min + '° / ' + max + '°';
        }

        const info = getWeatherDescAndIcon(current.weather_code, current.is_day);
        elDesc.textContent = info.text;
        elIcon.innerHTML = info.svg;

        if (daily && daily.time && daily.time.length > 3) {
          let html = '';
          for (let i = 1; i <= 3; i++) {
            const dateStr = daily.time[i];
            const d = new Date(dateStr + 'T12:00:00');
            const dayName = diasSemana[d.getDay()].substring(0, 3);
            const dayMax = Math.round(daily.temperature_2m_max[i]);
            const dayMin = Math.round(daily.temperature_2m_min[i]);

            html += '<div class="forecast-day">' +
              '<div class="forecast-day-name">' + dayName + '</div>' +
              '<div class="forecast-temp">' + dayMax + '° / <span style="color:#94a3b8;">' + dayMin + '°</span></div>' +
              '</div>';
          }
          elForecast.innerHTML = html;
        }

        const now = new Date();
        elUpdateTime.textContent = 'Actualizado ' + pad2(now.getHours()) + ':' + pad2(now.getMinutes());
      })
      .catch(function(err) {
        console.error('Clima error:', err);
        elDesc.textContent = 'Sin conexión';
      });
  }

  fetchWeather();
  setInterval(fetchWeather, 15 * 60 * 1000);

  // ==========================================
  // 3. REPRODUCTOR DE RADIOS EN VIVO (HTML5 NATIVO)
  // ==========================================
  const radioAudio = document.getElementById('radio-audio');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const playBtnLabel = document.getElementById('play-btn-label');
  const streamStatus = document.getElementById('stream-status');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');
  const radioDisc = document.querySelector('.radio-disc-icon');
  const soundWave = document.getElementById('sound-wave');
  const stationCards = document.querySelectorAll('#dashboard-view .station-card');

  let currentStationId = 'adn';
  let currentUrl = STATIONS.adn.url;
  let currentName = STATIONS.adn.name;
  let currentSub = STATIONS.adn.sub;
  let isPlaying = false;
  let audioUnlocked = false;
  let lastStatusText = 'Listo';

  // Desbloqueo silencioso para permitir reproducción remota en iOS Safari
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
            streamStatus.style.color = '#34d399';
            publishState();
          }
        }).catch(function() {});
      }
    } catch (e) {}
  }

  document.addEventListener('touchstart', function(e) {
    if (isRemoteMode) return;
    if (e.target && (e.target.closest('#btn-play-pause') || e.target.closest('.station-card'))) {
      return;
    }
    unlockAudioSilently();
  }, { passive: true });

  function setPlayingState(playing, customStatus) {
    isPlaying = playing;
    if (playing) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline-block';
      playBtnLabel.textContent = 'Pausar';
      btnPlayPause.classList.add('playing');
      lastStatusText = customStatus || 'En vivo';
      streamStatus.textContent = lastStatusText;
      streamStatus.style.color = '#34d399';
      if (radioDisc) radioDisc.classList.add('playing');
      if (soundWave) soundWave.classList.remove('paused');
    } else {
      playIcon.style.display = 'inline-block';
      pauseIcon.style.display = 'none';
      playBtnLabel.textContent = 'Reproducir';
      btnPlayPause.classList.remove('playing');
      lastStatusText = customStatus || 'En pausa';
      streamStatus.textContent = lastStatusText;
      streamStatus.style.color = customStatus && customStatus.indexOf('Toca') !== -1 ? '#fbbf24' : '#9ca3af';
      if (radioDisc) radioDisc.classList.remove('playing');
      if (soundWave) soundWave.classList.add('paused');
    }
  }

  function selectStationById(stationId) {
    const st = STATIONS[stationId];
    if (!st) return false;

    currentStationId = st.id;
    currentUrl = st.url;
    currentName = st.name;
    currentSub = st.sub;

    stationCards.forEach(function(c) {
      if (c.getAttribute('data-id') === stationId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    trackTitle.textContent = currentName;
    trackArtist.textContent = currentSub;
    return true;
  }

  function startStream(fromRemote) {
    if (!fromRemote) {
      audioUnlocked = true;
    }
    lastStatusText = 'Conectando...';
    streamStatus.textContent = lastStatusText;
    streamStatus.style.color = '#60a5fa';
    publishState();

    radioAudio.src = currentUrl;
    radioAudio.load();
    const playPromise = radioAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        audioUnlocked = true;
        setPlayingState(true, 'En vivo');
        publishState();
      }).catch(function(err) {
        console.error('Error al reproducir radio:', err);
        const msg = String(err || '');
        const isAutoplayBlock = (err && err.name === 'NotAllowedError') ||
          msg.indexOf('not allowed') !== -1 ||
          msg.indexOf('gesture') !== -1;

        if (fromRemote && isAutoplayBlock) {
          setPlayingState(false, '⚠️ Toca la pantalla del iPad 1 vez para activar audio');
        } else {
          setPlayingState(false, 'Error · Reintentar');
        }
        publishState();
      });
    } else {
      setPlayingState(true, 'En vivo');
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

  stationCards.forEach(function(card) {
    card.addEventListener('click', function() {
      const id = card.getAttribute('data-id');
      audioUnlocked = true;
      selectStationById(id);

      if (isPlaying) {
        startStream(false);
      } else {
        lastStatusText = 'Listo para escuchar';
        streamStatus.textContent = lastStatusText;
        streamStatus.style.color = '#60a5fa';
        publishState();
      }
    });
  });

  radioAudio.addEventListener('playing', function() {
    if (!isPlaying || lastStatusText !== 'En vivo') {
      setPlayingState(true, 'En vivo');
      publishState();
    }
  });

  radioAudio.addEventListener('waiting', function() {
    if (isPlaying) {
      lastStatusText = 'Cargando buffer...';
      streamStatus.textContent = lastStatusText;
    }
  });

  radioAudio.addEventListener('error', function() {
    if (radioAudio.getAttribute('src') && radioAudio.getAttribute('src').indexOf('http') === 0) {
      setPlayingState(false, 'Stream no disponible');
      publishState();
    }
  });

  // ==========================================
  // 4. HOGAR INTELIGENTE (TILES INTERACTIVOS)
  // ==========================================
  const deviceTiles = document.querySelectorAll('#dashboard-view .device-tile');
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
    const active = document.querySelectorAll('#dashboard-view .device-tile.on').length;
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
        const stateEl = tile.querySelector('.tile-state');
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
  // 5. SMART CONNECT (CONTROL REMOTO ESTILO SPOTIFY CONNECT)
  // ==========================================
  let syncEventSource = null;
  let lastPublishTime = 0;

  function getTopicName() {
    return 'smartwall-temuco-v1-' + activeRoomId;
  }

  function setSyncDotColor(color, glow) {
    const dot = isRemoteMode
      ? document.getElementById('remote-sync-dot')
      : document.getElementById('sync-dot');
    if (dot) {
      dot.style.backgroundColor = color;
      dot.style.boxShadow = '0 0 10px ' + glow;
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
    lastPublishTime = Date.now();
    sendSyncPayload({
      type: 'state',
      stationId: currentStationId,
      stationName: currentName,
      stationSub: currentSub,
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
      if (selectStationById(msg.stationId)) {
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

  // Elementos Vista Remota
  const elDashboardView = document.getElementById('dashboard-view');
  const elRemoteView = document.getElementById('remote-view');
  const elRemoteRoomLabel = document.getElementById('remote-room-label');
  const elRemoteTrackTitle = document.getElementById('remote-track-title');
  const elRemoteTrackStatus = document.getElementById('remote-track-status');
  const elRemotePlayBtn = document.getElementById('remote-btn-play');
  const elRemotePlayLabel = document.getElementById('remote-play-label');
  const remoteStationBtns = document.querySelectorAll('.remote-station');
  const remoteDeviceTiles = document.querySelectorAll('.remote-device');

  function applyStateToRemoteUI(state) {
    if (!state) return;
    if (state.stationName) {
      elRemoteTrackTitle.textContent = state.stationName;
    }
    if (state.status) {
      elRemoteTrackStatus.textContent = state.status + (state.stationSub ? ' · ' + state.stationSub : '');
      elRemoteTrackStatus.style.color = state.isPlaying ? '#34d399' : '#fbbf24';
    }
    if (state.isPlaying) {
      elRemotePlayBtn.classList.add('playing');
      elRemotePlayLabel.textContent = '⏸ Pausar en iPad';
    } else {
      elRemotePlayBtn.classList.remove('playing');
      elRemotePlayLabel.textContent = '▶ Reproducir en iPad';
    }

    if (state.stationId) {
      remoteStationBtns.forEach(function(btn) {
        if (btn.getAttribute('data-id') === state.stationId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    if (state.devices) {
      remoteDeviceTiles.forEach(function(tile) {
        const devId = tile.getAttribute('data-device');
        const isOn = Boolean(state.devices[devId]);
        if (isOn) {
          tile.classList.add('on');
        } else {
          tile.classList.remove('on');
        }
        const stEl = tile.querySelector('.tile-state');
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
      setSyncDotColor('#10b981', 'rgba(16, 185, 129, 0.8)');
      if (isRemoteMode) {
        sendSyncPayload({ type: 'cmd', action: 'get_state' });
      }
    };

    syncEventSource.onerror = function() {
      setSyncDotColor('#f59e0b', 'rgba(245, 158, 11, 0.8)');
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
      } catch (e) {
        // Ignorar mensajes no JSON
      }
    };
  }

  // Watchdog para mantener viva la conexión SSE si el Wi-Fi micro-corta
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

  // Botones de la Vista Remota (Celular/PC)
  remoteStationBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const stationId = btn.getAttribute('data-id');
      const st = STATIONS[stationId];
      if (st) {
        elRemoteTrackTitle.textContent = st.name;
        elRemoteTrackStatus.textContent = 'Enviando orden al iPad...';
        elRemoteTrackStatus.style.color = '#60a5fa';
      }
      sendSyncPayload({ type: 'cmd', action: 'play_station', stationId: stationId });
    });
  });

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
  // 6. MODALES (BLUETOOTH & CONTROL REMOTO)
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
    elConnectQrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(remoteUrl);
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
    const entered = window.prompt('Ingresa el código que aparece en el iPad de la pared:', savedRemote);
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

  [modalBluetooth, modalConnect].forEach(function(modal) {
    if (!modal) return;
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // ==========================================
  // 7. BOTÓN RECARGAR & PANTALLA COMPLETA
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

  // Iniciar en modo correspondiente
  if (isRemoteMode) {
    enterRemoteMode(activeRoomId);
  } else {
    connectSync();
  }

})();
