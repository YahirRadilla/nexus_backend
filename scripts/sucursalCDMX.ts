import axios from "axios";

const operateCDMX = async (): Promise<void> => {

    try {

        const response = await axios.post(
            "http://localhost:3000/api/transactions/deposito",
            {
                accountNumber: "001",
                amount: 500,
                branch: "CDMX"
            }
        );

        console.log("Sucursal CDMX:", response.data);

    } catch (error: any) {

        console.log(
            "Error en sucursal CDMX:",
            error.response?.data || error.message
        );

    }

};

export default operateCDMX;