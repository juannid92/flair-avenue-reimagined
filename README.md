# Flair Avenue Reimagined

Ricostruisci il frontend di FLAIR AVENUE, boutique fashion femminile 

italiana online (flairavenue.it). Replica fedelmente la struttura sotto.

Stack: React + Vite + TypeScript + Tailwind. Tutto il copy in italiano.

## IDENTITÀ VISIVA

- Logo: wordmark "FLAIR AVENUE" maiuscolo, sans-serif condensato, 

  letter-spacing molto ampio, nero #1A1A1A. Uso il file 

  flairavenue-logo-dark.png che ho caricato.

- Palette: nero #1A1A1A, bianco #FFFFFF, beige/sabbia #E8DFD3, 

  grigio testo #6B6B6B, bordi #E5E5E5.

- Tipografia: sans-serif pulita. Titoli di sezione e CTA in MAIUSCOLO 

  con letter-spacing aumentato — è la firma stilistica del sito.

- Stile: minimale, editoriale, molto whitespace, immagini grandi, 

  bordi sottili, nessuna ombra, radius 0-2px.

## HEADER (3 livelli)

1. Topbar sottile, testo centrato:

   "Spedizione tracciata, pagamenti sicuri e resi semplici"

   A destra, link piccoli: "Tracciamento dell'ordine" · "Chi siamo"

2. Riga logo: logo FLAIR AVENUE centrato.

   A destra 4 icone lineari: Account (/il-mio-account), 

   Wishlist con badge contatore (/wishlist), Confronta (/confronta), 

   Carrello con badge contatore (/carrello).

3. Navigazione centrata, maiuscolo, spaziata:

   BOUTIQUE · NOVITÀ · COLLEZIONI · CONTATTI

   "Collezioni" apre un dropdown con: Abiti, Top, Giacche, Gonne e Shorts.

Header sticky, si compatta allo scroll. Su mobile: hamburger a sinistra, 

logo centrato, carrello a destra.

## HOME — sezioni nell'ordine esatto

1. HERO

   Immagine editoriale full-width, altezza circa 85vh, con overlay 

   scuro leggero. Testo allineato a sinistra o centrato in basso:

   Titolo grande maiuscolo spaziato: "TUTTE LE SETTIMANE NUOVI ARRIVI"

   CTA: bottone nero rettangolare, testo maiuscolo "ACQUISTA ORA"

2. FASCIA TRUST — 4 colonne, icona lineare sottile sopra il testo:

   - "Spedizione chiara" / "Costi e tempi sempre visibili prima del checkout."

   - "Pagamenti sicuri" / "Transazioni protette e metodi di pagamento affidabili."

   - "Resi semplici" / "Informazioni sul reso consultabili prima dell'acquisto."

   - "Assistenza rapida" / "Supporto veloce per ordini, taglie e resi."

3. SELEZIONE FLAIR

   Titolo sezione centrato: "Selezione Flair"

   Tab filtro sotto il titolo: Abiti | Top (tab attiva con underline nero)

   Griglia prodotti: 4 colonne desktop, 2 tablet, 2 mobile.

   Card prodotto:

   - immagine verticale ratio 3:4, hover = crossfade sulla seconda immagine

   - icona cuore "Aggiungi alla wishlist" in alto a destra, appare in hover

   - al hover compare bottone "SCEGLI" sovrapposto in basso

   - sotto l'immagine: nome prodotto (max 2 righe), prezzo

   - se il prodotto ha varianti, testo piccolo grigio: 

     "Questo prodotto ha più varianti. Le opzioni possono essere scelte 

     nella pagina del prodotto"

   Prodotti:

   - Abito lungo in pizzo con spacco avanti – Azzurro · 40,00 €

   - Abito corto con voulant laterali e manica a pipistrello – Giallo · 30,00 €

   - Vestito corto con scollo dietro – Rosso · 15,00 €

   - Abito lungo in pizzo – Marrone · 25,00 €

4. BANNER INSTAGRAM

   Immagine editoriale full-width con testo sovrapposto centrato:

   Titolo maiuscolo spaziato: "ISPIRATI OGNI GIORNO"

   CTA outline bianco: "SEGUICI SU INSTAGRAM ⭐"

   Link a https://www.instagram.com/flair___avenue/

5. LE COLLEZIONI ESSENZIALI

   Titolo: "Le collezioni essenziali"

   Sottotitolo: "Tre punti di partenza per costruire un look femminile, 

   facile da acquistare."

   Card categoria con immagine grande verticale, zoom leggero in hover, 

   nome categoria sotto con il conteggio prodotti in apice:

   - Abiti ⁸  → /product-category/abiti/

   - Top ⁷    → /product-category/top/

## FOOTER

Fascia superiore con 4 blocchi cliccabili, titolo in grassetto + 

descrizione sulla stessa riga:

- "Spedizione tracciata" — "Costi e tempi sempre visibili prima del checkout."

- "Pagamenti sicuri" — "Transazioni protette con carta e Klarna."

- "Resi semplici" — "Informazioni sul reso consultabili prima dell'acquisto."

- "Contatti rapidi" — "Supporto per ordini, taglie e resi."

Sotto: logo, colonne link (Boutique, Novità, Collezioni, Contatti, 

Chi siamo, Tracciamento ordine, Politica di reso, Termini e condizioni, 

Privacy), icone social, copyright.

## ALTRE PAGINE

- /shop — griglia con sidebar filtri (categoria, taglia, colore, prezzo) 

  e select ordinamento (Novità, Prezzo crescente, Prezzo decrescente). 

  Su mobile i filtri si aprono in un drawer.

- /product/:slug — galleria con thumbnail verticali a sinistra e immagine 

  grande, colonna destra sticky con titolo, prezzo, selettore taglia e 

  colore, quantità, "AGGIUNGI AL CARRELLO", link "Aggiungi alla wishlist" 

  e "Confronta", accordion (Descrizione / Spedizioni e resi / Guida alle 

  taglie), sezione finale "Ti potrebbe piacere anche".

- /carrello, /wishlist, /confronta, /il-mio-account, /chi-siamo, 

  /contatti, /tracciamento-ordine

## COMPONENTI GLOBALI

- Cart drawer laterale destro con barra di progresso spedizione gratuita: 

  "Aggiungi X € al carrello per ottenere la spedizione gratuita"

  Soglia configurabile in un unico punto — impostala a 69 €, non a 500 €.

- Stato carrello vuoto in italiano: "Non ci sono prodotti nel carrello."

- Banner cookie in basso con Accetta / Rifiuta / Preferenze

- Bottone WhatsApp flottante in basso a destra

## REQUISITI TECNICI

- Mobile-first, responsive impeccabile (mobile è oltre il 70% del traffico)

- Prezzi sempre in formato italiano: 40,00 € (virgola + spazio + €)

- Zero testo in inglese visibile all'utente

- Prodotti e categorie in src/data/products.ts tipizzato, dietro 

  un'interfaccia astratta pronta a essere sostituita da chiamate API

- Immagini con width/height espliciti e loading lazy tranne l'hero

- Ogni colore e spaziatura come token Tailwind, mai hardcoded

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/614ba4c6-b331-4e30-adc0-d5c1c83ffd1f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
