export default function UserCard({
                                     user,
                                     offeredSkills = [],
                                     desiredSkills = [],
                                     onPass,
                                     onConnect,
                                 }) {
    const initials = user.username
        ? user.username.slice(0, 2).toUpperCase()
        : "??";

    return (
        <div className="user-swipe-card">
            <div className="user-swipe-card__header">
                <div className="user-swipe-card__avatar">{initials}</div>

                <div className="user-swipe-card__info">
                    <div className="user-swipe-card__name">{user.username}</div>

                    {offeredSkills.length > 0 && (
                        <>
                            <div className="user-swipe-card__label">CAN TEACH</div>
                            <div className="user-swipe-card__tags">
                                {offeredSkills.map((s, i) => (
                                    <span key={i} className="tag tag--offer">
                    {s.name}
                  </span>
                                ))}
                            </div>
                        </>
                    )}

                    {desiredSkills.length > 0 && (
                        <>
                            <div className="user-swipe-card__label">WANTS TO LEARN</div>
                            <div className="user-swipe-card__tags">
                                {desiredSkills.map((s, i) => (
                                    <span key={i} className="tag tag--want">
                    {s.name}
                  </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {user.bio && (
                <p className="user-swipe-card__bio">{user.bio}</p>
            )}

            <div className="user-swipe-card__actions">
                <button className="btn-pass" onClick={onPass}>
                    Pass
                </button>

                <button className="btn-connect" onClick={onConnect}>
                    Connect
                </button>
            </div>
        </div>
    );
}