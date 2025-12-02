const axios = require('axios');
require('dotenv').config();

class AuthServiceAdapter {
  constructor() {
    this.authUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001/api/v1';
  }

  async getUserData(userId, token) {
    try {
      // Limpiamos el token
      const cleanToken = token.replace('Bearer ', '');
      
      console.log(`📡 [Adapter] Consultando Auth: ${this.authUrl}/users/${userId}`);

      const response = await axios.get(`${this.authUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${cleanToken}`
        }
      });

      if (response.data && response.data.data) {
        console.log("✅ [Adapter] Datos encontrados:", response.data.data.email);
        return response.data.data;
      }

      return null;

    } catch (error) {
      // AQUÍ ESTÁ LA CLAVE PARA SABER QUÉ PASA
      console.error(`❌ [Adapter Error] Falló la consulta para User ID ${userId}`);
      if (error.response) {
        console.error("   Status:", error.response.status);
        console.error("   Mensaje:", JSON.stringify(error.response.data));
      } else {
        console.error("   Error:", error.message);
      }
      return null;
    }
  }
}

module.exports = new AuthServiceAdapter();