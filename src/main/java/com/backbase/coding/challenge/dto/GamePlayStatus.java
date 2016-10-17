package com.backbase.coding.challenge.dto;

public class GamePlayStatus {

	private Integer idPlayer1;
	private Integer idPlayer2;

	private String idBoard;

	private PlayerBoard boardPlayer1 = new PlayerBoard();
	private PlayerBoard boardPlayer2 = new PlayerBoard();
	
	private String status;
	private Integer idWinner;

	
	public Integer getIdPlayer1() {
		return idPlayer1;
	}

	public void setIdPlayer1(Integer idPlayer1) {
		this.idPlayer1 = idPlayer1;
	}

	public Integer getIdPlayer2() {
		return idPlayer2;
	}

	public void setIdPlayer2(Integer idPlayer2) {
		this.idPlayer2 = idPlayer2;
	}

	public String getIdBoard() {
		return idBoard;
	}

	public void setIdBoard(String idBoard) {
		this.idBoard = idBoard;
	}

	public PlayerBoard getBoardPlayer1() {
		return boardPlayer1;
	}

	public PlayerBoard getBoardPlayer2() {
		return boardPlayer2;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getIdWinner() {
		return idWinner;
	}

	public void setIdWinner(Integer idWinner) {
		this.idWinner = idWinner;
	}
	
	

}
