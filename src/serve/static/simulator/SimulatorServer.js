import net;
import net.interfaces;
import lib.PubSub;
import net.protocols.Cuppa;
import devkit.debugging.TargetCuppa as TargetCuppa;

exports = Class([net.interfaces.Server, lib.PubSub], function () {
  this.listen = function () {
    net.listen(this, 'postmessage', {port: 'devkit-simulator'});
  }

  this.buildProtocol = function () {
    var conn = new TargetCuppa();
    conn.onEvent('HANDSHAKE', null, bind(this, function (evt) {
      this.emit('connection', conn, evt.args);
    }));
    return conn;
  }
});