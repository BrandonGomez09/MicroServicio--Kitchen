class GetKitchenSubscribersUseCase {
  constructor(membershipRepository, kitchenRepository, authServiceAdapter) {
    this.membershipRepository = membershipRepository;
    this.kitchenRepository = kitchenRepository;
    this.authServiceAdapter = authServiceAdapter;
  }

  async execute(user, kitchenId, token) {
    console.log(`🔍 [Debug] Verificando acceso para Usuario ID: ${user.id}`);
    console.log(`🔍 [Debug] Roles del usuario: ${JSON.stringify(user.roles)}`);

    // 1. Validar cocina
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    console.log(`🔍 [Debug] Cocina encontrada (ID: ${kitchenId}). Dueño real (ownerId): ${kitchen.ownerId}`);

    // 2. Lógica de Seguridad VIP
    const isOwner = Number(kitchen.ownerId) === Number(user.id);
    
    // Verificamos si tiene el rol Super_admin (ajusta si tu rol se llama diferente en el token)
    const isSuperAdmin = user.roles.includes('Super_admin');

    // Si NO es el dueño Y TAMPOCO es Super Admin, lo bloqueamos
    if (!isOwner && !isSuperAdmin) {
      console.error("❌ Acceso denegado: No es dueño ni Super Admin.");
      throw { http_status: 403, message: "You are not the owner of this kitchen" };
    }

    // 3. Obtener los IDs de los suscriptores
    const memberships = await this.membershipRepository.findByKitchenId(kitchenId);

    // 4. "Enriquecer" los datos con Auth Service
    const enrichedSubscribers = await Promise.all(
      memberships.map(async (member) => {
        const userData = await this.authServiceAdapter.getUserData(member.userId, token);
        
        return {
          membershipId: member.id,
          userId: member.userId,
          joinDate: member.joinDate,
          user: userData || {
            names: "Usuario",
            firstLastName: "Desconocido",
            email: "No disponible",
            phoneNumber: ""
          }
        };
      })
    );

    return enrichedSubscribers;
  }
}

module.exports = GetKitchenSubscribersUseCase;