const { createClient } = require("bedrock-protocol");
const SERVER_HOST = "EVOXSMP-Cned.aternos.me";
const SERVER_PORT = 19132;
const BOT_NAME = "AFK_Boat_Bot";
const REJOIN_DELAY = 10000;

function startBot() {
  console.log("🔁 Starting bot...");
  const client = createClient({ host: SERVER_HOST, port: SERVER_PORT, username: BOT_NAME, offline: true });
  client.on("join", () => {
    console.log("✅ Bot joined!");
    setInterval(() => {
      const pos = { x: Math.random()*2, y:70, z:Math.random()*2 };
      client.write('move_player', { runtime_id: client.entityId, position: pos, rotation:{x:0,y:0}, mode:0, on_ground:true, riding_eid:0 });
      console.log(`📍 Moved to X:${pos.x.toFixed(2)} Z:${pos.z.toFixed(2)}`);
    }, 3000);
  });
  client.on("disconnect", reason => { console.log("❌ Disconnected:", reason); setTimeout(startBot, REJOIN_DELAY); });
  client.on("error", err => { console.log("⚠️ Error:", err.message); client.close(); setTimeout(startBot, REJOIN_DELAY); });
}
startBot();
