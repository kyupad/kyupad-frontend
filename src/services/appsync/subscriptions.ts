const subscribeToNftAction = `subscription SubscribeToNftAction($season_id: String!) {
subscribeToNftAction(season_id: $season_id) {
        action_type
        season_id
        pool_id
        nft_off_chain_id
        minted_wallet
        action_at
    }
}`;

const subscribeToIdoAction = `subscription MySubscription($project__id: String!) {
  subscribeToIdoAction(project__id: $project__id) {
    action_at
    action_type
    invested_total
    invested_wallet
    project__id
  }
}`;

export { subscribeToNftAction, subscribeToIdoAction };
