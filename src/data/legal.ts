/** Testi legali e di assistenza, ripresi dalle pagine ufficiali di flairavenue.it. */
export type LegalBlock = { t: "h2"; x: string } | { t: "p"; x: string } | { t: "ul"; x: string[] };

export interface LegalPage {
  title: string;
  lead: string;
  blocks: LegalBlock[];
}

export const RESI: LegalPage = {
  title: "Resi, rimborsi e spedizioni",
  lead: "Informazioni chiare su tempi di spedizione, diritto di recesso, resi, rimborsi e contatti assistenza per gli ordini effettuati su Flair Avenue.",
  blocks: [
    {
      t: "p",
      x: "Ultimo aggiornamento: 1 luglio 2026. Questa informativa non limita i diritti inderogabili riconosciuti al consumatore dalla normativa applicabile.",
    },
    {
      t: "h2",
      x: "Spedizioni e tempi di consegna",
    },
    {
      t: "ul",
      x: [
        "Area servita: al momento la spedizione è attiva in Italia.",
        "Costo: la spedizione standard in Italia è gratuita, senza importo minimo d’ordine, come indicato anche nel carrello e al checkout.",
        "Preparazione ordine: di norma prepariamo l'ordine entro 1-2 giorni lavorativi dalla conferma del pagamento.",
        "Consegna stimata: generalmente 2-5 giorni lavorativi dalla spedizione. Le tempistiche possono variare per località disagiate, isole, festività o periodi di alto volume.",
        "Tracking: quando disponibile, riceverai le informazioni di tracciamento via email dopo l'affidamento al corriere.",
      ],
    },
    {
      t: "p",
      x: "Eventuali opzioni, costi o limitazioni di spedizione vengono sempre riepilogati prima della conclusione dell'ordine.",
    },
    {
      t: "h2",
      x: "Diritto di recesso e resi",
    },
    {
      t: "p",
      x: "Per gli acquisti online puoi comunicare il recesso entro 14 giorni dalla consegna dell'ordine, senza dover fornire una motivazione. Il prodotto deve essere restituito integro, non usato oltre quanto necessario per verificarne taglia e vestibilità, possibilmente con cartellino, confezione originale e prova d'acquisto.",
    },
    {
      t: "p",
      x: "Per aprire una richiesta di reso scrivici a info@flairavenue.it indicando numero ordine, email usata per l'acquisto e articolo o articoli da restituire. Ti invieremo le istruzioni per procedere: ti chiediamo di non spedire il pacco prima di aver ricevuto conferma dall'assistenza.",
    },
    {
      t: "p",
      x: "Salvo prodotti difettosi o errori nella spedizione, i costi diretti di restituzione sono a carico del cliente. L'indirizzo di rientro viene confermato dall'assistenza; salvo diversa indicazione, il riferimento operativo è: Flair Avenue, Via San Francesco S. Tateo 33, 70017 Putignano (BA), Italia.",
    },
    {
      t: "h2",
      x: "Rimborsi",
    },
    {
      t: "p",
      x: "Dopo aver ricevuto e verificato il reso, il rimborso viene disposto sullo stesso metodo di pagamento utilizzato per l'ordine. In caso di recesso, il rimborso dei pagamenti ricevuti viene gestito senza indebito ritardo e comunque entro 14 giorni dalla comunicazione del recesso; Flair Avenue può attendere di ricevere il prodotto restituito, o una prova della spedizione del reso, prima di completare l'operazione.",
    },
    {
      t: "p",
      x: "I tempi tecnici di accredito possono variare in base al metodo di pagamento e all'istituto bancario. Le spese supplementari legate a un metodo di consegna diverso dalla spedizione standard, se scelto dal cliente, non sono rimborsate salvo diversa previsione di legge.",
    },
    {
      t: "h2",
      x: "Cambi taglia o articolo",
    },
    {
      t: "p",
      x: "Se desideri cambiare taglia o articolo, contattaci prima possibile. I cambi dipendono dalla disponibilità del catalogo; quando non è possibile riservare un nuovo capo, ti guideremo con reso e nuovo ordine.",
    },
    {
      t: "h2",
      x: "Prodotti difettosi o ordine errato",
    },
    {
      t: "p",
      x: "Se ricevi un prodotto difettoso, danneggiato o diverso da quello ordinato, scrivici a info@flairavenue.it allegando numero ordine e foto chiare del problema. In questi casi ti aiuteremo a trovare la soluzione più corretta e, quando previsto, le spese di rientro saranno gestite da Flair Avenue. Restano fermi i diritti riconosciuti dalla garanzia legale di conformità.",
    },
    {
      t: "h2",
      x: "Contatti assistenza",
    },
    {
      t: "p",
      x: "Per domande su spedizioni, resi, rimborsi o stato dell'ordine puoi scrivere a info@flairavenue.it oppure usare la pagina Contatti. Per aiutarci a rispondere più velocemente, indica sempre il numero ordine e l'email usata in fase di acquisto.",
    },
    {
      t: "p",
      x: "Rispondiamo di norma entro 1-2 giorni lavorativi. Per comunicazioni formali puoi usare anche la PEC franchiniflair@pec.it.",
    },
  ],
};

export const TERMINI: LegalPage = {
  title: "Termini e condizioni",
  lead: "Le presenti Condizioni regolano l'acquisto dei prodotti disponibili su Flair Avenue. Effettuando un ordine sul sito, il cliente dichiara di aver letto e accettato queste condizioni prima del pagamento.",
  blocks: [
    {
      t: "p",
      x: "Il venditore e Franchini Federica, impresa individuale, con sede in Via San Francesco S. Tateo 33, 70017 Putignano (BA), P.IVA 09192060722, C.F. FRNFRC98S69H096J, REA BA - 678415.",
    },
    {
      t: "p",
      x: "Per informazioni, assistenza o richieste relative agli ordini puoi contattare Flair Avenue scrivendo a info@flairavenue.it, via PEC a franchiniflair@pec.it o tramite la pagina Contatti.",
    },
    {
      t: "h2",
      x: "Oggetto",
    },
    {
      t: "p",
      x: "Flair Avenue propone capi e accessori moda donna selezionati per la vendita online. Le presenti condizioni si applicano a tutti gli ordini effettuati tramite il sito, salvo eventuali condizioni particolari indicate nella scheda prodotto, nel carrello o nel checkout.",
    },
    {
      t: "h2",
      x: "Prodotti, immagini e disponibilità",
    },
    {
      t: "p",
      x: "Le fotografie, le descrizioni, le taglie e le informazioni presenti nelle schede prodotto sono curate per rappresentare i capi nel modo più fedele possibile. Piccole differenze di colore, resa dei materiali o vestibilità possono dipendere dal dispositivo utilizzato, dalla luce dello scatto o dalle caratteristiche del capo.",
    },
    {
      t: "p",
      x: "La disponibilità dei prodotti può variare. Se un articolo ordinato non fosse disponibile dopo l'acquisto, il cliente sarà contattato tempestivamente per concordare una sostituzione, l'attesa del riassortimento quando possibile o il rimborso dell'importo pagato.",
    },
    {
      t: "h2",
      x: "Prezzi",
    },
    {
      t: "p",
      x: "I prezzi sono indicati in euro e includono le imposte ove applicabili. Eventuali costi di spedizione, supplementi o promozioni vengono mostrati nel carrello e riepilogati prima della conferma dell'ordine. Flair Avenue può aggiornare prezzi e promozioni in qualsiasi momento; per ciascun ordine si applicano i prezzi visibili al momento dell'acquisto.",
    },
    {
      t: "h2",
      x: "Ordini",
    },
    {
      t: "p",
      x: "L'ordine si considera inviato quando il cliente completa il checkout e riceve la conferma automatica via email. Flair Avenue si riserva il diritto di non accettare o annullare ordini in caso di dati incompleti, pagamento non autorizzato, errore evidente di prezzo o indisponibilità del prodotto. In questi casi, se il pagamento è già stato effettuato, l'importo sarà rimborsato.",
    },
    {
      t: "h2",
      x: "Pagamenti",
    },
    {
      t: "p",
      x: "I metodi di pagamento disponibili sono quelli indicati nel checkout. Il pagamento deve essere completato secondo le istruzioni mostrate durante l'acquisto. I dati di pagamento sono gestiti tramite fornitori esterni autorizzati e sistemi sicuri; Flair Avenue non conserva i dati completi delle carte di pagamento.",
    },
    {
      t: "h2",
      x: "Spedizione e consegna",
    },
    {
      t: "p",
      x: "La spedizione standard in Italia è gratuita, senza importo minimo d’ordine. Prepariamo normalmente l’ordine entro 1-2 giorni lavorativi dalla conferma del pagamento; la consegna è stimata in 2-5 giorni lavorativi dalla spedizione. I tempi possono variare in base alla destinazione, al corriere e a periodi di maggiore volume operativo. Il cliente è responsabile dell'esattezza dell'indirizzo inserito in fase d'ordine.",
    },
    {
      t: "p",
      x: "Al momento della consegna è consigliato verificare l'integrità del pacco. In caso di danni visibili o anomalie, il cliente può accettare con riserva quando previsto dal corriere e contattare l'assistenza il prima possibile.",
    },
    {
      t: "h2",
      x: "Cambio, reso e diritto di recesso",
    },
    {
      t: "p",
      x: "Il cliente consumatore può esercitare il diritto di recesso entro 14 giorni dalla consegna, secondo la normativa applicabile. I prodotti devono essere restituiti integri, puliti, non utilizzati oltre la normale prova del capo, completi di cartellini, confezioni e accessori eventualmente ricevuti.",
    },
    {
      t: "p",
      x: "Non possono essere accettati resi di prodotti danneggiati, lavati, alterati, privi di cartellino o non idonei alla rimessa in vendita per motivi imputabili al cliente. Per istruzioni operative, tempistiche e condizioni specifiche consulta la Resi e spedizioni.",
    },
    {
      t: "h2",
      x: "Rimborsi",
    },
    {
      t: "p",
      x: "Dopo la ricezione e verifica del reso, il rimborso viene effettuato sul metodo di pagamento utilizzato per l'acquisto, salvo diverso accordo. Eventuali costi di spedizione del reso sono regolati dalla Politica di reso e dalle condizioni comunicate al cliente.",
    },
    {
      t: "h2",
      x: "Promozioni e codici sconto",
    },
    {
      t: "p",
      x: "Promozioni, codici sconto e offerte sono validi nei limiti, nelle date e secondo le condizioni indicate sul sito o nella comunicazione promozionale. I codici non sono cumulabili salvo diversa indicazione e non possono essere convertiti in denaro.",
    },
    {
      t: "h2",
      x: "Garanzia legale",
    },
    {
      t: "p",
      x: "I prodotti venduti sono coperti dalla garanzia legale di conformità prevista dalla normativa applicabile. In caso di prodotto difettoso o non conforme, il cliente deve contattare l'assistenza indicando numero d'ordine, descrizione del problema e, quando utile, fotografie del difetto riscontrato.",
    },
    {
      t: "h2",
      x: "Uso del sito",
    },
    {
      t: "p",
      x: "Il cliente si impegna a utilizzare il sito in modo corretto, fornendo dati veritieri e aggiornati. Non è consentito usare il sito per finalità fraudolente, per interferire con il suo funzionamento o per violare diritti di terzi.",
    },
    {
      t: "h2",
      x: "Privacy",
    },
    {
      t: "p",
      x: "I dati personali sono trattati secondo l' Informativa privacy disponibile sul sito. Le informazioni richieste in fase d'ordine sono necessarie per gestire acquisto, pagamento, spedizione, assistenza e adempimenti amministrativi.",
    },
    {
      t: "h2",
      x: "Modifiche alle condizioni",
    },
    {
      t: "p",
      x: "Flair Avenue può aggiornare le presenti condizioni per esigenze operative, commerciali o normative. Le condizioni applicabili a ciascun ordine sono quelle pubblicate sul sito al momento dell'acquisto.",
    },
    {
      t: "h2",
      x: "Legge applicabile e controversie",
    },
    {
      t: "p",
      x: "Le presenti condizioni sono regolate dalla legge italiana. Eventuali controversie saranno gestite secondo la normativa applicabile, privilegiando quando possibile una soluzione amichevole tramite il servizio clienti.",
    },
  ],
};

export const PRIVACY: LegalPage = {
  title: "Informativa privacy",
  lead: "Questa informativa descrive come Flair Avenue tratta i dati personali raccolti tramite il sito eCommerce, inclusi navigazione, account, ordini, richieste di assistenza, pagamenti e preferenze cookie.",
  blocks: [
    {
      t: "p",
      x: "Sito di riferimento: https://flairavenue.it/. Il titolare del trattamento e Franchini Federica, impresa individuale, con sede in Via San Francesco S. Tateo 33, 70017 Putignano (BA), P.IVA 09192060722, C.F. FRNFRC98S69H096J, REA BA - 678415.",
    },
    {
      t: "p",
      x: "Per richieste privacy puoi scrivere a info@flairavenue.it, inviare una PEC a franchiniflair@pec.it o usare la pagina Contatti.",
    },
    {
      t: "h2",
      x: "Quali dati raccogliamo",
    },
    {
      t: "p",
      x: "Possiamo trattare dati di navigazione e sicurezza, dati account, dati di contatto, dati di fatturazione e spedizione, informazioni sugli ordini, contenuti inviati tramite moduli di contatto e preferenze espresse tramite il banner cookie.",
    },
    {
      t: "p",
      x: "I dati di pagamento sono gestiti tramite i gateway attivi nel checkout, inclusi WooPayments e i relativi fornitori tecnici. Flair Avenue non conserva direttamente i dati completi della carta di pagamento.",
    },
    {
      t: "h2",
      x: "Perche trattiamo i dati",
    },
    {
      t: "p",
      x: "I dati sono utilizzati per consentire la navigazione del sito, creare e gestire l'account, elaborare ordini e pagamenti, spedire i prodotti, fornire assistenza, gestire resi e richieste, prevenire abusi o accessi non autorizzati e rispettare obblighi fiscali, contabili e di legge.",
    },
    {
      t: "p",
      x: "Quando previsto, il trattamento si basa sull'esecuzione del contratto, su obblighi di legge, sul legittimo interesse alla sicurezza e alla corretta gestione dello store oppure sul consenso dell'utente, ad esempio per cookie non tecnici o comunicazioni marketing.",
    },
    {
      t: "h2",
      x: "Strumenti e fornitori",
    },
    {
      t: "p",
      x: "Il sito utilizza WordPress, WooCommerce, WooPayments, Contact Form 7, Mailchimp for WordPress, Complianz, Wordfence Security, Limit Login Attempts Reloaded, Akismet, Rank Math SEO, Elementor, Google Fonts, WhatsApp e funzionalita tecniche per wishlist, confronto, ricerca, carrello e checkout.",
    },
    {
      t: "p",
      x: "Alcuni fornitori possono trattare dati tecnici o dati necessari a erogare il servizio, ad esempio per pagamenti, sicurezza, antispam, moduli, newsletter, preferenze cookie e statistiche tecniche del negozio.",
    },
    {
      t: "h2",
      x: "Cookie e consenso",
    },
    {
      t: "p",
      x: "Usiamo cookie tecnici necessari al funzionamento di carrello, account, checkout, sicurezza e preferenze. Eventuali cookie o tecnologie non essenziali sono gestiti tramite il banner Complianz, dove puoi accettare, rifiutare o modificare le preferenze.",
    },
    {
      t: "p",
      x: "Per il dettaglio aggiornato consulta la Cookie Policy.",
    },
    {
      t: "h2",
      x: "Conservazione",
    },
    {
      t: "p",
      x: "I dati sono conservati per il tempo necessario a gestire il rapporto con il cliente, evadere gli ordini, fornire assistenza e rispettare gli obblighi amministrativi, fiscali e legali. I log tecnici e di sicurezza sono conservati per periodi proporzionati alla protezione del sito.",
    },
    {
      t: "h2",
      x: "Diritti dell'utente",
    },
    {
      t: "p",
      x: "Puoi richiedere accesso, rettifica, cancellazione, limitazione, portabilita dei dati, opposizione al trattamento o revoca del consenso quando applicabile. Puoi inviare la richiesta a info@flairavenue.it o alla PEC franchiniflair@pec.it.",
    },
    {
      t: "p",
      x: "Se ritieni che il trattamento non sia conforme alla normativa applicabile, puoi rivolgerti all'autorita di controllo competente. Ultimo aggiornamento: 1 luglio 2026.",
    },
  ],
};

export const FAQ: LegalPage = {
  title: "FAQ",
  lead: "Una raccolta essenziale di risposte utili per orientarti prima e dopo l'acquisto su Flair Avenue.",
  blocks: [
    {
      t: "h2",
      x: "Dove spedite?",
    },
    {
      t: "p",
      x: "Al momento spediamo in Italia. La spedizione standard è gratuita, senza importo minimo d’ordine; prepariamo normalmente gli ordini in 1-2 giorni lavorativi e la consegna è stimata in 2-5 giorni lavorativi dalla spedizione.",
    },
    {
      t: "h2",
      x: "Come posso seguire il mio ordine?",
    },
    {
      t: "p",
      x: "Puoi controllare lo stato del tuo acquisto dalla pagina Tracciamento dell'ordine usando ID ordine ed email di fatturazione.",
    },
    {
      t: "h2",
      x: "Posso modificare o annullare un ordine?",
    },
    {
      t: "p",
      x: "Se hai appena acquistato, contattaci il prima possibile. Verificheremo se l'ordine e ancora gestibile prima della preparazione o spedizione.",
    },
    {
      t: "h2",
      x: "Come funzionano resi e rimborsi?",
    },
    {
      t: "p",
      x: "Trovi la sintesi aggiornata nella Resi e spedizioni. Per ogni richiesta valutiamo stato del prodotto, dati ordine e tempi della segnalazione.",
    },
    {
      t: "h2",
      x: "Quali pagamenti sono disponibili?",
    },
    {
      t: "p",
      x: "I metodi di pagamento attivi vengono mostrati direttamente nel checkout. Ti consigliamo di verificarli prima di completare l'ordine.",
    },
    {
      t: "h2",
      x: "Ho dubbi su taglia o vestibilita.",
    },
    {
      t: "p",
      x: "Controlla sempre la scheda del prodotto e, se hai bisogno di un supporto aggiuntivo, usa la pagina Contatti prima di acquistare.",
    },
    {
      t: "p",
      x: "Per richieste specifiche su ordini gia effettuati o casi particolari, usa sempre i riferimenti presenti nelle pagine di assistenza del negozio.",
    },
  ],
};
