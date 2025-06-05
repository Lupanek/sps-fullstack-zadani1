# Evidence návštěv v zoo

Aplikace pro sledování návštěvníků, zvířat a jejich návštěv v zoologické zahradě. Tento projekt byl vytvořen jako školní projekt pro demonstraci základních CRUD operací s využitím webových technologií.

## Obsah

- [Popis projektu](#popis-projektu)
- [Technologie](#technologie)
- [Struktura projektu](#struktura-projektu)
- [Instalace](#instalace)
- [Spuštění aplikace](#spuštění-aplikace)
- [API Dokumentace](#api-dokumentace)
- [Databázové schéma](#databázové-schéma)
- [Funkce aplikace](#funkce-aplikace)
- [Bonusové Point Pack balíčky](#bonusové-point-pack-balíčky)
- [Autor](#autor)

## Popis projektu

Aplikace "Evidence návštěv v zoo" umožňuje správu návštěvníků, zvířat a záznamů o návštěvách. Uživatelé mohou:

- Přidávat, upravovat a mazat návštěvníky
- Přidávat, upravovat a mazat zvířata
- Zaznamenávat návštěvy (který návštěvník navštívil které zvíře a kdy)
- Zobrazovat detaily jednotlivých záznamů

Aplikace je navržena jako jednoduchá webová aplikace s intuitivním uživatelským rozhraním.

## Technologie

Projekt využívá následující technologie:

- **Frontend**: HTML, CSS, JavaScript (čistý JS bez frameworků)
- **Backend**: Node.js, Express.js
- **Databáze**: SQLite3
- **Další nástroje**: npm pro správu balíčků

## Struktura projektu

```
evidence-navstev-v-zoo/
│   README.md
│   .gitignore
│   package.json
│   server.js
│
└───public/
│   │   index.html
│   │   styles.css
│   │
│   └───assets/
│       │   favicon.ico
│       │   ... (další statické soubory)
│
└───api/
│   │   routes.js
│
└───database/
    │   db.js
    │   schema.sql
    │   seed.js
    │   seed.sql
```

## Instalace

Pro instalaci a spuštění projektu postupujte podle následujících kroků:

1. Naklonujte repozitář:
   ```
   git clone https://github.com/vas-username/evidence-navstev-v-zoo.git
   cd evidence-navstev-v-zoo
   ```

2. Nainstalujte závislosti:
   ```
   npm install
   ```

3. Inicializujte databázi (tabulky se vytvoří automaticky při prvním spuštění):
   ```
   npm run seed
   ```

## Spuštění aplikace

Pro spuštění aplikace použijte příkaz:

```
npm start
```

Aplikace bude dostupná na adrese `http://localhost:3000`.

## API Dokumentace

Aplikace poskytuje následující API endpointy:

### Návštěvníci

- `GET /api/visitors` - Získání seznamu všech návštěvníků
- `GET /api/visitors/:id` - Získání detailu konkrétního návštěvníka
- `POST /api/visitors` - Vytvoření nového návštěvníka
- `PUT /api/visitors/:id` - Aktualizace existujícího návštěvníka
- `DELETE /api/visitors/:id` - Smazání návštěvníka

### Zvířata

- `GET /api/animals` - Získání seznamu všech zvířat
- `GET /api/animals/:id` - Získání detailu konkrétního zvířete
- `POST /api/animals` - Vytvoření nového zvířete
- `PUT /api/animals/:id` - Aktualizace existujícího zvířete
- `DELETE /api/animals/:id` - Smazání zvířete

### Návštěvy

- `GET /api/visits` - Získání seznamu všech návštěv
- `POST /api/visits` - Vytvoření nové návštěvy
- `DELETE /api/visits/:id` - Smazání návštěvy

## Databázové schéma

Aplikace používá tři hlavní tabulky:

### Tabulka `visitors`

| Sloupec    | Typ      | Popis                    |
|------------|----------|--------------------------|
| id         | INTEGER  | Primární klíč            |
| firstname  | TEXT     | Jméno návštěvníka        |
| lastname   | TEXT     | Příjmení návštěvníka     |

### Tabulka `animals`

| Sloupec    | Typ      | Popis                    |
|------------|----------|--------------------------|
| id         | INTEGER  | Primární klíč            |
| name       | TEXT     | Jméno zvířete            |
| species    | TEXT     | Druh zvířete             |

### Tabulka `visits`

| Sloupec     | Typ      | Popis                                |
|-------------|----------|--------------------------------------|
| id          | INTEGER  | Primární klíč                        |
| visitor_id  | INTEGER  | Cizí klíč odkazující na návštěvníka  |
| animal_id   | INTEGER  | Cizí klíč odkazující na zvíře        |
| visit_date  | TEXT     | Datum návštěvy                       |

## Funkce aplikace

### Správa návštěvníků

- Přidání nového návštěvníka (jméno, příjmení)
- Zobrazení seznamu všech návštěvníků
- Zobrazení detailu návštěvníka
- Úprava údajů o návštěvníkovi
- Smazání návštěvníka

### Správa zvířat

- Přidání nového zvířete (jméno, druh)
- Zobrazení seznamu všech zvířat
- Zobrazení detailu zvířete
- Úprava údajů o zvířeti
- Smazání zvířete

### Správa návštěv

- Zaznamenání nové návštěvy (výběr návštěvníka, zvířete a data)
- Zobrazení seznamu všech návštěv
- Zobrazení detailu návštěvy
- Smazání záznamu o návštěvě

## Bonusové Point Pack balíčky

V rámci projektu byly implementovány následující bonusové balíčky:

### 1. Responzivní design (5 bodů)
Aplikace je plně responzivní a přizpůsobuje se různým velikostem obrazovky, od mobilních telefonů až po desktopové monitory. Implementováno pomocí media queries v CSS.

### 2. Animace a přechody (5 bodů)
Aplikace obsahuje animace a přechody pro zlepšení uživatelského zážitku, včetně:
- Animace při otevírání/zavírání modálních oken
- Přechody při najetí na tlačítka
- Animace načítání (loader)
- Efekt slide-in pro nově přidané položky

### 3. Pokročilé formátování dat (5 bodů)
Implementováno pokročilé formátování dat, včetně:
- Formátování datumů do lokalizovaného formátu
- Formátování textových řetězců (první písmeno velké)
- Validace vstupních dat před odesláním na server

### 4. Vyhledávání a filtrování (10 bodů)
Aplikace umožňuje vyhledávat a filtrovat záznamy podle různých kritérií:
- Vyhledávání návštěvníků podle jména nebo příjmení
- Vyhledávání zvířat podle jména nebo druhu
- Filtrování návštěv podle data

### 5. Tooltips a nápovědy (5 bodů)
Implementovány tooltips a nápovědy pro zlepšení uživatelské přívětivosti:
- Tooltips na tlačítkách s vysvětlením funkce
- Nápovědy při vyplňování formulářů
- Informační ikony s dodatečnými informacemi

## Autor

Jiří Dočekal

---

Projekt vytvořen jako školní zadání v rámci výuky fullstack webových aplikací.
