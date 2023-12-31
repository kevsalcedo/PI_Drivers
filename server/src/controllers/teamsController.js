const axios = require("axios");
const { Team } = require("../db");

const getAllApiTeams = async () => {
  let teams = [];

  let response = (await axios.get("http://localhost:5000/drivers")).data;

  teams.push(response);

  const finalResult = [].concat.apply([], teams);
  return finalResult;
};

const cleanArray = (arr) => {
  const clean = arr.map((elem) => {
    return {
      id: elem?.id,
      teamName: elem?.teams,
      created: false,
    };
  });
  return clean;
};

const storeTeamsInDB = async (teams) => {
  try {
    const uniqueTeams = [
      ...new Set(
        teams.flatMap((team) =>
          team.teamName
            ? team.teamName.split(",").map((name) => name.trim())
            : []
        )
      ),
    ];

    if (uniqueTeams.length > 0) {
      await Team.bulkCreate(
        uniqueTeams.map((teamName) => ({ teamName: teamName })),
        {
          updateOnDuplicate: ["teamName"],
        }
      );
      console.log("Equipos almacenados en la base de datos con éxito.");
    } else {
      console.log(
        "No hay equipos con nombres válidos para almacenar en la base de datos."
      );
    }
  } catch (error) {
    console.error(
      "Error al almacenar equipos en la base de datos:",
      error.message
    );
  }
};

const getAllTeams = async () => {
  const bddTeams = await Team.findAll();

  if (bddTeams.length) return bddTeams;
  else {
    let apiTeamsRow = await getAllApiTeams();

    const apiTeams = cleanArray(apiTeamsRow);

    await storeTeamsInDB(apiTeams);

    return [...bddTeams, ...apiTeams];
  }
};

module.exports = { getAllTeams };
