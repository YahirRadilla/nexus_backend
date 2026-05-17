import axios from "axios";

const operateMTY = async (): Promise<void> => {

    try {

        const response = await axios.post(
            "http://localhost:3000/api/transactions/deposito",
            {
                accountNumber: "001",
                amount: 800,
                branch: "Monterrey"
            }
        );

        console.log("Sucursal Monterrey:", response.data);

    } catch (error: any) {

        console.log(
            "Error en sucursal Monterrey:",
            error.response?.data || error.message
        );

    }

};

export default operateMTY;