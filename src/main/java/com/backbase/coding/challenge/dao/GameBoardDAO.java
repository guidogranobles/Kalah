package com.backbase.coding.challenge.dao;

import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import com.backbase.coding.challenge.entities.GameBoard;

@Stateless
@TransactionAttribute(TransactionAttributeType.MANDATORY)
public class GameBoardDAO extends BaseDAO<GameBoard> {

	public GameBoard save(GameBoard game) {

		GameBoard newGame = null;
		try {
			game = saveEntity(game);
		} catch (RemoteException e) {

		}
		return newGame;

	}

	public GameBoard update(GameBoard game) {

		return updateEntity(game);

	}

	public void remove(int pId) throws Exception {

		removeEntity(GameBoard.class, pId);

	}

	public List<GameBoard> findAll() throws Exception {

		return findByNamedQuery(GameBoard.GAME_FINDAll);
	}

	public List<GameBoard> findByProperty(String pPropiedad, Object pValor) throws Exception {

		return findByOnlyProperty(pPropiedad, pValor);
	}

	public List<GameBoard> findByProperty(Map<String, Object> pParametros, int pResultadoLimite) throws Exception {

		return finbByProperties(pParametros, pResultadoLimite);
	}

	public GameBoard findById(Long pId) throws Exception {
		return findById(GameBoard.class, pId);
	}

}
