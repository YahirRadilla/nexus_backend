import axios from "axios";

const operateGDL = async (): Promise<void> => {

    try {

        const response = await axios.post(
            "http://localhost:3000/api/transactions/retiro",
            {
                accountNumber: "001",
                amount: 300,
                branch: "Guadalajara"
            }
        );

        console.log("Sucursal Guadalajar:", response.data);

    } catch (error: any) {

        console.log(
            "Error en sucursal Guadalajara:",
            error.response?.data || error.message
        );

    }

};

export default operateGDL;