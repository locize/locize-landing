(function() {
  const im = window.iframemanager();
  im.run({
    onChange: function (opt) {
      if (opt.eventSource.type === 'click') {
        window.CookieConsent.acceptService(
          [
            window.CookieConsent.getUserPreferences().acceptedServices.analytics,
            opt.changedServices
          ],
          'analytics'
        );
      }
    },
    services: {
      youtube: {
        embedUrl: 'https://www.youtube-nocookie.com/embed/{data-id}',
        thumbnailUrl: 'https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg',
        iframe: {
          allow: 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
        },
        languages: {
          en : {
            notice: 'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Terms and conditions" target="_blank">terms and conditions</a> of youtube.com.',
            loadBtn: 'Load video',
            loadAllBtn: 'Don\'t ask again'
          },
          de : {
            notice: 'Dieser Inhalt wird von einem Drittanbieter gehostet. Indem Sie den externen Inhalt anzeigen, akzeptieren Sie die <a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Nutzungsbedingungen" target="_blank">Nutzungsbedingungen</a> von youtube.com.',
            loadBtn: 'Video laden',
            loadAllBtn: 'Nicht nochmal fragen'
          },
          it : {
            notice: 'Questo contenuto è ospitato da una terza parte. Mostrando il contenuto esterno accetti i <a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Termini e condizioni" target="_blank">termini e condizioni</a> di youtube.com.',
            loadBtn: 'Carica video',
            loadAllBtn: 'Non chiedere più'
          }
        }
      }
    },
    autoLang: true,
    //- currLang: 'en'
  });

  function loadGoogleTagManagerScript() {
    if (window.gtmScriptLoaded) return;
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = "https://www.googletagmanager.com/gtag/js?id=G-X50E21BGKG";
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(e, a);
    gtag('js', new Date());
    gtag('config', 'G-X50E21BGKG', { 'anonymize_ip': true });
    //- gtag('config', 'UA-78143856-1', { 'anonymize_ip': true });
    window.gtmScriptLoaded = true;
  }

  function extraCheck (d) {
    if (d.cookie.services && d.cookie.services.analytics && d.cookie.services.analytics.indexOf('youtube') > -1) {
      if (typeof window.enableYoutubeHook === 'function') window.enableYoutubeHook();
    } else {
      if (typeof window.disableYoutubeHook === 'function') window.disableYoutubeHook();
    }
  }

  window.locizify.i18next.on('languageChanged', function(lng) {
    CookieConsent.setLanguage(lng);
  });

  window.CookieConsent.run({
    cookie: {
      name: 'cc_cookie_locize',
    },
    guiOptions: {
      consentModal: {
        layout: "box inline",
        position: "bottom",
        equalWeightButtons: false,
        flipButtons: true
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: false,
        flipButtons: true
      }
    },
    onConsent: extraCheck,
    onChange: extraCheck,
    categories: {
      necessary: {
        readOnly: true,
        enabled: true
      },
      analytics: {
        autoClear: {
          cookies: [
            { name: /^(_ga|_gid|im_)/ }
          ]
        },
        services: {
          youtube: {
            label: 'Youtube Embed',
            onAccept: function () {
              im.acceptService('youtube');
            },
            onReject: function () {
              im.rejectService('youtube');
            }
          },
          ga: {
            label: 'Google Analytics',
            onAccept: function () { loadGoogleTagManagerScript(); },
            onReject: function () {},
            cookies: [
              { name: /^(_ga|_gid)/ }
            ]
          },
        }
      },
    },
    language: {
        default: 'en',
        autoDetect: false,
        translations: {
          en: {
            consentModal: {
              title: "Hello 👋! We value your privacy.",
              description: "This website uses cookies to ensure you get the best experience on our website.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage preferences",
              footer: "<a href=\"/privacy.html\">Privacy Policy</a>\n<a href=\"/terms.html\">Terms and Conditions</a>"
            },
            preferencesModal: {
              title: "Customize Consent Preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close modal",
              serviceCounterLabel: "Service|Services",
              sections: [
                {
                  //- title: "Cookie Usage",
                  description: "We use cookies to support navigation and functionality. \"Necessary\" cookies, like remembering your consent decision, are essential and stored automatically. Third-party cookies analyze usage, save preferences, and personalize content, requiring your consent. You can enable or disable cookies, but this may affect your browsing experience."
                },
                {
                  title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                  description: "Necessary cookies are required to enable the basic features of this site, such as adjusting your consent preferences. These cookies do not store any personally identifiable data.",
                  linkedCategory: "necessary"
                },
                //- {
                //-   title: "Functionality Cookies",
                //-   description: "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
                //-   linkedCategory: "functionality"
                //- },
                {
                  title: "Analytics Cookies",
                  description: "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
                  linkedCategory: "analytics"
                },
                {
                  title: "More information",
                  description: "For any query in relation to the policy on cookies and your choices, please <a class=\"cc__link\" href=\"mailto:support@locize.com\">contact us</a>."
                }
              ]
            }
          },
          de: {
            consentModal: {
              title: "Hallo 👋! Wir legen Wert auf Ihre Privatsphäre.",
              description: "Diese Website verwendet Cookies, um sicherzustellen, dass Sie die bestmögliche Erfahrung auf unserer Website erzielen.",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              showPreferencesBtn: "Einstellungen verwalten",
              footer: "<a href=\"/privacy.html\">Datenschutzrichtlinie</a>\n<a href=\"/terms.html\">Allgemeine Geschäftsbedingungen</a>"
            },
            preferencesModal: {
              title: "Präferenzen für die Zustimmung",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              savePreferencesBtn: "Einstellungen speichern",
              closeIconLabel: "Modal schliessen",
              serviceCounterLabel: "Dienstleistungen",
              sections: [
                {
                  //- title: "Verwendung von Cookies",
                  description: "Wir verwenden Cookies zur Unterstützung der Navigation und Funktionalität. \"Notwendige\" Cookies, wie das Speichern Ihrer Zustimmungsentscheidung, sind unerlässlich und werden automatisch gespeichert. Cookies von Drittanbietern analysieren die Nutzung, speichern Präferenzen und personalisieren Inhalte, wofür Ihre Zustimmung erforderlich ist. Sie können Cookies aktivieren oder deaktivieren, dies kann jedoch Ihr Surferlebnis beeinträchtigen."
                },
                {
                  title: "Streng Notwendige Cookies <span class=\"pm__badge\">Immer Aktiviert</span>",
                  description: "Notwendige Cookies sind erforderlich, um die grundlegenden Funktionen dieser Website zu ermöglichen, zum Beispiel die Anpassung Ihrer Einwilligungseinstellungen. Diese Cookies speichern keine personenbezogenen Daten.",
                  linkedCategory: "necessary"
                },
                //- {
                //-   title: "Funktionalitäts Cookies",
                //-   description: "Funktionale Cookies helfen dabei, bestimmte Funktionen auszuführen, wie z. B. das Teilen des Inhalts der Website auf Social-Media-Plattformen, das Sammeln von Feedback und andere Funktionen von Drittanbietern.",
                //-   linkedCategory: "functionality"
                //- },
                {
                  title: "Analytische Cookies",
                  description: "Analytische Cookies werden verwendet, um zu verstehen, wie Besucher mit der Website interagieren. Diese Cookies helfen dabei, Informationen zu Metriken wie Besucherzahl, Absprungrate, Verkehrsquelle usw. bereitzustellen.",
                  linkedCategory: "analytics"
                },
                {
                  title: "Weitere Informationen",
                  description: "Bei Fragen zu den Richtlinien zu Cookies und Ihren Auswahlmöglichkeiten <a class=\"cc__link\" href=\"mailto:support@locize.com\">kontaktieren Sie uns bitte</a>."
                }
              ]
            }
          },
          it: {
            consentModal: {
              title: "Salve 👋! Rispettiamo la sua privacy.",
              description: "Questo sito web utilizza i cookie per assicurarti la migliore esperienza sul nostro sito web.",
              acceptAllBtn: "Accetta tutto",
              acceptNecessaryBtn: "Rifiuta tutto",
              showPreferencesBtn: "Gestisci preferenze",
              footer: "<a href=\"/privacy.html\">Informativa sulla privacy</a>\n<a href=\"/terms.html\">Termini e condizioni</a>"
            },
            preferencesModal: {
              title: "Centro preferenze per il consenso",
              acceptAllBtn: "Accetta tutto",
              acceptNecessaryBtn: "Rifiuta tutto",
              savePreferencesBtn: "Salva le preferenze",
              closeIconLabel: "Chiudi la finestra",
              serviceCounterLabel: "Servizi",
              sections: [
                {
                  //- title: "Utilizzo dei Cookie",
                  description: "Utilizziamo i cookie per supportare la navigazione e la funzionalità. I ​​cookie \"necessari\", come ricordare la tua decisione di consenso, sono essenziali e memorizzati automaticamente. I cookie di terze parti analizzano l'utilizzo, salvano le preferenze e personalizzano i contenuti, richiedendo il tuo consenso. Puoi abilitare o disabilitare i cookie, ma ciò potrebbe influire sulla tua esperienza di navigazione."
                },
                {
                  title: "Cookie Strettamente Necessari <span class=\"pm__badge\">Sempre Attivati</span>",
                  description: "I cookie necessari sono richiesti per abilitare le funzionalità di base di questo sito, come la regolazione delle preferenze di consenso. Questi cookie non memorizzano dati personali identificabili.",
                  linkedCategory: "necessary"
                },
                //- {
                //-   title: "Cookie di Funzionalità",
                //-   description: "I cookie funzionali aiutano a svolgere determinate funzionalità, come la condivisione del contenuto del sito web su piattaforme di social media, la raccolta di feedback e altre funzionalità di terze parti.",
                //-   linkedCategory: "functionality"
                //- },
                {
                  title: "Cookie Analitici",
                  description: "I cookie analitici vengono utilizzati per comprendere come i visitatori interagiscono con il sito web. Questi cookie aiutano a fornire informazioni su parametri quali il numero di visitatori, il tasso di rimbalzo, la fonte di traffico, ecc.",
                  linkedCategory: "analytics"
                },
                {
                  title: "Ulteriori informazioni",
                  description: "Per qualsiasi domanda relativa alla politica sui cookie e alle vostre scelte, vi preghiamo di <a class=\"cc__link\" href=\"mailto:support@locize.com\">contattarci</a>."
                }
              ]
            }
          }
        }
    }
  });
})();