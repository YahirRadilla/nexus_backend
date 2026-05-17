import operateCDMX from "./sucursalCDMX.js";
import operateGDL from "./sucursalGDL.js";
import operateMTY from "./sucursalMTY.js";
import operatePuebla from "./sucursalPuebla.js";
import operateTijuana from "./sucursalTijuana.js";

const runSimulation = async (): Promise<void> => {

    console.log("\nIniciando simulación concurrente...\n");

    await Promise.all([
        operateCDMX(),
        operateGDL(),
        operateMTY(),
        operatePuebla(),
        operateTijuana()
    ]);

    console.log("\nSimulación finalizada\n");

};

runSimulation();