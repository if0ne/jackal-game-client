import LobbyMember from "./LobbyMember";

type GameListMemberCardProps = {
    member: LobbyMember,
}

export const GameListMemberCard = (props: GameListMemberCardProps) => {
    return (
      <div className="game-list-card p-2">
          <img src={props.member.avatar} className="mx-auto game-list-member-card-img"/>
          <div>
              <p className="game-list-member-card-nickname">
                  {props.member.nickname}
              </p>
              {props.member.isHost &&
                  <p className="game-list-member-additional-info">Лидер комнаты</p>
              }
          </div>
      </div>
    );
}