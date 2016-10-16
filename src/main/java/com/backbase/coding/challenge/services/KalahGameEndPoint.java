package com.backbase.coding.challenge.services;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.backbase.coding.challenge.business.GamePlay;
import com.backbase.coding.challenge.dto.GamePlayStatus;
import com.backbase.coding.challenge.dto.GamePlayUpdate;
import com.backbase.coding.challenge.entities.Player;

@Path("/kalah")
public class KalahGameEndPoint {

	@Inject
	GamePlay gamePlay;

	public KalahGameEndPoint() {

	}

	@GET
	@Produces({ "application/json" })
	@Path("/loadGame/{hashIdBoard}")
	public GamePlayStatus loadGame(@PathParam("hashIdBoard") String hashIdBoard) throws Exception {
		return gamePlay.loadPlayersBoard(hashIdBoard);
	}

	@POST
	@Path("/startGame")
	@Produces({ "application/json" })
	public GamePlayStatus startGame(List<Player> players) throws Exception {

		if (players.size() != 2) {
			return null;
		}

		return gamePlay.startGame(players);

	}

	@POST
	@Path("/updateGame")
	@Produces({ "application/json" })
	public GamePlayStatus updateGame(GamePlayUpdate gamePlayUpdate) throws Exception {

		return gamePlay.updatePlayerBoard(gamePlayUpdate);

	}

}
