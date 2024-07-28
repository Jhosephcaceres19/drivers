import {axios} from axios

const driversApi = async () => {
    let drivers = [];
    let nextPage = 'http://localhost:5000/drivers'; // Asegúrate de usar el protocolo correcto
    let page = 1;

    while (nextPage && page < 6) {
        try {
            const { data } = await axios.get(nextPage);
            drivers = drivers.concat(
                data.results
                .filter((d) => d.rating) // Filtra por rating si está presente
                .map((d) => ({
                    id: d.id,
                    driverRef: d.driverRef,
                    number: d.number,
                    code: d.code,
                    name: {
                        forename: d.name.forename,
                        surname: d.name.surname,
                    },
                    image: {
                        url: d.image.url,
                        imageBy: d.image.imageby,
                    },
                    dob: d.dob,
                    nationality: d.nationality,
                    url: d.url,
                    teams: d.teams,
                    description: d.description,
                }))
            );

            // Supongamos que la API devuelve la URL de la siguiente página en `nextPageUrl`
            nextPage = data.nextPageUrl;
            page++;
        } catch (error) {
            console.error('Error fetching drivers data:', error);
            nextPage = null; // Detener el loop en caso de error
        }
    }

    return drivers;
};

export default{
    driversApi
}