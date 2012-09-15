if(SERVER) {
	require('../player.js');
}

CATAN.Players = (function(CATAN) {

	var module = {}

	/**
	 * Module Fields
	 */

	module.list = [];

	/**
	 * Module Methods
	 */

	module.getAll = function() {
		return this.list;
	}

	module.getById = function(id) {
		var players = this.getAll();
		for(var i in players) {
			var ply = players[i];
			if(ply.getID() == id) {
				return ply;
			}
		}
	}

	module.getBySocket = function(socket) {
		return this.getById(socket.id);
	}

	module.getByName = function(name) {
		var players = this.getAll();
		for(var i in players) {
			var ply = players[i];
			if(ply.getName().indexOf(name) != -1) {
				return ply;
			}
		}
	}

	module.getListIndex = function(ply) {
		var players = this.getAll();
		for(var i in players) {
			if(ply.getID() == players[i].getID()) {
				return i;
			}
		}

		return -1;
	}

	module.getCount = function() {
		return this.list.length;
	}

	module.connect = function(socket) {
		var ply = new CATAN.Player();
		ply.setSocket(socket);
		this.list.push(ply);
		return ply;
	}

	module.disconnect = function(ply) {
		var index = this.getListIndex(ply);
		if(index != -1) {
			this.list.splice(index,1);
			console.log("[MAIN] Player disconnected");
		} else {
			console.log("[MAIN] ERROR DISCONNECTING PLAYER!");
		}
	}

	return module;

}(CATAN));