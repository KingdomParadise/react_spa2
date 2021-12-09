import { gql } from '@apollo/client';

export const QUERY_BET = gql`
  query getBet($id: ID) {
    bet(id: $id) {
      id
      amount
      bet
      betId
      player {
        address
        id
        rewardClaimed
        score
      }
      result
    }
  }
`;

export const QUERY_PLAYERS = gql`
  query getPlayers($orderBy: String) {
    players(orderBy: $orderBy) {
      id
      rewardClaimed
      score
    }
  }
`;
