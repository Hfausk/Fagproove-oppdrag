
# Herman Fagprøve 21.06.2024

## Utlånssystem for skolebøker
Dette er en prototype av et utlånssystem for skolebøker som kan ta i bruk av skoler.  
Prototypen skal kunne:
- Opprette, slette og endre navn på elever.
- Opprette, slette og endre navn på bøker.
- Knytte en elev opp mot en bok når boken skal lånes ut
- Se historikk på hvilke elever som har lånt en spesifikk bok
- Se historikk på hvilke bøker en spesifikk elev har lånt.

### Teknologier brukt i prosjekt

- Rammeverk: [NextJs](https://nextjs.org/)
- Database: [Neon](https://neon.tech/)
- ORM: [Drizzle](https://orm.drizzle.team/)
- UI: [Shadcn/ui](https://ui.shadcn.com/)
- UI tables: [TanStack](https://tanstack.com/table/latest)


### Hvordan å sette opp

1. Npm install for alle pakker som treng for systemet
2. Følg stegene i [Neon](https://neon.tech/docs/get-started-with-neon/signing-up) for hvordan å sette opp en database og hente ut "Connection string" for kobling av database
3. Opprett så .env.local fil hvor string skal hentes fra. (Se "example.env.local" fil)

### Kommandoer

```
npm run dev // starte localhost
npm run db:studio //neon studio for innsikt i database
npm run db:generate // generere fil med endringer i schema
npm run db:migrate // må kjøres for å dytte endringene ut til database
```



## Dokumentasjon

- [System dokumentasjon]()
- [Test rapport]()
- [Brukerveiledning]()
- [HMS-dokumentasjon]()




## Log fra dag til dag

- [Fredag 21.06.2024](https://github.com/Hfausk/Fagproove-oppdrag/blob/main/dokumentasjon/dagslog/Fredag(21.06.2024).md)
- [Mandag 24.06.2024](https://github.com/Hfausk/Fagproove-oppdrag/blob/main/dokumentasjon/dagslog/Mandag(24.06.2024).md)
- [Tirsdag 25.06.2024](https://github.com/Hfausk/Fagproove-oppdrag/blob/main/dokumentasjon/dagslog/Tirdag(25.06.2024).md)
- [Onsdag 26.06.2024](https://github.com/Hfausk/Fagproove-oppdrag/blob/main/dokumentasjon/dagslog/Onsdag(26.06.2024).md)