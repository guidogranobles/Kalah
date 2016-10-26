package com.backbase.coding.challenge.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.backbase.coding.challenge.dao.GameBoardDAO;
import com.backbase.coding.challenge.dao.PlayerDAO;
import com.backbase.coding.challenge.dto.GamePlayStatus;
import com.backbase.coding.challenge.dto.GamePlayUpdate;
import com.backbase.coding.challenge.entities.GameBoard;
import com.backbase.coding.challenge.entities.Player;

/**
 * ****************************************************************.
 * 
 * @autor: Guido Granobles
 * @fecha: 15/10/2016
 * @descripción: This class manage all the game operations.
 * @copyright: Copyright © 2016 GG.
 *             ****************************************************************
 */

@Stateless
public class GamePlay {

	@Inject
	PlayerDAO playerDAO;

	@Inject
	GameBoardDAO gameBoardDAO;

	/**
	 * ****************************************************************.
	 * 
	 * @metodo: startGame
	 * @descripcion: it starts a new game.
	 * @param players
	 * @return: The GamePlayStatus object contains all the info about the
	 *          current game started.
	 * @autor: Guido Granobles
	 *****************************************************************
	 */
	public GamePlayStatus startGame(List<Player> players) {

		GamePlayStatus gameStatus = new GamePlayStatus();
		Player player1 = null;
		Player player2 = null;

		player1 = playerDAO.save(players.get(0));
		player2 = playerDAO.save(players.get(1));

		// This is used in order to indentify one session game of two players
		// from others.
		String hashIdnewGameBoard = player1.getIdplayer() + "" + player2.getIdplayer()
				+ Long.toString(System.currentTimeMillis());

		GameBoard newGame = new GameBoard();
		newGame.setIdBoard(hashIdnewGameBoard);
		newGame.setIdplayer(player1.getIdplayer());
		newGame.initPits();
		newGame.setStatus("Initiated");
		gameBoardDAO.save(newGame);

		newGame = new GameBoard();
		newGame.setIdBoard(hashIdnewGameBoard);
		newGame.setIdplayer(player2.getIdplayer());
		newGame.initPits();
		// Status Initiated indicates that the game just started.
		newGame.setStatus("Initiated");
		gameBoardDAO.save(newGame);

		gameStatus.setIdPlayer1(player1.getIdplayer());
		gameStatus.setIdPlayer2(player2.getIdplayer());
		gameStatus.setIdBoard(hashIdnewGameBoard);

		// Status next indicates that the game is ready for the next player to
		// play
		gameStatus.setStatus("next");

		return gameStatus;

	}

	/**
	 * ****************************************************************.
	 * 
	 * @metodo: loadPlayersBoard
	 * @descripcion: it loads the board using an unique identifier for both
	 *               players.
	 * @param hashIdBoard
	 * @return: The GamePlayStatus object contains all the current info about a
	 *          specific session game.
	 * @autor: Guido Granobles
	 *****************************************************************
	 */
	public GamePlayStatus loadPlayersBoard(String hashIdBoard) {

		GamePlayStatus gameStatus = new GamePlayStatus();

		// load the two game boards for the given idBoard. There's just one
		// board (6 pits + kalah) for each player
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("idHashBoard", hashIdBoard);
		List<GameBoard> lResults = gameBoardDAO.findByNamedQuery(GameBoard.GAME_LOAD, parameters);

		// We should have always 2 boards one for each player.
		if (lResults.size() != 2) {
			return null;
		}

		gameStatus.setIdPlayer1(lResults.get(0).getIdplayer());
		gameStatus.setIdPlayer2(lResults.get(1).getIdplayer());
		gameStatus.setIdBoard(hashIdBoard);

		gameStatus.getBoardPlayer1().setKalah(lResults.get(0).getKalah());
		gameStatus.getBoardPlayer1().setPit1(lResults.get(0).getPit1());
		gameStatus.getBoardPlayer1().setPit2(lResults.get(0).getPit2());
		gameStatus.getBoardPlayer1().setPit3(lResults.get(0).getPit3());
		gameStatus.getBoardPlayer1().setPit4(lResults.get(0).getPit4());
		gameStatus.getBoardPlayer1().setPit5(lResults.get(0).getPit5());
		gameStatus.getBoardPlayer1().setPit6(lResults.get(0).getPit6());

		gameStatus.getBoardPlayer2().setKalah(lResults.get(1).getKalah());
		gameStatus.getBoardPlayer2().setPit1(lResults.get(1).getPit1());
		gameStatus.getBoardPlayer2().setPit2(lResults.get(1).getPit2());
		gameStatus.getBoardPlayer2().setPit3(lResults.get(1).getPit3());
		gameStatus.getBoardPlayer2().setPit4(lResults.get(1).getPit4());
		gameStatus.getBoardPlayer2().setPit5(lResults.get(1).getPit5());
		gameStatus.getBoardPlayer2().setPit6(lResults.get(1).getPit6());

		return gameStatus;

	}

	/**
	 * ****************************************************************.
	 * 
	 * @metodo: updatePlayerBoard
	 * @descripcion: update boards using the given info. The object updateInfo
	 *               should contain the idBoard, players and the pit where we
	 *               should start. We start from the given pit adding stones to
	 *               one by one to the pits at the right side.
	 * @param hashIdBoard
	 * @return: The GamePlayStatus object contains all the current info about a
	 *          specific session game.
	 * @autor: Guido Granobles
	 *****************************************************************
	 */
	public GamePlayStatus updatePlayerBoard(GamePlayUpdate updateInfo) {

		boolean pitWasEmpty = false;
		String status = "next";

		// get the player which want to play this time.
		GameBoard currentPlayerBoard = loadPlayerBoard(updateInfo.getIdBoard(), updateInfo.getIdCurrentPlayer());
		// get the player which is just wating his turn.
		GameBoard secondPlayerBoard = loadPlayerBoard(updateInfo.getIdBoard(), updateInfo.getIdSecondPlayer());

		// set the given pit to 0 and get the amount of stones that were there.
		int stonesToDist = emptyPit(currentPlayerBoard, updateInfo.getPitToEmpty());

		// initial position for the first stone to put. One pit to the right.
		int pitPosition = updateInfo.getPitToEmpty() + 1;

		// We need to switch between board players when we are putting stones.
		GameBoard boardToUpdate = currentPlayerBoard;

		while (stonesToDist > 0) {

			if (pitPosition <= 6) {
				pitWasEmpty = addStoneToPit(boardToUpdate, pitPosition);
			} else if (pitPosition == 7) {
				if (boardToUpdate.getIdplayer().intValue() == currentPlayerBoard.getIdplayer()) {
					boardToUpdate.setKalah(boardToUpdate.getKalah() + 1);
					// if the last stone was put in the Kalah, then repeat turn;
					if (stonesToDist == 1) {
						status = "repeat";
					}
				}
			} else {
				// If we are here is because position is greater than 7, so it's
				// time to switch to the other side of the board
				pitPosition = 1;
				boardToUpdate = boardToUpdate.getIdGame().intValue() == currentPlayerBoard.getIdGame().intValue()
						? secondPlayerBoard : currentPlayerBoard;
				pitWasEmpty = addStoneToPit(boardToUpdate, pitPosition);
			}

			pitPosition++;
			stonesToDist--;

			// if we put the last stone in an empty pit and that pit belongs to
			// the current player,
			// then take everything from the pit in front and put it in the
			// current player Kalah plus the last stone.
			if (pitWasEmpty && boardToUpdate.getIdplayer().intValue() == currentPlayerBoard.getIdplayer()
					&& stonesToDist == 0) {
				int stonesFrontPit = emptyPit(secondPlayerBoard, 7 - (pitPosition - 1));
				currentPlayerBoard.setKalah(currentPlayerBoard.getKalah() + stonesFrontPit + 1);
				emptyPit(currentPlayerBoard, pitPosition - 1);
			}
		}

		gameBoardDAO.save(currentPlayerBoard);
		gameBoardDAO.save(secondPlayerBoard);

		/*
		 * We need to reload the game status updated. This is like this because
		 * we need to preserve the order of the players. It means who is player
		 * 1 and who is player 2.
		 */
		GamePlayStatus gamePlayStatus = loadPlayersBoard(currentPlayerBoard.getIdBoard());

		Integer idWinner = checkWinner(currentPlayerBoard, secondPlayerBoard);
		if (idWinner != null) {
			status = "winner";		
			gamePlayStatus.setIdWinner(idWinner);
		}

		
		gamePlayStatus.setStatus(status);

		return gamePlayStatus;

	}

	private boolean addStoneToPit(GameBoard playerBoard, Integer pitNumber) {

		boolean isPitEmpty = false;

		switch (pitNumber) {

		case 1:
			isPitEmpty = (playerBoard.getPit1() == 0);
			playerBoard.setPit1(playerBoard.getPit1() + 1);
			break;
		case 2:
			isPitEmpty = (playerBoard.getPit2() == 0);
			playerBoard.setPit2(playerBoard.getPit2() + 1);
			break;
		case 3:
			isPitEmpty = (playerBoard.getPit3() == 0);
			playerBoard.setPit3(playerBoard.getPit3() + 1);
			break;
		case 4:
			isPitEmpty = (playerBoard.getPit4() == 0);
			playerBoard.setPit4(playerBoard.getPit4() + 1);
			break;
		case 5:
			isPitEmpty = (playerBoard.getPit5() == 0);
			playerBoard.setPit5(playerBoard.getPit5() + 1);
			break;
		case 6:
			isPitEmpty = (playerBoard.getPit6() == 0);
			playerBoard.setPit6(playerBoard.getPit6() + 1);
			break;
		}

		return isPitEmpty;
	}

	private int emptyPit(GameBoard playerBoard, Integer pitNumber) {

		Integer currentPitStones = 0;

		switch (pitNumber) {

		case 1:
			currentPitStones = playerBoard.getPit1();
			playerBoard.setPit1(0);
			break;
		case 2:
			currentPitStones = playerBoard.getPit2();
			playerBoard.setPit2(0);
			break;
		case 3:
			currentPitStones = playerBoard.getPit3();
			playerBoard.setPit3(0);
			break;
		case 4:
			currentPitStones = playerBoard.getPit4();
			playerBoard.setPit4(0);
			break;
		case 5:
			currentPitStones = playerBoard.getPit5();
			playerBoard.setPit5(0);
			break;
		case 6:
			currentPitStones = playerBoard.getPit6();
			playerBoard.setPit6(0);
			break;
		}

		return currentPitStones;

	}

	private GameBoard loadPlayerBoard(String hashIdBoard, Integer idPlayer) {

		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("idHashBoard", hashIdBoard);
		parameters.put("idPlayer", idPlayer);
		List<GameBoard> lResults = gameBoardDAO.findByNamedQuery(GameBoard.GAME_LOADBOARD, parameters);

		return lResults.get(0);

	}

	private Integer checkWinner(GameBoard currentPlayerBoard, GameBoard secondPlayerBoard) {

		Integer idPlayerWinner = null;
		
		if(checkTotalStonesInPits(currentPlayerBoard) == 0){
			secondPlayerBoard.setKalah(secondPlayerBoard.getKalah()+checkTotalStonesInPits(secondPlayerBoard));
			idPlayerWinner =  currentPlayerBoard.getKalah() > secondPlayerBoard.getKalah() ? currentPlayerBoard.getIdplayer(): secondPlayerBoard.getIdplayer();
		}else if(checkTotalStonesInPits(secondPlayerBoard) == 0){
			currentPlayerBoard.setKalah(currentPlayerBoard.getKalah()+checkTotalStonesInPits(currentPlayerBoard));		
			idPlayerWinner =  currentPlayerBoard.getKalah() > secondPlayerBoard.getKalah() ? currentPlayerBoard.getIdplayer(): secondPlayerBoard.getIdplayer();
		}
						
		return idPlayerWinner; 
	}
	
	
	private int  checkTotalStonesInPits(GameBoard playerBoard){
		
		return (playerBoard.getPit1() + playerBoard.getPit2() + playerBoard.getPit3() + playerBoard.getPit4()
		+ playerBoard.getPit5() + playerBoard.getPit6());
		
	}

}
