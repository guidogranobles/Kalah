package com.backbase.coding.challenge.dao;

import java.rmi.RemoteException;
import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import com.backbase.coding.challenge.entities.Player;

@Stateless
@TransactionAttribute(TransactionAttributeType.MANDATORY)
public class PlayerDAO extends BaseDAO<Player> {

	public Player save(Player player) {

		Player newPlayer = null;

		try {
			newPlayer = saveEntity(player);
		} catch (RemoteException e) {

		}

		return newPlayer;
	}

	public List<Player> findAll() throws Exception {

		return findByNamedQuery(Player.PLAYER_FINDAll);
	}

	public Player findById(Long pId) throws Exception {
		return findById(Player.class, pId);
	}

}
