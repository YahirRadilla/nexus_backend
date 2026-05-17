import axios from "axios";

const operateTijuana = async (): Promise<void> => {

    try {

        const response = await axios.post(
            "http://localhost:3000/api/transactions/deposito",
            {
                accountNumber: "001",
                amount: 1000,
                branch: "Tijuana"
            }
        );

        console.log("Sucursal Tijuana:", response.data);

    } catch (error: any) {

        console.log(
            "Error en sucursal Tijuana:",
            error.response?.data || error.message
        );

    }

};

export default operateTijuana;