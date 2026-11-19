/**
 * Bot de consultas - Soluciones Digitales (Claudia)
 * -------------------------------------------------
 * Responde únicamente con información verificada del sitio.
 * Si no conoce un dato, lo aclara y deriva a WhatsApp o correo.
 */
(function () {
    const CONFIG = {
        nombreBot: 'Asistente Virtual',
        subtitulo: 'Soluciones Digitales',
        whatsappNumero: '5493476582815',
        whatsappMostrar: '347 658 2815',
        email: 'cbammatter@gmail.com',
        bienvenida:
            '¡Hola! Soy el asistente de Soluciones Digitales. Te ayudo con consultas rápidas sobre el servicio de Claudia. Elegí una opción o escribime tu pregunta:',
        sugerenciasIniciales: [
            '¿De qué se trata?',
            '¿Qué servicios ofrecés?',
            'Turneros por WhatsApp',
            '¿Para quién es?',
            '¿Cómo te contacto?'
        ]
    };

    /**
     * Base de conocimiento (100% basada en el contenido actual de la página).
     * Podés editar o agregar nuevas entradas acá fácilmente.
     */
    const BASE_CONOCIMIENTO = [
        {
            id: 'de_que_se_trata',
            keywords: [
                'de que se trata',
                'que haces',
                'que hace',
                'que es',
                'como funciona',
                'en que consiste',
                'explicame',
                'informacion',
                'info',
                'servicio',
                'propuesta'
            ],
            peso: 1,
            respuesta:
                'Transformo tu empresa, negocio o profesión con sistemas sencillos y 100% a medida para facilitar tu día a día con tecnología, ahorrarte tareas manuales y ayudarte a generar más dinero en menos tiempo.',
            sugerencias: ['¿Qué servicios ofrecés?', '¿Para quién es?', '¿Cómo te contacto?']
        },
        {
            id: 'servicios',
            keywords: [
                'servicios',
                'que servicios',
                'ofreces',
                'ofrece',
                'brindas',
                'que hacen',
                'pilares',
                'areas'
            ],
            peso: 2,
            respuesta:
                'Trabajo en 5 áreas principales:\n• Gestión y organización de archivos\n• Automatización de procesos\n• Asesoramiento en herramientas digitales\n• Ideas y soluciones a medida\n• Turneros autogestionados conectados con WhatsApp\n\n¿Sobre cuál querés saber más?',
            sugerencias: [
                'Turneros por WhatsApp',
                'Organización de archivos',
                'Automatización',
                'Asesoramiento digital',
                'Soluciones a medida'
            ]
        },
        {
            id: 'turneros',
            keywords: [
                'turnero',
                'turneros',
                'turno',
                'turnos',
                'turneros por whatsapp',
                'turnero whatsapp',
                'turnos whatsapp',
                'agenda',
                'agendar',
                'autogestionado',
                'autogestionados',
                'autogestion',
                'citas',
                'cita',
                'reservas',
                'reserva',
                'pacientes'
            ],
            peso: 5,
            respuesta:
                'Tus clientes o pacientes te mandan un mensaje por WhatsApp y con las indicaciones le otorga el turno libre que disponga tu agenda.',
            sugerencias: ['¿Qué servicios ofrecés?', '¿Cómo te contacto?'],
            mostrarWhatsApp: true
        },
        {
            id: 'archivos',
            keywords: [
                'archivo',
                'archivos',
                'organizacion',
                'organizar',
                'gestion de archivos',
                'carpetas',
                'documentos'
            ],
            peso: 3,
            respuesta:
                'Ayudo con la gestión y organización de archivos para simplificar tu trabajo diario y evitar tareas manuales innecesarias. Para ver tu caso puntual, podés escribirle directo a Claudia.',
            sugerencias: ['Automatización', '¿Cómo te contacto?'],
            mostrarWhatsApp: true
        },
        {
            id: 'automatizacion',
            keywords: [
                'automatizacion',
                'automatizar',
                'automatizas',
                'automatiza',
                'automatizar whatsapp',
                'mensajes de whatsapp',
                'procesos',
                'automatico',
                'automaticos',
                'emails',
                'correos',
                'mensajes',
                'responder mensajes',
                'manual',
                'a mano'
            ],
            peso: 3,
            respuesta:
                'Automatizo procesos repetitivos —como completar documentos extensos, escribir emails o responder mensajes de WhatsApp a mano— mediante sistemas sencillos armados a tu medida.',
            sugerencias: ['Soluciones a medida', '¿Cómo te contacto?'],
            mostrarWhatsApp: true
        },
        {
            id: 'asesoramiento',
            keywords: [
                'asesoramiento',
                'asesoria',
                'herramientas',
                'herramientas digitales',
                'tecnologia',
                'aconsejar',
                'capacitacion'
            ],
            peso: 3,
            respuesta:
                'Brindo asesoramiento en herramientas digitales para que aproveches la tecnología en tu día a día. Si querés consultar por una herramienta específica, escribime por WhatsApp.',
            sugerencias: ['Soluciones a medida', '¿Cómo te contacto?'],
            mostrarWhatsApp: true
        },
        {
            id: 'a_medida',
            keywords: [
                'a medida',
                'soluciones a medida',
                'ideas',
                'personalizado',
                'personalizada',
                'sistema',
                'sistemas'
            ],
            peso: 3,
            respuesta:
                'Diseño ideas y sistemas sencillos armados 100% a medida según las necesidades de tu empresa, negocio o profesión.',
            sugerencias: ['¿Para quién es?', '¿Cómo te contacto?'],
            mostrarWhatsApp: true
        },
        {
            id: 'para_quien',
            keywords: [
                'para quien',
                'quienes',
                'empresa',
                'empresas',
                'negocio',
                'negocios',
                'profesion',
                'profesionales',
                'emprendedor',
                'pyme',
                'sirve'
            ],
            peso: 2,
            respuesta:
                'El servicio está pensado para empresas, negocios y profesionales que quieren ahorrar tiempo y optimizar su trabajo diario con sistemas a medida.',
            sugerencias: ['¿Qué servicios ofrecés?', '¿Cómo te contacto?']
        },
        {
            id: 'quien_es',
            keywords: ['claudia', 'bammatter', 'quien sos', 'quien eres', 'quien esta detras'],
            peso: 2,
            respuesta:
                'Soy el asistente virtual de Claudia Bammatter, creadora de Soluciones Digitales. Te ayudo con dudas rápidas y, para tu proyecto, podés hablar directo con ella.',
            sugerencias: ['¿De qué se trata?', '¿Cómo te contacto?']
        },
        {
            id: 'contacto',
            keywords: [
                'contacto',
                'contactar',
                'contactame',
                'telefono',
                'numero',
                'whatsapp',
                'wsp',
                'wpp',
                'mail',
                'email',
                'correo',
                'instagram',
                'facebook',
                'redes',
                'escribir',
                'hablar'
            ],
            peso: 2,
            respuesta:
                'Podés contactar a Claudia por:\n• WhatsApp: 347 658 2815\n• Correo: cbammatter@gmail.com\n• Instagram: @solu.cionesdigitales y @claudiabammatter\n• Facebook: Claudia Bammatter',
            sugerencias: ['¿Qué servicios ofrecés?'],
            mostrarWhatsApp: true,
            mostrarEmail: true
        },
        {
            id: 'precios',
            keywords: [
                'precio',
                'precios',
                'costo',
                'costos',
                'cuanto sale',
                'cuanto cuesta',
                'cuanto cobras',
                'tarifa',
                'tarifas',
                'presupuesto',
                'valor',
                'pago',
                'planes'
            ],
            peso: 8,
            respuesta:
                'No tengo precios publicados acá porque cada solución se arma a medida. Escribile a Claudia por WhatsApp para pedir tu presupuesto.',
            sugerencias: ['¿Qué servicios ofrecés?', '¿Cómo te contacto?'],
            mostrarWhatsApp: true,
            usarPreguntaEnWhatsApp: true
        },
        {
            id: 'datos_no_cargados',
            keywords: [
                'horario',
                'horarios',
                'hora',
                'cuando atienden',
                'dias',
                'ubicacion',
                'donde estan',
                'direccion',
                'ciudad',
                'presencial',
                'online',
                'remoto',
                'cuanto tarda',
                'demora',
                'plazo',
                'tiempo de entrega'
            ],
            peso: 8,
            respuesta:
                'No tengo ese dato cargado en la web y prefiero no inventarlo. Podés consultárselo directamente a Claudia por WhatsApp o correo.',
            sugerencias: ['¿Qué servicios ofrecés?', '¿Cómo te contacto?'],
            mostrarWhatsApp: true,
            mostrarEmail: true,
            usarPreguntaEnWhatsApp: true
        },
        {
            id: 'saludo',
            keywords: ['hola', 'buenas', 'buen dia', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'saludos'],
            peso: 1,
            soloSiCorto: true,
            respuesta:
                '¡Hola! ¿En qué te puedo ayudar hoy? Elegí una opción rápida o escribime tu consulta sobre Soluciones Digitales.',
            sugerencias: CONFIG.sugerenciasIniciales
        },
        {
            id: 'despedida',
            keywords: ['gracias', 'muchas gracias', 'genial', 'perfecto', 'chau', 'adios', 'hasta luego', 'listo'],
            peso: 1,
            soloSiCorto: true,
            respuesta:
                '¡De nada! Si necesitás algo más, acá estoy. También podés escribirle directo a Claudia por WhatsApp cuando quieras.',
            mostrarWhatsApp: true
        }
    ];

    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[¿?¡!.,;:()"]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function buscarRespuesta(preguntaUsuario) {
        const textoNorm = normalizar(preguntaUsuario);
        if (!textoNorm) return null;

        const palabras = textoNorm.split(' ');
        let mejorCoincidencia = null;
        let mejorPuntaje = 0;

        for (const entrada of BASE_CONOCIMIENTO) {
            if (entrada.soloSiCorto && palabras.length > 5) continue;

            let puntaje = 0;
            for (const kw of entrada.keywords) {
                const kwNorm = normalizar(kw);
                // Coincidencia exacta de frase o palabra completa
                const regex = new RegExp(`(^|\\s)${kwNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$)`);
                if (regex.test(textoNorm)) {
                    puntaje += (kwNorm.split(' ').length * 2) + (entrada.peso || 1);
                } else if (kwNorm.length >= 5 && textoNorm.includes(kwNorm)) {
                    puntaje += 1 + (entrada.peso || 1) * 0.5;
                }
            }

            if (puntaje > mejorPuntaje) {
                mejorPuntaje = puntaje;
                mejorCoincidencia = entrada;
            }
        }

        if (mejorCoincidencia && mejorPuntaje > 0) {
            return mejorCoincidencia;
        }

        // Respuesta honesta cuando no sabe (no inventa)
        return {
            id: 'desconocida',
            respuesta:
                'No tengo esa información acá y prefiero no inventarla. Podés hacerle esa consulta directo a Claudia por WhatsApp o correo.',
            sugerencias: ['¿De qué se trata?', '¿Qué servicios ofrecés?', '¿Cómo te contacto?'],
            mostrarWhatsApp: true,
            mostrarEmail: true,
            usarPreguntaEnWhatsApp: true
        };
    }

    function construirUrlWhatsApp(texto) {
        const base = `https://wa.me/${CONFIG.whatsappNumero}`;
        if (!texto) return base;
        return `${base}?text=${encodeURIComponent(texto)}`;
    }

    function crearEstilos() {
        const style = document.createElement('style');
        style.textContent = `
            #sd-bot-widget {
                font-family: 'Montserrat', sans-serif;
            }
            #sd-bot-panel {
                background: rgba(10, 34, 50, 0.96);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(212, 175, 55, 0.45);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
                transform-origin: bottom right;
                transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease;
            }
            #sd-bot-panel.sd-closed {
                opacity: 0;
                transform: translateY(14px) scale(0.95);
                visibility: hidden;
                pointer-events: none;
            }
            #sd-bot-messages::-webkit-scrollbar {
                width: 6px;
            }
            #sd-bot-messages::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.04);
            }
            #sd-bot-messages::-webkit-scrollbar-thumb {
                background: rgba(34, 211, 238, 0.35);
                border-radius: 9999px;
            }
            @keyframes sd-bounce {
                0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                40% { transform: scale(1); opacity: 1; }
            }
            .sd-dot {
                animation: sd-bounce 1.1s infinite ease-in-out both;
            }
            .sd-dot:nth-child(2) { animation-delay: 0.16s; }
            .sd-dot:nth-child(3) { animation-delay: 0.32s; }
        `;
        document.head.appendChild(style);
    }

    function montarWidget() {
        crearEstilos();

        const container = document.createElement('div');
        container.id = 'sd-bot-widget';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col items-end';

        container.innerHTML = `
            <!-- Ventana del Chat -->
            <section
                id="sd-bot-panel"
                role="dialog"
                aria-label="Asistente de consultas de Soluciones Digitales"
                aria-hidden="true"
                class="sd-closed mb-3 w-[calc(100vw-2.5rem)] sm:w-[370px] max-h-[75vh] rounded-2xl flex flex-col overflow-hidden text-white"
            >
                <!-- Header -->
                <div class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-900/80 to-slate-900/90 border-b border-white/15">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="relative w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/70 flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900"></span>
                        </div>
                        <div class="min-w-0">
                            <p class="text-sm font-semibold text-white truncate">${CONFIG.nombreBot}</p>
                            <p class="text-xs text-cyan-200/90 truncate">${CONFIG.subtitulo} · Respuestas breves</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 shrink-0">
                        <button
                            id="sd-bot-reset"
                            type="button"
                            title="Reiniciar conversación"
                            aria-label="Reiniciar conversación"
                            class="p-1.5 rounded-lg text-cyan-200/80 hover:text-white hover:bg-white/10 transition"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </button>
                        <button
                            id="sd-bot-close"
                            type="button"
                            title="Cerrar chat"
                            aria-label="Cerrar chat"
                            class="p-1.5 rounded-lg text-cyan-200/80 hover:text-white hover:bg-white/10 transition"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mensajes -->
                <div
                    id="sd-bot-messages"
                    aria-live="polite"
                    class="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px] max-h-[420px]"
                ></div>

                <!-- Sugerencias rápidas -->
                <div id="sd-bot-chips" class="px-3 pb-2 pt-1 flex flex-wrap gap-1.5 border-t border-white/10 bg-slate-950/30"></div>

                <!-- Formulario -->
                <form id="sd-bot-form" class="p-3 border-t border-white/15 bg-slate-950/60 flex items-center gap-2">
                    <input
                        id="sd-bot-input"
                        type="text"
                        autocomplete="off"
                        maxlength="240"
                        placeholder="Escribí tu consulta..."
                        aria-label="Escribí tu consulta"
                        class="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder-cyan-200/60 focus:outline-none focus:border-cyan-400 transition"
                    />
                    <button
                        type="submit"
                        aria-label="Enviar consulta"
                        class="w-9 h-9 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 flex items-center justify-center hover:brightness-110 active:scale-95 transition shrink-0 shadow-md"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </form>
            </section>

            <!-- Botón flotante -->
            <button
                id="sd-bot-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="sd-bot-panel"
                class="group flex items-center gap-2.5 rounded-full bg-[#0d2b3e]/95 border border-[#d4af37] text-white px-4 py-3 shadow-2xl hover:bg-[#133b54] active:scale-95 transition-all duration-200"
            >
                <span class="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 shadow-md">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    <span class="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-orange-400"></span>
                    </span>
                </span>
                <span class="text-left pr-1">
                    <span class="block text-xs text-cyan-200 leading-tight">¿Tenés dudas?</span>
                    <span class="block text-sm font-semibold text-[#f3d27a] leading-tight">Consultame</span>
                </span>
            </button>
        `;

        document.body.appendChild(container);

        const panel = document.getElementById('sd-bot-panel');
        const toggleBtn = document.getElementById('sd-bot-toggle');
        const closeBtn = document.getElementById('sd-bot-close');
        const resetBtn = document.getElementById('sd-bot-reset');
        const messagesEl = document.getElementById('sd-bot-messages');
        const chipsEl = document.getElementById('sd-bot-chips');
        const form = document.getElementById('sd-bot-form');
        const input = document.getElementById('sd-bot-input');

        let abierto = false;
        let iniciado = false;

        function scrollAlFinal() {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        function agregarMensajeUsuario(texto) {
            const wrapper = document.createElement('div');
            wrapper.className = 'flex justify-end';

            const bubble = document.createElement('div');
            bubble.className =
                'max-w-[82%] rounded-2xl rounded-br-sm bg-gradient-to-r from-cyan-600/80 to-teal-600/80 border border-cyan-300/30 px-3.5 py-2.5 text-sm text-white leading-relaxed shadow';
            bubble.textContent = texto;

            wrapper.appendChild(bubble);
            messagesEl.appendChild(wrapper);
            scrollAlFinal();
        }

        function agregarMensajeBot(texto, opciones = {}) {
            const wrapper = document.createElement('div');
            wrapper.className = 'flex flex-col items-start gap-2';

            const bubble = document.createElement('div');
            bubble.className =
                'max-w-[88%] rounded-2xl rounded-bl-sm bg-white/10 border border-white/15 px-3.5 py-2.5 text-sm text-cyan-50 leading-relaxed whitespace-pre-line shadow';
            bubble.textContent = texto;

            wrapper.appendChild(bubble);

            if (opciones.mostrarWhatsApp || opciones.mostrarEmail) {
                const actions = document.createElement('div');
                actions.className = 'flex flex-wrap gap-2';

                if (opciones.mostrarWhatsApp) {
                    const waLink = document.createElement('a');
                    waLink.href = construirUrlWhatsApp(opciones.textoWhatsApp);
                    waLink.target = '_blank';
                    waLink.rel = 'noopener noreferrer';
                    waLink.className =
                        'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-600/90 hover:bg-green-500 text-white transition shadow';
                    waLink.innerHTML =
                        '<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg><span>Escribir por WhatsApp</span>';
                    actions.appendChild(waLink);
                }

                if (opciones.mostrarEmail) {
                    const mailLink = document.createElement('a');
                    mailLink.href = `mailto:${CONFIG.email}`;
                    mailLink.className =
                        'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-600/90 hover:bg-amber-500 text-white transition shadow';
                    mailLink.textContent = 'Enviar correo';
                    actions.appendChild(mailLink);
                }

                wrapper.appendChild(actions);
            }

            messagesEl.appendChild(wrapper);
            scrollAlFinal();
        }

        function mostrarIndicadorEscritura() {
            const wrapper = document.createElement('div');
            wrapper.id = 'sd-bot-typing';
            wrapper.className = 'flex justify-start';
            wrapper.innerHTML = `
                <div class="rounded-2xl rounded-bl-sm bg-white/10 border border-white/15 px-3.5 py-2.5 flex items-center gap-1.5">
                    <span class="sd-dot w-1.5 h-1.5 rounded-full bg-cyan-300"></span>
                    <span class="sd-dot w-1.5 h-1.5 rounded-full bg-cyan-300"></span>
                    <span class="sd-dot w-1.5 h-1.5 rounded-full bg-cyan-300"></span>
                </div>
            `;
            messagesEl.appendChild(wrapper);
            scrollAlFinal();
        }

        function ocultarIndicadorEscritura() {
            const el = document.getElementById('sd-bot-typing');
            if (el) el.remove();
        }

        function renderizarSugerencias(lista) {
            chipsEl.innerHTML = '';
            const items = lista && lista.length ? lista : CONFIG.sugerenciasIniciales;
            items.forEach((texto) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className =
                    'text-xs px-2.5 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/25 hover:border-cyan-300 transition';
                btn.textContent = texto;
                btn.addEventListener('click', () => procesarConsulta(texto));
                chipsEl.appendChild(btn);
            });
        }

        function procesarConsulta(textoRaw) {
            const texto = textoRaw.trim();
            if (!texto) return;

            agregarMensajeUsuario(texto);
            input.value = '';
            mostrarIndicadorEscritura();

            setTimeout(() => {
                ocultarIndicadorEscritura();
                const resultado = buscarRespuesta(texto);
                if (!resultado) return;

                let textoWhatsApp = resultado.textoWhatsApp || '';
                if (resultado.usarPreguntaEnWhatsApp) {
                    textoWhatsApp = `Hola Claudia, te escribo desde la web con esta consulta: "${texto}"`;
                }

                agregarMensajeBot(resultado.respuesta, {
                    mostrarWhatsApp: Boolean(resultado.mostrarWhatsApp),
                    mostrarEmail: Boolean(resultado.mostrarEmail),
                    textoWhatsApp
                });
                renderizarSugerencias(resultado.sugerencias);
            }, 320);
        }

        function iniciarConversacion() {
            messagesEl.innerHTML = '';
            agregarMensajeBot(CONFIG.bienvenida);
            renderizarSugerencias(CONFIG.sugerenciasIniciales);
            iniciado = true;
        }

        function alternarChat(forzarEstado) {
            abierto = typeof forzarEstado === 'boolean' ? forzarEstado : !abierto;
            panel.classList.toggle('sd-closed', !abierto);
            panel.setAttribute('aria-hidden', String(!abierto));
            toggleBtn.setAttribute('aria-expanded', String(abierto));

            if (abierto) {
                if (!iniciado) iniciarConversacion();
                setTimeout(() => input.focus(), 200);
            }
        }

        toggleBtn.addEventListener('click', () => alternarChat());
        closeBtn.addEventListener('click', () => alternarChat(false));
        resetBtn.addEventListener('click', () => {
            iniciarConversacion();
            input.focus();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            procesarConsulta(input.value);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && abierto) alternarChat(false);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', montarWidget);
    } else {
        montarWidget();
    }
})();
