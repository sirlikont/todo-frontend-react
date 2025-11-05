# 🧩 Hajusrakendused — ToDo klientrakendus (React)

See projekt on loodud **Tallinna Polütehnikumi hajusrakenduste kursuse** raames.  
Ülesande eesmärk on luua **Reactis** toimiv ToDo rakendus,  
mis suhtleb olemasoleva **RESTful API-ga**, kasutades autentimist ja ülesannete sünkroniseerimist serveriga.

Ülesande kirjeldus:  
👉 https://github.com/timotr/harjutused/blob/main/hajusrakendused/yl-nimekiri-klient.md

---

## 🎯 Eesmärk

Rakendus võimaldab:

- registreerida uue kasutaja (POST `/register`)
- logida sisse ja saada **Bearer** token (POST `/users/get-token`)
- laadida serverist ülesanded (GET `/tasks`)
- lisada uusi ülesandeid (POST `/tasks`)
- muuta ülesande staatust (PUT `/tasks/{id}`)
- kustutada ülesandeid (DELETE `/tasks/{id}`)
- logida välja (token eemaldatakse `localStorage`-st)

Kõik toimingud toimuvad **autentimisega** HTTP päises:
Authorization: Bearer <token>

Server: `https://demo2.z-bit.ee`

---

## 🧱 Kasutatud tehnoloogiad

| Tehnoloogia | Eesmärk |
|------------|---------|
| **React** | UI ja komponendid |
| **React Router** | Lehevaade + navigeerimine |
| **Ant Design** | UI komponendid ja stiil |
| **Immer** | Ohutu muutmine / immutability |
| **Vite** | Arendusserver ja bundler |

---

## ⚙️ Arenduskeskkonna seadistamine


1. Klooni projekt:
```bash
   git clone https://github.com/sirlikont/todo-frontend-react.git
 ```
2. Liigu projekti kausta ja paigalda Vite:
```bash
   npm install
 ```
3. Käivita arendusserver:
 ```bash
   npm run dev
 ```
4. Ava brauseris

## 🧩 Failistruktuur:

```
📦 src
├── App.jsx               # Rakenduse routing
├── index.jsx             # React mount
└── components/
    └── views/
        ├── Login.jsx     # Sisselogimine
        ├── Register.jsx  # Kasutaja loomine
        ├── TaskList.jsx  # Ülesannete nimekiri (põhivaade)
        └── Logout.jsx    # Tokeni eemaldamine ja ümbersuunamine

```

## 🚪 Autentimine

Sisselogimisel salvestatakse token:

```
localStorage.setItem("apiToken", data.access_token);
```

Päringutes:

```
Authorization: Authorization: `Bearer ${API_TOKEN}`
```

Logout kustutab tokeni:
```
localStorage.removeItem("apiToken");
```

## 👩‍💻 Autor

Sirli Kont
Tallinna Polütehnikum
Kursus: Hajusrakendused (2025)
Õppejõud: Timo Triisa
