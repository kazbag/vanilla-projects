# Manager spotkań

Manager spotkań, jak sama nazwa wskazuje ma pomagać Coding Tree przy organizacji spotkań. Jego wiodąca funkcja to możliwość dodania oraz edycji i usunięcia tematu na najbliższe spotkanie.

## Instalacja

Aplikacja do wystartowania potrzebuje stworzonej lokalnie bazy w mongodb oraz wgranego Node. Jeżeli korzystasz z NPM, to nie musisz instalować Node, bo jest już wgrane. Archiwum jest bez katalogu node_modules, więc po pobraniu i otworzeniu projektu użyj komendy

```bash
npm install
```
żeby pobrać wszystkie zależności. 
## Co działa, co nie działa, co będzie działać?

Działa

* Manipulacja tematem (dodanie, edycja, usunięcie)
* Głosowanie (na razie bez walidacji, można głosować tak długo, dopóki starczy Ci sił w myszce)
* Prosty layout (docelowo zaimplementowany będzie ten stworzony prze Kubę)

Czego brakuje
* Walidacji głosowania
* Rejestracji/logowania
* Ról użytkowników (np. tylko administrator, lub osoba dodająca może usunąć temat)
* Logiki (temat z najwyższą liczbą głosów zostaje przeniesiony do archiwum, a reszta głosów zostaje wyzerowana)
* Wszystkiego innego

Co będzie działać
* Muszę puścić serwer wraz z bazą w świat, gdyż tworzenie przez każdego lokalnej bazy mija się z celem
* Wszystko :) Bądźmy dobrej myśli!


## Technologie

Jako backend proponuję użyć ekosystemu JavaScriptowego, czyli NodeJS (a dokładniej jego framework - express). Frontend - ReactJS.


## Licencja
[MIT](https://choosealicense.com/licenses/mit/)