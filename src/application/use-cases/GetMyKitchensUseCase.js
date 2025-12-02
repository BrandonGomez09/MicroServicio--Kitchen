class GetMyKitchensUseCase {
  constructor(membershipRepository) {
    this.membershipRepository = membershipRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw { http_status: 400, message: "User ID is required" };
    }

    const memberships = await this.membershipRepository.findByUserId(userId);
    
    return memberships.map(m => ({
      membershipId: m.id,
      joinDate: m.joinDate,
      kitchen: m.kitchen 
    }));
  }
}

module.exports = GetMyKitchensUseCase;