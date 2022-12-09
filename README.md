# vts-flask-gui
GUI do mojego skryptu tworzącego grupy przedmiotów takich, że żaden uczeń nie rozszerza naraz więcej niż jednego z nich.
# Dependencies
```
pip install flask networkx itertools
```
# Uruchamianie programu
Aby uruchomić program należy wejść do głównego folderu repozytorium i skorzystać z komendy:
```
flask run
```
Wówczas wystarczy wejść w przeglądarce na adres [127.0.0.1:5000](http://127.0.0.1:5000).
# Korzystanie z programu
Na stronie głownej użytkownik ma opcje przejścia do dwóch kart:
1. W pierwszej może skorzystać z edytora klasy, w którym stworzy plik z listą uczniów i ich rozszerzeń w odpowiednim formacie (lub wprowadzi modyfikacje do już istniejącego).
2. W drugiej może od razu wgrać wcześniej przygotowany plik i znaleźć odpowiednie grupy rozszerzeń.
### Edytor klasy
W edytorze użytkownik ma dostępne trzy pola do wpisywania danych.
1. Na samej górze może wgrać wcześniej wygenerowany plik, aby wprowadzić w nim zmiany (uwaga, wgranie pliku usuwa wszystkie wprowadzone wcześniej dane).
2. W kolejnym polu może wpisać nazwę przedmiotu (można korzystać ze spacji). Aby usunąć rozszerzenie, wystarczy kliknąć na kafelek z jego nazwą.
3. W ostatnim może dodać ucznia wpisując jego imię i nazwisko (bez spacji). Aby usunąć ucznia wystarczy kliknąć na kafelek z "X" na lewo od jego imienia.
Żeby dodać uczniowi przedmiot wystarzy kliknąć kafelek z "+" z prawej strony, wybrać przedmiot z dropdowna i potwierdzić klikając na kafelek "OK".
Po skończeniu edytowania użytkownik może po prostu zapisać na dysku lub zapisać i od razu znaleźć grupy przedmiotów korzystając z guzików na dole.
### Wgrywanie pliku
W drugiej karcie użytkownik ma tylko jedno pole do wpisywania danych służące do wgrania pliku. Po potwierdzeniu guzikiem "Prześlij" w polu poniżej wyświetli się rozwiąznie - w każdej linii będzie osobna grupa rozszerzeń, które nie mają wspólnego ucznia. Odpowiedź można zapisać na dysku guzikiem "Zapisz Odpowiedź".
