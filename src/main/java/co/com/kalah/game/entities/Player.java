package co.com.kalah.game.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "player")
@NamedQueries({ @NamedQuery(name = Player.PLAYER_FINDAll, query = "SELECT p FROM Player p")})
public class Player implements Serializable {
	private static final long serialVersionUID = 1L;

	public final static String PLAYER_FINDAll = "player.findAll";

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idplayer;

	private String name;
	
	@OneToMany(mappedBy="player")
	private List<GameBoard> games;


	public Integer getIdplayer() {
		return idplayer;
	}

	public void setIdplayer(Integer idplayer) {
		this.idplayer = idplayer;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<GameBoard> getGames() {
		return games;
	}

	public void setGames(List<GameBoard> games) {
		this.games = games;
	}
	
	

	
	
}