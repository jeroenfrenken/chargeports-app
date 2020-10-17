export class ChargerUtil {
    static parseCurrentType(id: number): string {
        switch (id) {
            case 10:
                return "AC (Single-Phase)"
            case 20:
                return "AC (Three-Phase)"
            case 30:
                return "DC"
        }

        return `${id}`;
    }

    static parseConnectionType(id: number): string {
        switch (id) {
            case 7:
                return "Avcon Connector";
            case 4:
                return "Blue Commando (2P+E)";
            case 3:
                return "BS1363 3 Pin 13 Amp";
            case 32:
                return "CCS (Type 1)";
            case 33:
                return "CCS (Type 2)";
            case 16:
                return "CEE 3 Pin";
            case 17:
                return "CEE 5 Pin";
            case 28:
                return "CEE 7/4 - Schuko - Type F";
            case 23:
                return "CEE 7/5";
            case 18:
                return "CEE+ 7 Pin";
            case 2:
                return "CHAdeMO";
            case 13:
                return "Europlug 2-Pin (CEE 7/16)";
            case 1038:
                return "GB-T AC - GB/T 20234.2 (Socket)";
            case 1039:
                return "GB-T AC - GB/T 20234.2 (Tethered Cable)";
            case 1040:
                return "GB-T DC - GB/T 20234.3";
            case 34:
                return "IEC 60309 3-pin";
            case 35:
                return "IEC 60309 5-pin";
            case 5:
                return "LP Inductive";
            case 10:
                return "NEMA 14-30";
            case 11:
                return "NEMA 14-50";
            case 22:
                return "NEMA 5-15R";
            case 9:
                return "NEMA 5-20R";
            case 15:
                return "NEMA 6-15";
            case 14:
                return "NEMA 6-20";
            case 1042:
                return "NEMA TT-30R";
            case 36:
                return "SCAME Type 3A (Low Power)";
            case 26:
                return "SCAME Type 3C (Schneider-Legrand)";
            case 6:
                return "SP Inductive";
            case 1037:
                return "T13 - SEC1011 ( Swiss domestic 3-pin ) - Type J";
            case 30:
                return "Tesla (Model S/X)";
            case 8:
                return "Tesla (Roadster)";
            case 31:
                return "Tesla Battery Swap";
            case 27:
                return "Tesla Supercharger";
            case 1041:
                return "Three Phase 5-Pin (AS/NZ 3123)";
            case 1:
                return "Type 1 (J1772)";
            case 21:
                return "XLR Plug (4 pin)";
            case 24:
                return "Wireless Charging";
            case 29:
                return "Type I (AS 3112)";
            case 1036:
                return "Type 2 (Tethered Connector)";
            case 25:
                return "Type 2 (Socket Only)";
        }

        return "Unknown"
    }

}
