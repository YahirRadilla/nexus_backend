import axios from "axios";

const operatePuebla = async (): Promise<void> => {

    try {

        const response = await axios.post(
            "http://localhost:3000/api/transactions/retiro",
            {
                accountNumber: "001",
                amount: 200,
                branch: "Puebla"
            }
        );

        console.log("Sucursal Puebla:", response.data);

    } catch (error: any) {

        console.log(
            "Error en sucursal Puebla:",
            error.response?.data || error.message
        );

    }

};

export default operatePuebla;