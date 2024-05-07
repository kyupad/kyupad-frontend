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

export { subscribeToNftAction };
