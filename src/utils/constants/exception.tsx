const THROW_EXCEPTION = {
  UNKNOWN_TRANSACTION: (
    <div>
      <div>Something went wrong.</div>
      <div>Please try again!</div>
    </div>
  ),
  ONCHAIN_TIMEOUT: (
    <div>
      <div>Network too busy.</div>
      <div>Please try again!</div>
    </div>
  ),
  USER_REJECTED_THE_REQUEST: 'User rejected the request.',
};

export { THROW_EXCEPTION };
